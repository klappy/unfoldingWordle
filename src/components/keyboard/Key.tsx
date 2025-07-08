import { ReactNode } from 'react'
import classnames from 'classnames'
import { KeyValue } from '../../lib/keyboard'
import { CharStatus } from '../../lib/statuses'

type Props = {
  children?: ReactNode
  value: KeyValue
  width?: number
  status?: CharStatus
  onClick: (value: KeyValue) => void
}

export const Key = ({
  children,
  status,
  width = 40,
  value,
  onClick,
}: Props) => {
  const classes = classnames(
    // Mobile-first with much smaller base sizes
    'relative flex items-center justify-center rounded-md sm:rounded-lg mx-0.5 text-xs font-semibold cursor-pointer select-none transition-all duration-200 transform backdrop-blur-sm',
    'hover:scale-105 active:scale-95',
    'focus:outline-none focus:ring-1 focus:ring-blue-500/50',
    {
      // Default state
      'bg-white/80 border border-slate-200/60 text-slate-700 hover:bg-white/90 hover:border-slate-300/70': !status,
      'dark:bg-slate-700/80 dark:border-slate-600/60 dark:text-slate-200 dark:hover:bg-slate-600/90 dark:hover:border-slate-500/70': !status,
      
      // Status-based styling with gradients
      'bg-gradient-to-br from-slate-400 to-slate-500 text-white border-slate-500': status === 'absent',
      'hover:from-slate-500 hover:to-slate-600': status === 'absent',
      
      'bg-gradient-to-br from-success-500 to-success-600 text-white border-success-500': status === 'correct',
      'hover:from-success-600 hover:to-success-700': status === 'correct',
      
      'bg-gradient-to-br from-warning-500 to-warning-600 text-white border-warning-500': status === 'present',
      'hover:from-warning-600 hover:to-warning-700': status === 'present',
    }
  )

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value)
    event.currentTarget.blur()
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick(event as any)
    }
  }

  // Mobile-first responsive sizing - much smaller base sizes
  const mobileWidth = width === 32 ? 24 : width === 48 ? 36 : width * 0.75 // Regular keys: 24px, special keys: 36px

  return (
    <button
      className={`${classes} h-10 sm:h-12 lg:h-14 text-sm sm:text-base`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Key ${children || value}`}
      style={{
        width: `${mobileWidth}px`,
        minWidth: `${mobileWidth}px`,
      }}
    >
      {/* Key content */}
      <span className="relative z-10 font-bold tracking-wide leading-none">
        {children || value}
      </span>
      
      {/* Status indicator dots - smaller on mobile */}
      {status === 'correct' && (
        <div className="absolute top-0.5 right-0.5 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-300 rounded-full animate-pulse" />
      )}
      {status === 'present' && (
        <div className="absolute top-0.5 right-0.5 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-yellow-300 rounded-full animate-pulse" />
      )}
      {status === 'absent' && (
        <div className="absolute top-0.5 right-0.5 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-slate-300 rounded-full opacity-60" />
      )}
    </button>
  )
}
