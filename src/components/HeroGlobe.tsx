import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import homeHeroBg from '../assets/homehero.png';
import mobileHeroBg from '../assets/h_bg.png';

export function HeroGlobe() {
  return (
    <div className="relative w-full bg-[#fbfaf9] overflow-hidden">
      
      {/* Banner Image Display */}
      <div className="w-full relative z-10">
        <picture>
          <source media="(min-width: 768px)" srcSet={homeHeroBg} />
          <img 
            src={mobileHeroBg} 
            alt="From Warangal to the World - NICT" 
            className="w-full min-h-[50vh] md:min-h-[85vh] object-cover object-center shadow-sm" 
          />
        </picture>
        {/* SVG Curve at the bottom of the image */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 120" 
            className="w-full h-[40px] md:h-[80px] text-[#fbfaf9]" 
            preserveAspectRatio="none"
          >
            <path 
              fill="currentColor" 
              d="M0,60 C240,120 480,120 720,60 C960,0 1200,0 1440,60 L1440,120 L0,120 Z" 
            ></path>
          </svg>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="w-full max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-center gap-6 relative z-20">
        <Link 
          to="/courses" 
          className="w-full sm:w-auto px-10 py-4 bg-[#0a1945] text-amber-400 rounded-full font-black text-lg hover:bg-slate-900 hover:-translate-y-1 transition-all duration-300 shadow-[0_15px_30px_-10px_rgba(10,25,69,0.5)] flex items-center justify-center gap-2 group border border-amber-500/20"
        >
          Start Learning <ArrowUpRight size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </div>
      
    </div>
  );
}
