import { Search, MapPin } from 'lucide-react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];
const accraAreas = ['East Legon', 'Airport Residential', 'Cantonments', 'Labone', 'Dzorwulu', 'Spintex', 'Trasacco Valley', 'Osu'];

export default function HeroSearch() {
  const [status, setStatus] = useState('Buy');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate();
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (status !== 'Buy') params.set('status', status.toLowerCase());
    if (location) params.set('location', location.toLowerCase().replace(' ', '-'));
    if (type) params.set('type', type.toLowerCase());
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section ref={ref} className="relative h- min-h- overflow-hidden bg-brick-charcoal">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2940" 
          alt="Luxury property" 
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brick-black via-brick-black/60 to-brick-black/20" />
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
        >
          <p className="text-brick-gold text-sm tracking-[0.3em] uppercase mb-6">Curated Accra Properties</p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-brick-white leading-[0.95] max-w-5xl">
            Find Your Next Home in <span className="italic">Accra</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-base text-brick-white/80">
            Build. Rent. Sell. Manage. All with The Bricks.
          </p>
        </motion.div>

        {/* Search Bar - Glass + 3D */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="mx-auto mt-12 w-full max-w-5xl border border-brick-white/10 bg-brick-white/5 p-2 backdrop-blur-xl shadow-luxe"
        >
          <div className="grid gap-2 md:grid-cols-[140px_1fr_200px_160px]">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-brick-white/10 px-4 py-4 text-sm font-medium text-brick-white outline-none transition-luxe focus:bg-brick-white/20"
            >
              <option className="bg-brick-charcoal">Buy</option>
              <option className="bg-brick-charcoal">Rent</option>
              <option className="bg-brick-charcoal">New Builds</option>
            </select>

            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brick-gold" />
              <input
                list="accra-areas"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location..."
                className="w-full bg-brick-white/10 py-4 pl-11 pr-4 text-sm text-brick-white placeholder:text-brick-white/50 outline-none transition-luxe focus:bg-brick-white/20"
              />
              <datalist id="accra-areas">
                {accraAreas.map(area => <option key={area} value={area} />)}
              </datalist>
            </div>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-brick-white/10 px-4 py-4 text-sm text-brick-white outline-none transition-luxe focus:bg-brick-white/20"
            >
              <option value="" className="bg-brick-charcoal">Property Type</option>
              <option className="bg-brick-charcoal">Apartment</option>
              <option className="bg-brick-charcoal">House</option>
              <option className="bg-brick-charcoal">Land</option>
              <option className="bg-brick-charcoal">Commercial</option>
            </select>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSearch}
              transition={{ duration: 0.4, ease }}
              className="flex items-center justify-center gap-2 bg-brick-gold px-6 py-4 text-sm font-medium uppercase tracking-[0.15em] text-brick-black transition-luxe hover:bg-brick-gold-light"
            >
              <Search className="h-4 w-4" /> Search
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease }}
          className="mt-12 flex flex-wrap justify-center gap-8 text-xs text-brick-white/60"
        >
          <span>200+ Properties</span>
          <span>•</span>
          <span>GREDA Licensed</span>
          <span>•</span>
          <span>10 Years in Accra</span>
        </motion.div>
      </motion.div>
    </section>
  );
}