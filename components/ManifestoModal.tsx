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
            <X size={40} strokeWidth={1.5} />
          </button>

          <div className="min-h-screen w-full flex flex-col items-center py-24 px-6 md:px-12">
            <div className="max-w-3xl w-full space-y-32">
              
              {/* Section 1: The Foundation */}
              <motion.section variants={itemVariants} className="space-y-8">
                <span className="block text-xs font-mono text-studio-red uppercase tracking-[0.2em] mb-4">
                  01 — The Foundation
                </span>
                <h2 className="text-4xl md:text-7xl font-black text-black uppercase tracking-tighter leading-[0.9]">
                  Multidisciplinair<br />& Circulair
                </h2>
                <div className="w-full h-[1px] bg-black/10" />
                <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
                  Studio Valkenier is een multidisciplinair ontwerpbureau dat zich breed beweegt binnen stedelijk ontwerp, architectuur, interieurontwerp en conceptontwikkeling. Het verlengen van de levensduur van gebouwen en het verkleinen van de ecologische voetafdruk vormen de basis.
                </p>
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag) => (
                    <span key={tag} className="px-4 py-2 border border-black/10 rounded-full text-sm uppercase tracking-wider text-black hover:bg-black hover:text-white transition-colors duration-300 cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.section>

              {/* Section 2: The Method */}
              <motion.section variants={itemVariants} className="space-y-8">
                <span className="block text-xs font-mono text-studio-red uppercase tracking-[0.2em] mb-4">
                  02 — The Method
                </span>
                <h2 className="text-4xl md:text-7xl font-black text-black uppercase tracking-tighter leading-[0.9]">
                  Co-creatie
                </h2>
                <div className="w-full h-[1px] bg-black/10" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <p className="text-lg text-gray-600 font-light leading-relaxed">
                    Wij geloven dat ontwerpen worden verrijkt door samenwerking. Door een multidisciplinair team samen te stellen, kunnen we een gelaagd ontwerp creëren waarbij het geheel meer is dan de som der delen.
                    </p>
                    <blockquote className="border-l-2 border-studio-red pl-6 text-2xl md:text-3xl font-serif italic text-black leading-tight">
                    "Het omarmen van de schoonheid van imperfecties."
                    </blockquote>
                </div>
              </motion.section>

              {/* Section 3: The Specialty */}
              <motion.section variants={itemVariants} className="space-y-8">
                <span className="block text-xs font-mono text-studio-red uppercase tracking-[0.2em] mb-4">
                  03 — The Specialty
                </span>
                <h2 className="text-4xl md:text-7xl font-black text-black uppercase tracking-tighter leading-[0.9]">
                  Verloren<br />Ruimtes
                </h2>
                <div className="w-full h-[1px] bg-black/10" />
                <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
                  Gespecialiseerd in het creëren van kansen voor verloren ruimtes, in de stad en op het platteland. We experimenteren graag met ideeën en hebben de kracht om experimenten daadwerkelijk te realiseren.
                </p>
              </motion.section>

              {/* Footer CTA */}
              <motion.div variants={itemVariants} className="pt-12 pb-24 flex justify-center">
                <a 
                  href="mailto:info@studiovalkenier.nl"
                  className="group relative inline-flex items-center gap-4 px-8 py-4 bg-black text-white font-bold uppercase tracking-widest text-sm hover:bg-studio-red transition-all duration-300"
                >
                  Start een project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ManifestoModal;