import projectElement from "../projectElement";
import "./Projects.css";
import "./ProjectCard.css";
import { DottedButton } from "./DottedButton";

const ProjectCard = ({ title, description, image, link }) => {
  return (
    <div className="project-card">
      <img src={image} alt={title} className="project-image" />
      <div className="project-content">
        <h2 className="project-title">{title}</h2>
        <p className="project-description">{description}</p>
        <a href={link} target="_blank" rel="noreferrer">
          <DottedButton name="View Project" />
        </a>
      </div>
    </div>
  );
};

export const Projects = () => {
  return (
    <div className="projects-container">
      {projectElement.map((project, index) => (
        <ProjectCard
          key={index}
          title={project.title}
          description={project.description}
          image={`../../images/${project.imgUrl}.gif`}
          link={project.link}
        />
      ))}
    </div>
  );
};
