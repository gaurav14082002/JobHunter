import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "job",
    required: true,
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "user",
    required: true,
  },
  status: {
    type: String,
enum:["pending","accepted","rejected"],
    default: "pending",
  },
});

export default mongoose.model("application", applicationSchema);
