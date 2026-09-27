import { useState, useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { supabase } from '../lib/supabase';
import marksTemplate from '../assets/marks.png';
import certTemplate from '../assets/certifi.png';
import serviceTemplate from '../assets/service_certificate.png';

// ── Types ────────────────────────────────────────────────────────────────────

type CategoryType = 'marks' | 'certificate' | 'service' | null;

interface MarksRecord {
  type: 'marks';
  ht_no: string;
  admin_no: string;
  name: string;
  father_name: string;
  course: string;
  duration: string;
  month_year: string;
  branch: string;
  subjects: { name: string; maxMarks: string; marks: string }[];
  total: number;
}

interface CertRecord {
  type: 'certificate';
  ref_no: string;
  name: string;
  father_name: string;
  place: string;
  month: string;
  year: string;
  course: string;
  grade: string;
  photo_url?: string;
}

interface ServiceRecord {
  type: 'service';
  ref_no: string;
  date: string;
  name: string;
  father_name: string;
  role: string;
  work_type: string;
  from_date: string;
  to_date: string;
  total_years: string;
}

type FoundRecord = MarksRecord | CertRecord | ServiceRecord;

// ── Helpers ──────────────────────────────────────────────────────────────────

const DIGIT_TO_WORD: Record<string, string> = {
  '0': 'ZERO', '1': 'ONE', '2': 'TWO', '3': 'THREE', '4': 'FOUR',
  '5': 'FIVE', '6': 'SIX', '7': 'SEVEN', '8': 'EIGHT', '9': 'NINE',
};

function marksInWords(total: number): string {
  return total.toString().split('').map(d => DIGIT_TO_WORD[d]).join(' ');
}

function maxTotal(subjects: { maxMarks: string }[]): number {
  return subjects.reduce((s, sub) => s + (parseInt(sub.maxMarks) || 0), 0);
}

// ── PDF generators ────────────────────────────────────────────────────────────

async function generateMarksPDF(data: MarksRecord) {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [794, 1123] });
  const img = new Image(); img.src = marksTemplate;
  await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
  const canvas = document.createElement('canvas');
  canvas.width = img.width; canvas.height = img.height;
  const ctx = canvas.getContext('2d')!; ctx.drawImage(img, 0, 0);
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 794, 1123);
  pdf.setFont('times', 'bold'); pdf.setTextColor(0, 0, 0); pdf.setFontSize(15);
  const bOff = 12;
  pdf.text(data.course, 150, 215 + bOff); pdf.text(data.duration, 150, 238 + bOff);
  pdf.text(data.admin_no, 260, 295 + bOff); pdf.text(data.ht_no, 260, 321 + bOff);
  pdf.text(data.name, 260, 355 + bOff); pdf.text(data.father_name, 260, 382 + bOff);
  pdf.text(data.month_year, 260, 422 + bOff); pdf.text(data.branch, 260, 449 + bOff);
  data.subjects.forEach((sub, i) => {
    const y = 530 + i * 40 + bOff;
    pdf.text((i + 1).toString(), 60, y, { align: 'center' });
    pdf.text(sub.name, 150, y); pdf.text(sub.maxMarks, 490, y, { align: 'center' });
    pdf.text(sub.marks, 690, y, { align: 'center' });
  });
  pdf.setFontSize(16);
  pdf.text(maxTotal(data.subjects).toString(), 490, 848 + bOff, { align: 'center' });
  pdf.text(data.total.toString(), 690, 848 + bOff, { align: 'center' });
  pdf.setFontSize(14); pdf.text(marksInWords(data.total), 290, 897 + bOff);
  pdf.save(`${data.name || 'Student'}_Marks_Card.pdf`);
}

