import { THEME_OPTIONS, Theme } from '@src/providers/DarkThemeProvider/constants';
import { useCallback, useEffect, useState } from 'react';

export function useLocalStorage(key: string) {
  const [value, setValue] = useState(() => {
    const themeRaw = localStorage.getItem(key)! as Theme;

    return THEME_OPTIONS[themeRaw] ?? JSON.parse(themeRaw);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const deleteValue = useCallback(() => localStorage.removeItem(key), [key]);

  return { value, setValue, deleteValue };
}
