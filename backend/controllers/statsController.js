import User from "../models/User.js";
import Event from "../models/Event.js";
import Submission from "../models/Submission.js";

export const getStats = async (req, res) => {
  const users = await User.countDocuments();
  const events = await Event.countDocuments();
  const submissions = await Submission.countDocuments();

  res.json({
    users,
    events,
    submissions,
  });
};