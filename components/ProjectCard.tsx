import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';

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
    // Only enable hover behavior on devices that support hover (desktop)
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      setIsHovered(true);
      if (videoRef.current && project.videoPreview) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch((e) => console.log('Autoplay blocked', e));
      }
    }
  };

  const handleMouseLeave = () => {
    // Only disable hover behavior on devices that support hover
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      setIsHovered(false);
      if (videoRef.current && project.videoPreview) {
        videoRef.current.pause();
      }
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    // On touch devices (no hover), first click plays video, second click opens project
    const isTouch = typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches;
    
    if (isTouch) {
        if (!isHovered) {
            // First tap: Play video
            e.preventDefault();
            e.stopPropagation();
            setIsHovered(true);
            if (videoRef.current && project.videoPreview) {
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch((e) => console.log('Autoplay blocked', e));
            }
        } else {
            // Second tap: Open project
            onClick(project);
        }
    } else {
        // Desktop: Always open project (hover handles preview)
        onClick(project);
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
      onClick={handleClick}
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
          className="absolute inset-0 w-full h-full z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <video
            ref={videoRef}
            src={project.videoPreview}
            className="w-full h-full object-cover"
            muted
            playsInline
            loop
          />
        </motion.div>
      )}

      {/* Title Card */}
      <div className="absolute bottom-0 left-0 z-20 max-w-[85%]">
        <div className="bg-white inline-block px-5 py-3 shadow-sm transform md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight text-black leading-none">
            {project.title}
            </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;