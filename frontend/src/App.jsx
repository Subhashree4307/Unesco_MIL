import { useState } from 'react'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import GamePage from './pages/GamePage'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  )
}

export default App
