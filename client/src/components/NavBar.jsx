import { Link, NavLink } from 'react-router-dom';
import { Moon, Sun, Menu, X, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ isDark, setIsDark }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Glass effect on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only major pages - no redundant filter links
  const links = [
    { name: 'Properties', path: '/properties' },
    { name: 'Developments', path: '/developments' },
    { name: 'Sell', path: '/sell' },
    { name: 'Manage', path: '/manage' },
    { name: 'Agents', path: '/agents' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? 'border-b border-white/10 bg-brick-navy/80 backdrop-blur-xl' 
        : 'bg-transparent'
    }`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brick-gold">
            <span className="text-xl font-black text-brick-navy">B</span>
          </div>
          <span className="text-2xl font-black text-white">
            The<span className="text-brick-gold">Bricks</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-1 lg:flex">
          {links.map(link => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-brick-gold/10 text-brick-gold'
                    : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+233XXXXXXXXX"
            className="hidden items-center gap-2 rounded-xl bg-brick-card px-4 py-2 text-sm font-bold text-white transition hover:bg-brick-card/80 md:flex"
          >
            <Phone className="h-4 w-4 text-brick-gold" />
            Call Us
          </a>

          <button
            onClick={() => setIsDark(!isDark)}
            className="rounded-xl bg-brick-card p-2.5 text-brick-gold transition hover:bg-brick-card/80"
          >
            {isDark? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-xl bg-brick-card p-2.5 text-white lg:hidden"
          >
            {mobileOpen? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            className="border-t border-white/5 bg-brick-navy/95 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">
              {links.map(link => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 font-semibold transition ${
                      isActive
                        ? 'bg-brick-gold/10 text-brick-gold'
                        : 'text-white hover:bg-white/5'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <a
                href="tel:+233XXXXXXXXX"
                className="flex items-center gap-2 rounded-xl bg-brick-gold px-4 py-3 font-bold text-brick-navy"
              >
                <Phone className="h-4 w-4" />
                Call The Bricks
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
