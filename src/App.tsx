import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Courses } from './pages/Courses'
import { AdminLogin } from './pages/AdminLogin'
import { AdminDashboard } from './pages/AdminDashboard'
import { Chatbot } from './components/Chatbot'
import { WhatsAppButton } from './components/WhatsAppButton'

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>

        <Footer />
        <Chatbot />
        <WhatsAppButton />
      </main>
    </BrowserRouter>
  )
}

export default App
