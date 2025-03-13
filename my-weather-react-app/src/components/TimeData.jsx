import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

const TimeData = () => {
    const { t } = useTranslation();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const updateTime = () => {
            setCurrentTime(new Date());
        };

        // Update time immediately and then set an interval to update every 60 seconds
        updateTime();
        const intervalId = setInterval(updateTime, 60000); // 60000 ms = 60 seconds

        // Cleanup function to clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <p>{t('time')}: {currentTime.toLocaleTimeString()}</p>
        </div>
    );
};

export default TimeData;