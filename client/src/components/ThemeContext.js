import React, { createContext, useState } from 'react';

// Crear el contexto
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [allPokemon, setAllPokemon] = useState([]);

  return (
    <ThemeContext.Provider value={{allPokemon, setAllPokemon}}>
      {children}
    </ThemeContext.Provider>
  );
};