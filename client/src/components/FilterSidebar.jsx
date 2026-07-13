import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export default function FilterSidebar({ filters, setFilters, isOpen, onClose }) {
  const locations = ['East Legon', 'Cantonments', 'Airport Residential', 'Labone', 'Dzorwulu', 'Spintex'];
  const types = ['Apartment', 'House', 'Land', 'Commercial'];
  
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-brick-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>
      
      <aside className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-brick-white transition-transform duration-500 ease-luxe lg:sticky lg:top-0 lg:h-screen lg:w-80 lg:translate-x-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-brick-subtle p-8 lg:hidden">
            <h2 className="font-serif text-2xl text-brick-black">Filters</h2>
            <button onClick={onClose} className="text-brick-muted hover:text-brick-black"><X className="h-6 w-6" /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-10">
            <FilterSection title="Status">
              <div className="space-y-3">
                {['Sale', 'Rent', 'New Build'].map(status => (
                  <label key={status} className="group flex items-center gap-3 cursor-pointer">
                    <input 
                      type="radio" 
                      name="status" 
                      checked={filters.status === status}
                      onChange={() => setFilters({...filters, status})}
                      className="h-4 w-4 appearance-none border border-brick-subtle rounded-full checked:border-brick-gold checked:bg-brick-gold transition-luxe"
                    />
                    <span className="text-sm text-brick-muted group-hover:text-brick-charcoal transition-luxe">{status}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Price Range">
              <div className="flex gap-3">
                <input type="number" placeholder="Min GHS" className="w-full border-b border-brick-subtle bg-transparent py-3 text-sm outline-none focus:border-brick-gold transition-luxe" />
                <input type="number" placeholder="Max GHS" className="w-full border-b border-brick-subtle bg-transparent py-3 text-sm outline-none focus:border-brick-gold transition-luxe" />
              </div>
            </FilterSection>

            <FilterSection title="Location">
              <select className="w-full border-b border-brick-subtle bg-transparent py-3 text-sm outline-none focus:border-brick-gold transition-luxe appearance-none">
                <option>Select Area</option>
                {locations.map(loc => <option key={loc}>{loc}</option>)}
              </select>
            </FilterSection>

            <FilterSection title="Property Type">
              <div className="space-y-3">
                {types.map(type => (
                  <label key={type} className="group flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="h-4 w-4 appearance-none border border-brick-subtle checked:border-brick-gold checked:bg-brick-gold transition-luxe" />
                    <span className="text-sm text-brick-muted group-hover:text-brick-charcoal transition-luxe">{type}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Amenities">
              <div className="space-y-3">
                {['Pool', 'Generator', 'Security', 'Parking', 'Furnished'].map(a => (
                  <label key={a} className="group flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="h-4 w-4 appearance-none border border-brick-subtle checked:border-brick-gold checked:bg-brick-gold transition-luxe" />
                    <span className="text-sm text-brick-muted group-hover:text-brick-charcoal transition-luxe">{a}</span>
                  </label>
                ))}
              </div>
            </FilterSection>
          </div>
        </div>
      </aside>
    </>
  );
}

function FilterSection({ title, children }) {
  return (
    <div>
      <p className="text-brick-gold text-xs tracking-[0.2em] uppercase mb-4">{title}</p>
      {children}
    </div>
  );
}