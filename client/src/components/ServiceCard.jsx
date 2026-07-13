import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export default function ServiceCard({ title, desc, icon: Icon, link }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease }}
    >
      <Link
        to={link}
        className="group block border-b border-brick-subtle py-10 transition-luxe hover:border-brick-gold"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Icon className="h-6 w-6 text-brick-gold mb-6" />
            <h3 className="font-serif text-2xl text-brick-charcoal transition-luxe group-hover:text-brick-gold">
              {title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-brick-muted max-w-md">{desc}</p>
          </div>
          <ArrowUpRight className="h-5 w-5 text-brick-gold opacity-0 -translate-x-2 transition-luxe group-hover:opacity-100 group-hover:translate-x-0" />
        </div>
      </Link>
    </motion.div>
  );
}