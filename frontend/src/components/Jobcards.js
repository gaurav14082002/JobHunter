import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Jobcards = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 w-full max-w-md mx-auto">


      <div className="flex items-center gap-4 mb-3">
        <img
          src={item?.company?.logo}
          alt="Company Logo"
          className="w-14 h-14 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{item?.company?.companyname}</h2>
          <p className="text-sm text-gray-500">{item?.location}</p>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-3">{item?.company?.description?.slice(0, 100)}...</p>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
          {item?.position}
        </span>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
          {item?.jobtype}
        </span>
        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
          ₹{item?.salary?.toLocaleString()} / month
        </span>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => navigate(`/description/${item._id}`)}
          className="text-sm font-medium text-purple-600 border border-purple-600 px-4 py-1 rounded-md hover:bg-purple-50"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Jobcards;
