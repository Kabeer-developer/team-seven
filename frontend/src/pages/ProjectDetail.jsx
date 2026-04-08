import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    getProjects().then((data) => {
      const found = data.find((p) => p._id === id);
      setProject(found);
    });
  }, [id]);

  return (
    <div>
      <h2>{project?.title}</h2>
      <p>{project?.description}</p>
    </div>
  );
};

export default ProjectDetail;