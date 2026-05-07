import React, { useState } from 'react'

export default function SearchBar({ placeholder = 'Search…', onSearch, value, onChange }) {
  const [local, setLocal] = useState(value || '')

  const handleChange = (e) => {
    setLocal(e.target.value)
    onChange?.(e.target.value)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') onSearch?.(local)
  }

  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        className="search-input"
        placeholder={placeholder}
        value={value !== undefined ? value : local}
        onChange={handleChange}
        onKeyDown={handleKey}
      />
    </div>
  )
}
