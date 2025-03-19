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
        details: {
            title: 'Dettagli Meteo per',
            windSpeed: 'Velocità del Vento',
            windDirection: 'Direzione del Vento',
            humidity: 'Umidità',
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
            windGust: 'Raffiche di Vento'
        },
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
                    title: 'Abbigliamento per Clima Caldo',
                    items: [
                        'Indossa abiti leggeri e traspiranti',
                        'Usa tessuti naturali come cotone e lino',
                        'Indossa un cappello per proteggerti dal sole',
                        'Usa occhiali da sole con protezione UV',
                        'Indossa scarpe aperte e comode'
                    ]
                },
                warm: {
                    title: 'Abbigliamento per Clima Caldo',
                    items: [
                        'Indossa abiti leggeri',
                        'Porta con te un capo leggero per la sera',
                        'Indossa scarpe comode',
                        'Usa occhiali da sole'
                    ]
                },
                mild: {
                    title: 'Abbigliamento per Clima Temperato',
                    items: [
                        'Indossa abiti a strati',
                        'Porta con te un giacchetto leggero',
                        'Indossa scarpe comode',
                        'Porta con te un ombrello'
                    ]
                },
                cool: {
                    title: 'Abbigliamento per Clima Fresco',
                    items: [
                        'Indossa abiti caldi a strati',
                        'Porta con te un giacchetto caldo',
                        'Indossa guanti e sciarpa',
                        'Indossa scarpe calde e impermeabili'
                    ]
                },
                cold: {
                    title: 'Abbigliamento per Clima Freddo',
                    items: [
                        'Indossa abiti caldi a strati',
                        'Porta con te un cappotto caldo',
                        'Indossa guanti, sciarpa e cappello',
                        'Indossa scarpe calde e impermeabili'
                    ]
                }
            },
            activities: {
                hot: {
                    title: 'Attività per Clima Caldo',
                    items: [
                        'Nuota in piscina o al mare',
                        'Fai attività all\'aperto al mattino presto',
                        'Visita musei o luoghi al chiuso',
                        'Fai una passeggiata all\'ombra',
                        'Organizza un picnic in un parco ombreggiato'
                    ]
                },
                warm: {
                    title: 'Attività per Clima Caldo',
                    items: [
                        'Fai una passeggiata all\'aperto',
                        'Visita parchi e giardini',
                        'Organizza un picnic',
                        'Fai attività sportive all\'aperto'
                    ]
                },
                mild: {
                    title: 'Attività per Clima Temperato',
                    items: [
                        'Fai escursioni all\'aperto',
                        'Visita siti turistici',
                        'Fai attività sportive',
                        'Organizza un picnic'
                    ]
                },
                cool: {
                    title: 'Attività per Clima Fresco',
                    items: [
                        'Fai una passeggiata nel parco',
                        'Visita musei e gallerie',
                        'Fai attività sportive al chiuso',
                        'Organizza una gita in città'
                    ]
                },
                cold: {
                    title: 'Attività per Clima Freddo',
                    items: [
                        'Fai attività sportive al chiuso',
                        'Visita musei e gallerie',
                        'Organizza attività al chiuso',
                        'Fai una passeggiata breve e ben coperto'
                    ]
                }
            },
            health: {
                hot: {
                    title: 'Consigli per la Salute in Clima Caldo',
                    items: [
                        'Bevi molta acqua',
                        'Evita l\'esposizione diretta al sole',
                        'Usa crema solare con SPF alto',
                        'Fai pause frequenti all\'ombra',
                        'Monitora i segni di disidratazione'
                    ]
                },
                warm: {
                    title: 'Consigli per la Salute in Clima Caldo',
                    items: [
                        'Bevi acqua regolarmente',
                        'Usa crema solare',
                        'Fai pause all\'ombra',
                        'Indossa un cappello'
                    ]
                },
                mild: {
                    title: 'Consigli per la Salute in Clima Temperato',
                    items: [
                        'Mantieni una buona idratazione',
                        'Porta con te acqua',
                        'Indossa abiti appropriati',
                        'Fai pause regolari'
                    ]
                },
                cool: {
                    title: 'Consigli per la Salute in Clima Fresco',
                    items: [
                        'Mantieni il corpo caldo',
                        'Bevi bevande calde',
                        'Indossa abiti caldi',
                        'Fai attività moderate'
                    ]
                },
                cold: {
                    title: 'Consigli per la Salute in Clima Freddo',
                    items: [
                        'Mantieni il corpo caldo',
                        'Bevi bevande calde',
                        'Indossa abiti caldi a strati',
                        'Limita l\'esposizione al freddo'
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
        noResults: 'Nessun risultato trovato',
        popularCities: 'Città Popolari',
        placeholder: 'Inserisci il nome di una città...'
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