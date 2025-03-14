import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './CityData.css';
import { fetchWeatherData } from '../utils/weatherApi';
import { getNextCity, getPrevCity } from './nav';
import rightArrow from "../assets/button_icon/right-arrow.png";
import rightArrowHover from "../assets/button_icon/right-arrow-hover.png";

const CityData = ({ cityName = 'Tirana', onCitySelect }) => {
    const { t } = useTranslation();
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Use the city name directly as the location query
                const locationQuery = cityName;
                
                const data = await fetchWeatherData(locationQuery);
                setWeatherData(data);
            } catch (err) {
                console.error('Error fetching weather data:', err);
                setError('Failed to load weather data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [cityName]);

    // Format temperature to show only integer part
    const formatTemperature = (temp) => {
        if (temp === undefined || temp === null) return '';
        return `${Math.round(temp)}°C`;
    };

    const handlePrevCity = () => {
        const prevCity = getPrevCity(cityName);
        if (onCitySelect) {
            onCitySelect(prevCity);
        }
    };

    const handleNextCity = () => {
        const nextCity = getNextCity(cityName);
        if (onCitySelect) {
            onCitySelect(nextCity);
        }
    };

    return (
        <div className="city-data-container">
            <button 
                className="city-nav-button prev-button"
                onClick={handlePrevCity}
                onMouseEnter={() => setHoveredButton('prev')}
                onMouseLeave={() => setHoveredButton(null)}
            >
                <img 
                    src={hoveredButton === 'prev' ? rightArrowHover : rightArrow} 
                    alt="Previous city" 
                    className="prev-icon"
                />
            </button>

            <div className="city-data-content">
                {loading && <p className="loading-text">Loading weather data...</p>}
                
                {error && <p className="error-text">{error}</p>}
                
                {!loading && !error && weatherData && (
                    <>
                        <h3 className="country-name">{t(`countries.${weatherData.location.country}`)}</h3>
                        <h1 className="city-name">{t(`cities.${cityName}`)}</h1>
                        <div className="temperature-container">
                            <h2 className="temperature-text">
                                {formatTemperature(weatherData.current.temp_c)}
                            </h2>
                            <img 
                                src={`https:${weatherData.current.condition.icon}`} 
                                alt={weatherData.current.condition.text} 
                                className="weather-icon"
                            />
                            <p className='info-text'>{weatherData.current.condition.text}</p>
                        </div>
                    </>
                )}
            </div>

            <button 
                className="city-nav-button next-button"
                onClick={handleNextCity}
                onMouseEnter={() => setHoveredButton('next')}
                onMouseLeave={() => setHoveredButton(null)}
            >
                <img 
                    src={hoveredButton === 'next' ? rightArrowHover : rightArrow} 
                    alt="Next city" 
                    className="next-icon"
                />
            </button>
        </div>
    );
};

export default CityData; 