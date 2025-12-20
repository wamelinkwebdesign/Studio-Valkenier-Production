import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState<string>("");

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      // Center the cursor (24px width/height -> 12px offset)
      x.set(e.clientX - 12);
      y.set(e.clientY - 12);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for data-cursor-text on the target or its ancestors
      const textElement = target.closest('[data-cursor-text]');
      const text = textElement ? textElement.getAttribute('data-cursor-text') : "";
      setCursorText(text || "");

      // Heuristic to detect clickable elements
      const isClickable = 
        !!text || // If text is present, treat as clickable/hovered
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') !== null || 
        target.closest('button') !== null ||
        target.getAttribute('role') === 'button' ||
        target.closest('[role="button"]') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovered(isClickable);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [x, y]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-white rounded-full pointer-events-none mix-blend-difference z-[9999] hidden md:flex items-center justify-center"
      style={{ x, y }}
      animate={{
        scale: cursorText ? 5 : (isHovered ? 4 : 1),
      }}
      transition={{
        scale: { type: "spring", stiffness: 300, damping: 20 },
      }}
    >
      {cursorText && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="text-[3px] font-bold uppercase tracking-widest text-black text-center leading-none"
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
};

export default CustomCursor;