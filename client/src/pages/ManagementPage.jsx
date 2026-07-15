import { Shield, Wrench, FileText, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export default function ManagementPage() {
  const services = [
    { icon: Users, title: 'Tenant Screening', desc: 'We find & vet quality tenants for your property' },
    { icon: FileText, title: 'Rent Collection', desc: 'Monthly rent paid straight to your account' },
    { icon: Wrench, title: 'Maintenance', desc: '24/7 repair coordination with trusted vendors' },
    { icon: Shield, title: 'Property Inspections', desc: 'Quarterly reports with detailed photography' },
  ];

  return (
    <div className="min-h-screen bg-brick-white pt-32">
      <div className="mx-auto max-w-7xl px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-brick-gold text-xs tracking-[0.3em] uppercase mb-4">For Owners</p>
          <h1 className="font-serif text-5xl text-6xl text-brick-black leading-[0.95]">
            Property Management
          </h1>
          <p className="mt-6 text-lg text-brick-muted leading-relaxed">
            For landlords in Ghana & diaspora. We handle everything while you earn passive income.
          </p>
        </motion.div>

        <div className="mt-20 divide-y divide-brick-subtle">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="flex items-start gap-8 py-10"
            >
              <s.icon className="h-5 w-5 flex-shrink-0 text-brick-gold mt-1" />
              <div>
                <h3 className="font-serif text-2xl text-brick-charcoal">{s.title}</h3>
                <p className="mt-3 text-brick-muted">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          whileHover={{ y: -4 }}
          className="mx-auto mt-20 max-w-2xl border border-brick-subtle bg-brick-white p-12 text-center shadow-luxe transition-luxe"
        >
          <p className="text-brick-gold text-xs tracking-[0.3em] uppercase">Simple Pricing</p>
          <h2 className="font-serif mt-4 text-4xl text-brick-black">10% of monthly rent</h2>
          <p className="mt-4 text-brick-muted">No setup fees. Cancel anytime.</p>
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="mt-8 bg-brick-charcoal px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] text-brick-white transition-luxe hover:bg-brick-gold hover:text-brick-black"
          >
            Onboard My Property
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}