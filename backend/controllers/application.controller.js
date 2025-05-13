import application from "../models/application.model.js";
import job from "../models/job.model.js";
import user from "../models/user.model.js";

export const applyJob = async (req, res) => {
  try {
    const id = req.user.id;
    const jobid = req.params.id;

    if (!jobid) {
      return res.status(400).json({
        message: "Job ID is required",
        success: false,
      });
    }

    const existingApplication = await application.findOne({
      job: jobid,
      applicant: id,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "Already applied for this job",
        success: false,
      });
    }

    const exisitingJob = await job.findById(jobid);
    if (!exisitingJob) {
      return res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }
    console.log("dfbskjdbnvsndkvsnlk");

    const User = await user.findById(id);
    console.log(User);
    if (!User.profile.resume || User.profile.resume.trim() === "") {
      return res.status(400).json({
        message: "Please upload your resume before applying.",
        success: false,
      });
    }

    const newApplication = await application.create({
      job: jobid,
      applicant: id,
    });

    exisitingJob.applications.push(newApplication._id);
    await exisitingJob.save();

    return res.status(200).json({
      message: "Successfully applied for this job",
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

export const getAppliedJob = async (req, res) => {
  try {
    const id = req.user.id;

    const allApplication = await application.find({ applicant: id }).populate({
      path: "job",
      populate: {
        path: "company",
      },
    });

    if (!allApplication) {
      return res.status(400).json({
        message: "you have not applied in any jobs",
        success: false,
      });
    }

    return res.status(200).json({
      data: allApplication,
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

export const getApplicants = async (req, res) => {
  try {
    const specificJobId = req.params.id;

    const findApplicant = await job.findById(specificJobId).populate({
      path: "applications",
      populate: {
        path: "applicant",
        select: "-password", // 👈 this removes password field
      },
    });

    if (!findApplicant) {
      return res.status(400).json({
        message: "No applicants here",
        success: false,
      });
    }

    return res.status(200).json({
      data: findApplicant,
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

export const updateStatus = async (req, res) => {
  try {
    const applicantId = req.params.id;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({
        message: "please provide status",
        success: false,
      });
    }
    const findingApplicant = await application.findOne({ _id: applicantId });
    if (!findingApplicant) {
      return res.status(404).json({
        message: "applicant not found",
        success: false,
      });
    }
    findingApplicant.status = status.toLowerCase();
    await findingApplicant.save();

    return res.status(200).json({
      message: "status updated successfully",
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
