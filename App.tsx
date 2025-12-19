import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import ManifestoModal from './components/ManifestoModal';
import AboutSection from './components/AboutSection';
import TourSection from './components/TourSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { PROJECTS } from './constants';
import { Project } from './types';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);

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
          <div className="mb-16 md:mb-24 flex items-end justify-between border-b border-black/10 pb-8">
             <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Projecten</h2>
             <span className="hidden md:block text-sm font-mono text-gray-500">(2011 — 2024)</span>
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

        <AboutSection onOpenManifesto={() => setIsManifestoOpen(true)} />
        <TourSection />

      </main>

      <Footer />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <ManifestoModal isOpen={isManifestoOpen} onClose={() => setIsManifestoOpen(false)} />
    </div>
  );
};

export default App;