import { Users, School, GraduationCap, Briefcase } from 'lucide-react';

export function TargetAudienceSection() {
  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/3">
            <h2 className="text-sm font-bold tracking-widest text-[#dc2626] uppercase mb-3">Who Joins NICT?</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Built for <br /> everyone.
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              You don't need a technical background to get started. Our classes are filled with people from all walks of life looking to build confidence and practical skills.
            </p>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <School className="text-[#dc2626] mb-4" size={32} />
              <h4 className="text-xl font-bold mb-2">School Students</h4>
              <p className="text-slate-400 text-sm">Getting an early head start on foundational computer literacy.</p>
            </div>
            
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <GraduationCap className="text-[#dc2626] mb-4" size={32} />
              <h4 className="text-xl font-bold mb-2">Degree Students</h4>
              <p className="text-slate-400 text-sm">Supplementing theoretical college education with practical software skills.</p>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <Briefcase className="text-[#dc2626] mb-4" size={32} />
              <h4 className="text-xl font-bold mb-2">Job Seekers</h4>
              <p className="text-slate-400 text-sm">Learning the exact office tools and programming basics needed for entry-level jobs.</p>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <Users className="text-[#dc2626] mb-4" size={32} />
              <h4 className="text-xl font-bold mb-2">Absolute Beginners</h4>
              <p className="text-slate-400 text-sm">People with zero technical background who want to navigate the digital world.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
