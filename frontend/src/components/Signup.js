import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios"
import { USER_API_END_POINT } from "../utils/Constant";
import { toast } from "react-toastify";

const Signup = () => {
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    password: "",
    number: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();

 function changeHandler(e) {
  const { name, value } = e.target;

    if (name === "number") {
    const digitsOnly = value.replace(/\D/g, ""); 
    if (digitsOnly.length <= 10) {
      setUserData((prev) => ({
        ...prev,
        number: digitsOnly,
      }));
    }
  } else {
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
}


  function changeFileHandler(e) {
    setUserData((prev) => ({ ...prev, file: e.target.files?.[0] }));
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(userData);

    if (!userData.email || !userData.password || !userData.role || !userData.fullname || !userData.file || !userData.number) {
        toast.error("Please fill in all the fields.");
        return;
      }

const formData = new FormData();
formData.append("fullname",userData.fullname)
formData.append("email",userData.email)
formData.append("password",userData.password)
formData.append("phonenumber",userData.number)
formData.append("role",userData.role)
if(userData.file){
    formData.append("file",userData.file)
}
try {
  const response = await axios.post(`${USER_API_END_POINT}/register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

  if (response && response.data?.success) {
    toast.success(response.data.message || "New user created successfully");
    navigate("/login");
  } else {
    // If registration fails but response is received
    toast.error(response.data?.message || "Registration failed");
  }
} catch (error) {
  console.log("Registration error:", error);
  // Show backend error message if available, else default
  toast.error(error?.response?.data?.message || "Unable to register user");
}
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex justify-center items-center h-screen">
        <div className="h-[500px] w-[400px] bg-white shadow-lg rounded-lg p-4">
          <div className="flex justify-between p-2">
            <h1 className="font-bold">
              JOB<span className="font-bold text-red-500">HUNTER</span>
            </h1>
            <h1 className="font-bold text-blue-500">SIGNUP</h1>
          </div>

          <form onSubmit={submitHandler} className="flex flex-col gap-3 mt-5">
            <input
              type="text"
              placeholder="Enter Full Name"
              name="fullname"
              value={userData.fullname}
              onChange={changeHandler}
              className="w-11/12 mx-auto border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={changeHandler}
              placeholder="Enter Your Email"
              className="w-11/12 mx-auto border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="tel"
              name="number"
              value={userData.number}
              onChange={changeHandler}
              placeholder="Enter Your Phone No."
              className="w-11/12 mx-auto border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={changeHandler}
              placeholder="Enter Your Password"
              className="w-11/12 mx-auto border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              name="role"
              value={userData.role}
              onChange={changeHandler}
              className="w-11/12 mx-auto border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option>Select Your Role</option>
              <option value="student">Student</option>
              <option value="recruiter">Recruiter</option>
            </select>

            <div className="flex flex-col items-center gap-2">
  <label htmlFor="profilePhoto" className="font-bold text-gray-700">
    Upload Profile Photo
  </label>
  <input
    type="file"
    id="profilePhoto"
    name="file"
    onChange={changeFileHandler}
    className="font-bold"
  />
</div>

            <button
              type="submit"
              className="bg-blue-500 w-[70%] mx-auto block my-5 p-2 text-white rounded-sm hover:bg-blue-600 cursor-pointer"
            >
              SIGNUP
            </button>
          </form>

          <h1>
            Already have an account?
            <span className="text-blue-500 font-semibold">
              <Link to="/Login">Login</Link>
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Signup;
