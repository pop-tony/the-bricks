import { Link } from 'react-router-dom';
import { MessageCircle, Mail, MapPin, Phone } from 'lucide-react';
import { FaTwitter, FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    explore: [
      { name: 'Buy Property', path: '/properties?status=sale' },
      { name: 'Rent Property', path: '/properties?status=rent' },
      { name: 'New Developments', path: '/properties?status=new build' },
      { name: 'Sell with Us', path: '/sell' },
      { name: 'Property Management', path: '/manage' },
    ],
    company: [
      { name: 'About The Bricks', path: '/about' },
      { name: 'Our Agents', path: '/agents' },
      { name: 'Careers', path: '/careers' },
      { name: 'Blog', path: '/blog' },
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
    <footer className="border-t border-white/5 bg-brick-navy">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-3xl font-black text-white">
              The<span className="text-brick-gold">Bricks</span>
            </Link>
            <p className="mt-4 max-w-sm text-zinc-400">
              Building, renting, selling & managing modern properties across Accra. 
              Your trusted real estate partner since 2015.
            </p>
            
            {/* Trust Badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brick-card px-4 py-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <span className="text-sm font-semibold text-white">GREDA Licensed</span>
            </div>

            {/* Socials */}
            <div className="mt-6 flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener" className="text-zinc-400 hover:text-brick-gold">
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener" className="text-zinc-400 hover:text-brick-gold">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener" className="text-zinc-400 hover:text-brick-gold">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener" className="text-zinc-400 hover:text-brick-gold">
                <FaLinkedinIn className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Explore</h3>
            <ul className="space-y-3">
              {links.explore.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-zinc-400 transition hover:text-brick-gold">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Company</h3>
            <ul className="space-y-3">
              {links.company.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-zinc-400 transition hover:text-brick-gold">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Top Areas</h3>
            <ul className="space-y-3">
              {links.areas.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-zinc-400 transition hover:text-brick-gold">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Bar */}
        <div className="mt-12 grid gap-6 border-y border-white/5 py-8 md:grid-cols-3">
          <a href="https://maps.google.com/?q=East+Legon,+Accra" target="_blank" rel="noopener" className="flex items-center gap-3 text-zinc-400 hover:text-brick-gold">
            <MapPin className="h-5 w-5 flex-shrink-0" />
            <span>East Legon, Accra, Ghana</span>
          </a>
          <a href="tel:+233XXXXXXXXX" className="flex items-center gap-3 text-zinc-400 hover:text-brick-gold">
            <Phone className="h-5 w-5 flex-shrink-0" />
            <span>+233 XX XXX XXXX</span>
          </a>
          <a href="https://wa.me/233XXXXXXXXX?text=Hi, I found you on The Bricks website" target="_blank" rel="noopener" className="flex items-center gap-3 text-zinc-400 hover:text-green-500">
            <MessageCircle className="h-5 w-5 flex-shrink-0" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-sm text-zinc-500 md:flex-row">
          <p>© {currentYear} The Bricks Properties. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-brick-gold">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brick-gold">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
