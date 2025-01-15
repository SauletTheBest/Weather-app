
const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Weather route
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                units: 'metric',
                appid: API_KEY,
            },
        });

        const weatherData = {
            city: response.data.name,
            countryCode: response.data.sys.country,
            coordinates: {
                latitude: response.data.coord.lat,
                longitude: response.data.coord.lon,
            },
            temperature: response.data.main.temp,
            feelsLike: response.data.main.feels_like,
            humidity: response.data.main.humidity,
            pressure: response.data.main.pressure,
            windSpeed: response.data.wind.speed,
            description: response.data.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
            rainVolume: response.data.rain ? response.data.rain['1h'] : 'No rain data',
        };

        res.json(weatherData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Forecast route
app.get('/forecast', async (req, res) => {
    const city = req.query.city;
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
            params: {
                q: city,
                units: 'metric',
                appid: API_KEY,
            },
        });

        const forecastData = response.data.list.map((item) => ({
            time: item.dt_txt,
            temperature: item.main.temp,
            description: item.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        }));

        res.json(forecastData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch forecast data' });
    }
});

// History route
app.get('/history', async (req, res) => {
    const city = req.query.city;
    try {
        const weatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                appid: API_KEY,
            },
        });

        const { lat, lon } = weatherResponse.data.coord;
        const start = Math.floor((Date.now() - 7 * 24 * 60 * 60 * 1000) / 1000);

        const historicalResponse = await axios.get('https://api.openweathermap.org/data/2.5/onecall/timemachine', {
            params: {
                lat,
                lon,
                dt: start,
                appid: API_KEY,
            },
        });

        res.json(historicalResponse.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch historical data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
