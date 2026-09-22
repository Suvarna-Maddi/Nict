import { useEffect, useState, useRef, type ReactNode } from 'react';
import { Briefcase, Layers, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

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

const opportunities = [
  {
    title: "Get Job-Ready Skills",
    description: "Learn industry-relevant computer courses designed to help you secure real job opportunities.",
    icon: Briefcase,
    highlights: ["Job-oriented training", "Practical learning approach", "Placement assistance support"],
    gradient: "from-amber-100/90 to-amber-50/50",
    iconBg: "bg-amber-200/50 text-amber-700 border border-amber-300/50"
  },
  {
    title: "Learn More, Grow Faster",
    description: "Combine computer skills with spoken English to boost your confidence and career growth.",
    icon: Layers,
    highlights: ["Spoken English + Computer courses", "Beginner-friendly approach", "Affordable fees"],
    gradient: "from-amber-100/90 to-amber-50/50",
    iconBg: "bg-amber-200/50 text-amber-700 border border-amber-300/50"
  },
  {
    title: "Govt. Validated Certificate",
    description: "Earn an ISO certified, globally recognized certificate valid for government and private sector jobs.",
    icon: ShieldCheck,
    highlights: ["ISO 9001:2015 Certified", "Valid for all Govt jobs", "High industry recognition"],
    gradient: "from-amber-100/90 to-amber-50/50",
    iconBg: "bg-amber-200/50 text-amber-700 border border-amber-300/50"
  }
];

export function Opportunities() {
  return (
    <section className="relative w-full py-32 bg-[#fbfaf9] overflow-hidden z-10 border-y border-black/5">
      
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px]"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-amber-500/5 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Scrolling Banner */}
        <div className="w-full bg-gradient-to-r from-[#c69320] via-[#fef08a] to-[#c69320] bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite] text-[#0a1945] py-4 overflow-hidden whitespace-nowrap mb-16 rounded-2xl shadow-[0_10px_30px_-10px_rgba(212,175,55,0.6)] relative flex items-center border border-[#fef08a]/50">
          <div className="animate-[scrollLTR_45s_linear_infinite] inline-flex items-center gap-12 font-black text-lg md:text-xl tracking-wider uppercase px-4">
            <span className="flex items-center gap-3"><img src="https://img.icons8.com/3d-fluency/94/gift.png" alt="Gift" className="w-7 h-7" /> Limited Time Offer: Enroll this summer and get a chance to WIN A BRAND-NEW LAPTOP through our lucky draw!</span>
            <span className="flex items-center gap-3"><img src="https://img.icons8.com/3d-fluency/94/gift.png" alt="Gift" className="w-7 h-7" /> Limited Time Offer: Enroll this summer and get a chance to WIN A BRAND-NEW LAPTOP through our lucky draw!</span>
            <span className="flex items-center gap-3"><img src="https://img.icons8.com/3d-fluency/94/gift.png" alt="Gift" className="w-7 h-7" /> Limited Time Offer: Enroll this summer and get a chance to WIN A BRAND-NEW LAPTOP through our lucky draw!</span>
            <span className="flex items-center gap-3"><img src="https://img.icons8.com/3d-fluency/94/gift.png" alt="Gift" className="w-7 h-7" /> Limited Time Offer: Enroll this summer and get a chance to WIN A BRAND-NEW LAPTOP through our lucky draw!</span>
          </div>
        </div>

        <style>{`
          @keyframes scrollLTR {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          @keyframes shimmer {
            0% { background-position: 200% center; }
            100% { background-position: 0% center; }
          }
        `}</style>
        
        {/* Section Header */}
        <FadeInView className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Opportunities <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">& Rewards</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-medium">
            Unlock your potential with premium training, dual-skill advantages, and exciting rewards.
          </p>
        </FadeInView>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {opportunities.map((opp, idx) => (
            <FadeInView key={idx} delay={idx * 150} className="h-full">
              <div className={`relative h-full bg-gradient-to-b ${opp.gradient} border border-amber-200/60 backdrop-blur-xl rounded-[2rem] p-8 flex flex-col shadow-xl hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.2)] transition-all duration-500 hover:-translate-y-2 group ring-1 ring-amber-100`}>
                
                <div className={`w-14 h-14 ${opp.iconBg} rounded-2xl flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500`}>
                  <opp.icon size={28} strokeWidth={2} />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{opp.title}</h3>
                <p className="text-slate-700 font-medium mb-8 leading-relaxed flex-1">
                  {opp.description}
                </p>

                <ul className="space-y-4">
                  {opp.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="shrink-0 mt-0.5 text-amber-600" strokeWidth={2.5} />
                      <span className="text-slate-700 font-medium text-sm leading-tight">{highlight}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 pt-6 border-t border-amber-200/60 flex-1 flex items-end">
                  <a href="tel:+918247419292" className="w-full py-3.5 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 bg-white border border-amber-200 text-slate-800 hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50">
                    Enroll Now <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </FadeInView>
          ))}
        </div>

        {/* Special Offer Rectangle CTA */}
        <FadeInView delay={300} className="w-full bg-gradient-to-br from-[#c69320] via-[#fef08a] to-[#c69320] rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_-12px_rgba(212,175,55,0.6)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between border-2 border-[#fef08a]/80">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#0a1945]/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
          
          <div className="relative z-10 text-center md:text-left mb-8 md:mb-0 md:mr-8 flex-1">
            <div className="inline-flex items-center gap-2 bg-[#0a1945] text-[#fef08a] font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 shadow-md animate-pulse">
              Special Summer Offer
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-[#0a1945] mb-4 tracking-tight flex items-center justify-center md:justify-start gap-3">
              Win a Brand-New Laptop! <img src="https://img.icons8.com/3d-fluency/94/gift.png" alt="Gift" className="w-10 h-10 md:w-14 md:h-14 drop-shadow-lg" />
            </h3>
            <p className="text-slate-900 font-bold text-lg md:text-xl max-w-2xl opacity-90 leading-relaxed">
              Enroll in any of our premium courses this summer and secure your entry into our grand lucky draw. Boost your career and upgrade your gear!
            </p>
          </div>

          <div className="relative z-10 shrink-0 w-full md:w-auto">
            <a href="tel:+918247419292" className="w-full md:w-auto px-10 py-5 bg-[#0a1945] hover:bg-slate-900 text-[#fef08a] text-lg font-black rounded-2xl shadow-2xl hover:shadow-[0_20px_40px_-10px_rgba(10,25,69,0.8)] transition-all flex items-center justify-center gap-3 hover:-translate-y-1 group border border-[#0a1945]/50">
              Enroll Now <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </FadeInView>

      </div>
    </section>
  );
}
