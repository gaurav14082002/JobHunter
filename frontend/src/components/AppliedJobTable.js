import React, { useEffect, useState } from "react";
import axios from "axios";
import { APPLY_API_END_POINT } from "../utils/Constant";

const AppliedJobTable = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-400";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLY_API_END_POINT}/getAppliedJob`, {withCredentials:true});
        if (res.data.success) {
          setAppliedJobs(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  if (loading) {
    return <p className="text-center py-4 text-purple-600 font-semibold">Loading applied jobs...</p>;
  }

  if (appliedJobs.length === 0) {
    return <p className="text-center py-4 text-gray-500">You haven't applied to any jobs yet.</p>;
  }

console.log(appliedJobs)

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-left text-sm uppercase font-semibold tracking-wider">
            <th className="p-4">Title</th>
            <th className="p-4">Job Type</th>
            <th className="p-4">Company</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {appliedJobs.map((job, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-4">{job.job.title}</td>
              {/* <td className="p-4">{new Date(job.createdAt).toLocaleDateString()}</td> */}
              <td className="p-4">{job.job.jobtype}</td>
              <td className="p-4">{job.job.company.companyname}</td>
              <td className="p-4">
                <span
                  className={`text-white px-3 py-1 rounded-full text-xs ${getStatusColor(
                    job.status || "pending"
                  )}`}
                >
                  {job.status || "Pending"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-sm text-gray-500 mt-4">These are all the jobs you have applied for.</p>
    </div>
  );
};

export default AppliedJobTable;
