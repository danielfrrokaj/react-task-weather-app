import { createContext, useContext, useState, useEffect } from 'react';
import en from '../translations/en';
import al from '../translations/al';
import it from '../translations/it';

const translations = { en, al, it };

const TranslationContext = createContext();

// Get language from localStorage or default to 'en'
const getInitialLanguage = () => {
    const savedLanguage = localStorage.getItem('language');
    console.log('Initial language from localStorage:', savedLanguage);
    
    // Always default to English if no language is saved
    if (!savedLanguage) {
        console.log('No language preference found, defaulting to English');
        return 'en';
    }
    
    // Validate that the saved language is supported
    if (!translations[savedLanguage]) {
        console.log('Saved language not supported, defaulting to English');
        return 'en';
    }
    
    return savedLanguage;
};

export const TranslationProvider = ({ children }) => {
    const [language, setLanguageState] = useState(getInitialLanguage);

    // Custom setter that also updates localStorage
    const setLanguage = (lang) => {
        console.log('Setting language to:', lang);
        
        // Validate the language before setting it
        if (!translations[lang]) {
            console.warn(`Attempted to set unsupported language: ${lang}, defaulting to English`);
            lang = 'en';
        }
        
        localStorage.setItem('language', lang);
        setLanguageState(lang);
    };

    // Log when language changes
    useEffect(() => {
        console.log('Language changed to:', language);
    }, [language]);

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];
        
        // If translation doesn't exist for this language, fall back to English
        if (!value) {
            console.warn(`No translations found for language: ${language}, falling back to English`);
            value = translations.en;
        }
        
        for (const k of keys) {
            value = value?.[k];
            if (!value) break;
        }
        
        if (!value) {
            console.warn(`Translation key not found: ${key} for language: ${language}`);
            return key;
        }
        
        return value;
    };

    return (
        <TranslationContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(TranslationContext);
    if (!context) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }
    return context;
}; 