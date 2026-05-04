import { useState, useRef } from 'react'
import './SearchBar.css'


function SearchBar({ onSearch }) {

  const [input, setInput] = useState('')

  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()              
    if (!input.trim()) {
      inputRef.current.focus()
      return
    }       
    onSearch(input.trim())          
  }

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="City ... "
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
