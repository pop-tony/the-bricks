import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Bed, Bath, Move, MapPin, Check, ChevronLeft, Calendar, ChevronRight, Share2, Heart, Calculator } from 'lucide-react';
import { properties } from '../data/properties';
import WhatsAppCTA from '../components/WhatsAppCTA';
import ScheduleViewing from '../components/ScheduleViewing';
import AgentCard from '../components/AgentCard';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export default function PropertyDetail() {
  const { id } = useParams();
  const property = properties.find(p => p.id === parseInt(id));
  const [currentImage, setCurrentImage] = useState(0);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showMortgage, setShowMortgage] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (!property) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brick-white pt-24">
        <div className="text-center">
          <h1 className="font-serif text-5xl text-brick-black">Property Not Found</h1>
          <Link to="/properties" className="mt-6 inline-block text-sm font-medium uppercase tracking-[0.15em] text-brick-gold hover:underline">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const features = ['Title Verified', '24/7 Security', 'Backup Generator', 'Borehole Water', 'Fitted Kitchen', 'AC in All Rooms', 'Parking Space', 'Garden'];

  return (
    <div className="min-h-screen bg-brick-white pt-24">
      <div className="mx-auto max-w-7xl px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-3 text-xs text-brick-muted">
          <Link to="/" className="hover:text-brick-charcoal transition-luxe">Home</Link>
          <span>/</span>
          <Link to="/properties" className="hover:text-brick-charcoal transition-luxe">Properties</Link>
          <span>/</span>
          <span className="text-brick-charcoal">{property.title}</span>
        </div>

        <div className="grid gap-16 lg:grid-cols-3">
          {/* Left: Gallery + Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative">
              <div className="aspect-[16/10] overflow-hidden bg-brick-card">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage}
                    src={property.images[currentImage]}
                    alt={property.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {property.images.length > 1 && (
                <>
                  <button onClick={() => setCurrentImage((p) => (p - 1 + property.images.length) % property.images.length)} className="absolute left-6 top-1/2 -translate-y-1/2 border border-brick-white/30 bg-brick-white/10 p-3 text-brick-white backdrop-blur-md transition-luxe hover:bg-brick-white hover:text-brick-black">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button onClick={() => setCurrentImage((p) => (p + 1) % property.images.length)} className="absolute right-6 top-1/2 -translate-y-1/2 border border-brick-white/30 bg-brick-white/10 p-3 text-brick-white backdrop-blur-md transition-luxe hover:bg-brick-white hover:text-brick-black">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              <div className="absolute right-6 top-6 flex gap-3">
                <button onClick={() => setIsSaved(!isSaved)} className="border border-brick-white/30 bg-brick-white/10 p-3 text-brick-white backdrop-blur-md transition-luxe hover:bg-brick-white hover:text-brick-black">
                  <Heart className={`h-4 w-4 ${isSaved? 'fill-brick-gold text-brick-gold' : ''}`} />
                </button>
                <button className="border border-brick-white/30 bg-brick-white/10 p-3 text-brick-white backdrop-blur-md transition-luxe hover:bg-brick-white hover:text-brick-black">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>

              <div className="absolute left-6 top-6 flex flex-col gap-2">
                <span className="text- font-medium uppercase tracking-[0.2em] text-brick-white">For {property.status}</span>
                {property.verified && <span className="text- font-medium uppercase tracking-[0.2em] text-brick-gold">Title Verified</span>}
              </div>
            </div>

            {/* Thumbnails */}
            {property.images.length > 1 && (
              <div className="mt-4 grid grid-cols-6 gap-3">
                {property.images.map((img, idx) => (
                  <button key={idx} onClick={() => setCurrentImage(idx)} className={`aspect-video overflow-hidden ${currentImage === idx? 'ring-2 ring-brick-gold' : 'opacity-60 hover:opacity-100 transition-luxe'}`}>
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Title + Price */}
            <div className="mt-12 border-b border-brick-subtle pb-8">
              <h1 className="font-serif text-4xl md:text-5xl text-brick-black">{property.title}</h1>
              <p className="mt-3 flex items-center gap-2 text-sm text-brick-muted">
                <MapPin className="h-4 w-4" /> {property.location}, Accra
              </p>
              <p className="mt-6 font-serif text-4xl text-brick-black">
                GHS {property.price.toLocaleString()}
                {property.type === 'Rent' && <span className="text-lg font-sans font-normal text-brick-muted">/month</span>}
              </p>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-3 gap-8 border-b border-brick-subtle py-8">
              {[{ icon: Bed, label: 'Bedrooms', value: property.beds }, { icon: Bath, label: 'Bathrooms', value: property.baths }, { icon: Move, label: 'Square Meters', value: property.size }].map(item => (
                <div key={item.label} className="text-center">
                  <item.icon className="mx-auto h-5 w-5 text-brick-gold" />
                  <p className="font-serif mt-3 text-2xl text-brick-black">{item.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-brick-muted">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="border-b border-brick-subtle py-12">
              <p className="text-brick-gold text-xs tracking-[0.2em] uppercase mb-4">Description</p>
              <p className="leading-relaxed text-brick-charcoal">
                Experience modern living in this exquisite {property.beds} bedroom {property.category.toLowerCase()} located in the heart of {property.location}.
                This property features premium finishes, spacious living areas, and is situated in a secure gated community with 24/7 security,
                backup power, and excellent road network. Perfect for families or investors looking for prime Accra real estate.
              </p>
            </div>

            {/* Features */}
            <div className="border-b border-brick-subtle py-12">
              <p className="text-brick-gold text-xs tracking-[0.2em] uppercase mb-6">Features & Amenities</p>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {features.map(feature => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-brick-charcoal">
                    <div className="h-px w-4 bg-brick-gold" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="py-12">
              <p className="text-brick-gold text-xs tracking-[0.2em] uppercase mb-6">Location</p>
              <div className="aspect-video w-full overflow-hidden">
                <iframe src={`https://maps.google.com/maps?q=${property.location},Accra,Ghana&t=&z=13&ie=UTF8&iwloc=&output=embed`} className="h-full w-full grayscale" loading="lazy"></iframe>
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-8 lg:sticky lg:top-32 lg:h-fit">
            <AgentCard agent={{ id: 1, name: 'Kwame Asante', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974', phone: '233241234567', listings: 24, sold: 156 }} />

            <div className="border border-brick-subtle bg-brick-white p-8">
              <h3 className="font-serif text-xl text-brick-black">Interested in this property?</h3>
              <div className="mt-6 space-y-3">
                <WhatsAppCTA property={property} phone="233241234567" />
                <button onClick={() => setShowSchedule(true)} className="flex w-full items-center justify-center gap-2 border border-brick-charcoal bg-brick-white py-4 text-xs font-medium uppercase tracking-[0.15em] text-brick-charcoal transition-luxe hover:bg-brick-charcoal hover:text-brick-white">
                  <Calendar className="h-4 w-4" /> Schedule Viewing
                </button>
                <button onClick={() => setShowMortgage(!showMortgage)} className="flex w-full items-center justify-center gap-2 bg-brick-card py-4 text-xs font-medium uppercase tracking-[0.15em] text-brick-charcoal transition-luxe hover:bg-brick-subtle">
                  <Calculator className="h-4 w-4" /> Mortgage Calculator
                </button>
              </div>
            </div>

            {showMortgage && <MortgageCalculator price={property.price} />}
          </div>
        </div>
      </div>

      <ScheduleViewing property={property} isOpen={showSchedule} onClose={() => setShowSchedule(false)} />
    </div>
  );
}

function MortgageCalculator({ price }) {
  const [downPayment, setDownPayment] = useState(price * 0.2);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(18);

  const loanAmount = price - downPayment;
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

  return (
    <div className="border border-brick-subtle bg-brick-white p-8">
      <p className="text-brick-gold text-xs tracking-[0.2em] uppercase mb-4">Mortgage Calculator</p>
      <div className="space-y-5">
        {[{ label: 'Down Payment GHS', value: downPayment, set: setDownPayment }, { label: 'Loan Term (Years)', value: years, set: setYears }, { label: 'Interest Rate %', value: rate, set: setRate }].map(field => (
          <div key={field.label}>
            <label className="text-xs text-brick-muted">{field.label}</label>
            <input type="number" value={field.value} onChange={(e) => field.set(Number(e.target.value))} className="mt-2 w-full border-b border-brick-subtle bg-transparent py-3 text-sm text-brick-charcoal outline-none transition-luxe focus:border-brick-gold" />
          </div>
        ))}
        <div className="border-t border-brick-subtle pt-5">
          <p className="text-xs text-brick-muted">Estimated Monthly Payment</p>
          <p className="font-serif text-3xl text-brick-black mt-1">GHS {monthlyPayment.toFixed(0).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}