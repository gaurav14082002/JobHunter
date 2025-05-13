import React, { useEffect, useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { JOBS_API_END_POINT } from "../utils/Constant";

const AdminJobsTable = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOBS_API_END_POINT}/allJobsByAdmin`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setJobs(res.data.data);
        }
        
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error(error.response?.data?.message || "Failed to fetch jobs");
      }
    };

    fetchJobs();
  }, []);

console.log(jobs)

const filteredJobs = jobs.filter((job) =>
  job?.title?.toLowerCase().includes(search.toLowerCase())
);

console.log(filteredJobs)

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">All Jobs Created by You</h2>

      <input
        type="text"
        placeholder="Search by job title..."
        className="w-full border border-gray-300 rounded-md px-4 py-2 mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredJobs.length > 0 ? (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm hover:bg-gray-50 transition"
            >
                 <p className="text-sm font-bold font-medium mb-1">
      Company: {<span className="text-white bg-purple-600 p-2 rounded-md">{job.company?.companyname}</span> || "N/A"}
    </p>

          <h3 className="text-xl font-semibold text-blue-700">{job.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{job.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                Location: {job.location} | Salary: {job.salary}
              </p>
              <p className="text-sm text-gray-500">Posted on: {new Date(job.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">No jobs found.</p>
      )}
    </div>
  );
};

export default AdminJobsTable;
