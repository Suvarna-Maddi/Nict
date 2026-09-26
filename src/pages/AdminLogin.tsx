import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';
import logoUrl from '../assets/logo.webp';

export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      if (username === 'nictwrgl' && password === 'nictadmin@12') {
        localStorage.setItem('isAdminLoggedIn', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password. Please try again.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-stretch bg-slate-50">

      {/* Left branding panel (desktop only) */}
      <div className="hidden lg:flex lg:w-[45%] flex-col items-center justify-center p-16 bg-gradient-to-br from-[#0a1945] to-[#1e3a8a] relative overflow-hidden">
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative z-10 max-w-sm w-full">
          <div className="bg-white rounded-2xl p-4 inline-block mb-10 shadow-xl">
            <img src={logoUrl} alt="NICT Logo" className="h-12 object-contain" />
          </div>
          <h1 className="text-4xl font-black text-white mb-3 leading-tight">
            NICT Admin<br />
            <span className="text-amber-400">Control Panel</span>
          </h1>
          <p className="text-blue-200 text-base leading-relaxed mb-10">
            Securely manage student certificates, marks cards, and institute records.
          </p>
          <div className="space-y-4">
            {[
              { icon: '🎓', text: 'Generate Student Certificates' },
              { icon: '📋', text: 'Issue Marks Cards' },
              { icon: '🔒', text: 'Secure & Protected Access' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-blue-100">
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right login form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <img src={logoUrl} alt="NICT Logo" className="h-12 object-contain" />
          </div>

          {/* Badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShieldCheck size={16} className="text-blue-600" />
            </div>
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Admin Portal</span>
          </div>

          <h2 className="text-3xl font-black text-slate-900 mb-1">Welcome back</h2>
          <p className="text-slate-500 text-sm mb-8">Sign in to access the admin dashboard</p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <User size={17} />
                </div>
                <input
                  id="admin-username"
                  type="text"
                  required
                  autoComplete="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(''); }}
                  className="w-full border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 rounded-xl pl-10 pr-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock size={17} />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  className="w-full border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 rounded-xl pl-10 pr-12 py-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
                <AlertCircle size={15} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              id="admin-login-btn"
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 bg-[#0a1945] hover:bg-[#1e3a8a] text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-slate-900/20 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2 text-sm"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <p className="text-center text-slate-400 text-xs mt-8 border-t border-slate-100 pt-6">
            Authorized personnel only · N.I.C.T. Computer Institute
          </p>
        </div>
      </div>
    </div>
  );
}
