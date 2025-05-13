import axios from "axios";
import { useEffect } from "react";
const dispatch = useDispatch();
import { JOBS_API_END_POINT } from "../utils/Constant";
import { setAllJobs } from "../redux/JobSlice";

const useGetAllJobs = () => {
  useEffect(() => {

    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOBS_API_END_POINT}/getAllJobs`);

        if (res.data.success) {
          dispatch(setAllJobs(res.data.data));
        } else {
          console.warn("Jobs fetch failed:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error.response?.data || error.message);
      }
    };

    fetchAllJobs();
  }, []); 
};

export default useGetAllJobs;
