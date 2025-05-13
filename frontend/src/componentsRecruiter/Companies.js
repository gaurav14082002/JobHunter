import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CompanyTable from "./CompanyTable"; // Importing table component
import Navbar from "../components/Navbar";

const Companies = () => {

const  navigate = useNavigate();

  return (
    <div>
      <Navbar></Navbar>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Want to post a new company?</h2>
          <button className="bg-black rounded-md p-2 text-white" onClick={() => navigate("/admin/companies/create")}>
            New Company
          </button>
          
        </div>

        {/* Table */}
        <CompanyTable />

        {/* Footer */}
        <p className="text-center text-gray-700 text-md mt-4">
          A list of your recent registered companies
        </p>
      </div>
    </div>
  );
};

export default Companies;
