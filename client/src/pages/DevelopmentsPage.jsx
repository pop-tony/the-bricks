import PropertyCard from '../components/PropertyCard';
import { properties } from '../data/properties';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export default function DevelopmentsPage() {
  const newBuilds = properties.filter(p => p.status === 'New Build');

  return (
    <div className="min-h-screen bg-brick-white pt-32">
      <div className="mx-auto max-w-7xl px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-brick-gold text-xs tracking-[0.3em] uppercase mb-4">The Bricks Portfolio</p>
          <h1 className="font-serif text-5xl text-6xl text-brick-black leading-[0.95]">
            New Developments
          </h1>
          <p className="mt-6 max-w-2xl text-base text-brick-muted">
            Buildings conceived, designed, and constructed by The Bricks Properties across Accra.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="mt-16 grid gap-8 grid-cols-3"
        >
          {newBuilds.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * i, ease }}
            >
              <PropertyCard property={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}