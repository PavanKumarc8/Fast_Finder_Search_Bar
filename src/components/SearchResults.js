import React from 'react';

const SearchBarResults = ({ countryData }) => {
  if (!countryData) return null;

  return (
    <div className="country-details">
      <h2>{countryData.country}</h2>
      <p><strong>Capital:</strong> {countryData.capital}</p>
      <p><strong>Population:</strong> {countryData.population?.toLocaleString() || 'N/A'}</p>
      <p><strong>Official Language:</strong> {Array.isArray(countryData.official_language) ? countryData.official_language.join(', ') : countryData.official_language || 'N/A'}</p>
      <p><strong>Currency:</strong> {countryData.currency || 'N/A'}</p>
    </div>
  );
};

export default SearchBarResults;
