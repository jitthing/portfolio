import { StickyImage } from "./StickyImage";
import { OverlayCopy } from "./OverlayCopy";
import { Projects } from "./Projects";
import { DottedButton } from "./DottedButton";
import { BsGithub } from "react-icons/bs";

const IMG_PADDING = 12;

export const ProjectInfoCards = () => {
  return (
    <div className="bg-white" id="projects">
      <ProjectImageCard
        id="#projects"
        imgUrl={`${process.env.PUBLIC_URL}/images/sunrise.jpeg`}
        subHeading={"My Projects"}
        heading={"Some Things That I Have Done!"}
        height={"150"}
        Component={<Projects />}
      >
        <ProjectContent />
      </ProjectImageCard>
    </div>
  );
};

const ProjectImageCard = ({
  imgUrl,
  subHeading,
  heading,
  Component,
  height,
  children,
}) => {
  // might need to move children out of the div and into the component so achieve the more than 150vh for the card
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className={`relative h-[350vh]`}>
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy
          subHeading={subHeading}
          heading={heading}
          Component={Component}
          height={height}
        />
      </div>
      {children}
    </div>
  );
};

const ProjectContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Brief snapshot of the projects I have done so far!
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        These are my highlight projects
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
        To view all my repositories, click below to visit my Github page!
      </p>
      <a href="https://github.com/jitthing" target="_blank" rel="noreferrer">
        <DottedButton name="Github" Icon={BsGithub} />
      </a>
    </div>
  </div>
);
