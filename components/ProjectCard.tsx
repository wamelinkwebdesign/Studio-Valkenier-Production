import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { Play } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  index: number;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, index, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && project.videoPreview) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((e) => console.log('Autoplay blocked', e));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && project.videoPreview) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      className={`relative w-full h-full overflow-hidden group bg-gray-100 ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
    >
      {/* Image Thumbnail */}
      <img
        src={project.thumbnail}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Video Preview Overlay */}
      {project.videoPreview && (
        <motion.div
          className="absolute inset-0 w-full h-full z-10 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <video
            ref={videoRef}
            src={project.videoPreview}
            className="w-full h-full object-cover opacity-80"
            muted
            playsInline
            loop
          />
        </motion.div>
      )}

      {/* Info Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8 bg-gradient-to-t from-white/80 via-white/10 to-transparent opacity-100 transition-all duration-300">
        <div className="transform md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-xl md:text-3xl font-bold uppercase tracking-tight text-black mb-2 leading-none">
            {project.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-[10px] md:text-xs uppercase tracking-widest text-gray-600">
                <span>{project.client}</span>
            </div>
        </div>
      </div>

      {/* Play Icon - Mobile Visual Cue (Only if video exists) */}
      {project.videoPreview && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:hidden z-20">
            <div className="w-12 h-12 bg-black/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-black/20">
               <Play className="w-5 h-5 text-black fill-black" />
            </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectCard;