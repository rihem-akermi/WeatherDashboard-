# 🌤️ Weather Dashboard

A modern, responsive weather application that allows users to search for real-time weather information and view a 24-hour forecast. Built with React and styled with a clean, modern UI.

## Features

✅ **Real-time Weather Data** — Search for any city and get current weather conditions (temperature, humidity, wind speed, etc.)  
✅ **24-Hour Forecast** — Interactive chart showing temperature trends for the next 24 hours  
✅ **Search Functionality** — Quick city search with error handling  
✅ **Responsive Design** — Optimized for desktop and mobile devices  
✅ **Loading States** — Smooth loading animations while fetching data  
✅ **Modern UI** — Beautiful dark theme with gradient effects  

## Tech Stack

**Frontend:**
- **React 19** — UI library and component management
- **Vite** — Fast build tool and development server
- **Recharts** — Interactive charts for forecast visualization
- **CSS3** — Modern styling with animations and responsive layouts

**API:**
- **OpenWeatherMap API** — Real-time weather data and 5-day forecasts

**Development Tools:**
- **ESLint** — Code quality and consistency
- **JavaScript (ES6+)** — Modern JavaScript features

## Project Structure

```
src/
├── App.jsx                  # Main component (state, API logic)
├── App.css                  # Main layout styles
├── index.css                # Global styles
├── main.jsx                 # Entry point
└── components/
    ├── SearchBar/           # City search input
    ├── WeatherCard/         # Current weather display
    ├── ForecastChart/       # 24-hour forecast chart
    └── Loader/              # Loading spinner
```

## How It Works

1. **User enters a city name** in the search bar
2. **API request is made** to OpenWeatherMap (parallel requests for current weather + forecast)
3. **Data is fetched and stored** using React hooks (useState)
4. **Components render** with real-time weather information
5. **Chart visualizes** the 24-hour temperature forecast

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd WeatherDashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

## Key React Concepts Used

- **Hooks**: `useState` for state management, `useEffect` for side effects
- **Props**: Passing data between parent and child components
- **Conditional Rendering**: Show/hide elements based on loading and error states
- **Async/Await**: Handling asynchronous API calls
- **Component Composition**: Modular, reusable components

## API Integration

The app uses the **OpenWeatherMap API** to fetch:
- **Current Weather**: Temperature, humidity, wind speed, condition description
- **5-Day Forecast**: 3-hourly predictions (first 24 hours displayed)

## Responsive Design

- **Desktop**: Two-column layout with side-by-side weather card and chart
- **Mobile**: Single-column stacked layout for better mobile experience

## Future Enhancements

- Add location-based weather detection (geolocation)
- Implement weather alerts and notifications
- Add more chart visualization options
- Multi-language support
- Local storage for favorite cities
