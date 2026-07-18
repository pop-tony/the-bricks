import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Sun, Moon, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/logo.webp';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'Developments', path: '/developments' },
    { name: 'Sell', path: '/sell' },
    { name: 'Manage', path: '/manage' },
    { name: 'Agents', path: '/agents' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className={`p-5 fixed top-0 z-50 w-full border-b transition-all duration-500 ${
      scrolled? 'backdrop-blur-xl shadow-lg' : ''
    } ${isDark
     ? 'bg-[#0A2342]/95 border-white/10'
      : 'bg-white/95 border-black/5'}`}>

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8 h-">
        <Link to="/" className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-xl p-1.5 flex items-center justify-center shadow transition-colors duration-500 ${isDark? 'bg-white' : 'bg-[#0A2342]'}`}>
            <img src={logo} alt="Bricks" className="h-full w-full object-contain" />
          </div>
          <div className="leading-[0.9]">
            <p className={`font-black text- tracking-wide transition-colors ${isDark? 'text-white' : 'text-[#0A2342]'}`}>THE BRICKS</p>
            <p className={`text- tracking-[0.22em] font-bold uppercase transition-colors ${isDark? 'text-white/60' : 'text-black/40'}`}>Properties</p>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {links.map(l => (
            <NavLink key={l.name} to={l.path} className={({isActive}) =>
              `text- font-medium transition-colors ${isActive? 'text-[#FF6A00] font-black' : isDark? 'text-white/70 hover:text-white' : 'text-black/60 hover:text-[#0A2342]'}`}>
              {l.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className={`h-9 w-9 rounded-xl flex items-center justify-center transition-all duration-300 ${isDark? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/5 text-[#0A2342] hover:bg-black/10'}`}>
            {isDark? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a href="tel:+233598052702" className="hidden md:flex items-center gap-2 bg-[#FF6A00] px-5 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-[#FF8A1F] rounded-xl shadow transition-colors">
            <Phone className="h-3.5 w-3.5" /> Call
          </a>
          <button onClick={() => setOpen(!open)} className={`lg:hidden p-2.5 rounded-xl transition-colors ${isDark? 'text-white hover:bg-white/10' : 'text-[#0A2342] hover:bg-black/5'}`}>
            {open? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className={`lg:hidden border-t px-4 py-6 transition-colors ${isDark? 'bg-[#0A2342] border-white/10' : 'bg-white border-black/5'}`}>
          {links.map(l => (
            <NavLink key={l.name} to={l.path} onClick={()=>setOpen(false)} className={({isActive})=>`block py-4 border-b text-sm transition-colors ${isDark? 'border-white/10' : 'border-black/5'} ${isActive?'text-[#FF6A00] font-black': isDark?'text-white/80':'text-black/60'}`}>{l.name}</NavLink>
          ))}
          <div className="mt-4 flex gap-3">
            <button onClick={toggleTheme} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase flex items-center justify-center gap-2 transition-colors ${isDark? 'bg-white/10 text-white' : 'bg-black/5 text-[#0A2342]'}`}>{isDark? <><Sun className="h-4 w-4"/> White Mode</> : <><Moon className="h-4 w-4"/> Navy Mode</>}</button>
            <a href="tel:+233598052702" className="flex-1 bg-[#FF6A00] py-3 rounded-xl text-xs font-black uppercase text-white text-center">Call</a>
          </div>
        </div>
      )}
    </header>
  );
}