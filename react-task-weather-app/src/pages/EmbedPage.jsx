import { useState } from 'react';
import { CAPITAL_CITIES } from '../services/weatherService';

const EmbedPage = () => {
    const [selectedCity, setSelectedCity] = useState('London');
    const [width, setWidth] = useState('400');
    const [height, setHeight] = useState('600');

    const baseUrl = window.location.origin;
    const embedUrl = `${baseUrl}/embed?city=${selectedCity}&width=${width}px&height=${height}px`;
    const iframeCode = `<iframe src="${embedUrl}" width="${width}" height="${height}" frameborder="0" style="border-radius: 12px;"></iframe>`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-black p-8">
            <div className="max-w-4xl mx-auto bg-white/10 rounded-lg p-8 backdrop-blur-sm">
                <h1 className="text-3xl font-bold text-white mb-8">Embed Weather Widget</h1>
                
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl text-white mb-4">1. Customize your widget</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-white mb-2">City</label>
                                <select 
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    className="w-full p-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {CAPITAL_CITIES.map(city => (
                                        <option key={city.city} value={city.city}>{city.city}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-white mb-2">Width (px)</label>
                                <input 
                                    type="number"
                                    value={width}
                                    onChange={(e) => setWidth(e.target.value)}
                                    className="w-full p-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-white mb-2">Height (px)</label>
                                <input 
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    className="w-full p-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl text-white mb-4">2. Preview</h2>
                        <div className="border border-white/30 rounded-lg overflow-hidden">
                            <iframe 
                                src={embedUrl}
                                width={width}
                                height={height}
                                frameBorder="0"
                                title="Weather Widget Preview"
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl text-white mb-4">3. Get the code</h2>
                        <div className="relative">
                            <pre className="bg-black/50 p-4 rounded-lg text-white overflow-x-auto">
                                {iframeCode}
                            </pre>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(iframeCode);
                                    alert('Code copied to clipboard!');
                                }}
                                className="absolute top-2 right-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmbedPage; 