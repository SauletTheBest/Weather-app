# Weather-app

This project is a web application that provides weather information, a 5-day forecast, and historical weather data for a specified city. It also integrates an interactive map to display the location of the city.

## Features

- **Weather Information(First API):** View current weather details such as temperature, humidity, wind speed, and more.
- **5-Day Forecast(Second API):** Access detailed weather forecasts for the next 5 days.
- **Historical Data(Third API):** Retrieve historical weather data for the past 7 days.
- **Interactive Map(Fourth API):** Explore the city's location on an interactive map powered by Leaflet and OpenStreetMap.

## Technologies Used

### Backend:
- **Node.js**: For server-side development.
- **Express.js**: Web framework for building the API.
- **Axios**: HTTP client for fetching data from the OpenWeatherMap API.

### Frontend:
- **HTML & CSS**: For building the user interface.
- **JavaScript**: For dynamic functionality and API integration.
- **Leaflet**: For rendering interactive maps.

## API Integration

This application uses the [OpenWeatherMap API](https://openweathermap.org/) for retrieving weather, forecast, and historical data. Ensure you have an API key to access their services.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/SauletTheBest/Weather-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd weather-app
   ```

3. Install dependencies:
   ```bash
   npm init -y
   npm install express axios path dotenv
   ```

4. Create a `.env` file in the root directory and add the following:
   ```env
   API_KEY=your_openweathermap_api_key
   PORT=3000
   ```

5. Start the server:
   ```bash
   node backend.js
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

1. Enter the name of the city in the input field.
2. Use the buttons to:
   - Fetch the current weather.
   - Get a 5-day weather forecast.
   - Retrieve historical weather data.
3. View the city's location on the interactive map.

## File Structure

```plaintext
weather-app/
├── public/
│   ├── index.html  # Main frontend file
│   ├── style.css   # Styling (if applicable)
├── backend.js   # Backend server
├── .env            # Environment variables
├── package.json    # Project configuration and dependencies
└── README.md       # Documentation (this file)
```

## Acknowledgments

- [OpenWeatherMap API](https://openweathermap.org/)
- [Leaflet.js](https://leafletjs.com/)
- [Node.js](https://nodejs.org/)



