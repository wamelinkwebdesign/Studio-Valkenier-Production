import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import ManifestoModal from './components/ManifestoModal';
import BookingModal from './components/BookingModal';
import AboutSection from './components/AboutSection';
import TourSection from './components/TourSection';
import StoriesSection from './components/StoriesSection';
import StoryModal from './components/StoryModal';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { PROJECTS } from './constants';
import { Project, Story } from './types';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);
  
  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<'tour' | 'lecture'>('tour');

  const handleOpenBooking = (type: 'tour' | 'lecture') => {
    setBookingType(type);
    setIsBookingOpen(true);
  };

  const handleNavigateToProject = (projectId: string) => {
    const project = PROJECTS.find(p => p.id === projectId);
    if (project) {
      setSelectedStory(null);
      setTimeout(() => {
          setSelectedProject(project);
      }, 100); // Small delay to allow smoother transition
    }
  };

  // Mosaic Pattern Logic for 6-column grid to achieve 2-3-2 layout
  const getMosaicClass = (index: number) => {
    // Pattern cycle of 7 items
    const position = index % 7;

    // Row 1: 2 items (span 3 cols each)
    if (position === 0 || position === 1) {
        return "md:col-span-3 md:row-span-1";
    }
    
    // Row 2: 3 items (span 2 cols each)
    if (position === 2 || position === 3 || position === 4) {
        return "md:col-span-2 md:row-span-1";
    }

    // Row 3: 2 items (span 3 cols each)
    // Covers indices 5 and 6
    return "md:col-span-3 md:row-span-1";
  };

  return (
    <div className="bg-white min-h-screen text-black selection:bg-black selection:text-white">
      <CustomCursor />
      <Header onOpenManifesto={() => setIsManifestoOpen(true)} />
      
      <main>
        <Hero />
        
        <section id="work" className="w-full px-4 py-24 md:px-12 md:py-32">
          <div className="mb-16 md:mb-24 flex items-end justify-between">
             <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Projecten</h2>
          </div>

          {/* Mosaic Grid Container - 6 columns for 2-3-2 layout */}
          <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[300px] md:auto-rows-[40vh] gap-1 md:gap-2">
            {PROJECTS.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={setSelectedProject}
                index={index}
                className={getMosaicClass(index)}
              />
            ))}
          </div>
        </section>

        <StoriesSection onSelectStory={setSelectedStory} />
        <AboutSection />
        <TourSection onOpenBooking={handleOpenBooking} />

      </main>

      <Footer />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <StoryModal 
        story={selectedStory} 
        onClose={() => setSelectedStory(null)} 
        onNavigateToProject={handleNavigateToProject}
      />
      <ManifestoModal isOpen={isManifestoOpen} onClose={() => setIsManifestoOpen(false)} />
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        initialType={bookingType}
      />
    </div>
  );
};

export default App;