import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/Constant";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {setUser} from "../redux/AuthSlice"

const Login = () => {

const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    role: "",
  });

  function changeHandler(e) {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

const navigate = useNavigate();

const submitHandler =async(e)=>{
    e.preventDefault();

    if(!userData.email || !userData.password || !userData.role){
      toast.error("please fill all the details")
      return;
    }
    const formData = new FormData();
    formData.append("email",userData.email)
    formData.append("password",userData.password)
    formData.append("role",userData.role)
    try {
    const response = await axios.post(`${USER_API_END_POINT}/login`,formData,{
      headers:{
      "content-type":"multipart/form-data"
    },withCredentials:true})

    toast.success(response.data.message || "User logged in successfully");
    dispatch(setUser(response.data.data));
    navigate("/") 
    } catch (error) {
      if(error.message){
        toast.error(error?.response?.data?.message)
      } else {
        toast.error("Unable to login. Please try again.");
      }
    }
   }

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex justify-center items-center h-screen ">
        <div className="h-[350px] w-[400px] bg-white shadow-lg rounded-lg p-4">
          <div className="flex justify-between p-2">
            <h1 className="font-bold">
              JOB<span className="font-bold text-red-500">HUNTER</span>
            </h1>
            <h1 className="font-bold text-blue-500">LOGIN</h1>
          </div>

          <form onSubmit={submitHandler} className="flex flex-col gap-3 mt-5">
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={changeHandler}
              placeholder="Enter Your Email"
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

            <button
              type="submit"
              className="bg-blue-500 w-[70%] mx-auto block my-5 p-2 text-white rounded-sm hover:bg-blue-600 cursor-pointer"
            >
              LOGIN
            </button>
          </form>
          <h1>
            Does not have an account?
            <span className="text-blue-500 font-semibold">
              <Link to="/Signup">Signup</Link>
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
