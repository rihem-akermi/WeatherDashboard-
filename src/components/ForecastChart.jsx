// ============================================================
// ForecastChart.jsx — graphique des températures sur 24h
//
// PROPS REÇUES :
//   forecastList → forecast.list de l'API (tableau de 8 objets)
//
// ──────────────────────────────────────────────────────────
// COMMENT ON EXTRAIT LES DONNÉES DE L'API — LE RAISONNEMENT
// ──────────────────────────────────────────────────────────
//
// ÉTAPE 1 : Aller sur la doc ou faire un console.log
//   → console.log(forecastList) dans le navigateur (F12)
//   → tu vois la structure RÉELLE de l'objet
//
// ÉTAPE 2 : L'API /forecast retourne cet objet :
// {
//   list: [                          ← un tableau d'entrées
//     {
//       dt: 1703325600,              ← date en Unix (secondes)
//       dt_txt: "2024-01-01 12:00",  ← date lisible en texte
//       main: {
//         temp: 14.2,                ← °C si units=metric
//         feels_like: 13.0,
//         humidity: 72
//       },
//       weather: [{
//         description: "light rain",
//         icon: "10d"
//       }],
//       wind: { speed: 5.1 }
//     },
//     { ... },   ← snapshot 3h plus tard
//     { ... },   ← snapshot 6h plus tard
//     ...        ← etc. (on a demandé cnt=8)
//   ]
// }
//
// ÉTAPE 3 : On transforme ce tableau en format que Recharts attend
//   Recharts veut : [{ time: "12h", temp: 14, hum: 72 }, ...]
//   L'API donne    : [{ dt: 1703..., main: { temp: 14.2 } }, ...]
//   → On utilise .map() pour transformer chaque entrée
//
// RÈGLE GÉNÉRALE pour extraire des données d'une API :
//   1. console.log la réponse brute → voir la structure
//   2. Identifier le tableau principal (souvent .list ou .data ou .results)
//   3. Pour chaque élément, extraire ce dont tu as besoin
//   4. Transformer au format attendu par ta lib (Recharts, etc.)
// ============================================================

import {
  AreaChart, Area,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts'

import './ForecastChart.css'

function ForecastChart({ forecastList }) {

  const chartData = forecastList.map((entry) => {
    const hour = entry.dt_txt.split(' ')[1].split(':')[0]

    return {
      time:     `${hour}h`,                       
      temp:     Math.round(entry.main.temp),       
      humidity: entry.main.humidity,               
      feels:    Math.round(entry.main.feels_like), 
      }
  })

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
      <div className="chart-tooltip">
        <p className="tooltip-time">{label}</p>
        <p className="tooltip-temp">{payload[0]?.value}°C</p>
        <p className="tooltip-hum">💧 {payload[1]?.value}%</p>
      </div>
    )
  }

  return (
    <div className="chart-card">

      <h2 className="chart-title">Today's Weather</h2>
      <p className="chart-subtitle">Each 3h</p>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>

          <defs>
            <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#a855f7" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0}   />
            </linearGradient>
            <linearGradient id="humGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#818cf8" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#818cf8" stopOpacity={0}   />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="rgba(160,120,255,0.08)" vertical={false} />

          <XAxis
            dataKey="time"
            tick={{ fill: '#9b87c0', fontSize: 12, fontFamily: 'Jost' }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: '#9b87c0', fontSize: 12, fontFamily: 'Jost' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}°`}
          />

          <Tooltip content={<CustomTooltip />} />

          {/* Courbe température */}
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#a855f7"
            strokeWidth={2.5}
            fill="url(#tempGrad)"
            dot={false}
            activeDot={{ r: 5, fill: '#a855f7', strokeWidth: 0 }}
          />

          {/* Courbe humidité */}
          <Area
            type="monotone"
            dataKey="humidity"
            stroke="#818cf8"
            strokeWidth={1.5}
            strokeDasharray="5 4"
            fill="url(#humGrad)"
            dot={false}
            activeDot={{ r: 4, fill: '#818cf8', strokeWidth: 0 }}
          />

        </AreaChart>
      </ResponsiveContainer>

      {/* Légende */}
      <div className="chart-legend">
        <span className="legend-item">
          <span className="legend-line purple" />
          Température °C
        </span>
        <span className="legend-item">
          <span className="legend-line indigo dashed" />
          Humidité %
        </span>
      </div>

      {/* Mini stats en bas */}
      <div className="chart-stats">
        <div className="chart-stat">
          <span className="cs-label">Min 24h</span>
          <span className="cs-value">
            {Math.min(...chartData.map(d => d.temp))}°C
          </span>
        </div>
        <div className="chart-stat">
          <span className="cs-label">Max 24h</span>
          <span className="cs-value">
            {Math.max(...chartData.map(d => d.temp))}°C
          </span>
        </div>
        <div className="chart-stat">
          <span className="cs-label">Humidité moy.</span>
          <span className="cs-value">
            {Math.round(chartData.reduce((s, d) => s + d.humidity, 0) / chartData.length)}%
          </span>
        </div>
      </div>

    </div>
  )
}

export default ForecastChart
