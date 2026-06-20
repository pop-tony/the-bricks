import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Bed, Bath, Move, MapPin, Check, ChevronLeft, Calendar, ChevronRight, Share2, Heart, Calculator } from 'lucide-react';
import { properties } from '../data/properties';
import WhatsAppCTA from '../components/WhatsAppCTA';
import ScheduleViewing from '../components/ScheduleViewing';
import AgentCard from '../components/AgentCard';
import { motion, AnimatePresence } from 'framer-motion';

const agents = [
  { id: 1, name: 'Kwame Asante', photo: '/agent1.jpg', phone: '233241234567', listings: 24, sold: 156 },
  { id: 2, name: 'Ama Osei', photo: '/agent2.jpg', phone: '233241234568', listings: 18, sold: 98 },
];

export default function PropertyDetail() {
  const { id } = useParams();
  const property = properties.find(p => p.id === parseInt(id));
  const [currentImage, setCurrentImage] = useState(0);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showMortgage, setShowMortgage] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (!property) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brick-navy pt-24">
        <div className="text-center text-white">
          <h1 className="text-4xl font-black">Property Not Found</h1>
          <Link to="/properties" className="mt-4 inline-block text-brick-gold hover:underline">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const agent = agents.find(a => a.id === property.agentId) || agents[0];

  const features = [
    'Title Verified', '24/7 Security', 'Backup Generator', 'Borehole Water',
    'Fitted Kitchen', 'AC in All Rooms', 'Parking Space', 'Garden'
  ];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % property.images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);

  return (
    <div className="min-h-screen bg-brick-navy pt-24">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-zinc-400">
          <Link to="/" className="hover:text-brick-gold">Home</Link>
          <span>/</span>
          <Link to="/properties" className="hover:text-brick-gold">Properties</Link>
          <span>/</span>
          <span className="text-white">{property.title}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left: Gallery + Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={property.images[currentImage]}
                  alt={property.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="aspect-video w-full object-cover"
                />
              </AnimatePresence>

              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur hover:bg-black/70"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur hover:bg-black/70"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Actions */}
              <div className="absolute right-4 top-4 flex gap-2">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className="rounded-full bg-black/50 p-2.5 text-white backdrop-blur hover:bg-black/70"
                >
                  <Heart className={`h-5 w-5 ${isSaved? 'fill-red-500 text-red-500' : ''}`} />
                </button>
                <button className="rounded-full bg-black/50 p-2.5 text-white backdrop-blur hover:bg-black/70">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              {/* Badges */}
              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-500/90 px-4 py-1 text-sm font-bold text-white">
                  For {property.status}
                </span>
                {property.verified && (
                  <span className="rounded-full bg-emerald-500/90 px-4 py-1 text-sm font-bold text-white">
                    Title Verified
                  </span>
                )}
                {property.installment && (
                  <span className="rounded-full bg-purple-500/90 px-4 py-1 text-sm font-bold text-white">
                    Installment Available
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {property.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2 md:grid-cols-6">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`overflow-hidden rounded-lg border-2 ${
                      currentImage === idx? 'border-brick-gold' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="aspect-video w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Title + Price */}
            <div className="mt-8">
              <h1 className="text-3xl font-black text-white md:text-4xl">{property.title}</h1>
              <p className="mt-2 flex items-center gap-2 text-lg text-zinc-400">
                <MapPin className="h-5 w-5" /> {property.location}, Accra
              </p>
              <p className="mt-4 text-4xl font-black text-brick-gold">
                GHS {property.price.toLocaleString()}
                {property.type === 'Rent' && <span className="text-xl text-zinc-400">/month</span>}
              </p>
            </div>

            {/* Specs */}
            <div className="mt-8 grid grid-cols-3 gap-4 rounded-2xl border border-white/5 bg-brick-card p-6">
              <div className="text-center">
                <Bed className="mx-auto h-6 w-6 text-brick-gold" />
                <p className="mt-2 text-2xl font-bold text-white">{property.beds}</p>
                <p className="text-sm text-zinc-400">Bedrooms</p>
              </div>
              <div className="text-center">
                <Bath className="mx-auto h-6 w-6 text-brick-gold" />
                <p className="mt-2 text-2xl font-bold text-white">{property.baths}</p>
                <p className="text-sm text-zinc-400">Bathrooms</p>
              </div>
              <div className="text-center">
                <Move className="mx-auto h-6 w-6 text-brick-gold" />
                <p className="mt-2 text-2xl font-bold text-white">{property.size}</p>
                <p className="text-sm text-zinc-400">sqm</p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white">Description</h2>
              <p className="mt-4 leading-relaxed text-zinc-300">
                Experience modern living in this exquisite {property.beds} bedroom {property.category.toLowerCase()} located in the heart of {property.location}.
                This property features premium finishes, spacious living areas, and is situated in a secure gated community with 24/7 security,
                backup power, and excellent road network. Perfect for families or investors looking for prime Accra real estate.
              </p>
            </div>

            {/* Features */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white">Features & Amenities</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                {features.map(feature => (
                  <div key={feature} className="flex items-center gap-2 text-zinc-300">
                    <Check className="h-5 w-5 flex-shrink-0 text-brick-gold" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white">Location</h2>
              <div className="mt-4 aspect-video w-full overflow-hidden rounded-2xl bg-brick-card">
                <iframe
                  src={`https://maps.google.com/maps?q=${property.location},Accra,Ghana&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  className="h-full w-full"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
            {/* Agent Card */}
            <AgentCard agent={agent} />

            {/* CTAs */}
            <div className="rounded-2xl border border-white/5 bg-brick-card p-6">
              <h3 className="text-xl font-bold text-white">Interested in this property?</h3>
              <div className="mt-4 space-y-3">
                <WhatsAppCTA property={property} phone={agent.phone} />
                <button
                  onClick={() => setShowSchedule(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-brick-gold bg-transparent px-6 py-3 font-bold text-brick-gold transition hover:bg-brick-gold/10"
                >
                  <Calendar className="h-5 w-5" /> Schedule Viewing
                </button>
                <button
                  onClick={() => setShowMortgage(!showMortgage)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brick-navy px-6 py-3 font-bold text-white hover:bg-brick-navy/80"
                >
                  <Calculator className="h-5 w-5" /> Mortgage Calculator
                </button>
              </div>
            </div>

            {/* Mortgage Calculator */}
            {showMortgage && (
              <MortgageCalculator price={property.price} />
            )}
          </div>
        </div>
      </div>

      <ScheduleViewing
        property={property}
        isOpen={showSchedule}
        onClose={() => setShowSchedule(false)}
      />
    </div>
  );
}

// Mortgage Calculator Component
function MortgageCalculator({ price }) {
  const [downPayment, setDownPayment] = useState(price * 0.2);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(18); // 18% typical Ghana rate

  const loanAmount = price - downPayment;
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

  return (
    <div className="rounded-2xl border border-white/5 bg-brick-card p-6">
      <h3 className="text-xl font-bold text-white">Mortgage Calculator</h3>
      <div className="mt-4 space-y-4">
        <div>
          <label className="text-sm text-zinc-400">Down Payment GHS</label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="mt-1 w-full rounded-lg bg-brick-navy p-3 text-white outline-none"
          />
        </div>
        <div>
          <label className="text-sm text-zinc-400">Loan Term (Years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="mt-1 w-full rounded-lg bg-brick-navy p-3 text-white outline-none"
          />
        </div>
        <div>
          <label className="text-sm text-zinc-400">Interest Rate %</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-1 w-full rounded-lg bg-brick-navy p-3 text-white outline-none"
          />
        </div>
        <div className="border-t border-white/10 pt-4">
          <p className="text-sm text-zinc-400">Estimated Monthly Payment</p>
          <p className="text-3xl font-black text-brick-gold">GHS {monthlyPayment.toFixed(0).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
