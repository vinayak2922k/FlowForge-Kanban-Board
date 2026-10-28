import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ searchQuery, onSearchChange, onClearSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && searchQuery) {
      onClearSearch();
    }
  };

  return (
    <div className="search-bar-container">
      <label htmlFor="global-task-search" className="sr-only">
        Search tasks by title or description
      </label>
      <div className="search-input-wrapper">
        <Search className="search-icon" size={16} aria-hidden="true" />
        <input
          id="global-task-search"
          type="text"
          className="search-input"
          placeholder="Search tasks, descriptions..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        {searchQuery && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={onClearSearch}
            title="Clear search (Esc)"
            aria-label="Clear search input"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
