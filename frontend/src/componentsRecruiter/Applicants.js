import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { APPLY_API_END_POINT } from "../utils/Constant";
import Navbar from "../components/Navbar";

const Applicants = () => {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    fetchApplicants();
  }, [id]);

  const fetchApplicants = async () => {
    try {
      const res = await axios.get(
        `${APPLY_API_END_POINT}/getApplicants/${id}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setApplicants(res.data.data.applications);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch applicants");
    }
  };

  const handleStatusChange = async (applicantId, newStatus) => {
    try {
      const res = await axios.post(
        `${APPLY_API_END_POINT}/updateStatus/${applicantId}`,
        { status: newStatus },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Status updated successfully");
        fetchApplicants(); // Refresh list
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">
          Applicants ({applicants.length})
        </h2>

        <div className="overflow-x-auto shadow border border-gray-200 rounded-lg">
          <table className="min-w-full bg-white text-left">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="py-3 px-4">Full Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Resume</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {applicants.length > 0 ? (
                applicants.map((application, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {application.applicant?.fullname}
                    </td>
                    <td className="py-3 px-4">
                      {application.applicant?.email}
                    </td>
                    <td className="py-3 px-4">
                      {application.applicant?.phonenumber}
                    </td>
                    <td className="py-3 px-4">
                      <a
                        href={`https://docs.google.com/viewer?url=${application.applicant?.profile?.resume}&embedded=true`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Resume
                      </a>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={application.status}
                        onChange={(e) =>
                          handleStatusChange(application._id, e.target.value)
                        }
                        className="border border-gray-300 px-2 py-1 rounded"
                      >
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500">
                    No applicants have applied for this job yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Applicants;
