import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/logo.webp';

export default function Footer(){
  const { isDark } = useTheme();
  const year = new Date().getFullYear();
  const links = {
    explore: [{name:'Buy Property', path:'/properties?status=sale'},{name:'Rent Property', path:'/properties?status=rent'},{name:'New Developments', path:'/properties?status=new-build'},{name:'Sell with Us', path:'/sell'},{name:'Management', path:'/manage'}],
    company: [{name:'About The Bricks', path:'/about'},{name:'Our Agents', path:'/agents'},{name:'Careers', path:'/careers'},{name:'Journal', path:'/blog'},{name:'Contact', path:'/contact'}],
    areas: [{name:'Lakeside Estate', path:'/properties?location=lakeside'},{name:'East Legon', path:'/properties?location=east-legon'},{name:'Ashaley Botwe', path:'/properties?location=ashaley-botwe'}]
  };

  return (
    <footer className={`border-t transition-colors duration-500 ${isDark? 'bg-[#081A33] border-white/10' : 'bg-white border-black/5'}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-3">
              <div className={`h-11 w-11 rounded-xl p-2 shadow flex items-center justify-center transition-colors ${isDark?'bg-white':'bg-[#0A2342]'}`}>
                <img src={logo} alt="Bricks" className="h-full w-full object-contain" />
              </div>
              <div className="leading-[0.9]">
                <p className={`font-black text-base tracking-wide transition-colors ${isDark?'text-white':'text-[#0A2342]'}`}>THE BRICKS</p>
                <p className={`text- font-bold tracking-[0.22em] uppercase transition-colors ${isDark?'text-white/60':'text-black/40'}`}>Properties</p>
              </div>
            </div>
            <p className={`mt-6 text-sm leading-7 max-w-sm transition-colors ${isDark?'text-white/50':'text-black/60'}`}>Lakeside Estate specialists. GREDA Licensed since 2015. Building, renting, selling & managing exceptional properties across Accra.</p>
          </div>

          {Object.entries(links).map(([t,items])=>(
            <div key={t}>
              <p className="text- font-black tracking-[0.2em] uppercase text-[#FF6A00]">{t==='areas'?'Top Areas':t}</p>
              <ul className="mt-5 space-y-3">
                {items.map(l=><li key={l.name}><Link to={l.path} className={`group inline-flex gap-1.5 items-center text-sm transition-colors ${isDark?'text-white/60 hover:text-white':'text-black/60 hover:text-[#0A2342]'}`}>{l.name}<ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#FF6A00]"/></Link></li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 border-y py-8 transition-colors ${isDark?'border-white/10':'border-black/5'}`}>
          {[{icon:MapPin,text:'Lakeside Estate, Accra',href:'https://maps.google.com/?q=Lakeside+Estate'},{icon:Phone,text:'+233 598 052 702',href:'tel:+233598052702'},{icon:MessageCircle,text:'Chat on WhatsApp',href:'https://wa.me/233598052702'}].map((i,idx)=>
            <a key={idx} href={i.href} target="_blank" className={`flex items-center gap-3 text-sm transition-colors ${isDark?'text-white/60 hover:text-white':'text-black/60 hover:text-[#0A2342]'}`}>
              <div className={`h-9 w-9 rounded-xl flex items-center justify-center transition-colors ${isDark?'bg-white/10':'bg-black/5'}`}><i.icon className="h-4 w-4 text-[#FF6A00]"/></div>{i.text}
            </a>
          )}
        </div>

        <div className={`flex flex-col md:flex-row justify-between gap-4 pt-8 text- transition-colors ${isDark?'text-white/30':'text-black/30'}`}>
          <p>© {year} The Bricks Properties • Lakeside Estate</p>
          <div className="flex gap-6"><Link to="/privacy" className="hover:underline">Privacy</Link><Link to="/terms" className="hover:underline">Terms</Link></div>
        </div>
      </div>
    </footer>
  )
}