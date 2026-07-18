
import HeroSearch from '../components/HeroSearch';
import PropertyCard from '../components/PropertyCard';
import ServiceCard from '../components/ServiceCard';
import TrustBar from '../components/TrustBar';
import { Building2, Key, Hammer, ClipboardList } from 'lucide-react';
import { properties } from '../data/properties';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const services=[
  {icon:Hammer,title:'Build',desc:'Modern developments across Accra with verified titles',link:'/developments'},
  {icon:Key,title:'Rent',desc:'Short & long term rentals in Lakeside & East Legon',link:'/properties?status=rent'},
  {icon:Building2,title:'Sell',desc:'List your property, we handle valuation to closing',link:'/sell'},
  {icon:ClipboardList,title:'Manage',desc:'For landlords & diaspora - 10% monthly',link:'/manage'},
];

export default function HomePage(){
  const featured=properties.slice(0,6);
  const { isDark } = useTheme();
  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark?'bg-[#06152C]':'bg-[#F8F9FB]'}`}>
      <HeroSearch />
      <TrustBar />
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-24">
        <div className={`mb-10 flex items-end justify-between border-b pb-8 ${isDark?'border-white/10':'border-black/5'}`}>
          <div><p className="text-[#FF6A00] text-[11px] tracking-[0.3em] uppercase font-black mb-3">Curated Selection</p><h2 className={`font-black text-3xl md:text-5xl leading-[0.9] ${isDark?'text-white':'text-[#0A2342]'}`}>Featured Listings</h2><p className={`mt-3 text-sm ${isDark?'text-white/50':'text-black/50'}`}>Handpicked in Lakeside Estate & Accra</p></div>
          <Link to="/properties" className={`group hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest ${isDark?'text-white/70 hover:text-white':'text-[#0A2342] hover:text-[#FF6A00]'}`}>View All <span className="h-px w-8 bg-[#FF6A00] group-hover:w-12 transition-all"/></Link>
        </div>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {featured.map(p=><PropertyCard key={p.id} property={p} />)}
        </div>
      </section>
      <section className={`py-16 md:py-24 transition-colors ${isDark?'bg-[#081A33]':'bg-white'}`}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12 text-center"><p className="text-[#FF6A00] text-[11px] tracking-[0.3em] uppercase font-black">Services</p><h2 className={`font-black text-3xl md:text-5xl mt-3 ${isDark?'text-white':'text-[#0A2342]'}`}>What We Do</h2></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">{services.map(s=><ServiceCard key={s.title} {...s} />)}</div>
        </div>
      </section>
    </div>
  )
}
