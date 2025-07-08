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
    // Mobile-first responsive design
    'relative flex items-center justify-center rounded-lg sm:rounded-xl mx-0.5 my-0.5 sm:mx-1 sm:my-1 text-xs sm:text-sm font-semibold cursor-pointer select-none transition-all duration-200 transform backdrop-blur-sm',
    'hover:scale-105 active:scale-95 active:rotate-1',
    'shadow-key hover:shadow-key-hover',
    'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent',
    {
      // Default state
      'bg-white/80 border border-slate-200/60 sm:border-2 text-slate-700 hover:bg-white/90 hover:border-slate-300/70': !status,
      'dark:bg-slate-700/80 dark:border-slate-600/60 dark:text-slate-200 dark:hover:bg-slate-600/90 dark:hover:border-slate-500/70': !status,
      
      // Status-based styling with gradients
      'bg-gradient-to-br from-slate-400 to-slate-500 text-white border-slate-500': status === 'absent',
      'hover:from-slate-500 hover:to-slate-600': status === 'absent',
      
      'bg-gradient-to-br from-success-500 to-success-600 text-white border-success-500': status === 'correct',
      'hover:from-success-600 hover:to-success-700': status === 'correct',
      'shadow-success': status === 'correct',
      
      'bg-gradient-to-br from-warning-500 to-warning-600 text-white border-warning-500': status === 'present',
      'hover:from-warning-600 hover:to-warning-700': status === 'present',
      'shadow-warning': status === 'present',
    }
  )

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value)
    event.currentTarget.blur()
    
    // Add a temporary animation class
    event.currentTarget.classList.add('key-press-animation')
    setTimeout(() => {
      event.currentTarget.classList.remove('key-press-animation')
    }, 150)
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick(event as any)
    }
  }

  return (
    <button
      style={{ 
        width: `${width}px`, 
        height: '58px',
        minWidth: `${width}px`,
      }}
      className={classes}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Key ${children || value}`}
    >
      {/* Inner glow effect - hidden on mobile for performance */}
      <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block" />
      
      {/* Key content */}
      <span className="relative z-10 font-bold tracking-wide">
        {children || value}
      </span>
      
      {/* Status indicator dots - smaller on mobile */}
      {status === 'correct' && (
        <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-300 rounded-full animate-pulse" />
      )}
      {status === 'present' && (
        <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-300 rounded-full animate-pulse" />
      )}
      {status === 'absent' && (
        <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-slate-300 rounded-full opacity-60" />
      )}
    </button>
  )
}
