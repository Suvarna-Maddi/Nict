import { MapPin, Navigation2 } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

function FadeInView({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function LocationContact() {
  return (
    <section className="relative w-full py-20 bg-white z-10 overflow-hidden border-t border-slate-100">
      {/* Soft gradient accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-50/50 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-50/50 rounded-full blur-[100px] pointer-events-none translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <FadeInView className="text-center mb-12 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-emerald-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Open Today
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Visit Our Institute
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Join us at our training center in Warangal and start your learning journey today.
          </p>
        </FadeInView>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          {/* Left Column: Contact Details */}
          <FadeInView delay={150} className="lg:w-1/3 flex flex-col gap-8">
            {/* Address Block */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <MapPin size={24} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">NICT Computer Training Institute</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                Girmajipet, Warangal,<br />
                Telangana – 506002
              </p>
            </div>

            {/* Sticky/Fixed-style CTA buttons */}
            <div className="flex flex-col gap-4 mt-auto">
              <a href="https://maps.app.goo.gl/6n5ehmVa5D7inBVV6" target="_blank" rel="noopener noreferrer" className="w-full bg-slate-900 hover:bg-slate-800 text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <Navigation2 size={18} /> Get Directions
              </a>
            </div>
          </FadeInView>

          {/* Right Column: Google Maps Embed */}
          <FadeInView delay={300} className="lg:w-2/3 min-h-[400px] h-[400px] lg:h-auto w-full relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/60 group">
            <div className="absolute inset-0 bg-slate-100 flex items-center justify-center -z-10">
              <span className="text-slate-400 font-medium">Loading Map...</span>
            </div>
            <iframe 
              src="https://maps.google.com/maps?q=NICT%20Computer%20Training%20Institute,%20Girmajipet,%20Warangal&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            ></iframe>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
