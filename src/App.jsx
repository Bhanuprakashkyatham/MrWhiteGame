import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from './pages/Home'
import GamePage from './pages/GamePage'

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </>
  )
}

export default App
