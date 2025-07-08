import { InformationCircleIcon } from '@heroicons/react/outline'
import { ChartBarIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import { DarkModeToggle } from './components/DarkModeToggle'
import { WIN_MESSAGES } from './constants/strings'
import { isWordInWordList, isWinningWord, solution } from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'

const ALERT_TIME_MS = 2000

function App() {
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [successAlert, setSuccessAlert] = useState('')
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    const gameWasWon = loaded.guesses.includes(solution)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === 6 && !gameWasWon) {
      setIsGameLost(true)
    }
    return loaded.guesses
  })

  const [stats, setStats] = useState(() => loadStats())

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      setSuccessAlert(
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      )
      setTimeout(() => {
        setSuccessAlert('')
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
  }, [isGameWon, isGameLost])

  const onChar = (value: string) => {
    if (currentGuess.length < 5 && guesses.length < 6 && !isGameWon) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }
    if (!(currentGuess.length === 5)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }

    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, ALERT_TIME_MS)
    }

    const winningWord = isWinningWord(currentGuess)

    if (currentGuess.length === 5 && guesses.length < 6 && !isGameWon) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === 5) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background decorative elements - smaller on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Mobile-first responsive container */}
      <div className="relative z-10 max-w-sm sm:max-w-md lg:max-w-lg mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header - more compact on mobile */}
        <header className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative">
                <img
                  src="./logo192.png"
                  alt="logo"
                  className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl shadow-lg floating-animation"
                />
                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-display font-bold text-gradient">
                  <span className="font-light">unfolding</span>
                  <span className="font-bold">Word</span>
                  <span className="font-bold">le</span>
                  <span className="text-xs font-light align-super opacity-60">™</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                  A Daily Bible Word Game
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 sm:space-x-2">
              <DarkModeToggle />
              <button
                onClick={() => setIsInfoModalOpen(true)}
                className="glass-button rounded-lg sm:rounded-xl p-2 sm:p-3 transition-all duration-200 hover:scale-105 active:scale-95 group"
              >
                <InformationCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </button>
              <button
                onClick={() => setIsStatsModalOpen(true)}
                className="glass-button rounded-lg sm:rounded-xl p-2 sm:p-3 transition-all duration-200 hover:scale-105 active:scale-95 group"
              >
                <ChartBarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </button>
            </div>
          </div>
        </header>

        {/* Game Area - reduced spacing on mobile */}
        <main className="space-y-3 sm:space-y-6">
          {/* Grid Container - less padding on mobile */}
          <div className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Grid guesses={guesses} currentGuess={currentGuess} />
          </div>

          {/* Keyboard Container - less padding on mobile */}
          <div className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Keyboard
              onChar={onChar}
              onDelete={onDelete}
              onEnter={onEnter}
              guesses={guesses}
            />
          </div>
        </main>

        {/* About Button - smaller on mobile */}
        <div className="text-center mt-4 sm:mt-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={() => setIsAboutModalOpen(true)}
            className="glass-button rounded-lg sm:rounded-xl px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 transition-all duration-200 hover:scale-105 active:scale-95 group"
          >
            <span className="inline mr-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">✨</span>
            About this game
          </button>
        </div>
      </div>

      {/* Modals */}
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        guesses={guesses}
        gameStats={stats}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        handleShare={() => {
          setSuccessAlert('Game copied to clipboard')
          return setTimeout(() => setSuccessAlert(''), ALERT_TIME_MS)
        }}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />

      {/* Alerts */}
      <Alert message="Not enough letters" isOpen={isNotEnoughLetters} />
      <Alert
        message="Word not found in the unfoldingWord English ULT."
        isOpen={isWordNotFoundAlertOpen}
      />
      <Alert message={`The word was ${solution}`} isOpen={isGameLost} />
      <Alert
        message={successAlert}
        isOpen={successAlert !== ''}
        variant="success"
      />
    </div>
  )
}

export default App
