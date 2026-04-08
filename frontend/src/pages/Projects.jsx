import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../services/projectService";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-16 text-center">
          Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <div 
              key={p._id} 
              className="group bg-white/90 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 hover:bg-white overflow-hidden"
            >
              <div className="p-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                  {p.title}
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed line-clamp-3">
                  {p.description || "No description available."}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link 
                    to={`/projects/${p._id}`} 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                  >
                    View Project
                  </Link>
                  {p.github && (
                    <a 
                      href={p.github} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                    >
                     Open GitHub 
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;