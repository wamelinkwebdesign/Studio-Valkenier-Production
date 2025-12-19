import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

interface HeaderProps {
  onOpenManifesto: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenManifesto }) => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [glass, setGlass] = useState(false);

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

  const navLinks = [
    { 
      label: 'Work', 
      href: '#work',
      onClick: undefined
    },
    { 
      label: 'About', 
      href: '#', 
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        onOpenManifesto();
      }
    },
    { 
      label: 'Contact', 
      href: 'mailto:info@studiovalkenier.nl',
      onClick: undefined
    }
  ];

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 transition-all duration-500 ${
        glass ? "bg-white/80 backdrop-blur-md border-b border-black/5" : "bg-transparent"
      }`}
    >
      <motion.a 
        href="#" 
        className="block w-20 md:w-32 mix-blend-difference z-50" 
        aria-label="Home"
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <img 
          src="https://storage.googleapis.com/studiovalkenier/logo.png" 
          alt="Studio Valkenier" 
          className="w-full h-auto object-contain"
        />
      </motion.a>

      <nav className="flex space-x-8 md:space-x-12">
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
    </motion.header>
  );
};

export default Header;