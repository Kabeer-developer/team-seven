import Submission from "../models/Submission.js";

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
  const submissions = await Submission.find({ user: req.user._id });
  res.json(submissions);
};

// Admin: grade submission
export const gradeSubmission = async (req, res) => {
  const { score } = req.body;

  const submission = await Submission.findById(req.params.id);
  submission.score = score;

  await submission.save();

  res.json(submission);
};