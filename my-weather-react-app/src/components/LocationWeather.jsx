import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './LocationWeather.css';
import { EUROPEAN_CAPITALS } from '../utils/weatherApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs, faSpinner, faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const LocationWeather = ({ onCitySelect }) => {
  const { t, i18n } = useTranslation();
  const [locationStatus, setLocationStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');
  
  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
  };
  
  // Capital cities with their coordinates
  const capitalCoordinates = {
    'Tirana': { lat: 41.3275, lon: 19.8187 },
    'Paris': { lat: 48.8566, lon: 2.3522 },
    'London': { lat: 51.5074, lon: -0.1278 },
    'Berlin': { lat: 52.5200, lon: 13.4050 },
    'Rome': { lat: 41.9028, lon: 12.4964 },
    'Madrid': { lat: 40.4168, lon: -3.7038 },
    'Lisbon': { lat: 38.7223, lon: -9.1393 },
    'Amsterdam': { lat: 52.3676, lon: 4.9041 },
    'Brussels': { lat: 50.8503, lon: 4.3517 },
    'Vienna': { lat: 48.2082, lon: 16.3738 },
    'Athens': { lat: 37.9838, lon: 23.7275 },
    'Warsaw': { lat: 52.2297, lon: 21.0122 },
    'Prague': { lat: 50.0755, lon: 14.4378 },
    'Budapest': { lat: 47.4979, lon: 19.0402 },
    'Dublin': { lat: 53.3498, lon: -6.2603 },
    'Stockholm': { lat: 59.3293, lon: 18.0686 },
    'Copenhagen': { lat: 55.6761, lon: 12.5683 },
    'Helsinki': { lat: 60.1699, lon: 24.9384 },
    'Oslo': { lat: 59.9139, lon: 10.7522 }
    // Add more capitals as needed
  };
  
  // Find the nearest capital to the user's location
  const findNearestCapital = (userLat, userLon) => {
    let nearestCapital = 'Tirana'; // Default
    let minDistance = Number.MAX_VALUE;
    
    // Check each capital city
    for (const [capital, coords] of Object.entries(capitalCoordinates)) {
      const distance = calculateDistance(userLat, userLon, coords.lat, coords.lon);
      if (distance < minDistance) {
        minDistance = distance;
        nearestCapital = capital;
      }
    }
    
    return nearestCapital;
  };
  
  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      setLocationStatus('error');
      setErrorMessage(t('locationUnavailable'));
      return;
    }
    
    setLocationStatus('loading');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Store coordinates in localStorage
          localStorage.setItem('userCoordinates', JSON.stringify({ latitude, longitude }));
          
          // Find the nearest European capital
          const nearestCapital = findNearestCapital(latitude, longitude);
          
          // Update the selected city in the parent component
          if (nearestCapital && onCitySelect) {
            onCitySelect(nearestCapital);
          }
          
          // Update language based on location
          if (latitude >= 39.6 && latitude <= 42.7 && longitude >= 19.2 && longitude <= 21.1) {
            i18n.changeLanguage('sq');
          } else if (latitude >= 47.3 && latitude <= 55.1 && longitude >= 5.9 && longitude <= 15.0) {
            i18n.changeLanguage('de');
          } else {
            i18n.changeLanguage('en');
          }
          
          setLocationStatus('success');
          
          // Reset success status after 3 seconds
          setTimeout(() => {
            setLocationStatus('idle');
          }, 3000);
        } catch (error) {
          console.error('Error processing location:', error);
          setLocationStatus('error');
          setErrorMessage(t('unknownError'));
        }
      },
      (error) => {
        setLocationStatus('error');
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setErrorMessage(t('locationDenied'));
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorMessage(t('locationUnavailable'));
            break;
          case error.TIMEOUT:
            setErrorMessage(t('locationTimeout'));
            break;
          default:
            setErrorMessage(t('unknownError'));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };
  
  // Render different icons based on status
  const renderIcon = () => {
    switch (locationStatus) {
      case 'loading':
        return <FontAwesomeIcon icon={faSpinner} spin />;
      case 'success':
        return <FontAwesomeIcon icon={faCheck} />;
      case 'error':
        return <FontAwesomeIcon icon={faExclamationTriangle} />;
      default:
        return <FontAwesomeIcon icon={faLocationCrosshairs} />;
    }
  };
  
  return (
    <div className="location-weather">
      <button 
        onClick={handleLocationClick}
        disabled={locationStatus === 'loading'}
        className="location-button"
        title={t('useLocation')}
      >
        <span className="location-icon">{renderIcon()}</span>
        <span className="location-text">
          {locationStatus === 'loading' ? t('detecting') : t('useLocation')}
        </span>
      </button>
      
      {locationStatus === 'error' && (
        <div className="location-tooltip">
          <p className="location-error">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default LocationWeather; 