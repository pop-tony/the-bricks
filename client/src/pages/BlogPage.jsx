
import { useTheme } from '../context/ThemeContext';
export default function BlogPage(){
  const { isDark } = useTheme();
  return <div className={`min-h-screen pt-28 transition-colors ${isDark?'bg-[#06152C] text-white':'bg-white text-[#0A2342]'}`}><div className="mx-auto max-w-4xl px-4 md:px-8 text-center"><p className="text-[#FF6A00] text-[11px] tracking-[0.3em] uppercase font-black">Journal</p><h1 className="font-black text-4xl md:text-6xl mt-3">The Bricks Journal</h1><p className={`mt-6 ${isDark?'text-white/60':'text-black/60'}`}>Insights on Accra real estate. Coming soon.</p></div></div>
}
