import Gallery from "../models/Gallery.js";

// Get gallery
export const getGallery = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const [images, total] = await Promise.all([
    Gallery.find().populate("event", "title").sort({ createdAt: -1 }).skip(skip).limit(limit),
    Gallery.countDocuments(),
  ]);

  res.json({
    items: images,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
};

// Add image
export const addImage = async (req, res) => {
  // Support both `image` and legacy `imageUrl` payload keys from frontend.
  const payload = {
    image: req.body.image || req.body.imageUrl,
    event: req.body.event || null,
    album: req.body.album || "General",
    caption: req.body.caption || "",
  };

  const image = await Gallery.create(payload);
  res.json(image);
};