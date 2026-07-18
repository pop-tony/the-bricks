
import { ShieldCheck, Home, Star } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
export default function TrustBar(){
  const { isDark } = useTheme();
  const stats=[{icon:ShieldCheck,k:'GREDA',v:'Licensed',sub:'Since 2015'},{icon:Home,k:'200+',v:'Properties',sub:'Sold in Accra'},{icon:Star,k:'Lakeside',v:'Experts',sub:'Estate Specialists'}];
  return (
    <section className={`border-y transition-colors duration-500 ${isDark?'bg-[#081A33] border-white/10':'bg-white border-black/5'}`}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-3 px-4 md:px-8">
        {stats.map((s,i)=>{ const Icon=s.icon; return <div key={i} className={`flex items-center gap-4 py-7 ${i!==0?'md:border-l md:pl-10 border-t md:border-t-0':''} ${isDark?'md:border-white/10 border-white/10':'md:border-black/5 border-black/5'}`}><div className="h-11 w-11 bg-[#FF6A00] rounded-xl flex items-center justify-center text-white shadow"><Icon className="h-5 w-5"/></div><div><p className={`font-black text-xl ${isDark?'text-white':'text-[#0A2342]'}`}>{s.k} <span className="font-normal opacity-70">{s.v}</span></p><p className={`text-[11px] uppercase tracking-widest font-bold ${isDark?'text-white/40':'text-black/40'}`}>{s.sub}</p></div></div>})}
      </div>
    </section>
  )
}
