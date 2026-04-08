import Project from "../models/Project.js";

// Get projects
export const getProjects = async (req, res) => {
  const projects = await Project.find().populate("members");
  res.json(projects);
};

// Create project
export const createProject = async (req, res) => {
  const project = await Project.create(req.body);
  res.json(project);
};