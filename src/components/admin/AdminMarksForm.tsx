import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import marksTemplate from '../../assets/marks.png';

interface Subject {
  name: string;
  maxMarks: string;
  marks: string;
}

const DIGIT_TO_WORD: Record<string, string> = {
  '0': 'ZERO', '1': 'ONE', '2': 'TWO', '3': 'THREE', '4': 'FOUR',
  '5': 'FIVE', '6': 'SIX', '7': 'SEVEN', '8': 'EIGHT', '9': 'NINE'
};

export function AdminMarksForm() {
  const [course, setCourse] = useState('');
  const [duration, setDuration] = useState('');
  const [adminNo, setAdminNo] = useState('');
  const [date, setDate] = useState('');
  const [htNo, setHtNo] = useState('');
  const [studentName, setStudentName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [monthYear, setMonthYear] = useState('');
  const [branchPlace, setBranchPlace] = useState('');
  
  const [subjects, setSubjects] = useState<Subject[]>([
    { name: '', maxMarks: '100', marks: '' },
    { name: '', maxMarks: '100', marks: '' },
    { name: '', maxMarks: '100', marks: '' },
    { name: '', maxMarks: '100', marks: '' }
  ]);
  
  const [generating, setGenerating] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handleAddSubject = () => {
    setSubjects([...subjects, { name: '', maxMarks: '100', marks: '' }]);
  };

  const handleSubjectChange = (index: number, field: keyof Subject, value: string) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const handleDeleteSubject = (index: number) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
  };

  const calculateTotal = () => {
    return subjects.reduce((sum, sub) => sum + (parseInt(sub.marks) || 0), 0);
  };

  const calculateMaxTotal = () => {
    return subjects.reduce((sum, sub) => sum + (parseInt(sub.maxMarks) || 0), 0);
  };

  const total = calculateTotal();
  const maxTotal = calculateMaxTotal();
  
  const totalInWords = total.toString().split('').map(digit => DIGIT_TO_WORD[digit]).join(' ');

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${studentName || 'Student'}_Marks_Card`,
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

  const printContent = (
    <div ref={printRef} className="relative w-full h-full bg-white text-black font-serif" style={{ width: '794px', height: '1123px' }}>
      <img src={marksTemplate} alt="Marks Template" className="absolute inset-0 w-full h-full object-cover z-0" />
      
      <div className="absolute z-10 top-[215px] left-[150px] text-[15px] font-bold tracking-wide w-[400px]">{course}</div>
      <div className="absolute z-10 top-[238px] left-[150px] text-[15px] font-bold tracking-wide">{duration}</div>
      <div className="absolute z-10 top-[295px] left-[260px] text-[15px] font-bold tracking-wide">{adminNo}</div>
      <div className="absolute z-10 top-[295px] left-[640px] text-[15px] font-bold tracking-wide">{date}</div>
      <div className="absolute z-10 top-[321px] left-[260px] text-[15px] font-bold tracking-wide">{htNo}</div>
      <div className="absolute z-10 top-[355px] left-[260px] text-[15px] font-bold tracking-wide w-[400px]">{studentName}</div>
      <div className="absolute z-10 top-[382px] left-[260px] text-[15px] font-bold tracking-wide w-[400px]">{fatherName}</div>
      <div className="absolute z-10 top-[422px] left-[260px] text-[15px] font-bold tracking-wide w-[250px]">{monthYear}</div>
      <div className="absolute z-10 top-[449px] left-[260px] text-[15px] font-bold tracking-wide w-[150px]">{branchPlace}</div>

      {/* Subjects Table Area */}
      {subjects.map((sub, i) => (
        <div key={i} className="absolute z-10 w-full text-[15px] font-bold" style={{ top: `${530 + i * 40}px` }}>
          <div className="absolute left-[30px] w-[30px] text-center">{i + 1}</div>
          <div className="absolute left-[150px] uppercase w-[300px]">{sub.name}</div>
          <div className="absolute w-[60px] text-center" style={{ left: '460px', top: i === 0 ? '4px' : '0' }}>{sub.maxMarks}</div>
          <div className="absolute left-[660px] w-[60px] text-center">{sub.marks}</div>
        </div>
      ))}

      {/* Total Area */}
      <div className="absolute z-10 top-[848px] left-[460px] text-[16px] font-bold w-[60px] text-center">{maxTotal}</div>
      <div className="absolute z-10 top-[848px] left-[660px] text-[16px] font-bold w-[60px] text-center">{total}</div>
      <div className="absolute z-10 top-[897px] left-[290px] text-[14px] font-bold uppercase">{totalInWords}</div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative">
      {/* Form Section */}
      <div className="space-y-8 bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100">
        <div>
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">Marks Card Details</h2>
          <p className="text-gray-500 text-sm mt-2">Fill in the student and subject details below to instantly generate a printable marks card.</p>
        </div>
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Course</label>
            <input type="text" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm" value={course} onChange={e => setCourse(e.target.value.toUpperCase())} placeholder="e.g. PGDCA" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Duration</label>
            <input type="text" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm" value={duration} onChange={e => setDuration(e.target.value.toUpperCase())} placeholder="e.g. 1 YEAR" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Admission No</label>
            <input type="text" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm" value={adminNo} onChange={e => setAdminNo(e.target.value.toUpperCase())} placeholder="e.g. ADM12345" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Date</label>
            <input type="text" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm" value={date} onChange={e => setDate(e.target.value.toUpperCase())} placeholder="e.g. 26-09-2026" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">H.T.No</label>
            <input type="text" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm" value={htNo} onChange={e => setHtNo(e.target.value.toUpperCase())} placeholder="e.g. HT09876" />
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
            <label className="block text-sm font-semibold text-gray-700">Month & Year of Pass</label>
            <input type="text" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm" value={monthYear} onChange={e => setMonthYear(e.target.value.toUpperCase())} placeholder="e.g. SEPTEMBER 2026" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">Branch Place</label>
            <input type="text" className="w-full border border-gray-200 bg-gray-50/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm" value={branchPlace} onChange={e => setBranchPlace(e.target.value.toUpperCase())} placeholder="e.g. WARANGAL" />
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 mt-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Subjects</h3>
            <button onClick={handleAddSubject} className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 text-sm font-semibold rounded-lg shadow-sm transition-colors">
              + Add Subject
            </button>
          </div>
          <div className="space-y-4">
            {subjects.map((sub, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-3 bg-gray-50/50 p-4 rounded-2xl border border-gray-100 relative group">
                <input 
                  type="text" 
                  placeholder="Subject Name" 
                  className="flex-1 border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm"
                  value={sub.name}
                  onChange={e => handleSubjectChange(i, 'name', e.target.value.toUpperCase())}
                />
                <input 
                  type="number" 
                  placeholder="Max Marks" 
                  className="w-full sm:w-28 border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm"
                  value={sub.maxMarks}
                  onChange={e => handleSubjectChange(i, 'maxMarks', e.target.value)}
                />
                <input 
                  type="number" 
                  placeholder="Secured" 
                  className="w-full sm:w-32 border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-sm"
                  value={sub.marks}
                  onChange={e => handleSubjectChange(i, 'marks', e.target.value)}
                />
                <button 
                  onClick={() => handleDeleteSubject(i)}
                  className="absolute -right-2 -top-2 sm:-right-3 sm:-top-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-full p-2 h-8 w-8 sm:h-10 sm:w-10 transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100 flex justify-center items-center shadow-md border border-red-200"
                  title="Remove Subject"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={handlePrint} 
          disabled={generating}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 font-bold rounded-xl mt-8 shadow-lg shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {generating ? 'Preparing Document...' : 'Print / Save Marks Card PDF'}
        </button>
      </div>

      {/* Preview Section - A4 Portrait (approx 794x1123) scaled down */}
      <div className="bg-gray-50/80 p-4 md:p-8 rounded-3xl border border-gray-200/60 flex justify-center items-start overflow-hidden shadow-inner">
        {/* Wrapper to reserve exact scaled dimensions so flexbox doesn't clip */}
        <div className="relative w-[341px] h-[482px] sm:w-[436px] sm:h-[617px] md:w-[516px] md:h-[730px] flex-shrink-0 transition-transform duration-500 hover:scale-[1.01]">
          <div 
            id="preview-container"
            style={{ width: '794px', height: '1123px', transformOrigin: 'top left' }}
            className="bg-white shadow-2xl ring-1 ring-gray-900/5 absolute top-0 left-0 scale-[0.43] sm:scale-[0.55] md:scale-[0.65]"
          >
            {printContent}
          </div>
        </div>
      </div>
    </div>
  );
}
