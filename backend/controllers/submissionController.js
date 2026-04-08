import Submission from "../models/Submission.js";
import User from "../models/User.js";

// Submit solution
export const submitSolution = async (req, res) => {
  const { challengeId, githubLink, liveLink } = req.body;

  const exists = await Submission.findOne({
    user: req.user._id,
    challenge: challengeId,
  });

  if (exists) {
    return res.status(400).json({ message: "Already submitted" });
  }

  const submission = await Submission.create({
    user: req.user._id,
    challenge: challengeId,
    githubLink,
    liveLink,
  });

  res.json(submission);
};

// Get user submissions
export const getUserSubmissions = async (req, res) => {
  // Populate challenge so frontend can show challenge title/details directly.
  const submissions = await Submission.find({ user: req.user._id })
    .populate("challenge", "title difficulty category")
    .sort({ createdAt: -1 });
  res.json(submissions);
};

// Admin: get all submissions for grading.
export const getAllSubmissions = async (req, res) => {
  const submissions = await Submission.find()
    .populate("user", "name email")
    .populate("challenge", "title")
    .sort({ createdAt: -1 });

  res.json(submissions);
};

// Admin: grade submission
export const gradeSubmission = async (req, res) => {
  const { score } = req.body;

  const submission = await Submission.findById(req.params.id);
  if (!submission) {
    return res.status(404).json({ message: "Submission not found" });
  }
  submission.score = score;

  await submission.save();
  // Keep denormalized user score in sync with graded submissions.
  const totalScore = await Submission.aggregate([
    { $match: { user: submission.user } },
    { $group: { _id: "$user", sum: { $sum: "$score" } } },
  ]);
  await User.findByIdAndUpdate(submission.user, {
    score: totalScore[0]?.sum || 0,
  });

  const updatedSubmission = await Submission.findById(submission._id)
    .populate("user", "name email")
    .populate("challenge", "title");

  res.json(updatedSubmission);
};