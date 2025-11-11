// src/hooks/useStorage.js
import { useState } from "react";

/**
 * Custom hook for localStorage or sessionStorage
 * @param {string} key - storage key
 * @param {*} initialValue - default value if nothing exists
 * @param {"local"|"session"} type - choose storage type
 */
export const useStorage = (key, initialValue, type = "local") => {
  const storage = type === "local" ? localStorage : sessionStorage;

  const getStoredValue = () => {
    try {
      const stored = storage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.error("Error reading storage", err);
      return initialValue;
    }
  };

  const [value, setValue] = useState(getStoredValue);

  const setStoredValue = (newValue) => {
    try {
      setValue(newValue);
      storage.setItem(key, JSON.stringify(newValue));
    } catch (err) {
      console.error("Error setting storage", err);
    }
  };

  const removeValue = () => {
    try {
      storage.removeItem(key);
      setValue(initialValue);
    } catch (err) {
      console.error("Error removing storage", err);
    }
  };

  return [value, setStoredValue, removeValue];
};
