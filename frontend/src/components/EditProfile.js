import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../utils/Constant";
import { toast } from "react-toastify";
import { setUser } from "../redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const EditProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    fullname: user?.fullname || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills.join(", ") || "",
    resume: user?.profile?.resume || "",
    phonenumber: user?.phonenumber || "",
  });

  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    setInputData({
      fullname: user?.fullname || "",
      bio: user?.profile?.bio || "",
      skills: user?.profile?.skills.join(", ") || "",
      resume: user?.profile?.resume || "",
      phonenumber: user?.phonenumber || "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phonenumber") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length <= 10) {
        setInputData((prev) => ({
          ...prev,
          phonenumber: digitsOnly,
        }));
      }
    } else {
      setInputData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("fullname", inputData.fullname);
    formdata.append("skills", inputData.skills);
    formdata.append("bio", inputData.bio);
    formdata.append("phonenumber", inputData.phonenumber);

    if (uploadedFile) {
      formdata.append("file", uploadedFile);
    } else if (inputData.resume) {
      formdata.append("resume", inputData.resume);
    }

    try {
      setLoading(true);
      const response = await axios.put(
        `${USER_API_END_POINT}/updateProfile`,
        formdata,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      if (response.data.success) {
        dispatch(setUser(response.data.data));
        toast.success("Profile Updated Successfully");
        navigate("/profile");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 space-y-6 max-w-4xl mx-auto"
      >
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Edit Profile
          </h2>
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-300"
          >
            Back to Profile
          </button>
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            value={inputData.fullname}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phonenumber"
            value={inputData.phonenumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            name="bio"
            value={inputData.bio}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Skills</label>
          <input
            type="text"
            name="skills"
            value={inputData.skills}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Upload Resume
          </label>
          <div className="flex items-center gap-4">
            {inputData.resume && (
              <a
                href={inputData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Current Resume
              </a>
            )}
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.jpeg,jpg,.doc,.docx"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#7209B7] hover:bg-[#5F32ad] text-white px-6 py-2 rounded-lg font-medium"
        >
          {loading ? "Please wait..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
