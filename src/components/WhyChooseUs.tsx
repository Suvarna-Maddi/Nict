import { Laptop, Smile, Wallet, Clock } from 'lucide-react';

const highlights = [
  {
    title: "Practical Training",
    description: "Learn by doing with hands-on practice, avoiding heavy theory.",
    icon: Laptop,
    align: "left"
  },
  {
    title: "Beginner Friendly",
    description: "Perfectly suitable for students with absolutely no prior knowledge.",
    icon: Smile,
    align: "right"
  },
  {
    title: "Affordable Fees",
    description: "Budget-friendly courses priced fairly for everyone in the community.",
    icon: Wallet,
    align: "left"
  },
  {
    title: "Flexible Timings",
    description: "Convenient batch timings for students and working professionals.",
    icon: Clock,
    align: "right"
  }
];

export function WhyChooseUs() {
  return (
    <section className="relative w-full py-20 z-10 overflow-hidden">
      
      {/* Massive decorative glows */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-primary-50/40 rounded-full blur-[150px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-primary-100/30 rounded-full blur-[150px] pointer-events-none translate-x-1/4 translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400 pr-2 pb-1">Choose Us</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-xl md:text-2xl font-medium tracking-tight">
            We focus on practical learning that helps you grow faster
          </p>
        </div>

        {/* Stunning Timeline Layout */}
        <div className="relative w-full max-w-5xl mx-auto">
          
          {/* Central Glowing Spine (Visible on all devices) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-100 via-primary-300 to-primary-100 -translate-x-1/2 rounded-full opacity-50"></div>

          <div className="flex flex-col gap-16 md:gap-16">
            {highlights.map((item, idx) => {
              const isLeft = item.align === "left";
              
              return (
                <div key={idx} className={`relative flex items-center w-full group ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                  
                  {/* Timeline Dot (Visible on all devices) */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 bg-white border-4 border-primary-500 rounded-full shadow-[0_0_20px_rgba(38,97,156,0.5)] z-20 group-hover:scale-150 group-hover:bg-primary-50 transition-all duration-500"></div>

                  {/* Content Block */}
                  <div className={`w-1/2 flex ${isLeft ? 'justify-end pr-8 md:pr-20' : 'justify-start pl-8 md:pl-20'} relative`}>

                    <div className={`relative z-10 flex flex-col ${isLeft ? 'items-end text-right' : 'items-start text-left'} group-hover:scale-[1.02] transition-transform duration-500 ease-out`}>
                      
                      {/* Enhanced Typography with Animated Underline */}
                      <div className="relative mb-2 md:mb-4 inline-block">
                        <h3 className="text-xl md:text-4xl font-extrabold text-slate-900 tracking-tight group-hover:text-primary-600 transition-colors duration-300">
                          {item.title}
                        </h3>
                        {/* Animated Underline */}
                        <div className={`absolute -bottom-2 ${isLeft ? 'right-0' : 'left-0'} w-0 h-1 bg-primary-500 rounded-full group-hover:w-full transition-all duration-500 ease-out`}></div>
                      </div>
                      
                      <p className="text-slate-600 text-sm md:text-xl leading-relaxed font-medium max-w-[200px] md:max-w-sm mt-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Empty space for the other half */}
                  <div className="w-1/2"></div>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </section>
  );
}
