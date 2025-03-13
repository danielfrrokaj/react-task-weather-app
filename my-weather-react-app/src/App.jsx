import { useState, useEffect } from 'react'
import Nav from './components/nav'
import SearchBar from './components/SearchBar'
import LocalTime from './components/LocalTime/LocalTime'
import CityData from './components/CityData'
import WeatherFeatures from './components/WeatherFeatures'
import Footer from './components/Footer'
import backgroundImage from './assets/background.jpg'
import { fetchWeatherData } from './utils/weatherApi'
import './App.css'

function App() {
  const [selectedCity, setSelectedCity] = useState('Tirana');
  const [weatherData, setWeatherData] = useState(null);

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
    <div className="app-container">
      {/* Background light orbs */}
      <div className="light-orb light-orb-1" />
      <div className="light-orb light-orb-2" />
      <div className="light-orb light-orb-3" />

      <Nav onCitySelect={handleCitySelect} />
      <main className="main-content">
        <div className="flex-container">
          <div className="flex-item glass-card">
            <SearchBar 
              onCitySelect={handleCitySelect} 
              selectedCity={selectedCity}
            />
          </div>
          <div className="flex-item glass-card">
            <LocalTime />
          </div>
        </div>
        
        <div className="city-data-wrapper">
          <div className="city-data-container">
            <CityData cityName={selectedCity} />
          </div>
          <div className="weather-features">
            <WeatherFeatures weatherData={weatherData} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App
