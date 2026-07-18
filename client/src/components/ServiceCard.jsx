
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
export default function ServiceCard({ title, desc, icon: Icon, link, k }){
  const { isDark } = useTheme();
  return (
    <Link to={link||'/properties'} className={`group block rounded-[20px] border p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isDark?'bg-white/5 border-white/10 hover:bg-white/10':'bg-[#F8F9FB] border-black/5 hover:bg-[#0A2342]'}`}>
      <div className="flex justify-between items-start"><div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF9A00] flex items-center justify-center text-white shadow">{Icon?<Icon className="h-5 w-5"/>:<span className="font-black">{k||'•'}</span>}</div><ArrowUpRight className={`h-5 w-5 transition-all ${isDark?'text-white/30 group-hover:text-white/60':'text-black/20 group-hover:text-white/40'} group-hover:translate-x-0.5 group-hover:-translate-y-0.5`} /></div>
      <h3 className={`mt-6 font-black text-[15px] leading-tight transition-colors ${isDark?'text-white':'text-[#0A2342] group-hover:text-white'}`}>{title}</h3>
      <p className={`mt-2.5 text-[13px] leading-6 transition-colors ${isDark?'text-white/60':'text-black/50 group-hover:text-white/60'}`}>{desc}</p>
      <div className="mt-5 flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-[#FF6A00]">Learn more <span className="group-hover:translate-x-1 transition-transform">→</span></div>
    </Link>
  )
}
