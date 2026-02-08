import { useEffect, useState } from 'react'
import './SearchBar.css'

function SearchBar({ value, onSearch }) {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleSubmit = event => {
    event.preventDefault()
    onSearch(localValue)
  }

  const handleChange = event => {
    const newValue = event.target.value
    setLocalValue(newValue)
    onSearch(newValue)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Search products in this category..."
        value={localValue}
        onChange={handleChange}
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  )
}

export default SearchBar
