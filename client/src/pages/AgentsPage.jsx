import AgentCard from '../components/AgentCard';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

const agents = [
  { id: 1, name: 'Kwame Asante', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974', phone: '233241234567', listings: 24, sold: 156 },
  { id: 2, name: 'Ama Osei', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974', phone: '233241234568', listings: 18, sold: 98 },
  { id: 3, name: 'Kofi Mensah', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974', phone: '233241234569', listings: 31, sold: 201 },
];

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-brick-offwhite pt-32">
      <div className="mx-auto max-w-7xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
        >
          <p className="text-brick-gold text-xs tracking-[0.3em] uppercase mb-6">Our Team</p>
          <h1 className="font-serif text-5xl text-7xl text-brick-black">Meet Our Agents</h1>
          <p className="mt-6 text-base text-brick-muted max-w-2xl">
            Licensed professionals with deep expertise in Accra's premium neighborhoods.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 grid-cols-3">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease }}
            >
              <AgentCard agent={agent} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}