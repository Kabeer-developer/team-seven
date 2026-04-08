import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../services/projectService";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Projects</h2>
      {projects.map((p) => (
        <div key={p._id} className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold">{p.title}</h3>
          <p className="my-2 text-sm text-slate-600 dark:text-slate-300">{p.description || "No description available."}</p>
          <div className="flex gap-2">
            <Link to={`/projects/${p._id}`} className="rounded-md border border-slate-300 px-3 py-1.5 dark:border-slate-700">
              View Project
            </Link>
            {p.github && (
              <a href={p.github} target="_blank" rel="noreferrer" className="rounded-md bg-slate-800 px-3 py-1.5 text-white">
                GitHub
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;