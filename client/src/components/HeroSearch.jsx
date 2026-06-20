import { Search, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const accraAreas = ['East Legon', 'Airport Residential', 'Cantonments', 'Labone', 'Dzorwulu', 'Spintex', 'Trasacco Valley', 'Osu'];

export default function HeroSearch() {
  const [status, setStatus] = useState('Buy');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (status!== 'Buy') params.set('status', status.toLowerCase());
    if (location) params.set('location', location.toLowerCase().replace(' ', '-'));
    if (type) params.set('type', type.toLowerCase());
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-brick-navy px-4 py-16 md:py-32">
      <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brick-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl text-center">
        {/* Smaller heading on mobile */}
        <h1 className="text-3xl font-black tracking-tight text-white md:text-6xl lg:text-7xl">
          Find Your Next Home in <span className="text-brick-gold">Accra</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-400 md:mt-6 md:text-lg">
          Build. Rent. Sell. Manage. All with The Bricks.
        </p>

        {/* Search Bar - stacks on mobile, 4-col on desktop */}
        <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-white/10 bg-brick-card/80 p-2 shadow-2xl backdrop-blur md:mt-10 md:rounded-3xl md:p-3">
          <div className="grid gap-2 md:grid-cols-[120px_1fr_180px_140px]">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-xl bg-brick-navy px-3 py-3 text-sm font-semibold text-white outline-none md:rounded-2xl md:px-4 md:py-4 md:text-base"
            >
              <option>Buy</option>
              <option>Rent</option>
              <option>New Builds</option>
            </select>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 md:left-4 md:h-5 md:w-5" />
              <input
                list="accra-areas"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location..."
                className="w-full rounded-xl bg-brick-navy py-3 pl-10 pr-3 text-sm text-white placeholder:text-zinc-500 outline-none md:rounded-2xl md:py-4 md:pl-12 md:pr-4 md:text-base"
              />
              <datalist id="accra-areas">
                {accraAreas.map(area => <option key={area} value={area} />)}
              </datalist>
            </div>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-xl bg-brick-navy px-3 py-3 text-sm text-white outline-none md:rounded-2xl md:px-4 md:py-4 md:text-base"
            >
              <option value="">Property Type</option>
              <option>Apartment</option>
              <option>House</option>
              <option>Land</option>
              <option>Commercial</option>
            </select>

            <button
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 rounded-xl bg-brick-gold px-4 py-3 text-sm font-bold text-brick-navy transition hover:bg-brick-gold/90 md:rounded-2xl md:px-6 md:py-4 md:text-base"
            >
              <Search className="h-4 w-4 md:h-5 md:w-5" /> Search
            </button>
          </div>
        </div>

        {/* Stats - smaller text mobile */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-zinc-500 md:mt-12 md:gap-8 md:text-sm">
          <span>200+ Properties</span>
          <span className="hidden md:inline">•</span>
          <span>GREDA Licensed</span>
          <span className="hidden md:inline">•</span>
          <span>10 Years in Accra</span>
        </div>
      </div>
    </section>
  );
}
