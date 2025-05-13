import job from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobtype,
      position,
      experience,
      companyid,
    } = req.body;

    const id = req.user.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobtype ||
      !position ||
      !experience ||
      !companyid
    ) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
      });
    }

    const create = await job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobtype,
      position,
      experience,
      company: companyid,
      createdBy: id,
    });
    return res.status(201).json({
      message: "Job posted successfully",
      data: create,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    console.log("Search keyword:", req.query.keyword);


    const jobs = await job.find(query).populate("company");
    if (!jobs) {
      return res.status(404).json({
        message: "jobs not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "jobs found",
      data: jobs,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const jobs = await job.findById(jobId)
      .populate({
        path: "applications",
        populate: {
          path: "applicant",
          model: "user",
          select: "_id name email", // add fields you need
        },
      });

    if (!jobs) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job found",
      data: jobs,
      success: true,
    });
  } catch (error) {
    console.error("Error in getJobById:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const allJobsByAdmin = async (req, res) => {
  try {
    const id = req.user.id;

    const jobs = await job.find({ createdBy: id }).populate("company");

    if (!jobs) {
      return res.status(404).json({
        message: "jobs not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "jobs found",
      data: jobs,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
