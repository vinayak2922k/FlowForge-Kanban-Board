import React from 'react';
import { Search, X, Command } from 'lucide-react';

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
        <Search className="search-icon" size={15} aria-hidden="true" />
        <input
          id="global-task-search"
          type="text"
          className="search-input"
          placeholder="Filter sprint tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        {searchQuery ? (
          <button
            type="button"
            className="search-clear-btn"
            onClick={onClearSearch}
            title="Clear search (Esc)"
            aria-label="Clear search input"
          >
            <X size={13} />
          </button>
        ) : (
          <div className="search-shortcut-hint" aria-hidden="true">
            <kbd className="search-kbd">Esc</kbd>
          </div>
        )}
      </div>
    </div>
  );
}
