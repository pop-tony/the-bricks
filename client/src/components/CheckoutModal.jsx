
import { X } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
export default function CheckoutModal({ isOpen, onClose, items=[], onSuccess }){
  const [form,setForm]=useState({name:'',email:'',phone:'',address:'',city:'',region:''});
  const [isProcessing,setIsProcessing]=useState(false);
  const { isDark } = useTheme();
  const subtotal=items.reduce((s,i)=>s+(i.price||0)*(i.quantity||1),0);
  const total=subtotal + (subtotal>500?0:25);
  if(!isOpen) return null;
  const handleSubmit=async(e)=>{ e.preventDefault(); setIsProcessing(true); await new Promise(r=>setTimeout(r,2000)); setIsProcessing(false); onSuccess?.(); onClose(); };
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4"><div onClick={onClose} className="absolute inset-0 bg-[#0A2342]/80 backdrop-blur-md"/><div className={`relative rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl ${isDark?'bg-[#0A2342] text-white':'bg-white text-[#0A2342]'}`}><div className={`sticky top-0 flex items-center justify-between border-b p-6 md:p-8 ${isDark?'border-white/10 bg-[#0A2342]':'border-black/5 bg-white'}`}><div><p className="text-[11px] font-black tracking-[0.2em] uppercase text-[#FF6A00]">Checkout</p><h2 className="font-black text-2xl mt-1">Checkout</h2></div><button onClick={onClose} className="h-10 w-10 bg-black/5 hover:bg-black/10 rounded-xl flex items-center justify-center"><X className="h-5 w-5"/></button></div><form onSubmit={handleSubmit} className="p-6 md:p-8"><div className="grid gap-4 md:grid-cols-2">{[['name','Full Name'],['email','Email'],['phone','Phone'],['city','City'],['address','Street Address'],['region','Region']].map(([k,l])=><div key={k} className={k==='address'||k==='region'?'md:col-span-2':''}><label className="text-[11px] font-black uppercase tracking-widest">{l}</label><input required value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} className={`mt-2 w-full h-12 border px-4 rounded-xl text-sm outline-none focus:border-[#FF6A00] ${isDark?'bg-white/5 border-white/10 text-white':'bg-[#F8F9FB] border-black/10'}`} placeholder={l}/></div>)}</div><div className={`mt-8 p-6 rounded-2xl ${isDark?'bg-white/5':'bg-[#0A2342] text-white'}`}><div className="flex justify-between"><span className="opacity-60">Total</span><span className="font-black text-xl">GHS {total.toFixed(2)}</span></div></div><button type="submit" disabled={isProcessing} className="mt-8 w-full bg-[#FF6A00] py-4 rounded-xl text-xs font-black uppercase tracking-widest text-white hover:bg-[#0A2342] disabled:opacity-50">{isProcessing?'Processing...':'Place Order'}</button></form></div></div>
  )
}
