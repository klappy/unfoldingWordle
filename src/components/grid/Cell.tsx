import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'
import { useEffect, useState } from 'react'

type Props = {
  value?: string
  status?: CharStatus
  delay?: number
}

export const Cell = ({ value, status, delay = 0 }: Props) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [showValue, setShowValue] = useState(false)

  useEffect(() => {
    if (value && !showValue) {
      setIsAnimating(true)
      setTimeout(() => {
        setShowValue(true)
        setTimeout(() => setIsAnimating(false), 300)
      }, delay)
    }
  }, [value, delay, showValue])

  const classes = classnames(
    'relative w-16 h-16 flex items-center justify-center mx-1 my-1 text-2xl font-bold rounded-xl transition-all duration-300 transform',
    {
      // Default state
      'bg-white/70 backdrop-blur-sm border-2 border-slate-200/50 shadow-cell hover:shadow-cell-hover text-slate-700': !status,
      'dark:bg-slate-800/70 dark:border-slate-600/50 dark:text-slate-200': !status,
      
      // With value but no status
      'border-slate-400/70 shadow-cell-hover scale-105': value && !status,
      'dark:border-slate-500/70': value && !status,
      
      // Status-based styling
      'bg-gradient-to-br from-slate-400 to-slate-500 text-white border-slate-500 shadow-lg': status === 'absent',
      'bg-gradient-to-br from-success-500 to-success-600 text-white border-success-500 shadow-success': status === 'correct',
      'bg-gradient-to-br from-warning-500 to-warning-600 text-white border-warning-500 shadow-warning': status === 'present',
      
      // Animation classes
      'animate-bounce-in': isAnimating && !status,
      'cell-flip-animation': status,
      'success-cell-animation': status === 'correct',
      'hover:scale-105 active:scale-95': !status,
      'animate-pulse': !value && !status,
    }
  )

  const innerClasses = classnames(
    'absolute inset-0 rounded-xl flex items-center justify-center',
    {
      'bg-gradient-to-br from-white/20 to-transparent': status === 'correct' || status === 'present',
      'bg-gradient-to-br from-white/10 to-transparent': status === 'absent',
    }
  )

  return (
    <div className={classes} style={{ animationDelay: `${delay}ms` }}>
      {/* Inner glow effect */}
      <div className={innerClasses} />
      
      {/* Letter display */}
      <span 
        className={classnames(
          'relative z-10 select-none transition-all duration-200',
          {
            'opacity-0': !showValue && value,
            'opacity-100': showValue || !value,
            'text-shadow': status,
          }
        )}
      >
        {value}
      </span>
      
      {/* Decorative elements for special states */}
      {status === 'correct' && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-green-400/20 to-transparent animate-pulse" />
      )}
      {status === 'present' && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-400/20 to-transparent animate-pulse" />
      )}
    </div>
  )
}
