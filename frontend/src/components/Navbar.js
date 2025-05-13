import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/AuthSlice";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/Constant";
import { toast } from "react-toastify";
import { FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-tight text-gray-800 transition duration-300"
        >
          JOB<span className="text-red-600">HUNTER</span>
        </Link>

        <ul className="hidden md:flex space-x-10 text-base font-semibold text-gray-700">
          {!user ? (
            <>
              <li className="group relative">
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md text-gray-700 font-medium hover:text-purple-700 hover:bg-purple-100 transition duration-300 ease-in-out"
                >
                  Home
                </Link>
              </li>

              <li className="group relative">
                <Link
                  to="/browse"
                  className="px-3 py-2 rounded-md text-gray-700 font-medium hover:text-purple-700 hover:bg-purple-100 transition duration-300 ease-in-out"
                >
                  Browse
                </Link>
              </li>

              <li className="group relative">
                <Link
                  to="/jobs"
                  className="px-3 py-2 rounded-md text-gray-700 font-medium hover:text-purple-700 hover:bg-purple-100 transition duration-300 ease-in-out"
                >
                  Jobs
                </Link>
              </li>

              <li className="group relative">
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-md text-white font-medium bg-red-600 hover:bg-red-700 transition duration-300 ease-in-out"
                >
                  Login
                </Link>
              </li>

              <li className="group relative">
                <Link
                  to="/signup"
                  className="px-3 py-2 rounded-md text-white font-medium bg-red-600 hover:bg-red-700 transition duration-300 ease-in-out"
                >
                  Signup
                </Link>
              </li>
            </>
          ) : user?.role === "recruiter" ? (
            <>
              <li className="px-3 py-2 rounded-md text-gray-700 font-medium hover:text-purple-700 hover:bg-purple-100 transition duration-300 ease-in-out">
                <Link to="/admin/companies">Companies</Link>
              </li>
              <li className="px-3 py-2 rounded-md text-gray-700 font-medium hover:text-purple-700 hover:bg-purple-100 transition duration-300 ease-in-out">
                <Link to="/admin/jobs">Jobs</Link>
              </li>
            </>
          ) : (
            <>
              <li className="px-3 py-2 rounded-md text-gray-700 font-medium hover:text-purple-700 hover:bg-purple-100 transition duration-300 ease-in-out">
                <Link to="/">Home</Link>
              </li>
              <li className="px-3 py-2 rounded-md text-gray-700 font-medium hover:text-purple-700 hover:bg-purple-100 transition duration-300 ease-in-out">
                <Link to="/jobs">Jobs</Link>
              </li>
              <Link
                to="/browse"
                className="px-3 py-2 rounded-md text-gray-700 font-medium hover:text-purple-700 hover:bg-purple-100 transition duration-300 ease-in-out"
              >
                Browse
              </Link>
            </>
          )}
        </ul>

        {/* User Avatar / Menu */}
        {user ? (
          <div className="relative">
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
              <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50 transition-all duration-300">
                <div className="px-4 py-2 text-gray-800 font-semibold text-sm border-b capitalize">
                  {user.fullname}
                </div>
                <ul>
                  {user.role === "student" && (
                    <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer transition duration-200">
                      <Link to="/profile">My Profile</Link>
                    </li>
                  )}
                  <li
                    onClick={handleLogout}
                    className="hover:bg-gray-100 px-4 py-2 cursor-pointer text-red-600 font-medium transition duration-200"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
