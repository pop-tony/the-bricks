
import { MessageCircle, ArrowUpRight } from 'lucide-react';
export default function WhatsAppCTA({ property, phone="233598052702", className }){
  const message=property?`Hi, I'm interested in ${property.title} at ${property.location} - GHS ${property.price?.toLocaleString()}`:`Hello THE BRICKS PROPERTIES`;
  return (
    <>
      <a href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`} target="_blank" className={`group flex w-full items-center justify-between bg-[#0A2342] px-6 py-4 rounded-xl text-white hover:bg-[#FF6A00] transition-colors shadow-lg ${className||''}`}>
        <div className="flex items-center gap-3"><div className="h-8 w-8 bg-white/10 rounded-lg flex items-center justify-center"><MessageCircle className="h-4 w-4"/></div><span className="text-xs font-black uppercase tracking-widest">Inquire via WhatsApp</span></div><ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
      </a>
      <a href={`https://wa.me/${phone}`} target="_blank" className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6A00] to-[#FF9A00] text-white shadow-[0_12px_30px_rgba(255,106,0,0.45)] hover:scale-105 transition-transform">💬</a>
    </>
  )
}
