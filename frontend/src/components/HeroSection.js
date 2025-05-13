// import React from "react";
// import { IoSearch } from "react-icons/io5";

// const HeroSection = () => {
//   return (
//     <div
//       className="bg-cover bg-center h-[80vh] flex items-center justify-center px-4"
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&w=1600&q=80')",
//       }}
//     >
//       <div className="text-center bg-white/80 backdrop-blur-md p-8 rounded-xl max-w-3xl w-full shadow-lg">
//         <span className="text-sm text-purple-600 font-semibold uppercase tracking-wider bg-purple-100 px-4 py-1 rounded-full inline-block mb-4">
//           #1 Platform to Find Your Dream Job
//         </span>

//         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
//           Discover & Land Your <span className="text-purple-600">Perfect Job</span>
//         </h1>

//         <p className="text-gray-600 mb-6">
//           Explore thousands of opportunities tailored just for you. Start your journey toward a successful career today.
//         </p>

//         <div className="flex justify-center items-center gap-0">
//           <input
//             type="text"
//             placeholder="Search jobs, roles or companies..."
//             className="w-3/4 h-12 px-4 rounded-l-full focus:outline-none shadow-md"
//           />
//           <button className="bg-purple-600 text-white h-12 w-12 flex items-center justify-center rounded-r-full hover:bg-purple-700 transition">
//             <IoSearch size={22} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const HeroSection = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate(); // useNavigate hook

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/browse?keyword=${keyword}`); // Navigate to Browse with keyword in URL
    }
  };

  return (
    <div
      className="bg-cover bg-center h-[80vh] flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&w=1600&q=80')",
      }}
    >
      <div className="text-center bg-white/80 backdrop-blur-md p-8 rounded-xl max-w-3xl w-full shadow-lg">
        <span className="text-sm text-purple-600 font-semibold uppercase tracking-wider bg-purple-100 px-4 py-1 rounded-full inline-block mb-4">
          #1 Platform to Find Your Dream Job
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Discover & Land Your <span className="text-purple-600">Perfect Job</span>
        </h1>

        <p className="text-gray-600 mb-6">
          Explore thousands of opportunities tailored just for you. Start your journey toward a successful career today.
        </p>

        <div className="flex justify-center items-center gap-0">
          <input
            type="text"
            placeholder="Search jobs, roles or companies..."
            className="w-3/4 h-12 px-4 rounded-l-full focus:outline-none shadow-md"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            className="bg-purple-600 text-white h-12 w-12 flex items-center justify-center rounded-r-full hover:bg-purple-700 transition"
            onClick={handleSearch}
          >
            <IoSearch size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
