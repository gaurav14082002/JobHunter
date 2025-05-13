import React from "react";
import Latestjobscards from "./Latestjobscards";
import { useSelector } from "react-redux";

const LatestJobs = () => {

const latestjobs = useSelector((state)=>(state.job.allJobs))

  return (
    <div className="px-8 mt-5">
      <h1 className="text-3xl font-bold text-left mb-10">
        Latest And Top{" "}
        <span className="text-purple-600">Job Openings</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {latestjobs.length<=0 ? (<div className="font-extrabold text-2xl mt-3 mb-6 text-red-500">No Jobs Available</div>) : latestjobs.map((item, index) => (
          <Latestjobscards item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
