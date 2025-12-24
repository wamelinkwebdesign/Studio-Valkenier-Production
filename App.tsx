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

  // Mosaic Pattern Logic for 4-column grid
  const getMosaicClass = (index: number) => {
    // Defines a repeating pattern for the grid items
    // 0: Large Square (2x2)
    // 1: Tall Vertical (1x2)
    // 2: Small Box (1x1)
    // 3: Small Box (1x1)
    // 4: Wide Horizontal (2x1)
    // 5: Wide Horizontal (2x1)
    const patterns = [
      "md:col-span-2 md:row-span-2", 
      "md:col-span-1 md:row-span-2", 
      "md:col-span-1 md:row-span-1", 
      "md:col-span-1 md:row-span-1", 
      "md:col-span-2 md:row-span-1", 
      "md:col-span-2 md:row-span-1"
    ];
    return patterns[index % patterns.length];
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

          {/* Mosaic Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] md:auto-rows-[40vh] gap-1 md:gap-2">
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
        <AboutSection onOpenManifesto={() => setIsManifestoOpen(true)} />
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