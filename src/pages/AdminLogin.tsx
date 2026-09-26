import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';
import logoUrl from '../assets/logo.webp';

export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Scroll to top on mount
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
    <div className="min-h-screen flex items-stretch bg-[#0a0f1e] relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-blue-400/10 rounded-full blur-[80px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Left branding panel (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-16 relative z-10">
        <div className="max-w-md w-full">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 shadow-2xl">
            <div className="bg-white rounded-2xl p-4 inline-block mb-8 shadow-lg">
              <img src={logoUrl} alt="NICT Logo" className="h-12 object-contain" />
            </div>
            <h1 className="text-4xl font-black text-white mb-4 leading-tight">
              NICT Admin<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Control Panel
              </span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              Securely manage student certificates, marks cards, and institute records.
            </p>

            <div className="space-y-4">
              {[
                { icon: '🎓', text: 'Generate Student Certificates' },
                { icon: '📋', text: 'Issue Marks Cards' },
                { icon: '🔒', text: 'Secure & Encrypted Access' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300">
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right login form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <div className="bg-white rounded-2xl px-6 py-3 shadow-xl">
              <img src={logoUrl} alt="NICT Logo" className="h-10 object-contain" />
            </div>
          </div>

          {/* Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">

            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-500/20 border border-blue-400/30 rounded-xl flex items-center justify-center">
                <ShieldCheck size={20} className="text-blue-400" />
              </div>
              <span className="text-blue-400 font-bold text-sm uppercase tracking-widest">Secure Access</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-1">Admin Login</h2>
            <p className="text-slate-400 text-sm mb-8">Enter your credentials to access the dashboard</p>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Username</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <User size={18} />
                  </div>
                  <input
                    id="admin-username"
                    type="text"
                    required
                    autoComplete="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); setError(''); }}
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <Lock size={18} />
                  </div>
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl pl-11 pr-12 py-3.5 text-sm outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm animate-[fadeIn_0.3s_ease]">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit */}
              <button
                id="admin-login-btn"
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all duration-300 shadow-[0_8px_30px_rgba(59,130,246,0.3)] hover:shadow-[0_12px_40px_rgba(59,130,246,0.5)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-slate-600 text-xs mt-8">
              Authorized personnel only · NICT Computer Institute
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
