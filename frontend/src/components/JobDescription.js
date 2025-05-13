import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { APPLY_API_END_POINT, JOBS_API_END_POINT } from "../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../redux/JobSlice";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

const JobDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const singleJob = useSelector((state) => state.job.singleJob);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const isApplied = singleJob?.applications?.some(
    (app) => app.applicant?._id === user?._id
  );

  useEffect(() => {
    const fetch = async () => {
      try {
         if(!user){
        toast.error("Please Login First")
      }
        const res = await axios.get(`${JOBS_API_END_POINT}/getJobById/${id}`, {
          withCredentials: true,
        });
        dispatch(setSingleJob(res.data.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id, dispatch]);

  const applyHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${APPLY_API_END_POINT}/applyJob/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);

        const updatedRes = await axios.get(
          `${JOBS_API_END_POINT}/getJobById/${id}`,
          { withCredentials: true }
        );
        dispatch(setSingleJob(updatedRes.data.data));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!singleJob) {
    return <div className="text-center p-8">Loading job details...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 mb-6">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {singleJob.title}
              </h1>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="bg-blue-100 text-blue-700 font-medium px-4 py-1 rounded-full">
                  {`${singleJob.position} Positions`}
                </span>
                <span className="bg-green-100 text-green-700 font-medium px-4 py-1 rounded-full">
                  {singleJob.jobtype}
                </span>
                <span className="bg-purple-100 text-purple-700 font-medium px-4 py-1 rounded-full">
                  ₹{singleJob.salary}k/Month
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <button
                onClick={() => navigate(-1)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded-md"
              >
                ← Back
              </button>

              <button
                onClick={applyHandler}
                disabled={isApplied || loading}
                className={`px-6 py-2 font-medium rounded-md transition-all ${
                  isApplied || loading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-[#7209B7] text-white hover:bg-[#5F32AD]"
                }`}
              >
                {loading
                  ? "Applying..."
                  : isApplied
                  ? "Applied Successfully"
                  : "Apply Now"}
              </button>
            </div>
          </div>

          <hr className="my-6 border-gray-300" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base text-gray-800">
            <div>
              <span className="font-semibold block mb-1">Role:</span>
              <p className="text-gray-600">{singleJob.title}</p>
            </div>
            <div>
              <span className="font-semibold block mb-1">Location:</span>
              <p className="text-gray-600">{singleJob.location}</p>
            </div>
            <div>
              <span className="font-semibold block mb-1">Description:</span>
              <p className="text-gray-600">{singleJob.description}</p>
            </div>
            <div>
              <span className="font-semibold block mb-1">Experience:</span>
              <p className="text-gray-600">{singleJob.experience} Years</p>
            </div>
            <div>
              <span className="font-semibold block mb-1">
                Total Applicants:
              </span>
              <p className="text-gray-600">{singleJob.applications.length}</p>
            </div>
            <div>
              <span className="font-semibold block mb-1">Posted Date:</span>
              <p className="text-gray-600">
                {new Date(singleJob.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
