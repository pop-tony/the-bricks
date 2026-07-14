import { ShieldCheck, Home, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export default function TrustBar() {
  const stats = [
    { icon: ShieldCheck, label: 'GREDA Licensed', value: 'Since 2015' },
    { icon: Home, label: 'Properties Listed', value: '200+' },
    { icon: Award, label: 'Years in Accra', value: '10+' },
  ];

  return (
    <section className="border-y border-brick-subtle bg-brick-white py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-12 px-8 md:grid-cols-3 md:gap-0">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1, ease }}
            className={`flex items-center gap-6 ${i!== 0? 'md:border-l md:border-brick-subtle md:pl-12' : ''}`}
          >
            <stat.icon className="h-4 w-4 flex-shrink-0 text-brick-gold" />
            <div>
              <p className="font-serif text-3xl text-brick-black">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-brick-muted">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}