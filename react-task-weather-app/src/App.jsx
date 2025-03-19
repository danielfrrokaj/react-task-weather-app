import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WeatherCard from './components/WeatherCard'
import Header from './components/Header'
import LocationButton from './components/LocationButton'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import CitySuggestions from './components/CitySuggestions'
import { CAPITAL_CITIES, getWeatherForCity } from './services/weatherService'
import { TranslationProvider } from './context/TranslationContext'
import { detectUserCountry } from './services/ipLocationService'
import EmbeddedWeatherCard from './components/EmbeddedWeatherCard'
import EmbedPage from './pages/EmbedPage'

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
    setSelectedCity(null);
    setSearchResults(null);
  };

  const handleLocationFound = (country, city) => {
    setSelectedCountry(country);
    setSelectedCity(city);
    setSearchResults(null);
  };

  const handleSearch = async (query) => {
    try {
      setIsLoading(true);
      const matchingCities = CAPITAL_CITIES.filter(city => 
        city.city.toLowerCase().includes(query.toLowerCase()) ||
        city.country.toLowerCase().includes(query.toLowerCase())
      );

      if (matchingCities.length > 0) {
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
    <Routes>
      <Route path="/embed" element={<EmbeddedWeatherCard />} />
      <Route path="/embed-widget" element={<EmbedPage />} />
      <Route path="/" element={
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
      } />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <TranslationProvider>
        <AppContent />
      </TranslationProvider>
    </Router>
  );
}

export default App;
