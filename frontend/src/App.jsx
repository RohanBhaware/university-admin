import './App.css'
import Spinner from './components/common/Spinner'
import AOS from "aos";
import { useState, useEffect } from 'react';
import MainPage from './components/sections/MainPage';
import "aos/dist/aos.css";

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminLayout from './layouts/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageEntity from './pages/admin/ManageEntity';

function App() {

  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    AOS.init({ duration: 300, easing: "ease-in-out", once: false });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ToastContainer position="top-right" />
      <Routes>
        <Route path="/" element={
          loading ? (
            <div className="loader-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <Spinner />
            </div>
          ) : (
            <MainPage />
          )
        } />
        
        <Route path="/admin/login" element={<Login />} />
        
        <Route path="/admin" element={token ? <AdminLayout /> : <Navigate to="/admin/login" />}>
          <Route index element={<Dashboard />} />
          <Route path="events" element={<ManageEntity endpoint="events" title="Events" />} />
          <Route path="faculty" element={<ManageEntity endpoint="faculty" title="Faculty Member" />} />
          <Route path="placements" element={<ManageEntity endpoint="placements" title="Placement Stats" />} />
          <Route path="admissions" element={<ManageEntity endpoint="admissions" title="Admissions" />} />
          <Route path="student-life" element={<ManageEntity endpoint="student-life" title="Student Life" />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
