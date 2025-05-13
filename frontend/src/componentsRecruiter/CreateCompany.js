import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { COMPANY_API_END_POINT } from "../utils/Constant";
import { setSingleCompany } from "../redux/companySlice";
import { toast } from "react-toastify";

const CreateCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/companyRegister`,
       { companyname: companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.data));
        toast.success(res.data.message);
        const companyId = res?.data?.data?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="font-bold text-2xl mb-1">Your company name</h1>
          <p className="text-gray-500">
            What would you like to name your company? You can change this later.
          </p>
        </div>

        {/* Input Field */}
        <div className="mb-6">
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            id="companyName"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. JobHunt, Microsoft"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/admin/companies")}
            className="px-5 py-2 rounded-xl border border-gray-400 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={registerNewCompany}
            className="px-5 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
