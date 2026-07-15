import { motion } from 'framer-motion';
import { ShieldCheck, Home, Award, ArrowUpRight } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

export default function AboutPage() {
  const stats = [
    { icon: ShieldCheck, label: 'GREDA Licensed', value: 'Since 2015' },
    { icon: Home, label: 'Properties Sold', value: '200+' },
    { icon: Award, label: 'Years in Accra', value: '10+' },
  ];

  return (
    <div className="min-h-screen bg-brick-white pt-32">
      <div className="mx-auto max-w-7xl px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
        >
          <p className="text-brick-gold text-xs tracking-[0.3em] uppercase mb-6">Est. 2015</p>
          <h1 className="font-serif text-5xl text-7xl text-8xl text-brick-black leading-[0.95] max-w-4xl">
            Building trust in <span className="italic">Accra real estate</span>
          </h1>
        </motion.div>

        {/* Image + Story */}
        <div className="mt-20 grid gap-16 gap-24 items-start grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="aspect-[4/5] overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2940" 
              alt="The Bricks office" 
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="pt-12"
          >
            <div className="space-y-6 text-base leading-relaxed text-brick-muted">
              <p>
                The Bricks Properties is a GREDA-licensed real estate firm based in East Legon, Accra. 
                Founded in 2015, we build, rent, sell, and manage modern residential and commercial properties across Ghana.
              </p>
              <p>
                Our mission is to make property ownership transparent and accessible for Ghanaians at home and in the diaspora. 
                Every property has verified title. Every transaction is documented. No surprises.
              </p>
            </div>

            <div className="mt-12 border-t border-brick-subtle pt-12">
              <p className="text-brick-gold text-xs tracking-[0.2em] uppercase mb-8">Why Choose Us</p>
              <div className="space-y-5">
                {[
                  'All properties have verified titles',
                  'Flexible payment plans available',
                  '10+ years serving Accra market',
                  '200+ properties sold & managed'
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease }}
                    className="flex items-center gap-4"
                  >
                    <div className="h-px w-8 bg-brick-gold" />
                    <span className="text-sm text-brick-charcoal">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="mt-32 border-y border-brick-subtle py-16"
        >
          <div className="grid gap-12 gap-0 grid-cols-3">
            {stats.map((stat, i) => (
              <div key={i} className={`flex items-center gap-6 ${i !== 0 ? 'md:border-l md:border-brick-subtle md:pl-12' : ''}`}>
                <stat.icon className="h-4 w-4 flex-shrink-0 text-brick-gold" />
                <div>
                  <p className="font-serif text-3xl text-brick-black">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-brick-muted">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}