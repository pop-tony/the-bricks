
import { X, SlidersHorizontal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
export default function FilterSidebar({ filters, setFilters, isOpen, onClose }){
  const { isDark } = useTheme();
  const locations=['Lakeside Estate','East Legon','Ashaley Botwe','Airport Residential','Adenta'];
  const types=['Apartment','House','Land','Commercial'];
  const content=(
    <div className="space-y-8">
      <div><p className="text-[11px] font-black tracking-[0.2em] uppercase text-[#FF6A00]">Status</p><div className="mt-4 space-y-3">{['Sale','Rent','New Build'].map(s=><label key={s} className="flex items-center gap-3 cursor-pointer"><input type="radio" name="status" checked={filters?.status===s} onChange={()=>setFilters({...filters,status:s})} className="h-4 w-4 accent-[#FF6A00]"/><span className={`text-sm ${isDark?'text-white/70':'text-black/60'}`}>{s}</span></label>)}</div></div>
      <div><p className="text-[11px] font-black tracking-[0.2em] uppercase text-[#FF6A00]">Location</p><select className={`mt-4 w-full h-11 border px-3 rounded-xl text-sm outline-none focus:border-[#FF6A00] ${isDark?'bg-[#0A2342] border-white/10 text-white':'bg-[#F8F9FB] border-black/10 text-[#0A2342]'}`}><option>Select Area</option>{locations.map(l=><option key={l}>{l}</option>)}</select></div>
      <div><p className="text-[11px] font-black tracking-[0.2em] uppercase text-[#FF6A00]">Type</p><div className="mt-4 space-y-3">{types.map(t=><label key={t} className="flex items-center gap-3 cursor-pointer"><input type="checkbox" className="h-4 w-4 accent-[#FF6A00]"/><span className={`text-sm ${isDark?'text-white/70':'text-black/60'}`}>{t}</span></label>)}</div></div>
    </div>
  );
  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose}/>}
      <aside className={`fixed inset-y-0 right-0 z-50 w-[85%] max-w-[380px] lg:sticky lg:top-[88px] lg:h-fit lg:w-[320px] lg:translate-x-0 transition-transform duration-300 border-l lg:border lg:rounded-2xl shadow-sm ${isOpen?'translate-x-0':'translate-x-full lg:translate-x-0'} ${isDark?'bg-[#0A2342] border-white/10':'bg-white border-black/5'}`}>
        <div className="flex h-full flex-col"><div className={`flex items-center justify-between border-b p-6 ${isDark?'border-white/10':'border-black/5'}`}><div className="flex items-center gap-2"><SlidersHorizontal className="h-4 w-4"/><h2 className={`font-black text-xs uppercase tracking-widest ${isDark?'text-white':'text-[#0A2342]'}`}>Filters</h2></div><button onClick={onClose} className="lg:hidden p-2 hover:bg-black/5 rounded-xl"><X className="h-5 w-5"/></button></div><div className="flex-1 overflow-y-auto p-6">{content}</div><div className={`p-6 border-t ${isDark?'border-white/10':'border-black/5'}`}><button onClick={onClose} className="w-full bg-[#FF6A00] py-3.5 rounded-xl text-xs font-black uppercase tracking-widest text-white hover:bg-[#0A2342] transition-colors">Apply</button></div></div>
      </aside>
    </>
  )
}
