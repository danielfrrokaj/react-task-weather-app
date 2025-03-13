import { useState, useEffect } from 'react'
import Nav from './components/nav'
import SearchBar from './components/SearchBar'
import LocalTime from './components/LocalTime'
import CityData from './components/CityData'
import WeatherFeatures from './components/WeatherFeatures'
import Footer from './components/Footer'
import backgroundImage from './assets/background.jpg'
import TimeData from './components/TimeData'
import { fetchWeatherData, EUROPEAN_CAPITALS } from './utils/weatherApi'
import { fetchUserLocation, getCapitalByCountryCode } from './utils/geoLocationApi'
import './App.css'

function App() {
  const [selectedCity, setSelectedCity] = useState('Tirana');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user's location based on IP and set initial city
  useEffect(() => {
    const getUserLocation = async () => {
      try {
        setLoading(true);
        const locationData = await fetchUserLocation();
        const countryCode = locationData.country_code;
        
        // Get the capital city for the user's country
        const userCapital = getCapitalByCountryCode(countryCode);
        
        // Check if the capital is in our list of European capitals
        if (userCapital && EUROPEAN_CAPITALS.includes(userCapital)) {
          setSelectedCity(userCapital);
        }
      } catch (error) {
        console.error('Error getting user location:', error);
        // Fall back to default city (Tirana)
      } finally {
        setLoading(false);
      }
    };

    getUserLocation();
  }, []);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const data = await fetchWeatherData(selectedCity);
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    getWeatherData();
  }, [selectedCity]);

  return (
    <>
    <div className="app-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Nav onCitySelect={handleCitySelect} selectedCity={selectedCity} />
      <main className="main-content">
        <div className="flex-container">
          <div className="flex-item">
            <SearchBar 
              onCitySelect={handleCitySelect} 
              selectedCity={selectedCity}
            />
          </div>
          <div className="flex-item">
            <LocalTime />
          </div>
        </div>
        
        <div className="city-data-wrapper">
          <div className="flex-item">
            <CityData cityName={selectedCity} />
          </div>
          <div className="flex-item2">
            <TimeData/>
          </div>
          <div className="weather-features">
            <WeatherFeatures weatherData={weatherData} />
          </div>
        </div>
      </main>
      <Footer />
    </div>  
    </> 
  );
}

export default App
