import { useTranslation } from '../context/TranslationContext';

const AIRecommendButton = ({ onClick }) => {
    const { t } = useTranslation();
    
    return (
        <button
            onClick={onClick}
            className="w-full max-w-[800px] mx-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3"
        >
            <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                />
            </svg>
            {t('ai.title')}
        </button>
    );
};

export default AIRecommendButton; 