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
    <div>
      <h2>{project?.title}</h2>
      <p>{project?.description}</p>
      <p>Likes: {project?.likes?.length || 0}</p>
      <button onClick={handleLike}>Like/Unlike</button>
    </div>
  );
};

export default ProjectDetail;