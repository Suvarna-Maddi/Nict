import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Chatbot } from './components/Chatbot'
import { WhatsAppButton } from './components/WhatsAppButton'

// Lazy load non-critical pages for faster initial load
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })))
const Courses = lazy(() => import('./pages/Courses').then(m => ({ default: m.Courses })))
const AdminLogin = lazy(() => import('./pages/AdminLogin').then(m => ({ default: m.AdminLogin })))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <main className="relative w-full min-h-screen font-sans selection:bg-[#dc2626] selection:text-white flex flex-col">
        {/* Global Background Mesh (Pale) */}
        <div className="fixed inset-0 z-0 pointer-events-none bg-[#fbfaf9]">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary-100 opacity-60 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 opacity-60 blur-[120px] rounded-full"></div>
        </div>

        <Navbar />
        
        <div className="flex-1 w-full relative z-10">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </Suspense>
        </div>

        <Footer />
        <Chatbot />
        <WhatsAppButton />
      </main>
    </BrowserRouter>
  )
}

export default App
