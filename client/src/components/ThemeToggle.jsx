
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
export function ThemeToggle(){
  const { isDark, toggleTheme } = useTheme();
  return <button onClick={toggleTheme} className={`h-10 w-10 rounded-xl border flex items-center justify-center transition-colors ${isDark?'bg-white/10 border-white/10 text-white hover:bg-white/20':'bg-white border-black/10 text-[#0A2342] hover:bg-[#0A2342] hover:text-white'}`}>{isDark?<Sun className="h-4 w-4"/>:<Moon className="h-4 w-4"/>}</button>
}
