import company from "../models/company.model.js";
import { v2 as cloudinary } from "cloudinary";

export const companyRegister = async (req, res) => {
  try {
    const { companyname } = req.body;

    if (!companyname) {
      return res.status(500).json({
        message: "Company name required",
        success: false,
      });
    }

    const findCompany = await company.findOne({ companyname });
    if (findCompany) {
      return res.status(500).json({
        message: "Company already exist",
        success: false,
      });
    }

    const createCompany = await company.create({
      companyname,
      createdby: req.user.id,
    }); // yha mne different kia h agr error ata h toh req.id krna h

    return res.status(200).json({
      message: "Company registered successfully",
      success: true,
      data: createCompany,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};
export const getCompany = async (req, res) => {
  try {
    const id = req.user.id;

    const companies = await company.find({ createdby: id }).populate("jobs");

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "companies not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "all companies found",
      data: companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id :", id);
    const singleCompany = await company.findById(id);
    if (!company) {
      return res.status(404).json({
        message: "company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "company found",
      data: singleCompany,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { companyname, description, location, website } = req.body;

    if (!companyname || !description || !location || !website) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    let logoUrl;

    if (req.files && req.files.file && req.files.file.tempFilePath) {
      const file = req.files.file;

      const supportedFormat = ["image/jpg", "image/jpeg", "image/png"];

      if (!supportedFormat.includes(file.mimetype)) {
        return res.status(400).json({
          success: false,
          message: "image type not supported",
        });
      }

    
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        resource_type: "auto",
      });

      logoUrl = result.url; 
    }

    const updateData = {
      companyname,
      description,
      location,
      website,
    };

    if (logoUrl) {
      updateData.logo = logoUrl;
    }

    const updatedCompany = await company.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedCompany) {
      return res
        .status(500)
        .json({ message: "Company not updated", success: false });
    }

    return res
      .status(200)
      .json({ message: "Company updated successfully", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
