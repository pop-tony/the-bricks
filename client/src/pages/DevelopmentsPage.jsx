import PropertyCard from '../components/PropertyCard';
import { properties } from '../data/properties';

export default function DevelopmentsPage() {
  const newBuilds = properties.filter(p => p.status === 'New Build');

  return (
    <div className="min-h-screen bg-brick-navy pt-24">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-4xl font-black text-white md:text-5xl">New Developments</h1>
        <p className="mt-2 text-zinc-400">Buildings constructed by The Bricks Properties</p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {newBuilds.map(p => <PropertyCard key={p.id} property={p} />)}
        </div>
      </div>
    </div>
  );
}