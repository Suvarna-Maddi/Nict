import { BookOpen } from 'lucide-react';

export function AboutSection() {
  return (
    <section className="py-20 bg-[#fdfbf7]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-sm font-bold tracking-widest text-[#dc2626] uppercase mb-3">About NICT</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-black leading-tight mb-6">
              Your Local <br />
              <span className="text-[#dc2626]">Computer Training</span> <br />
              Institute
            </h3>
            <p className="text-lg text-slate-700 leading-relaxed mb-6 font-medium">
              We are a private computer training institute network operating through local centers. Our mission is to help beginners learn practical, real-world computer skills at a low cost.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              We are not a traditional university or engineering college. Instead, each of our independent branches focuses heavily on hands-on basics and intermediate skills. Whether you're starting from scratch or looking to boost your resume, we provide the foundation you need.
            </p>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="absolute inset-0 bg-[#dc2626] rounded-2xl transform translate-x-4 translate-y-4 opacity-20"></div>
            <div className="relative bg-white p-10 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center text-center">
              <BookOpen size={48} className="text-[#dc2626] mb-6" />
              <h4 className="text-2xl font-bold text-black mb-4">Practical Focus</h4>
              <p className="text-slate-600">
                Forget heavy theory. We focus on getting your hands on the keyboard and learning the exact tools used in modern offices and local businesses today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
