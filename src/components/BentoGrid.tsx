import { BookOpen, Code, Monitor, GraduationCap, Award, ShieldCheck, Users, Briefcase } from 'lucide-react';


export function BentoGrid() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-24 z-10">
      
      {/* Decorative Glows for the Bento Section */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary-200/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="mb-16 text-center">
        <h2 className="text-sm font-bold tracking-[0.3em] text-[#dc2626] uppercase mb-4">Discover NICT</h2>
        <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight drop-shadow-sm">
          Master Practical Skills
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[280px]">
        
        {/* About Box - Large */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-white/70 backdrop-blur-xl border border-white rounded-3xl p-8 flex flex-col justify-center hover:bg-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 group overflow-hidden relative">
          <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-110 transition-all duration-700">
            <BookOpen size={200} className="text-slate-900" />
          </div>
          <h4 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
              <BookOpen size={16} className="text-[#dc2626]" />
            </span>
            Your Local Institute
          </h4>
          <p className="text-slate-600 leading-relaxed font-medium max-w-md">
            We are a network of independent centers focusing purely on hands-on keyboard skills. Forget heavy theory—we teach the exact tools used in modern offices today.
          </p>
        </div>

        {/* Course: Programming */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1 bg-white/70 backdrop-blur-xl border border-white rounded-3xl p-8 flex flex-col justify-between hover:border-primary-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 group relative overflow-hidden">
          <div className="absolute inset-0 bg-primary-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="w-12 h-12 bg-primary-50 border border-primary-100 rounded-2xl flex items-center justify-center mb-4">
            <Code className="text-[#dc2626]" size={24} />
          </div>
          <div className="relative z-10">
            <h4 className="text-xl font-bold text-slate-900 mb-2">Programming</h4>
            <p className="text-slate-500 text-sm">C, C++, Java, and Python basics for logical thinking.</p>
          </div>
        </div>

        {/* Course: Basic Computer */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1 bg-white/70 backdrop-blur-xl border border-white rounded-3xl p-8 flex flex-col justify-between hover:bg-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500">
          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
            <Monitor className="text-slate-700" size={24} />
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Basic Computer</h4>
            <p className="text-slate-500 text-sm">Master MS Office and fundamental operations.</p>
          </div>
        </div>

        {/* Certification Box - Wide */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-gradient-to-r from-primary-50 to-primary-100 backdrop-blur-xl border border-primary-200 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="absolute right-0 top-0 w-64 h-full bg-white/40 -skew-x-12 translate-x-32 group-hover:translate-x-[-400px] transition-transform duration-1000 ease-in-out" />
          <h4 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
              <Award className="text-[#dc2626]" size={20} />
            </span>
            Skill-Based Certification
          </h4>
          <p className="text-slate-700 leading-relaxed font-medium max-w-md">
            While not a government degree, our certificate proves you have the practical foundation to get started in the real world immediately.
          </p>
          <div className="mt-6 flex items-center gap-2 text-slate-800 text-sm font-semibold bg-white w-fit px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            <ShieldCheck size={16} className="text-[#dc2626]" /> Verified Skills
          </div>
        </div>

        {/* Audience Box */}
        <div className="col-span-1 md:col-span-3 lg:col-span-2 row-span-1 bg-white/70 backdrop-blur-xl border border-white rounded-3xl p-8 flex flex-col justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <h4 className="text-xl font-bold text-slate-900 mb-6">Who joins us?</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm hover:-translate-y-1 transition-transform">
              <Users className="text-[#dc2626]" size={20} />
              <span className="text-sm text-slate-700 font-medium">Beginners</span>
            </div>
            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm hover:-translate-y-1 transition-transform">
              <Briefcase className="text-[#dc2626]" size={20} />
              <span className="text-sm text-slate-700 font-medium">Job Seekers</span>
            </div>
            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm hover:-translate-y-1 transition-transform">
              <GraduationCap className="text-[#dc2626]" size={20} />
              <span className="text-sm text-slate-700 font-medium">Degree Students</span>
            </div>
            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm hover:-translate-y-1 transition-transform">
              <BookOpen className="text-[#dc2626]" size={20} />
              <span className="text-sm text-slate-700 font-medium">School Students</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
