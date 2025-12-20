import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState<number | null>(null);

  // Construct unified media list for carousel
  const allMedia = useMemo(() => {
    if (!project) return [];
    const media: { type: 'video' | 'image', src: string }[] = [];
    
    // If there is a full video, it goes first
    if (project.videoFull) {
        media.push({ type: 'video', src: project.videoFull });
    }

    // Add all images
    if (project.images) {
        project.images.forEach(img => media.push({ type: 'image', src: img }));
    }

    return media;
  }, [project]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (project || currentMediaIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project, currentMediaIndex]);

  // Carousel Navigation Handlers
  const nextMedia = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentMediaIndex === null) return;
    setCurrentMediaIndex((prev) => (prev !== null ? (prev + 1) % allMedia.length : null));
  }, [currentMediaIndex, allMedia.length]);

  const prevMedia = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentMediaIndex === null) return;
    setCurrentMediaIndex((prev) => (prev !== null ? (prev - 1 + allMedia.length) % allMedia.length : null));
  }, [currentMediaIndex, allMedia.length]);

  // Swipe Logic
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  // Keyboard navigation
  useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
          if (currentMediaIndex !== null) {
              if (e.key === 'ArrowRight') nextMedia();
              if (e.key === 'ArrowLeft') prevMedia();
              if (e.key === 'Escape') setCurrentMediaIndex(null);
          } else if (project && e.key === 'Escape') {
              onClose();
          }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentMediaIndex, project, onClose, nextMedia, prevMedia]);

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
        key="modal-content"
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
                        <ArrowLeft size={14} /> Terug
                    </button>
                    <h1 className="text-5xl font-black uppercase tracking-tighter leading-[0.9]">
                        {project.title}
                    </h1>
                </div>

                {/* Main Media Stream Wrapper */}
                <div className="flex flex-col w-full">
                    
                    {/* HERO MEDIA - Full bleed on top */}
                    {allMedia.length > 0 && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            role="button"
                            className="w-full aspect-video md:aspect-auto md:h-auto object-cover md:mb-12 mt-8 md:mt-0 group relative"
                            onClick={() => setCurrentMediaIndex(0)}
                            data-cursor-text="BEKIJKEN"
                        >
                             {allMedia[0].type === 'video' ? (
                                 <video 
                                    src={allMedia[0].src} 
                                    className="w-full h-full object-cover" 
                                    autoPlay 
                                    muted 
                                    loop 
                                    playsInline 
                                 />
                             ) : (
                                 <img 
                                    src={allMedia[0].src} 
                                    className="w-full h-full object-cover" 
                                    alt={project.title}
                                 />
                             )}
                             {/* Hover indication */}
                             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                        </motion.div>
                    )}

                    {/* Mobile Metadata & Description */}
                    <div className="md:hidden px-6 my-12">
                        <p className="text-base text-black leading-relaxed whitespace-pre-wrap">
                           {renderDescription(project.description)}
                        </p>
                    </div>

                    {/* Image Stream Grid - Start from index 1 since 0 is Hero */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-y-24 gap-x-8 px-6 md:px-12 pb-12 md:pb-32">
                        {allMedia.slice(1).map((media, relativeIdx) => {
                             // Correct global index is relativeIdx + 1
                             const globalIndex = relativeIdx + 1;

                             // Pattern Logic based on relative index to maintain layout
                             // 0: Full Width
                             // 1: Side by side (Left)
                             // 2: Side by side (Right)
                             // 3: Full Width Portrait
                             const patternIndex = relativeIdx % 4;
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
                                    key={globalIndex} 
                                    initial={{ y: 50, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true, margin: "-5%" }}
                                    transition={{ duration: 0.6 }}
                                    role="button"
                                    className={`w-full ${spanClass} group`}
                                    onClick={() => setCurrentMediaIndex(globalIndex)}
                                    data-cursor-text="BEKIJKEN"
                                 >
                                     <div className="relative overflow-hidden w-full h-full">
                                        {media.type === 'video' ? (
                                             <video src={media.src} className={`w-full ${aspectClass} transition-transform duration-700 group-hover:scale-[1.02]`} muted loop playsInline />
                                        ) : (
                                             <img src={media.src} className={`w-full ${aspectClass} transition-transform duration-700 group-hover:scale-[1.02]`} alt="" loading="lazy" />
                                        )}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
                                     </div>
                                 </motion.div>
                             )
                        })}
                    </div>

                    {/* Mobile Bottom Back Link */}
                    <div className="md:hidden w-full flex flex-col items-center justify-center pb-24 pt-4">
                        <button 
                            onClick={onClose}
                            className="group relative flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:text-studio-red transition-colors"
                        >
                            <ArrowLeft size={16} />
                            Terug
                        </button>
                    </div>
                </div>
            </div>

        </div>
      </motion.div>

      {/* Fullscreen Carousel Overlay */}
      {currentMediaIndex !== null && (
        <motion.div
            key="fullscreen-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-white flex items-center justify-center"
            onClick={() => setCurrentMediaIndex(null)} // Close on background click
        >
            {/* Close Button */}
            <button 
                onClick={(e) => { e.stopPropagation(); setCurrentMediaIndex(null); }}
                className="absolute top-6 right-6 text-black hover:text-studio-red transition-colors z-50 p-4 hover:rotate-90 duration-300"
            >
                <X size={40} strokeWidth={1.5} />
            </button>
            
            {/* Previous Button */}
            <button
                onClick={prevMedia}
                className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-black/30 hover:text-black z-50 p-4 transition-colors hidden md:block"
            >
                <ChevronLeft size={64} strokeWidth={1} />
            </button>

            {/* Next Button */}
            <button
                onClick={nextMedia}
                className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-black/30 hover:text-black z-50 p-4 transition-colors hidden md:block"
            >
                <ChevronRight size={64} strokeWidth={1} />
            </button>

            {/* Content Area */}
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-24"> 
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={currentMediaIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="relative max-w-full max-h-full flex items-center justify-center touch-none"
                        onClick={(e) => e.stopPropagation()} // Stop click bubbling to avoid closing when tapping image
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                nextMedia();
                            } else if (swipe > swipeConfidenceThreshold) {
                                prevMedia();
                            }
                        }}
                    >
                         {allMedia[currentMediaIndex].type === 'video' ? (
                            <video 
                                src={allMedia[currentMediaIndex].src} 
                                className="max-w-full max-h-full object-contain shadow-2xl" 
                                controls 
                                autoPlay 
                                playsInline
                            />
                        ) : (
                            <img 
                                src={allMedia[currentMediaIndex].src} 
                                className="max-w-full max-h-full object-contain shadow-2xl select-none" 
                                alt="Fullscreen view" 
                                draggable={false}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-black/50 font-mono text-sm tracking-widest">
                {currentMediaIndex + 1} / {allMedia.length}
            </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;