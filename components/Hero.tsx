import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { HERO_VIDEO_URL } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => {
                const workSection = document.getElementById('work');
                workSection?.scrollIntoView({ behavior: 'smooth' });
            }}
        >
            <span className="text-[10px] uppercase tracking-widest text-white mix-blend-difference">Scroll</span>
            <ArrowDown className="w-4 h-4 text-white mix-blend-difference" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;