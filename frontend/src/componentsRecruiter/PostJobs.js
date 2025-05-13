import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { COMPANY_API_END_POINT, JOBS_API_END_POINT } from "../utils/Constant";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const PostJobs = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobtype: "",
    position: "",
    experience: "",
    companyid: "",
  });

  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/getCompanies`, {
          withCredentials: true,
        });
        setCompanies(res.data.data);
      } catch (err) {
        toast.error("Failed to fetch companies");
      }
    };

    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${JOBS_API_END_POINT}/postJob`, form, {
        withCredentials: true,
      });
      navigate("/admin/companies");
      toast.success("Job posted successfully");
      setForm({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobtype: "",
        position: "",
        experience: "",
        companyid: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error posting job");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Post a New Job</h2>
          <button
            onClick={() => navigate("/admin/jobs")}
            className="rounded-md bg-black text-white px-6 py-2"
          >
            Back
          </button>
        </div>

        <div className="space-y-4 p-2 border rounded">
          {[
            { name: "title", label: "Job Title", type: "text" },
            { name: "description", label: "Job Description", type: "text" },
            { name: "requirements", label: "Requirements (comma separated)", type: "text" },
            { name: "salary", label: "Salary", type: "number" },
            { name: "location", label: "Location", type: "text" },
            { name: "jobtype", label: "Job Type", type: "text" },
            { name: "position", label: "Number of Positions", type: "number" },
            { name: "experience", label: "Experience Level (years)", type: "number" },
          ].map(({ name, label, type }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                value={form[name]}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  type === "number" ? "no-spinner" : ""
                }`}
                placeholder={label}
              />
            </div>
          ))}

          <div>
            <label htmlFor="companyid" className="block text-sm font-medium text-gray-700">
              Select Company
            </label>
            <select
              name="companyid"
              id="companyid"
              value={form.companyid}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- Select a Company --</option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.companyname}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 mt-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Post New Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostJobs;
