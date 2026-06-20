import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brick-navy pt-24">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h1 className="text-4xl font-black text-white md:text-5xl">Contact Us</h1>
        
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="flex gap-4">
              <MapPin className="h-6 w-6 flex-shrink-0 text-brick-gold" />
              <div>
                <h3 className="font-bold text-white">Head Office</h3>
                <p className="text-zinc-400">East Legon, Accra, Ghana</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="h-6 w-6 flex-shrink-0 text-brick-gold" />
              <div>
                <h3 className="font-bold text-white">Phone</h3>
                <p className="text-zinc-400">+233 XX XXX XXXX</p>
              </div>
            </div>
            <div className="flex gap-4">
              <MessageCircle className="h-6 w-6 flex-shrink-0 text-brick-gold" />
              <div>
                <h3 className="font-bold text-white">WhatsApp</h3>
                <a href="https://wa.me/233XXXXXXXXX" className="text-zinc-400 hover:text-green-500">Chat with us</a>
              </div>
            </div>
          </div>

          <form className="rounded-2xl border border-white/5 bg-brick-card p-8">
            <div className="space-y-4">
              <input placeholder="Name" className="w-full rounded-xl bg-brick-navy p-4 text-white outline-none" />
              <input placeholder="Email" className="w-full rounded-xl bg-brick-navy p-4 text-white outline-none" />
              <textarea placeholder="Message" rows={4} className="w-full rounded-xl bg-brick-navy p-4 text-white outline-none" />
              <button className="w-full rounded-xl bg-brick-gold py-4 font-bold text-brick-navy">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
