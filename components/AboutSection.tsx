import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface AboutSectionProps {
  onOpenManifesto: () => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ onOpenManifesto }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    }
  };

  return (
    <section id="about" className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-white border-t border-black/5 text-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col gap-12"
        >
          {/* Header Text */}
          <motion.div variants={itemVariants} className="max-w-5xl">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight mb-16">
              Studio Valkenier is een multidisciplinair ontwerpbureau dat zich breed beweegt binnen stedelijk ontwerp, architectuur, interieurontwerp en conceptontwikkeling.
            </h2>
            
            {/* Big Action Button */}
            <button 
              onClick={onOpenManifesto}
              className="group flex items-center gap-4 md:gap-6 text-xl md:text-4xl font-black uppercase tracking-tighter text-studio-red hover:text-black transition-colors duration-300"
            >
              <span className="border-b-2 border-studio-red group-hover:border-black transition-colors pb-1">
                Lees Meer
              </span>
              <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform duration-300" strokeWidth={2.5} />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;