async function generateCertPDF(data: CertRecord) {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [794, 1123] });
  const img = new Image(); img.src = certTemplate;
  await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
  const canvas = document.createElement('canvas');
  canvas.width = img.width; canvas.height = img.height;
  const ctx = canvas.getContext('2d')!; ctx.drawImage(img, 0, 0);
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 794, 1123);
  if (data.photo_url && data.photo_url.length > 10) {
    try {
      const photoImg = new Image(); photoImg.src = data.photo_url;
      await new Promise((res, rej) => { photoImg.onload = res; photoImg.onerror = rej; });
      const photoCanvas = document.createElement('canvas');
      photoCanvas.width = 116; photoCanvas.height = 147;
      const photoCtx = photoCanvas.getContext('2d')!;
      const scale = Math.max(116 / photoImg.width, 147 / photoImg.height);
      photoCtx.drawImage(photoImg, (116 / 2) - (photoImg.width / 2) * scale, (147 / 2) - (photoImg.height / 2) * scale, photoImg.width * scale, photoImg.height * scale);
      pdf.addImage(photoCanvas.toDataURL('image/jpeg'), 'JPEG', 650, 146, 116, 147);
    } catch (_) { /* photo optional */ }
  }
  pdf.setFont('times', 'bold'); pdf.setTextColor(30, 58, 138);
  pdf.setFontSize(24); pdf.text(data.name, 210, 533 + 18);
  pdf.setFontSize(20);
  pdf.text(data.father_name, 180, 583 + 15); pdf.text(data.place, 235, 642 + 15, { align: 'center' });
  pdf.text(data.month, 150, 688 + 15, { align: 'center' }); pdf.text(data.year, 435, 688 + 15, { align: 'center' });
  pdf.text(data.course, 290, 735 + 15); pdf.text(data.grade, 205, 784 + 15, { align: 'center' });
  pdf.save(`${data.name || 'Student'}_Certificate.pdf`);
}

async function generateServicePDF(data: ServiceRecord) {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [794, 1123] });
  const img = new Image(); img.src = serviceTemplate;
  await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
  const canvas = document.createElement('canvas');
  canvas.width = img.width; canvas.height = img.height;
  const ctx = canvas.getContext('2d')!; ctx.drawImage(img, 0, 0);
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 794, 1123);

  // Heading fields (bold red)
  pdf.setFont('times', 'bold');
  pdf.setTextColor(220, 38, 38);
  pdf.setFontSize(16);
  pdf.text(data.ref_no, 137, 252);
  pdf.text(data.date || '', 630, 252);

  // Content fields (blue italic)
  pdf.setFont('times', 'italic');
  pdf.setTextColor(37, 99, 235);
  pdf.setFontSize(22);
  pdf.text(data.name, 374, 441, { maxWidth: 430 });
  pdf.text(data.father_name, 150, 496, { maxWidth: 300 });
  pdf.text(data.role, 520, 496, { maxWidth: 260 });
  pdf.text(data.work_type, 90, 554, { maxWidth: 300 });

  pdf.setFontSize(18);
  pdf.text(data.from_date, 412, 559, { maxWidth: 160 });
  pdf.text(data.to_date, 600, 559, { maxWidth: 160 });
  pdf.text(data.total_years || '', 245, 621, { maxWidth: 280 });

  pdf.save(`${data.name || 'Candidate'}_Service_Certificate.pdf`);
}

// ── Template Previews ────────────────────────────────────────────────────────

