import { Award, ShieldCheck } from 'lucide-react';

export function CertificationSection() {
  return (
    <section className="py-24 bg-[#dc2626]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl flex flex-col md:flex-row items-center gap-12 border-4 border-black/5">
          <div className="md:w-1/2">
            <div className="w-16 h-16 bg-[#fdfbf7] rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100">
              <Award className="text-[#dc2626]" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-6">
              The NICT Certificate
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed font-medium mb-4">
              Upon successful completion of your course, you'll receive an official certificate from NICT.
            </p>
            <p className="text-base text-slate-600 leading-relaxed mb-8">
              While our certificate is not equivalent to a government degree, we firmly believe its true value lies in the <strong>actual skills you learn</strong>. For high-level jobs, you'll still need higher education, but our certificate proves you have the practical foundation to get started.
            </p>
            
            <div className="flex items-center gap-3 text-sm font-bold text-black bg-[#fdfbf7] py-3 px-5 rounded-full inline-flex border border-slate-200 shadow-sm">
              <ShieldCheck className="text-[#dc2626]" size={20} />
              <span>Skill-Based Recognition</span>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            {/* Visual placeholder for a certificate */}
            <div className="w-full max-w-sm aspect-[4/3] bg-[#fdfbf7] border-8 border-slate-900 rounded-lg shadow-2xl relative p-8 flex flex-col items-center justify-center transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="absolute top-4 left-4 w-12 h-12 border-b-2 border-r-2 border-[#dc2626]"></div>
              <div className="absolute bottom-4 right-4 w-12 h-12 border-t-2 border-l-2 border-[#dc2626]"></div>
              
              <Award className="text-slate-900 mb-4 opacity-20" size={64} />
              <div className="h-2 w-32 bg-slate-900 rounded-full mb-3"></div>
              <div className="h-2 w-48 bg-slate-300 rounded-full mb-6"></div>
              <div className="h-1 w-24 bg-[#dc2626] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
