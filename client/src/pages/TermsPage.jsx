
import { useTheme } from '../context/ThemeContext';
export default function TermsPage(){
  const { isDark } = useTheme();
  const sections=[{title:"1. Agreement to Terms",content:"By accessing The Bricks Properties website you agree to these Terms."},{title:"2. Listings & Accuracy",content:"All property info is provided by sellers. Prices in GHS subject to change."},{title:"3. Viewing Appointments",content:"Viewing fee GHS 100 non-refundable, credited to commission if purchase within 90 days."},{title:"4. Contact",content:"legal@thebricks.com • +233 598 052 702 • Lakeside Estate, Accra"}];
  return <div className={`min-h-screen pt-28 pb-20 px-4 md:px-8 transition-colors ${isDark?'bg-[#06152C] text-white':'bg-white text-[#0A2342]'}`}><div className="mx-auto max-w-4xl"><p className="text-[#FF6A00] text-[11px] tracking-[0.3em] uppercase font-black">Legal</p><h1 className="font-black text-4xl md:text-5xl mt-3">Terms of Service</h1><div className="mt-12 space-y-10">{sections.map(s=><div key={s.title} className={`border-b pb-10 ${isDark?'border-white/10':'border-black/5'}`}><h2 className="font-black text-xl">{s.title}</h2><p className={`mt-3 text-sm leading-7 ${isDark?'text-white/60':'text-black/60'}`}>{s.content}</p></div>)}</div></div></div>
}
