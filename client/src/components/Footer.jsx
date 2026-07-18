import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, ArrowUpRight, Mail } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/logo.webp';

export default function Footer(){
  const { isDark } = useTheme();
  const year = new Date().getFullYear();

  const socials = [
    { icon: FaFacebook, href: 'https://facebook.com/thebricksgh', label: 'Facebook' },
    { icon: FaInstagram, href: 'https://instagram.com/thebricksgh', label: 'Instagram' },
    { icon: FaTwitter, href: 'https://x.com/thebricksgh', label: 'X' },
    { icon: FaLinkedin, href: 'https://linkedin.com/company/thebricksgh', label: 'LinkedIn' },
    { icon: FaYoutube, href: 'https://youtube.com/@thebricksgh', label: 'YouTube' },
    { icon: MessageCircle, href: 'https://wa.me/233598052702', label: 'WhatsApp' },
  ];

  const links = {
    explore: [
      {name:'Buy Property', path:'/properties?status=sale'},
      {name:'Rent Property', path:'/properties?status=rent'},
      {name:'New Developments', path:'/properties?status=new-build'},
      {name:'Sell with Us', path:'/sell'},
      {name:'Management', path:'/manage'}
    ],
    company: [
      {name:'About The Bricks', path:'/about'},
      {name:'Our Agents', path:'/agents'},
      {name:'Careers', path:'/careers'},
      {name:'Journal', path:'/blog'},
      {name:'Contact', path:'/contact'}
    ],
    areas: [
      {name:'Lakeside Estate', path:'/properties?location=lakeside'},
      {name:'East Legon', path:'/properties?location=east-legon'},
      {name:'Ashaley Botwe', path:'/properties?location=ashaley-botwe'},
      {name:'Adenta', path:'/properties?location=adenta'},
      {name:'Airport Residential', path:'/properties?location=airport-residential'},
    ]
  };

  return (
    <footer className={`border-t transition-colors duration-700 ${isDark? 'bg-[#081A33] border-white/10' : 'bg-white border-black/5'}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-12 md:pt-16 pb-8">

        {/* TOP ROW: Brand + Links */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_2.6fr] gap-12 lg:gap-16">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3">
              <div className={`h-11 w-11 rounded-xl p-2 shadow flex items-center justify-center transition-colors duration-500 ${isDark?'bg-white':'bg-[#0A2342]'}`}>
                <img src={logo} alt="Bricks" className="h-full w-full object-contain" />
              </div>
              <div className="leading-[0.9]">
                <p className={`font-black text-base tracking-wide transition-colors ${isDark?'text-white':'text-[#0A2342]'}`}>THE BRICKS</p>
                <p className={`text- font-bold tracking-[0.22em] uppercase transition-colors ${isDark?'text-white/60':'text-black/40'}`}>Properties</p>
              </div>
            </div>

            <p className={`mt-6 text-sm leading-7 max-w-sm transition-colors ${isDark?'text-white/50':'text-black/60'}`}>
              Lakeside Estate specialists. GREDA Licensed since 2015. Building, renting, selling & managing exceptional properties across Accra.
            </p>

            {/* SOCIALS */}
            <div className="mt-8">
              <p className="text- font-black tracking-[0.2em] uppercase text-[#FF6A00]">Follow Us</p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {socials.map((s,i)=>{
                  const Icon=s.icon;
                  return (
                    <a key={i} href={s.href} target="_blank" aria-label={s.label}
                      className={`h-10 w-10 rounded-xl flex items-center justify-center border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg group ${isDark?'bg-white/5 border-white/10 text-white/70 hover:bg-[#FF6A00] hover:border-[#FF6A00] hover:text-white':'bg-[#F8F9FB] border-black/5 text-black/50 hover:bg-[#0A2342] hover:border-[#0A2342] hover:text-white'}`}>
                      <Icon className="h-4 w-4" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* CONTACT PILLS */}
            <div className="mt-8 space-y-3">
              <a href="https://maps.google.com/?q=Lakeside+Estate+Accra" target="_blank" className={`flex items-center gap-3 text-sm transition-colors ${isDark?'text-white/60 hover:text-white':'text-black/60 hover:text-[#0A2342]'}`}>
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${isDark?'bg-white/10':'bg-black/5'}`}><MapPin className="h-4 w-4 text-[#FF6A00]"/></div> Lakeside Estate, Accra, Ghana
              </a>
              <a href="tel:+233598052702" className={`flex items-center gap-3 text-sm transition-colors ${isDark?'text-white/60 hover:text-white':'text-black/60 hover:text-[#0A2342]'}`}>
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${isDark?'bg-white/10':'bg-black/5'}`}><Phone className="h-4 w-4 text-[#FF6A00]"/></div> +233 598 052 702
              </a>
            </div>
          </div>

          {/* LINKS - GRID 2 on mobile, GRID 3 on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {Object.entries(links).map(([title, items])=>(
              <div key={title} className={title==='areas'?'col-span-2 lg:col-span-1':''}>
                <p className="text- font-black tracking-[0.2em] uppercase text-[#FF6A00]">{title==='areas'?'Top Areas':title}</p>
                <ul className="mt-5 space-y-3.5">
                  {items.map(l=>(
                    <li key={l.name}>
                      <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} to={l.path} className={`group inline-flex items-center gap-1.5 text-[13.5px] transition-colors ${isDark?'text-white/60 hover:text-white':'text-black/60 hover:text-[#0A2342]'}`}>
                        {l.name}
                        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#FF6A00]"/>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className={`mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t pt-8 transition-colors ${isDark?'border-white/10':'border-black/5'}`}>
          <div className="flex flex-wrap items-center gap-4">
            <p className={`text- transition-colors ${isDark?'text-white/30':'text-black/30'}`}>© {year} The Bricks Properties • Lakeside Estate • GREDA Licensed</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <a href="mailto:hello@thebricksgh.com" className={`h-9 w-9 rounded-xl flex items-center justify-center border transition-colors ${isDark?'bg-white/5 border-white/10 text-white/60 hover:bg-white hover:text-[#0A2342]':'bg-white border-black/5 text-black/40 hover:bg-[#0A2342] hover:text-white'}`}><Mail className="h-4 w-4"/></a>
              <a href="https://wa.me/233598052702" target="_blank" className="h-9 w-9 rounded-xl bg-[#FF6A00] flex items-center justify-center text-white hover:bg-[#FF8A1F] transition-colors shadow"><MessageCircle className="h-4 w-4"/></a>
            </div>
            <div className={`flex gap-5 text- transition-colors ${isDark?'text-white/30':'text-black/30'}`}>
              <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} to="/privacy" className="hover:underline hover:text-[#FF6A00]">Privacy</Link>
              <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} to="/terms" className="hover:underline hover:text-[#FF6A00]">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}