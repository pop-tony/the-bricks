import { Phone, MessageCircle } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { loop3DRotate, float3D } from '../lib/motion';
import { useRef } from 'react';

export default function AgentCard({ agent }) {
  const { name, photo, phone, listings, sold } = agent;
  const whatsappMsg = `Hi ${name}, I'm interested in a property from the Bricks`;
  
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);
  
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={loop3DRotate({ duration: 22 })}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="perspective-1000"
    >
      <motion.div 
        style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
        className="bg-brick-white border border-brick-subtle p-8 text-center shadow-luxe"
        animate={float3D({ duration: 7 })}
      >
        <div className="mx-auto h-28 w-28 overflow-hidden border-2 border-brick-gold">
          <motion.img 
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            src={photo} 
            alt={name} 
            className="h-full w-full object-cover" 
          />
        </div>
        
        <h3 className="font-serif mt-6 text-2xl text-brick-charcoal">{name}</h3>
        <div className="mx-auto mt-2 h-px w-12 bg-brick-gold" />
        <p className="mt-4 text-sm text-brick-muted tracking-wide">
          {sold} Sold • {listings} Active
        </p>
        
        <div className="mt-8 flex gap-3" style={{ transform: "translateZ(20px)" }}>
          <a 
            href={`https://wa.me/${phone}?text=${encodeURIComponent(whatsappMsg)}`}
            className="flex flex-1 items-center justify-center gap-2 border border-brick-charcoal bg-brick-charcoal py-3 text-xs font-medium uppercase tracking-[0.15em] text-brick-white transition-luxe hover:bg-brick-gold hover:border-brick-gold hover:text-brick-black"
          >
            <MessageCircle className="h-4 w-4" /> Message
          </a>
          <a 
            href={`tel:${phone}`}
            className="flex items-center justify-center border border-brick-subtle p-3 text-brick-charcoal transition-luxe hover:border-brick-gold hover:text-brick-gold"
          >
            <Phone className="h-4 w-4" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}