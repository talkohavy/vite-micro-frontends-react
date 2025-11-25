import { createContext, useContext } from 'react';

type ThemeState = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const INITIAL_STATE = {} as ThemeState;
const DarkThemeContext = createContext(INITIAL_STATE);
const useDarkTheme = () => useContext(DarkThemeContext);

export { DarkThemeContext, useDarkTheme };
