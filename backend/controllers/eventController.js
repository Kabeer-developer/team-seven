import Event from "../models/Event.js";

// Get all events
export const getEvents = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const category = req.query.category;
  const search = req.query.search;
  const skip = (page - 1) * limit;

  const query = {};
  if (category) query.category = category;
  if (search) query.title = { $regex: search, $options: "i" };

  const [events, total] = await Promise.all([
    Event.find(query).sort({ date: 1 }).skip(skip).limit(limit),
    Event.countDocuments(query),
  ]);

  res.json({
    items: events,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
};

// Create event (admin)
export const createEvent = async (req, res) => {
  const event = await Event.create(req.body);
  res.json(event);
};

// Get single event for details page.
export const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id).populate(
    "participants",
    "name email"
  );
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  res.json(event);
};

// Register for event
export const registerEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  // Compare ObjectIds safely by string value to prevent duplicate registrations.
  const alreadyRegistered = event.participants.some(
    (participantId) => participantId.toString() === req.user._id.toString()
  );

  if (!alreadyRegistered) {
    event.participants.push(req.user._id);
    await event.save();
  } else {
    return res.status(400).json({ message: "Already registered for this event" });
  }

  res.json({ message: "Registered successfully" });
};

// Update event (admin)
export const updateEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  Object.assign(event, req.body);
  const updated = await event.save();
  res.json(updated);
};

// Delete event (admin)
export const deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  await event.deleteOne();
  res.json({ message: "Event deleted" });
};