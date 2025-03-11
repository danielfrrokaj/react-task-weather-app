import { useState } from 'react'
import Nav from './components/nav'
import SearchBar from './components/SearchBar'
import LocalTime from './components/LocalTime'
import CityData from './components/CityData'
import backgroundImage from './assets/background.jpg'
import './App.css'

function App() {
  const [selectedCity, setSelectedCity] = useState('Tirana');

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

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
          <CityData cityName={selectedCity} />
        </div>
        
        {/* Your main content goes here */}
      </main>
    </div>  
    </> 
  );
}

export default App
