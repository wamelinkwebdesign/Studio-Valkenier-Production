import React from 'react';
import { motion, Variants } from 'framer-motion';

const AboutSection: React.FC = () => {
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
        >
          {/* Left Column: Text Content */}
          <div className="flex flex-col gap-12">
            <motion.h2 
                variants={itemVariants}
                className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
            >
                About Studio Valkenier
            </motion.h2>

            <motion.div variants={itemVariants}>
                <div className="space-y-6 text-lg md:text-2xl font-light leading-relaxed text-gray-900">
                <p>Studio Valkenier is een multidisciplinair ontwerpbureau dat zich breed beweegt binnen stedelijk ontwerp, architectuur, interieurontwerp en conceptontwikkeling.</p>
                <p>Het verlengen van de levensduur van gebouwen en het verkleinen van de ecologische voetafdruk vormen de basis van onze projecten. Circulariteit, sociale impact, contextmapping, co-creatie, hergebruik van materialen, demontabel bouwen en niet-toxisch ontwerp zijn de kernwaarden van Studio Valkenier, samen met spontaniteit en het omarmen van de schoonheid van imperfecties.</p>
                <p>Co-creatie en samenwerking zijn fundamenteel voor het ontwerpproces van Studio Valkenier. Wij geloven dat ontwerpen worden verrijkt door samenwerking met andere ontwerpers, gebruikers en denkers. Door een multidisciplinair team samen te stellen, kunnen we een gelaagd ontwerp creëren waarbij het geheel meer is dan de som der delen.</p>
                <p>Studio Valkenier is gespecialiseerd in het creëren van kansen en interventies voor verloren ruimtes, zowel in de stad als op het platteland. We experimenteren graag met ideeën en hebben de kracht om experimenten daadwerkelijk te realiseren.</p>
                </div>
            </motion.div>
          </div>

          {/* Right Column: Team Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 lg:pt-24">
            
            {/* Wouter Valkenier */}
            <motion.div variants={itemVariants} className="flex flex-col gap-6 items-center text-center">
                <div className="w-full aspect-[3/4] overflow-hidden bg-gray-100 max-w-sm">
                    <img 
                        src="https://storage.googleapis.com/studiovalkenier/woutervalkenier.jpg" 
                        alt="Wouter Valkenier" 
                        className="w-full h-full object-cover transition-all duration-700"
                    />
                </div>
                <div>
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-1">Wouter Valkenier</h3>
                    <span className="text-sm font-mono uppercase tracking-widest text-gray-500 block">Architect / Stedenbouwkundige / Project Booster</span>
                </div>
            </motion.div>

            {/* Mijke de Kok */}
            <motion.div variants={itemVariants} className="flex flex-col gap-6 items-center text-center">
                 <div className="w-full aspect-[3/4] overflow-hidden bg-gray-100 max-w-sm">
                    <img 
                        src="https://storage.googleapis.com/studiovalkenier/MijkeValkenier-01klein%20(1)_wp_1600.jpg" 
                        alt="Mijke de Kok" 
                        className="w-full h-full object-cover transition-all duration-700"
                    />
                </div>
                <div>
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-1">Mijke de Kok</h3>
                    <span className="text-sm font-mono uppercase tracking-widest text-gray-500 block">Architect / Stedenbouwkundige</span>
                </div>
            </motion.div>

          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;