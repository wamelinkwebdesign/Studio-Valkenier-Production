import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-32 px-6 md:px-12 bg-white text-black">
      <div className="flex flex-col md:flex-row justify-between items-end gap-12">
        
        <div className="flex flex-col gap-8 w-full md:w-1/2">
            <div>
                <span className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4 block">Voor tours, lezingen of meer informatie</span>
                <a href="mailto:info@studiovalkenier.nl" className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter hover:opacity-70 transition-opacity">
                    info@
                    <br className="md:hidden"/>
                    studiovalkenier.nl
                </a>
            </div>
        </div>

        <div className="flex flex-col gap-4 items-start md:items-end">
             <div className="mt-4 flex flex-col items-start md:items-end gap-1">
                 <p className="text-xs text-gray-500 uppercase tracking-wider">
                    © {new Date().getFullYear()} Studio Valkenier - Amsterdam
                 </p><br />
                 <p className="text-xs text-gray-500 uppercase tracking-wider">
                    Website door <a href="https://wamelinkwebdesign.nl" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Wamelink Webdesign</a>
                 </p>
             </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;