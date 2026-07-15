import { useLayoutEffect, useState, useRef } from 'react';

// ADJUST THESE TO MAKE MOBILE LARGER/SMALLER
const DESIGN_WIDTH = 1280; // was 1280 - smaller = larger on mobile
const SCALE_BOOST = 1.35; // 1.35 = 35% larger than strict fit
const MIN_SCALE = 0.42; // never smaller than 42% - prevents tiny text
const MAX_SCALE = 1;

export default function DesktopScaleWrapper({ children }) {
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState('auto');
  const innerRef = useRef(null);

  useLayoutEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      let s = (w / DESIGN_WIDTH) * SCALE_BOOST;
      s = Math.max(MIN_SCALE, Math.min(MAX_SCALE, s));
      // On large screens, keep 1
      if (w >= DESIGN_WIDTH) s = 1;
      setScale(s);
      if (innerRef.current) {
        setHeight(innerRef.current.offsetHeight * s);
      }
    };

    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    const ro = new ResizeObserver(update);
    if (innerRef.current) ro.observe(innerRef.current);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
      ro.disconnect();
    };
  }, []);

  return (
    <div style={{ width: '100%', height, overflow: 'hidden', background: '#fcfaf8' }}>
      <div
        ref={innerRef}
        style={{
          width: DESIGN_WIDTH,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}
