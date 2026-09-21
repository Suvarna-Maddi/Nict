import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, ArrowUpRight } from 'lucide-react';
import heroBg from '../assets/h_bg.png';
import mobileHeroBg from '../assets/mh_bg.png';

export function HeroGlobe() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle Initial Mount Animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle Scroll Parallax (fade text & slight camera zoom on scroll)
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate parallax effects
  const textOpacity = Math.max(1 - scrollY / 500, 0);
  const textTransform = `translateY(${scrollY * 0.4}px)`;
  
  // This adds a slight extra scale when scrolling, on top of the CSS animation
  const scrollScale = 1 + scrollY * 0.0003; 

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden flex items-center bg-black z-10"
      style={{
        clipPath: 'ellipse(130% 100% at 50% 0%)',
        marginBottom: '-7.9vh'
      }}
    >
      
      {/* 
        ========================================================================
        1. THE BACKGROUND (Image + Slow Zoom Animation)
        ========================================================================
      */}
      {/* Desktop Background */}
      <div 
        className="hidden md:block absolute inset-0 w-full h-full bg-cover bg-center origin-center animate-[zoom-bg_20s_ease-in-out_infinite_alternate]"
        style={{ 
          backgroundImage: `url(${heroBg})`,
          transform: `scale(${scrollScale})`
        }}
      ></div>
      {/* Mobile Background */}
      <div 
        className="block md:hidden absolute inset-0 w-full h-full bg-cover bg-center origin-center animate-[zoom-bg_20s_ease-in-out_infinite_alternate]"
        style={{ 
          backgroundImage: `url(${mobileHeroBg})`,
          transform: `scale(${scrollScale})`
        }}
      ></div>

      {/* 
        ========================================================================
        2. THE OVERLAYS (For Text Readability)
        ========================================================================
      */}
      {/* Main left-to-right dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent pointer-events-none"></div>
      
      {/* Slight blur specifically under the text area for extra readability */}
      <div className="absolute top-0 bottom-0 left-0 w-[60%] bg-gradient-to-r from-black/20 to-transparent backdrop-blur-[2px] pointer-events-none"></div>

      {/* Mobile specific darker overlay to ensure text pops when stacked */}
      <div className="absolute inset-0 bg-black/40 md:hidden pointer-events-none"></div>

      {/* 
        ========================================================================
        3. THE CONTENT (Left Side aligned)
        ========================================================================
      */}
      <div 
        className={`relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-24 md:pt-32 lg:pt-40 flex flex-col items-center md:items-start text-center md:text-left transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
        style={{ opacity: textOpacity, transform: textTransform }}
      >
        
        {/* Highlight Badges */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-xs font-bold tracking-widest uppercase shadow-lg">
            <MapPin size={14} className="text-[#ff2d2d]" /> Girmajipet, Warangal
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-xs font-bold tracking-widest uppercase shadow-lg">
            <Users size={14} className="text-[#ff2d2d]" /> 3000+ Students Trained
          </div>
        </div>
        
        {/* Massive Bold Typography */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-black text-white tracking-tighter leading-[1.05] drop-shadow-2xl max-w-3xl">
          From Warangal <br className="hidden md:block" />
          to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d2d] to-[#ff6b6b]">World</span>
        </h1>
        
        {/* Subheading */}
        <p className="mt-6 text-slate-300 text-lg md:text-2xl font-medium max-w-xl leading-relaxed drop-shadow-lg">
          Learn real skills. Build your future. Start your journey with NICT.
        </p>

        {/* Minimalist Glassmorphism CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row w-full sm:w-auto items-center gap-4">
          <a 
            href="tel:+919441635615" 
            className="w-full sm:w-auto px-8 py-4 bg-[#ff2d2d] text-white rounded-full font-bold text-lg hover:bg-[#e60000] hover:-translate-y-1 transition-all duration-300 shadow-[0_0_30px_rgba(255,45,45,0.4)] hover:shadow-[0_0_40px_rgba(255,45,45,0.6)] flex items-center justify-center gap-2 group animate-[pulse-glow_3s_infinite]"
          >
            Start Learning <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          
          <Link 
            to="/courses" 
            className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full font-bold text-lg hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center shadow-lg"
          >
            Explore Courses
          </Link>
        </div>

      </div>

      <style>{`
        @keyframes zoom-bg {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 45, 45, 0.3); }
          50% { box-shadow: 0 0 40px rgba(255, 45, 45, 0.6); }
        }
      `}</style>
      
    </div>
  );
}
