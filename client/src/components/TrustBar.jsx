import { ShieldCheck, Home, Award } from 'lucide-react';

export default function TrustBar() {
  const stats = [
    { icon: ShieldCheck, label: 'GREDA Licensed', value: 'Since 2015' },
    { icon: Home, label: 'Properties', value: '200+' },
    { icon: Award, label: 'Years in Accra', value: '10+' },
  ];

  return (
    <section className="border-y border-white/5 bg-brick-card/50 py-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center justify-center gap-4">
            <stat.icon className="h-8 w-8 text-brick-gold" />
            <div>
              <p className="text-2xl font-black text-white">{stat.value}</p>
              <p className="text-sm text-zinc-400">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