function MarksPreview({ data }: { data: MarksRecord }) {
  const mt = maxTotal(data.subjects);
  return (
    <div className="relative bg-white text-black font-serif" style={{ width: '794px', height: '1123px' }}>
      <img src={marksTemplate} alt="Marks Template" className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="absolute z-10 top-[215px] left-[150px] text-[15px] font-bold tracking-wide w-[400px]">{data.course}</div>
      <div className="absolute z-10 top-[238px] left-[150px] text-[15px] font-bold tracking-wide">{data.duration}</div>
      <div className="absolute z-10 top-[295px] left-[260px] text-[15px] font-bold tracking-wide">{data.admin_no}</div>
      <div className="absolute z-10 top-[321px] left-[260px] text-[15px] font-bold tracking-wide">{data.ht_no}</div>
      <div className="absolute z-10 top-[355px] left-[260px] text-[15px] font-bold tracking-wide w-[400px]">{data.name}</div>
      <div className="absolute z-10 top-[382px] left-[260px] text-[15px] font-bold tracking-wide w-[400px]">{data.father_name}</div>
      <div className="absolute z-10 top-[422px] left-[260px] text-[15px] font-bold tracking-wide w-[250px]">{data.month_year}</div>
      <div className="absolute z-10 top-[449px] left-[260px] text-[15px] font-bold tracking-wide w-[150px]">{data.branch}</div>
      {data.subjects.map((sub, i) => (
        <div key={i} className="absolute z-10 w-full text-[15px] font-bold" style={{ top: `${530 + i * 40}px` }}>
          <div className="absolute left-[30px] w-[30px] text-center">{i + 1}</div>
          <div className="absolute left-[150px] uppercase w-[300px]">{sub.name}</div>
          <div className="absolute w-[60px] text-center" style={{ left: '460px' }}>{sub.maxMarks}</div>
          <div className="absolute left-[660px] w-[60px] text-center">{sub.marks}</div>
        </div>
      ))}
      <div className="absolute z-10 top-[848px] left-[460px] text-[16px] font-bold w-[60px] text-center">{mt}</div>
      <div className="absolute z-10 top-[848px] left-[660px] text-[16px] font-bold w-[60px] text-center">{data.total}</div>
      <div className="absolute z-10 top-[897px] left-[290px] text-[14px] font-bold uppercase">{marksInWords(data.total)}</div>
    </div>
  );
}

function CertPreview({ data }: { data: CertRecord }) {
  return (
    <div className="relative bg-white text-black font-serif" style={{ width: '794px', height: '1123px' }}>
      <img src={certTemplate} alt="Certificate Template" className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="absolute z-10 top-[533px] left-[210px] text-2xl font-bold w-[500px] uppercase tracking-wide text-[#1e3a8a]">{data.name}</div>
      <div className="absolute z-10 top-[583px] left-[180px] text-xl font-bold w-[400px] uppercase tracking-wide text-[#1e3a8a]">{data.father_name}</div>
      <div className="absolute z-10 top-[642px] left-[110px] text-xl font-bold w-[250px] uppercase text-[#1e3a8a] text-center">{data.place}</div>
      <div className="absolute z-10 top-[688px] left-[50px] text-xl font-bold w-[200px] uppercase text-[#1e3a8a] text-center">{data.month}</div>
      <div className="absolute z-10 top-[688px] left-[360px] text-xl font-bold w-[150px] uppercase text-[#1e3a8a] text-center">{data.year}</div>
      <div className="absolute z-10 top-[735px] left-[290px] text-xl font-bold w-[400px] uppercase tracking-wide text-[#1e3a8a]">{data.course}</div>
      <div className="absolute z-10 top-[784px] left-[130px] text-xl font-bold w-[150px] uppercase text-[#1e3a8a] text-center">{data.grade}</div>
      <div className="absolute z-10 top-[146px] right-[12px] w-[116px] h-[147px] bg-white flex items-center justify-center overflow-hidden">
        {data.photo_url && data.photo_url.length > 10
          ? <img src={data.photo_url} alt="Student" className="w-full h-full object-cover" />
          : <span className="text-gray-400 text-xs text-center">No Photo</span>}
      </div>
    </div>
  );
}

