import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="About" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500">
        This is an open source clone of the game Wordle -{' '}
        <a href="https://github.com/klappy/wordle" className="underline font-bold" target='_blank' rel='noreferrer'>
          check out the code here
        </a>{' '}
        and{' '}
        <a href="https://www.powerlanguage.co.uk/wordle/" className="underline font-bold" target='_blank' rel='noreferrer'>
          play the original here.
        </a>
      </p>
      <p className="text-sm text-gray-500">
        The word list is created from the{' '}
        <a href='https://www.unfoldingword.org/ult' className='underline font-bold' target='_blank' rel='noreferrer'>
          ULT
        </a>{' '}
        translation<br /> by {' '}
        <a href='https://www.unfoldingword.org' className='underline font-bold' target='_blank' rel='noreferrer'>
          unfoldingWord
        </a>{' '}
        used as a translation resource for Bible translators.
      </p>
    </BaseModal>
  )
}
