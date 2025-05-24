import React from "react";
import { useNavigate } from "react-router-dom";

const Latestjobscards = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${item._id}`)}
      className="p-8 rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer group mb-10"
    >
      {item?.company?.logo && (
        <div className="mb-4 flex justify-center">
          <img
            src={item.company.logo}
            alt={`${item.company.companyname} Logo`}
            className="h-16 w-16 rounded-full object-cover border"
          />
        </div>
      )}

      <div className="mb-3 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-purple-600 transition">
          {item?.company?.companyname}
        </h2>
        <p className="text-sm text-gray-500">
          {item?.company?.location || "India"}
        </p>
      </div>

      <div className="mb-5 text-center">
        <h1 className="text-xl font-bold text-gray-900 mb-2">{item?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">{item?.description}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-4">
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
