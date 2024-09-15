import React, { useState } from 'react';
import countries from './countries.json'; // Import the local JSON file
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      const filtered = countries.filter(item =>
        item.country.toLowerCase().includes(value.toLowerCase()) ||
        item.capital.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]); // Clear suggestions if input is too short
    }
  };

  const handleSuggestionClick = (item) => {
    setQuery(`${item.country} (${item.capital})`);
    onSearch(item.country);
    setSuggestions([]); // Clear suggestions after selecting
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        value={query}
        onChange={handleChange}
        onKeyPress={handleKeyPress}  // Trigger search on Enter key press
        placeholder="Search for a country or capital..."
      />
      <FaSearch className="search-icon" onClick={() => onSearch(query)} />
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((item, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(item)}
            >
              {item.country} ({item.capital})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
