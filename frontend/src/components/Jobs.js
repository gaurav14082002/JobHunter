import React, { useState } from "react";
import Navbar from "./Navbar";
import Jobcards from "./Jobcards";
import { useSelector } from "react-redux";

const Jobs = () => {
  const latestjobs = useSelector((state) => state.job.allJobs);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const totalJobs = latestjobs.length;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = latestjobs.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div>
      <Navbar />

     
      <div
        className="w-full h-60 md:h-72 bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <h1 className="text-3xl md:text-4xl text-pink-400 font-bold">Explore Latest Jobs</h1>
        <p className="mt-2 text-md font-extrabold  md:text-base max-w-xl text-amber-950 ">
          Discover your dream job among the latest openings in top tech companies across India.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10">
        {currentJobs && currentJobs.length === 0 ? (
          <div className="text-center text-gray-600">No jobs found</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentJobs.map((item) => (
                <Jobcards key={item._id} item={item} />
              ))}
            </div>

           
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Jobs;
