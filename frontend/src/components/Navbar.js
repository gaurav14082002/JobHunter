import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/AuthSlice";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/Constant";
import { toast } from "react-toastify";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(clearUser());
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-tight text-gray-800 transition duration-300"
        >
          JOB<span className="text-red-600">HUNTER</span>
        </Link>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {mobileMenuOpen ? (
              <FaTimes className="text-2xl text-gray-700" />
            ) : (
              <FaBars className="text-2xl text-gray-700" />
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 text-base font-semibold text-gray-700">
          {!user ? (
            <>
              <li><Link to="/" className="hover:text-purple-700">Home</Link></li>
              <li><Link to="/browse" className="hover:text-purple-700">Browse</Link></li>
              <li><Link to="/jobs" className="hover:text-purple-700">Jobs</Link></li>
              <li>
                <Link to="/login" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                  Signup
                </Link>
              </li>
            </>
          ) : user.role === "recruiter" ? (
            <>
              <li><Link to="/admin/companies" className="hover:text-purple-700">Companies</Link></li>
              <li><Link to="/admin/jobs" className="hover:text-purple-700">Jobs</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/" className="hover:text-purple-700">Home</Link></li>
              <li><Link to="/jobs" className="hover:text-purple-700">Jobs</Link></li>
              <li><Link to="/browse" className="hover:text-purple-700">Browse</Link></li>
            </>
          )}
        </ul>

        {/* Avatar Dropdown */}
        {user && (
          <div className="relative hidden md:block">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-2 hover:opacity-90 transition"
            >
              {user?.profile?.profilePhoto && (
                <img
                  src={user.profile.profilePhoto}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-purple-500 object-cover"
                />
              )}
              <FaChevronDown className="text-gray-600 text-sm" />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                <div className="px-4 py-2 text-gray-800 font-semibold text-sm border-b capitalize">
                  {user.fullname}
                </div>
                <ul>
                  {user.role === "student" && (
                    <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                      <Link to="/profile">My Profile</Link>
                    </li>
                  )}
                  <li
                    onClick={handleLogout}
                    className="hover:bg-gray-100 px-4 py-2 cursor-pointer text-red-600 font-medium"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4">
          <ul className="space-y-4 text-gray-700 text-base font-semibold">
            {!user ? (
              <>
                <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                <li><Link to="/browse" onClick={toggleMenu}>Browse</Link></li>
                <li><Link to="/jobs" onClick={toggleMenu}>Jobs</Link></li>
                <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
                <li><Link to="/signup" onClick={toggleMenu}>Signup</Link></li>
              </>
            ) : user.role === "recruiter" ? (
              <>
                <li><Link to="/admin/companies" onClick={toggleMenu}>Companies</Link></li>
                <li><Link to="/admin/jobs" onClick={toggleMenu}>Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                <li><Link to="/jobs" onClick={toggleMenu}>Jobs</Link></li>
                <li><Link to="/browse" onClick={toggleMenu}>Browse</Link></li>
                <li><Link to="/profile" onClick={toggleMenu}>My Profile</Link></li>
              </>
            )}
            {user && (
              <li
                onClick={() => {
                  toggleMenu();
                  handleLogout();
                }}
                className="text-red-600 font-medium cursor-pointer"
              >
                Logout
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
