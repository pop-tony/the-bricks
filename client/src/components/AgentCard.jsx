
import { Phone, MessageCircle, BadgeCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
export default function AgentCard({ agent }){
  const { isDark } = useTheme();
  const { name='Kwame Mensah', photo='', phone='233598052702', listings=47, sold=32, role='Lakeside Specialist' } = agent||{};
  const msg=`Hi ${name}, I'm interested in a property from The Bricks - Lakeside Estate`;
  return (
    <div className={`rounded-2xl p-6 border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${isDark?'bg-[#112A4A] border-white/10':'bg-white border-black/5'}`}>
      <div className="flex items-center gap-4">
        <div className="relative">{photo?<img src={photo} alt={name} className="h-14 w-14 rounded-full object-cover border-2 border-white/10"/>:<div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#0A2342] to-[#FF6A00] flex items-center justify-center text-white font-black text-xl">{name[0]}</div>}<div className="absolute -bottom-1 -right-1 h-5 w-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center"><BadgeCheck className="h-3 w-3 text-white"/></div></div>
        <div><p className={`font-black text-[15px] ${isDark?'text-white':'text-[#0A2342]'}`}>{name}</p><p className={`text-[11px] uppercase tracking-widest font-bold ${isDark?'text-white/40':'text-black/40'}`}>{role}</p><p className={`text-[11px] mt-1 ${isDark?'text-white/50':'text-black/40'}`}>{listings} Active • {sold} Sold</p></div>
      </div>
      <div className="mt-6 grid grid-cols-[1fr_auto] gap-2.5"><a href={`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`} target="_blank" className="flex items-center justify-center gap-2 bg-[#0A2342] py-3.5 rounded-xl text-xs font-black uppercase tracking-widest text-white hover:bg-[#FF6A00] transition-colors"><MessageCircle className="h-4 w-4"/>Message</a><a href={`tel:+${phone}`} className={`flex items-center justify-center w-12 border rounded-xl transition-colors ${isDark?'bg-white/10 border-white/10 text-white hover:bg-white/20':'bg-white border-black/10 text-[#0A2342] hover:bg-black/5'}`}><Phone className="h-4 w-4"/></a></div>
    </div>
  )
}
