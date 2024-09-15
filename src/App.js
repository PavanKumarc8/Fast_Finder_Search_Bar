import React, { useState } from 'react';
import './App.css';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch suggestions based on input
  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      setLoading(true);
      try {
        // Fetch from local JSON file
        const response = await axios.get('/countries.json');
        const data = response.data;
        const filtered = data.filter(item =>
          item.country.toLowerCase().includes(value.toLowerCase()) ||
          item.capital.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered);
        setError('');
      } catch (error) {
        console.error("Error fetching data:", error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
      setCountryData(null); // Clear the result if input is cleared
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (item) => {
    setQuery(`${item.country} (${item.capital})`);
    setCountryData(item);
    setSuggestions([]);
  };

  // Handle search click or Enter key press
  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);

    try {
      // Fetch from local JSON file
      const response = await axios.get('/countries.json');
      const data = response.data;
      // Search based on the current query, ignoring selectedCountry
      const countryInfo = data.find(item =>
        item.country.toLowerCase() === query.toLowerCase() ||
        item.capital.toLowerCase() === query.toLowerCase()
      );
      setCountryData(countryInfo || null);
      if (!countryInfo) {
        setError('No country found.');
      } else {
        setError('');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle 'Enter' key press in the search input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Trigger search on Enter key press
    }
  };

  return (
    <div className="search-container">
      <header className="header">
        <h1>Fast Finder</h1>
      </header>
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown} // Handle Enter key press
          placeholder="Search for a country..."
        />
        <FaSearch className="search-icon" onClick={handleSearch} />
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
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
        {countryData && (
          <div className="country-details">
            <h2>{countryData.country}</h2>
            <p><strong>Capital:</strong> {countryData.capital}</p>
            <p><strong>Population:</strong> {countryData.population.toLocaleString()}</p>
            <p><strong>Official Language:</strong> {Array.isArray(countryData.official_language) ? countryData.official_language.join(', ') : countryData.official_language}</p>
            <p><strong>Currency:</strong> {countryData.currency}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