function ServicePreview({ data }: { data: ServiceRecord }) {
  return (
    <div className="relative bg-white text-black font-serif" style={{ width: '794px', height: '1123px' }}>
      <img src={serviceTemplate} alt="Service Certificate Template" className="absolute inset-0 w-full h-full object-cover z-0" />
      {/* Ref No and Date row */}
      <div className="absolute z-10 top-[239px] left-[137px] text-[16px] font-bold text-red-600 uppercase">{data.ref_no}</div>
      <div className="absolute z-10 top-[239px] left-[630px] text-[16px] font-bold text-red-600 uppercase">{data.date}</div>

      {/* Name - after "This is to Certify that Mr./Mrs./Miss." */}
      <div className="absolute z-10 top-[426px] left-[374px] text-[22px] font-bold italic text-blue-600 uppercase w-[430px]">{data.name}</div>

      {/* Father / Role row */}
      <div className="absolute z-10 top-[482px] left-[150px] text-[22px] font-bold italic text-blue-600 uppercase w-[300px]">{data.father_name}</div>
      <div className="absolute z-10 top-[482px] left-[520px] text-[22px] font-bold italic text-blue-600 uppercase w-[260px]">{data.role}</div>

      {/* Work type + from/to dates row */}
      <div className="absolute z-10 top-[540px] left-[90px] text-[22px] font-bold italic text-blue-600 uppercase w-[300px]">{data.work_type}</div>
      <div className="absolute z-10 top-[546px] left-[412px] text-[18px] font-bold italic text-blue-600 uppercase w-[160px]">{data.from_date}</div>
      <div className="absolute z-10 top-[546px] left-[600px] text-[18px] font-bold italic text-blue-600 uppercase w-[160px]">{data.to_date}</div>

      {/* Total Service Years */}
      <div className="absolute z-10 top-[606px] left-[245px] text-[18px] font-bold italic text-blue-600 uppercase w-[280px]">{data.total_years}</div>
    </div>
  );
}

// ── Category Card ─────────────────────────────────────────────────────────────

interface CategoryCardProps {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  placeholder: string;
  accentClass: string;
  borderClass: string;
  bgClass: string;
  iconBgClass: string;
  selected: boolean;
  onClick: () => void;
}

