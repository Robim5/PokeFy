import React, { createContext, useEffect, useState } from 'react';

// contexto tema global
const ThemeContext = createContext();

export { ThemeContext }; // exporta contexto

export const ThemeProvider = ({ children }) => {
  // inicia tema de localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('pokefy-theme') || 'dark';
  });

  // sincroniza tema
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme); // aplica tema ao doc
    localStorage.setItem('pokefy-theme', theme); // grava pref local
  }, [theme]);

  // alterna tema dark/light
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // fornece tema + toggle para app
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};