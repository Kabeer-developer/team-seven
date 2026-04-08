import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjectById, toggleProjectLike } from "../services/projectService";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    getProjectById(id).then(setProject);
  }, [id]);

  const handleLike = async () => {
    await toggleProjectLike(id);
    const fresh = await getProjectById(id);
    setProject(fresh);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 lg:p-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {project?.title}
          </h2>
          
          <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
            {project?.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="flex items-center space-x-3 p-4 bg-gray-100 rounded-2xl">
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl text-white font-bold">❤️</span>
              </div>
              <span className="text-2xl md:text-3xl font-bold text-gray-900">
                {project?.likes?.length || 0} Likes
              </span>
            </div>
            
            <button 
              onClick={handleLike}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 ml-auto sm:ml-0"
            >
              <span>❤️</span>
              <span>Like/Unlike</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;