import { Phone, MessageCircle, MapPin } from 'lucide-react';

export function CallToAction() {
  return (
    <section className="relative w-full py-24 lg:py-32 overflow-hidden bg-[#fbfaf9]">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[80%] bg-red-100 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[60%] bg-blue-50 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Location Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-100 rounded-full text-red-600 text-sm font-bold mb-8 shadow-sm">
          <MapPin size={16} />
          Girmajipet, Warangal
        </div>

        {/* Headings */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-tight drop-shadow-sm">
          Start Your Computer <br className="hidden md:block" /> Learning Today
        </h2>
        <p className="text-slate-600 text-lg md:text-xl font-medium max-w-2xl mb-12">
          Join NICT and build practical skills for your future. Reach out to us for course details, batches, and enrollment!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 w-full mt-4">
          


          <a href="tel:+919441635615" className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 border border-blue-500/50 rounded-full font-black text-lg md:text-xl shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.6)] hover:-translate-y-1.5 transition-all duration-300 flex items-center justify-center gap-3">
            <Phone size={26} strokeWidth={2.5} />
            Call Now
          </a>

        </div>

      </div>
    </section>
  );
}
