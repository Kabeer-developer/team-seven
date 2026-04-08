import User from "../models/User.js";
import Event from "../models/Event.js";
import Submission from "../models/Submission.js";
import Challenge from "../models/Challenge.js";
import Project from "../models/Project.js";
import Gallery from "../models/Gallery.js";
import Announcement from "../models/Announcement.js";

export const getStats = async (req, res) => {
  const [users, events, submissions, challenges, projects, gallery, announcements] =
    await Promise.all([
      User.countDocuments(),
      Event.countDocuments(),
      Submission.countDocuments(),
      Challenge.countDocuments(),
      Project.countDocuments(),
      Gallery.countDocuments(),
      Announcement.countDocuments(),
    ]);

  res.json({
    users,
    events,
    submissions,
    challenges,
    projects,
    gallery,
    announcements,
  });
};