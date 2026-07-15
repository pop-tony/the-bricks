import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Truck } from 'lucide-react';
import { useState } from 'react';

const ease = [0.22, 1, 0.36, 1];

export default function CheckoutModal({ isOpen, onClose, items = [], onSuccess }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', region: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onSuccess();
    onClose();
  };

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            onClick={onClose}
            className="absolute inset-0 bg-brick-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease }}
            className="relative max-h- w-full max-w-3xl overflow-y-auto bg-brick-offwhite text-brick-charcoal"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-brick-subtle bg-brick-white p-8">
              <h2 className="font-serif text-3xl text-brick-black">
                {items.length === 1 ? 'Complete Purchase' : `Checkout`}
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-brick-muted transition-luxe hover:text-brick-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 p-12">
              {/* Items Summary */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6, ease }}
                className="mb-10"
              >
                <p className="text-brick-gold text-xs tracking-[0.2em] uppercase mb-4">Items</p>
                <div className="space-y-4 border-b border-brick-subtle pb-8">
                  {items.map((item, idx) => (
                    <div key={`${item.id}-${item.size}-${item.color}-${idx}`} className="flex gap-4">
                      <img src={item.image} alt={item.name} className="h-20 w-20 object-cover" />
                      <div className="flex-1">
                        <p className="font-serif text-lg text-brick-black">{item.name}</p>
                        <p className="text-xs text-brick-muted mt-1">
                          {item.size && `Size: ${item.size} `}{item.color && `• Color: ${item.color}`}
                        </p>
                        <p className="text-xs text-brick-muted">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-serif text-lg">₵{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Shipping Info */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease }}
                className="mb-10"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-px w-8 bg-brick-gold" />
                  <h3 className="font-serif text-xl text-brick-black">Shipping Details</h3>
                </div>
                <div className="grid gap-4 grid-cols-2">
                  {['name','email','phone','city','address','region'].map((field, i) => (
                    <motion.input
                      key={field}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.05, duration: 0.5, ease }}
                      type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                      name={field}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace('name','Full Name').replace('address','Street Address')}
                      required
                      value={form[field]}
                      onChange={handleChange}
                      className={`w-full border-b border-brick-subtle bg-transparent px-0 py-4 text-sm outline-none transition-luxe focus:border-brick-gold ${(field === 'address' || field === 'region') ? 'md:col-span-2' : ''}`}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Order Summary */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease }}
                className="mb-8 bg-brick-card p-6"
              >
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-brick-muted">
                    <span>Subtotal</span>
                    <span className="text-brick-charcoal">₵{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-brick-muted">
                    <span>Shipping</span>
                    <span className="text-brick-charcoal">{shipping === 0 ? 'Complimentary' : `₵${shipping}`}</span>
                  </div>
                  <div className="border-t border-brick-subtle pt-3">
                    <div className="flex justify-between items-baseline">
                      <span className="font-serif text-lg">Total</span>
                      <span className="font-serif text-2xl text-brick-black">₵{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                whileHover={{ y: -2 }}
                type="submit"
                disabled={isProcessing}
                transition={{ duration: 0.4, ease }}
                className="w-full bg-brick-charcoal py-5 text-sm font-medium uppercase tracking-[0.2em] text-brick-white shadow-luxe transition-luxe hover:bg-brick-gold hover:text-brick-black disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}