import { useState, useEffect } from 'react'
import WeatherCard from './components/WeatherCard'
import Header from './components/Header'
import LocationButton from './components/LocationButton'
import Footer from './components/Footer'
import { CAPITAL_CITIES } from './services/weatherService'
import { TranslationProvider, useTranslation } from './context/TranslationContext'
import { detectUserCountry } from './services/ipLocationService'

// Country to language mapping
const COUNTRY_LANGUAGE_MAP = {
  'Albania': 'al',
  'Italy': 'it',
  // Default to English for other countries
};

function AppContent() {
  const [selectedCountry, setSelectedCountry] = useState('Albania');
  const [selectedCity, setSelectedCity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setLanguage } = useTranslation();

  // Detect user's country on initial load
  useEffect(() => {
    const detectLocation = async () => {
      try {
        setIsLoading(true);
        const { country, city } = await detectUserCountry();
        setSelectedCountry(country);
        setSelectedCity(city);
        
        // Set language based on detected country
        const detectedLanguage = COUNTRY_LANGUAGE_MAP[country] || 'en';
        console.log('Setting language based on country:', country, 'Language:', detectedLanguage);
        setLanguage(detectedLanguage);
      } catch (error) {
        console.error('Error detecting location:', error);
      } finally {
        setIsLoading(false);
      }
    };

    detectLocation();
  }, [setLanguage]);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedCity(null); // Reset city when country changes manually
  };

  const handleLocationFound = (country, city) => {
    setSelectedCountry(country);
    setSelectedCity(city);
    
    // Update language when location changes
    const newLanguage = COUNTRY_LANGUAGE_MAP[country] || 'en';
    setLanguage(newLanguage);
  };

  return (
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
  );
}

function App() {
  return (
    <TranslationProvider>
      <AppContent />
    </TranslationProvider>
  );
}

export default App
