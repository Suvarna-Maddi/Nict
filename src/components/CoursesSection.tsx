import { Monitor, Code, Calculator, GraduationCap, Globe, MessageCircle } from 'lucide-react';

const courses = [
  {
    title: "Basic Computer",
    description: "Master MS Office, internet navigation, and fundamental computer operations.",
    icon: Monitor,
    color: "bg-slate-900",
  },
  {
    title: "Programming Basics",
    description: "Learn logical thinking and coding with C, C++, Java, and Python.",
    icon: Code,
    color: "bg-[#dc2626]",
  },
  {
    title: "Tally & Accounting",
    description: "Professional training in Tally for digital accounting and bookkeeping.",
    icon: Calculator,
    color: "bg-slate-800",
  },
  {
    title: "Diploma Courses",
    description: "Comprehensive programs including DCA, PGDCA, and ADCA.",
    icon: GraduationCap,
    color: "bg-slate-900",
  },
  {
    title: "Web Design",
    description: "Learn HTML, CSS, and basic IT skills to build modern websites.",
    icon: Globe,
    color: "bg-[#dc2626]",
  },
  {
    title: "Spoken English",
    description: "Build confidence and fluency with real-world conversation practice.",
    icon: MessageCircle,
    color: "bg-slate-800",
  }
];

export function CoursesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-[#dc2626] uppercase mb-3">Our Offerings</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-black">
            What You Can Learn
          </h3>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg">
            We provide structured, practical courses designed for absolute beginners to intermediate learners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <div key={idx} className="group p-8 rounded-2xl bg-[#fdfbf7] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className={`w-14 h-14 ${course.color} text-white rounded-xl flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300`}>
                <course.icon size={28} />
              </div>
              <h4 className="text-2xl font-bold text-black mb-3">{course.title}</h4>
              <p className="text-slate-600 leading-relaxed font-medium">
                {course.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
