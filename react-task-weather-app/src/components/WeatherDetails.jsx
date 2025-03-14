const WeatherDetails = ({ weatherData }) => {
    if (!weatherData) return null;

    const details = [
        {
            icon: 'fa-temperature-half',
            label: 'Feels Like',
            value: `${Math.round(weatherData.current.feelslike_c)}°C`,
            color: 'text-red-500'
        },
        {
            icon: 'fa-droplet',
            label: 'Humidity',
            value: `${weatherData.current.humidity}%`,
            color: 'text-blue-500'
        },
        {
            icon: 'fa-wind',
            label: 'Wind Speed',
            value: `${weatherData.current.wind_kph} km/h`,
            color: 'text-teal-500'
        },
        {
            icon: 'fa-compass',
            label: 'Wind Direction',
            value: weatherData.current.wind_dir,
            color: 'text-purple-500'
        },
        {
            icon: 'fa-gauge-high',
            label: 'Pressure',
            value: `${weatherData.current.pressure_mb} mb`,
            color: 'text-amber-500'
        },
        {
            icon: 'fa-cloud-rain',
            label: 'Precipitation',
            value: `${weatherData.current.precip_mm} mm`,
            color: 'text-indigo-500'
        }
    ];

    return (
        <div className="w-full max-w-[800px] mx-auto mt-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl">
                <h3 className="text-2xl font-semibold text-white mb-6">
                    Detailed Weather Information
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {details.map((detail, index) => (
                        <div 
                            key={index}
                            className="bg-white/5 backdrop-blur-sm rounded-lg p-4 flex items-center gap-4 transition-transform hover:scale-105"
                        >
                            <div className={`text-2xl ${detail.color}`}>
                                <i className={`fas ${detail.icon}`}></i>
                            </div>
                            <div>
                                <p className="text-white/60 text-sm">
                                    {detail.label}
                                </p>
                                <p className="text-white font-semibold">
                                    {detail.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeatherDetails; 