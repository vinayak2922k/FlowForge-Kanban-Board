import { useState, useEffect } from 'react';

/**
 * Custom hook for synchronizing React state with browser localStorage.
 * Handles JSON serialization, edge-case recovery, and safe fallback defaults.
 *
 * @param {string} key - The localStorage storage key.
 * @param {*} defaultValue - Fallback value if no valid data is stored.
 * @returns {[any, Function]} - [state, setState] tuple.
 */
export function useLocalStorage(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const storedItem = window.localStorage.getItem(key);
      if (storedItem !== null) {
        return JSON.parse(storedItem);
      }
      // If no stored value exists, persist the initial default
      window.localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    } catch (error) {
      console.error(`[FlowForge] Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`[FlowForge] Error updating localStorage key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setState];
}
