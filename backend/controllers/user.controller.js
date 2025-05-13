import user from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

export const register = async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const { fullname, phonenumber, email, password, role } = req.body;
    if (!fullname || !phonenumber || !email || !password || !role) {
      return res.status(400).json({
        message: "please enter all the details",
        success: false,
      });
    }

    const file = req.files.file;

    if (!file.tempFilePath) {
      return res.status(400).json({ message: "File upload failed" });
    }

    const supportedFormat = ["image/jpg", "image/jpeg", "image/png"];

    if (!supportedFormat.includes(file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "image type not supported",
      });
    }

    const findUser = await user.findOne({ email });
    if (findUser) {
      return res.status(400).json({
        message: "user already exist",
        success: false,
      });
    }

    const cloudinaryResult = await cloudinary.uploader.upload(
      file.tempFilePath,
      { resource_type: "auto" }
    );
    console.log("Uploaded photo URL:", cloudinaryResult.url);
    const hashedPassword = await bcrypt.hash(password, 10);

    const data = await user.create({
      fullname,
      phonenumber,
      email,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudinaryResult.url,
      },
    });
console.log(data)
    return res.status(201).json({
      message: "user registered successfully",
      data: data,
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

export const login = async (req, res) => {
  try {
    console.log("inside login");
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "please enter all the details",
        success: false,
      });
    }
    const findUser = await user.findOne({ email });
    if (!findUser) {
      return res.status(400).json({
        message: "user not exist",
        success: false,
      });
    }

    const ispassword = await bcrypt.compare(password, findUser.password);
    if (!ispassword) {
      return res.status(400).json({
        message: "incorrect password",
        success: false,
      });
    }

    if (role !== findUser.role) {
      return res.status(400).json({
        message: "incorrect role",
        success: false,
      });
    }

    const payload = { id: findUser._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    console.log(token, findUser);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,          
      sameSite: "None", 
      maxAge:  7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "user loggedin successfully",
      data: findUser,
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

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true });
    res.status(200).json({
      message: "user logout successfully",
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

export const updateProfile = async (req, res) => {
  try {
    const { fullname, skills, bio, phonenumber, resume } = req.body;

    if (!fullname || !skills || !bio || !phonenumber) {
      return res.status(400).json({
        message: "Please enter all the details",
        success: false,
      });
    }

    const findduplicate = await user.findOne({
      phonenumber: req.body.phonenumber,
    });

    if (
      findduplicate &&
      findduplicate._id.toString() !== req.user._id.toString()
    ) {
      return res.status(400).json({
        message:
          "Phone number already in use. Please enter a different phone number.",
        success: false,
      });
    }

    let resumeURL = resume;

  
    if (req.files && req.files.file) {
      const file = req.files.file;

      if (!file.tempFilePath) {
        return res.status(400).json({ message: "File upload failed" });
      }

      const cloudinaryResult = await cloudinary.uploader.upload(
        file.tempFilePath,
        {
          resource_type: "raw",
        }
      );

      resumeURL = cloudinaryResult.url;
    }

   
    const existingUser = await user.findById(req.user.id);
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

  
    const updatedUser = await user.findByIdAndUpdate(
      req.user.id,
      {
        fullname,
        phonenumber,
        profile: {
          ...existingUser.profile, 
          bio,
          skills: skills
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill),
          resume: resumeURL || existingUser.profile.resume,
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

