import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AdminJobsTable from "./AdminJobsTable";

const CompanyJobs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="px-6 py-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Listings</h1>
            <p className="text-gray-600 mt-1">Manage and organize your posted job opportunities</p>
          </div>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center justify-center"
            onClick={() => navigate("/admin/postjobs")}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Job
          </button>
        </div>

        {/* Card Container for Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">Job Registry</h2>
            <p className="text-sm text-gray-500">View and manage all job postings in the system</p>
          </div>
          
          {/* Table Component */}
          <AdminJobsTable />
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Showing all active job listings in your organization
        </p>
      </div>
    </div>
  );
};

export default CompanyJobs;