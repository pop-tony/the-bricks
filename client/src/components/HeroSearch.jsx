
import { Search, MapPin, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/logo.webp';

const LIGHT_BG = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940";
const DARK_BG = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2940";

export default function HeroSearch(){
  const [status,setStatus]=useState('Buy');
  const [location,setLocation]=useState('');
  const [type,setType]=useState('');
  const navigate=useNavigate();
  const { isDark } = useTheme();

  const handleSearch=()=>{
    const params=new URLSearchParams();
    if(status!=='Buy') params.set('status',status.toLowerCase());
    if(location) params.set('location',location.toLowerCase().replace(' ','-'));
    if(type) params.set('type',type.toLowerCase());
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className={`relative pt-[88px] overflow-hidden transition-colors duration-700 ${isDark?'bg-[#06152C]':'bg-[#F8F9FB]'}`}>

      {/* BACKGROUND - INCREASED VISIBILITY */}
      <div className="absolute inset-0">
        <img
          src={LIGHT_BG}
          alt="light"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${isDark? 'opacity-0' : 'opacity-100'}`}
        />
        <img
          src={DARK_BG}
          alt="dark"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${isDark? 'opacity-100' : 'opacity-0'}`}
        />

        {/* WAS REDUCED FROM 85/80 TO 55/45 SO IMAGE SHOWS MORE */}
        <div className={`absolute inset-0 transition-colors duration-700 ${isDark? 'bg-[#06152C]/55' : 'bg-white/45'}`} />

        {/* GRADIENT REDUCED - was /80 to /10, now /60 to transparent */}
        <div className={`absolute inset-0 transition-colors duration-700 bg-gradient-to-r ${isDark? 'from-[#06152C]/90 via-[#06152C]/50 to-transparent' : 'from-white/90 via-white/40 to-transparent'}`} />

        {/* Bottom vignette for depth but lighter */}
        <div className={`absolute inset-0 bg-gradient-to-t ${isDark? 'from-[#06152C]/40 to-transparent' : 'from-white/30 to-transparent'}`} />
      </div>

      {/* CONTENT */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center relative z-10">
        <div>
          <div className={`inline-flex items-center gap-2 border px-3.5 py-2 rounded-full transition-all duration-500 ${isDark?'bg-white/10 border-white/10':'bg-white border-black/5 shadow-sm'}`}>
            <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"/>
            <p className="text-[#FF6A00] text- tracking-[0.2em] uppercase font-black">Lakeside Estate • GREDA Licensed</p>
          </div>

          <h1 className={`mt-6 font-black text-4xl md:text-5xl lg:text- leading-[0.9] transition-colors duration-500 ${isDark?'text-white':'text-[#0A2342]'}`}>
            Find Your<br/><span className="text-[#FF6A00]">Dream Property</span><br/>in Ghana
          </h1>

          <p className={`mt-5 max-w- text-sm md:text-base leading-7 transition-colors duration-500 ${isDark?'text-white/60':'text-black/60'}`}>
            Land Acquisition • Houses for Sale • Apartments for Rent. Verified titles, flexible payment plans.
          </p>

          <div className={`mt-8 p-2 md:p-2.5 rounded-2xl max-w- border transition-all duration-500 ${isDark?'bg-[#112A4A]/80 backdrop-blur-xl border-white/10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]':'bg-white/90 backdrop-blur-xl border-black/5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.15)]'}`}>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-2">
              <select value={status} onChange={e=>setStatus(e.target.value)} className={`h-12 md:h-14 w-full rounded-xl border px-4 text-sm font-medium outline-none focus:border-[#FF6A00] transition-colors ${isDark?'bg-white/5 border-white/10 text-white':'bg-[#F8F9FB] border-black/5 text-[#0A2342]'}`}>
                <option>Buy</option><option>Rent</option><option>New Builds</option>
              </select>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#FF6A00]"/>
                <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Lakeside Estate..." className={`h-12 md:h-14 w-full rounded-xl border pl-10 pr-4 text-sm outline-none focus:border-[#FF6A00] transition-colors ${isDark?'bg-white/5 border-white/10 text-white placeholder:text-white/40':'bg-[#F8F9FB] border-black/5 text-[#0A2342] placeholder:text-black/40'}`} />
              </div>

              <select value={type} onChange={e=>setType(e.target.value)} className={`h-12 md:h-14 w-full rounded-xl border px-4 text-sm outline-none focus:border-[#FF6A00] transition-colors ${isDark?'bg-white/5 border-white/10 text-white':'bg-[#F8F9FB] border-black/5 text-[#0A2342]'}`}>
                <option value="">All Types</option><option>Apartment</option><option>House</option><option>Land</option>
              </select>

              <button onClick={handleSearch} className="h-12 md:h-14 flex items-center justify-center gap-2 bg-[#FF6A00] px-8 rounded-xl text-xs font-black uppercase tracking-widest text-white hover:bg-[#0A2342] transition-colors">
                <Search className="h-4 w-4"/>Search
              </button>
            </div>
          </div>

          <div className={`mt-6 flex flex-wrap gap-5 text- transition-colors ${isDark?'text-white/50':'text-black/50'}`}>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500"/>Verified Titles</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500"/>Titled Land</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500"/>Installment</span>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className={`p-2.5 md:p-3 rounded- shadow-2xl transition-colors duration-500 ${isDark?'bg-[#112A4A]':'bg-white'}`}>
            <div className="aspect-[4/3] bg-gradient-to-br from-[#0A2342] to-[#FF6A00] flex items-center justify-center rounded- overflow-hidden relative">
              <img src={logo} className="h-28 w-28 object-contain bg-white p-3 rounded-2xl shadow-2xl" alt="Bricks"/>
            </div>
            <div className="p-4">
              <p className={`font-black text-sm transition-colors ${isDark?'text-white':'text-[#0A2342]'}`}>Lakeside 4-Bed Executive</p>
              <p className={`mt-1 text-xs transition-colors ${isDark?'text-white/50':'text-black/50'}`}>GHS 1,250,000 • Titled • Lakeside Estate</p>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 bg-[#FF6A00] px-5 py-3 rounded-xl text-xs font-black text-white shadow-[0_12px_30px_rgba(255,106,0,0.45)]">10% OFF • This Month</div>
        </div>
      </div>
    </section>
  )
}