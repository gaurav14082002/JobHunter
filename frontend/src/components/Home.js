import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "../customHooks/useGetAllJobs";

const Home = () => {
  useGetAllJobs();

  return (
    <div>
      <Navbar />
      <HeroSection />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
