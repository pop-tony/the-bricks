
import PropertyCard from '../components/PropertyCard';
import { properties } from '../data/properties';
import { useTheme } from '../context/ThemeContext';
export default function DevelopmentsPage(){
  const newBuilds=properties.filter(p=>p.status==='New Build');
  const { isDark } = useTheme();
  return (
    <div className={`min-h-screen pt-28 pb-20 transition-colors ${isDark?'bg-[#06152C]':'bg-white'}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-8"><p className="text-[#FF6A00] text-[11px] tracking-[0.3em] uppercase font-black">The Bricks Portfolio</p><h1 className={`font-black text-4xl md:text-6xl leading-[0.9] mt-3 ${isDark?'text-white':'text-[#0A2342]'}`}>New Developments</h1><p className={`mt-4 max-w-2xl ${isDark?'text-white/60':'text-black/60'}`}>Buildings conceived, designed, and constructed by The Bricks Properties across Accra.</p><div className="mt-12 grid gap-6 md:grid-cols-3">{newBuilds.map(p=><PropertyCard key={p.id} property={p} />)}</div></div>
    </div>
  )
}
