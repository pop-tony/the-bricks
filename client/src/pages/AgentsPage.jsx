import AgentCard from '../components/AgentCard';

const agents = [
  { id: 1, name: 'Kwame Asante', photo: '/agent1.jpg', phone: '233241234567', listings: 24, sold: 156 },
  { id: 2, name: 'Ama Osei', photo: '/agent2.jpg', phone: '233241234568', listings: 18, sold: 98 },
  { id: 3, name: 'Kofi Mensah', photo: '/agent3.jpg', phone: '233241234569', listings: 31, sold: 201 },
];

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-brick-navy pt-24">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h1 className="text-4xl font-black text-white md:text-5xl">Meet Our Agents</h1>
        <p className="mt-2 text-zinc-400">Licensed professionals serving Accra</p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {agents.map(agent => <AgentCard key={agent.id} agent={agent} />)}
        </div>
      </div>
    </div>
  );
}
