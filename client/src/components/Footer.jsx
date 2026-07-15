import { Link } from 'react-router-dom';
import { MessageCircle, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    explore: [
      { name: 'Buy Property', path: '/properties?status=sale' },
      { name: 'Rent Property', path: '/properties?status=rent' },
      { name: 'New Developments', path: '/properties?status=new-build' },
      { name: 'Sell with Us', path: '/sell' },
      { name: 'Property Management', path: '/manage' },
    ],
    company: [
      { name: 'About The Bricks', path: '/about' },
      { name: 'Our Agents', path: '/agents' },
      { name: 'Careers', path: '/careers' },
      { name: 'Journal', path: '/blog' },
      { name: 'Contact', path: '/contact' },
    ],
    areas: [
      { name: 'East Legon', path: '/properties?location=east-legon' },
      { name: 'Cantonments', path: '/properties?location=cantonments' },
      { name: 'Airport Residential', path: '/properties?location=airport-residential' },
      { name: 'Labone', path: '/properties?location=labone' },
      { name: 'Trasacco Valley', path: '/properties?location=trasacco-valley' },
    ],
  };

  return (
    <footer className="border-t border-brick-subtle bg-brick-white">
      <div className="mx-auto max-w-7xl px-8 py-24">
        <div className="grid gap-20 grid-cols-5">
          {/* Brand */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="col-span-2"
          >
            <Link to="/" className="font-serif text-4xl text-brick-black">
              The<span className="text-brick-gold">Bricks</span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-brick-muted">
              Building, renting, selling & managing exceptional properties across Accra. 
              Your trusted partner since 2015.
            </p>
            
            <div className="mt-8 inline-flex items-center gap-3 border border-brick-subtle px-5 py-3">
              <div className="h-1.5 w-1.5 bg-brick-gold"></div>
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-brick-charcoal">GREDA Licensed</span>
            </div>

            <div className="mt-8 flex gap-6">
              {[FaInstagram, FaFacebookF, FaLinkedinIn].map((Icon, i) => (
                <motion.a 
                  key={i}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.4, ease }}
                  href="#" 
                  className="text-brick-muted hover:text-brick-gold transition-luxe"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          <div className='grid grid-cols-3 gap-10 sm:grid-cols-3 lg:grid-cols-3 lg:gap-60'>
            {Object.entries(links).map(([title, items], idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * (idx + 1), ease }}
                className="relative w-50"
              >
                {/* Gold accent line - desktop only */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 * idx, ease }}
                  className="absolute -left-4 top-0 hidden h-full w-px origin-top bg-brick-subtle block"
                />

                <p className="text-brick-gold text- tracking-[0.2em] uppercase mb-6 mb-8">
                  {title === 'areas'? 'Top Areas' : title}
                </p>

                <ul className="space-y-4 space-y-5">
                  {items.map((link, i) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.05 * i + 0.15 * idx, ease }}
                    >
                      <Link
                        to={link.path}
                        className="group inline-flex items-center gap-2 text- text-sm text-brick-muted transition-luxe hover:text-brick-black"
                      >
                        <span className="relative">
                          {link.name}
                          <span className="absolute -bottom-1 left-0 h-px w-0 bg-brick-gold transition-all duration-300 group-hover:w-full" />
                        </span>
                        <ArrowUpRight className="h-3 w-3 shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-luxe text-brick-gold" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Bar */}
        <div className="mt-20 grid gap-8 border-y border-brick-subtle py-10 grid-cols-3">
          {[
            { icon: MapPin, text: 'East Legon, Accra, Ghana', href: 'https://maps.google.com/?q=East+Legon,+Accra' },
            { icon: Phone, text: '+233 XX XXX XXXX', href: 'tel:+233XXXXXXXXX' },
            { icon: MessageCircle, text: 'Chat on WhatsApp', href: 'https://wa.me/233XXXXXXXXX?text=Hi, I found you on The Bricks website' }
          ].map((item, i) => (
            <motion.a 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease }}
              href={item.href} 
              target="_blank" 
              rel="noopener" 
              className="group flex items-center gap-4 text-sm text-brick-muted hover:text-brick-charcoal transition-luxe"
            >
              <item.icon className="h-4 w-4 text-brick-gold" />
              <span>{item.text}</span>
            </motion.a>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-6 pt-10 text-xs text-brick-muted flex-row">
          <p>© {currentYear} The Bricks Properties. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-brick-charcoal transition-luxe">Privacy</Link>
            <Link to="/terms" className="hover:text-brick-charcoal transition-luxe">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}