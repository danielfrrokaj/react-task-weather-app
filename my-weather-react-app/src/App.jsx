import React, { useState, useEffect } from 'react'
import Nav from './components/nav'
import SearchBar from './components/SearchBar'
import CityData from './components/CityData'
import WeatherFeatures from './components/WeatherFeatures'
import Footer from './components/Footer'
import { fetchWeatherData } from './utils/weatherApi'
import './App.css'
import LocationWeather from './components/LocationWeather'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrain } from '@fortawesome/free-solid-svg-icons'
import defaultBackground from './assets/background.jpg'

function App() {
  const [selectedCity, setSelectedCity] = useState('Tirana');
  const [weatherData, setWeatherData] = useState(null);
  const [background, setBackground] = useState(defaultBackground);

  const getWeatherBackground = (condition) => {
    if (!condition) return defaultBackground;
    
    const timeOfDay = condition.is_day ? 'day' : 'night';
    const text = condition.text.toLowerCase();
    
    try {
      // Map weather conditions to background images
      if (text.includes('sunny') || text.includes('clear')) {
        return require(`./assets/background/${timeOfDay}-clear.jpg`);
      } else if (text.includes('partly cloudy')) {
        return require(`./assets/background/${timeOfDay}-partly-cloudy.jpg`);
      } else if (text.includes('cloudy') || text.includes('overcast')) {
        return require(`./assets/background/${timeOfDay}-cloudy.jpg`);
      } else if (
        text.includes('rain') || 
        text.includes('drizzle') || 
        text.includes('sleet') ||
        text.includes('mist')
      ) {
        return require(`./assets/background/${timeOfDay}-rain.jpg`);
      } else if (
        text.includes('snow') || 
        text.includes('blizzard') || 
        text.includes('ice')
      ) {
        return require(`./assets/background/${timeOfDay}-snow.jpg`);
      } else if (
        text.includes('thunder') || 
        text.includes('lightning') || 
        text.includes('storm')
      ) {
        return require(`./assets/background/${timeOfDay}-thunder.jpg`);
      } else if (text.includes('fog') || text.includes('haze')) {
        return require(`./assets/background/${timeOfDay}-fog.jpg`);
      }
      return defaultBackground;
    } catch (error) {
      console.warn('Background image not found:', error);
      return defaultBackground;
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const data = await fetchWeatherData(selectedCity);
        setWeatherData(data);
        if (data?.current?.condition) {
          const newBackground = getWeatherBackground(data.current.condition);
          setBackground(newBackground);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    getWeatherData();
  }, [selectedCity]);

  return (
    <div className="app-container" style={{ 
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <Nav selectedCity={selectedCity} onCitySelect={handleCitySelect} />
      <main className="main-content">
        <div className="flex-container">
          <div className="flex-item glass-card">
            <SearchBar 
              onCitySelect={handleCitySelect} 
              selectedCity={selectedCity}
            />
          </div>
        
          <div className="flex-item glass-card ai-button-container">
            <button className="ai-button">
              <FontAwesomeIcon icon={faBrain} className="ai-icon" />
              <span>Get AI Recommandations</span>
            </button>
          </div>
        </div>
        
        <div className="city-data-wrapper">
          <div className="city-data-container">
            <CityData cityName={selectedCity} onCitySelect={handleCitySelect} />
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
