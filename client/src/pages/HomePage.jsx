import HeroSearch from '../components/HeroSearch';
import PropertyCard from '../components/PropertyCard';
import ServiceCard from '../components/ServiceCard';
import TrustBar from '../components/TrustBar';
import { Building2, Key, Hammer, ClipboardList } from 'lucide-react';
import { properties } from '../data/properties';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

const services = [
  { icon: Hammer, title: 'Build', desc: 'Modern developments across Accra', link: '/developments' },
  { icon: Key, title: 'Rent', desc: 'Short & long term rentals', link: '/rent' },
  { icon: Building2, title: 'Sell', desc: 'List your property with us', link: '/sell' },
  { icon: ClipboardList, title: 'Manage', desc: 'For landlords & diaspora', link: '/manage' },
];

export default function HomePage() {
  const featured = properties.slice(0, 6);

  return (
    <div className="min-h-screen bg-brick-white">
      <HeroSearch />
      
      <TrustBar />

      {/* Featured Properties */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="mb-16 flex items-end justify-between border-b border-brick-subtle pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="text-brick-gold text-xs tracking-[0.3em] uppercase mb-4">Curated Selection</p>
            <h2 className="font-serif text-4xl md:text-5xl text-brick-black">Featured Listings</h2>
            <p className="mt-4 text-brick-muted">Handpicked properties in Accra</p>
          </motion.div>
          <Link 
            to="/properties" 
            className="group flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-brick-charcoal transition-luxe hover:text-brick-gold"
          >
            View All
            <span className="h-px w-8 bg-brick-gold transition-luxe group-hover:w-12" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
            >
              <PropertyCard property={p} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-brick-offwhite py-24">
        <div className="mx-auto max-w-7xl px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="mb-16 text-center"
          >
            <p className="text-brick-gold text-xs tracking-[0.3em] uppercase mb-4">Services</p>
            <h2 className="font-serif text-4xl md:text-5xl text-brick-black">What We Do</h2>
          </motion.div>
          <div className="divide-y divide-brick-subtle">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
              >
                <ServiceCard {...s} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}