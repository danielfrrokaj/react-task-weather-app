import React from 'react';
import './WeatherFeatures.css'; // Import the CSS file

const WeatherFeatures = ({ weatherData }) => {
  if (!weatherData) {
    return <div>Loading...</div>; // Handle loading state
  }

  const { temp_c, humidity, wind_kph, condition } = weatherData.current;

  return (
    <div className="weather-features">
      <div className="column">
        <div className="weather-feature">
          <span className="weather-feature-label">Temperatura:</span>
          <span className="weather-feature-value">{temp_c} °C</span>
        </div>
        <div className="weather-feature">
          <span className="weather-feature-label">Lagështia:</span>
          <span className="weather-feature-value">{humidity} %</span>
        </div>
      </div>
      <div className="column">
        <div className="weather-feature">
          <span className="weather-feature-label">Shpejtësia e erës:</span>
          <span className="weather-feature-value">{wind_kph} kph</span>
        </div>
        <div className="weather-feature">
          <span className="weather-feature-label">Kushtet:</span>
          <span className="weather-feature-value">{condition.text}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherFeatures;