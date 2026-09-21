import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const courses = [
  {
    title: "DCA (Diploma in Computer)",
    description: "Foundation covering essential computer operations and software.",
    duration: "6 Months",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg"
  },
  {
    title: "Tally & Accounting",
    description: "Professional training for GST and industry-standard accounting.",
    duration: "3 Months",
    logo: "https://tallysolutions.com/wp-content/uploads/2020/10/tally-prime-logo.svg"
  },
  {
    title: "Programming Courses",
    description: "Master logical thinking and coding with C, C++, Java, Python.",
    duration: "4 Months",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
  },
  {
    title: "Web Design",
    description: "Learn HTML, CSS, and essential frameworks for modern websites.",
    duration: "3 Months",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"
  },
  {
    title: "Spoken English",
    description: "Interactive classes to build confidence and fluency in English.",
    duration: "2 Months",
    logo: "https://img.icons8.com/color/96/language.png"
  }
];

// Duplicate the array to create a seamless infinite scroll loop
const scrollingCourses = [...courses, ...courses];

export function OurCourses() {
  return (
    <section className="relative w-full py-20 z-10 overflow-hidden bg-[#fbfaf9]">
      
      {/* Inline styles for infinite scrolling and hiding scrollbars */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 0.75rem)); } /* Scrolls exactly half the width to seamlessly loop */
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 drop-shadow-sm">
            Our Courses
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-medium">
            Explore our most popular job-oriented courses
          </p>
        </div>

        {/* Infinite Auto-scrolling Marquee */}
        <div className="relative z-10 mb-16 flex overflow-hidden hide-scrollbar py-4" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
          {/* Fading Edges for the marquee */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#fbfaf9] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#fbfaf9] to-transparent z-20 pointer-events-none"></div>

          <div className="flex gap-6 animate-scroll w-max px-6">
            {scrollingCourses.map((course, idx) => (
              <div 
                key={idx} 
                // Claymorphism Box with Dark Red Smoke Inset
                className="group w-[300px] sm:w-[350px] shrink-0 bg-[#fcfaf9] border border-red-900/10 rounded-[2rem] p-6 flex flex-col justify-between h-auto transition-all duration-700 hover:-translate-y-2 cursor-pointer overflow-hidden
                           shadow-[8px_8px_16px_rgba(220,38,38,0.04),-8px_-8px_16px_rgba(255,255,255,0.9),inset_0_0_60px_rgba(153,27,27,0.12)]
                           hover:shadow-[12px_12px_24px_rgba(220,38,38,0.08),-12px_-12px_24px_rgba(255,255,255,1),inset_0_0_120px_rgba(153,27,27,0.25)]"
              >
                <div>
                  {/* Header Row: Logo & Duration */}
                  <div className="flex flex-col gap-4 mb-6">
                    {/* Floating Logo (No square card) */}
                    <div className="w-12 h-12 shrink-0 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                      <img src={course.logo} alt={`${course.title} logo`} className="w-full h-full object-contain drop-shadow-sm" />
                    </div>
                    
                    {/* Claymorphism Tag */}
                    <div className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#fcfaf9] rounded-full text-slate-600 text-[10px] font-bold uppercase tracking-wide
                                    shadow-[2px_2px_4px_rgba(220,38,38,0.03),-2px_-2px_4px_rgba(255,255,255,0.9),inset_1px_1px_2px_rgba(255,255,255,1),inset_-1px_-1px_2px_rgba(220,38,38,0.02)]">
                      <Clock size={12} className="text-red-500" />
                      {course.duration}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight leading-tight">
                    {course.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed text-sm font-medium mb-2">
                    {course.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
          <Link to="/courses" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-black text-base flex items-center gap-2 transition-transform hover:-translate-y-1 active:translate-y-0
                             shadow-[6px_6px_12px_rgba(15,23,42,0.2),-6px_-6px_12px_rgba(255,255,255,0.9),inset_2px_2px_6px_rgba(255,255,255,0.1),inset_-2px_-2px_6px_rgba(0,0,0,0.5)]">
            Explore More Courses
          </Link>
          <a href="tel:+919441635615" className="bg-red-600 text-white px-8 py-4 rounded-xl font-black text-base flex items-center gap-2 transition-transform hover:-translate-y-1 active:translate-y-0
                             shadow-[6px_6px_12px_rgba(220,38,38,0.2),-6px_-6px_12px_rgba(255,255,255,0.9),inset_2px_2px_6px_rgba(255,255,255,0.3),inset_-2px_-2px_6px_rgba(153,27,27,0.5)]">
            Enroll Now <ArrowRight size={20} />
          </a>
        </div>
        
      </div>
    </section>
  );
}
