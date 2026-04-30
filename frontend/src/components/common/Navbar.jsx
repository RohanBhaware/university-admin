import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", link: "#" },
    { label: "Admissions", link: "#admissions" },
    { label: "Events", link: "#events" },
    { label: "Student Life", link: "#studentlife" },
    { label: "Faculty", link: "#faculty" },
    { label: "Placements", link: "#placements" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-md bg-[#2C3947]/90 shadow-lg border-b border-[#547A95]/30">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo + Title */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="logo" className="w-15 h-15 object-contain" />
          <div>
            <h1 className="text-lg font-bold tracking-wide text-white">
              UNIVERSITY
            </h1>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="relative text-[#E8EDF2] font-medium transition duration-300 hover:text-[#C2A56D]"
            >
              {item.label}

              {/* Gold underline animation */}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#C2A56D] transition-all duration-300 hover:w-full"></span>
            </a>
          ))}
          <Link
            to="/admin/login"
            className="ml-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg text-sm font-semibold transition-all duration-300 backdrop-blur-sm"
          >
            Admin Login
          </Link>
        </div>

        {/* Hamburger Icon */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-[#2C3947] text-white px-4 transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[500px] py-4" : "max-h-0"
        }`}
      >
        {navItems.map((item, idx) => (
          <a
            key={idx}
            href={item.link}
            className="block py-2 border-b border-[#547A95]/30 hover:text-[#C2A56D] transition"
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </a>
        ))}

        {/* Mobile CTA */}
        <div className="mt-4 space-y-2">
          <button className="w-full bg-[#C2A56D] text-[#2C3947] py-2 rounded-lg font-semibold">
            Apply Now
          </button>
          <Link to="/admin/login" className="block w-full text-center bg-white/10 text-white border border-white/20 py-2 rounded-lg font-semibold" onClick={() => setIsOpen(false)}>
            Admin Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;