import { useState } from 'react'
import WeatherCard from './components/WeatherCard'
import Header from './components/Header'
import LocationButton from './components/LocationButton'
import Footer from './components/Footer'
import { CAPITAL_CITIES } from './services/weatherService'

function App() {
  const [selectedCountry, setSelectedCountry] = useState('Albania');
  const [selectedCity, setSelectedCity] = useState(null);
  const [language, setLanguage] = useState('EN');

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedCity(null); // Reset city when country changes manually
  };

  const handleLocationFound = (country, city) => {
    setSelectedCountry(country);
    setSelectedCity(city);
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    // You can add language-specific logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-black relative pb-16">
      <LocationButton onLocationFound={handleLocationFound} />
      <Header 
        selectedCountry={selectedCountry} 
        onCountryChange={handleCountryChange}
      />
      <WeatherCard 
        selectedCountry={selectedCountry} 
        initialCity={selectedCity}
      />
      <Footer language={language} onLanguageChange={handleLanguageChange} />
    </div>
  )
}

export default App
