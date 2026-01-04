import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import StoryCard from './StoryCard';
import { STORIES } from '../constants';
import { Story } from '../types';

interface StoriesSectionProps {
  onSelectStory: (story: Story) => void;
}

const StoriesSection: React.FC<StoriesSectionProps> = ({ onSelectStory }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [isInfiniteMode, setIsInfiniteMode] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
    setIsInfiniteMode(true);
  };

  useEffect(() => {
    if (!isInfiniteMode) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < STORIES.length) {
          setVisibleCount((prev) => prev + 6);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [isInfiniteMode, visibleCount]);

  return (
    <section id="stories" className="w-full px-6 py-24 md:px-12 md:py-32 bg-[#fafafa]">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
            >
                Stories
            </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {STORIES.slice(0, visibleCount).map((story, index) => (
                <StoryCard 
                    key={story.id} 
                    story={story} 
                    onClick={onSelectStory} 
                    index={index} 
                />
            ))}
        </div>

        {/* Sentinel for infinite scroll */}
        {isInfiniteMode && visibleCount < STORIES.length && (
            <div ref={observerTarget} className="h-10 w-full mt-8" />
        )}

        {/* Load More Button */}
        {!isInfiniteMode && visibleCount < STORIES.length && (
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mt-16 md:mt-24 flex justify-center"
            >
                <button
                    onClick={handleLoadMore}
                    className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:opacity-60 transition-opacity duration-300"
                >
                    <span className="border-b border-black group-hover:border-black/60 pb-1 transition-colors">Meer laden</span>
                    <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </button>
            </motion.div>
        )}
      </div>
    </section>
  );
};

export default StoriesSection;