
import { Bed, Bath, MapPin, Move, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function PropertyCard({ property }){
  const [saved,setSaved]=useState(false);
  const { isDark } = useTheme();
  const { id, title, price, location, beds, baths, size, images, status, verified } = property;
  return (
    <div className={`group rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-20px_rgba(0,0,0,0.3)] ${isDark ? 'bg-[#112A4A] border-white/10 hover:border-white/20' : 'bg-white border-black/5 hover:border-black/10'}`}>
      <Link to={`/properties/${id}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0A2342]">
          {images?.[0] ? <img src={images[0]} alt={title} className="h-full w-full object-cover group-hover:scale-[1.05] transition-transform duration-700" /> : <div className="h-full w-full flex items-center justify-center text-white/20">No Image</div>}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute left-3 top-3 flex gap-2"><span className="bg-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#0A2342] shadow">{status}</span>{verified && <span className="bg-emerald-500 px-3 py-1.5 rounded-full text-[10px] font-black uppercase text-white">Titled</span>}</div>
          <button onClick={(e)=>{e.preventDefault(); setSaved(!saved)}} className="absolute right-3 top-3 h-9 w-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white shadow"><Bookmark className={`h-4 w-4 ${saved?'fill-[#FF6A00] text-[#FF6A00]':'text-[#0A2342]'}`} /></button>
          <div className="absolute bottom-0 left-0 right-0 p-4"><p className="font-black text-xl text-white">GHS {price?.toLocaleString()}</p></div>
        </div>
      </Link>
      <div className="p-5">
        <Link to={`/properties/${id}`}><h3 className={`font-black leading-tight line-clamp-2 transition-colors text-[14px] ${isDark ? 'text-white group-hover:text-[#FF6A00]' : 'text-[#0A2342] group-hover:text-[#FF6A00]'}`}>{title}</h3></Link>
        <p className={`mt-2 flex items-center gap-1 text-xs ${isDark?'text-white/50':'text-black/50'}`}><MapPin className="h-3 w-3"/>{location}</p>
        <div className={`mt-4 flex justify-between border-t pt-4 text-[11px] ${isDark?'border-white/10 text-white/60':'border-black/5 text-black/60'}`}><span className="flex gap-1 items-center font-bold"><Bed className="h-3.5 w-3.5"/>{beds}</span><span className="flex gap-1 items-center font-bold"><Bath className="h-3.5 w-3.5"/>{baths}</span><span className="flex gap-1 items-center font-bold"><Move className="h-3.5 w-3.5"/>{size}m²</span></div>
      </div>
    </div>
  )
}
