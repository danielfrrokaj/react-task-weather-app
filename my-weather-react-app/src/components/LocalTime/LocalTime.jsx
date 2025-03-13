import { useState, useEffect } from 'react';
import './LocalTime.css';

const LocalTime = () => {
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const updateDay = () => {
      const now = new Date();
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      setCurrentDay(now.toLocaleDateString(undefined, options));
    };

    updateDay();
    const timer = setInterval(updateDay, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="local-time-container">
      <p className="day-text">{currentDay}</p>
    </div>
  );
};

export default LocalTime; 