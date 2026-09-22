import { useEffect, useState, useRef, type ReactNode } from 'react';
import { MonitorPlay, Calculator, Code2, Globe, Terminal, ArrowRight, FileText, Database, PenTool, Braces, X, CheckCircle, MessageCircle } from 'lucide-react';

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

const CATEGORIES = [
  {
    title: "Foundation & Office",
    description: "Essential computer literacy and daily office management skills.",
    courses: [
      {
        id: "c1",
        title: "DCA",
        subtitle: "Diploma in Computer Applications",
        description: "Learn the fundamentals of computers, operating systems, internet usage, and basic software installations.",
        duration: "6 Months",
        icon: MonitorPlay,
        logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg",
        color: "text-blue-600",
        bg: "bg-blue-50"
      },
      {
        id: "pgdca",
        title: "PGDCA",
        subtitle: "Post Graduate Diploma",
        description: "Comprehensive PG diploma covering advanced software, programming logic, and professional office management tools.",
        duration: "1 Year",
        icon: MonitorPlay,
        logoUrl: "https://img.icons8.com/color/96/diploma.png",
        color: "text-indigo-600",
        bg: "bg-indigo-50"
      },
      {
        id: "c2",
        title: "MS Office",
        subtitle: "Word, Excel, PowerPoint Mastery",
        description: "Master essential office tools. Learn to create professional documents, analyze data, and deliver impactful presentations.",
        duration: "2 Months",
        icon: FileText,
        logoUrl: "https://img.icons8.com/color/96/microsoft-office-2019.png",
        color: "text-sky-600",
        bg: "bg-sky-50"
      }
    ]
  },
  {
    title: "Professional Accounting",
    description: "Industry-standard training for commerce and finance careers.",
    courses: [
      {
        id: "c4",
        title: "Tally Prime with GST",
        subtitle: "ERP & Accounting Basics",
        description: "Complete training in computerized accounting, inventory management, GST returns, and payroll processing.",
        duration: "3 Months",
        icon: Calculator,
        logoUrl: "https://tallysolutions.com/wp-content/uploads/2020/10/tally-prime-logo.svg",
        color: "text-emerald-600",
        bg: "bg-emerald-50"
      },
      {
        id: "c6",
        title: "Advanced Excel",
        subtitle: "Data analysis and automation",
        description: "Take your spreadsheet skills to the next level with VLOOKUP, Pivot Tables, Macros, and data visualization.",
        duration: "2 Months",
        icon: Database,
        logoUrl: "https://img.icons8.com/color/96/microsoft-excel-2019--v1.png",
        color: "text-green-600",
        bg: "bg-green-50"
      }
    ]
  },
  {
    title: "Design & Tools",
    description: "Creative design, publishing, and engineering drafting tools.",
    courses: [
      {
        id: "c3",
        title: "DTP",
        subtitle: "Desktop Publishing",
        description: "Dive into professional publishing. Learn to create stunning layouts, banners, and print materials for media.",
        duration: "3 Months",
        icon: PenTool,
        logoUrl: "https://img.icons8.com/color/96/adobe-indesign--v1.png",
        color: "text-indigo-600",
        bg: "bg-indigo-50"
      },
      {
        id: "photoshop",
        title: "Photoshop",
        subtitle: "Digital Imaging & Design",
        description: "Master digital imaging, photo editing, and creative graphic design techniques used by industry professionals.",
        duration: "2 Months",
        icon: PenTool,
        logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg",
        color: "text-blue-600",
        bg: "bg-blue-50"
      },
      {
        id: "autocad",
        title: "Auto CAD",
        subtitle: "Engineering Drafting",
        description: "Learn 2D drafting and 3D modeling for architecture, engineering, and construction planning.",
        duration: "2 Months",
        icon: PenTool,
        logoUrl: "https://img.icons8.com/color/96/autocad.png",
        color: "text-red-600",
        bg: "bg-red-50"
      }
    ]
  },
  {
    title: "Programming Languages",
    description: "Core logic and development foundations for software engineering.",
    courses: [
      {
        id: "c7",
        title: "C Language",
        subtitle: "Programming Logic Foundation",
        description: "Build a strong programming foundation. Learn variables, loops, arrays, pointers, and algorithmic logic.",
        duration: "2 Months",
        icon: Terminal,
        logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
        color: "text-purple-600",
        bg: "bg-purple-50"
      },
      {
        id: "c8",
        title: "C++",
        subtitle: "Object-Oriented Programming",
        description: "Transition into Object-Oriented Programming. Master classes, inheritance, polymorphism, and memory management.",
        duration: "2 Months",
        icon: Braces,
        logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
        color: "text-fuchsia-600",
        bg: "bg-fuchsia-50"
      },
      {
        id: "c9",
        title: "Java",
        subtitle: "Enterprise App Foundations",
        description: "Learn the industry-standard language. Cover OOP concepts, exception handling, collections, and multithreading.",
        duration: "2 Months",
        icon: Code2,
        logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
        color: "text-pink-600",
        bg: "bg-pink-50"
      },
      {
        id: "c10",
        title: "Python",
        subtitle: "General Purpose & Data Science",
        description: "Master the most versatile language. From automation scripts to backend web dev and data analysis.",
        duration: "2 Months",
        icon: Code2,
        logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
        color: "text-blue-600",
        bg: "bg-blue-50"
      },
      {
        id: "c13",
        title: "SQL",
        subtitle: "Database Management & Querying",
        description: "Learn to query, manage, and manipulate relational databases using Structured Query Language.",
        duration: "1 Month",
        icon: Database,
        logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg",
        color: "text-sky-600",
        bg: "bg-sky-50"
      }
    ]
  },
  {
    title: "Language & Communication",
    description: "Develop strong communication skills for personal and professional growth.",
    courses: [
      {
        id: "c14",
        title: "Spoken English",
        subtitle: "Fluency & Confidence Building",
        description: "Build confidence and fluency in English. Our interactive classes focus on pronunciation, grammar, vocabulary, and real-world conversation practice.",
        duration: "2 Months",
        icon: MessageCircle,
        logoUrl: "https://img.icons8.com/color/96/language.png",
        color: "text-amber-600",
        bg: "bg-amber-50"
      }
    ]
  }
];

