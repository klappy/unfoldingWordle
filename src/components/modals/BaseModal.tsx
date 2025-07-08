import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/outline'

type Props = {
  title: string
  children: React.ReactNode
  isOpen: boolean
  handleClose: () => void
}

export const BaseModal = ({ title, children, isOpen, handleClose }: Props) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="flex items-center justify-center min-h-screen py-4 px-4 text-center sm:py-10 sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-slate-900/50 dark:bg-slate-900/70 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom glass-card rounded-2xl sm:rounded-3xl px-4 pt-5 pb-4 sm:px-6 sm:pt-6 sm:pb-6 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-8 max-w-xs w-full">
              {/* Close button */}
              <div className="absolute right-3 top-3 sm:right-4 sm:top-4">
                <button
                  onClick={handleClose}
                  className="glass-button rounded-lg sm:rounded-xl p-1.5 sm:p-2 transition-all duration-200 hover:scale-105 active:scale-95 group"
                >
                  <XCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600 dark:text-slate-400 group-hover:text-red-500 dark:group-hover:text-red-400" />
                </button>
              </div>

              {/* Modal content */}
              <div>
                <div className="text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg sm:text-xl font-display font-bold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
