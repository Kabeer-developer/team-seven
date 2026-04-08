import Announcement from "../models/Announcement.js";

// Get announcements
export const getAnnouncements = async (req, res) => {
  const data = await Announcement.find().sort({ createdAt: -1 });
  res.json(data);
};

// Create announcement
export const createAnnouncement = async (req, res) => {
  const payload = {
    title: req.body.title,
    content: req.body.content || req.body.message || "",
    message: req.body.message || req.body.content || "",
  };
  const data = await Announcement.create(payload);
  res.status(201).json(data);
};

// Update announcement
export const updateAnnouncement = async (req, res) => {
  const announcement = await Announcement.findById(req.params.id);
  if (!announcement) {
    return res.status(404).json({ message: "Announcement not found" });
  }

  announcement.title = req.body.title ?? announcement.title;
  const nextContent =
    req.body.content ?? req.body.message ?? announcement.content ?? announcement.message;
  announcement.content = nextContent;
  announcement.message = nextContent;

  const updated = await announcement.save();
  res.json(updated);
};

// Delete announcement
export const deleteAnnouncement = async (req, res) => {
  const announcement = await Announcement.findById(req.params.id);
  if (!announcement) {
    return res.status(404).json({ message: "Announcement not found" });
  }

  await announcement.deleteOne();
  res.json({ message: "Announcement deleted" });
};