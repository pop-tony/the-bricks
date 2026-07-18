
import { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { format, startOfToday } from 'date-fns';
import { useTheme } from '../context/ThemeContext';
const VIEWING_FEE=100;
export default function ScheduleViewing({ property, isOpen, onClose }){
  const [selectedDate,setSelectedDate]=useState(null);
  const [selectedTime,setSelectedTime]=useState('');
  const [step,setStep]=useState('calendar');
  const [bookingRef,setBookingRef]=useState('');
  const [isPaying,setIsPaying]=useState(false);
  const { isDark } = useTheme();
  const timeSlots=['10:00 AM','12:00 PM','2:00 PM','4:00 PM'];
  if(isOpen!==undefined && !isOpen) return null;
  const handlePayment=()=>{
    setIsPaying(true);
    setTimeout(()=>{ setBookingRef(`VIEW_${Date.now()}`); setStep('success'); setIsPaying(false); },1200);
  };
  const isEmbedded=isOpen===undefined;
  const Content=(
    <div className="p-2">
      <p className="text-[11px] font-black tracking-[0.2em] uppercase text-[#FF6A00]">Schedule Viewing</p>
      <h2 className={`font-black mt-2 text-2xl leading-tight ${isDark?'text-white':'text-[#0A2342]'}`}>{property?.title||'Book viewing'}</h2>
      <div className="mt-6"><label className={`text-[11px] font-black uppercase tracking-widest ${isDark?'text-white':'text-[#0A2342]'}`}>Select Date</label><input type="date" min={format(startOfToday(),'yyyy-MM-dd')} onChange={e=>setSelectedDate(new Date(e.target.value))} className={`mt-2 w-full h-12 border px-4 rounded-xl text-sm outline-none focus:border-[#FF6A00] ${isDark?'bg-white/5 border-white/10 text-white':'bg-[#F8F9FB] border-black/10 text-[#0A2342]'}`} /></div>
      {selectedDate && <div className="mt-6"><p className={`text-[11px] font-black uppercase tracking-widest mb-3 ${isDark?'text-white':'text-[#0A2342]'}`}>Select Time</p><div className="grid grid-cols-2 gap-2.5">{timeSlots.map(t=><button key={t} onClick={()=>setSelectedTime(t)} className={`h-11 border rounded-xl text-xs font-bold uppercase tracking-widest transition-colors ${selectedTime===t?'bg-[#FF6A00] border-[#FF6A00] text-white':'border-black/10 bg-[#F8F9FB] text-black/60 hover:border-[#0A2342]'} ${isDark && selectedTime!==t ? 'bg-white/5 border-white/10 text-white/60':''}`}>{t}</button>)}</div></div>}
      {step==='calendar' && <button disabled={!selectedDate||!selectedTime} onClick={()=>setStep('payment')} className="mt-8 w-full bg-[#0A2342] py-4 rounded-xl text-xs font-black uppercase tracking-widest text-white hover:bg-[#FF6A00] disabled:opacity-30 transition-colors">Continue</button>}
      {step==='payment' && <div className={`mt-6 p-5 rounded-2xl border ${isDark?'bg-white/5 border-white/10':'bg-[#F8F9FB] border-black/5'}`}><div className="space-y-3 text-sm"><div className="flex justify-between"><span className="opacity-50">Date</span><span className="font-bold">{selectedDate?format(selectedDate,'PPP'):''}</span></div><div className="flex justify-between"><span className="opacity-50">Time</span><span className="font-bold">{selectedTime}</span></div><div className="flex justify-between items-baseline pt-3 border-t border-white/10"><span className="font-black">Viewing Fee</span><span className="font-black text-xl">GHS {VIEWING_FEE}</span></div></div><button onClick={handlePayment} disabled={isPaying} className="mt-6 w-full bg-[#FF6A00] py-4 rounded-xl text-xs font-black uppercase text-white">{isPaying?'Processing...':`Pay GHS ${VIEWING_FEE}`}</button></div>}
      {step==='success' && <div className="mt-8 py-8 text-center bg-emerald-50 border border-emerald-100 rounded-2xl px-6"><CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500"/><h3 className="font-black mt-4 text-xl text-[#0A2342]">Booking Confirmed!</h3><p className="mt-2 text-sm text-black/60">{selectedDate?format(selectedDate,'PPP'):''} at {selectedTime}</p><p className="mt-4 text-[11px] font-mono bg-white px-3 py-1.5 rounded-full border inline-block">Ref: {bookingRef}</p><button onClick={()=>{setStep('calendar'); onClose?.()}} className="mt-6 w-full bg-[#0A2342] py-3 rounded-xl text-xs font-black uppercase text-white">Done</button></div>}
    </div>
  );
  if(isEmbedded) return <div className={`rounded-2xl p-5 md:p-6 border shadow-sm ${isDark?'bg-[#112A4A] border-white/10':'bg-white border-black/5'}`}>{Content}</div>;
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4"><div onClick={onClose} className="absolute inset-0 bg-[#0A2342]/70 backdrop-blur-md"/><div className={`relative rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 ${isDark?'bg-[#0A2342]':'bg-white'}`}><button onClick={onClose} className="absolute right-4 top-4 h-9 w-9 bg-black/5 hover:bg-black/10 rounded-xl flex items-center justify-center"><X className="h-4 w-4"/></button>{Content}</div></div>;
}
