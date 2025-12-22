import React, { useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManifestoModal: React.FC<ManifestoModalProps> = ({ isOpen, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    }
  };

  const imageVariants: Variants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut" }
    }
  };

  const tags = ["Circulariteit", "Sociale Impact", "Hergebruik", "Niet-toxisch"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md overflow-y-auto"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="fixed top-6 right-6 md:top-12 md:right-12 z-50 text-black hover:rotate-90 transition-transform duration-300 p-2"
          >
            <X size={40} strokeWidth={1.5} className="text-black" />
          </button>

          <div className="min-h-screen w-full flex flex-col items-center py-24 px-6 md:px-12">
            <div className="max-w-7xl w-full space-y-32">
              
              {/* Section 1: The Foundation */}
              <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                <div className="space-y-8 order-2 md:order-1">
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-black uppercase tracking-tighter leading-[0.9]">
                    Multidisciplinair<br />& Circulair
                  </h2>
                  <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
                    Studio Valkenier is een multidisciplinair ontwerpbureau dat zich breed beweegt binnen stedelijk ontwerp, architectuur, interieurontwerp en conceptontwikkeling. Het verlengen van de levensduur van gebouwen en het verkleinen van de ecologische voetafdruk vormen de basis.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {tags.map((tag) => (
                      <span key={tag} className="px-4 py-2 border border-black/10 rounded-full text-sm uppercase tracking-wider text-black hover:bg-black hover:text-white transition-colors duration-300 cursor-default">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="order-1 md:order-2 w-full h-[400px] md:h-[600px] overflow-hidden">
                    <motion.img 
                        variants={imageVariants}
                        src="https://storage.googleapis.com/studiovalkenier/schoonschip/Funda%20-%20Duurzaam%20Wonen%20-%20Schoonschip%20-%20door%20JurreRompaE71A4038_wp_1600.jpg"
                        alt="Foundation"
                        className="w-full h-full object-cover"
                    />
                </div>
              </motion.section>

              {/* Section 2: The Method */}
              <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                <div className="order-1 w-full h-[400px] md:h-[600px] overflow-hidden">
                    <motion.img 
                        variants={imageVariants}
                        src="https://storage.googleapis.com/studiovalkenier/schoonschip/01.jpg"
                        alt="Co-creatie"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="space-y-8 order-2">
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-black uppercase tracking-tighter leading-[0.9]">
                    Co-creatie
                  </h2>
                  <div className="flex flex-col gap-8">
                      <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
                      Wij geloven dat ontwerpen worden verrijkt door samenwerking. Door een multidisciplinair team samen te stellen, kunnen we een gelaagd ontwerp creëren waarbij het geheel meer is dan de som der delen.
                      </p>
                      <blockquote className="border-l-2 border-studio-red pl-6 text-xl md:text-3xl font-serif italic text-black leading-tight">
                      "Het omarmen van de schoonheid van imperfecties."
                      </blockquote>
                  </div>
                </div>
              </motion.section>

              {/* Section 3: The Specialty */}
              <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                <div className="space-y-8 order-2 md:order-1">
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-black uppercase tracking-tighter leading-[0.9]">
                    Verloren<br />Ruimtes
                  </h2>
                  <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
                    Gespecialiseerd in het creëren van kansen voor verloren ruimtes, in de stad en op het platteland. We experimenteren graag met ideeën en hebben de kracht om experimenten daadwerkelijk te realiseren.
                  </p>
                </div>
                <div className="order-1 md:order-2 w-full h-[400px] md:h-[600px] overflow-hidden">
                    <motion.img 
                        variants={imageVariants}
                        src="https://storage.googleapis.com/studiovalkenier/schoonschip/Drone%20Addicts%20-%20Blonkfilms%20-%20Funda-2_wp_1600.jpg"
                        alt="Verloren Ruimtes"
                        className="w-full h-full object-cover"
                    />
                </div>
              </motion.section>

              {/* Footer CTA & Back Button */}
              <motion.div variants={itemVariants} className="pt-12 pb-24 flex flex-col items-center gap-12">
                <a 
                  href="mailto:info@studiovalkenier.nl"
                  className="group relative inline-flex items-center gap-4 px-8 py-4 bg-black text-white font-bold uppercase tracking-widest text-sm hover:bg-studio-red transition-all duration-300"
                >
                  Start een project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Back Link */}
                <button 
                  onClick={onClose}
                  className="group relative text-sm font-bold uppercase tracking-widest text-black/50 hover:text-black transition-colors"
                >
                  <span className="relative z-10">Terug</span>
                  <span className="absolute left-0 bottom-0 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </button>
              </motion.div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ManifestoModal;