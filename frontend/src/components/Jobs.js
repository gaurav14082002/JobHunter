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
        className="relative w-full h-[280px] md:h-[340px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold animate-pulse text-pink-600">
            Explore Latest Jobs
          </h1>
          <p className="mt-2 max-w-xl  md:text-xl text-amber-300 font-bold">
            Discover your dream role with top companies across India.
          </p>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
          Showing Jobs ({startIndex + 1} - {Math.min(endIndex, totalJobs)}) of {totalJobs}
        </h2>

        {currentJobs && currentJobs.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No jobs found</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentJobs.map((item) => (
                <Jobcards key={item._id} item={item} />
              ))}
            </div>

            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50 transition"
              >
                Previous
              </button>
              <span className="text-sm font-medium text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50 transition"
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
