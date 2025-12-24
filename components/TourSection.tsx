import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { PROJECTS } from '../constants';

interface ServiceColumnProps {
  number: string;
  title: string;
  description: string;
  ctaLabel: string;
  onClick: () => void;
  videoUrl?: string;
  className?: string;
  pdfUrl?: string;
  pdfLabel?: string;
}

const ServiceColumn: React.FC<ServiceColumnProps> = ({ number, title, description, ctaLabel, onClick, videoUrl, className = "", pdfUrl, pdfLabel }) => {
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

        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
           <button 
             onClick={onClick}
             className={`group inline-flex items-center gap-2 text-xl md:text-2xl font-black uppercase tracking-tighter border-b-2 pb-1 transition-all duration-300 ${isHovered ? 'border-white text-white' : 'border-black text-black hover:text-studio-red hover:border-studio-red'}`}
           >
             {ctaLabel}
             <ArrowUpRight className="w-6 h-6 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
           </button>

           {pdfUrl && (
             <>
                {/* Separator - Hidden on mobile where they stack */}
                <span className={`hidden md:block w-px h-6 ${isHovered ? 'bg-white/30' : 'bg-black/20'}`}></span>
                
                <a 
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/pdf inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b pb-1 transition-all duration-300 ${isHovered ? 'border-white/50 text-white/80 hover:text-white hover:border-white' : 'border-black/30 text-black/50 hover:text-black hover:border-black'}`}
                >
                    {pdfLabel || "Download PDF"}
                    <ArrowDown className="w-3 h-3 group-hover/pdf:translate-y-1 transition-transform" />
                </a>
             </>
           )}
        </div>
      </div>
    </div>
  );
};

interface LocationBlockProps {
  label: string;
  addressLines: string[];
  note?: string;
  image: string;
  mapQuery: string;
}

const LocationBlock: React.FC<LocationBlockProps> = ({ label, addressLines, note, image, mapQuery }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full py-8 border-t border-black transition-colors duration-500 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image Layer */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img 
              src={image} 
              alt={label}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className={`relative z-20 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-black'}`}>
          <div className="flex justify-between items-start mb-4">
            <span className={`text-xs font-mono uppercase tracking-[0.2em] ${isHovered ? 'text-white' : 'text-gray-500'}`}>
                {label}
            </span>
          </div>
          
          <div className="text-xl font-bold uppercase tracking-tight leading-tight mb-6">
              {addressLines.map((line, i) => (
                  <span key={i} className="block">{line}</span>
              ))}
              {note && (
                  <span className="block text-sm font-normal normal-case mt-2 italic opacity-80">
                      {note}
                  </span>
              )}
          </div>

          <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className={`inline-flex items-center text-xs font-bold uppercase tracking-widest border-b pb-1 transition-all duration-300 ${isHovered ? 'border-white hover:text-white hover:border-white' : 'border-black hover:text-studio-red hover:border-studio-red'}`}
          >
              <span>Locatie Bekijken</span>
              <ArrowUpRight className="ml-2 w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </a>
      </div>
    </div>
  );
};

interface TourSectionProps {
  onOpenBooking: (type: 'tour' | 'lecture') => void;
}

const TourSection: React.FC<TourSectionProps> = ({ onOpenBooking }) => {
  // Find video assets for previews
  const toursVideo = PROJECTS.find(p => p.id === 'hannekes')?.videoPreview; 
  const lecturesVideo = PROJECTS.find(p => p.id === 'schoonschip')?.videoPreview; // Schoonschip shows innovation

  return (
    <section 
      id="contact"
      className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-white text-black cursor-default"
    >
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 max-w-[1800px] mx-auto">
        
        {/* COLUMN 1: Headline & Address */}
        <div className="flex flex-col h-full justify-between">
            <div className="mb-16">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
                    Contact
                </h2>
                <p className="text-lg md:text-xl font-medium leading-relaxed max-w-md mt-12">
                   Wil je dieper de verhalen induiken? Elk project draagt een geschiedenis van gemeenschap, ontwerp en experiment.
                </p>
            </div>

            {/* Location Blocks */}
            <div className="flex flex-col w-full mt-auto">
                <LocationBlock 
                    label="Amsterdam Studio"
                    addressLines={["Kastrupstraat 11G", "1043 CR Amsterdam"]}
                    image="https://storage.googleapis.com/studiovalkenier/studio.JPG"
                    mapQuery="Studio Valkenier Kastrupstraat 11G Amsterdam"
                />
                <LocationBlock 
                    label="Field Office"
                    addressLines={["Landgoed Rorik", "Pad van Altruda 3", "1948 PT Beverwijk"]}
                    note="Stevige schoenen aan."
                    image="https://storage.googleapis.com/studiovalkenier/field%20office.jpg"
                    mapQuery="Pad van Altruda 3 Beverwijk"
                />
            </div>
        </div>

        {/* COLUMN 2: Tours */}
        <ServiceColumn 
            number="01"
            title="Tours"
            description="Studio Valkenier biedt persoonlijke rondleidingen onder leiding van initiatiefnemers, waarbij je een uniek kijkje achter de schermen krijgt: van eerste schets tot gerealiseerde plek."
            ctaLabel="Boek een tour"
            onClick={() => onOpenBooking('tour')}
            videoUrl={toursVideo}
            pdfUrl="https://storage.googleapis.com/studiovalkenier/07Informatiewaaier_90x160mmsv.pdf"
            pdfLabel="Informatie Downloaden"
        />

        {/* COLUMN 3: Lectures */}
        <ServiceColumn 
            number="02"
            title="Lezingen"
            description="De partners van Studio Valkenier zijn tevens ervaren keynote speakers. Voor lezingen of samenwerkingen delen zij graag hun visie op duurzaam ontwerp, circulair leven en rebelse architectuur."
            ctaLabel="Boek een lezing"
            onClick={() => onOpenBooking('lecture')}
            videoUrl={lecturesVideo}
        />

      </div>
    </section>
  );
};

export default TourSection;