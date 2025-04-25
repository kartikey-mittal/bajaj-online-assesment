import { useState, useEffect, useRef } from 'react';
import { Search, ChevronRight } from 'lucide-react';

const Header = ({ doctors, searchQuery, updateFilters }) => {
  const [query, setQuery] = useState(searchQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filteredSuggestions = doctors
      .filter(doctor => 
        doctor.name.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 3);
    
    setSuggestions(filteredSuggestions);
    setShowSuggestions(true);
  };

  const handleSearch = () => {
    updateFilters('search', query);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    updateFilters('search', suggestion.name);
    setShowSuggestions(false);
  };

  return (
    <header className="bg-[#045da5] py-4 sticky top-0 z-50">
      <div className="container mx-auto px-0 max-w-9xl">
      <div className="relative w-[90%] mx-auto" ref={searchRef}>
  <div className="relative">
    <input
      type="text"
      placeholder="Search Symptoms, Doctors, Specialists, Clinics"
      value={query}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      className="w-full py-3 px-4 pr-12 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
      data-testid="autocomplete-input"
    />

            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
              onClick={handleSearch}
            >
              <Search size={20} />
            </button>
          </div>
          
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full bg-white mt-1 rounded-md shadow-lg max-h-[300px] overflow-auto divide-y divide-gray-100">
              <ul>
                {suggestions.map((doctor) => (
                  <li 
                    key={doctor.id}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleSuggestionClick(doctor)}
                    data-testid="suggestion-item"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                          {doctor.photo ? (
                            <img 
                              src={doctor.photo} 
                              alt={doctor.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                              {doctor.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{doctor.name}</div>
                          <div className="text-sm text-gray-500">{doctor.specialties.join(', ')}</div>
                        </div>
                      </div>
                      <ChevronRight className="text-gray-400" size={20} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;