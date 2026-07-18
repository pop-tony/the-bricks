
import AgentCard from '../components/AgentCard';
import { useTheme } from '../context/ThemeContext';
const agents=[{id:1,name:'Kwame Asante',photo:'',phone:'233598052702',listings:24,sold:156,role:'Lead Agent'},{id:2,name:'Ama Osei',photo:'',phone:'233598052702',listings:18,sold:98,role:'Rentals Specialist'},{id:3,name:'Kofi Mensah',photo:'',phone:'233598052702',listings:31,sold:201,role:'Lakeside Expert'}];
export default function AgentsPage(){
  const { isDark } = useTheme();
  return (
    <div className={`min-h-screen pt-28 md:pt-32 transition-colors duration-500 ${isDark?'bg-[#06152C]':'bg-[#F8F9FB]'}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-8 pb-20"><p className="text-[#FF6A00] text-[11px] tracking-[0.3em] uppercase font-black">Our Team</p><h1 className={`font-black text-4xl md:text-6xl mt-3 ${isDark?'text-white':'text-[#0A2342]'}`}>Meet Our Agents</h1><p className={`mt-4 max-w-2xl ${isDark?'text-white/60':'text-black/60'}`}>Licensed professionals with deep expertise in Lakeside Estate & Accra premium neighborhoods.</p><div className="mt-12 grid gap-6 md:grid-cols-3">{agents.map(a=><AgentCard key={a.id} agent={a} />)}</div></div>
    </div>
  )
}