export function Courses() {
  const [mounted, setMounted] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, []);

  // Listen for hash changes to auto-open course modals
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        for (const category of CATEGORIES) {
          const course = category.courses.find(c => c.id === hash);
          if (course) {
            setSelectedCourse(course);
            
            // Auto-scroll to the card for better context
            setTimeout(() => {
              const el = document.getElementById(hash);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }, 100);
            return;
          }
        }
      }
    };

    // Run on initial mount
    handleHashChange();

    // Listen for manual hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="w-full flex flex-col items-center bg-[#fbfaf9] overflow-hidden selection:bg-[#fca5a5] selection:text-white pb-32">
      
      {/* 1. Hero Section (Ultra Premium EdTech Light UI) */}
      <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center px-6 pt-32 pb-24 overflow-hidden bg-white mb-20 rounded-b-[4rem] border-b border-black/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.02)]">
        
        {/* Dynamic Animated Mesh Gradient Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-gradient-to-b from-slate-50 to-white">
          <div className="absolute top-[-10%] left-[-10%] w-[50rem] h-[50rem] rounded-full bg-primary-200/40 blur-[100px] mix-blend-multiply" style={{ animation: 'blob1 15s infinite alternate ease-in-out' }}></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60rem] h-[60rem] rounded-full bg-orange-100/60 blur-[120px] mix-blend-multiply" style={{ animation: 'blob2 18s infinite alternate-reverse ease-in-out' }}></div>
          <div className="absolute top-[30%] left-[30%] w-[40rem] h-[40rem] rounded-full bg-rose-100/50 blur-[100px] mix-blend-multiply" style={{ animation: 'blob1 20s infinite alternate ease-in-out' }}></div>
          
          {/* Animated Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] opacity-70"></div>
        </div>





        <div className={`relative z-10 transition-all duration-[1200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] transform text-center ${mounted ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-16 opacity-0 scale-90'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary-50 border border-primary-100 rounded-full text-primary-600 text-xs font-black tracking-widest uppercase mb-10 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
            </span>
            Accelerate Your Career
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight mb-8 leading-[1.1]">
            Master the Skills <br className="hidden md:block"/>
            <span className="relative inline-block mt-2">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500">
                Industry Demands.
              </span>
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            Practical, job-oriented training from expert instructors. Build real projects, earn valuable certifications, and launch your career with NICT Academy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#courses-grid" className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-2">
              Browse Curriculum <ArrowRight size={18} />
            </a>
            <a href="tel:+918247419292" className="px-8 py-4 bg-white border-2 border-slate-200 hover:border-primary-500 text-slate-900 hover:text-primary-600 rounded-full font-bold transition-all shadow-sm flex items-center gap-2">
              Talk to an Advisor
            </a>
          </div>
        </div>
      </section>

      {/* 2. Categorized Course List */}
      <section id="courses-grid" className="w-full max-w-6xl px-6 relative mt-12">
        
        {CATEGORIES.map((category, catIndex) => (
          <div key={catIndex} className="mb-32">
            
            {/* Category Header */}
            <FadeInView className="mb-12">
              <div className="flex flex-col items-center justify-center text-center border-b-2 border-[#f5f5f4] pb-6 gap-4">
                <div className="max-w-2xl mx-auto">
                  <h2 className="text-3xl md:text-5xl font-black text-[#292524] tracking-tight mb-2">
                    {category.title}
                  </h2>
                  <p className="text-lg text-[#78716c] font-medium">
                    {category.description}
                  </p>
                </div>
              </div>
            </FadeInView>

            {/* Individual Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.courses.map((course, courseIndex) => (
                <FadeInView key={course.id} delay={courseIndex * 100} className="w-full">
                  <div id={course.id} onClick={() => setSelectedCourse(course)} className="group h-full bg-[#faf9f8] border border-black/10 rounded-[4rem] px-8 py-12 transform transition-all duration-500 ease-out hover:-translate-y-2 flex flex-col justify-between cursor-pointer
                                  shadow-[0_15px_30px_-15px_rgba(0,0,0,0.2),inset_0_0_60px_rgba(0,0,0,0.25)]
                                  hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.3),inset_0_0_120px_rgba(0,0,0,0.4)]">
                    
                    <div>
                      {/* Icon & Duration */}
                      <div className="flex justify-between items-start mb-6">
                        <div className={`w-12 h-12 ${course.color} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}>
                          {/* @ts-ignore - Check if logoUrl exists */}
                          {course.logoUrl ? (
                            <img src={course.logoUrl} alt={course.title} className={`w-full h-full object-contain drop-shadow-sm ${course.title.includes('Tally') ? 'scale-[1.8]' : ''}`} />
                          ) : (
                            <course.icon size={36} strokeWidth={2} />
                          )}
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f5f5f4] rounded-full text-[#78716c] text-[10px] font-bold uppercase tracking-wider">
                          {course.duration}
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-black text-[#292524] mb-2">{course.title}</h3>
                      <p className="text-[#292524] font-bold text-sm mb-3">
                        {course.subtitle}
                      </p>
                      {/* @ts-ignore - Description property added */}
                      <p className="text-[#78716c] text-sm leading-relaxed line-clamp-3">
                        {/* @ts-ignore */}
                        {course.description}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex items-center justify-between gap-4 pt-4 border-t border-black/5">
                      <a 
                        href="tel:+918247419292" 
                        onClick={(e) => e.stopPropagation()} 
                        className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
                      >
                        Enroll Now
                      </a>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCourse(course);
                        }}
                        className="flex items-center gap-1 text-slate-500 group-hover:text-primary-500 font-bold text-sm transition-colors"
                      >
                        View Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                  </div>
                </FadeInView>
              ))}
            </div>

          </div>
        ))}

      </section>

      {/* Course Details Modal Overlay */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" onClick={() => setSelectedCourse(null)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"></div>
          
          {/* Modal Content */}
          <div 
            className="relative w-full max-w-2xl bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden animate-[slideUp_0.4s_ease-out] border border-black/5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedCourse(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-slate-50 hover:bg-primary-50 text-slate-400 hover:text-primary-500 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={24} strokeWidth={2.5} />
            </button>

            {/* Header / Logo */}
            <div className="flex items-start gap-6 mb-8">
              <div className={`w-20 h-20 shrink-0 ${selectedCourse.color} flex items-center justify-center`}>
                {selectedCourse.logoUrl ? (
                  <img src={selectedCourse.logoUrl} alt={selectedCourse.title} className="w-full h-full object-contain drop-shadow-sm" />
                ) : (
                  <selectedCourse.icon size={48} strokeWidth={2} />
                )}
              </div>
              <div className="pt-2">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">{selectedCourse.title}</h2>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-50 rounded-full text-primary-600 text-xs font-bold uppercase tracking-wider">
                  Duration: {selectedCourse.duration}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 mb-10">
              <p className="text-slate-600 text-lg font-medium leading-relaxed">
                {selectedCourse.description}
              </p>
              
              <div className="bg-[#fbfaf9] p-6 rounded-3xl border border-black/5">
                <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">Course Features</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Practical Hands-on Sessions",
                    "Industry Expert Faculty",
                    "Job Placement Assistance",
                    "Certificate of Completion"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-600 font-medium text-sm">
                      <CheckCircle size={18} className="text-emerald-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a 
                href="tel:+918247419292" 
                className="w-full sm:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 text-center flex-1"
              >
                Enroll in {selectedCourse.title}
              </a>
            </div>

          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes blob1 {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes blob2 {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(-30px, 50px) scale(1.2); }
          66% { transform: translate(20px, -20px) scale(0.8); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}
