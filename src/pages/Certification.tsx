import { useEffect, useState, useRef, type ReactNode } from 'react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import certificateImg from '../assets/certificate.png';
import certificateTemplateImg from '../assets/certificate_template.jpg';
import { Award, BookOpen, CheckCircle, ArrowRight, Search, Loader2, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { getDefaultDescription } from '../data/courseDescriptions';

// Custom Hook for simple fade-in
function useInView(options = { threshold: 0.1 }) {
  const [isInView, setIsInView] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options]);

  return [setRef, isInView] as const;
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

export function Certification() {
  const [mounted, setMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [certificateId, setCertificateId] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [verifiedData, setVerifiedData] = useState<{ name: string; course: string; issued_date: string; certificate_id: string } | null>(null);

  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPDF = async () => {
    if (!certificateRef.current) return;
    try {
      setIsDownloading(true);
      
      const imgData = await toPng(certificateRef.current, {
        quality: 1.0,
        pixelRatio: 2,
      });
      
      // Calculate aspect ratio based on a standard landscape A4 or original image dimensions
      // We can use the div's offsetWidth and offsetHeight for the PDF dimensions
      const width = certificateRef.current.offsetWidth;
      const height = certificateRef.current.offsetHeight;

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [width, height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      
      // Clean up the name for the filename (remove special characters if any)
      const sanitizedName = verifiedData?.name ? verifiedData.name.replace(/[^a-zA-Z0-9 ]/g, "").trim() : 'Candidate';
      pdf.save(`${sanitizedName} Certificate.pdf`);
    } catch (err: any) {
      console.error("Error generating PDF", err);
      alert(`Failed to download PDF: ${err.message || err}`);
    } finally {
      setIsDownloading(false);
    }
  };

  const verifyCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certificateId.trim()) return;

    setVerificationStatus('loading');
    setVerifiedData(null);

    try {
      const { data, error } = await supabase
        .from('certificate_details')
        .select('*')
        .eq('certificate_id', certificateId.trim())
        .single();

      if (error || !data) {
        console.error('Supabase error:', error);
        setVerificationStatus('error');
        // Let's store the error message in verifiedData temporarily just to see it on screen if it's an error.
        setVerifiedData({ name: 'Error', course: error?.message || 'Unknown error', issued_date: '', certificate_id: '' });
      } else {
        setVerifiedData({
          name: data.name,
          course: data.course,
          issued_date: data.issued_date,
          certificate_id: data.certificate_id
        });
        setVerificationStatus('success');
      }
    } catch (err) {
      setVerificationStatus('error');
    }
  };

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full flex flex-col items-center bg-[#fbfaf9] overflow-hidden selection:bg-[#fca5a5] selection:text-white">
      
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-[80vh] flex flex-col justify-center px-6 pt-24 pb-20 overflow-hidden bg-white rounded-b-[4rem] border-b border-black/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.02)]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Header text (Mobile: top, Desktop: top left) */}
          <div className={`order-1 lg:order-none lg:col-start-1 lg:row-start-1 text-center lg:text-left transition-all duration-1000 ease-out transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-100 rounded-full text-primary-600 text-sm font-bold mb-8 shadow-sm mx-auto lg:mx-0">
              <Award size={16} />
              ISO 9001:2015 Certified Institution
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
              A Certificate That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-300">Opens Doors.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-4 lg:mb-0">
              Your journey doesn't end with learning. Validate your knowledge, pass the final assessment, and earn an industry-recognized certificate that employers trust.
            </p>
          </div>

          {/* Certificate Image (Mobile: middle, Desktop: spans right side) */}
          <div className={`order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 self-center w-full max-w-[600px] mx-auto transition-all duration-1000 delay-300 ease-out transform ${mounted ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
            <div className="w-full bg-white rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] p-2 md:p-4 transform hover:scale-[1.02] transition-transform duration-500 cursor-pointer border border-black/5 -mt-4 md:-mt-16">
              <img src={certificateImg} alt="NICT Certificate" loading="lazy" className="w-full h-auto object-contain rounded border border-black/10" />
            </div>
          </div>

          {/* Feature Cards (Mobile: bottom, Desktop: bottom left) */}
          <div className={`order-3 lg:order-none lg:col-start-1 lg:row-start-2 transition-all duration-1000 delay-150 ease-out transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="flex flex-col gap-4 max-w-xl mx-auto lg:mx-0 w-full">
              {/* Feature 1 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group">
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <Award size={24} strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-lg mb-1">Industry Recognized</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">Valued by local and regional employers as a mark of practical competence.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Feature 2 */}
                <div className="flex flex-col items-start gap-3 p-4 rounded-2xl bg-white border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                    <BookOpen size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-base mb-1">ISO 9001:2015 Standards</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">Backed by our commitment to global quality management standards.</p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col items-start gap-3 p-4 rounded-2xl bg-white border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    <CheckCircle size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-base mb-1">Verifiable Achievement</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">Proof that you didn't just watch videos, but passed a proctored assessment.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. The Process (Interactive Progress UI) */}
      <section className="w-full max-w-6xl px-6 py-32 mx-auto">
        <FadeInView>
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">How It Works.</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
              Earning an NICT certificate is a straightforward process designed to ensure you've truly mastered the material. Click through the steps below.
            </p>
          </div>
        </FadeInView>
        
        <div className="relative w-full pb-10">
          {/* Background Track */}
          <div className="absolute top-[4rem] md:top-[5rem] left-[10%] right-[10%] h-[6px] bg-slate-100 rounded-full z-0 hidden md:block overflow-visible shadow-inner">
            {/* Animated Fill Bar with glowing tail */}
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_0_20px_rgba(38,97,156,0.6)]"
              style={{ width: activeStep === 1 ? '0%' : activeStep === 2 ? '50%' : '100%' }}
            >
              {/* Shimmer effect inside the bar */}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] -translate-x-full animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            
            {/* Step 1 */}
            <div 
              onClick={() => setActiveStep(1)}
              className={`flex flex-col items-center text-center cursor-pointer group transition-all duration-700 ${activeStep >= 1 ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
            >
              <div className="relative mb-8">
                {/* Active Ripple */}
                {activeStep === 1 && (
                  <div className="absolute inset-0 bg-primary-400 rounded-full animate-ping opacity-20 scale-150"></div>
                )}
                <div className={`relative z-10 w-32 h-32 md:w-40 md:h-40 rounded-full bg-white flex items-center justify-center transition-all duration-700 shadow-xl border-4 ${activeStep >= 1 ? 'border-primary-500 scale-110 shadow-[0_10px_40px_rgba(38,97,156,0.25)]' : 'border-transparent scale-100'}`}>
                  <img 
                    src="https://img.icons8.com/color/256/e-learning.png" 
                    alt="Master the Course" 
                    className={`w-16 h-16 md:w-20 md:h-20 object-contain transition-transform duration-700 ${activeStep === 1 ? 'scale-110 drop-shadow-md' : 'scale-100 grayscale'}`} 
                  />
                </div>
              </div>
              <h3 className={`text-2xl font-black mb-4 transition-colors duration-700 ${activeStep >= 1 ? 'text-slate-900' : 'text-slate-500'}`}>1. Master the Course</h3>
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                Complete your chosen curriculum, participate in practical labs, and build real-world projects with our expert guidance.
              </p>
            </div>

            {/* Step 2 */}
            <div 
              onClick={() => setActiveStep(2)}
              className={`flex flex-col items-center text-center cursor-pointer group transition-all duration-700 ${activeStep >= 2 ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
            >
              <div className="relative mb-8">
                {activeStep === 2 && (
                  <div className="absolute inset-0 bg-primary-400 rounded-full animate-ping opacity-20 scale-150"></div>
                )}
                <div className={`relative z-10 w-32 h-32 md:w-40 md:h-40 rounded-full bg-white flex items-center justify-center transition-all duration-700 shadow-xl border-4 ${activeStep >= 2 ? 'border-primary-500 scale-110 shadow-[0_10px_40px_rgba(38,97,156,0.25)]' : 'border-transparent scale-100'}`}>
                  <img 
                    src="https://img.icons8.com/color/256/test-passed.png" 
                    alt="Write the Exam" 
                    className={`w-16 h-16 md:w-20 md:h-20 object-contain transition-transform duration-700 ${activeStep === 2 ? 'scale-110 drop-shadow-md' : 'scale-100 grayscale'}`} 
                  />
                </div>
              </div>
              <h3 className={`text-2xl font-black mb-4 transition-colors duration-700 ${activeStep >= 2 ? 'text-slate-900' : 'text-slate-500'}`}>2. Write the Exam</h3>
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                Test your knowledge by taking our comprehensive final exam. This ensures you are fully prepared for industry demands.
              </p>
            </div>

            {/* Step 3 */}
            <div 
              onClick={() => setActiveStep(3)}
              className={`flex flex-col items-center text-center cursor-pointer group transition-all duration-700 ${activeStep >= 3 ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
            >
              <div className="relative mb-8">
                {activeStep === 3 && (
                  <div className="absolute inset-0 bg-primary-400 rounded-full animate-ping opacity-20 scale-150"></div>
                )}
                <div className={`relative z-10 w-32 h-32 md:w-40 md:h-40 rounded-full bg-white flex items-center justify-center transition-all duration-700 shadow-xl border-4 ${activeStep >= 3 ? 'border-primary-500 scale-110 shadow-[0_10px_40px_rgba(38,97,156,0.25)]' : 'border-transparent scale-100'}`}>
                  <img 
                    src="https://img.icons8.com/color/256/diploma.png" 
                    alt="Get Certified" 
                    className={`w-16 h-16 md:w-20 md:h-20 object-contain transition-transform duration-700 ${activeStep === 3 ? 'scale-110 drop-shadow-md' : 'scale-100 grayscale'}`} 
                  />
                </div>
              </div>
              <h3 className={`text-2xl font-black mb-4 transition-colors duration-700 ${activeStep >= 3 ? 'text-slate-900' : 'text-slate-500'}`}>3. Get Certified</h3>
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                Upon passing, receive your official NICT certification—a powerful addition to your resume that proves your competence.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Certificate Verification */}
      <section className="w-full px-6 py-24 bg-slate-50 border-y border-black/5">
        <FadeInView>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Verify Your Certificate</h2>
            <p className="text-lg text-slate-500 mb-10 font-medium">
              Enter your unique certificate ID below to verify its authenticity in our database.
            </p>
            
            <form onSubmit={verifyCertificate} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-12">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Search size={20} />
                </div>
                <input 
                  type="text" 
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value.toUpperCase())}
                  placeholder="e.g. NICT-PY-2026-5001"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg shadow-sm uppercase placeholder:normal-case"
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={verificationStatus === 'loading'}
                className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg hover:-translate-y-1 disabled:opacity-70 flex items-center justify-center min-w-[140px]"
              >
                {verificationStatus === 'loading' ? <Loader2 size={24} className="animate-spin" /> : 'Verify'}
              </button>
            </form>

            {/* Status Views */}
            {verificationStatus === 'error' && (
              <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 animate-in fade-in slide-in-from-bottom-4">
                <p className="font-bold text-lg mb-1">Certificate Not Found</p>
                <p className="text-red-500/80 mb-2">Please check the ID and try again, or contact support if you believe this is an error.</p>
                {verifiedData?.course && (
                  <p className="text-sm font-mono bg-red-100 p-2 rounded text-red-800">Error: {verifiedData.course}</p>
                )}
              </div>
            )}

            {verificationStatus === 'success' && verifiedData && (
              <div className="mt-12 flex flex-col items-center animate-in zoom-in-95 fade-in duration-500">
                <div 
                  ref={certificateRef}
                  className="relative w-full max-w-4xl mx-auto shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] bg-white border border-black/10"
                >
                  <img src={certificateTemplateImg} alt="Verified Certificate" className="w-full h-auto block pointer-events-none" />
                  
                  {/* Dynamic Overlays */}
                  
                  {/* Name */}
                  <div className="absolute top-[40.5%] left-0 w-full text-center px-4 flex justify-center items-center">
                    <h3 className="text-xl md:text-3xl lg:text-4xl text-[#1e3a8a] font-serif font-bold tracking-wider">
                      {verifiedData.name}
                    </h3>
                  </div>

                  {/* Course Name */}
                  <div className="absolute top-[52.5%] left-0 w-full text-center px-8">
                    <p className="text-base md:text-xl lg:text-2xl font-serif font-bold text-[#1e3a8a] uppercase tracking-wider">
                      {verifiedData.course}
                    </p>
                  </div>

                  {/* Description (Inside the light blue box) */}
                  <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-full flex justify-center px-4 max-w-[45%]">
                    <p className="text-[8px] md:text-[10px] lg:text-[12px] font-sans text-[#1e3a8a] font-medium tracking-wide leading-relaxed text-center">
                      {getDefaultDescription(verifiedData.course)}
                    </p>
                  </div>

                  {/* Left Bottom Section - Issue Date */}
                  <div className="absolute top-[80.5%] left-[14.5%] md:left-[14%] w-[20%] text-center">
                    <p className="text-[9px] md:text-[11px] lg:text-[13px] font-sans text-[#1e3a8a] font-bold tracking-widest uppercase truncate">
                      {verifiedData.issued_date || new Date().toLocaleDateString()}
                    </p>
                  </div>
                  
                  {/* Center Bottom Section - Certificate ID */}
                  <div className="absolute top-[78.5%] left-1/2 -translate-x-1/2 w-[25%] text-center">
                    <p className="text-[9px] md:text-[11px] lg:text-[13px] font-sans text-[#1e3a8a] font-bold tracking-widest uppercase truncate">
                      {verifiedData.certificate_id}
                    </p>
                  </div>
                </div>

                <button
                  onClick={downloadPDF}
                  disabled={isDownloading}
                  className="mt-8 px-8 py-4 bg-primary-600 text-white rounded-xl font-bold text-lg hover:bg-primary-700 transition-all shadow-lg hover:-translate-y-1 disabled:opacity-70 flex items-center justify-center gap-3 min-w-[240px]"
                >
                  {isDownloading ? <Loader2 size={24} className="animate-spin" /> : <Download size={24} />}
                  {isDownloading ? 'Generating PDF...' : 'Download as PDF'}
                </button>
              </div>
            )}
          </div>
        </FadeInView>
      </section>

      {/* 4. Mini CTA */}
      <section className="w-full px-6 py-32 bg-white">
        <FadeInView>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">Ready to Earn Yours?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/courses" className="px-10 py-5 bg-primary-600 text-white rounded-full font-bold text-lg hover:bg-primary-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3">
                Browse Courses <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </FadeInView>
      </section>

    </div>
  );
}
