import projectElement from "../projectElement";

export const Projects = () => {
  return (
    <>
      {/* // Projects 
        Each project to have height of h-screen
        Numbered in ascending order and to have a model/picture of the project
        along with the description
        Example: 

        1.           Picture span
        Description  Picture span
        */}
      {projectElement.map((project) => {
        return (
          <div
            key={project.id}
            className="h-screen w-3/4 grid grid-cols-2 items-center justify-center"
          >
            <div id="title_description" className="flex flex-col py-4 w-full">
              <div>
                {project.id}. {project.title}
              </div>
              <div className="w-1/2 pt-2">{project.description}</div>
            </div>
            <img
              id="pic"
              className="w-full"
              src={`../../images/${project.imgUrl}.jpg`}
              alt=""
            />
          </div>
        );
      })}
    </>
  );
};