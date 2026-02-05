import React, { useState } from 'react'
import MainMenu from './components/MainMenu'
import XO from './components/XO'
import Sudoku from './components/Sudoku'

function App() {
  const [currentView, setCurrentView] = useState('menu')

  const handleNavigate = (item) => {
    if (item.id === 'cooking') {
      window.location.href = item.path
      return
    }
    setCurrentView(item.id)
  }

  const handleBack = () => {
    setCurrentView('menu')
  }

  return (
    <div className="App">
      {currentView === 'menu' && <MainMenu onNavigate={handleNavigate} />}
      {currentView === 'xo' && <XO onBack={handleBack} />}
      {currentView === 'sudoku' && <Sudoku onBack={handleBack} />}
    </div>
  )
}

export default App
