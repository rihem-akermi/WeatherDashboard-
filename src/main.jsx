// ============================================================
// main.jsx — point d'entrée de l'application
//
// C'est le fichier qui "démarre" React.
// Il prend le composant App et l'injecte dans le <div id="root">
// qui est dans index.html.
// Tu ne touches JAMAIS ce fichier.
// ============================================================

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
