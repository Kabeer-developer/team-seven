import Event from "../models/Event.js";

// Get all events
export const getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

// Create event (admin)
export const createEvent = async (req, res) => {
  const event = await Event.create(req.body);
  res.json(event);
};

// Register for event
export const registerEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event.participants.includes(req.user._id)) {
    event.participants.push(req.user._id);
    await event.save();
  }

  res.json({ message: "Registered successfully" });
};