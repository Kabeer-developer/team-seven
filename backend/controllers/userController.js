import User from "../models/User.js";

// Get all users (team)
export const getUsers = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const roleInClub = req.query.roleInClub;
  const search = req.query.search;
  const skip = (page - 1) * limit;

  const query = {};
  if (roleInClub) query.roleInClub = roleInClub;
  if (search) query.name = { $regex: search, $options: "i" };

  const [users, total] = await Promise.all([
    User.find(query).select("-password").sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(query),
  ]);

  res.json({
    items: users,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
};

// Get profile
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

// Update profile
export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.bio = req.body.bio || user.bio;
    user.skills = req.body.skills || user.skills;

    const updated = await user.save();

    res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
      bio: updated.bio,
      skills: updated.skills,
      avatar: updated.avatar,
      github: updated.github,
      linkedin: updated.linkedin,
      roleInClub: updated.roleInClub,
      score: updated.score,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// Admin: update basic user account controls (role and active status).
export const updateUserAdmin = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.body.role) {
    user.role = req.body.role;
  }
  if (typeof req.body.isActive === "boolean") {
    user.isActive = req.body.isActive;
  }

  const updated = await user.save();
  res.json({
    _id: updated._id,
    name: updated.name,
    email: updated.email,
    role: updated.role,
    isActive: updated.isActive,
  });
};