import { useTranslation } from '../context/TranslationContext';
import { Link } from 'react-router-dom';

const Footer = () => {
    const { language, setLanguage, t } = useTranslation();
    
    console.log('Footer rendering with language:', language);

    const handleLanguageChange = (lang) => {
        console.log('Language button clicked:', lang);
        setLanguage(lang);
    };

    return (
        <footer className="bg-black/30 backdrop-blur-sm text-white py-4 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-center md:text-left">
                        {t('footer.developedBy')} <a href="https://github.com/sonigeez" className="text-blue-400 hover:text-blue-300">@sonigeez</a>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => handleLanguageChange('en')}
                            className={`px-3 py-1 rounded ${language === 'en' ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-blue-600 transition-colors`}
                        >
                            {t('footer.languages.en')}
                        </button>
                        <button
                            onClick={() => handleLanguageChange('it')}
                            className={`px-3 py-1 rounded ${language === 'it' ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-blue-600 transition-colors`}
                        >
                            {t('footer.languages.it')}
                        </button>
                        <button
                            onClick={() => handleLanguageChange('al')}
                            className={`px-3 py-1 rounded ${language === 'al' ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-blue-600 transition-colors`}
                        >
                            {t('footer.languages.al')}
                        </button>
                    </div>
                    <Link 
                        to="/embed-widget"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        Get embedded weather card for free
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 