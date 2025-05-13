import React from "react";
import { useNavigate } from "react-router-dom";

const MultiCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="border rounded-lg p-6 bg-gray-50 hover:shadow-md transition-all">
      <h2 className="text-xl font-bold text-purple-700">{job?.title}</h2>
      <p className="text-sm text-gray-600 mb-2">{job?.location}</p>
      <p className="text-gray-500 mb-3">{job?.description?.slice(0, 120)}...</p>

      <div className="flex gap-2 flex-wrap mb-3">
        <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded">
          ₹{job?.salary?.toLocaleString()} / month
        </span>
        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
          {job?.jobtype}
        </span>
        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded">
          Experience: {job?.experience} yrs
        </span>
      </div>

      <button
        onClick={() => navigate(`/description/${job._id}`)}
        className="text-white bg-purple-600 px-4 py-2 text-sm rounded hover:bg-purple-700"
      >
        View Job
      </button>
    </div>
  );
};

export default MultiCards;
