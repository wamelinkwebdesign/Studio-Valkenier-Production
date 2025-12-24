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
    <section id="about" className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-white text-black overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col gap-24"
        >
          {/* Main Header */}
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
          >
            About Studio Valkenier
          </motion.h2>

          {/* Intro Text & Button */}
          <motion.div variants={itemVariants} className="max-w-5xl">
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight mb-16">
              Studio Valkenier is een multidisciplinair ontwerpbureau dat zich breed beweegt binnen stedelijk ontwerp, architectuur, interieurontwerp en conceptontwikkeling.
            </h3>
            
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

          {/* Team Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 mt-12">
            
            {/* Wouter Valkenier */}
            <motion.div variants={itemVariants} className="flex flex-col gap-8">
                <div className="w-full aspect-[3/4] overflow-hidden bg-gray-100">
                    <img 
                        src="https://storage.googleapis.com/studiovalkenier/woutervalkenier.jpg" 
                        alt="Wouter Valkenier" 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                </div>
                <div>
                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-2">Wouter Valkenier</h3>
                    <span className="text-sm font-mono uppercase tracking-widest text-gray-500 block mb-8">Oprichter / Architect</span>
                    <p className="text-lg leading-relaxed text-gray-700">
                        Als oprichter van Studio Valkenier zoekt Wouter altijd naar de onbenutte potentie van plekken. Zijn ontwerpen, zoals Hannekes Boom en Ceuvel, zijn iconisch voor een nieuwe manier van stedelijke ontwikkeling: organisch, circulair en diep geworteld in de gemeenschap. Hij combineert een pragmatische 'niet lullen maar poetsen' mentaliteit met een scherp oog voor esthetiek en hergebruik.
                    </p>
                </div>
            </motion.div>

            {/* Mijke Valkenier */}
            <motion.div variants={itemVariants} className="flex flex-col gap-8 md:mt-32">
                 <div className="w-full aspect-[3/4] overflow-hidden bg-gray-100">
                    <img 
                        src="https://storage.googleapis.com/studiovalkenier/MijkeValkenier-01klein%20(1)_wp_1600.jpg" 
                        alt="Mijke Valkenier" 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                </div>
                <div>
                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-2">Mijke Valkenier</h3>
                    <span className="text-sm font-mono uppercase tracking-widest text-gray-500 block mb-8">Architect / Partner</span>
                    <p className="text-lg leading-relaxed text-gray-700 mb-8">
                        Mijke combineert architectonische precisie met een sterke visie op duurzaam wonen. Ze was medeverantwoordelijk voor diverse spraakmakende projecten binnen de studio en zet zich in voor innovatieve woonvormen zoals Schoonschip. Haar talent en impact werden internationaal erkend.
                    </p>
                    <div className="inline-block border-l-4 border-studio-red pl-4 py-1">
                        <span className="block text-xl font-bold uppercase tracking-tight leading-none">Winner</span>
                        <span className="block text-sm font-medium text-gray-600">Europe 40 Under 40 (2019)</span>
                    </div>
                </div>
            </motion.div>

          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;