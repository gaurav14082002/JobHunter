import React from "react";
import { useNavigate } from "react-router-dom";

const Latestjobscards = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${item._id}`)}
      className="p-6 rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group mb-9"
    >
      <div className="mb-3">
        <h2 className="text-xl font-semibold text-gray-800 group-hover:text-purple-600 transition">
          {item?.company?.companyname}
        </h2>
        <p className="text-sm text-gray-500">
          {item?.company?.location || "India"}
        </p>
      </div>

      <div className="mb-4">
        <h1 className="text-lg font-bold text-gray-900 mb-1">{item?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">
          {item?.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
          {item?.position} Openings
        </span>
        <span className="px-3 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full capitalize">
          {item?.jobtype || item?.jobType}
        </span>
        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
          ₹{item?.salary?.toLocaleString()} / month
        </span>
      </div>
    </div>
 
  );
};

export default Latestjobscards;
