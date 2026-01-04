import React, { useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      // Center the cursor (24px width/height -> 12px offset)
      x.set(e.clientX - 12);
      y.set(e.clientY - 12);
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [x, y]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-white rounded-full pointer-events-none mix-blend-difference z-[9999] hidden md:flex items-center justify-center"
      style={{ x, y }}
    />
  );
};

export default CustomCursor;