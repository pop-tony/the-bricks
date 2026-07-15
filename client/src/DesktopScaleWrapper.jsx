import { useEffect, useState, useRef } from 'react';

const DESIGN_WIDTH = 1280; // your laptop design width

export default function DesktopScaleWrapper({ children }) {
  const [scale, setScale] = useState(1);
  const innerRef = useRef(null);
  const [height, setHeight] = useState('auto');

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const newScale = Math.min(1, w / DESIGN_WIDTH);
      setScale(newScale);
      
      if (innerRef.current) {
        setHeight(innerRef.current.offsetHeight * newScale);
      }
    };

    update();
    window.addEventListener('resize', update);
    
    const ro = new ResizeObserver(update);
    if (innerRef.current) ro.observe(innerRef.current);
    
    return () => {
      window.removeEventListener('resize', update);
      ro.disconnect();
    };
  }, []);

  return (
    <div style={{ width: '100%', height, overflow: 'hidden' }}>
      <div
        ref={innerRef}
        style={{
          width: DESIGN_WIDTH,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  );
}