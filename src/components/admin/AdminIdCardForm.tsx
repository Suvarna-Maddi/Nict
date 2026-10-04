import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { jsPDF } from 'jspdf';
import idCardTemplate from '../../assets/id_card.png';

// ID card canvas dimensions — keeps 1:1 with the PNG aspect ratio (~600×900)
const CARD_W = 600;
const CARD_H = 900;

export function AdminIdCardForm() {
  const [regdNo,      setRegdNo]      = useState('');
  const [studentName, setStudentName] = useState('');
  const [fatherName,  setFatherName]  = useState('');
  const [address1,    setAddress1]    = useState('');
  const [address2,    setAddress2]    = useState('');
  const [cell,        setCell]        = useState('');
  const [course,      setCourse]      = useState('');
  const [photo,       setPhoto]       = useState<string | null>(null);
  const [generating,  setGenerating]  = useState(false);

  const printRef = useRef<HTMLDivElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setPhoto(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // ── Print ──────────────────────────────────────────────────────────────────
  const executePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${studentName || 'Student'}_ID_Card`,
    pageStyle: `
      @page { size: ${CARD_W}px ${CARD_H}px; margin: 0; }
      @media print {
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
    `,
    onAfterPrint: () => setGenerating(false),
  });

  const handlePrint = () => {
    setGenerating(true);
    executePrint();
  };

  // ── PDF ───────────────────────────────────────────────────────────────────
  const handleDownloadPDF = async () => {
    setGenerating(true);
    try {
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [CARD_W, CARD_H] });

      // Background template
      const img = new Image();
      img.src = idCardTemplate;
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
      const canvas = document.createElement('canvas');
      canvas.width = img.width; canvas.height = img.height;
      canvas.getContext('2d')!.drawImage(img, 0, 0);
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, CARD_W, CARD_H);

      // Photo — centred in the photo placeholder area
      if (photo) {
        const photoImg = new Image();
        photoImg.src = photo;
        await new Promise((res, rej) => { photoImg.onload = res; photoImg.onerror = rej; });
        const pw = 250, ph = 205;
        const px = (CARD_W - pw) / 2;   // horizontally centred → 175
        const py = 253;
        const pCanvas = document.createElement('canvas');
        pCanvas.width = pw; pCanvas.height = ph;
        const pCtx = pCanvas.getContext('2d')!;
        const scale = Math.max(pw / photoImg.width, ph / photoImg.height);
        pCtx.drawImage(
          photoImg,
          (pw - photoImg.width  * scale) / 2,
          (ph - photoImg.height * scale) / 2,
          photoImg.width  * scale,
          photoImg.height * scale,
        );
        pdf.addImage(pCanvas.toDataURL('image/jpeg'), 'JPEG', px, py, pw, ph);
      }

      // Text — dark blue bold to match template label style
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 139);
      pdf.setFontSize(27);

      // x=315 aligns right after the colon in every label row
      const vx = 315;
      pdf.text(regdNo,      vx, 500);
      pdf.text(studentName, vx, 540);
      pdf.text(fatherName,  vx, 581);
      pdf.text(address1,    vx, 622);
      pdf.text(address2,    vx, 671);
      pdf.text(cell,        vx, 707);
      pdf.text(course,      vx, 743);

      pdf.save(`${studentName || 'Student'}_ID_Card.pdf`);
    } catch (err) {
      console.error('Error generating ID card PDF:', err);
    } finally {
      setGenerating(false);
    }
  };

  // ── Card overlay (shared between print ref and live preview) ──────────────
  const cardOverlay = (
    <div
      ref={printRef}
      className="relative bg-white"
      style={{ width: `${CARD_W}px`, height: `${CARD_H}px` }}
    >
      {/* Template background */}
      <img
        src={idCardTemplate}
        alt="ID Card"
        className="absolute inset-0 w-full h-full object-fill z-0 select-none"
        draggable={false}
      />

      {/* Photo placeholder — matches the silhouette box in id_card.png exactly */}
      <div
        className="absolute z-10 overflow-hidden"
        style={{ top: '253px', left: '175px', width: '250px', height: '205px' }}
      >
        {photo ? (
          <img src={photo} alt="Student" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
        ) : (
          <div className="w-full h-full bg-transparent flex items-center justify-center">
            <span className="text-gray-400 text-xs font-semibold tracking-wide">PHOTO</span>
          </div>
        )}
      </div>

      {/*
        ── Dynamic text rows ──
        The template's label column ends at ~x=300 (colon position).
        Values start at x=315 to sit just after the colon with a small gap.
        Row top positions (in the 600×900 space):
          Regd.No.    → 497px
          Name        → 533px
          Father Name → 569px
          Address L1  → 605px
          Address L2  → 639px
          Cell        → 675px
          Course      → 711px
      */}
      {(
        [
          { top: 487, value: regdNo      },
          { top: 528, value: studentName },
          { top: 569, value: fatherName  },
          { top: 610, value: address1    },
          { top: 659, value: address2    },
          { top: 695, value: cell        },
          { top: 731, value: course      },
        ] as { top: number; value: string }[]
      ).map(({ top, value }) => (
        <div
          key={top}
          className="absolute z-10"
          style={{
            top:          `${top}px`,
            left:         '315px',
            maxWidth:     '265px',
            fontSize:     '27px',
            fontWeight:   800,
            color:        '#00008b',
            lineHeight:   1,
            whiteSpace:   'nowrap',
            overflow:     'hidden',
            textOverflow: 'ellipsis',
            fontFamily:   'Arial, sans-serif',
          }}
        >
          {value}
        </div>
      ))}
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

      {/* Form */}
      <div className="space-y-8 bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100">
        <div>
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
            ID Card Generator
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Fill in the student details to instantly generate a printable ID card.
          </p>
        </div>

        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-5">

          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Regd. No.</label>
            <input type="text"
              className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm"
              value={regdNo} onChange={e => setRegdNo(e.target.value.toUpperCase())}
              placeholder="e.g. NICT/2026/001" />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Student Name</label>
            <input type="text"
              className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm"
              value={studentName} onChange={e => setStudentName(e.target.value.toUpperCase())}
              placeholder="Enter student name" />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Father's Name</label>
            <input type="text"
              className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm"
              value={fatherName} onChange={e => setFatherName(e.target.value.toUpperCase())}
              placeholder="Enter father's name" />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Address — Line 1</label>
            <input type="text"
              className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm"
              value={address1} onChange={e => setAddress1(e.target.value.toUpperCase())}
              placeholder="e.g. H.No. 1-2-3, Street Name" />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Address — Line 2</label>
            <input type="text"
              className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm"
              value={address2} onChange={e => setAddress2(e.target.value.toUpperCase())}
              placeholder="e.g. Warangal — 506001" />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Cell Number</label>
            <input type="tel"
              className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm"
              value={cell} onChange={e => setCell(e.target.value)}
              placeholder="+91 XXXXX XXXXX" />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Course</label>
            <input type="text"
              className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm"
              value={course} onChange={e => setCourse(e.target.value.toUpperCase())}
              placeholder="e.g. PGDCA" />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Upload Student Photo</label>
            <input type="file" accept="image/*"
              className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-2.5 text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer shadow-sm"
              onChange={handlePhotoUpload} />
          </div>
        </div>

        {/* Action buttons */}
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
            {generating ? 'Generating PDF...' : 'Download as PDF'}
          </button>
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-gray-50/80 p-4 md:p-8 rounded-3xl border border-gray-200/60 flex justify-center items-start overflow-hidden shadow-inner">
        {/*
          Card natural: 600×900
          Wrapper reserves scaled space so flex/grid doesn't clip the transformed div.
          scale-[0.43] → 258×387  |  scale-[0.50] → 300×450  |  scale-[0.60] → 360×540
        */}
        <div className="relative w-[258px] h-[387px] sm:w-[300px] sm:h-[450px] md:w-[360px] md:h-[540px] flex-shrink-0 transition-transform duration-500 hover:scale-[1.01]">
          <div
            id="id-card-preview-container"
            style={{ width: `${CARD_W}px`, height: `${CARD_H}px`, transformOrigin: 'top left' }}
            className="absolute top-0 left-0 scale-[0.43] sm:scale-[0.50] md:scale-[0.60] bg-white shadow-2xl ring-1 ring-gray-900/5"
          >
            {cardOverlay}
          </div>
        </div>
      </div>

    </div>
  );
}
