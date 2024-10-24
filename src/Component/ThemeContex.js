import React, {createContext, useContext, useState} from 'react';

// Define your themes
const themes = {
  light: {
    background: '#ffffff',
    text: '#000000',
    border: '#cccccc',
  },
  dark: {
    background: '#121212',
    text: '#ffffff',
    border: '#444444',
  },
  blue: {
    background: '#e0f7fa',
    text: '#0277bd',
    border: '#b2ebf2',
  },
  green: {
    background: '#e8f5e9',
    text: '#388e3c',
    border: '#c8e6c9',
  },
  // Add more themes as needed
};

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState(themes.light); // Default theme

  const toggleTheme = selectedTheme => {
    setTheme(themes[selectedTheme]);
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
