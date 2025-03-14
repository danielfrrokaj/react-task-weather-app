import { useState } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-4 md:p-8">
      <WeatherCard />
    </div>
  )
}

export default App
