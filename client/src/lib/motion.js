import { easeInOut } from 'framer-motion';

export const loop3DRotate = (opts = {}) => ({
  rotateY: [0, 8, 0, -8, 0],
  rotateX: [0, 2, 0, -2, 0],
  transition: {
    duration: opts.duration || 14,
    ease: opts.ease || 'linear',
    repeat: Infinity,
    repeatType: 'loop'
  }
});

export const float3D = (opts = {}) => ({
  y: [0, -6, 0, 6, 0],
  transition: {
    duration: opts.duration || 8,
    ease: opts.ease || easeInOut,
    repeat: Infinity,
    repeatType: 'mirror'
  }
});

export const slowSpin = (opts = {}) => ({
  rotate: [0, 360],
  transition: {
    duration: opts.duration || 60,
    ease: 'linear',
    repeat: Infinity,
    repeatType: 'loop'
  }
});

export default {};
