import { Bed, Bath, MapPin, Bookmark, Move, ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';

const ease = [0.22, 1, 0.36, 1];

export default function PropertyCard({ property }) {
  const [isSaved, setIsSaved] = useState(false);
  const { id, title, price, location, beds, baths, size, images, type, status, verified, installment } = property;

  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease }}
      className="perspective-1000 group"
    >
      <div
        style={{ transform: "translateZ(40px)" }}
        className="bg-brick-white border border-brick-subtle shadow-luxe transition-luxe hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)]"
      >
        <Link to={`/properties/${id}`}>
          <div className="relative aspect-[4/3] overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease }}
              src={images[0]}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brick-black/50 via-transparent to-transparent" />

            {/* Badges - editorial, not pills */}
            <div className="absolute left-6 top-6 flex flex-col gap-2">
              <span className="text- font-medium uppercase tracking-[0.2em] text-brick-white">
                {status}
              </span>
              {verified && (
                <span className="text- font-medium uppercase tracking-[0.2em] text-brick-gold">
                  Titled
                </span>
              )}
              {installment && (
                <span className="hidden md:block text- font-medium uppercase tracking-[0.2em] text-brick-white/80">
                  Installment Available
                </span>
              )}
            </div>

            <button
              onClick={(e) => { e.preventDefault(); setIsSaved(!isSaved); }}
              className="absolute right-6 top-6 p-2 text-brick-white/80 transition-luxe hover:text-brick-gold"
              style={{ transform: "translateZ(20px)" }}
            >
              <Bookmark className={`h-4 w-4 ${isSaved? 'fill-brick-gold text-brick-gold' : ''}`} />
            </button>

            {/* Price - Playfair */}
            <div className="absolute bottom-6 left-6" style={{ transform: "translateZ(30px)" }}>
              <p className="font-serif text-3xl text-brick-white">
                GHS {price.toLocaleString()}
                {type === 'Rent' && <span className="text-base font-sans font-normal text-brick-white/70">/mo</span>}
              </p>
            </div>
          </div>
        </Link>

        <div className="p-8">
          <Link to={`/properties/${id}`}>
            <h3 className="font-serif text-xl text-brick-charcoal transition-luxe group-hover:text-brick-gold">
              {title}
            </h3>
          </Link>
          <p className="mt-2 flex items-center gap-2 text-xs text-brick-muted">
            <MapPin className="h-3 w-3" /> {location}
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-brick-subtle pt-6">
            <div className="flex items-center gap-6 text-xs text-brick-muted">
              <span className="flex items-center gap-1.5"><Bed className="h-3.5 w-3.5" /> {beds}</span>
              <span className="flex items-center gap-1.5"><Bath className="h-3.5 w-3.5" /> {baths}</span>
              <span className="flex items-center gap-1.5"><Move className="h-3.5 w-3.5" /> {size}m²</span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-brick-gold opacity-0 transition-luxe group-hover:opacity-100" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}