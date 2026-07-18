
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
export default function SellPage(){
  const { isDark } = useTheme();
  return (
    <div className={`min-h-screen transition-colors ${isDark?'bg-[#06152C]':'bg-[#F8F9FB]'}`}>
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-[#0A2342]">
        <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2940" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2342] via-[#0A2342]/80 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 py-20 grid lg:grid-cols-2 gap-12 w-full">
          <div><p className="text-[#FF6A00] text-[11px] tracking-[0.3em] uppercase font-black">Sell With Confidence</p><h1 className="font-black text-4xl md:text-6xl text-white leading-[0.9] mt-4">Get the best price for your <span className="text-[#FF6A00]">Accra home</span></h1><p className="mt-6 text-white/70 leading-7">Premium marketing, qualified buyers, seamless process from valuation to closing.</p></div>
          <form className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl"><p className="text-[#FF6A00] text-[11px] uppercase tracking-widest font-black">Free Valuation</p><h2 className="font-black text-2xl text-white mt-2 mb-6">Request Assessment</h2><div className="space-y-5"><input placeholder="Full Name" className="w-full h-12 border-b border-white/20 bg-transparent text-sm text-white placeholder:text-white/50 outline-none focus:border-[#FF6A00]"/><input placeholder="Phone Number" className="w-full h-12 border-b border-white/20 bg-transparent text-sm text-white placeholder:text-white/50 outline-none focus:border-[#FF6A00]"/><input placeholder="Property Location" className="w-full h-12 border-b border-white/20 bg-transparent text-sm text-white placeholder:text-white/50 outline-none focus:border-[#FF6A00]"/><button className="mt-4 w-full bg-[#FF6A00] py-4 rounded-xl text-xs font-black uppercase tracking-widest text-white flex justify-between px-6 items-center hover:bg-white hover:text-[#0A2342] transition-colors">Request Valuation <ArrowRight className="h-4 w-4"/></button></div></form>
        </div>
      </section>
    </div>
  )
}
