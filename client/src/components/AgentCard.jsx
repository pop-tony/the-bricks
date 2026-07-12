import { Phone, MessageCircle } from 'lucide-react';

export default function AgentCard({ agent }) {
  const { name, photo, phone, listings, sold } = agent;
  const whatsappMsg = `Hi ${name}, I'm interested in a property from the Bricks`;

  return (
    <div className="rounded-2xl bg-brick-card p-6 text-center border border-white/5">
      <img src={photo} alt={name} className="mx-auto h-24 w-24 rounded-full object-cover" />
      <h3 className="mt-4 text-xl font-bold text-white">{name}</h3>
      <p className="text-sm text-zinc-400">{sold} Sold | {listings} Active Listings</p>
      
      <div className="mt-6 flex gap-3">
        <a 
          href={`https://wa.me/${phone}?text=${encodeURIComponent(whatsappMsg)}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-bold text-white hover:bg-green-700"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
        <a 
          href={`tel:${phone}`}
          className="flex items-center justify-center rounded-xl bg-brick-navy p-3 text-brick-gold hover:bg-brick-navy/80"
        >
          <Phone className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
