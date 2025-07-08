import { KeyValue } from '../../lib/keyboard'
import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[]
}

export const Keyboard = ({ onChar, onDelete, onEnter, guesses }: Props) => {
  const charStatuses = getStatuses(guesses)

  const onClick = (value: KeyValue) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else {
        const key = e.key.toUpperCase()
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          onChar(key)
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  return (
    <div className="space-y-1">
      {/* First row - 10 keys */}
      <div className="flex justify-center gap-0.5">
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
          <Key 
            key={key} 
            value={key as KeyValue} 
            onClick={onClick} 
            status={charStatuses[key]}
            width={36} // Slightly bigger for better readability
          />
        ))}
      </div>
      
      {/* Second row - 9 keys */}
      <div className="flex justify-center gap-0.5">
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
          <Key 
            key={key} 
            value={key as KeyValue} 
            onClick={onClick} 
            status={charStatuses[key]}
            width={36} // Slightly bigger for better readability
          />
        ))}
      </div>
      
      {/* Third row - ENTER + 7 keys + DELETE */}
      <div className="flex justify-center gap-0.5">
        <Key width={52} value="ENTER" onClick={onClick}>
          <span className="text-sm font-bold">ENTER</span>
        </Key>
        
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => (
          <Key 
            key={key} 
            value={key as KeyValue} 
            onClick={onClick} 
            status={charStatuses[key]}
            width={36} // Slightly bigger for better readability
          />
        ))}
        
        <Key width={52} value="DELETE" onClick={onClick}>
          <span className="text-sm font-bold">⌫</span>
        </Key>
      </div>
    </div>
  )
}
