import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import sqTranslations from './locales/sq.json';
import deTranslations from './locales/de.json';

const getDefaultLanguage = () => {
  // Get coordinates from localStorage if they exist
  const storedCoords = localStorage.getItem('userCoordinates');
  if (storedCoords) {
    const { latitude, longitude } = JSON.parse(storedCoords);
    
    // Albania's approximate bounding box
    if (latitude >= 39.6 && latitude <= 42.7 && longitude >= 19.2 && longitude <= 21.1) {
      return 'sq';
    }
    
    // Germany's approximate bounding box
    if (latitude >= 47.3 && latitude <= 55.1 && longitude >= 5.9 && longitude <= 15.0) {
      return 'de';
    }
  }
  
  return 'en'; // Default to English
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: enTranslations,
      sq: sqTranslations,
      de: deTranslations
    },
    lng: getDefaultLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 