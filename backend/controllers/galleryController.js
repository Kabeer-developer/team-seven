import Gallery from "../models/Gallery.js";

// Get gallery
export const getGallery = async (req, res) => {
  const images = await Gallery.find();
  res.json(images);
};

// Add image
export const addImage = async (req, res) => {
  const image = await Gallery.create(req.body);
  res.json(image);
};