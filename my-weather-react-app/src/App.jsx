import { useState, useEffect } from 'react'
import Nav from './components/nav'
import SearchBar from './components/SearchBar'
import LocalTime from './components/LocalTime'
import CityData from './components/CityData'
import WeatherFeatures from './components/WeatherFeatures'
import Footer from './components/Footer'
import backgroundImage from './assets/background.jpg'
import TimeData from './components/TimeData'
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
    <>
    <div className="app-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Nav onCitySelect={handleCitySelect} />
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
          <div className="weather-features"></div>
          <WeatherFeatures weatherData={weatherData} />
        </div>
        
        {/* Your main content goes here */}
      </main>
      <Footer />
    </div>  
    </> 
  );
}

export default App
