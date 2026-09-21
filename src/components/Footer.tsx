import { Link } from 'react-router-dom';
import logoUrl from '../assets/logo.png';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-red-800 pt-20 pb-10 bg-gradient-to-r from-[#dc2626] to-[#991b1b]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          <div className="sm:col-span-2 lg:col-span-2">
            {/* Logo with original colors */}
            <img src={logoUrl} alt="NICT Logo" className="w-64 mb-6 opacity-100" />
            <p className="text-red-100 max-w-sm leading-relaxed font-medium">
              Your local computer training institute helping beginners learn practical computer skills at low cost.
            </p>
          </div>
          {/* Grouped for mobile side-by-side layout */}
          <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:col-span-2 sm:col-span-2">
            <div>
              <h4 className="text-lg font-bold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-3 text-red-200 font-medium">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/courses" className="hover:text-white transition-colors">Courses</Link></li>
                <li><Link to="/certification" className="hover:text-white transition-colors">Certification</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-white">Our Courses</h4>
              <ul className="space-y-3 text-red-200 font-medium">
                <li><Link to="/courses#c1" className="hover:text-white transition-colors">DCA</Link></li>
                <li><Link to="/courses#c4" className="hover:text-white transition-colors">Tally Prime</Link></li>
                <li><Link to="/courses#c7" className="hover:text-white transition-colors">C Language</Link></li>
                <li><Link to="/courses#c8" className="hover:text-white transition-colors">C++ Language</Link></li>
                <li><Link to="/courses#c9" className="hover:text-white transition-colors">Core Java</Link></li>
                <li><Link to="/courses#c10" className="hover:text-white transition-colors">Python</Link></li>
              </ul>
            </div>
          </div>
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-4 text-white">Contact & Timings</h4>
            <ul className="space-y-3 text-red-200 font-medium text-sm">
              <li className="flex items-start gap-2">
                <span className="shrink-0">📍</span>
                <span>Girmajipet, Warangal,<br/>Telangana, India</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">🕒</span>
                <span>Mon-Sat: 8:30 AM - 8:00 PM<br/>Sun: 10:00 AM - 5:30 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-red-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-red-200 font-medium">
          <p>&copy; {new Date().getFullYear()} NICT Computer Training Institute. All rights reserved.</p>
          <p className="mt-4 md:mt-0 text-white font-bold tracking-wide">Skills Today | Better Tomorrow</p>
        </div>
      </div>
    </footer>
  );
}
