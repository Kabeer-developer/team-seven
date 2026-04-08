import Project from "../models/Project.js";

// Get projects
export const getProjects = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search;
  const featured = req.query.featured;
  const skip = (page - 1) * limit;

  const query = {};
  if (search) query.title = { $regex: search, $options: "i" };
  if (featured === "true") query.isFeatured = true;

  const [projects, total] = await Promise.all([
    Project.find(query).populate("members", "name email").sort({ createdAt: -1 }).skip(skip).limit(limit),
    Project.countDocuments(query),
  ]);

  res.json({
    items: projects,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
};

// Create project
export const createProject = async (req, res) => {
  const project = await Project.create(req.body);
  res.json(project);
};

// Get a single project by id for detail pages.
export const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id).populate(
    "members",
    "name email avatar"
  );
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  res.json(project);
};

// Toggle like/star for project showcase ranking.
export const toggleProjectLike = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const userId = req.user._id.toString();
  const likedAlready = project.likes.some((id) => id.toString() === userId);

  if (likedAlready) {
    project.likes = project.likes.filter((id) => id.toString() !== userId);
  } else {
    project.likes.push(req.user._id);
  }

  await project.save();
  res.json({ likesCount: project.likes.length, liked: !likedAlready });
};

// Admin: mark/unmark featured projects for homepage spotlight.
export const setProjectFeatured = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  project.isFeatured = Boolean(req.body.isFeatured);
  await project.save();
  res.json({ _id: project._id, isFeatured: project.isFeatured });
};

// Update project (admin)
export const updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  Object.assign(project, req.body);
  const updated = await project.save();
  res.json(updated);
};

// Delete project (admin)
export const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  await project.deleteOne();
  res.json({ message: "Project deleted" });
};