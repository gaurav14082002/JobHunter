import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { COMPANY_API_END_POINT } from "../utils/Constant";

const CompanySetup = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const fetchCompany = async () => {
    try {
      const res = await axios.get(`${COMPANY_API_END_POINT}/getCompany/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        const data = res.data.data;
        console.log(data)
        setInput({
          name: data.companyname || "",
          description: data?.description || "",
          website: data?.website || "",
          location: data?.location || "",
          file: null,
        });
      }
    } catch (error) {
      toast.error("Failed to fetch company details");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("companyname", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/updateCompany/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
console.log(res)
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
        const message =
    error?.response?.data?.message ||
    error?.message ||
    "Update failed";
  toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto p-8 bg-white mt-10 rounded-xl shadow">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/admin/companies")}
            className="text-gray-500 hover:text-black transition"
          >
            ← Back
          </button>
          <h2 className="text-xl font-bold text-gray-800">Company Setup</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="e.g. Google"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={input.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Short description"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Website
              </label>
              <input
                type="text"
                name="website"
                value={input.website}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={input.location}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="City, Country"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 font-medium text-gray-700">
                Company Logo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-black file:text-white file:cursor-pointer"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Company"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
