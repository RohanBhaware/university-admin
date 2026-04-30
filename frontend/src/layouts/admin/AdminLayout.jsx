import { Outlet, Link, useNavigate } from 'react-router-dom';
import {
  Home,
  Calendar,
  Users,
  LogOut,
  GraduationCap,
  LayoutDashboard,
  Briefcase
} from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18} /> },
    { name: 'Events', path: '/admin/events', icon: <Calendar size={18} /> },
    { name: 'Placements', path: '/admin/placements', icon: <Briefcase size={18} /> },
    { name: 'Faculty', path: '/admin/faculty', icon: <Users size={18} /> },
    { name: 'Admissions', path: '/admin/admissions', icon: <GraduationCap size={18} /> },
    { name: 'Student Life', path: '/admin/student-life', icon: <Home size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-[#E8EDF2]">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#2C3947] text-[#E8EDF2] flex flex-col">

        {/* Logo / Title */}
        <div className="p-5 text-xl font-bold border-b border-[#547A95]/30">
          Admin Panel
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="flex items-center px-4 py-2 rounded-lg 
                  hover:bg-[#547A95]/30 hover:text-[#C2A56D] transition"
                >
                  {item.icon}
                  <span className="ml-3 text-sm">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#547A95]/30">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 bg-[#C2A56D] text-[#2C3947] 
            rounded-lg font-semibold hover:opacity-90 transition"
          >
            <LogOut size={18} />
            <span className="ml-3">Logout</span>
          </button>
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* HEADER */}
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">

          <h2 className="text-lg font-semibold text-[#2C3947]">
            University Admin Dashboard
          </h2>

        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#E8EDF2] p-6">

          {/* Content Card Wrapper */}
          <div className="bg-white rounded-xl shadow-sm p-6 min-h-full">
            <Outlet />
          </div>

        </main>

      </div>

    </div>
  );
};

export default AdminLayout;