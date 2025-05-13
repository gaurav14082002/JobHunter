import React, { useEffect, useState } from "react";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../utils/Constant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CompanyTable = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/getCompanies`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setCompanies(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };

    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter((company) =>
    company.companyname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden max-w-5xl mx-auto mt-10">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search company by name..."
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-4 text-md font-bold text-gray-700 bg-gray-100 px-6 py-4">
        <span>Logo</span>
        <span>Company Name</span>
        <span className="col-span-2 text-center">Action</span>
      </div>

      {filteredCompanies.length > 0 ? (
        filteredCompanies.map((company) => (
          <div
            key={company._id}
            className="grid grid-cols-4 items-start px-6 py-5 border-t hover:bg-gray-50 transition-all duration-200"
          >
            <div>
              <img
                src={company.logo || "logo"}
                alt={`${company.companyname} Logo`}
                className="w-12 h-12 object-cover rounded-full border border-gray-300"
              />
            </div>

            <div className="font-medium text-gray-900 text-base">
              {company.companyname || "N/A"}
            </div>

            <div className="col-span-2 text-center space-y-2">
              <button
                onClick={() => Navigate(`/admin/companies/${company._id}`)}
                className="inline-block bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-4 rounded-md shadow-sm transition-all duration-200"
              >
                Edit Company
              </button>

              {/* Show Applicants Button for Each Job */}
              {company.jobs.length > 0 ? (
                company.jobs.map((job) => (
                  <div key={job._id} className="mt-2">
                    <button
                      onClick={() =>
                        Navigate(`/admin/jobs/applicants/${job._id}`)
                      }
                      className="inline-block bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-1 px-2 rounded-md shadow-sm transition-all duration-200"
                    >
                      Applicants (Job: {job.title || "Untitled"})
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-sm mt-2">No jobs found</div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 py-10 text-sm">
          No companies found.
        </div>
      )}
    </div>
  );
};

export default CompanyTable;
