import { useLayoutEffect, useState, useRef } from 'react';

const DESIGN_WIDTH = 1280; // laptop design width - change to 1440 if your design is wider

export default function DesktopScaleWrapper({ children }) {
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState('auto');
  const innerRef = useRef(null);

  useLayoutEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const s = Math.min(1, w / DESIGN_WIDTH);
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
