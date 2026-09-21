import { useEffect, useState, type ReactNode } from 'react';
import logoUrl from '../assets/logo.png';
import certificateImg from '../assets/certificate.png';
import { Award, BookOpen, CheckCircle, GraduationCap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Custom Hook for simple fade-in
function useInView(options = { threshold: 0.1 }) {
  const [isInView, setIsInView] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options]);

  return [setRef, isInView] as const;
}

function FadeInView({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string }) {
  const [ref, isInView] = useInView();
  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out transform ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Certification() {
  const [mounted, setMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full flex flex-col items-center bg-[#fbfaf9] overflow-hidden selection:bg-[#fca5a5] selection:text-white">
      
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-[80vh] flex flex-col justify-center px-6 pt-24 pb-20 overflow-hidden bg-white rounded-b-[4rem] border-b border-black/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.02)]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Header text (Mobile: top, Desktop: top left) */}
          <div className={`order-1 lg:order-none lg:col-start-1 lg:row-start-1 text-center lg:text-left transition-all duration-1000 ease-out transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-100 rounded-full text-red-600 text-sm font-bold mb-8 shadow-sm mx-auto lg:mx-0">
              <Award size={16} />
              ISO 9001:2015 Certified Institution
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
              A Certificate That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-400">Opens Doors.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-4 lg:mb-0">
              Your journey doesn't end with learning. Validate your knowledge, pass the final assessment, and earn an industry-recognized certificate that employers trust.
            </p>
          </div>

          {/* Certificate Image (Mobile: middle, Desktop: spans right side) */}
          <div className={`order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 self-center w-full max-w-[600px] mx-auto transition-all duration-1000 delay-300 ease-out transform ${mounted ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
            <div className="w-full bg-white rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] p-2 md:p-4 transform hover:scale-[1.02] transition-transform duration-500 cursor-pointer border border-black/5 -mt-4 md:-mt-16">
              <img src={certificateImg} alt="NICT Certificate" className="w-full h-auto object-contain rounded border border-black/10" />
            </div>
          </div>

          {/* Feature Cards (Mobile: bottom, Desktop: bottom left) */}
          <div className={`order-3 lg:order-none lg:col-start-1 lg:row-start-2 transition-all duration-1000 delay-150 ease-out transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="flex flex-col gap-4 max-w-xl mx-auto lg:mx-0 w-full">
              {/* Feature 1 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <Award size={24} strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-lg mb-1">Industry Recognized</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">Valued by local and regional employers as a mark of practical competence.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Feature 2 */}
                <div className="flex flex-col items-start gap-3 p-4 rounded-2xl bg-white border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                    <BookOpen size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-base mb-1">ISO 9001:2015 Standards</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">Backed by our commitment to global quality management standards.</p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col items-start gap-3 p-4 rounded-2xl bg-white border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <CheckCircle size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-base mb-1">Verifiable Achievement</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">Proof that you didn't just watch videos, but passed a proctored assessment.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. The Process (Interactive Progress UI) */}
      <section className="w-full max-w-6xl px-6 py-32 mx-auto">
        <FadeInView>
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">How It Works.</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
              Earning an NICT certificate is a straightforward process designed to ensure you've truly mastered the material. Click through the steps below.
            </p>
          </div>
        </FadeInView>
        
        <div className="relative w-full pb-10">
          {/* Background Track */}
          <div className="absolute top-[4rem] md:top-[5rem] left-[10%] right-[10%] h-[6px] bg-slate-100 rounded-full z-0 hidden md:block overflow-visible shadow-inner">
            {/* Animated Fill Bar with glowing tail */}
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_0_20px_rgba(239,68,68,0.6)]"
              style={{ width: activeStep === 1 ? '0%' : activeStep === 2 ? '50%' : '100%' }}
            >
              {/* Shimmer effect inside the bar */}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] -translate-x-full animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            
            {/* Step 1 */}
            <div 
              onClick={() => setActiveStep(1)}
              className={`flex flex-col items-center text-center cursor-pointer group transition-all duration-700 ${activeStep >= 1 ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
            >
              <div className="relative mb-8">
                {/* Active Ripple */}
                {activeStep === 1 && (
                  <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-20 scale-150"></div>
                )}
                <div className={`relative z-10 w-32 h-32 md:w-40 md:h-40 rounded-full bg-white flex items-center justify-center transition-all duration-700 shadow-xl border-4 ${activeStep >= 1 ? 'border-red-500 scale-110 shadow-[0_10px_40px_rgba(239,68,68,0.25)]' : 'border-transparent scale-100'}`}>
                  <img 
                    src="https://img.icons8.com/color/256/e-learning.png" 
                    alt="Master the Course" 
                    className={`w-16 h-16 md:w-20 md:h-20 object-contain transition-transform duration-700 ${activeStep === 1 ? 'scale-110 drop-shadow-md' : 'scale-100 grayscale'}`} 
                  />
                </div>
              </div>
              <h3 className={`text-2xl font-black mb-4 transition-colors duration-700 ${activeStep >= 1 ? 'text-slate-900' : 'text-slate-500'}`}>1. Master the Course</h3>
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                Complete your chosen curriculum, participate in practical labs, and build real-world projects with our expert guidance.
              </p>
            </div>

            {/* Step 2 */}
            <div 
              onClick={() => setActiveStep(2)}
              className={`flex flex-col items-center text-center cursor-pointer group transition-all duration-700 ${activeStep >= 2 ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
            >
              <div className="relative mb-8">
                {activeStep === 2 && (
                  <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-20 scale-150"></div>
                )}
                <div className={`relative z-10 w-32 h-32 md:w-40 md:h-40 rounded-full bg-white flex items-center justify-center transition-all duration-700 shadow-xl border-4 ${activeStep >= 2 ? 'border-red-500 scale-110 shadow-[0_10px_40px_rgba(239,68,68,0.25)]' : 'border-transparent scale-100'}`}>
                  <img 
                    src="https://img.icons8.com/color/256/test-passed.png" 
                    alt="Write the Exam" 
                    className={`w-16 h-16 md:w-20 md:h-20 object-contain transition-transform duration-700 ${activeStep === 2 ? 'scale-110 drop-shadow-md' : 'scale-100 grayscale'}`} 
                  />
                </div>
              </div>
              <h3 className={`text-2xl font-black mb-4 transition-colors duration-700 ${activeStep >= 2 ? 'text-slate-900' : 'text-slate-500'}`}>2. Write the Exam</h3>
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                Test your knowledge by taking our comprehensive final exam. This ensures you are fully prepared for industry demands.
              </p>
            </div>

            {/* Step 3 */}
            <div 
              onClick={() => setActiveStep(3)}
              className={`flex flex-col items-center text-center cursor-pointer group transition-all duration-700 ${activeStep >= 3 ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
            >
              <div className="relative mb-8">
                {activeStep === 3 && (
                  <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-20 scale-150"></div>
                )}
                <div className={`relative z-10 w-32 h-32 md:w-40 md:h-40 rounded-full bg-white flex items-center justify-center transition-all duration-700 shadow-xl border-4 ${activeStep >= 3 ? 'border-red-500 scale-110 shadow-[0_10px_40px_rgba(239,68,68,0.25)]' : 'border-transparent scale-100'}`}>
                  <img 
                    src="https://img.icons8.com/color/256/diploma.png" 
                    alt="Get Certified" 
                    className={`w-16 h-16 md:w-20 md:h-20 object-contain transition-transform duration-700 ${activeStep === 3 ? 'scale-110 drop-shadow-md' : 'scale-100 grayscale'}`} 
                  />
                </div>
              </div>
              <h3 className={`text-2xl font-black mb-4 transition-colors duration-700 ${activeStep >= 3 ? 'text-slate-900' : 'text-slate-500'}`}>3. Get Certified</h3>
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                Upon passing, receive your official NICT certification—a powerful addition to your resume that proves your competence.
              </p>
            </div>

          </div>
        </div>
      </section>



      {/* 4. Mini CTA */}
      <section className="w-full px-6 py-32 bg-white">
        <FadeInView>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">Ready to Earn Yours?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/courses" className="px-10 py-5 bg-red-600 text-white rounded-full font-bold text-lg hover:bg-red-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3">
                Browse Courses <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </FadeInView>
      </section>

    </div>
  );
}
