import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServiceCard({ title, desc, icon: Icon, link }) {
  return (
    <Link 
      to={link}
      className="group rounded-2xl bg-brick-card p-8 border border-white/5 transition hover:border-brick-gold/50"
    >
      <Icon className="h-10 w-10 text-brick-gold" />
      <h3 className="mt-4 text-xl font-bold text-white">{title}</h3>
      <p className="mt-2 text-zinc-400">{desc}</p>
      <ArrowRight className="mt-4 h-5 w-5 text-brick-gold transition group-hover:translate-x-2" />
    </Link>
  );
}
