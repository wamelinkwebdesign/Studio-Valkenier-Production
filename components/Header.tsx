import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram } from 'lucide-react';

interface HeaderProps {
  onOpenManifesto: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenManifesto }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if we are at the top of the page
      setIsAtTop(currentScrollY < 50);

      // Determine hide/show logic
      if (currentScrollY < 50) {
        setIsVisible(true);
      } 
      else if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        // Scrolling down past threshold
        setIsVisible(false);
      } 
      else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
      label: 'Stories', 
      href: '#stories',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        const element = document.getElementById('stories');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    { 
      label: 'About', 
      href: '#about', 
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        const element = document.getElementById('about');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    { 
      label: 'Contact', 
      href: '#contact',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  ];

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ 
          y: (isVisible || isMobileMenuOpen) ? 0 : '-100%' 
        }}
        transition={{ 
          duration: 0.5, 
          ease: [0.16, 1, 0.3, 1]
        }}
        // CRITICAL: Removed transition-all to prevent transform conflict. 
        // transition-colors is fine for background/backdrop-filter.
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 transition-colors duration-500 ${
          !isAtTop && !isMobileMenuOpen 
            ? "bg-white/90 backdrop-blur-md border-b border-black/5 shadow-sm" 
            : "bg-transparent"
        }`}
      >
        <motion.a 
          href="#" 
          className="block w-20 md:w-32 z-50" 
          aria-label="Home"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <img 
            src="https://storage.googleapis.com/studiovalkenier/logo.png" 
            alt="Studio Valkenier" 
            className="w-full h-auto object-contain"
          />
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-12">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={item.onClick}
              className={`text-base md:text-lg font-medium uppercase tracking-widest transition-colors duration-300 relative group ${
                isAtTop ? 'text-white hover:text-white/70' : 'text-black/60 hover:text-black'
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${
                isAtTop ? 'bg-white' : 'bg-black'
              }`} />
            </a>
          ))}
          <a
            href="https://www.instagram.com/studiovalkenier/"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors duration-300 flex items-center ${
              isAtTop ? 'text-white hover:text-white/70' : 'text-black/60 hover:text-black'
            }`}
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button 
          className={`md:hidden z-50 transition-colors duration-300 ${isMobileMenuOpen ? 'text-black' : isAtTop ? 'text-white' : 'text-black'}`}
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
                <a href="https://www.instagram.com/studiovalkenier/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-black/60 transition-colors">
                  <Instagram size={28} />
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