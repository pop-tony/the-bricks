import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export default function WhatsAppCTA({ property, phone = "233XXXXXXXXX" }) {
  const message = `Hi, I'm interested in ${property.title} at ${property.location} - GHS ${property.price.toLocaleString()}`;

  return (
    <motion.a
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4, ease }}
      href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full items-center justify-between border border-brick-charcoal bg-brick-charcoal px-8 py-4 text-brick-white transition-luxe hover:bg-brick-gold hover:border-brick-gold hover:text-brick-black"
    >
      <div className="flex items-center gap-3">
        <MessageCircle className="h-4 w-4" />
        <span className="text-xs font-medium uppercase tracking-[0.15em]">Inquire via WhatsApp</span>
      </div>
      <ArrowUpRight className="h-4 w-4 opacity-0 -translate-x-2 transition-luxe group-hover:opacity-100 group-hover:translate-x-0" />
    </motion.a>
  );
}