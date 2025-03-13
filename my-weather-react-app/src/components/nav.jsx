import { useState, useRef, useEffect } from "react";
import "./nav.css";
import rightArrow from "../assets/button_icon/right-arrow.png";
import rightArrowHover from "../assets/button_icon/right-arrow-hover.png";
import { EUROPEAN_CAPITALS } from "../utils/weatherApi";

const Nav = ({ onCitySelect, selectedCity = "Tirana" }) => {
    // List of European capital cities
    const europeanCapitals = EUROPEAN_CAPITALS;

    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const [visibleCities, setVisibleCities] = useState([]);
    const [hoveredButton, setHoveredButton] = useState(null);
    const [slideDirection, setSlideDirection] = useState(null);
    const [activeCity, setActiveCity] = useState(selectedCity);

    // Update active city when selectedCity prop changes
    useEffect(() => {
        setActiveCity(selectedCity);
        
        // Find the index of the selected city and update the carousel position
        const cityIndex = europeanCapitals.findIndex(city => city === selectedCity);
        if (cityIndex !== -1) {
            setCurrentIndex(cityIndex);
        }
    }, [selectedCity]);

    // Calculate how many cities to show based on screen width
    const updateVisibleCities = () => {
        const width = window.innerWidth;
        let visibleCount = 5; // Default for larger screens
        
        if (width < 768) {
            visibleCount = 4;
        }
        if (width < 480) {
            visibleCount = 4;
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
            // Get the previous city in the list
            const prevIndex = currentIndex === 0 ? europeanCapitals.length - 1 : currentIndex - 1;
            setCurrentIndex(prevIndex);
            
            // Set the active city to the first visible city after navigation
            const newActiveCity = europeanCapitals[prevIndex];
            setActiveCity(newActiveCity);
            if (onCitySelect) {
                onCitySelect(newActiveCity);
            }
            
            setTimeout(() => setSlideDirection(null), 50);
        }, 50);
    };

    const handleNext = () => {
        setSlideDirection('slide-right');
        setTimeout(() => {
            // Get the next city in the list
            const nextIndex = (currentIndex + 1) % europeanCapitals.length;
            setCurrentIndex(nextIndex);
            
            // Set the active city to the first visible city after navigation
            const newActiveCity = europeanCapitals[nextIndex];
            setActiveCity(newActiveCity);
            if (onCitySelect) {
                onCitySelect(newActiveCity);
            }
            
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
                                {city}
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
            </div>
        </nav>
    );
};

export default Nav;