import { Bed, Bath, MapPin, Bookmark, Move } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function PropertyCard({ property }) {
  const [isSaved, setIsSaved] = useState(false);
  const { id, title, price, location, beds, baths, size, images, type, status, verified, installment } = property;

  const statusColors = {
    Sale: 'bg-blue-500/90',
    Rent: 'bg-green-500/90',
    'New Build': 'bg-brick-gold/90 text-brick-navy'
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group overflow-hidden rounded-xl border border-white/5 bg-brick-card transition hover:border-brick-gold/30 md:rounded-2xl"
    >
      <Link to={`/properties/${id}`}>
        <div className="relative">
          {/* Smaller image on mobile */}
          <img
            src={images[0]}
            alt={title}
            loading="lazy"
            className="h-40 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-48 md:h-56"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badges - smaller on mobile */}
          <div className="absolute left-2 top-2 flex flex-wrap gap-1 md:left-3 md:top-3 md:gap-2">
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold text-white md:px-3 md:py-1 md:text-xs ${statusColors[status] || 'bg-zinc-700/90'}`}>
              {status}
            </span>
            {verified && (
              <span className="rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-bold text-white md:px-3 md:py-1 md:text-xs">
                Titled
              </span>
            )}
            {installment && (
              <span className="hidden rounded-full bg-purple-500/90 px-2 py-0.5 text-[10px] font-bold text-white md:inline-block md:px-3 md:py-1 md:text-xs">
                Installment
              </span>
            )}
          </div>

          <button
            onClick={(e) => { e.preventDefault(); setIsSaved(!isSaved); }}
            className="absolute right-2 top-2 rounded-full bg-black/40 p-1.5 backdrop-blur hover:bg-black/60 md:right-3 md:top-3 md:p-2"
          >
            <Bookmark className={`h-3.5 w-3.5 md:h-4 md:w-4 ${isSaved? 'fill-brick-gold text-brick-gold' : 'text-white'}`} />
          </button>

          {/* Price - smaller on mobile */}
          <p className="absolute bottom-2 left-2 text-lg font-black text-white md:bottom-3 md:left-3 md:text-2xl">
            GHS {price.toLocaleString()}
            {type === 'Rent' && <span className="text-xs font-normal text-zinc-300 md:text-sm">/mo</span>}
          </p>
        </div>
      </Link>

      {/* Content - tighter padding on mobile */}
      <div className="p-3 md:p-4">
        <Link to={`/properties/${id}`}>
          <h3 className="line-clamp-1 text-sm font-bold text-white transition group-hover:text-brick-gold md:text-lg">
            {title}
          </h3>
        </Link>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-zinc-400 md:mt-1 md:text-sm">
          <MapPin className="h-3 w-3 flex-shrink-0 md:h-4 md:w-4" /> {location}
        </p>

        {/* Specs - compact on mobile */}
        <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3 text-xs text-zinc-300 md:mt-4 md:pt-4 md:text-sm">
          <span className="flex items-center gap-1"><Bed className="h-3 w-3 md:h-4 md:w-4" /> {beds}</span>
          <span className="flex items-center gap-1"><Bath className="h-3 w-3 md:h-4 md:w-4" /> {baths}</span>
          <span className="flex items-center gap-1"><Move className="h-3 w-3 md:h-4 md:w-4" /> {size}m²</span>
        </div>
      </div>
    </motion.div>
  );
}
