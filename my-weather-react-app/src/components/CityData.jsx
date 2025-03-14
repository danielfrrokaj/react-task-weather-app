import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './CityData.css';
import { fetchWeatherData } from '../utils/weatherApi';

const CityData = ({ cityName = 'Tirana' }) => {
    const { t } = useTranslation();
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <div className="city-data-container">
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
    );
};

export default CityData; 