import { Home, DollarSign, Users, Check } from 'lucide-react';

export default function SellPage() {
  const benefits = [
    'Free property valuation',
    'Professional photography',
    'Listed on all major portals',
    'Dedicated agent support'
  ];

  return (
    <div className="min-h-screen bg-brick-navy pt-24">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-black text-white md:text-5xl">
              Sell Your Property with <span className="text-brick-gold">The Bricks</span>
            </h1>
            <p className="mt-4 text-lg text-zinc-400">
              Get the best price for your home in Accra. We handle everything from valuation to closing.
            </p>
            <ul className="mt-8 space-y-4">
              {benefits.map(b => (
                <li key={b} className="flex items-center gap-3 text-zinc-300">
                  <Check className="h-5 w-5 text-brick-gold" /> {b}
                </li>
              ))}
            </ul>
          </div>

          <form className="rounded-2xl border border-white/5 bg-brick-card p-8">
            <h2 className="text-2xl font-bold text-white">Get Free Valuation</h2>
            <div className="mt-6 space-y-4">
              <input placeholder="Full Name" className="w-full rounded-xl bg-brick-navy p-4 text-white outline-none" />
              <input placeholder="Phone Number" className="w-full rounded-xl bg-brick-navy p-4 text-white outline-none" />
              <input placeholder="Property Location" className="w-full rounded-xl bg-brick-navy p-4 text-white outline-none" />
              <select className="w-full rounded-xl bg-brick-navy p-4 text-white outline-none">
                <option>Property Type</option><option>Apartment</option><option>House</option><option>Land</option>
              </select>
              <button className="w-full rounded-xl bg-brick-gold py-4 font-bold text-brick-navy">
                Request Valuation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
