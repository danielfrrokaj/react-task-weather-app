export default {
    header: {
        title: 'App Meteo',
        selectCountry: 'Seleziona Paese'
    },
    weather: {
        humidity: 'Umidità',
        wind: 'Vento',
        feelsLike: 'Percepita',
        condition: 'Condizioni',
        pressure: 'Pressione',
        visibility: 'Visibilità',
        uvIndex: 'Indice UV',
        dewPoint: 'Punto di Rugiada',
        sunrise: 'Alba',
        sunset: 'Tramonto',
        moonrise: 'Sorgere della Luna',
        moonset: 'Tramonto della Luna',
        moonPhase: 'Fase Lunare',
        precipitation: 'Precipitazioni',
        cloudCover: 'Copertura Nuvolosa',
        windGust: 'Raffiche di Vento',
        windDirection: 'Direzione del Vento',
        temperature: 'Temperatura',
        maxTemp: 'Temperatura Massima',
        minTemp: 'Temperatura Minima',
        feelsLikeMax: 'Percepita Massima',
        feelsLikeMin: 'Percepita Minima',
        humidityMax: 'Umidità Massima',
        humidityMin: 'Umidità Minima',
        pressureMax: 'Pressione Massima',
        pressureMin: 'Pressione Minima',
        windMax: 'Vento Massimo',
        windMin: 'Vento Minimo',
        precipitationMax: 'Precipitazioni Massime',
        precipitationMin: 'Precipitazioni Minime',
        uvIndexMax: 'Indice UV Massimo',
        uvIndexMin: 'Indice UV Minimo',
        conditions: {
            'clear': 'Sereno',
            'partly-cloudy': 'Parzialmente Nuvoloso',
            'cloudy': 'Nuvoloso',
            'overcast': 'Coperto',
            'mist': 'Nebbia',
            'fog': 'Nebbia Fitta',
            'light-rain': 'Pioggia Leggera',
            'moderate-rain': 'Pioggia Moderata',
            'heavy-rain': 'Pioggia Forte',
            'light-snow': 'Neve Leggera',
            'moderate-snow': 'Neve Moderata',
            'heavy-snow': 'Neve Forte',
            'thunderstorm': 'Temporale',
            'hail': 'Grandine'
        }
    },
    ai: {
        title: 'Raccomandazione Meteo AI',
        clothing: 'ABBIGLIAMENTO',
        activities: 'ATTIVITÀ',
        error: 'Spiacenti, non è stato possibile generare un consiglio in questo momento.',
        reset: 'Reset',
        loading: 'Generazione consigli in corso...',
        health: 'SALUTE',
        tips: 'SUGGERIMENTI',
        recommendations: {
            clothing: {
                hot: {
                    title: 'Abbigliamento per il Caldo',
                    items: [
                        'Abbigliamento leggero e traspirante',
                        'Cappello per protezione dal sole',
                        'Occhiali da sole',
                        'Crema solare SPF alta',
                        'Scarpe comode e traspiranti'
                    ]
                },
                warm: {
                    title: 'Abbigliamento per il Caldo Moderato',
                    items: [
                        'Abbigliamento leggero',
                        'Cappello per il sole',
                        'Occhiali da sole',
                        'Crema solare',
                        'Scarpe comode'
                    ]
                },
                mild: {
                    title: 'Abbigliamento per Temperatura Moderata',
                    items: [
                        'Abbigliamento a strati leggeri',
                        'Giacca leggera',
                        'Scarpe comode',
                        'Accessori per il sole'
                    ]
                },
                cool: {
                    title: 'Abbigliamento per il Fresco',
                    items: [
                        'Giacca calda',
                        'Abbigliamento a strati',
                        'Scarpe chiuse',
                        'Sciarpa leggera'
                    ]
                },
                cold: {
                    title: 'Abbigliamento per il Freddo',
                    items: [
                        'Giacca pesante',
                        'Abbigliamento termico',
                        'Stivali caldi',
                        'Guanti e cappello'
                    ]
                }
            },
            activities: {
                hot: {
                    title: 'Attività per il Caldo',
                    items: [
                        'Nuoto',
                        'Attività acquatiche',
                        'Esercizi al mattino presto',
                        'Attività in ombra'
                    ]
                },
                warm: {
                    title: 'Attività per il Caldo Moderato',
                    items: [
                        'Sport all\'aperto',
                        'Escursioni leggere',
                        'Ciclismo',
                        'Attività ricreative'
                    ]
                },
                mild: {
                    title: 'Attività per Temperatura Moderata',
                    items: [
                        'Jogging',
                        'Ciclismo',
                        'Escursioni',
                        'Sport all\'aperto'
                    ]
                },
                cool: {
                    title: 'Attività per il Fresco',
                    items: [
                        'Camminate',
                        'Jogging leggero',
                        'Attività indoor',
                        'Escursioni brevi'
                    ]
                },
                cold: {
                    title: 'Attività per il Freddo',
                    items: [
                        'Sci',
                        'Pattinaggio',
                        'Attività indoor',
                        'Escursioni invernali'
                    ]
                }
            },
            health: {
                hot: {
                    title: 'Consigli per la Salute in Clima Caldo',
                    items: [
                        'Bere molta acqua',
                        'Evitare l\'esposizione diretta al sole',
                        'Usare crema solare',
                        'Fare pause frequenti'
                    ]
                },
                cold: {
                    title: 'Consigli per la Salute in Clima Freddo',
                    items: [
                        'Mantenersi caldi',
                        'Proteggere le estremità',
                        'Evitare l\'esposizione prolungata',
                        'Indossare abiti appropriati'
                    ]
                },
                rain: {
                    title: 'Consigli per la Salute in Caso di Pioggia',
                    items: [
                        'Indossare abiti impermeabili',
                        'Proteggere gli effetti personali',
                        'Fare attenzione alle superfici scivolose',
                        'Evitare temporali'
                    ]
                }
            }
        }
    },
    location: {
        useMyLocation: 'Usa La Mia Posizione',
        error: 'Impossibile trovare la tua posizione',
        loading: 'Ottenendo la posizione...',
        search: 'Cerca una città...',
        noResults: 'Nessun risultato trovato'
    },
    footer: {
        developedBy: 'Sviluppato Da',
        languages: {
            en: 'English',
            it: 'Italiano',
            al: 'Shqip'
        }
    },
    countries: {
        'Albania': 'Albania',
        'Austria': 'Austria',
        'Belgium': 'Belgio',
        'Denmark': 'Danimarca',
        'Finland': 'Finlandia',
        'France': 'Francia',
        'Germany': 'Germania',
        'Ireland': 'Irlanda',
        'Italy': 'Italia',
        'Netherlands': 'Paesi Bassi',
        'Norway': 'Norvegia',
        'Portugal': 'Portogallo',
        'Spain': 'Spagna',
        'Sweden': 'Svezia',
        'United Kingdom': 'Regno Unito'
    }
}; 