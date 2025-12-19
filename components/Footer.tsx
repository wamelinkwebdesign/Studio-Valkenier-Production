import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="w-full py-32 px-6 md:px-12 bg-white text-black border-t border-black/5">
      <div className="flex flex-col md:flex-row justify-between items-end gap-12">
        
        <div className="flex flex-col gap-8 w-full md:w-1/2">
            <div>
                <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4 block">Voor tours, lezingen of meer informatie</span>
                <a href="mailto:info@studiovalkenier.nl" className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter hover:text-studio-red transition-colors">
                    info@
                    <br className="md:hidden"/>
                    studiovalkenier.nl
                </a>
            </div>
        </div>

        <div className="flex flex-col gap-4 items-start md:items-end">
             <div className="flex space-x-6 text-sm uppercase tracking-widest">
                <a href="#" className="hover:text-gray-400 transition-colors">Instagram</a>
                <a href="#" className="hover:text-gray-400 transition-colors">LinkedIn</a>
             </div>
             <p className="text-xs text-gray-500 uppercase tracking-wider mt-4">
                © {new Date().getFullYear()} Studio Valkenier. Amsterdam.
             </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;