const ProjectCard = ({ project }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{project.title}</h3>
      <p>{project.description}</p>

      <a href={project.github} target="_blank">GitHub</a>
      <br />
      <a href={project.liveLink} target="_blank">Live Demo</a>
    </div>
  );
};

export default ProjectCard;