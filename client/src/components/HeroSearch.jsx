import { Search, MapPin, Activity } from 'lucide-react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useAnimationFrame } from 'framer-motion';

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

  // Scroll parallax
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Continuous live camera loop
  const liveScale = useMotionValue(1);
  const liveX = useMotionValue(0);
  const liveY = useMotionValue(0);

  useAnimationFrame((t) => {
    // Breathing zoom: 1 → 1.08 → 1 over 20s
    const scalePhase = (t / 20000) % 1;
    liveScale.set(1 + Math.sin(scalePhase * Math.PI * 2) * 0.04);

    // Slow drift: figure-8 pan
    liveX.set(Math.sin(t / 15000) * 2);
    liveY.set(Math.cos(t / 12000) * 1.5);
  });

  // Mouse tilt 3D
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [3, -3]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-3, 3]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (status!== 'Buy') params.set('status', status.toLowerCase());
    if (location) params.set('location', location.toLowerCase().replace(' ', '-'));
    if (type) params.set('type', type.toLowerCase());
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="relative h- min-h- overflow-hidden bg-brick-charcoal"
      style={{ perspective: '1200px' }}
    >
      {/* Background Image - Live Camera Drift */}
      <motion.div
        style={{
          y: y1,
          scale: liveScale,
          x: liveX,
        }}
        className="absolute inset-0"
      >
        <motion.div style={{ y: liveY }} className="h-full w-full">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2940"
            alt="Luxury property"
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-brick-black via-brick-black/60 to-brick-black/20" />
      </motion.div>

      {/* Ambient Gold Dust - Continuous Loop */}
      <motion.div style={{ y: y2 }} className="absolute inset-0 z-[5] pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-px bg-brick-gold rounded-full"
            style={{
              left: `${15 + i * 12}%`,
              top: `${25 + (i % 4) * 18}%`,
              boxShadow: '0 0 25px 3px var(--brick-gold)',
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.1, 0.9, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
          />
        ))}
      </motion.div>

      {/* Live Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute top-8 right-8 z-20 flex items-center gap-2 border border-brick-white/20 bg-brick-black/40 px-4 py-2 backdrop-blur-md"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Activity className="h-3 w-3 text-brick-gold" />
        </motion.div>
        <span className="text- font-medium uppercase tracking-[0.2em] text-brick-white/80">Discover Luxury</span>
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
          {/* Gold Shimmer Text - Continuous */}
          <motion.p
            className="text-brick-gold text-sm tracking-[0.3em] uppercase mb-6 relative inline-block"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundImage: 'linear-gradient(90deg, var(--brick-gold) 0%, #D4AF37 50%, var(--brick-gold) 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Curated Accra Properties
          </motion.p>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-brick-white leading-[0.95] max-w-5xl">
            Find Your Next Home in <span className="italic">Accra</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-base text-brick-white/80">
            Build. Rent. Sell. Manage. All with The Bricks.
          </p>
        </motion.div>

        {/* Search Bar - 3D Tilt + Breathing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease }}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="mx-auto mt-12 w-full max-w-5xl"
        >
          <motion.div
            className="border border-brick-white/10 bg-brick-white/5 p-2 backdrop-blur-xl shadow-luxe"
            animate={{
              boxShadow: [
                '0 20px 60px rgba(184, 155, 94, 0.1)',
                '0 20px 60px rgba(184, 155, 94, 0.2)',
                '0 20px 60px rgba(184, 155, 94, 0.1)',
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: 'translateZ(20px)' }}
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
                className="flex items-center justify-center gap-2 bg-brick-gold px-6 py-4 text-sm font-medium uppercase tracking-[0.15em] text-brick-black transition-luxe hover:bg-brick-gold/90"
                style={{ transform: 'translateZ(30px)' }}
              >
                <Search className="h-4 w-4" /> Search
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats - Subtle Float */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease }}
          className="mt-12 flex flex-wrap justify-center gap-8 text-xs text-brick-white/60"
        >
          {['200+ Properties', 'GREDA Licensed', '10 Years in Accra'].map((stat, i) => (
            <motion.span
              key={stat}
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
              }}
            >
              {i > 0 && <span className="mr-8">•</span>}
              {stat}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom Fade - Reduced */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-brick-offwhite to-transparent z-[15]" />
    </section>
  );
}