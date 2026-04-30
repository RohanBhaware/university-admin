import React from "react";
import logo from "../../assets/images/logo.jpg";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#2C3947] text-[#E8EDF2] px-6 md:px-16 py-10 pt-16">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Left - Logo + Address */}
        <div className="flex flex-col items-start space-y-4">

          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="logo"
              className="w-16 h-16 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold tracking-wide text-white">
                UNIVERSITY
              </h1>
            </div>
          </div>

          <p className="text-sm text-[#E8EDF2]/80 leading-relaxed">
            University, Mumbai – 411 005.
            <br />
            Maharashtra, INDIA.
          </p>

          {/* Social icons */}
          <div className="flex space-x-4 mt-4 text-xl">
            <a href="#" className="hover:text-[#C2A56D] transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-[#C2A56D] transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-[#C2A56D] transition">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-[#C2A56D] transition">
              <FaXTwitter />
            </a>
            <a href="#" className="hover:text-[#C2A56D] transition">
              <FaYoutube />
            </a>
          </div>

        </div>

        {/* Middle - Navigation */}
        <div className="flex flex-col space-y-3 md:items-center">
          <ul className="flex pl-80 gap-10 text-sm text-[#E8EDF2]/80">
            {[
              "HOME",
              "ABOUT US",
              "ADMINISTRATION",
              "ADMISSION",
              "ACADEMICS",
              "STUDENT CORNER",
              "FACILITIES",
              "USEFUL LINKS",
            ].map((item) => (
              <li
                key={item}
                className="hover:text-[#C2A56D] cursor-pointer transition"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <hr className="mt-10 border-[#547A95]/30" />

      <div className="text-center text-sm text-[#E8EDF2]/60 pt-6">
        © {new Date().getFullYear()} University Portal. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;