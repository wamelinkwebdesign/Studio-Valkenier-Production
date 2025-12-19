import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../constants';

interface ServiceColumnProps {
  number: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaLink?: string;
  videoUrl?: string;
  className?: string;
}

const ServiceColumn: React.FC<ServiceColumnProps> = ({ number, title, description, ctaLabel, ctaLink = "mailto:info@studiovalkenier.nl", videoUrl, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative flex flex-col border-t border-black pt-6 lg:border-t-0 lg:border-l lg:pl-10 transition-colors duration-500 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Video Layer */}
      <AnimatePresence>
        {isHovered && videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 z-0 h-full w-full overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/60 z-10" />
            <video 
              src={videoUrl} 
              className="w-full h-full object-cover"
              autoPlay 
              muted 
              loop 
              playsInline 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Layer */}
      <div className={`relative z-20 flex flex-col h-full justify-between transition-colors duration-300 ${isHovered ? 'text-white' : 'text-black'}`}>
        <div>
           {/* Number - Always Studio Red */}
           <span className="font-mono text-xs text-studio-red mb-6 block relative z-30">{number}</span>
           
           <h3 className={`text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 transition-colors duration-300`}>
             {title}
           </h3>
           
           <p className={`text-lg leading-relaxed max-w-sm mb-12 transition-colors duration-300 ${isHovered ? 'text-gray-200' : 'text-gray-600'}`}>
             {description}
           </p>
        </div>

        <div>
           <a 
             href={ctaLink}
             className={`group inline-flex items-center gap-2 text-xl md:text-2xl font-black uppercase tracking-tighter border-b-2 pb-1 transition-all duration-300 ${isHovered ? 'border-white text-white' : 'border-black text-black hover:text-studio-red hover:border-studio-red'}`}
           >
             {ctaLabel}
             <ArrowUpRight className="w-6 h-6 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
           </a>
        </div>
      </div>
    </div>
  );
};

const TourSection: React.FC = () => {
  // Find video assets for previews
  const toursVideo = PROJECTS.find(p => p.id === 'hannekes')?.videoPreview; 
  const lecturesVideo = PROJECTS.find(p => p.id === 'schoonschip')?.videoPreview; // Schoonschip shows innovation

  return (
    <section 
      className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-white text-black border-t border-black cursor-default"
    >
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 max-w-[1800px] mx-auto">
        
        {/* COLUMN 1: Headline & Address */}
        <div className="flex flex-col h-full justify-between">
            <div className="mb-16">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
                    Meer <br/>Weten 
                    <span className="block font-serif italic text-6xl md:text-8xl lg:text-9xl text-studio-red my-2">&</span>
                    Een Tour <br/>Boeken
                </h2>
                <p className="text-lg md:text-xl font-medium leading-relaxed max-w-md mt-12">
                   Wil je dieper de verhalen induiken? Elk project draagt een geschiedenis van gemeenschap, ontwerp en experiment.
                </p>
            </div>

            {/* Field Office Block (Integrated into grid) */}
            <div className="flex flex-col items-start mt-auto">
                <span className="text-xs font-mono text-studio-red uppercase tracking-[0.2em] mb-4">
                    Field Office
                </span>
                <p className="text-xl font-bold uppercase tracking-tight leading-tight mb-8">
                    Kastrupstraat 11g<br/>
                    1043 CR Amsterdam
                </p>
                <a 
                   href="https://www.google.com/maps/search/?api=1&query=Studio+Valkenier+Amsterdam"
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="group relative inline-flex items-center justify-center bg-black text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-studio-red transition-colors duration-300"
                >
                    <span>Locatie Bekijken</span>
                    <ArrowUpRight className="ml-2 w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </a>
            </div>
        </div>

        {/* COLUMN 2: Tours */}
        <ServiceColumn 
            number="01"
            title="Tours"
            description="Studio Valkenier biedt persoonlijke rondleidingen onder leiding van initiatiefnemers, waarbij je een uniek kijkje achter de schermen krijgt: van eerste schets tot gerealiseerde plek."
            ctaLabel="Meer informatie"
            videoUrl={toursVideo}
        />

        {/* COLUMN 3: Lectures */}
        <ServiceColumn 
            number="02"
            title="Lezingen"
            description="De partners van Studio Valkenier zijn tevens ervaren keynote speakers. Voor lezingen of samenwerkingen delen zij graag hun visie op duurzaam ontwerp, circulair leven en rebelse architectuur."
            ctaLabel="Boek een lezing"
            videoUrl={lecturesVideo}
        />

      </div>
    </section>
  );
};

export default TourSection;