function CategoryCard({ id, icon, label, description, accentClass, borderClass, bgClass, iconBgClass, selected, onClick }: CategoryCardProps) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`relative w-full text-left rounded-[2rem] p-6 border-2 transition-all duration-400 group overflow-hidden ${
        selected
          ? `${borderClass} ${bgClass} shadow-xl shadow-${accentClass.split('-')[1]}-500/20 -translate-y-1`
          : 'border-white/80 bg-white/70 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1'
      }`}
    >
      {!selected && <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}
      
      {selected && (
        <span className={`absolute top-5 right-5 w-7 h-7 rounded-full ${iconBgClass} flex items-center justify-center shadow-md animate-in fade-in zoom-in duration-300`}>
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}
      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-2xl ${selected ? iconBgClass : 'bg-slate-100 group-hover:bg-blue-50'} flex items-center justify-center mb-5 transition-colors duration-400 shadow-sm`}>
          <span className={`${selected ? 'text-white' : accentClass} transition-colors duration-400`}>{icon}</span>
        </div>
        <p className={`font-extrabold text-lg tracking-tight mb-1.5 ${selected ? accentClass : 'text-slate-800'}`}>{label}</p>
        <p className={`text-sm leading-relaxed font-medium ${selected ? 'text-slate-700' : 'text-slate-500'}`}>{description}</p>
      </div>
    </button>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: 'cat-marks',
    type: 'marks' as CategoryType,
    label: 'Marks Card',
    description: 'Enter Hall Ticket Number',
    placeholder: 'Enter Hall Ticket No (e.g. 2026/WGL/1020)',
    accentClass: 'text-blue-600',
    borderClass: 'border-blue-500',
    bgClass: 'bg-blue-50',
    iconBgClass: 'bg-blue-600',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 'cat-cert',
    type: 'certificate' as CategoryType,
    label: 'Certificate',
    description: 'Enter Reference ID (contains NICT)',
    placeholder: 'Enter Ref ID (e.g. NICT/2026/01)',
    accentClass: 'text-purple-600',
    borderClass: 'border-purple-500',
    bgClass: 'bg-purple-50',
    iconBgClass: 'bg-purple-600',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    id: 'cat-service',
    type: 'service' as CategoryType,
    label: 'Service Certificate',
    description: 'Enter Reference ID (contains NICT)',
    placeholder: 'Enter Ref ID (e.g. NICT/SC/2026/01)',
    accentClass: 'text-emerald-600',
    borderClass: 'border-emerald-500',
    bgClass: 'bg-emerald-50',
    iconBgClass: 'bg-emerald-600',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export function Verify() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState<FoundRecord | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');

  const activeCat = CATEGORIES.find(c => c.type === selectedCategory);

  const handleSelectCategory = (type: CategoryType) => {
    setSelectedCategory(type);
    setQuery('');
    setRecord(null);
    setNotFound(false);
    setError('');
  };

  const handleVerify = async () => {
    const input = query.trim().toUpperCase();
    if (!input || !selectedCategory) return;
    setLoading(true);
    setRecord(null);
    setNotFound(false);
    setError('');

    try {
      if (selectedCategory === 'marks') {
        const { data, error: err } = await supabase
          .from('marks_records').select('*').eq('ht_no', input).single();
        if (err || !data) { setNotFound(true); }
        else { setRecord({ type: 'marks', ...data }); }

      } else if (selectedCategory === 'certificate') {
        const { data, error: err } = await supabase
          .from('certificates').select('*').eq('ref_no', input).single();
        if (err || !data) { setNotFound(true); }
        else { setRecord({ type: 'certificate', ...data }); }

      } else if (selectedCategory === 'service') {
        const { data, error: err } = await supabase
          .from('service_certificates').select('*').eq('ref_no', input).single();
        if (err || !data) { setNotFound(true); }
        else { setRecord({ type: 'service', ...data }); }
      }
    } catch (_) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!record) return;
    setDownloading(true);
    try {
      if (record.type === 'marks') await generateMarksPDF(record);
      else if (record.type === 'certificate') await generateCertPDF(record);
      else await generateServicePDF(record);
    } finally {
      setDownloading(false);
    }
  };

  const [scaleRatio, setScaleRatio] = useState(1);
  const previewWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calc = () => {
      if (previewWrapperRef.current) {
        const w = previewWrapperRef.current.clientWidth - 32; // subtract inner padding
        setScaleRatio(Math.min(1, w / 794));
      }
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [record]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#f4f7fb] py-16 px-4 selection:bg-blue-200">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] rounded-full bg-blue-300/30 blur-[120px]"></div>
        <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-purple-300/30 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] rounded-full bg-emerald-300/20 blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* ── Header ──────────────────────────────────────── */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-white/40 text-blue-700 text-sm font-bold px-5 py-2.5 rounded-full mb-6 shadow-sm ring-1 ring-black/5">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Official Verification Portal
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 drop-shadow-sm leading-tight">
            Verify Certificate & Marks
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Select a document type below, enter your unique ID, and instantly verify the authenticity of your document.
          </p>
        </div>

        {/* ── Step 1: Category Selector ────────────────────── */}
        <div className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-6 md:p-10 mb-8 relative">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-black flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/20">1</span>
            <p className="font-extrabold text-slate-800 text-xl tracking-tight">Select Document Type</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CATEGORIES.map(cat => (
              <CategoryCard
                key={cat.id}
                {...cat}
                selected={selectedCategory === cat.type}
                onClick={() => handleSelectCategory(cat.type)}
              />
            ))}
          </div>
        </div>

        {/* ── Step 2: Search Box (visible only after category selected) ── */}
        <div className={`transition-all duration-700 ease-out ${selectedCategory ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none hidden'}`}>
          <div className={`relative overflow-hidden rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border p-6 md:p-10 mb-8 transition-colors duration-500 ${activeCat ? activeCat.bgClass + ' ' + activeCat.borderClass.replace('border-', 'border-2 border-') : 'bg-white/80 border-white/60'}`}>
            
            {/* Soft background glow based on category */}
            <div className={`absolute top-0 right-0 w-64 h-64 -mr-16 -mt-16 rounded-full blur-[80px] opacity-30 pointer-events-none ${activeCat?.iconBgClass}`} />

            <div className="relative z-10 flex items-center gap-3 mb-6">
              <span className={`w-8 h-8 rounded-full text-white text-sm font-black flex items-center justify-center flex-shrink-0 shadow-md ${activeCat?.iconBgClass ?? 'bg-slate-400'}`}>2</span>
              <p className="font-extrabold text-slate-800 text-xl tracking-tight">
                Enter your {activeCat?.label} ID
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none transition-colors">
                  <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  id="verify-input"
                  type="text"
                  value={query}
                  onChange={e => { setQuery(e.target.value); setNotFound(false); setRecord(null); }}
                  onKeyDown={e => e.key === 'Enter' && handleVerify()}
                  placeholder={activeCat?.placeholder ?? 'Enter ID...'}
                  className="w-full pl-14 pr-6 py-5 border-2 border-white/80 rounded-2xl text-slate-800 bg-white/90 backdrop-blur-md focus:outline-none focus:ring-0 focus:border-blue-500 transition-all shadow-sm text-lg font-medium placeholder:text-slate-400"
                />
              </div>
              <button
                id="verify-button"
                onClick={handleVerify}
                disabled={loading || !query.trim()}
                className={`sm:w-44 text-white font-extrabold text-lg py-5 px-8 rounded-2xl shadow-xl transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 ${
                  activeCat?.type === 'marks' ? 'bg-gradient-to-br from-blue-600 to-blue-800 shadow-blue-500/40' :
                  activeCat?.type === 'certificate' ? 'bg-gradient-to-br from-purple-600 to-purple-800 shadow-purple-500/40' :
                  activeCat?.type === 'service' ? 'bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-emerald-500/40' :
                  'bg-gradient-to-r from-blue-600 to-indigo-600'
                }`}
              >
                {loading ? (
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Verify
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Error ──────────────────────────────────────────── */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 font-medium text-center">
            ⚠️ {error}
          </div>
        )}

        {/* ── Not Found ──────────────────────────────────────── */}
        {notFound && !record && (
          <div className="text-center py-16 px-6 bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-white shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-24 h-24 mx-auto mb-6 bg-red-50/80 rounded-full flex items-center justify-center shadow-inner border border-red-100">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">No Record Found</h2>
            <p className="text-slate-500 text-lg max-w-md mx-auto leading-relaxed">
              We couldn't find any <strong>{activeCat?.label}</strong> matching <strong>"{query.trim()}"</strong>. Please double-check your ID.
            </p>
          </div>
        )}

        {/* ── Result ─────────────────────────────────────────── */}
        {record && (
          <div className="space-y-6">
            {/* Verified badge + download */}
            <div className="flex items-center justify-between flex-wrap gap-3 bg-white rounded-2xl border border-green-200 shadow p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Record Verified ✓</p>
                  <p className="text-sm text-gray-500">{activeCat?.label} found for <strong>{record.name}</strong></p>
                </div>
              </div>
              <button
                id="download-pdf-button"
                onClick={handleDownload}
                disabled={downloading}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-5 rounded-xl shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {downloading ? (
                  <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg> Generating...</>
                ) : (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg> Download PDF</>
                )}
              </button>
            </div>

            {/* Preview */}
            <div
              ref={previewWrapperRef}
              className="bg-gray-50 rounded-3xl border border-gray-200 p-4 overflow-x-auto shadow-inner"
            >
              <div
                className="flex-shrink-0 mx-auto"
                style={{
                  width: `${794 * scaleRatio}px`,
                  height: `${1123 * scaleRatio}px`,
                  position: 'relative',
                }}
              >
                <div
                  className="absolute top-0 left-0 origin-top-left shadow-2xl"
                  style={{
                    width: '794px',
                    height: '1123px',
                    transform: `scale(${scaleRatio})`,
                  }}
                >
                  {record.type === 'marks' && <MarksPreview data={record} />}
                  {record.type === 'certificate' && <CertPreview data={record} />}
                  {record.type === 'service' && <ServicePreview data={record} />}
                </div>
              </div>
            </div>

            {/* Bottom download button */}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {downloading ? 'Generating PDF...' : '⬇ Download PDF'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
