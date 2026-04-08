import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      {projects.map((p) => (
        <div key={p._id}>
          <h3>{p.title}</h3>
          <a href={p.github} target="_blank">GitHub</a>
        </div>
      ))}
    </div>
  );
};

export default Projects;