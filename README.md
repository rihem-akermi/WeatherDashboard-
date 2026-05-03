# 🌤️ Weather App — version simple

## Structure du projet

```
src/
├── main.jsx                 ← démarre React (ne pas toucher)
├── App.jsx                  ← LE CERVEAU : état, API, logique
├── App.css
├── index.css                ← styles globaux
└── components/
    ├── SearchBar.jsx        ← champ de recherche
    ├── SearchBar.css
    ├── WeatherCard.jsx      ← affiche les données météo
    ├── WeatherCard.css
    ├── Loader.jsx           ← spinner de chargement
    └── Loader.css
```

## Comment ça marche (le flow)

```
Utilisateur tape "Paris"
        ↓
SearchBar appelle onSearch("Paris")
        ↓
App.jsx appelle fetchWeather("Paris")
        ↓
fetch("https://api.openweathermap.org/...?q=Paris&appid=TACLÉ")
        ↓
OpenWeatherMap répond avec un JSON
        ↓
setWeather(data) → React redessine
        ↓
WeatherCard reçoit weather en prop et affiche
```

## Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Créer le fichier .env
cp .env.example .env
# Colle ta clé API dedans

# 3. Lancer
npm run dev
```

## Hooks utilisés

- `useState` → stocker ville, données météo, loading, erreur
- `useEffect` → charger Londres automatiquement au démarrage
- `useRef` → accéder à l'input directement (focus)

## Concepts React démontrés

- Props : App passe les données aux composants enfants
- Affichage conditionnel : `{loading && <Loader />}`
- Async/await : pour attendre la réponse de l'API
- fetch() : appel HTTP natif du navigateur
