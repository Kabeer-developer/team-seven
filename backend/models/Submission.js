import mongoose from "mongoose";

const submissionSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    challenge: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
    githubLink: String,
    liveLink: String,
    score: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Submission", submissionSchema);