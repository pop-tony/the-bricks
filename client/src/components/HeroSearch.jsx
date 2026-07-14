import { Search, MapPin, Activity } from 'lucide-react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useAnimationFrame } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ease = [0.22, 1, 0.36, 1];
const accraAreas = ['East Legon', 'Airport Residential', 'Cantonments', 'Labone', 'Dzorwulu', 'Spintex', 'Trasacco Valley', 'Osu'];

export default function HeroSearch() {
  const [status, setStatus] = useState('Buy');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate();
  const ref = useRef(null);
  const { isDark } = useTheme();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const liveScale = useMotionValue(1);
  const liveX = useMotionValue(0);
  const liveY = useMotionValue(0);

  useAnimationFrame((t) => {
    const scalePhase = (t / 20000) % 1;
    liveScale.set(1 + Math.sin(scalePhase * Math.PI * 2) * 0.04);
    liveX.set(Math.sin(t / 15000) * 2);
    liveY.set(Math.cos(t / 12000) * 1.5);
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [3, -3]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-3, 3]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
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
      className="relative -mt-20 flex h-screen min-h- items-center overflow-hidden bg-brick-offwhite pt-20"
      style={{ perspective: '1200px' }}
    >
      {/* Background - Theme Aware */}
      <motion.div
        style={{ y: y1, scale: liveScale, x: liveX }}
        className="absolute inset-0"
      >
        <motion.div style={{ y: liveY }} className="h-full w-full">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2940"
            alt="Luxury property"
            className={`h-full w-full object-cover transition-all duration-700 ${isDark? 'brightness-[0.6] contrast-110' : 'brightness-[0.95] contrast-100'}`}
          />
        </motion.div>

        {/* Dynamic Overlay */}
        <div className={`absolute inset-0 transition-all duration-700 ${isDark
        ? 'bg-gradient-to-t from-black via-brick-black/80 to-brick-black/60'
          : 'bg-gradient-to-t from-brick-white/90 via-brick-white/30 to-brick-white/10'
        }`} />
        <div className={`absolute inset-0 transition-all duration-700 ${isDark? 'bg-black/30' : 'bg-brick-white/20'}`} />
      </motion.div>

      {/* Gold Dust - Only visible in dark for contrast */}
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
              opacity: isDark? [0.1, 0.9, 0.1] : [0.05, 0.4, 0.05],
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className={`absolute top-24 right-5 z-20 flex items-center gap-2 border px-4 py-2 backdrop-blur-md transition-all duration-700 ${isDark? 'border-brick-white/20 bg-brick-black/40' : 'border-brick-black/10 bg-brick-white/70'}`}
      >
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          <Activity className="h-3 w-3 text-brick-gold" />
        </motion.div>
        <span className={`text- font-medium uppercase tracking-[0.2em] transition-colors duration-700 ${isDark? 'text-brick-white/80' : 'text-brick-black/70'}`}>Discover Luxury</span>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-8 text-center"
      >
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }}>
          <motion.p
            className="text-brick-gold text-sm tracking-[0.3em] uppercase mb-6 relative inline-block"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: 'linear-gradient(90deg, var(--brick-gold) 0%, #D4AF37 50%, var(--brick-gold) 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Curated Accra Properties
          </motion.p>

          <h1 className={`font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-5xl transition-colors duration-700 ${isDark? 'text-brick-white' : 'text-brick-black'}`}>
            Find Your Next Home in <span className="italic">Accra</span>
          </h1>
          <p className={`mx-auto mt-8 max-w-2xl text-base transition-colors duration-700 ${isDark? 'text-brick-white/80' : 'text-brick-black/70'}`}>
            Build. Rent. Sell. Manage. All with The Bricks.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease }}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="mx-auto mt-12 w-full max-w-5xl"
        >
          <motion.div
            className={`border p-2 backdrop-blur-xl shadow-luxe transition-all duration-700 ${isDark? 'border-brick-white/10 bg-brick-white/5' : 'border-brick-black/10 bg-brick-white/80'}`}
            animate={{
              boxShadow: isDark
               ? ['0 20px 60px rgba(184,155,94,0.1)', '0 20px 60px rgba(184,155,94,0.2)', '0 20px 60px rgba(184,155,94,0.1)']
                : ['0 20px 60px rgba(0,0,0,0.05)', '0 20px 60px rgba(0,0,0,0.08)', '0 20px 60px rgba(0,0,0,0.05)']
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: 'translateZ(20px)' }}
          >
            <div className="grid gap-2 md:grid-cols-[140px_1fr_200px_160px]">
              <select value={status} onChange={(e) => setStatus(e.target.value)} className={`px-4 py-4 text-sm font-medium outline-none transition-all duration-700 ${isDark? 'bg-brick-white/10 text-brick-white' : 'bg-brick-black/5 text-brick-black'}`}>
                <option className={isDark? 'bg-brick-charcoal' : 'bg-white'}>Buy</option>
                <option className={isDark? 'bg-brick-charcoal' : 'bg-white'}>Rent</option>
                <option className={isDark? 'bg-brick-charcoal' : 'bg-white'}>New Builds</option>
              </select>

              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brick-gold" />
                <input list="accra-areas" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location..." className={`w-full py-4 pl-11 pr-4 text-sm outline-none transition-all duration-700 ${isDark? 'bg-brick-white/10 text-brick-white placeholder:text-brick-white/50' : 'bg-brick-black/5 text-brick-black placeholder:text-brick-black/50'}`} />
              </div>

              <select value={type} onChange={(e) => setType(e.target.value)} className={`px-4 py-4 text-sm outline-none transition-all duration-700 ${isDark? 'bg-brick-white/10 text-brick-white' : 'bg-brick-black/5 text-brick-black'}`}>
                <option value="" className={isDark? 'bg-brick-charcoal' : 'bg-white'}>Property Type</option>
                <option className={isDark? 'bg-brick-charcoal' : 'bg-white'}>Apartment</option>
                <option className={isDark? 'bg-brick-charcoal' : 'bg-white'}>House</option>
                <option className={isDark? 'bg-brick-charcoal' : 'bg-white'}>Land</option>
                <option className={isDark? 'bg-brick-charcoal' : 'bg-white'}>Commercial</option>
              </select>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSearch} transition={{ duration: 0.4, ease }} className="flex items-center justify-center gap-2 bg-brick-gold px-6 py-4 text-sm font-medium uppercase tracking-[0.15em] text-brick-black" style={{ transform: 'translateZ(30px)' }}>
                <Search className="h-4 w-4" /> Search
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4, ease }} className={`mt-10 flex flex-wrap justify-center gap-8 text- tracking-[0.15em] uppercase transition-colors duration-700 ${isDark? 'text-brick-white/60' : 'text-brick-black/60'}`}>
          {['200+ Properties', 'GREDA Licensed', '10 Years in Accra'].map((stat, i) => (
            <motion.span key={stat} animate={{ y: [0, -3, 0] }} transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}>
              {i > 0 && <span className="mr-8">•</span>}
              {stat}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom Fade - Theme Aware Small */}
      <div className={`absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t to-transparent z-[15] pointer-events-none transition-colors duration-700 ${isDark? 'from-brick-offwhite' : 'from-brick-offwhite'}`} />
    </section>
  );
}