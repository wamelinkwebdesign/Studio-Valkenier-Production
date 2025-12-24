import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Story } from '../types';
import { PROJECTS } from '../constants';

interface StoryModalProps {
  story: Story | null;
  onClose: () => void;
  onNavigateToProject: (projectId: string) => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ story, onClose, onNavigateToProject }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Lock body scroll
  useEffect(() => {
    if (story) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [story]);

  // Keyboard navigation for Lightbox & Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (lightboxIndex !== null) {
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'Escape') setLightboxIndex(null);
        } else if (story && e.key === 'Escape') {
            onClose();
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, story, onClose]); 

  // Separation of content: Images (Editorial Stream) vs Text (Footer Context)
  const { mediaContent, textContent, sidebarLinks, sidebarProjectLinks, allImages } = useMemo(() => {
    if (!story) return { mediaContent: [], textContent: [], sidebarLinks: [], sidebarProjectLinks: [], allImages: [] };
    
    const textBlocks: any[] = [];
    const imageBlocks: any[] = [];
    const links: any[] = [];
    const projects: any[] = [];
    const allImgs: string[] = [];

    // Add cover image as first image in lightbox
    if (story.coverImage) {
        allImgs.push(story.coverImage);
    }

    let imageCounter = allImgs.length;

    for (const block of story.content) {
        if (block.type === 'link') {
            links.push(block);
        } else if (block.type === 'project-link') {
            projects.push(block);
        } else if (block.type === 'image') {
            allImgs.push(block.value);
            imageBlocks.push({ ...block, globalIndex: imageCounter++ });
        } else {
            // Paragraphs, headers, quotes
            textBlocks.push(block);
        }
    }

    return { mediaContent: imageBlocks, textContent: textBlocks, sidebarLinks: links, sidebarProjectLinks: projects, allImages: allImgs };
  }, [story]);

  // Lightbox Navigation Helpers
  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % allImages.length : null));
  }, [lightboxIndex, allImages.length]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + allImages.length) % allImages.length : null));
  }, [lightboxIndex, allImages.length]);

  if (!story) return null;

  // Determine grid columns based on story ID
  const gridLayoutIds = [
    'schoonschip-japan',
    'schoonschip-archnl',
    'schoonschip-houtblad',
    'sloterdijk-plan-ams',
    'stadstimmertuin-archnl',
    'verticale-tuin'
  ];
  const isTwoColumnLayout = gridLayoutIds.includes(story.id);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-white flex flex-col md:flex-row"
      >
        {/* --- LEFT SIDEBAR (Meta & Actions) --- */}
        <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full md:w-[35%] lg:w-[30%] h-auto md:h-full bg-white border-r border-black/5 flex flex-col z-20 overflow-y-auto no-scrollbar relative shrink-0"
        >
             <div className="p-6 md:p-12 flex flex-col min-h-full justify-between gap-12">
                
                {/* Top Nav */}
                <div className="flex justify-between items-center">
                    <button 
                        onClick={onClose}
                        className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-studio-red transition-colors"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Terug
                    </button>
                    <button onClick={onClose} className="md:hidden p-2">
                        <X size={24} />
                    </button>
                </div>

                {/* Title & Meta */}
                <div>
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-studio-red mb-6">
                        <span>{story.source}</span>
                        {story.date && (
                            <>
                                <span className="w-1 h-1 bg-studio-red rounded-full" />
                                <span>{story.date}</span>
                            </>
                        )}
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-black mb-8 break-words hyphens-auto">
                        {story.title}
                    </h1>
                </div>

                {/* Sidebar Actions (Links) - Hidden on Mobile */}
                <div className="hidden md:flex flex-col gap-6 mt-auto">
                    {/* External Links */}
                    {sidebarLinks.map((link, i) => (
                        <a 
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between p-6 bg-gray-50 hover:bg-black hover:text-white transition-all duration-300 border border-gray-100"
                        >
                            <span className="text-sm font-bold uppercase tracking-wider">{link.value}</span>
                            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                    ))}

                    {/* Project Links */}
                    {sidebarProjectLinks.map((link, i) => {
                        const relatedProject = PROJECTS.find(p => p.id === link.projectId);
                        return (
                            <button
                                key={i}
                                onClick={() => link.projectId && onNavigateToProject(link.projectId)}
                                className="group relative w-full aspect-[16/9] overflow-hidden bg-black text-white text-left"
                            >
                                {relatedProject && (
                                    <img 
                                        src={relatedProject.thumbnail} 
                                        alt={relatedProject.title}
                                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500 scale-100 group-hover:scale-105 transition-transform"
                                    />
                                )}
                                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                                    <span className="text-xs font-bold uppercase tracking-widest opacity-80">Gerelateerd Project</span>
                                    <div className="flex items-end justify-between">
                                        <span className="text-xl font-black uppercase tracking-tighter">{relatedProject?.title || link.value}</span>
                                        <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>
             </div>
        </motion.div>

        {/* --- RIGHT CONTENT --- */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-full md:w-[65%] lg:w-[70%] h-full overflow-y-auto no-scrollbar relative bg-white"
        >
             {/* Desktop Close Button */}
             <button 
                onClick={onClose}
                className="fixed top-6 right-6 z-50 p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white hover:text-black transition-all duration-300 hidden md:block text-black mix-blend-difference"
             >
                <X size={32} strokeWidth={1.5} />
             </button>

             {/* Hero Image (Clickable for Lightbox - Index 0) - Only shown if NOT 2-column layout */}
             {!isTwoColumnLayout && (
                 <div 
                    className="w-full relative cursor-zoom-in group"
                    onClick={() => setLightboxIndex(0)}
                 >
                     <img src={story.coverImage} alt={story.title} className="w-full h-auto block" />
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                 </div>
             )}

             {/* Editorial Image Stream (Stacked or Grid) */}
             <div className={`w-full grid gap-4 mt-4 ${isTwoColumnLayout ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                
                {/* If 2-column layout, include cover image as first item in grid */}
                {isTwoColumnLayout && (
                    <motion.div
                        key="cover-grid"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="w-full relative cursor-zoom-in group"
                        onClick={() => setLightboxIndex(0)}
                    >
                        <img src={story.coverImage} alt={story.title} className="w-full h-auto block" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </motion.div>
                )}

                {mediaContent.map((img: any, idx: number) => (
                        <motion.div
                        key={img.globalIndex}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="w-full relative cursor-zoom-in group"
                        onClick={() => setLightboxIndex(img.globalIndex)}
                    >
                        <img src={img.value} alt="" className="w-full h-auto block" />
                        {/* Caption Overlay */}
                        {img.caption && (
                            <div className="absolute bottom-0 left-0 z-20 max-w-[85%]">
                                <div className="bg-white inline-block px-4 py-2 shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="text-xs font-bold uppercase tracking-widest text-black leading-none">
                                        {img.caption}
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </motion.div>
                ))}
            </div>

             {/* Text Content Area (Bottom) */}
             {(textContent.length > 0 || sidebarLinks.length > 0 || sidebarProjectLinks.length > 0) && (
                 <div className="max-w-4xl mx-auto px-6 py-16 md:px-16 md:py-24">
                     {/* Text Blocks */}
                     {textContent.length > 0 && (
                         <div className="flex flex-col gap-12 mb-20">
                            {textContent.map((block: any, i: number) => {
                                const variants = {
                                    hidden: { y: 30, opacity: 0 },
                                    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
                                };

                                if (block.type === 'header') {
                                    return (
                                        <motion.h2 
                                            key={i}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true }}
                                            variants={variants}
                                            className="text-3xl md:text-5xl font-black uppercase tracking-tight mt-8"
                                        >
                                            {block.value}
                                        </motion.h2>
                                    )
                                }

                                if (block.type === 'quote') {
                                     return (
                                        <motion.blockquote 
                                            key={i}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true }}
                                            variants={variants}
                                            className="text-3xl md:text-5xl font-serif italic text-center leading-tight my-12 text-studio-black"
                                        >
                                            "{block.value}"
                                        </motion.blockquote>
                                    )
                                }

                                // Paragraph
                                return (
                                    <motion.p 
                                        key={i}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={variants}
                                        className="text-xl md:text-2xl font-serif leading-relaxed text-gray-800"
                                    >
                                        {block.value}
                                    </motion.p>
                                )
                            })}
                         </div>
                     )}

                     {/* Mobile Only Links Section */}
                     <div className="md:hidden flex flex-col gap-8 pt-12 border-t border-gray-100">
                        {/* External Links */}
                        {sidebarLinks.map((link, i) => (
                            <a 
                                key={`mobile-link-${i}`}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between p-6 bg-gray-50 border border-gray-100 active:bg-black active:text-white transition-colors"
                            >
                                <span className="text-sm font-bold uppercase tracking-wider">{link.value}</span>
                                <ArrowUpRight size={20} />
                            </a>
                        ))}

                        {/* Project Links */}
                        {sidebarProjectLinks.map((link, i) => {
                            const relatedProject = PROJECTS.find(p => p.id === link.projectId);
                            return (
                                <button
                                    key={`mobile-project-${i}`}
                                    onClick={() => link.projectId && onNavigateToProject(link.projectId)}
                                    className="group relative w-full aspect-[16/9] overflow-hidden bg-black text-white text-left"
                                >
                                    {relatedProject && (
                                        <img 
                                            src={relatedProject.thumbnail} 
                                            alt={relatedProject.title}
                                            className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity"
                                        />
                                    )}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                                        <span className="text-xs font-bold uppercase tracking-widest opacity-80">Gerelateerd Project</span>
                                        <div className="flex items-end justify-between">
                                            <span className="text-xl font-black uppercase tracking-tighter">{relatedProject?.title || link.value}</span>
                                            <ArrowRight size={24} />
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                     </div>
                 </div>
             )}

        </motion.div>

        {/* --- LIGHTBOX OVERLAY --- */}
        <AnimatePresence>
            {lightboxIndex !== null && (
                <motion.div
                    key="lightbox"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[200] bg-white flex items-center justify-center"
                    onClick={() => setLightboxIndex(null)}
                >
                    {/* Close Button */}
                    <button 
                        onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
                        className="absolute top-6 right-6 text-black hover:text-studio-red transition-colors z-50 p-4 hover:rotate-90 duration-300"
                    >
                        <X size={40} strokeWidth={1.5} />
                    </button>
                    
                    {/* Previous Button */}
                    <button
                        onClick={prevImage}
                        className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-black/30 hover:text-black z-50 p-4 transition-colors hidden md:block"
                    >
                        <ChevronLeft size={64} strokeWidth={1} />
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={nextImage}
                        className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-black/30 hover:text-black z-50 p-4 transition-colors hidden md:block"
                    >
                        <ChevronRight size={64} strokeWidth={1} />
                    </button>

                    {/* Content Area */}
                    <div className="relative w-full h-full flex items-center justify-center p-4 md:p-24"> 
                        <motion.div 
                            key={lightboxIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="relative max-w-full max-h-full flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()} 
                        >
                            <img 
                                src={allImages[lightboxIndex]} 
                                className="max-w-full max-h-full object-contain shadow-2xl select-none" 
                                alt="" 
                            />
                        </motion.div>
                    </div>

                    {/* Counter */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-black/50 font-mono text-sm tracking-widest">
                        {lightboxIndex + 1} / {allImages.length}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

      </motion.div>
    </AnimatePresence>
  );
};

export default StoryModal;