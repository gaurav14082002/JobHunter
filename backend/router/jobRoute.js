import express from "express";
const router = express.Router();

import {postJob,getAllJobs,getJobById,allJobsByAdmin} from "../controllers/job.controller.js"
import { isAuth,isRecruiter } from "../middlewares/isAuth.js";

router.post("/postJob",isAuth,postJob)
router.get("/getAllJobs",getAllJobs)
router.get("/getJobById/:id",isAuth,getJobById)
router.get("/allJobsByAdmin",isAuth,allJobsByAdmin)


export default router;
