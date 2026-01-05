import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram } from 'lucide-react';

interface HeaderProps {
  onOpenManifesto: () => void;
}

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
              className="text-base md:text-lg font-medium uppercase tracking-widest text-black/60 hover:text-black transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="https://www.instagram.com/studiovalkenier/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/60 hover:text-black transition-colors duration-300 flex items-center"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
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