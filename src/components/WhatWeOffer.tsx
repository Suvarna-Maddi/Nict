import { useState } from 'react';
import { Monitor, Code, Calculator, GraduationCap, Globe, ArrowRight } from 'lucide-react';

const courses = [
  {
    title: "Basic Computer Skills",
    description: "Master essential computer operations from the ground up. Covers MS Office (Word, Excel, PowerPoint), internet navigation, and file management. Perfect for beginners.",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg",
    cardBg: "from-red-50/90 to-white/90"
  },
  {
    title: "Programming Courses",
    description: "Learn logical thinking and core coding concepts with comprehensive training in C, C++, Core Java, and Python to tackle real-world programming challenges.",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    cardBg: "from-white/90 to-red-50/90"
  },
  {
    title: "Tally & Accounting",
    description: "Get industry-ready professional training. We cover end-to-end accounting principles, Tally Prime features, GST filing, and billing to ensure you excel in the financial sector.",
    logoUrl: "https://tallysolutions.com/wp-content/uploads/2020/10/tally-prime-logo.svg",
    cardBg: "from-red-50/90 to-red-100/80"
  },
  {
    title: "Diploma Courses",
    description: "Boost your resume with our certification programs (DCA, PGDCA, ADCA). These courses provide an in-depth understanding of multiple computer disciplines.",
    logoUrl: "https://img.icons8.com/color/96/microsoft-office-2019.png",
    cardBg: "from-white/90 to-red-50/90"
  },
  {
    title: "Web Design",
    description: "Transform your creativity into stunning websites. Learn the fundamentals of modern web development using HTML5 and CSS3 to build interactive, mobile-friendly sites.",
    logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    cardBg: "from-red-100/70 to-white/90"
  },
  {
    title: "Spoken English",
    description: "Build confidence and fluency in English. Our interactive classes focus on pronunciation, grammar, vocabulary, and real-world conversation practice.",
    logoUrl: "https://img.icons8.com/color/96/language.png",
    cardBg: "from-white/90 to-red-50/90"
  }
];

export function WhatWeOffer() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full pt-20 pb-32 z-10">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-200/40 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 drop-shadow-sm">
            What We Offer
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg md:text-xl font-medium mb-4 leading-relaxed">
            Practical, job-oriented courses designed to build real skills for your career. Whether you are starting from scratch or upgrading your expertise, our comprehensive training programs ensure you are industry-ready with hands-on experience and expert guidance.
          </p>
        </div>

        {/* Vertical Overlapping Accordion Container */}
        <div className="relative w-full flex flex-col pt-4">
          {courses.map((course, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div 
                key={idx}
                onMouseEnter={() => setActiveIndex(idx)}
                style={{ zIndex: idx + 10 }}
                // Using pale black shade (border-black/10) for borders instead of red
                className={`relative w-full bg-gradient-to-r ${course.cardBg} backdrop-blur-3xl border border-black/10 rounded-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.06)] px-6 py-6 md:px-8 md:py-7 flex flex-col justify-start transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden
                  ${idx !== 0 ? '-mt-5' : ''} 
                  ${isActive ? 'h-[280px] md:h-[240px] shadow-[0_20px_50px_rgba(0,0,0,0.12)]' : 'h-[120px] md:h-[125px] hover:-translate-y-2'}
                `}
              >
                
                {/* Background number watermark */}
                <div className="absolute right-8 top-8 text-[120px] leading-none font-black text-slate-900/[0.03] select-none pointer-events-none">
                  0{idx + 1}
                </div>

                {/* Always Visible Header Area */}
                <div className="flex items-center gap-6 w-full relative z-10">
                  {/* Sequence Number */}
                  <div className="hidden md:flex flex-col items-center gap-1 shrink-0">
                    <span className="text-xs font-black text-slate-400">0{idx + 1}</span>
                    <div className="w-1 h-8 bg-black/10 rounded-full" />
                  </div>

                  {/* Floating Logo (No circular border) */}
                  <div className={`w-12 h-12 shrink-0 flex items-center justify-center transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
                    <img src={course.logoUrl} alt={`${course.title} logo`} className="w-full h-full object-contain drop-shadow-sm" />
                  </div>
                  
                  {/* Title and Button Header Row */}
                  <div className="flex-1 flex items-center justify-between">
                    <h3 className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                      {course.title}
                    </h3>
                    
                    {/* Floating Expand Icon */}
                    <div className={`shrink-0 text-slate-400 transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>

                {/* Expandable Content Area */}
                <div className={`transition-all duration-500 delay-75 transform w-full md:pl-[120px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mt-6 relative z-10
                  ${isActive ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-8 invisible'}
                `}>
                  <p className="text-slate-600 text-sm md:text-base font-medium max-w-full md:max-w-md pr-4 md:pr-0 break-words">
                    {course.description}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
