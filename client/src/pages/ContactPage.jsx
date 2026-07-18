
import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
export default function ContactPage(){
  const { isDark } = useTheme();
  return (
    <div className={`min-h-screen pt-28 md:pt-32 transition-colors duration-500 ${isDark?'bg-[#06152C]':'bg-white'}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-8 pb-20"><p className="text-[#FF6A00] text-[11px] tracking-[0.3em] uppercase font-black">Get in Touch</p><h1 className={`font-black text-4xl md:text-6xl mt-3 ${isDark?'text-white':'text-[#0A2342]'}`}>Contact Us</h1>
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="space-y-8">{[{icon:MapPin,label:'Head Office',value:'Lakeside Estate, Accra, Ghana',href:'https://maps.google.com/?q=Lakeside+Estate'},{icon:Phone,label:'Phone',value:'+233 598 052 702',href:'tel:+233598052702'},{icon:MessageCircle,label:'WhatsApp',value:'Chat with us',href:'https://wa.me/233598052702'}].map((item,i)=><a key={i} href={item.href} target="_blank" className={`group flex gap-5 border-b pb-8 transition-colors hover:border-[#FF6A00] ${isDark?'border-white/10':'border-black/5'}`}><item.icon className="h-5 w-5 text-[#FF6A00] mt-1"/><div><p className={`text-[11px] uppercase tracking-widest font-bold ${isDark?'text-white/40':'text-black/40'}`}>{item.label}</p><p className={`mt-2 font-medium group-hover:text-[#FF6A00] ${isDark?'text-white':'text-[#0A2342]'}`}>{item.value}</p></div></a>)}</div>
          <form className={`rounded-2xl p-8 border shadow-sm ${isDark?'bg-[#112A4A] border-white/10':'bg-[#F8F9FB] border-black/5'}`}><div className="space-y-6"><input placeholder="Name" className={`w-full h-12 border-b bg-transparent text-sm outline-none focus:border-[#FF6A00] ${isDark?'border-white/10 text-white placeholder:text-white/40':'border-black/10 text-[#0A2342]'}`} /><input type="email" placeholder="Email" className={`w-full h-12 border-b bg-transparent text-sm outline-none focus:border-[#FF6A00] ${isDark?'border-white/10 text-white placeholder:text-white/40':'border-black/10 text-[#0A2342]'}`} /><textarea placeholder="Message" rows={5} className={`w-full border-b bg-transparent py-3 text-sm outline-none focus:border-[#FF6A00] resize-none ${isDark?'border-white/10 text-white placeholder:text-white/40':'border-black/10 text-[#0A2342]'}`} /><button className="w-full bg-[#0A2342] py-4 rounded-xl text-xs font-black uppercase tracking-widest text-white hover:bg-[#FF6A00] transition-colors">Send Message</button></div></form>
        </div>
      </div>
    </div>
  )
}
