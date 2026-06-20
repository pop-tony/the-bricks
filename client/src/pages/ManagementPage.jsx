import { Shield, Wrench, FileText, Users } from 'lucide-react';

export default function ManagementPage() {
  const services = [
    { icon: Users, title: 'Tenant Screening', desc: 'We find & vet quality tenants' },
    { icon: FileText, title: 'Rent Collection', desc: 'Monthly rent straight to your account' },
    { icon: Wrench, title: 'Maintenance', desc: '24/7 repair coordination' },
    { icon: Shield, title: 'Property Inspections', desc: 'Quarterly reports with photos' },
  ];

  return (
    <div className="min-h-screen bg-brick-navy pt-24">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-black text-white md:text-5xl">Property Management</h1>
          <p className="mt-4 text-lg text-zinc-400">
            For landlords in Ghana & diaspora. We handle everything while you earn passive income.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map(s => (
            <div key={s.title} className="rounded-2xl border border-white/5 bg-brick-card p-8">
              <s.icon className="h-10 w-10 text-brick-gold" />
              <h3 className="mt-4 text-xl font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-zinc-400">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-white/5 bg-brick-card p-8 text-center">
          <h2 className="text-2xl font-bold text-white">Management Fee: 10% of monthly rent</h2>
          <p className="mt-2 text-zinc-400">No setup fees. Cancel anytime.</p>
          <button className="mt-6 rounded-xl bg-brick-gold px-8 py-4 font-bold text-brick-navy">
            Onboard My Property
          </button>
        </div>
      </div>
    </div>
  );
}
