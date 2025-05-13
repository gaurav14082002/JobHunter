import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">
            JOB<span className="text-red-500">HUNTER</span>
          </h2>
          <p>Your trusted platform to find your dream job across industries and roles.</p>
        </div>

        {/* Quick Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Info</h3>
          <ul className="space-y-2">
            <li>Home</li>
            <li>Jobs</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Job Categories</h3>
          <ul className="space-y-2">
            <li>Frontend Developer</li>
            <li>Backend Developer</li>
            <li>UI/UX Designer</li>
            <li>Data Analyst</li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <FaFacebookF />
            <FaLinkedinIn />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} JOBHUNTER. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
