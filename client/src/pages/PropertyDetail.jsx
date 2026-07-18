
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Bed, Bath, Move, MapPin, ChevronLeft, ChevronRight, Heart, Share2, Calendar, Calculator } from 'lucide-react';
import { properties } from '../data/properties';
import WhatsAppCTA from '../components/WhatsAppCTA';
import ScheduleViewing from '../components/ScheduleViewing';
import AgentCard from '../components/AgentCard';
import { useTheme } from '../context/ThemeContext';

export default function PropertyDetail(){
  const { id } = useParams();
  const property=properties.find(p=>p.id===parseInt(id));
  const [currentImage,setCurrentImage]=useState(0);
  const [showSchedule,setShowSchedule]=useState(false);
  const [showMortgage,setShowMortgage]=useState(false);
  const [isSaved,setIsSaved]=useState(false);
  const { isDark } = useTheme();
  if(!property) return <div className={`min-h-screen flex items-center justify-center pt-24 ${isDark?'bg-[#06152C] text-white':'bg-[#F8F9FB] text-[#0A2342]'}`}><div className="text-center"><h1 className="font-black text-3xl">Property Not Found</h1><Link to="/properties" className="mt-4 inline-block text-[#FF6A00]">Back to Properties</Link></div></div>;
  const features=['Title Verified','24/7 Security','Backup Generator','Borehole Water','Fitted Kitchen','AC in All Rooms','Parking','Garden'];
  return (
    <div className={`min-h-screen pt-[88px] transition-colors duration-500 ${isDark?'bg-[#06152C]':'bg-[#F8F9FB]'}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-6 md:py-10">
        <div className={`mb-6 flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold ${isDark?'text-white/40':'text-black/40'}`}><Link to="/" className="hover:text-[#FF6A00]">Home</Link><span>/</span><Link to="/properties" className="hover:text-[#FF6A00]">Properties</Link><span>/</span><span className={isDark?'text-white':'text-[#0A2342]'}>{property.title}</span></div>
        <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
          <div>
            <div className="relative rounded-2xl overflow-hidden bg-[#0A2342] aspect-[16/10]">
              <img src={property.images[currentImage]} alt={property.title} className="h-full w-full object-cover" />
              {property.images.length>1 && <><button onClick={()=>setCurrentImage((p)=>(p-1+property.images.length)%property.images.length)} className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/10 backdrop-blur border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#0A2342]"><ChevronLeft className="h-5 w-5"/></button><button onClick={()=>setCurrentImage((p)=>(p+1)%property.images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/10 backdrop-blur border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#0A2342]"><ChevronRight className="h-5 w-5"/></button></>}
              <div className="absolute right-4 top-4 flex gap-2"><button onClick={()=>setIsSaved(!isSaved)} className="h-10 w-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"><Heart className={`h-4 w-4 ${isSaved?'fill-[#FF6A00] text-[#FF6A00]':''}`}/></button><button className="h-10 w-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"><Share2 className="h-4 w-4"/></button></div>
              <div className="absolute left-4 top-4 flex flex-col gap-2"><span className="bg-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase">For {property.status}</span>{property.verified && <span className="bg-[#FF6A00] px-3 py-1.5 rounded-full text-[10px] font-black uppercase text-white">Title Verified</span>}</div>
            </div>
            {property.images.length>1 && <div className="mt-4 grid grid-cols-6 gap-2">{property.images.map((img,idx)=><button key={idx} onClick={()=>setCurrentImage(idx)} className={`aspect-video overflow-hidden rounded-xl ${currentImage===idx?'ring-2 ring-[#FF6A00]':'opacity-60 hover:opacity-100'}`}><img src={img} className="h-full w-full object-cover"/></button>)}</div>}
            <div className={`mt-8 border-b pb-8 ${isDark?'border-white/10':'border-black/5'}`}><h1 className={`font-black text-3xl md:text-4xl leading-[0.9] ${isDark?'text-white':'text-[#0A2342]'}`}>{property.title}</h1><p className={`mt-3 flex items-center gap-2 text-sm ${isDark?'text-white/50':'text-black/50'}`}><MapPin className="h-4 w-4"/>{property.location}, Accra</p><p className={`mt-6 font-black text-3xl ${isDark?'text-white':'text-[#0A2342]'}`}>GHS {property.price.toLocaleString()} {property.type==='Rent' && <span className="text-base font-normal opacity-60">/mo</span>}</p></div>
            <div className={`grid grid-cols-3 gap-6 py-8 border-b text-center ${isDark?'border-white/10':'border-black/5'}`}>{[{icon:Bed,label:'Beds',v:property.beds},{icon:Bath,label:'Baths',v:property.baths},{icon:Move,label:'Size',v:property.size}].map(i=>{ const Icon=i.icon; return <div key={i.label}><Icon className="mx-auto h-5 w-5 text-[#FF6A00]"/><p className={`font-black text-2xl mt-2 ${isDark?'text-white':'text-[#0A2342]'}`}>{i.v}</p><p className={`text-[11px] uppercase tracking-widest font-bold mt-1 ${isDark?'text-white/40':'text-black/40'}`}>{i.label}</p></div>})}</div>
            <div className={`py-8 border-b ${isDark?'border-white/10':'border-black/5'}`}><p className="text-[#FF6A00] text-[11px] font-black tracking-[0.2em] uppercase mb-3">Description</p><p className={`leading-7 text-[15px] ${isDark?'text-white/70':'text-black/60'}`}>Experience modern living in this {property.beds} bedroom {property.category?.toLowerCase()} in {property.location}. Premium finishes, secure gated community, 24/7 security, backup power. Perfect for families & investors.</p></div>
            <div className="py-8"><p className="text-[#FF6A00] text-[11px] font-black tracking-[0.2em] uppercase mb-4">Features</p><div className="grid grid-cols-2 md:grid-cols-3 gap-3">{features.map(f=><div key={f} className={`flex items-center gap-2 text-sm ${isDark?'text-white/70':'text-black/60'}`}><div className="h-px w-4 bg-[#FF6A00]"/>{f}</div>)}</div></div>
          </div>
          <div className="space-y-6 lg:sticky lg:top-[100px] h-fit">
            <AgentCard agent={{name:'Kwame Asante',photo:'',phone:'233598052702',listings:24,sold:156,role:'Lakeside Specialist'}} />
            <div className={`border rounded-2xl p-6 ${isDark?'bg-[#112A4A] border-white/10':'bg-white border-black/5'}`}><h3 className={`font-black text-base ${isDark?'text-white':'text-[#0A2342]'}`}>Interested?</h3><div className="mt-5 space-y-3"><WhatsAppCTA property={property} phone="233598052702"/><button onClick={()=>setShowSchedule(true)} className={`flex w-full items-center justify-center gap-2 border py-4 text-xs font-black uppercase tracking-widest rounded-xl transition-colors ${isDark?'border-white/20 text-white hover:bg-white hover:text-[#0A2342]':'border-[#0A2342] text-[#0A2342] hover:bg-[#0A2342] hover:text-white'}`}><Calendar className="h-4 w-4"/>Schedule Viewing</button><button onClick={()=>setShowMortgage(!showMortgage)} className={`flex w-full items-center justify-center gap-2 py-4 text-xs font-black uppercase tracking-widest rounded-xl ${isDark?'bg-white/10 text-white hover:bg-white/20':'bg-[#F8F9FB] text-[#0A2342] hover:bg-black/5'}`}><Calculator className="h-4 w-4"/>Mortgage Calculator</button></div></div>
            <ScheduleViewing property={property} />
          </div>
        </div>
      </div>
      {showSchedule && <ScheduleViewing property={property} isOpen={showSchedule} onClose={()=>setShowSchedule(false)} />}
    </div>
  )
}
