import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    techStack: [String],
    github: String,
    liveLink: String,
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);