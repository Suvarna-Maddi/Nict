import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminMarksForm } from '../components/admin/AdminMarksForm';
import { AdminCertForm } from '../components/admin/AdminCertForm';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'marks' | 'cert'>('marks');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-4 text-center font-medium text-lg ${activeTab === 'marks' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('marks')}
            >
              Generate Marks Card
            </button>
            <button
              className={`flex-1 py-4 text-center font-medium text-lg ${activeTab === 'cert' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('cert')}
            >
              Generate Certificate
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'marks' ? <AdminMarksForm /> : <AdminCertForm />}
          </div>
        </div>
      </div>
    </div>
  );
}
