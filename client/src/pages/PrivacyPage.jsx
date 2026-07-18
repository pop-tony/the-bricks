
import { useTheme } from '../context/ThemeContext';
export default function PrivacyPage(){
  const { isDark } = useTheme();
  return <div className={`min-h-screen pt-28 pb-20 px-4 md:px-8 transition-colors ${isDark?'bg-[#06152C] text-white':'bg-white text-[#0A2342]'}`}><div className="mx-auto max-w-3xl"><p className="text-[#FF6A00] text-[11px] tracking-[0.2em] uppercase font-black">Legal</p><h1 className="font-black text-4xl md:text-5xl mt-3">Privacy Policy</h1><p className={`mt-4 text-sm ${isDark?'text-white/50':'text-black/50'}`}>Last updated: June 2026</p><div className={`mt-12 space-y-8 text-sm leading-7 ${isDark?'text-white/70':'text-black/60'}`}><p>We collect personal info to facilitate transactions. Data is stored securely and never sold. Payments via Paystack.</p><p>Contact: privacy@thebricks.com • Lakeside Estate, Accra, Ghana • +233 598 052 702</p></div></div></div>
}
