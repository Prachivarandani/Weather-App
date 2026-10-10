# Weatherly

A simple, clean, and responsive weather web application that displays live weather information using the OpenWeatherMap API.

![Weatherly Interface](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## Features

- **Live Weather Data**: Retrieves current weather conditions from OpenWeatherMap API
- **Clean, Minimalist Design**: Modern interface with gradient background and smooth animations
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **User-Friendly Inputs**: Enter city, country, and API key through the web interface
- **Comprehensive Weather Information**:
  - Location name
  - Current temperature (°C)
  - Weather condition with icon
  - Feels like temperature
  - Humidity percentage
  - Wind speed (km/h)
  - Atmospheric pressure (hPa)
- **Error Handling**: Displays helpful error messages for:
  - Missing input fields
  - Invalid API key (401 errors)
  - Location not found (404 errors)
  - Network connectivity issues
- **Loading State**: Button shows "Loading..." during API requests

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- An OpenWeatherMap API key. Get one for free at [openweathermap.org/api](https://openweathermap.org/api)

### Installation & Usage

1. Clone or download this repository to your local machine
2. Navigate to the project directory
3. Open `index.html` in your web browser (double-click or right-click → Open with browser)
   - Alternatively, you can serve it using a local server (recommended for better compatibility):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     
     # Using VS Code Live Server extension
     # Right-click index.html → Open with Live Server
     ```

### How to Use

1. Open the application in your browser
2. Enter the following information:
   - **City**: Name of the city (e.g., "London", "New York", "Tokyo")
   - **Country**: Country name or 2-letter country code (e.g., "United Kingdom" or "GB", "US", "JP")
   - **API Key**: Your OpenWeatherMap API key
3. Click the "Get Weather" button
4. View the live weather results displayed below

## Project Structure

```
Weatherly/
├── index.html      # Main HTML structure
├── style.css       # Styles and responsive design
├── app.js          # JavaScript for API calls and interactivity
└── README.md       # Project documentation
```

## API Reference

This application uses the [OpenWeatherMap Current Weather Data API](https://openweathermap.org/current).

- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Parameters used**:
  - `q`: City name and country (e.g., "London,GB")
  - `appid`: Your API key
  - `units`: Set to `metric` for Celsius temperature

## Design Decisions

- **Minimalist UI**: Clean design with a subtle gradient background and card-based layout
- **Inter Font**: Modern, readable typeface for better user experience
- **Glassmorphism-inspired**: Semi-transparent container with backdrop blur
- **Smooth Animations**: Subtle transitions on hover and results display
- **Accessibility**: ARIA labels and semantic HTML for better screen reader support
- **Mobile-First Approach**: Responsive breakpoints ensure optimal viewing on all devices

## Error Messages

| Error | Cause | Solution |
|---|---|---|
| "Please enter a city name." | City field is empty | Enter a valid city name |
| "Please enter a country name or code." | Country field is empty | Enter a country or 2-letter code |
| "Please enter your OpenWeatherMap API key." | API key field is empty | Enter your API key |
| "Invalid API key..." | 401 response from API | Verify your API key is correct and activated |
| "Location not found..." | 404 response from API | Check spelling of city and country |
| "Network error..." | Connection issue | Check internet connectivity |

## Browser Compatibility

Tested and compatible with:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is open source and available for educational purposes.

## Contributing

Feel free to fork this repository and submit pull requests for any improvements!