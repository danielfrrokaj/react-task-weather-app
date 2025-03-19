import { useState, useEffect } from 'react';
import { CAPITAL_CITIES } from '../services/weatherService';

function WidgetConfigPage() {
    const [config, setConfig] = useState({
        city: 'London',
        country: 'United Kingdom',
        width: '400',
        height: '600',
        fontColor: '#ffffff',
        backgroundColor: 'transparent'
    });
    const [embedCode, setEmbedCode] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');

    useEffect(() => {
        const baseUrl = window.location.origin;
        const embedUrl = `${baseUrl}/embed?city=${encodeURIComponent(config.city)}&country=${encodeURIComponent(config.country)}&width=${config.width}&height=${config.height}&fontColor=${encodeURIComponent(config.fontColor)}&backgroundColor=${encodeURIComponent(config.backgroundColor)}`;
        
        setPreviewUrl(embedUrl);
        setEmbedCode(`<iframe src="${embedUrl}" width="${config.width}" height="${config.height}" frameborder="0" style="border-radius: 15px;"></iframe>`);
    }, [config]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConfig(prev => ({ ...prev, [name]: value }));
    };

    const handleCitySelect = (e) => {
        const cityInfo = CAPITAL_CITIES.find(c => c.city === e.target.value);
        if (cityInfo) {
            setConfig(prev => ({
                ...prev,
                city: cityInfo.city,
                country: cityInfo.country
            }));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-black p-8">
            <div className="max-w-4xl mx-auto bg-slate-800 rounded-lg p-6 shadow-xl">
                <h1 className="text-3xl font-bold text-white mb-6">Weather Widget Configuration</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-white mb-2">City</label>
                            <select
                                name="city"
                                value={config.city}
                                onChange={handleCitySelect}
                                className="w-full p-2 rounded bg-slate-700 text-white"
                            >
                                {CAPITAL_CITIES.map(city => (
                                    <option key={`${city.city}-${city.country}`} value={city.city}>
                                        {city.city}, {city.country}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-white mb-2">Width (px)</label>
                            <input
                                type="number"
                                name="width"
                                value={config.width}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-slate-700 text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-white mb-2">Height (px)</label>
                            <input
                                type="number"
                                name="height"
                                value={config.height}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-slate-700 text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-white mb-2">AI Text Color</label>
                            <input
                                type="color"
                                name="fontColor"
                                value={config.fontColor}
                                onChange={handleChange}
                                className="w-full p-1 rounded bg-slate-700"
                            />
                        </div>

                        <div>
                            <label className="block text-white mb-2">Background Color</label>
                            <div className="flex gap-4">
                                <input
                                    type="color"
                                    name="backgroundColor"
                                    value={config.backgroundColor === 'transparent' ? '#ffffff' : config.backgroundColor}
                                    onChange={handleChange}
                                    className="w-1/2 p-1 rounded bg-slate-700"
                                />
                                <button
                                    onClick={() => setConfig(prev => ({ ...prev, backgroundColor: 'transparent' }))}
                                    className={`w-1/2 px-3 py-1 rounded ${config.backgroundColor === 'transparent' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-white/80'} hover:bg-blue-700`}
                                >
                                    Transparent
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-white mb-4">Preview</h2>
                            <div className="border border-slate-600 rounded-lg p-2 bg-slate-900/50">
                                <iframe
                                    src={previewUrl}
                                    width={config.width}
                                    height={config.height}
                                    frameBorder="0"
                                    className="rounded-lg"
                                    title="Weather Widget Preview"
                                />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-white mb-4">Embed Code</h2>
                            <div className="relative">
                                <textarea
                                    value={embedCode}
                                    readOnly
                                    className="w-full h-24 p-3 rounded bg-slate-900 text-white font-mono text-sm"
                                />
                                <button
                                    onClick={() => navigator.clipboard.writeText(embedCode)}
                                    className="absolute top-2 right-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                                >
                                    Copy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WidgetConfigPage; 