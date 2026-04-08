import Announcement from "../models/Announcement.js";

// Get announcements
export const getAnnouncements = async (req, res) => {
  const data = await Announcement.find();
  res.json(data);
};

// Create announcement
export const createAnnouncement = async (req, res) => {
  const data = await Announcement.create(req.body);
  res.json(data);
};