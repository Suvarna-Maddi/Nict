import { useEffect, useState, useRef, type ReactNode } from 'react';
import { Users, Trophy, Target, ArrowRight, ShieldCheck, Zap, Monitor, BookOpen, Clock, Phone } from 'lucide-react';

import { Link } from 'react-router-dom';
import infraImg from '../assets/infrastructure.jpg';
import aboutLab from '../assets/about_lab.jpg';
import aboutMentor from '../assets/about_mentor.jpg';
import directorImg from '../assets/director.png';
import directorNoBg from '../assets/director_nobg.jpg';


// Custom Hook for simple fade-in
function useInView(options = { threshold: 0.15 }) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, options);
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options.threshold]);

  return [ref, isInView] as const;
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

function AnimatedNumber({ end, suffix = "", duration = 2000 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView();

  useEffect(() => {
    if (!isInView) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutExpo for smooth deceleration
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full flex flex-col items-center bg-[#fbfaf9] overflow-hidden selection:bg-[#fca5a5] selection:text-white pb-10 relative">
      
      {/* Smoky Edge Vignette */}
      <div className="fixed inset-0 pointer-events-none z-[9999]" style={{ animation: 'smoke 10s ease-in-out infinite alternate' }}></div>
      <style>{`
        @keyframes smoke {
          0% { box-shadow: inset 0 0 100px 20px rgba(100, 116, 139, 0.15); }
          50% { box-shadow: inset 0 0 250px 50px rgba(100, 116, 139, 0.25), inset 0 0 80px 10px rgba(100, 116, 139, 0.1); }
          100% { box-shadow: inset 0 0 180px 30px rgba(100, 116, 139, 0.2); }
        }
      `}</style>
      
      {/* 1. Hero Section (Dynamic Split Layout) */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-32 pb-16 overflow-hidden bg-gradient-to-b from-white to-[#fbfaf9]">
        {/* Background Decorative Shapes */}
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-[#fca5a5]/10 rounded-l-[120px] -z-10 transform translate-x-1/4 skew-x-12 opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
        
        <div className="w-full max-w-7xl px-6 flex flex-col lg:flex-row items-center gap-16 lg:gap-8 relative z-10">
          
          {/* Left Text Column */}
          <div className="flex-1 w-full text-center lg:text-left z-20 pt-10 lg:pt-0">
            <FadeInView delay={100}>
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 font-bold tracking-widest uppercase text-xs mb-6 shadow-sm border border-primary-100">
                Welcome to NICT
              </div>
            </FadeInView>
            
            <FadeInView delay={200}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8">
                People <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                  Behind Better
                </span> <br className="hidden lg:block" />
                Opportunities
              </h1>
            </FadeInView>
            
            <FadeInView delay={300}>
              <p className="text-xl md:text-2xl text-slate-500 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                A team of dedicated educators and industry professionals working together to create meaningful career outcomes for every learner.
              </p>
            </FadeInView>

            <FadeInView delay={400}>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <a href="#stats" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 hover:-translate-y-1 w-full sm:w-auto text-center flex items-center justify-center gap-3">
                  Our Impact <ArrowRight size={20} />
                </a>
              </div>
            </FadeInView>
          </div>

          {/* Right Visual Grid Column */}
          <div className="flex-1 w-full relative h-[500px] sm:h-[600px] hidden md:block">
            <FadeInView delay={400} className="w-full h-full relative">
              {/* Main Image */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[80%] h-[400px] sm:h-[450px] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white z-10 hover:scale-[1.02] transition-transform duration-500">
                <img src={aboutLab} alt="Students in modern lab" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              
              {/* Secondary Overlapping Image */}
              <div className="absolute left-0 bottom-[5%] w-[55%] h-[250px] sm:h-[300px] rounded-[30px] overflow-hidden shadow-2xl border-4 border-white z-20 hover:-translate-y-3 transition-transform duration-500">
                <img src={aboutMentor} alt="Mentor helping student" className="w-full h-full object-cover" />
              </div>
              
              {/* Decorative Elements (Glassmorphism Badges) */}
              <div className="absolute top-[10%] right-[-5%] lg:right-[-2%] z-30 bg-white/90 backdrop-blur-md border border-white p-4 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] animate-[bounce_6s_ease-in-out_infinite] flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                  <Trophy size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Experience</p>
                  <p className="text-sm font-black text-slate-900">15+ Years</p>
                </div>
              </div>

              <div className="absolute bottom-[20%] left-[-5%] lg:left-[-10%] z-30 bg-white/90 backdrop-blur-md border border-white p-4 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] animate-[bounce_7s_ease-in-out_infinite_reverse] flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Trusted by</p>
                  <p className="text-sm font-black text-slate-900">3000+ Students</p>
                </div>
              </div>
            </FadeInView>
          </div>
          
          {/* Mobile Visual (Fallback) */}
          <div className="w-full md:hidden flex flex-col gap-4 mt-8 relative z-20">
            <FadeInView delay={200} className="w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-[300px]">
               <img src={aboutLab} alt="Students in modern lab" className="w-full h-full object-cover" />
            </FadeInView>
            <FadeInView delay={300} className="w-[80%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-[200px] -mt-16 ml-auto relative z-10">
               <img src={aboutMentor} alt="Mentor helping student" className="w-full h-full object-cover" />
            </FadeInView>
          </div>

        </div>
      </section>

      {/* 2. Stats Section (Card-less, Minimalist) */}
      <section id="stats" className="w-full max-w-6xl px-6 relative mb-32 -mt-16 z-20">
        <FadeInView>
          <div className="flex flex-col md:flex-row items-center justify-between py-12 px-8 bg-transparent border-t border-b border-black/10 divide-y md:divide-y-0 md:divide-x divide-black/10">
            
            <div className="flex-1 w-full flex flex-col items-center justify-center text-center py-8 md:py-0">
              <div className="w-12 h-12 text-primary-500 mb-4 flex items-center justify-center"><Users size={32} strokeWidth={2} /></div>
              <h3 className="text-5xl md:text-6xl font-black text-slate-900 mb-2">
                <AnimatedNumber end={3000} suffix="+" duration={2500} />
              </h3>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Alumni Trained</p>
            </div>
            
            <div className="flex-1 w-full flex flex-col items-center justify-center text-center py-8 md:py-0">
              <div className="w-12 h-12 text-orange-500 mb-4 flex items-center justify-center"><Trophy size={32} strokeWidth={2} /></div>
              <h3 className="text-5xl md:text-6xl font-black text-slate-900 mb-2">
                <AnimatedNumber end={15} suffix="+" duration={2000} />
              </h3>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Years of Excellence</p>
            </div>
            
            <div className="flex-1 w-full flex flex-col items-center justify-center text-center py-8 md:py-0">
              <div className="w-12 h-12 text-emerald-500 mb-4 flex items-center justify-center"><ShieldCheck size={32} strokeWidth={2} /></div>
              <h3 className="text-5xl md:text-6xl font-black text-slate-900 mb-2">
                <AnimatedNumber end={100} suffix="%" duration={2000} />
              </h3>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Practical Focus</p>
            </div>
            
          </div>
        </FadeInView>
      </section>

      {/* 3. Director's Desk Section */}
      <section className="w-full bg-[#fbfaf9] py-16 mb-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Text Side */}
            <FadeInView className="order-2 md:order-1">
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Meet the Director.</h2>
              <h3 className="text-3xl font-bold text-slate-800 mb-2">Mr. Kumara Swamy</h3>
              <p className="text-primary-600 font-bold uppercase tracking-widest text-sm mb-10">15+ Years of Industry Experience</p>
              
              <div className="relative pl-8 border-l-4 border-primary-500 mb-8">
                <p className="text-xl md:text-2xl text-slate-600 leading-relaxed italic font-medium">
                  "Our vision has always been to bridge the gap between academic learning and industry requirements. Over the past 15 years, we have continuously evolved our curriculum to ensure every student who walks through our doors leaves as a confident, capable professional."
                </p>
              </div>
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                Under his leadership, NICT has transformed thousands of careers, focusing on hands-on practical training and real-world skills that companies actually demand.
              </p>
            </FadeInView>

            {/* Image Side */}
            <FadeInView delay={150} className="order-1 md:order-2">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-primary-100 rounded-[3rem] transform rotate-6 scale-105 z-0"></div>
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white relative z-10 bg-white">
                  <img 
                    src={directorNoBg} 
                    alt="Mr. Kumara Swamy - Director of NICT" 
                    loading="lazy"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" 
                  />
                </div>
              </div>
            </FadeInView>
        </div>
      </section>

      {/* 4. The Core Methodology (Light Theme) */}
      <section className="w-full relative bg-white overflow-hidden py-32 mt-12 border-t border-b border-black/5 shadow-sm">

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
          
          <FadeInView className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">The NICT Advantage.</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
              We don't just teach software; we build professionals. Our methodology focuses entirely on what companies actually want.
            </p>
          </FadeInView>
          
          <div className="flex flex-col gap-24">
            
            {/* Item 1 - Left */}
            <FadeInView delay={0}>
              <div className="flex flex-col md:flex-row items-start gap-8 relative pl-8 border-l-[2px] border-[#d97706]">
                <div className="absolute -left-[24px] top-[-8px] text-[#d97706] bg-white py-2">
                  <Zap size={40} />
                </div>
                <div className="max-w-3xl">
                  <p className="text-2xl md:text-3xl text-slate-600 italic font-medium leading-relaxed mb-6">
                    "No boring textbook lectures. You spend your time typing code, building projects, and mastering software exactly how it's used in the industry. Theory is kept to the absolute minimum required to understand the concepts."
                  </p>
                  <div>
                    <h4 className="text-slate-900 font-bold text-xl mb-1">100% Practical Labs</h4>
                    <p className="text-[#d97706] font-semibold text-sm uppercase tracking-wider">Learn by Doing</p>
                  </div>
                </div>
              </div>
            </FadeInView>

            {/* Item 2 - Right */}
            <FadeInView delay={100}>
              <div className="flex flex-col md:flex-row-reverse items-start gap-8 relative pr-8 border-r-[2px] border-[#2563eb] text-right ml-auto">
                <div className="absolute -right-[24px] top-[-8px] text-[#2563eb] bg-white py-2">
                  <Target size={40} />
                </div>
                <div className="max-w-3xl">
                  <p className="text-2xl md:text-3xl text-slate-600 italic font-medium leading-relaxed mb-6">
                    "Never touched a line of code? No problem. We start from the absolute basics and guide you step-by-step until you are confident and capable. We assume zero prior knowledge."
                  </p>
                  <div>
                    <h4 className="text-slate-900 font-bold text-xl mb-1">Absolute Beginners Welcome</h4>
                    <p className="text-[#2563eb] font-semibold text-sm uppercase tracking-wider">Zero to Hero</p>
                  </div>
                </div>
              </div>
            </FadeInView>

            {/* Item 3 - Left */}
            <FadeInView delay={200}>
              <div className="flex flex-col md:flex-row items-start gap-8 relative pl-8 border-l-[2px] border-[#d97706]">
                <div className="absolute -left-[24px] top-[-8px] text-[#d97706] bg-white py-2">
                  <ShieldCheck size={40} />
                </div>
                <div className="max-w-3xl">
                  <p className="text-2xl md:text-3xl text-slate-600 italic font-medium leading-relaxed mb-6">
                    "Premium tech education shouldn't break the bank. We offer highly affordable fee structures with flexible timings to suit everyone, from full-time college students to working professionals."
                  </p>
                  <div>
                    <h4 className="text-slate-900 font-bold text-xl mb-1">Accessible to All</h4>
                    <p className="text-[#d97706] font-semibold text-sm uppercase tracking-wider">Affordable & Flexible</p>
                  </div>
                </div>
              </div>
            </FadeInView>

          </div>
        </div>
      </section>

      {/* 5. Establishment Details */}
      <section className="w-full bg-[#fbfaf9] py-32">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <FadeInView>
            <div className="relative w-full aspect-square md:aspect-[4/5] rounded-[2.5rem] bg-slate-900 overflow-hidden shadow-2xl group">
              <img 
                src={infraImg} 
                alt="NICT Infrastructure" 
                loading="lazy"
                className="w-full h-full object-cover shadow-2xl transition-transform duration-700 hover:scale-105 group-hover:opacity-80 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-end p-8 md:p-12 text-center border-[8px] border-white/10 rounded-[2.5rem]">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center text-white mb-6 border border-white/20 transform group-hover:-translate-y-2 transition-transform duration-500">
                  <Monitor size={32} strokeWidth={2} />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">State-of-the-Art <br/>Infrastructure</h3>
                <p className="text-slate-300 font-medium leading-relaxed">
                  Equipped with modern training facilities to foster growth and creativity.
                </p>
              </div>
            </div>
          </FadeInView>

          <FadeInView delay={150}>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Built for Your Success.</h2>
            <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
              N.I.C.T. Computer Institute has earned a stellar reputation in the Computer Training Institutes sector. We offer various skill-building programs tailored to meet the demands of today's competitive job market.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center shrink-0 mt-1">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-1">Comprehensive Programs</h4>
                  <p className="text-slate-500 font-medium">Wide range of offerings including IT, management, soft skills, and vocational training.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0 mt-1">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-1">Flexible Scheduling</h4>
                  <p className="text-slate-500 font-medium">Open Mon-Sat 8:30 AM - 8:00 PM and Sun 10:00 AM - 5:30 PM to accommodate your busy lifestyle.</p>
                </div>
              </div>
            </div>
          </FadeInView>

        </div>
      </section>

      {/* 5. Call to Action (Card-less, Massive Typography) */}
      <section className="w-full px-6 py-32 border-t border-black/10">
        <FadeInView>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight">Ready to Start Your Journey?</h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
              Join thousands of successful alumni. Get practical skills, earn certifications, and accelerate your career today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/courses" className="px-10 py-5 bg-primary-600 text-white rounded-full font-bold text-lg hover:bg-primary-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3">
                View Curriculum <ArrowRight size={20} />
              </Link>
              <a href="tel:+918247419292" className="group relative px-10 py-5 bg-gradient-to-r from-primary-300 to-primary-500 text-white rounded-full font-bold text-lg hover:shadow-[0_15px_40px_-10px_rgba(16,185,129,0.5)] transition-all flex items-center gap-4 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm">
                  <Phone size={18} className="text-white animate-pulse" />
                </div>
                <span className="relative z-10 tracking-wide">Call Us Now</span>
              </a>
            </div>
          </div>
        </FadeInView>
      </section>

    </div>
  );
}
