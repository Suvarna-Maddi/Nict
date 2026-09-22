import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, Info, Award, Sparkles, ArrowRight } from 'lucide-react';
import logoUrl from '../assets/logo.png';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; }
  }, [isOpen]);

  return (
    <>
      {/* 
        Floating Logo (Top Left)
      */}
      <Link 
        to="/" 
        className="fixed top-6 left-6 md:top-8 md:left-10 z-40 transition-transform duration-500 hover:scale-105"
      >
        <img src={logoUrl} alt="NICT Logo" className="h-10 md:h-12 object-contain drop-shadow-[0_0_25px_rgba(255,255,255,1)] brightness-125" />
      </Link>

      {/* 
        The Premium Capsule Toggle Button
        Replaces the standard hamburger with a unique, pulsing dot capsule.
      */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`group fixed top-6 right-6 md:top-8 md:right-10 z-40 h-12 md:h-14 px-6 md:px-8 bg-gradient-to-r from-blue-950 to-indigo-900 backdrop-blur-xl border border-blue-800/50 text-white rounded-full shadow-[0_8px_32px_rgba(30,58,138,0.4)] flex items-center gap-3 md:gap-4 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(30,58,138,0.6)] hover:from-indigo-900 hover:to-blue-950 ${isOpen ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'}`}
      >
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </div>
        <span className="text-white font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase transition-colors">Menu</span>
      </button>

      {/* 
        The Advanced Expanding Bento Drawer
      */}
      <div 
        className={`fixed inset-0 z-50 flex items-start md:items-center justify-center px-4 pt-24 md:pt-0 md:px-12 lg:px-32 transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Cinematic Depth-of-Field Overlay (Ultra Blur) */}
        <div 
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-slate-900/10 backdrop-blur-[40px] transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        ></div>

        {/* Minimalist Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className={`absolute top-6 right-6 md:top-8 md:right-10 w-14 h-14 bg-white/50 backdrop-blur-xl border border-white/60 rounded-full flex items-center justify-center text-slate-600 shadow-xl transition-all duration-700 hover:rotate-90 hover:bg-white hover:text-primary-500 hover:scale-110 ${isOpen ? 'opacity-100 scale-100 delay-300' : 'opacity-0 scale-50'}`}
        >
          <X size={24} strokeWidth={2} />
        </button>

        {/* The Advanced Bento Grid Container */}
        <div className="relative z-10 w-full max-w-5xl perspective-1000">
          
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[120px] md:auto-rows-[160px] transition-transform duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-12 opacity-0'}`}>
            
            {/* 1. Home Tile (Large Square) */}
            <Link 
              to="/" 
              className="group col-span-2 md:col-span-2 row-span-2 bg-primary-50/90 backdrop-blur-2xl border border-primary-100 rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden relative shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transform transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:bg-white/90"
            >
              {/* Massive subtle background icon */}
              <Home size={280} strokeWidth={0.5} className="absolute -right-16 -bottom-16 text-slate-100/50 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700" />
              
              <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-white shadow-lg relative z-10">
                <Home size={24} strokeWidth={2} />
              </div>
              <div className="relative z-10">
                <p className="text-slate-400 font-bold mb-2 tracking-[0.2em] uppercase text-[11px]">Welcome</p>
                <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">Home</h2>
              </div>
            </Link>

            {/* 2. Courses Tile (Wide Rectangle) */}
            <Link 
              to="/courses" 
              className="group col-span-2 md:col-span-2 row-span-1 bg-primary-50/90 backdrop-blur-2xl border border-primary-100 rounded-[2rem] p-6 md:p-8 flex items-center justify-between shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transform transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:bg-white/90"
            >
              <div>
                <p className="text-slate-400 font-bold mb-1 tracking-[0.2em] uppercase text-[10px]">Explore</p>
                <h2 className="text-2xl md:text-3xl font-black text-slate-800">Courses</h2>
              </div>
              <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-slate-800 group-hover:text-white group-hover:border-slate-800 transition-all duration-300">
                <ArrowRight size={20} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* 3. About Us Tile (Small Square) */}
            <Link 
              to="/about" 
              className="group col-span-1 md:col-span-1 row-span-1 bg-primary-50/90 backdrop-blur-2xl border border-primary-100 rounded-[2rem] p-6 flex flex-col justify-between shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transform transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:bg-white/90"
            >
              <Info size={24} strokeWidth={2} className="text-slate-400 group-hover:text-slate-800 transition-colors" />
              <h2 className="text-lg font-bold text-slate-800">About Us</h2>
            </Link>

            {/* 4. Certification Tile (Small Square) */}
            <Link 
              to="/certification" 
              className="group col-span-1 md:col-span-1 row-span-1 bg-primary-50/90 backdrop-blur-2xl border border-primary-100 rounded-[2rem] p-6 flex flex-col justify-between shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transform transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:bg-white/90"
            >
              <Award size={24} strokeWidth={2} className="text-slate-400 group-hover:text-slate-800 transition-colors" />
              <h2 className="text-lg font-bold text-slate-800">Certify</h2>
            </Link>

            {/* 5. Enroll Tile (Full Width Bottom Rectangle) */}
            <a 
              href="tel:+918247419292" 
              className="group col-span-2 md:col-span-4 row-span-1 bg-gradient-to-br from-primary-500 to-primary-600 rounded-[2rem] p-6 md:p-8 flex items-center justify-between shadow-[0_20px_40px_rgba(38,97,156,0.2)] transform transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(38,97,156,0.3)] overflow-hidden relative"
            >
              {/* Glass shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white">
                  <Sparkles size={24} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-primary-100 font-bold mb-1 tracking-[0.2em] uppercase text-[10px]">Start Today</p>
                  <h2 className="text-2xl md:text-3xl font-black text-white">Enroll Now</h2>
                </div>
              </div>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary-500 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                <ArrowRight size={20} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

          </div>
        </div>

      </div>
    </>
  );
}
