import { useEffect, useState, useRef } from 'react';


function AnimatedCounter({ value, suffix, prefixZero }: { value: number | string, suffix: string, prefixZero?: boolean }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || typeof value !== 'number') return;
    
    let startTimestamp: number | null = null;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, isVisible]);

  return (
    <div ref={ref} className="text-5xl md:text-6xl font-black text-slate-900 mb-2 tracking-tighter group-hover:text-primary-600 transition-colors duration-500 drop-shadow-sm">
      {typeof value === 'number' ? (prefixZero ? `0${count}` : count) : value}
      <span className="text-primary-500">{suffix}</span>
    </div>
  );
}

const stats = [
  {
    value: 3856,
    suffix: "+",
    prefixZero: true,
    label: "Students Trained",
    description: "Successfully trained and guided local students towards their careers."
  },
  {
    value: 25,
    suffix: "+",
    label: "Courses Available",
    description: "Job-oriented programs covering essential and advanced computer skills."
  }
];

export function Stats() {
  return (
    <section className="relative w-full py-24 z-10 bg-[#fbfaf9] overflow-hidden">
      
      {/* Decorative Background Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full pointer-events-none opacity-40">
        <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-primary-200 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-blue-100 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 drop-shadow-sm">
            Trusted by Students in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Warangal</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl font-medium tracking-tight">
            Building skills through practical training
          </p>
        </div>

        {/* 2 Column Enhanced Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="group relative flex flex-col items-center text-center p-8 bg-white/60 backdrop-blur-xl border border-black/5 rounded-[2.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(38,97,156,0.08)] hover:-translate-y-2 transition-all duration-500"
            >
              
              {/* Subtle hover border glow */}
              <div className="absolute inset-0 rounded-[2.5rem] border-2 border-primary-500/0 group-hover:border-primary-500/10 transition-colors duration-500 pointer-events-none"></div>

              {/* Animated Counter */}
              <AnimatedCounter value={stat.value} suffix={stat.suffix} prefixZero={(stat as any).prefixZero} />

              {/* Label */}
              <h3 className="text-xl font-bold text-slate-800 mb-3 tracking-tight">
                {stat.label}
              </h3>
              
              {/* Description */}
              <p className="text-slate-500 font-medium leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
