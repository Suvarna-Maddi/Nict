import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { jsPDF } from 'jspdf';
import { supabase } from '../../lib/supabase';
import certTemplate from '../../assets/certifi.png';

export function AdminCertForm() {
  const [refNo, setRefNo] = useState('');
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

  const saveToDatabase = async (): Promise<boolean> => {
    if (!refNo) {
      alert("Ref No is required to save.");
      return false;
    }
    
    // Check for existing
    const { data: existing } = await supabase
      .from('certificates')
      .select('ref_no')
      .eq('ref_no', refNo)
      .single();
      
    if (existing) {
      alert(`Error: A certificate with Ref No ${refNo} already exists.`);
      return false;
    }

    const { error } = await supabase
      .from('certificates')
      .insert([
        {
          ref_no: refNo,
          name: studentName,
          father_name: fatherName,
          place: place,
          month: month,
          year: year,
          course: course,
          grade: grade,
          photo_url: photo || '' // storing base64 temporarily
        }
      ]);

    if (error) {
      console.error('Error inserting certificate:', error);
      alert('Failed to save record to database: ' + error.message);
      return false;
    }
    
    return true;
  };

  const executePrint = useReactToPrint({
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
    onBeforePrint: () => {
      return Promise.resolve();
    },
    onAfterPrint: () => setGenerating(false),
  });

  const handlePrint = async () => {
    setGenerating(true);
    const saved = await saveToDatabase();
    if (saved) {
      executePrint();
    } else {
      setGenerating(false);
    }
  };

  const handleDownloadPDF = async () => {
    setGenerating(true);
    const saved = await saveToDatabase();
    if (!saved) {
      setGenerating(false);
      return;
    }

    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [794, 1123]
      });

      const img = new Image();
      img.src = certTemplate;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, 794, 1123);
      }

      if (photo) {
        const photoImg = new Image();
        photoImg.src = photo;
        await new Promise((resolve, reject) => {
          photoImg.onload = resolve;
          photoImg.onerror = reject;
        });
        const photoCanvas = document.createElement('canvas');
        photoCanvas.width = 116;
        photoCanvas.height = 147;
        const photoCtx = photoCanvas.getContext('2d');
        if (photoCtx) {
          const scale = Math.max(116 / photoImg.width, 147 / photoImg.height);
          const x = (116 / 2) - (photoImg.width / 2) * scale;
          const y = (147 / 2) - (photoImg.height / 2) * scale;
          photoCtx.drawImage(photoImg, x, y, photoImg.width * scale, photoImg.height * scale);
          const photoData = photoCanvas.toDataURL('image/jpeg');
          // Adjusted X coordinate for PDF only to fix the right-shift issue
          pdf.addImage(photoData, 'JPEG', 650, 146, 116, 147);
        }
      }

      pdf.setFont('times', 'bold');
      pdf.setTextColor(0, 0, 0);
      
      const bOff2xl = 18;
      const bOffXl = 15;

      pdf.setFont('times', 'bolditalic');
      pdf.setTextColor(37, 99, 235);
      pdf.setFontSize(22);
      pdf.text('He/She', 160, 533 + bOff2xl);

      pdf.setFont('times', 'bold');
      pdf.setTextColor(30, 58, 138);
      pdf.setFontSize(22);
      pdf.text(studentName, 360, 533 + bOff2xl);
      
      pdf.setFontSize(22);
      pdf.text(fatherName, 180, 583 + bOffXl);
      pdf.text(place, 110 + 125, 642 + bOffXl, { align: 'center' });
      pdf.text(month, 50 + 100, 688 + bOffXl, { align: 'center' });
      pdf.text(year, 360 + 75, 688 + bOffXl, { align: 'center' });
      pdf.text(course, 290, 735 + bOffXl);
      pdf.text(grade, 130 + 75, 784 + bOffXl, { align: 'center' });

      // Bottom-left contact info
      pdf.setFont('times', 'bold');
      pdf.setTextColor(30, 58, 138);
      pdf.setFontSize(13);
      pdf.text('www.nictcomputerstraining.com  |  +91 82474 19292', 14, 1105);

      pdf.save(`${studentName || 'Student'}_Certificate.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setGenerating(false);
    }
  };

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
            <label className="block text-sm font-semibold text-gray-700">Ref No (Required for DB)</label>
            <input type="text" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm" value={refNo} onChange={e => setRefNo(e.target.value.toUpperCase())} placeholder="Enter reference number" />
          </div>
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

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button 
            onClick={handlePrint} 
            disabled={generating}
            className="flex-1 bg-white hover:bg-gray-50 text-blue-700 border-2 border-blue-600 py-4 font-bold rounded-xl shadow-sm transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {generating ? 'Wait...' : 'Print Direct'}
          </button>
          <button 
            onClick={handleDownloadPDF} 
            disabled={generating}
            className="flex-[2] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 font-bold rounded-xl shadow-lg shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {generating ? 'Generating PDF...' : 'Download as PDF (Best for Mobile)'}
          </button>
        </div>
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
              
              {/* He/She static text - right beside "Certify That" on the same row */}
              <div className="absolute z-10 top-[533px] left-[160px] text-[20px] font-bold italic text-[#2563eb]">He/She</div>
              {/* Student name - fills the dotted line after He/She */}
              <div className="absolute z-10 top-[533px] left-[360px] text-[20px] font-bold w-[380px] uppercase tracking-wide text-[#1e3a8a]">{studentName}</div>
              {/* Father name - on S/o. D/o. row */}
              <div className="absolute z-10 top-[583px] left-[180px] text-[20px] font-bold w-[400px] uppercase tracking-wide text-[#1e3a8a]">{fatherName}</div>
              
              <div className="absolute z-10 top-[642px] left-[110px] text-[20px] font-bold w-[250px] uppercase text-black text-center">{place}</div>
              
              <div className="absolute z-10 top-[688px] left-[50px] text-[20px] font-bold w-[200px] uppercase text-black text-center">{month}</div>
              <div className="absolute z-10 top-[688px] left-[360px] text-[20px] font-bold w-[150px] uppercase text-black text-center">{year}</div>

              <div className="absolute z-10 top-[735px] left-[290px] text-[20px] font-bold w-[400px] uppercase tracking-wide text-black">{course}</div>
              
              <div className="absolute z-10 top-[784px] left-[130px] text-[20px] font-bold w-[150px] uppercase text-black text-center">{grade}</div>

              {/* Photo Box Area */}
              <div className="absolute z-10 top-[146px] right-[12px] w-[116px] h-[147px] bg-white flex items-center justify-center overflow-hidden">
                {photo ? (
                  <img src={photo} alt="Student" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[#9ca3af] text-sm">Photo Box</span>
                )}
              </div>

              {/* Bottom-left contact info */}
              <div className="absolute z-10 bottom-[12px] left-[14px] text-[13px] font-bold text-blue-800 whitespace-nowrap">
                www.nictcomputerstraining.com&nbsp;&nbsp;|&nbsp;&nbsp;+91 82474 19292
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
