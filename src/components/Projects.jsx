import projectElement from "../projectElement";
import "./Projects.css";
import "./ProjectCard.css";
import { DottedButton } from "./DottedButton";

const ProjectCard = ({ title, description, image, link, skills }) => {
  return (
    <div className="project-card">
      <img src={image} alt={title} className="project-image" />
      <div className="project-content">
        <h2 className="project-title">{title}</h2>
        <p className="project-description">{description}</p>
        <div className="flex flex-wrap mt-2 justify-center mb-4">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-200 text-gray-800 text-base font-medium px-2 py-1 rounded-xl mr-2 mb-2"
            >
              {skill}
            </span>
          ))}
        </div>
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
          image={`${process.env.PUBLIC_URL}/images/${project.imgUrl}`}
          link={project.projectLink}
          skills={project.skills}
        />
      ))}
    </div>
  );
};
