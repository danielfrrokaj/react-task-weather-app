import React, { useState, useEffect } from 'react';
import './CityData.css';
import tempIcon from '../assets/card/temp.png';
import { fetchWeatherData } from '../utils/weatherApi';

const CityData = ({ cityName = 'Tirana' }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Add "Albania" to ensure we get the right city
                const locationQuery = `${cityName}, Albania`;
                
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

    return (
        <div className="city-data-container">
            <h1 className="city-name">{cityName}</h1>
            
            {loading && <p className="loading-text">Loading weather data...</p>}
            
            {error && <p className="error-text">{error}</p>}
            
            {!loading && !error && weatherData && (
                <div className="temperature-container">
                    <h2 className="temperature-text">
                        {formatTemperature(weatherData.current.temp_c)}
                    </h2>
                    <img src={tempIcon} alt="Temperature" className="temperature-icon" /> 
                    <p className='info-text'>{weatherData.current.condition.text}</p>
                </div>
            )}
        </div>
    );
};

export default CityData; 