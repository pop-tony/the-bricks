import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeContext';

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="border border-brick-subtle bg-brick-white p-3 text-brick-charcoal transition-luxe hover:border-brick-gold hover:text-brick-gold dark:border-brick-subtle dark:bg-brick-black dark:text-brick-white dark:hover:text-brick-gold"
      aria-label="Toggle theme"
    >
      {isDark? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
};