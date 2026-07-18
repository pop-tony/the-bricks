import { Check, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const LIGHT_BG = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940";
const DARK_BG = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2940";

export default function SellPage(){
  const { isDark } = useTheme();
  const benefits=[
    'Complimentary property valuation - Lakeside Estate expertise',
    'Professional photography & drone footage',
    'Listed across premium portals & diaspora networks',
    'Dedicated agent from listing to closing'
  ];

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isDark?'bg-[#06152C]':'bg-[#F8F9FB]'}`}>

      <section className="relative min-h- flex items-center overflow-hidden">
        {/* BACKGROUND IMAGES - Theme Switch */}
        <div className="absolute inset-0">
          <img src={LIGHT_BG} alt="light" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${isDark?'opacity-0':'opacity-100'}`} />
          <img src={DARK_BG} alt="dark" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${isDark?'opacity-100':'opacity-0'}`} />
          {/* Wash - light shows more image */}
          <div className={`absolute inset-0 transition-colors duration-700 ${isDark?'bg-[#06152C]/70':'bg-white/65'}`} />
          <div className={`absolute inset-0 bg-gradient-to-r transition-colors duration-700 ${isDark?'from-[#06152C] via-[#06152C]/70 to-[#06152C]/20':'from-white via-white/80 to-white/10'}`} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 py-16 md:py-20 grid lg:grid-cols-2 gap-12 w-full items-center">
          {/* LEFT */}
          <div>
            <p className="text-[#FF6A00] text- tracking-[0.3em] uppercase font-black">Sell With Confidence</p>
            <h1 className={`font-black text-4xl md:text-6xl leading-[0.9] mt-4 transition-colors duration-500 ${isDark?'text-white':'text-[#0A2342]'}`}>
              Get the best price for your <span className="text-[#FF6A00]">Accra home</span>
            </h1>
            <p className={`mt-6 leading-7 max-w-lg transition-colors duration-500 ${isDark?'text-white/70':'text-black/60'}`}>
              From valuation to closing, we handle everything. Premium marketing, qualified buyers, seamless process. GREDA Licensed since 2015.
            </p>

            <div className="mt-8 space-y-3">
              {benefits.map(b=>(
                <div key={b} className="flex gap-3">
                  <div className="h-5 w-5 bg-[#FF6A00] rounded-full flex items-center justify-center shrink-0 mt-0.5"><Check className="h-3 w-3 text-white" /></div>
                  <span className={`text-sm transition-colors duration-500 ${isDark?'text-white/80':'text-[#0A2342]/80'}`}>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - FORM */}
          <form className={`rounded- p-6 md:p-8 shadow-2xl border backdrop-blur-xl transition-all duration-500 ${isDark?'bg-[#112A4A]/80 border-white/10':'bg-white/90 border-black/5'}`}>
            <p className="text-[#FF6A00] text- font-black tracking-[0.2em] uppercase">Free Valuation</p>
            <h2 className={`font-black text-2xl mt-2 transition-colors ${isDark?'text-white':'text-[#0A2342]'}`}>Request Assessment</h2>

            <div className="mt-6 space-y-5">
              {[
                { label: 'Full Name', ph: 'Kwame Asante' },
                { label: 'Phone Number', ph: '+233 598 052 702' },
                { label: 'Property Location', ph: 'Lakeside Estate, Accra' },
              ].map(f=>(
                <div key={f.label}>
                  <label className={`text- font-black uppercase tracking-widest transition-colors ${isDark?'text-white/70':'text-[#0A2342]/70'}`}>{f.label}</label>
                  <input placeholder={f.ph} className={`mt-2 w-full h-12 border bg-transparent px-4 rounded-xl text-sm outline-none focus:border-[#FF6A00] transition-colors ${isDark?'border-white/10 text-white placeholder:text-white/30 focus:bg-white/5':'border-black/10 text-[#0A2342] placeholder:text-black/30 focus:bg-[#F8F9FB]'}`} />
                </div>
              ))}

              <div>
                <label className={`text- font-black uppercase tracking-widest transition-colors ${isDark?'text-white/70':'text-[#0A2342]/70'}`}>Property Type</label>
                <select className={`mt-2 w-full h-12 border bg-transparent px-4 rounded-xl text-sm outline-none focus:border-[#FF6A00] transition-colors ${isDark?'border-white/10 text-white bg-[#112A4A]':'border-black/10 text-[#0A2342] bg-white'}`}>
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Land - Lakeside Estate</option>
                  <option>Commercial</option>
                </select>
              </div>

              <button type="button" className="w-full bg-[#FF6A00] py-4 rounded-xl text-xs font-black uppercase tracking-widest text-white hover:bg-[#0A2342] transition-colors flex items-center justify-center gap-2">
                Request Valuation <ArrowRight className="h-4 w-4" />
              </button>

              <p className={`text-center text- transition-colors ${isDark?'text-white/30':'text-black/30'}`}>No spam • Free valuation • Response in 15 mins</p>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}