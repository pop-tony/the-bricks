import { X } from 'lucide-react';

export default function FilterSidebar({ filters, setFilters, isOpen, onClose }) {
  const locations = ['East Legon', 'Cantonments', 'Airport Residential', 'Labone', 'Dzorwulu', 'Spintex'];
  const types = ['Apartment', 'House', 'Land', 'Commercial'];
  
  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-80 bg-brick-card p-6 transition-transform lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between lg:hidden">
        <h2 className="text-xl font-bold text-white">Filters</h2>
        <button onClick={onClose}><X className="h-6 w-6 text-white" /></button>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <h3 className="mb-3 font-bold text-white">Status</h3>
          <div className="space-y-2">
            {['Sale', 'Rent', 'New Build'].map(status => (
              <label key={status} className="flex items-center gap-2 text-zinc-300">
                <input 
                  type="radio" 
                  name="status" 
                  checked={filters.status === status}
                  onChange={() => setFilters({...filters, status})}
                  className="accent-brick-gold"
                />
                {status}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-bold text-white">Price Range GHS</h3>
          <div className="flex gap-2">
            <input type="number" placeholder="Min" className="w-full rounded-lg bg-brick-navy p-2 text-white" />
            <input type="number" placeholder="Max" className="w-full rounded-lg bg-brick-navy p-2 text-white" />
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-bold text-white">Location</h3>
          <select className="w-full rounded-lg bg-brick-navy p-3 text-white">
            {locations.map(loc => <option key={loc}>{loc}</option>)}
          </select>
        </div>

        <div>
          <h3 className="mb-3 font-bold text-white">Property Type</h3>
          <div className="space-y-2">
            {types.map(type => (
              <label key={type} className="flex items-center gap-2 text-zinc-300">
                <input type="checkbox" className="accent-brick-gold" />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-bold text-white">Amenities</h3>
          <div className="space-y-2">
            {['Pool', 'Generator', 'Security', 'Parking', 'Furnished'].map(a => (
              <label key={a} className="flex items-center gap-2 text-zinc-300">
                <input type="checkbox" className="accent-brick-gold" />
                {a}
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
