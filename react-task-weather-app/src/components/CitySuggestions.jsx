import { useTranslation } from '../context/TranslationContext';
import { CAPITAL_CITIES } from '../services/weatherService';

const CitySuggestions = ({ onCitySelect, selectedCountry }) => {
    const { t } = useTranslation();
    
    // Get popular cities - either from the selected country or a mix of major cities
    const getPopularCities = () => {
        // If a country is selected, show cities from that country (up to 6)
        const countryCities = CAPITAL_CITIES.filter(city => city.country === selectedCountry).slice(0, 6);
        
        if (countryCities.length >= 4) {
            return countryCities;
        }
        
        // If not enough cities from the selected country, add some major European cities
        const majorCities = [
            { city: 'London', country: 'United Kingdom' },
            { city: 'Paris', country: 'France' },
            { city: 'Berlin', country: 'Germany' },
            { city: 'Rome', country: 'Italy' },
            { city: 'Madrid', country: 'Spain' },
            { city: 'Amsterdam', country: 'Netherlands' }
        ].filter(city => city.country !== selectedCountry);
        
        // Combine country cities with major cities, up to 6 total
        return [...countryCities, ...majorCities].slice(0, 6);
    };
    
    const popularCities = getPopularCities();
    
    if (popularCities.length === 0) return null;
    
    return (
        <div className="w-full max-w-[800px] mx-auto mt-2 px-4">
            <div className="mb-2">
                <h3 className="text-sm text-white/70">{t('search.suggestions')}</h3>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {popularCities.map((cityInfo) => (
                    <button
                        key={`${cityInfo.country}-${cityInfo.city}`}
                        onClick={() => onCitySelect(cityInfo.city)}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white whitespace-nowrap transition-colors flex-shrink-0"
                    >
                        {cityInfo.city}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CitySuggestions; 