import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export default function SellPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const benefits = [
    'Complimentary property valuation',
    'Professional photography & drone footage',
    'Listed across premium portals',
    'Dedicated agent from listing to closing'
  ];

  return (
    <div className="min-h-screen bg-brick-white">
      {/* Hero */}
      <section ref={ref} className="relative h- min-h- overflow-hidden bg-brick-charcoal">
        <motion.div style={{ y }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2940"
            alt="Luxury home"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brick-black/80 via-brick-black/50 to-transparent" />
        </motion.div>

        <div className="relative z-10 mx-auto grid h-full max-w-7xl grid-cols-1 items-center px-8 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
          >
            <p className="text-brick-gold text-xs tracking-[0.3em] uppercase mb-6">Sell With Confidence</p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-brick-white leading-[0.95]">
              Get the best price for your <span className="italic">Accra home</span>
            </h1>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-brick-white/80">
              From valuation to closing, we handle everything. Premium marketing, qualified buyers, seamless process.
            </p>

            <div className="mt-10 space-y-5">
              {benefits.map((b, i) => (
                <motion.div
                  key={b}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease }}
                  className="flex items-center gap-4"
                >
                  <div className="h-px w-8 bg-brick-gold" />
                  <span className="text-sm text-brick-white/90">{b}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Glass Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="border border-brick-white/10 bg-brick-white/5 p-10 backdrop-blur-xl"
          >
            <p className="text-brick-gold text-xs tracking-[0.2em] uppercase mb-2">Free Valuation</p>
            <h2 className="font-serif text-3xl text-brick-white mb-8">Request Assessment</h2>

            <div className="space-y-6">
              {['Full Name', 'Phone Number', 'Property Location'].map((placeholder, i) => (
                <motion.input
                  key={placeholder}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.05, duration: 0.5, ease }}
                  placeholder={placeholder}
                  className="w-full border-b border-brick-white/20 bg-transparent py-4 text-sm text-brick-white placeholder:text-brick-white/50 outline-none transition-luxe focus:border-brick-gold"
                />
              ))}

              <motion.select
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5, ease }}
                className="w-full border-b border-brick-white/20 bg-transparent py-4 text-sm text-brick-white/50 outline-none transition-luxe focus:border-brick-gold"
              >
                <option className="bg-brick-charcoal">Property Type</option>
                <option className="bg-brick-charcoal">Apartment</option>
                <option className="bg-brick-charcoal">House</option>
                <option className="bg-brick-charcoal">Land</option>
                <option className="bg-brick-charcoal">Commercial</option>
              </motion.select>

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.4, ease }}
                className="group mt-4 flex w-full items-center justify-between bg-brick-gold px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-brick-black transition-luxe hover:shadow-[0_20px_40px_-10px_rgba(184,155,94,0.4)]"
              >
                Request Valuation
                <ArrowRight className="h-4 w-4 -translate-x-1 transition-luxe group-hover:translate-x-0" />
              </motion.button>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
}