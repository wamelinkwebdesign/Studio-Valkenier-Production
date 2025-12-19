import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const MetaRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-center justify-between py-3 border-b border-black/10 last:border-0 font-mono text-xs uppercase tracking-wider">
    <span className="text-gray-500">{label}</span>
    <span className="text-black">{value}</span>
  </div>
);

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  // Simple parser to handle bold text marked with **text**
  const renderDescription = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
       if (part.startsWith('**') && part.endsWith('**')) {
           return <strong key={index} className="font-bold text-black">{part.slice(2, -2)}</strong>;
       }
       return part;
    });
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[100] bg-white overflow-y-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen">
            
            {/* --- LEFT COLUMN (Desktop Sticky Sidebar) --- */}
            <div className="hidden md:flex md:col-span-4 h-screen sticky top-0 flex-col justify-between p-12 border-r border-black/5 bg-white z-10">
                <div className="flex flex-col">
                    <button 
                        onClick={onClose} 
                        className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-studio-red transition-colors mb-24 w-fit"
                    >
                        <ArrowLeft size={16} />
                        Terug naar projecten
                    </button>
                    
                    <div>
                        <motion.h1 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-12 break-words"
                        >
                            {project.title}
                        </motion.h1>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col border-t border-black mb-12"
                        >
                            <MetaRow label="Klant" value={project.client} />
                            <MetaRow label="Jaar" value={project.year} />
                            {/* Role removed */}
                        </motion.div>

                        <motion.p 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg text-black font-normal leading-relaxed whitespace-pre-wrap"
                        >
                           {renderDescription(project.description)}
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* --- RIGHT COLUMN (Media Stream) --- */}
            <div className="col-span-1 md:col-span-8 bg-white overflow-x-hidden">
                
                {/* Mobile Header (Title + Back) */}
                <div className="md:hidden p-6 pt-8 pb-0 flex flex-col gap-6">
                    <button onClick={onClose} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                        <ArrowLeft size={14} /> Back
                    </button>
                    <h1 className="text-5xl font-black uppercase tracking-tighter leading-[0.9]">
                        {project.title}
                    </h1>
                </div>

                {/* Main Media Stream Wrapper */}
                <div className="flex flex-col w-full">
                    
                    {/* HERO MEDIA - Full bleed on top */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-full aspect-video md:aspect-auto md:h-auto object-cover md:mb-12 mt-8 md:mt-0"
                    >
                         {project.videoFull ? (
                             <video 
                                src={project.videoFull} 
                                className="w-full h-full object-cover" 
                                autoPlay 
                                muted 
                                loop 
                                playsInline 
                             />
                         ) : (
                             <img 
                                src={project.images?.[0] || project.thumbnail} 
                                className="w-full h-full object-cover" 
                                alt={project.title}
                             />
                         )}
                    </motion.div>

                    {/* Mobile Metadata & Description */}
                    <div className="md:hidden px-6 my-12">
                        <div className="flex flex-col border-t border-b border-black/10 mb-8">
                            <MetaRow label="Klant" value={project.client} />
                            <MetaRow label="Jaar" value={project.year} />
                        </div>
                        <p className="text-base text-black leading-relaxed whitespace-pre-wrap">
                           {renderDescription(project.description)}
                        </p>
                    </div>

                    {/* Image Stream Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-y-24 gap-x-8 px-6 md:px-12 pb-24 md:pb-32">
                        {project.images?.slice(project.videoFull ? 0 : 1).map((img, idx) => {
                             // Pattern Logic:
                             // 0: Full Width
                             // 1: Side by side (Left)
                             // 2: Side by side (Right)
                             // 3: Full Width Portrait
                             const patternIndex = idx % 4;
                             let spanClass = "md:col-span-2"; // Default Full
                             let aspectClass = "";

                             if (patternIndex === 1 || patternIndex === 2) {
                                 spanClass = "md:col-span-1";
                                 aspectClass = "aspect-square object-cover";
                             } else if (patternIndex === 3) {
                                 spanClass = "md:col-span-2";
                                 aspectClass = "aspect-[4/5] object-cover"; // Portrait feel
                             } else {
                                 // Full width default
                                 aspectClass = "w-full h-auto object-cover";
                             }
                             
                             return (
                                 <motion.div 
                                    key={idx} 
                                    initial={{ y: 50, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true, margin: "-5%" }}
                                    transition={{ duration: 0.6 }}
                                    className={`w-full ${spanClass}`}
                                 >
                                     <img src={img} className={`w-full ${aspectClass}`} alt="" loading="lazy" />
                                 </motion.div>
                             )
                        })}
                    </div>
                </div>
            </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;