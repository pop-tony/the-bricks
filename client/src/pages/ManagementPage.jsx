
import { Shield, Wrench, FileText, Users } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
export default function ManagementPage(){
  const { isDark } = useTheme();
  const services=[{icon:Users,title:'Tenant Screening',desc:'We find & vet quality tenants'},{icon:FileText,title:'Rent Collection',desc:'Monthly rent straight to your account'},{icon:Wrench,title:'Maintenance',desc:'24/7 repair coordination'},{icon:Shield,title:'Inspections',desc:'Quarterly reports with photos'}];
  return (
    <div className={`min-h-screen pt-28 pb-20 transition-colors ${isDark?'bg-[#06152C] text-white':'bg-white text-[#0A2342]'}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center"><p className="text-[#FF6A00] text-[11px] tracking-[0.3em] uppercase font-black">For Owners</p><h1 className="font-black text-4xl md:text-6xl leading-[0.9] mt-3">Property Management</h1><p className={`mt-6 leading-7 ${isDark?'text-white/60':'text-black/60'}`}>For landlords in Ghana & diaspora. We handle everything while you earn passive income.</p></div>
        <div className={`mt-16 divide-y ${isDark?'divide-white/10':'divide-black/5'}`}>{services.map(s=>{ const Icon=s.icon; return <div key={s.title} className="flex gap-6 py-8"><Icon className="h-5 w-5 text-[#FF6A00] mt-1"/><div><h3 className="font-black text-xl">{s.title}</h3><p className={`mt-2 ${isDark?'text-white/60':'text-black/60'}`}>{s.desc}</p></div></div>})}</div>
        <div className={`mx-auto mt-16 max-w-2xl border rounded-2xl p-10 text-center ${isDark?'bg-[#112A4A] border-white/10':'bg-[#F8F9FB] border-black/5'}`}><p className="text-[#FF6A00] text-[11px] uppercase tracking-widest font-black">Simple Pricing</p><h2 className="font-black text-4xl mt-3">10% of monthly rent</h2><p className={`mt-3 ${isDark?'text-white/60':'text-black/60'}`}>No setup fees. Cancel anytime.</p><button className="mt-8 bg-[#FF6A00] px-10 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-white hover:bg-[#0A2342]">Onboard My Property</button></div>
      </div>
    </div>
  )
}
