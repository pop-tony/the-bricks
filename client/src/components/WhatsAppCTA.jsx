import { MessageCircle } from 'lucide-react';

export default function WhatsAppCTA({ property, phone = "233XXXXXXXXX" }) {
  const message = `Hi, I'm interested in ${property.title} at ${property.location} - GHS ${property.price.toLocaleString()}`;
  
  return (
    <a
      href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-4 text-lg font-bold text-white transition hover:bg-green-700"
    >
      <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
    </a>
  );
}
