import HeroSearch from '../components/HeroSearch';
import PropertyCard from '../components/PropertyCard';
import { Building2, Key, Hammer, ClipboardList } from 'lucide-react';
import { properties } from '../data/properties';
import { Link } from 'react-router-dom';

const services = [
  { icon: Hammer, title: 'Build', desc: 'Modern developments across Accra', link: '/developments' },
  { icon: Key, title: 'Rent', desc: 'Short & long term rentals', link: '/rent' },
  { icon: Building2, title: 'Sell', desc: 'List your property with us', link: '/sell' },
  { icon: ClipboardList, title: 'Manage', desc: 'For landlords & diaspora', link: '/manage' },
];

export default function HomePage() {
  const featured = properties.slice(0, 6);

  return (
    <div className="min-h-screen bg-brick-navy">
      <HeroSearch />

      {/* Trust Bar */}
      <section className="border-y border-white/5 bg-brick-card/50 py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-8 px-4 text-center md:gap-16">
          <div><p className="text-3xl font-black text-white">200+</p><p className="text-sm text-zinc-400">Properties</p></div>
          <div><p className="text-3xl font-black text-white">GREDA</p><p className="text-sm text-zinc-400">Licensed</p></div>
          <div><p className="text-3xl font-black text-white">10+</p><p className="text-sm text-zinc-400">Years in Accra</p></div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black text-white md:text-4xl">Featured Listings</h2>
            <p className="mt-2 text-zinc-400">Handpicked properties in Accra</p>
          </div>
          <Link to="/properties" className="text-sm font-bold text-brick-gold hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(p => <PropertyCard key={p.id} property={p} />)}
        </div>
      </section>

      {/* Services */}
      <section className="bg-brick-card/30 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-center text-3xl font-black text-white md:text-4xl">
            What We Do
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map(s => (
              <Link
                key={s.title}
                to={s.link}
                className="group rounded-2xl border border-white/5 bg-brick-card p-8 transition hover:border-brick-gold/50"
              >
                <s.icon className="h-10 w-10 text-brick-gold" />
                <h3 className="mt-4 text-xl font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-zinc-400">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}