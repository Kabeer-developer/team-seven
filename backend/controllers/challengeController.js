import Challenge from "../models/Challenge.js";

// Get challenges
export const getChallenges = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const difficulty = req.query.difficulty;
  const category = req.query.category;
  const search = req.query.search;
  const skip = (page - 1) * limit;

  const query = {};
  if (difficulty) query.difficulty = difficulty;
  if (category) query.category = category;
  if (search) query.title = { $regex: search, $options: "i" };

  const [challenges, total] = await Promise.all([
    Challenge.find(query).sort({ deadline: 1 }).skip(skip).limit(limit),
    Challenge.countDocuments(query),
  ]);
  res.json({
    items: challenges,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
};

// Create challenge
export const createChallenge = async (req, res) => {
  const challenge = await Challenge.create(req.body);
  res.json(challenge);
};

// Get single challenge
export const getChallengeById = async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);
  if (!challenge) {
    return res.status(404).json({ message: "Challenge not found" });
  }
  res.json(challenge);
};

// Update challenge (admin)
export const updateChallenge = async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);
  if (!challenge) {
    return res.status(404).json({ message: "Challenge not found" });
  }

  Object.assign(challenge, req.body);
  const updated = await challenge.save();
  res.json(updated);
};

// Delete challenge (admin)
export const deleteChallenge = async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);
  if (!challenge) {
    return res.status(404).json({ message: "Challenge not found" });
  }

  await challenge.deleteOne();
  res.json({ message: "Challenge deleted" });
};