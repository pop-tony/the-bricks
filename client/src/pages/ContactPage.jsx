import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brick-white pt-32">
      <div className="mx-auto max-w-7xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
        >
          <p className="text-brick-gold text-xs tracking-[0.3em] uppercase mb-6">Get in Touch</p>
          <h1 className="font-serif text-5xl md:text-7xl text-brick-black">Contact Us</h1>
        </motion.div>
        
        <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="space-y-10"
          >
            {[
              { icon: MapPin, label: 'Head Office', value: 'East Legon, Accra, Ghana', href: 'https://maps.google.com/?q=East+Legon,+Accra' },
              { icon: Phone, label: 'Phone', value: '+233 XX XXX XXXX', href: 'tel:+233XXXXXXXXX' },
              { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: 'https://wa.me/233XXXXXXXXX' },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease }}
                className="group flex gap-6 border-b border-brick-subtle pb-10 transition-luxe hover:border-brick-gold"
              >
                <item.icon className="h-5 w-5 flex-shrink-0 text-brick-gold mt-1" />
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-brick-muted mb-2">{item.label}</p>
                  <p className="text-brick-charcoal transition-luxe group-hover:text-brick-gold">{item.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            whileHover={{ y: -4 }}
            className="bg-brick-card p-10 shadow-luxe transition-luxe"
          >
            <div className="space-y-6">
              {['Name', 'Email', 'Message'].map((field, i) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease }}
                >
                  {field === 'Message' ? (
                    <textarea 
                      placeholder={field} 
                      rows={5} 
                      className="w-full border-b border-brick-subtle bg-transparent py-3 text-sm text-brick-charcoal placeholder:text-brick-muted outline-none transition-luxe focus:border-brick-gold resize-none" 
                    />
                  ) : (
                    <input 
                      type={field === 'Email' ? 'email' : 'text'}
                      placeholder={field} 
                      className="w-full border-b border-brick-subtle bg-transparent py-3 text-sm text-brick-charcoal placeholder:text-brick-muted outline-none transition-luxe focus:border-brick-gold" 
                    />
                  )}
                </motion.div>
              ))}
              
              <motion.button
                whileTap={{ scale: 0.98 }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.4, ease }}
                className="w-full bg-brick-charcoal py-4 text-xs font-medium uppercase tracking-[0.2em] text-brick-white transition-luxe hover:bg-brick-gold hover:text-brick-black"
              >
                Send Message
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
}