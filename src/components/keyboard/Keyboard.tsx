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
    <div className="space-y-2">
      {/* First row */}
      <div className="flex justify-center gap-1">
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
          <Key 
            key={key} 
            value={key as KeyValue} 
            onClick={onClick} 
            status={charStatuses[key]} 
          />
        ))}
      </div>
      
      {/* Second row */}
      <div className="flex justify-center gap-1">
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
          <Key 
            key={key} 
            value={key as KeyValue} 
            onClick={onClick} 
            status={charStatuses[key]} 
          />
        ))}
      </div>
      
      {/* Third row */}
      <div className="flex justify-center gap-1">
        <Key width={68} value="ENTER" onClick={onClick}>
          <span className="text-xs font-bold">ENTER</span>
        </Key>
        
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => (
          <Key 
            key={key} 
            value={key as KeyValue} 
            onClick={onClick} 
            status={charStatuses[key]} 
          />
        ))}
        
        <Key width={68} value="DELETE" onClick={onClick}>
          <span className="text-xs font-bold">⌫</span>
        </Key>
      </div>
    </div>
  )
}
