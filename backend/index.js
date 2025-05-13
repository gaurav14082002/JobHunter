import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoute from "./router/userRoute.js"
import companyRoute from "./router/companyRoute.js"
import jobRoute from "./router/jobRoute.js"
import applicationRoute from "./router/applicationRoute.js"
import { v2 as cloudinary } from "cloudinary";

const app = express();

dotenv.config();
const PORT = process.env.PORT;
const mongo_url = process.env.MONGO_URL;

try{
mongoose.connect(mongo_url);
console.log("db connected successfully")
}catch(error){
    console.log(error)
}

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})


app.use(cors({
    origin:"https://jobhunter-8.onrender.com", 
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methodss
    allowedHeaders: ["Content-Type", "Authorization"], 
    credentials:true
}))

app.use(express.json())
app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );
app.use(cookieParser());


app.use("/api/users",userRoute)
app.use("/api/company",companyRoute)
app.use("/api/jobs",jobRoute)
app.use("/api/application",applicationRoute)

app.listen(PORT,()=>{
    console.log(`server start at ${PORT}`)
})

app.get("/",(req,res)=>{
   res.send("hello job hunter")
})
