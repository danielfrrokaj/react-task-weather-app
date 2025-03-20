import { useState, useEffect } from 'react'
import WeatherCard from './components/WeatherCard'
import Header from './components/Header'
import LocationButton from './components/LocationButton'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import CitySuggestions from './components/CitySuggestions'
import { CAPITAL_CITIES, getWeatherForCity } from './services/weatherService'
import { TranslationProvider, useTranslation } from './context/TranslationContext'
import { detectUserCountry } from './services/ipLocationService'
import EmbedPage from './pages/EmbedPage'
import WidgetConfigPage from './pages/WidgetConfigPage'

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
  const [searchResults, setSearchResults] = useState(null);
  const { setLanguage } = useTranslation();

  // Get the current path
  const path = window.location.pathname.toLowerCase();

  // Handle different routes
  if (path === '/embed' || path.startsWith('/embed/')) {
    return <EmbedPage />;
  }
  if (path === '/widget' || path.startsWith('/widget/')) {
    return <WidgetConfigPage />;
  }

  // Detect user's country on initial load
  useEffect(() => {
    const detectLocation = async () => {
      try {
        setIsLoading(true);
        const { country, city, language } = await detectUserCountry();
        setSelectedCountry(country);
        setSelectedCity(city);
        
        // Only set language on initial load if it's not already set in localStorage
        const savedLanguage = localStorage.getItem('language');
        if (!savedLanguage) {
          console.log('Setting initial language based on IP detection:', language);
          setLanguage(language);
        }
      } catch (error) {
        console.error('Error detecting location:', error);
        // Only set default language if none is saved
        const savedLanguage = localStorage.getItem('language');
        if (!savedLanguage) {
          setLanguage('en');
        }
      } finally {
        setIsLoading(false);
      }
    };

    detectLocation();
  }, [setLanguage]);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedCity(null); // Reset city when country changes manually
    setSearchResults(null); // Clear search results
  };

  const handleLocationFound = (country, city) => {
    setSelectedCountry(country);
    setSelectedCity(city);
    setSearchResults(null); // Clear search results
  };

  const handleSearch = async (query) => {
    try {
      setIsLoading(true);
      // Simple search implementation - find cities that match the query
      const matchingCities = CAPITAL_CITIES.filter(city => 
        city.city.toLowerCase().includes(query.toLowerCase()) ||
        city.country.toLowerCase().includes(query.toLowerCase())
      );

      if (matchingCities.length > 0) {
        // Use the first matching city
        const cityInfo = matchingCities[0];
        const data = await getWeatherForCity(cityInfo);
        setSearchResults(data);
        setSelectedCountry(cityInfo.country);
        setSelectedCity(cityInfo.city);
      } else {
        console.log('No matching cities found for:', query);
        setSearchResults(null);
      }
    } catch (error) {
      console.error('Error searching for city:', error);
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCitySuggestionSelect = async (cityName) => {
    try {
      setIsLoading(true);
      // Find the city in our list
      const cityInfo = CAPITAL_CITIES.find(city => 
        city.city === cityName && (city.country === selectedCountry || selectedCountry === null)
      ) || CAPITAL_CITIES.find(city => city.city === cityName);
      
      if (cityInfo) {
        const data = await getWeatherForCity(cityInfo);
        setSearchResults(data);
        setSelectedCountry(cityInfo.country);
        setSelectedCity(cityInfo.city);
      }
    } catch (error) {
      console.error('Error selecting suggested city:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-black flex flex-col pt-4 md:pt-8">
      <LocationButton onLocationFound={handleLocationFound} />
      <Header 
        selectedCountry={selectedCountry} 
        onCountryChange={handleCountryChange}
      />
      <SearchBar onSearch={handleSearch} />
      <CitySuggestions 
        onCitySelect={handleCitySuggestionSelect} 
        selectedCountry={selectedCountry} 
      />
      {!isLoading && (
        <WeatherCard 
          selectedCountry={selectedCountry} 
          initialCity={selectedCity}
          searchResults={searchResults}
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
