import { useState } from 'react'
import WeatherCard from './components/WeatherCard'
import Header from './components/Header'
import LocationButton from './components/LocationButton'
import { CAPITAL_CITIES } from './services/weatherService'

function App() {
  const [selectedCountry, setSelectedCountry] = useState('Albania');
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedCity(null); // Reset city when country changes manually
  };

  const handleLocationFound = (country, city) => {
    setSelectedCountry(country);
    setSelectedCity(city);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-blue-200 p-4 md:p-8">
      <LocationButton onLocationFound={handleLocationFound} />
      <Header 
        selectedCountry={selectedCountry} 
        onCountryChange={handleCountryChange}
      />
      <WeatherCard 
        selectedCountry={selectedCountry} 
        initialCity={selectedCity}
      />
    </div>
  )
}

export default App
