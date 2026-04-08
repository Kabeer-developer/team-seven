import Challenge from "../models/Challenge.js";

// Get challenges
export const getChallenges = async (req, res) => {
  const challenges = await Challenge.find();
  res.json(challenges);
};

// Create challenge
export const createChallenge = async (req, res) => {
  const challenge = await Challenge.create(req.body);
  res.json(challenge);
};

// Get single challenge
export const getChallengeById = async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);
  res.json(challenge);
};