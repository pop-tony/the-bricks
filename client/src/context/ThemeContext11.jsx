import { createContext, useContext, useEffect, useState, useMemo } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('bricks-theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('bricks-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('bricks-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev =>!prev);
  const theme = isDark? 'dark' : 'light';

  // Memoize so components don't re-render on every toggle
  const value = useMemo(() => ({
    isDark,
    theme, // 'light' = White #F8F9FB, 'dark' = Navy #0A2342
    toggleTheme,
    setTheme: (t) => setIsDark(t === 'dark'),
  }), [isDark]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
};