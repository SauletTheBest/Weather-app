# Weather-app

This project is a web application that provides weather information, a 5-day forecast, and historical weather data for a specified city. It also integrates an interactive map to display the location of the city.

Features

Weather Information: View current weather details such as temperature, humidity, wind speed, and more.

5-Day Forecast: Access detailed weather forecasts for the next 5 days.

Historical Data: Retrieve historical weather data for the past 7 days.

Interactive Map: Explore the city's location on an interactive map powered by Leaflet and OpenStreetMap.

Technologies Used

Backend:

Node.js: For server-side development.

Express.js: Web framework for building the API.

Axios: HTTP client for fetching data from the OpenWeatherMap API.

Frontend:

HTML5 & CSS3: For building the user interface.

JavaScript: For dynamic functionality and API integration.

Leaflet.js: For rendering interactive maps.

API Integration

This application uses the OpenWeatherMap API for retrieving weather, forecast, and historical data. Ensure you have an API key to access their services.

Installation and Setup

Clone the repository:

git clone https://github.com/your-repo/weather-app.git

Navigate to the project directory:

cd weather-app

Install dependencies:

npm install

Create a .env file in the root directory and add the following:

API_KEY=your_openweathermap_api_key
PORT=3000

Start the server:

npm start

Open your browser and navigate to:

http://localhost:3000

Usage

Enter the name of the city in the input field.

Use the buttons to:

Fetch the current weather.

Get a 5-day weather forecast.

Retrieve historical weather data.

View the city's location on the interactive map.

File Structure

weather-app/
├── public/
│   ├── index.html  # Main frontend file
│   ├── style.css   # Styling (if applicable)
├── backend.js   # Backend server
├── .env            # Environment variables
├── package.json    # Project configuration and dependencies
└── README.md       # Documentation (this file)

Future Enhancements

Add more detailed error handling.

Include more interactive map features, such as route planning.

Allow users to save favorite cities.

Add support for additional languages.

License

This project is licensed under the MIT License. See the LICENSE file for more details.

Acknowledgments

OpenWeatherMap API

Leaflet.js

Node.js
