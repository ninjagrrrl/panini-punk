import { useState, useEffect } from "react";

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(initialValue);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (error) {
        console.error("Fehler beim Parsen von localStorage:", error);
      }
    }
    setHasLoaded(true);
  }, [key]);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state, hasLoaded]);

  return [state, setState] as const;
}
