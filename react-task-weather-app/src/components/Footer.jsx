import { useTranslation } from '../context/TranslationContext';

const Footer = () => {
    const { language, setLanguage, t } = useTranslation();
    
    console.log('Footer rendering with language:', language);

    const handleLanguageChange = (lang) => {
        console.log('Language button clicked:', lang);
        setLanguage(lang);
    };

    return (
        <footer className="w-full bg-white/5 backdrop-blur-sm py-3 px-4 mt-auto">
            <div className="max-w-[800px] mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-white/10 rounded-lg overflow-hidden">
                        <button
                            onClick={() => handleLanguageChange('al')}
                            className={`px-3 py-1 text-sm transition-colors duration-200 ${
                                language === 'al' ? 'bg-blue-500 text-white' : 'text-white/80 hover:text-white'
                            }`}
                        >
                            AL
                        </button>
                        <button
                            onClick={() => handleLanguageChange('en')}
                            className={`px-3 py-1 text-sm transition-colors duration-200 ${
                                language === 'en' ? 'bg-blue-500 text-white' : 'text-white/80 hover:text-white'
                            }`}
                        >
                            EN
                        </button>
                        <button
                            onClick={() => handleLanguageChange('it')}
                            className={`px-3 py-1 text-sm transition-colors duration-200 ${
                                language === 'it' ? 'bg-blue-500 text-white' : 'text-white/80 hover:text-white'
                            }`}
                        >
                            IT
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                    <span className="text-sm">{t('footer.developedBy')} Danjel Frrokaj</span>
                    <a
                        href="https://github.com/frrokaj"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors duration-200"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 