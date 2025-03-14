import { useState } from 'react'
import WeatherCard from './components/WeatherCard'
import Header from './components/Header'
import LocationButton from './components/LocationButton'
import { CAPITAL_CITIES } from './services/weatherService'

function App() {
  const [selectedCountry, setSelectedCountry] = useState('Albania');

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-blue-200 p-4 md:p-8">
      <Header 
        selectedCountry={selectedCountry} 
        onCountryChange={handleCountryChange}
      />
      <LocationButton onLocationFound={handleCountryChange} />
      <WeatherCard selectedCountry={selectedCountry} />
    </div>
  )
}

export default App
