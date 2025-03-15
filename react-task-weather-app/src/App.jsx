import { useState, useEffect } from 'react'
import WeatherCard from './components/WeatherCard'
import Header from './components/Header'
import LocationButton from './components/LocationButton'
import Footer from './components/Footer'
import { CAPITAL_CITIES } from './services/weatherService'
import { TranslationProvider } from './context/TranslationContext'
import { detectUserCountry } from './services/ipLocationService'

function App() {
  const [selectedCountry, setSelectedCountry] = useState('Albania');
  const [selectedCity, setSelectedCity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Detect user's country on initial load
  useEffect(() => {
    const detectLocation = async () => {
      try {
        setIsLoading(true);
        const { country, city } = await detectUserCountry();
        setSelectedCountry(country);
        setSelectedCity(city);
      } catch (error) {
        console.error('Error detecting location:', error);
      } finally {
        setIsLoading(false);
      }
    };

    detectLocation();
  }, []);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedCity(null); // Reset city when country changes manually
  };

  const handleLocationFound = (country, city) => {
    setSelectedCountry(country);
    setSelectedCity(city);
  };

  return (
    <TranslationProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-black flex flex-col pt-4 md:pt-8">
        <LocationButton onLocationFound={handleLocationFound} />
        <Header 
          selectedCountry={selectedCountry} 
          onCountryChange={handleCountryChange}
        />
        {!isLoading && (
          <WeatherCard 
            selectedCountry={selectedCountry} 
            initialCity={selectedCity}
          />
        )}
        <Footer />
      </div>
    </TranslationProvider>
  )
}

export default App
