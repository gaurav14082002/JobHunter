import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; 
import Jobcards from "./Jobcards";
import Navbar from "./Navbar";
import axios from "axios";
import { JOBS_API_END_POINT } from "../utils/Constant";
import MultiCards from "./MultiCards";

const Browse = () => {
  const location = useLocation(); 
  const [jobs, setJobs] = useState([]);
  
  
  const getKeywordFromQuery = () => {
    const params = new URLSearchParams(location.search); 
    return params.get("keyword") || "";
  };

  useEffect(() => {
    const keyword = getKeywordFromQuery();
    

    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${JOBS_API_END_POINT}/getAllJobs?keyword=${keyword}`,{withCredentials:true});
        setJobs(response.data.data);
      } catch (error) {
        console.error("Error fetching jobs", error);
      }
    };

    fetchJobs();
  }, [location.search]); 

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="text-3xl font-bold text-center mb-10">
          Search Results ({jobs.length} jobs)
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 m-6">
          {jobs.map((job, index) => (
            <MultiCards key={index} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
