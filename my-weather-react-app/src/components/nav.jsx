import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./nav.css";
import rightArrow from "../assets/button_icon/right-arrow.png";
import rightArrowHover from "../assets/button_icon/right-arrow-hover.png";
import { EUROPEAN_CAPITALS } from "../utils/weatherApi";
import LocationWeather from "./LocationWeather";

const Nav = ({ onCitySelect }) => {
    const { t } = useTranslation();
    // List of European capital cities
    const europeanCapitals = EUROPEAN_CAPITALS;

    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const [visibleCities, setVisibleCities] = useState([]);
    const [hoveredButton, setHoveredButton] = useState(null);
    const [slideDirection, setSlideDirection] = useState(null);
    const [activeCity, setActiveCity] = useState("Tirana");

    // Calculate how many cities to show based on screen width
    const updateVisibleCities = () => {
        const width = window.innerWidth;
        let visibleCount = 5; // Default for larger screens
        
        if (width < 768) {
            visibleCount = 4;
        }
        if (width < 480) {
            visibleCount = 3;
        }
        
        const cities = [];
        for (let i = 0; i < visibleCount; i++) {
            const index = (currentIndex + i) % europeanCapitals.length;
            cities.push(europeanCapitals[index]);
        }
        setVisibleCities(cities);
    };

    useEffect(() => {
        updateVisibleCities(); // Call the function to set initial visible cities
        window.addEventListener('resize', updateVisibleCities);
        
        return () => {
            window.removeEventListener('resize', updateVisibleCities);
        };
    }, [currentIndex]); // Only re-run when currentIndex changes

    const handlePrev = () => {
        setSlideDirection('slide-left');
        setTimeout(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === 0 ? europeanCapitals.length - 1 : prevIndex - 1
            );
            setTimeout(() => setSlideDirection(null), 50);
        }, 50);
    };

    const handleNext = () => {
        setSlideDirection('slide-right');
        setTimeout(() => {
            setCurrentIndex((prevIndex) => 
                (prevIndex + 1) % europeanCapitals.length
            );
            setTimeout(() => setSlideDirection(null), 50);
        }, 50);
    };

    const handleCityClick = (city) => {
        setActiveCity(city);
        if (onCitySelect) {
            onCitySelect(city);
        }
    };

    return (
        <nav className="nav">
            <div className="nav-content">
                {/* Main navigation wrapper with centered carousel and right-aligned location icon */}
                <div className="nav-wrapper">
                    {/* Carousel positioned in the center */}
                    <div className="carousel-container">
                        <button 
                            className="carousel-button prev-button"
                            onClick={handlePrev}
                            onMouseEnter={() => setHoveredButton('prev')}
                            onMouseLeave={() => setHoveredButton(null)}
                        >
                            <img 
                                src={hoveredButton === 'prev' ? rightArrowHover : rightArrow} 
                                alt="Previous" 
                                className="prev-icon"
                            />
                        </button>
                        
                        <div className="carousel" ref={carouselRef}>
                            {visibleCities.map((city, index) => (
                                <div 
                                    key={`${city}-${index}`} 
                                    className={`carousel-item ${slideDirection} ${city === activeCity ? 'active' : ''}`}
                                    onClick={() => handleCityClick(city)}
                                >
                                    {t(`cities.${city}`)}
                                </div>
                            ))}
                        </div>
                        
                        <button 
                            className="carousel-button next-button"
                            onClick={handleNext}
                            onMouseEnter={() => setHoveredButton('next')}
                            onMouseLeave={() => setHoveredButton(null)}
                        >
                            <img 
                                src={hoveredButton === 'next' ? rightArrowHover : rightArrow} 
                                alt="Next" 
                                className="next-icon"
                            />
                        </button>
                    </div>
                    
                    {/* Location icon positioned in the right corner */}
                    <div className="nav-actions">
                        <LocationWeather onCitySelect={onCitySelect} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;