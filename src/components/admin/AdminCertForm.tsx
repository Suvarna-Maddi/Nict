import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import certTemplate from '../../assets/certifi.png';

export function AdminCertForm() {
  const [studentName, setStudentName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [place, setPlace] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [course, setCourse] = useState('');
  const [grade, setGrade] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  
  const [generating, setGenerating] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${studentName || 'Student'}_Certificate`,
    pageStyle: `
      @page {
        size: A4 portrait;
        margin: 0;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
    onBeforeGetContent: () => {
      setGenerating(true);
      return Promise.resolve();
    },
    onAfterPrint: () => setGenerating(false),
  });

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
      {/* Form Section */}
      <div className="space-y-8 bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100">
        <div>
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">Certificate Details</h2>
          <p className="text-gray-500 text-sm mt-2">Fill in the details below to instantly generate a printable certificate.</p>
        </div>
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Student Name</label>
            <input type="text" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm" value={studentName} onChange={e => setStudentName(e.target.value.toUpperCase())} placeholder="Enter student name" />
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Father's Name</label>
            <input type="text" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm" value={fatherName} onChange={e => setFatherName(e.target.value.toUpperCase())} placeholder="Enter father's name" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Place</label>
            <input type="text" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm" value={place} onChange={e => setPlace(e.target.value.toUpperCase())} placeholder="e.g. Warangal" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Month</label>
            <input type="text" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm" value={month} onChange={e => setMonth(e.target.value.toUpperCase())} placeholder="e.g. September" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Year</label>
            <input type="text" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm" value={year} onChange={e => setYear(e.target.value.toUpperCase())} placeholder="e.g. 2026" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Course</label>
            <input type="text" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm" value={course} onChange={e => setCourse(e.target.value.toUpperCase())} placeholder="e.g. PGDCA" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Grade</label>
            <input type="text" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm" value={grade} onChange={e => setGrade(e.target.value.toUpperCase())} placeholder="e.g. A+" />
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Upload Student Photo</label>
            <input type="file" accept="image/*" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-2.5 text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer shadow-sm" onChange={handlePhotoUpload} />
          </div>
        </div>

        <button 
          onClick={handlePrint} 
          disabled={generating}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 font-bold rounded-xl mt-8 shadow-lg shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {generating ? 'Preparing Document...' : 'Print / Save Certificate PDF'}
        </button>
      </div>

      {/* Preview Section - A4 Portrait (approx 794x1123) scaled down */}
      <div className="bg-gray-50/80 p-4 md:p-8 rounded-3xl border border-gray-200/60 flex justify-center items-start overflow-hidden shadow-inner">
        {/* Wrapper to reserve exact scaled dimensions so flexbox doesn't clip */}
        <div className="relative w-[341px] h-[482px] sm:w-[436px] sm:h-[617px] md:w-[516px] md:h-[730px] flex-shrink-0 transition-transform duration-500 hover:scale-[1.01]">
          <div 
            id="cert-preview-container"
            style={{ width: '794px', height: '1123px', transformOrigin: 'top left' }}
            className="bg-white shadow-2xl ring-1 ring-gray-900/5 absolute top-0 left-0 scale-[0.43] sm:scale-[0.55] md:scale-[0.65]"
          >
            {/* Actual Print Area */}
            <div ref={printRef} className="relative w-full h-full bg-white text-black font-serif" style={{ width: '794px', height: '1123px' }}>
              <img src={certTemplate} alt="Certificate Template" className="absolute inset-0 w-full h-full object-cover z-0" />
              
              {/* Absolute positioning based on portrait certificate layout */}
              <div className="absolute z-10 top-[533px] left-[210px] text-2xl font-bold w-[500px] uppercase tracking-wide text-[#1e3a8a]">{studentName}</div>
              <div className="absolute z-10 top-[583px] left-[180px] text-xl font-bold w-[400px] uppercase tracking-wide text-[#1e3a8a]">{fatherName}</div>
              
              <div className="absolute z-10 top-[642px] left-[110px] text-xl font-bold w-[250px] uppercase text-[#1e3a8a] text-center">{place}</div>
              
              <div className="absolute z-10 top-[688px] left-[50px] text-xl font-bold w-[200px] uppercase text-[#1e3a8a] text-center">{month}</div>
              <div className="absolute z-10 top-[688px] left-[360px] text-xl font-bold w-[150px] uppercase text-[#1e3a8a] text-center">{year}</div>

              <div className="absolute z-10 top-[735px] left-[290px] text-xl font-bold w-[400px] uppercase tracking-wide text-[#1e3a8a]">{course}</div>
              
              <div className="absolute z-10 top-[784px] left-[130px] text-xl font-bold w-[150px] uppercase text-[#1e3a8a] text-center">{grade}</div>

              {/* Photo Box Area */}
              <div className="absolute z-10 top-[146px] right-[12px] w-[116px] h-[147px] bg-white flex items-center justify-center overflow-hidden">
                {photo ? (
                  <img src={photo} alt="Student" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[#9ca3af] text-sm">Photo Box</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
