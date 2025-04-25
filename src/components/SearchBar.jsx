import { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ doctors, searchParams, setSearchParams }) => {
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      const matches = doctors
        .filter(doctor => 
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 3);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, doctors]);

  return (
    <div className="search-container">
      <div className="search-bar">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      {suggestions.length > 0 && (
        <div className="suggestions-list">
          {suggestions.map((doctor, index) => (
            <div 
              key={index} 
              className="suggestion-item"
              onClick={() => handleSearch(doctor.name)}
            >
              <div className="suggestion-content">
                <div className="suggestion-image">
                  {doctor.photo ? (
                    <img src={doctor.photo} alt={doctor.name} />
                  ) : (
                    <div className="suggestion-initials">
                      {doctor.name_initials}
                    </div>
                  )}
                </div>
                <div className="suggestion-text">
                  <h4>{doctor.name}</h4>
                  <p>{doctor.specialities[0].name}</p>
                </div>
              </div>
              <span className="suggestion-arrow">›</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;