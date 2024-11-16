import { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LSKEY_THEME } from '../../utils/globalConstants';
import { DarkThemeContext } from './DarkThemeContext';
import { Theme } from './constants';

export default function DarkThemeProvider(props: PropsWithChildren) {
  const { children } = props;

  const { value: localStorageTheme, setValue: setLocalStorageTheme } = useLocalStorage(LSKEY_THEME);

  // all useStates:
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const deviceTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.Dark : Theme.Light;

    const currentTheme = localStorageTheme || deviceTheme;

    const htmlElement = document.documentElement;
    htmlElement.setAttribute('data-theme', currentTheme);
    document.body.setAttribute('class', currentTheme);

    return currentTheme === Theme.Dark;
  });

  // all functions:
  const toggleDarkMode = useCallback(() => {
    const themeToBe = isDarkMode ? Theme.Light : Theme.Dark;
    setLocalStorageTheme(themeToBe);

    const htmlElement = document.documentElement;
    htmlElement.setAttribute('data-theme', themeToBe);
    document.body.setAttribute('class', themeToBe);

    setIsDarkMode(!isDarkMode);
  }, [isDarkMode, setIsDarkMode, setLocalStorageTheme]);

  const value = useMemo(() => ({ isDarkMode, toggleDarkMode }), [isDarkMode, toggleDarkMode]);

  return <DarkThemeContext.Provider value={value}>{children}</DarkThemeContext.Provider>;
}
