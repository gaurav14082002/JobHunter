import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    
        <div>
          <h2 className="text-xl font-bold text-white mb-4">
            JOB<span className="text-red-500">HUNTER</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Your trusted platform to find your dream job across industries and roles.
          </p>
        </div>

   
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Info</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Jobs</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

      
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Job Categories</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Frontend Developer</li>
            <li className="hover:text-white cursor-pointer">Backend Developer</li>
            <li className="hover:text-white cursor-pointer">UI/UX Designer</li>
            <li className="hover:text-white cursor-pointer">Data Analyst</li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

    
      <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-700 pt-4 px-4">
         {new Date().getFullYear()} <span className="text-white font-semibold">JOBHUNTER</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
