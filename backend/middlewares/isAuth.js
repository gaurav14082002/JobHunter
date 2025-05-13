import jwt from "jsonwebtoken";
import user from "../models/user.model.js";

export const isAuth = async (req, res, next) => {
  try {
    const parsingToken = req.cookies.token;

    if (!parsingToken) {
      return res.status(401).json({
        message: "user not authenticated, please log in",
        success: false,
      });
    }

    console.log("token :", parsingToken);

    const decode = await jwt.verify(parsingToken, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return res.json({
        message: "token is invalid",
        success: false,
      });
    }

    const findUser = await user.findById(decode.id);
    if (!findUser) {
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }

    req.user = findUser;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const isRecruiter = async (req, res, next) => {
  try {
    if (req.user.role !== "recruiter") {
      res.json({
        message: "you are not a recruiter for posting company",
        success: false,
      });
    }
    console.log("inside authorization")
    next();
  } catch (error) {
    console.log(error);
  }
};
