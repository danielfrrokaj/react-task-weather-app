import { useState } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-blue-200 p-4 md:p-8">
      <header className="max-w-[800px] mx-auto mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
          Weather in Albania
        </h1>
        <p className="text-white/80 text-lg font-light">
          Explore weather conditions across Albanian cities
        </p>
      </header>
      <WeatherCard />
    </div>
  )
}

export default App
