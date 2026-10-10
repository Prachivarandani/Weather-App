// Weatherly - Simple Weather Web Application
// Uses OpenWeatherMap API

class WeatherApp {
    constructor() {
        this.form = document.getElementById('weatherForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.errorContainer = document.getElementById('errorContainer');
        this.errorMessage = document.getElementById('errorMessage');
        this.weatherContainer = document.getElementById('weatherContainer');
        
        // Weather display elements
        this.locationName = document.getElementById('locationName');
        this.temperature = document.getElementById('temperature');
        this.weatherCondition = document.getElementById('weatherCondition');
        this.weatherIcon = document.getElementById('weatherIcon');
        this.feelsLike = document.getElementById('feelsLike');
        this.humidity = document.getElementById('humidity');
        this.windSpeed = document.getElementById('windSpeed');
        this.pressure = document.getElementById('pressure');
        
        this.apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }
    
    async handleSubmit() {
        const city = document.getElementById('city').value.trim();
        const country = document.getElementById('country').value.trim();
        const apiKey = document.getElementById('apiKey').value.trim();
        
        // Clear previous results
        this.hideError();
        this.hideWeather();
        
        // Validate inputs
        if (!city) {
            this.showError('Please enter a city name.');
            return;
        }
        
        if (!country) {
            this.showError('Please enter a country name or code.');
            return;
        }
        
        if (!apiKey) {
            this.showError('Please enter your OpenWeatherMap API key.');
            return;
        }
        
        // Show loading state
        this.setLoading(true);
        
        try {
            const weatherData = await this.fetchWeather(city, country, apiKey);
            this.displayWeather(weatherData);
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.setLoading(false);
        }
    }
    
    async fetchWeather(city, country, apiKey) {
        // Build query - handle both country name and country code
        const query = country.length === 2 
            ? `${city},${country}` 
            : `${city},${encodeURIComponent(country)}`;
        
        const url = `${this.apiBaseUrl}?q=${encodeURIComponent(query)}&appid=${encodeURIComponent(apiKey)}&units=metric`;
        
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                
                if (response.status === 401) {
                    throw new Error('Invalid API key. Please check your OpenWeatherMap API key and try again.');
                } else if (response.status === 404) {
                    throw new Error('Location not found. Please check the city and country and try again.');
                } else if (errorData && errorData.message) {
                    throw new Error(errorData.message);
                } else {
                    throw new Error(`Request failed with status ${response.status}. Please try again later.`);
                }
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            // Re-throw if it's already a user-friendly error
            if (error.message && (error.message.includes('API key') || 
                                  error.message.includes('Location not found') ||
                                  error.message.includes('Request failed'))) {
                throw error;
            }
            // Network or other errors
            throw new Error('Network error. Please check your internet connection and try again.');
        }
    }
    
    displayWeather(data) {
        // Location name
        const cityName = data.name;
        const countryCode = data.sys.country;
        this.locationName.textContent = `${cityName}, ${countryCode}`;
        
        // Temperature
        const temp = Math.round(data.main.temp * 10) / 10;
        this.temperature.textContent = temp.toString();
        
        // Weather condition
        const condition = data.weather[0].description;
        this.weatherCondition.textContent = condition;
        
        // Weather icon
        if (data.weather[0].icon) {
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            this.weatherIcon.src = iconUrl;
            this.weatherIcon.alt = condition;
            this.weatherIcon.style.display = 'block';
        } else {
            this.weatherIcon.style.display = 'none';
        }
        
        // Details
        const feelsLike = Math.round(data.main.feels_like * 10) / 10;
        this.feelsLike.textContent = `${feelsLike} °C`;
        
        const humidity = data.main.humidity;
        this.humidity.textContent = `${humidity}%`;
        
        const windSpeed = data.wind.speed;
        // Convert to km/h (OpenWeatherMap gives m/s)
        const windSpeedKmh = Math.round(windSpeed * 3.6 * 10) / 10;
        this.windSpeed.textContent = `${windSpeedKmh} km/h`;
        
        const pressure = data.main.pressure;
        this.pressure.textContent = `${pressure} hPa`;
        
        // Show weather container
        this.weatherContainer.style.display = 'block';
        
        // Scroll to results on mobile
        setTimeout(() => {
            this.weatherContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
    
    showError(message) {
        this.errorMessage.textContent = message;
        this.errorContainer.style.display = 'block';
        
        // Scroll to error on mobile
        setTimeout(() => {
            this.errorContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
    
    hideError() {
        this.errorContainer.style.display = 'none';
    }
    
    hideWeather() {
        this.weatherContainer.style.display = 'none';
    }
    
    setLoading(isLoading) {
        if (isLoading) {
            this.submitBtn.disabled = true;
            this.submitBtn.textContent = 'Loading...';
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = 'Get Weather';
        }
    }
}

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new WeatherApp();
    });
} else {
    new WeatherApp();
}