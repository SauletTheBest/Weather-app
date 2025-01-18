const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const API_KEY_WEATHER = process.env.API_KEY_WEATHER;
const API_KEY_AQI = process.env.API_KEY_AQI; // API quality of air
const API_KEY_FEW = process.env.API_KEY_FEW; // api for 3 day forecast
const PORT = process.env.PORT || 3000;

if (!API_KEY_WEATHER || !API_KEY_AQI || !API_KEY_FEW) {
    console.error('Missing API keys. Please check your .env file.');
    process.exit(1);
}

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                units: 'metric',
                appid: API_KEY_WEATHER,
            },
        });

        const weatherData = {
            city: response.data.name,
            countryCode: response.data.sys.country,
            temperature: response.data.main.temp,
            feelsLike: response.data.main.feels_like,
            description: response.data.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
            coordinates: {
                latitude: response.data.coord.lat,
                longitude: response.data.coord.lon,
            },
        };

        res.json(weatherData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.get('/air-quality', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        const response = await axios.get(`https://api.waqi.info/feed/${city}/`, {
            params: {
                token: API_KEY_AQI,
            },
        });

        const data = response.data.data;

        if (data) {
            res.json({
                city: data.city.name,
                aqi: data.aqi,
                pm25: data.iaqi.pm25.v,
                pm10: data.iaqi.pm10.v,
                o3: data.iaqi.o3.v,
                no2: data.iaqi.no2.v,
                co: data.iaqi.co.v,
            });
        } else {
            res.status(404).json({ error: 'Air quality data not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch air quality data' });
    }
});

app.get('/forecast', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json`, {
            params: {
                key: API_KEY_FEW,
                q: city,
                days: 3, 
            },
        });

        const forecastData = response.data.forecast.forecastday.map(day => ({
            date: day.date,
            temperature: day.day.avgtemp_c,
            condition: day.day.condition.text,
            icon: day.day.condition.icon,
        }));

        res.json(forecastData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch forecast data' });
    }
});