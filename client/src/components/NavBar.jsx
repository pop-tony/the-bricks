import { Link, NavLink } from 'react-router-dom';
import { Moon, Sun, Menu, X, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ease = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Properties', path: '/properties' },
    { name: 'Developments', path: '/developments' },
    { name: 'Sell', path: '/sell' },
    { name: 'Manage', path: '/manage' },
    { name: 'Agents', path: '/agents' },
    { name: 'About', path: '/about' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease }}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ease-luxe ${
        scrolled 
          ? 'border-b border-brick-subtle bg-brick-white/80 backdrop-blur-xl' 
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center bg-brick-gold transition-luxe group-hover:bg-brick-charcoal">
            <span className="font-serif text-xl text-brick-black group-hover:text-brick-gold transition-luxe">B</span>
          </div>
          <span className={`font-serif text-2xl transition-luxe ${scrolled ? 'text-brick-black' : 'text-brick-white'}`}>
            The<span className="text-brick-gold">Bricks</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 lg:flex">
          {links.map(link => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative text-sm font-medium tracking-wide transition-luxe ${
                  isActive
                    ? 'text-brick-gold'
                    : scrolled 
                      ? 'text-brick-muted hover:text-brick-charcoal' 
                      : 'text-brick-white/80 hover:text-brick-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-px w-full origin-center scale-x-0 bg-brick-gold transition-luxe ${isActive ? 'scale-x-100' : 'group-hover:scale-x-100'}`} />
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+233XXXXXXXXX"
            className={`hidden items-center gap-3 border px-5 py-3 text-xs font-medium uppercase tracking-[0.15em] transition-luxe md:flex ${
              scrolled 
                ? 'border-brick-charcoal text-brick-charcoal hover:bg-brick-charcoal hover:text-brick-white' 
                : 'border-brick-white/20 text-brick-white hover:bg-brick-white hover:text-brick-black'
            }`}
          >
            <Phone className="h-3.5 w-3.5" />
            Call Us
          </a>

          <button
            onClick={toggleTheme}
            className={`p-2.5 transition-luxe ${
              scrolled ? 'text-brick-muted hover:text-brick-charcoal' : 'text-brick-white/70 hover:text-brick-white'
            }`}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-2.5 lg:hidden transition-luxe ${
              scrolled ? 'text-brick-charcoal' : 'text-brick-white'
            }`}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease }}
            className="border-t border-brick-subtle bg-brick-white lg:hidden"
          >
            <div className="mx-auto max-w-7xl px-8 py-8">
              {links.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block border-b border-brick-subtle py-4 font-serif text-lg transition-luxe ${
                        isActive ? 'text-brick-gold' : 'text-brick-charcoal hover:text-brick-gold'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease }}
                href="tel:+233XXXXXXXXX"
                className="mt-6 flex items-center justify-center gap-3 bg-brick-charcoal py-4 text-sm font-medium uppercase tracking-[0.15em] text-brick-white"
              >
                <Phone className="h-4 w-4" />
                Call The Bricks
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}