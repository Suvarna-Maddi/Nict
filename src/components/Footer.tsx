import { Link } from 'react-router-dom';
import logoUrl from '../assets/logo.webp';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-blue-900 pt-20 pb-10 bg-gradient-to-br from-[#4169e1] to-[#0a1945]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          <div className="sm:col-span-2 lg:col-span-2 text-center sm:text-left">
            {/* Logo with white background wrapper */}
            <div className="bg-white p-3 md:p-4 rounded-xl inline-block mb-6 shadow-lg">
              <img src={logoUrl} alt="NICT Logo" className="w-40 md:w-56 opacity-100" />
            </div>
            <p className="text-white max-w-sm mx-auto sm:mx-0 leading-relaxed font-medium">
              Your local computer training institute helping beginners learn practical computer skills at low cost.
            </p>
          </div>
          {/* Grouped for mobile side-by-side layout */}
          <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:col-span-2 sm:col-span-2">
            <div>
              <h4 className="text-lg font-bold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-3 text-white font-medium">
                <li><Link to="/" className="hover:text-gray-200 transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-gray-200 transition-colors">About Us</Link></li>
                <li><Link to="/courses" className="hover:text-gray-200 transition-colors">Courses</Link></li>
                <li><Link to="/admin/login" className="hover:text-gray-200 transition-colors opacity-50">Admin Login</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-white">Our Courses</h4>
              <ul className="space-y-3 text-white font-medium">
                <li><Link to="/courses#c1" className="hover:text-gray-200 transition-colors">DCA</Link></li>
                <li><Link to="/courses#c4" className="hover:text-gray-200 transition-colors">Tally Prime</Link></li>
                <li><Link to="/courses#c7" className="hover:text-gray-200 transition-colors">C Language</Link></li>
                <li><Link to="/courses#c8" className="hover:text-gray-200 transition-colors">C++ Language</Link></li>
                <li><Link to="/courses#c9" className="hover:text-gray-200 transition-colors">Java</Link></li>
                <li><Link to="/courses#c10" className="hover:text-gray-200 transition-colors">Python</Link></li>
                <li><Link to="/courses#c13" className="hover:text-gray-200 transition-colors">SQL</Link></li>
              </ul>
            </div>
          </div>
          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-4 text-white">Contact & Timings</h4>
            <ul className="space-y-3 text-white font-medium text-sm">
              <li className="flex items-start gap-2">
                <span className="shrink-0">📍</span>
                <a href="https://maps.app.goo.gl/6n5ehmVa5D7inBVV6" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">
                  Girmajipet, Warangal,<br/>Telangana, India
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0">🕒</span>
                <span>Mon-Sat: 8:30 AM - 8:00 PM<br/>Sun: 10:00 AM - 5:30 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white font-medium">
          <p>&copy; {new Date().getFullYear()} NICT Computer Training Institute. All rights reserved.</p>
          <p className="mt-4 md:mt-0 text-white font-bold tracking-wide">Skills Today | Better Tomorrow</p>
        </div>
      </div>
    </footer>
  );
}
