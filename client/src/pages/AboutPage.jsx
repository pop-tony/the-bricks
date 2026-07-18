
import { ShieldCheck, Home, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/logo.webp';
export default function AboutPage(){
  const { isDark } = useTheme();
  const stats=[{icon:ShieldCheck,label:'GREDA Licensed',value:'Since 2015'},{icon:Home,label:'Properties Sold',value:'200+'},{icon:Award,label:'Years in Accra',value:'10+'}];
  return (
    <div className={`min-h-screen pt-28 md:pt-32 transition-colors duration-500 ${isDark?'bg-[#06152C] text-white':'bg-white text-[#0A2342]'}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-8 pb-20">
        <p className="text-[#FF6A00] text-[11px] tracking-[0.3em] uppercase font-black">Est. 2015 • Lakeside Estate</p>
        <h1 className="font-black text-4xl md:text-6xl lg:text-7xl leading-[0.9] max-w-4xl mt-4">Building trust in <span className="text-[#FF6A00]">Accra real estate</span></h1>
        <div className="mt-12 grid gap-10 lg:grid-cols-2 items-start">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#0A2342] relative"><img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2940" alt="Office" className="h-full w-full object-cover opacity-90"/><div className="absolute bottom-4 left-4 bg-white p-3 rounded-xl flex items-center gap-3 shadow-xl"><img src={logo} className="h-8 w-8 object-contain" alt=""/><div><p className="font-black text-[#0A2342] text-xs">THE BRICKS</p><p className="text-[10px] text-black/50">GREDA Licensed</p></div></div></div>
          <div className="lg:pt-10"><div className={`space-y-5 text-[15px] leading-7 ${isDark?'text-white/70':'text-black/60'}`}><p>The Bricks Properties is a GREDA-licensed firm based in Lakeside Estate, Accra. Since 2015, we build, rent, sell, and manage modern residential & commercial properties.</p><p>Our mission: make property ownership transparent for Ghanaians at home & diaspora. Every property has verified title. Every transaction documented.</p></div><div className={`mt-10 border-t pt-10 ${isDark?'border-white/10':'border-black/5'}`}><p className="text-[#FF6A00] text-[11px] tracking-[0.2em] uppercase font-black mb-6">Why Choose Us</p><div className="space-y-4">{['All properties have verified titles','Flexible payment plans available','10+ years serving Accra market','200+ properties sold & managed'].map((item,i)=><div key={i} className="flex items-center gap-4"><div className="h-px w-8 bg-[#FF6A00]"/><span className={`text-sm font-medium ${isDark?'text-white':'text-[#0A2342]'}`}>{item}</span></div>)}</div></div></div>
        </div>
        <div className={`mt-20 grid grid-cols-1 md:grid-cols-3 border-y py-10 ${isDark?'border-white/10':'border-black/5'}`}>{stats.map((s,i)=>{ const Icon=s.icon; return <div key={i} className={`flex items-center gap-5 py-4 ${i!==0?'md:border-l md:pl-10 border-t md:border-t-0':''} ${isDark?'md:border-white/10 border-white/10':'md:border-black/5 border-black/5'}`}><Icon className="h-5 w-5 text-[#FF6A00]"/><div><p className="font-black text-2xl">{s.value}</p><p className="text-[11px] uppercase tracking-widest opacity-60 font-bold">{s.label}</p></div></div>})}</div>
      </div>
    </div>
  )
}
