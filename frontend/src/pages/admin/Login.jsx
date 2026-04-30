import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('adminToken', data.token);
      toast.success('Login Successful');
      navigate('/admin');
    } catch (error) {
      toast.error('Invalid Credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E8EDF2] px-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#2C3947]">
            Admin Login
          </h2>
          <p className="text-sm text-[#547A95] mt-2">
            Access the university dashboard
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-[#2C3947]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 border border-[#547A95]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A56D]"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-[#2C3947]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-3 border border-[#547A95]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C2A56D]"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-3 bg-[#C2A56D] text-[#2C3947] font-semibold rounded-lg 
            hover:scale-[1.02] hover:shadow-md transition"
          >
            Sign In
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;