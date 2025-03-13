import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTemperatureHalf, 
  faDroplet, 
  faWind, 
  faCloud,
  faSun,
  faCloudRain,
  faCloudBolt,
  faSnowflake,
  faSmog
} from '@fortawesome/free-solid-svg-icons';
import './WeatherFeatures.css';

const WeatherCard = ({ icon, label, value, theme }) => (
  <div className={`weather-card ${theme}`}>
    <div className="weather-feature">
      <div className="feature-icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="feature-content">
        <span className="feature-label">{label}</span>
        <span className="feature-value">{value}</span>
      </div>
    </div>
  </div>
);

const WeatherFeatures = ({ weatherData }) => {
  const { t } = useTranslation();

  if (!weatherData) {
    return (
      <div className="weather-features-loading">
        <FontAwesomeIcon icon={faCloud} spin />
        <span>Loading weather data...</span>
      </div>
    );
  }

  const { temp_c, humidity, wind_kph, condition } = weatherData.current;

  // Function to determine weather icon based on condition text
  const getWeatherIcon = (conditionText) => {
    const text = conditionText.toLowerCase();
    if (text.includes('sun') || text.includes('clear')) return faSun;
    if (text.includes('rain')) return faCloudRain;
    if (text.includes('thunder') || text.includes('storm')) return faCloudBolt;
    if (text.includes('snow') || text.includes('ice')) return faSnowflake;
    if (text.includes('mist') || text.includes('fog')) return faSmog;
    return faCloud;
  };

  const weatherCards = [
    {
      icon: faTemperatureHalf,
      label: t('temperature'),
      value: `${temp_c}°C`,
      theme: 'theme-temperature'
    },
    {
      icon: faDroplet,
      label: t('humidity'),
      value: `${humidity}%`,
      theme: 'theme-humidity'
    },
    {
      icon: faWind,
      label: t('windSpeed'),
      value: `${wind_kph} km/h`,
      theme: 'theme-wind'
    },
    {
      icon: getWeatherIcon(condition.text),
      label: t('conditions'),
      value: condition.text,
      theme: 'theme-conditions'
    }
  ];

  return (
    <div className="weather-features-container">
      <div className="weather-features">
        {weatherCards.map((card, index) => (
          <WeatherCard
            key={index}
            icon={card.icon}
            label={card.label}
            value={card.value}
            theme={card.theme}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherFeatures;