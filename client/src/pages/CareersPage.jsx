
import { useTheme } from '../context/ThemeContext';
export default function CareersPage(){
  const { isDark } = useTheme();
  return <div className={`min-h-screen pt-28 transition-colors ${isDark?'bg-[#06152C] text-white':'bg-white text-[#0A2342]'}`}><div className="mx-auto max-w-4xl px-4 md:px-8"><p className="text-[#FF6A00] text-[11px] tracking-[0.3em] uppercase font-black">Careers</p><h1 className="font-black text-4xl md:text-6xl mt-3">Join The Bricks</h1><p className={`mt-6 leading-7 max-w-2xl ${isDark?'text-white/60':'text-black/60'}`}>We're always looking for exceptional talent to join our team in Lakeside Estate, Accra. Passionate about real estate & client service? We'd love to hear from you.</p><div className={`mt-12 border-t pt-10 ${isDark?'border-white/10':'border-black/5'}`}><p>Send CV to <a href="mailto:careers@thebricksgh.com" className="text-[#FF6A00] font-black">careers@thebricksgh.com</a></p></div></div></div>
}
