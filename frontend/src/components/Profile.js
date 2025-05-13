import React from "react";
import AppliedJobTable from "./AppliedJobTable";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

console.log(user?.profile);
  if (!user || !user.profile) {
    return (
      <div>
        <Navbar />
        <div className="max-w-5xl mx-auto px-6 py-20 text-center text-gray-500">
          Loading profile...
        </div>
      </div>
    );
  }

  
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-gradient-to-r from-white to-gray-50 p-8 rounded-3xl shadow-2xl border border-gray-200 transition-all duration-300 hover:shadow-purple-200">
          <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8 gap-6">
            <img
              src={user?.profile?.profilePhoto || "/https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHBZT3GW9_yffiX4LlDBsYj22Y4Yx5EIECRZLAY5ylon8HbCPYTb1eY5E&s"}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-purple-500 shadow-md"
            />
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{user.fullname}</h2>
              <p className="text-lg text-gray-600 mt-1">{user.email}</p>
              <p className="mt-4 inline-block text-sm mr-3 font-medium bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition duration-300">
                {user.role}
              </p>
              <Link
                to="/EditProfile"
                className="mt-4 inline-block text-sm font-medium bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition duration-300"
              >
                Edit Profile
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 border-gray-200">
              Profile Details
            </h3>
            <p className="text-md text-gray-800">
              <strong className="font-medium text-purple-700">Bio:</strong> {user.profile.bio}
            </p>
            <p className="text-md text-gray-800">
              <strong className="font-medium text-purple-700">Contact No.:</strong> {user.phonenumber}
            </p>
            <p className="text-md text-gray-800">
              <strong className="font-medium text-purple-700">Skills:</strong>{" "}
              {Array.isArray(user.profile.skills)
                ? user.profile.skills.join(", ")
                : user.profile.skills}
            </p>
            <p className="text-md text-gray-800">
              <strong className="font-medium text-purple-700">Resume:</strong>{" "}
              {user.profile.resume ? (
                <iframe
                  src={`https://docs.google.com/gview?url=${user.profile.resume}&embedded=true`}
                  width="100%"
                  height="600px"
                  frameBorder="0"
                />
              ) : (
                <span className="text-gray-400">No resume uploaded</span>
              )}
            </p>
          </div>
        </div>

        <div className="mt-10 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">📝 Applied Jobs</h3>
          <AppliedJobTable />
        </div>
      </div>
    </div>
  );
};

export default Profile;
