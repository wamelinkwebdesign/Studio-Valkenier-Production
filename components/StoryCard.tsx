import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Story } from '../types';

interface StoryCardProps {
  story: Story;
  onClick: (story: Story) => void;
  index: number;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, onClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
      onClick={() => onClick(story)}
      className="group relative flex flex-col gap-4 cursor-pointer"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <img 
            src={story.coverImage} 
            alt={story.title} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        
        {/* Hover Overlay Icon */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <ArrowUpRight size={20} className="text-black" />
             </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-400">
            <span>{story.source}</span>
            {story.date && (
                <>
                    <span className="w-1 h-1 bg-gray-400 rounded-full" />
                    <span>{story.date}</span>
                </>
            )}
        </div>
        <h3 className="text-2xl font-serif font-bold leading-tight group-hover:text-studio-red transition-colors duration-300">
            {story.title}
        </h3>
        <span className="text-sm font-bold uppercase tracking-widest border-b border-transparent group-hover:border-black w-fit transition-all duration-300 mt-2">
            Lees Artikel
        </span>
      </div>
    </motion.div>
  );
};

export default StoryCard;