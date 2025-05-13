import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  companyname: {
    type: String,
    required: true,
  },
  description: String,
  website: String,
  location: String,
  logo: String,
  createdby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

companySchema.virtual("jobs", {
  ref: "job",
  localField: "_id",
  foreignField: "company",
});

export default mongoose.model("company", companySchema);
