// ============================================================
// SearchBar.jsx — barre de recherche
//
// CE QUE CE COMPOSANT FAIT :
//   - Affiche un champ texte et un bouton
//   - Quand l'utilisateur clique "Rechercher" (ou appuie Entrée),
//     il appelle onSearch() avec la valeur tapée
//
// CE QUE CE COMPOSANT NE FAIT PAS :
//   - Il ne sait pas comment appeler l'API
//   - Il ne sait pas ce qu'est une clé API
//   - Il reçoit juste "onSearch" en prop et l'appelle
//
// PROPS REÇUES :
//   onSearch → fonction définie dans App.jsx, appelée avec la ville
// ============================================================

import { useState, useRef } from 'react'
import './SearchBar.css'

function SearchBar({ onSearch }) {

  // useState pour stocker ce que l'utilisateur tape
  const [input, setInput] = useState('')

  // useRef pour accéder directement à l'élément <input> du DOM
  // Utile pour le focus automatique
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()              // empêche le rechargement de page
    if (!input.trim()) return       // ignore si champ vide
    onSearch(input.trim())          // appelle la fonction de App.jsx
  }

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Londres, Paris, Tokyo…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">
        Chercher
      </button>
    </form>
  )
}

export default SearchBar
