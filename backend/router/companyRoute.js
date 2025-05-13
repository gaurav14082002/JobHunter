import express from "express";
const router = express.Router();

import {companyRegister,getCompany,getCompanyById,updateCompany} from "../controllers/company.controller.js"
import { isAuth,isRecruiter } from "../middlewares/isAuth.js";

router.post("/companyRegister",isAuth,isRecruiter,companyRegister)
router.get("/getCompanies",isAuth,getCompany)
router.get("/getCompany/:id",isAuth,getCompanyById)
router.put("/updateCompany/:id",isAuth,updateCompany)

export default router;