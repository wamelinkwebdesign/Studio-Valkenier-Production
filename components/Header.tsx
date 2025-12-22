import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram } from 'lucide-react';

interface HeaderProps {
  onOpenManifesto: () => void;
}

const PinterestIcon = ({ size = 28, className = "" }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    stroke="none"
    className={className}
  >
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.495-.69-2.433-2.864-2.433-4.624 0-3.761 2.737-7.229 7.892-7.229 4.144 0 7.365 2.953 7.365 6.899 0 4.115-2.595 7.431-6.199 7.431-1.211 0-2.348-.63-2.738-1.373 0 0-.599 2.287-.744 2.844-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.594.026 12.017.026" />
  </svg>
);

const Header: React.FC<HeaderProps> = ({ onOpenManifesto }) => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [glass, setGlass] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Hide header on scroll down if we've scrolled past 100px
    if (latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    // Add glass effect when not at the very top
    if (latest > 50) {
      setGlass(true);
    } else {
      setGlass(false);
    }
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { 
      label: 'Projecten', 
      href: '#work',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        const element = document.getElementById('work');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    { 
      label: 'About', 
      href: '#', 
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        onOpenManifesto();
      }
    },
    { 
      label: 'Contact', 
      href: 'mailto:info@studiovalkenier.nl',
      onClick: () => setIsMobileMenuOpen(false)
    }
  ];

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden && !isMobileMenuOpen ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 transition-all duration-500 ${
          glass && !isMobileMenuOpen ? "bg-white/80 backdrop-blur-md border-b border-black/5" : "bg-transparent"
        }`}
      >
        <motion.a 
          href="#" 
          className="block w-20 md:w-32 mix-blend-difference z-50" 
          aria-label="Home"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <img 
            src="https://storage.googleapis.com/studiovalkenier/logo.png" 
            alt="Studio Valkenier" 
            className="w-full h-auto object-contain"
          />
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-12">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={item.onClick}
              className="text-base md:text-lg font-medium uppercase tracking-widest text-black/60 hover:text-black transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button 
          className={`md:hidden z-50 transition-colors duration-300 ${isMobileMenuOpen ? 'text-black' : 'text-white mix-blend-difference'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </motion.header>

      {/* Mobile Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-white md:hidden flex flex-col justify-between px-6 pb-8 pt-32"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={item.onClick}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="text-5xl font-black uppercase tracking-tighter text-black"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              <div className="flex gap-6">
                <a href="https://www.instagram.com/studiovalkenier/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-studio-red transition-colors">
                  <Instagram size={28} />
                </a>
                <a href="https://nl.pinterest.com/studiovalkenier/_saved/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-studio-red transition-colors">
                  <PinterestIcon size={28} />
                </a>
              </div>
              <a href="mailto:info@studiovalkenier.nl" className="text-lg font-bold text-black uppercase tracking-tight">
                info@studiovalkenier.nl
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;