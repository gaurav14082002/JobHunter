import express from "express";
const router = express.Router();

import {applyJob,getAppliedJob,getApplicants,updateStatus} from "../controllers/application.controller.js"
import { isAuth,isRecruiter } from "../middlewares/isAuth.js";

router.get("/applyJob/:id",isAuth,applyJob)
router.get("/getAppliedJob",isAuth,getAppliedJob)
router.get("/getApplicants/:id",isAuth,getApplicants)
router.post("/updateStatus/:id",isAuth,updateStatus)


export default router;