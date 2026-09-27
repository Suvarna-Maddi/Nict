import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { jsPDF } from 'jspdf';
import { supabase } from '../../lib/supabase';
import serviceTemplate from '../../assets/service_certificate.png';

export function AdminServiceCertForm() {
  const [refNo, setRefNo] = useState('');
  const [date, setDate] = useState('');
  const [studentName, setStudentName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [role, setRole] = useState('');
  const [workType, setWorkType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [serviceYears, setServiceYears] = useState('');
  
  const [generating, setGenerating] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const saveToDatabase = async (): Promise<boolean> => {
    if (!refNo) {
      alert("Ref No is required to save.");
      return false;
    }
    
    // Check for existing
    const { data: existing } = await supabase
      .from('service_certificates')
      .select('ref_no')
      .eq('ref_no', refNo)
      .single();
      
    if (existing) {
      alert(`Error: A service certificate with Ref No ${refNo} already exists.`);
      return false;
    }

    const { error } = await supabase
      .from('service_certificates')
      .insert([
        {
          ref_no: refNo,
          date: date,
          name: studentName,
          father_name: fatherName,
          role: role,
          work_type: workType,
          from_date: fromDate,
          to_date: toDate,
          total_years: serviceYears
        }
      ]);

    if (error) {
      console.error('Error inserting service certificate:', error);
      alert('Failed to save record to database: ' + error.message);
      return false;
    }
    
    return true;
  };

  const executePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${studentName || 'Student'}_Service_Certificate`,
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
      img.src = serviceTemplate;
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
        // Using PNG to maintain quality
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, 794, 1123);
      }

      // Heading fields (bold red)
      pdf.setFont('times', 'bold');
      pdf.setTextColor(220, 38, 38); // Red
      pdf.setFontSize(16);
      pdf.text(refNo, 137, 252);    // Ref No after the dots (moved up 10px, right 10px)
      pdf.text(date, 620, 252);     // Date after the dots (moved right +20px -> 620)

      // Content fields (blue italic)
      pdf.setFont('times', 'italic');
      pdf.setTextColor(37, 99, 235); // Blue
      pdf.setFontSize(22);
      pdf.text(studentName, 330, 425, { maxWidth: 430 }); // Name after "Mr./Mrs./Miss."
      pdf.text(fatherName, 120, 480, { maxWidth: 300 });  // After S/o D/o
      pdf.text(role, 490, 480, { maxWidth: 260 });         // After "worked as"
      pdf.text(workType, 60, 538, { maxWidth: 300 });      // Work type (line 3 start)

      pdf.setFontSize(18);
      pdf.text(fromDate, 382, 543, { maxWidth: 160 });     // After "from :"
      pdf.text(toDate, 570, 543, { maxWidth: 160 });        // After "to"
      pdf.text(serviceYears, 215, 605, { maxWidth: 280 }); // After "Total Service Years :"

      pdf.save(`${studentName || 'Student'}_Service_Certificate.pdf`);
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
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">Service Certificate</h2>
          <p className="text-gray-500 text-sm mt-2">Fill in the candidate details below to generate a printable service certificate.</p>
        </div>
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Ref No</label>
            <input type="text" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm" value={refNo} onChange={e => setRefNo(e.target.value.toUpperCase())} placeholder="e.g. NICT/2026/01" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Date</label>
            <input type="text" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm" value={date} onChange={e => setDate(e.target.value.toUpperCase())} placeholder="e.g. 26-09-2026" />
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Candidate Name</label>
            <input type="text" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm" value={studentName} onChange={e => setStudentName(e.target.value.toUpperCase())} placeholder="Enter candidate name" />
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Father's Name</label>
            <input type="text" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm" value={fatherName} onChange={e => setFatherName(e.target.value.toUpperCase())} placeholder="Enter father's name" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Role / Designation</label>
            <input type="text" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm" value={role} onChange={e => setRole(e.target.value.toUpperCase())} placeholder="e.g. SR. PHOTOGRAPHER" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Work Type</label>
            <input type="text" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm" value={workType} onChange={e => setWorkType(e.target.value.toUpperCase())} placeholder="e.g. WEDDING PHOTOGRAPHY" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">From Date</label>
            <input type="text" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm" value={fromDate} onChange={e => setFromDate(e.target.value.toUpperCase())} placeholder="e.g. JAN 2020" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">To Date</label>
            <input type="text" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm" value={toDate} onChange={e => setToDate(e.target.value.toUpperCase())} placeholder="e.g. DEC 2026" />
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Total Service Years</label>
            <input type="text" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm" value={serviceYears} onChange={e => setServiceYears(e.target.value.toUpperCase())} placeholder="e.g. 5 YEARS" />
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
            id="service-preview-container"
            style={{ width: '794px', height: '1123px', transformOrigin: 'top left' }}
            className="bg-white shadow-2xl ring-1 ring-gray-900/5 absolute top-0 left-0 scale-[0.43] sm:scale-[0.55] md:scale-[0.65]"
          >
            {/* Actual Print Area */}
            <div ref={printRef} className="relative w-full h-full bg-white text-black font-serif" style={{ width: '794px', height: '1123px' }}>
              <img src={serviceTemplate} alt="Service Certificate Template" className="absolute inset-0 w-full h-full object-cover z-0" />
              
              {/* Ref No and Date row */}
              <div className="absolute z-10 top-[239px] left-[137px] text-[16px] font-bold text-red-600 uppercase">{refNo}</div>
              <div className="absolute z-10 top-[239px] left-[620px] text-[16px] font-bold text-red-600 uppercase">{date}</div>

              {/* Name - after "This is to Certify that Mr./Mrs./Miss." */}
              <div className="absolute z-10 top-[410px] left-[330px] text-[22px] font-bold italic text-blue-600 uppercase w-[430px]">{studentName}</div>

              {/* Father / Role row */}
              <div className="absolute z-10 top-[466px] left-[120px] text-[22px] font-bold italic text-blue-600 uppercase w-[300px]">{fatherName}</div>
              <div className="absolute z-10 top-[466px] left-[490px] text-[22px] font-bold italic text-blue-600 uppercase w-[260px]">{role}</div>

              {/* Work type + from/to dates row */}
              <div className="absolute z-10 top-[524px] left-[60px] text-[22px] font-bold italic text-blue-600 uppercase w-[300px]">{workType}</div>
              <div className="absolute z-10 top-[530px] left-[382px] text-[18px] font-bold italic text-blue-600 uppercase w-[160px]">{fromDate}</div>
              <div className="absolute z-10 top-[530px] left-[570px] text-[18px] font-bold italic text-blue-600 uppercase w-[160px]">{toDate}</div>

              {/* Total Service Years */}
              <div className="absolute z-10 top-[590px] left-[215px] text-[18px] font-bold italic text-blue-600 uppercase w-[280px]">{serviceYears}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
