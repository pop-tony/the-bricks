
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import FilterSidebar from '../components/FilterSidebar';
import { properties } from '../data/properties';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const INITIAL_SHOW=9;
export default function PropertiesPage(){
  const [searchParams,setSearchParams]=useSearchParams();
  const [showFilters,setShowFilters]=useState(false);
  const [visibleCount,setVisibleCount]=useState(INITIAL_SHOW);
  const { isDark } = useTheme();
  const urlStatus=searchParams.get('status')||'all';
  const urlSearch=searchParams.get('search')||'';
  const [filters,setFilters]=useState({status:urlStatus,location:'',type:'',search:urlSearch});
  useEffect(()=>{ const params=new URLSearchParams(); if(filters.status!=='all') params.set('status',filters.status); if(filters.search.trim()) params.set('search',filters.search.trim()); setSearchParams(params,{replace:true}); setVisibleCount(INITIAL_SHOW); },[filters]);
  const filtered=useMemo(()=>{ let r=properties; if(filters.status!=='all') r=r.filter(p=>p.status.toLowerCase()===filters.status); if(filters.search.trim()){ const q=filters.search.toLowerCase(); r=r.filter(p=>p.title.toLowerCase().includes(q)||p.location.toLowerCase().includes(q)); } return r; },[filters]);
  const visible=filtered.slice(0,visibleCount);
  return (
    <div className={`min-h-screen pt-24 transition-colors duration-500 ${isDark?'bg-[#06152C]':'bg-[#F8F9FB]'}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-16">
        <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div><p className="text-[#FF6A00] text-[11px] tracking-[0.2em] uppercase font-black mb-3">Browse</p><h1 className={`font-black text-4xl md:text-5xl ${isDark?'text-white':'text-[#0A2342]'}`}>{filters.status==='rent'?'For Rent':filters.status==='sale'?'For Sale':filters.status==='new build'?'New Developments':'All Properties'}</h1><p className={`mt-3 text-sm ${isDark?'text-white/50':'text-black/50'}`}>{filtered.length} properties • Lakeside Estate & Accra</p></div>
          <div className="flex gap-3 w-full lg:w-auto">
            <div className={`flex flex-1 border rounded-xl overflow-hidden ${isDark?'bg-white/5 border-white/10':'bg-white border-black/10'}`}><input value={filters.search} onChange={e=>setFilters({...filters,search:e.target.value})} placeholder="Search location or title..." className={`flex-1 bg-transparent px-4 py-3 text-sm outline-none ${isDark?'text-white placeholder:text-white/40':'text-[#0A2342] placeholder:text-black/40'}`} />{filters.search?<button onClick={()=>setFilters({...filters,search:''})} className="p-3"><X className="h-4 w-4"/></button>:<div className="p-3 text-[#FF6A00]"><Search className="h-4 w-4"/></div>}</div>
            <button onClick={()=>setShowFilters(true)} className={`lg:hidden flex items-center gap-2 border px-5 py-3 text-xs font-black uppercase tracking-widest rounded-xl ${isDark?'border-white/10 text-white':'border-black/10 text-[#0A2342]'}`}><SlidersHorizontal className="h-4 w-4"/>Filter</button>
          </div>
        </div>
        <div className={`mb-10 flex gap-6 border-b overflow-x-auto ${isDark?'border-white/10':'border-black/5'}`}>{['all','sale','rent','new build'].map(s=><button key={s} onClick={()=>setFilters({...filters,status:s})} className={`pb-4 whitespace-nowrap text-xs font-black uppercase tracking-widest transition-colors border-b-2 ${filters.status===s?'border-[#FF6A00] text-[#FF6A00]':'border-transparent opacity-60 hover:opacity-100'} ${isDark?'text-white':'text-[#0A2342]'}`}>{s==='all'?'All':s==='new build'?'New Builds':`For ${s}`}</button>)}</div>
        <div className="flex gap-8">
          <div className="hidden lg:block w-[320px] shrink-0"><FilterSidebar filters={filters} setFilters={setFilters} /></div>
          {showFilters && <><div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={()=>setShowFilters(false)}/><div className="fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm lg:hidden"><FilterSidebar filters={filters} setFilters={setFilters} isOpen={showFilters} onClose={()=>setShowFilters(false)} /></div></>}
          <div className="flex-1">
            {filtered.length===0?<div className="py-32 text-center"><p className={`font-black text-2xl ${isDark?'text-white':'text-[#0A2342]'}`}>No properties found</p><button onClick={()=>setFilters({status:'all',location:'',type:'',search:''})} className="mt-4 text-sm font-black uppercase tracking-widest text-[#FF6A00]">Clear filters</button></div>:<>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">{visible.map(p=><PropertyCard key={p.id} property={p} />)}</div>
              {visibleCount<filtered.length && <div className="mt-12 text-center"><button onClick={()=>setVisibleCount(v=>v+INITIAL_SHOW)} className={`border px-10 py-4 text-xs font-black uppercase tracking-widest rounded-xl transition-colors ${isDark?'border-white/20 text-white hover:bg-white hover:text-[#0A2342]':'border-[#0A2342] text-[#0A2342] hover:bg-[#0A2342] hover:text-white'}`}>Load More</button><p className={`mt-3 text-xs ${isDark?'text-white/40':'text-black/40'}`}>Showing {visibleCount} of {filtered.length}</p></div>}
            </>}
          </div>
        </div>
      </div>
    </div>
  )
}
