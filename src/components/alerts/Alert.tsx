import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import classNames from 'classnames'

type Props = {
  isOpen: boolean
  message: string
  variant?: 'success' | 'warning' | 'error'
}

export const Alert = ({ isOpen, message, variant = 'warning' }: Props) => {
  const classes = classNames(
    'fixed top-24 left-1/2 transform -translate-x-1/2 max-w-sm w-full mx-4',
    'glass-card rounded-2xl shadow-2xl pointer-events-auto overflow-hidden',
    'border-2 backdrop-blur-xl z-50',
    {
      'border-red-300/50 bg-red-100/80 text-red-800': variant === 'warning' || variant === 'error',
      'dark:border-red-500/50 dark:bg-red-900/80 dark:text-red-200': variant === 'warning' || variant === 'error',
      
      'border-green-300/50 bg-green-100/80 text-green-800': variant === 'success',
      'dark:border-green-500/50 dark:bg-green-900/80 dark:text-green-200': variant === 'success',
    }
  )

  const iconClasses = classNames(
    'w-6 h-6 flex-shrink-0 mr-3',
    {
      'text-red-500': variant === 'warning' || variant === 'error',
      'text-green-500': variant === 'success',
    }
  )

  const getIcon = () => {
    switch (variant) {
      case 'success':
        return (
          <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'error':
        return (
          <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      default:
        return (
          <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        )
    }
  }

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="ease-out duration-500 transition"
      enterFrom="opacity-0 transform scale-95 translate-y-4"
      enterTo="opacity-100 transform scale-100 translate-y-0"
      leave="transition ease-in duration-300"
      leaveFrom="opacity-100 transform scale-100 translate-y-0"
      leaveTo="opacity-0 transform scale-95 translate-y-4"
    >
      <div className={classes}>
        <div className="p-4">
          <div className="flex items-center">
            {getIcon()}
            <div className="flex-1">
              <p className="text-sm font-semibold leading-relaxed">
                {message}
              </p>
            </div>
          </div>
        </div>
        
        {/* Decorative gradient bar */}
        <div className={classNames(
          'h-1 w-full',
          {
            'bg-gradient-to-r from-red-400 to-red-600': variant === 'warning' || variant === 'error',
            'bg-gradient-to-r from-green-400 to-green-600': variant === 'success',
          }
        )} />
      </div>
    </Transition>
  )
}
