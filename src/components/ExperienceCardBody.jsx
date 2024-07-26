import { FiArrowUpRight } from "react-icons/fi";
import { ExperienceTimeLineComponent } from "./TimeLine";
import { OverlayCopy } from "./OverlayCopy";
import { StickyImage } from "./StickyImage";

// import { BsLinkedin } from "react-icons/bs";

// might need to split each card into its own component in order to change the relative height and shit
/* Structure of each component would look like
  < <ComponentName>ImageCard />
  within this is StickyImage + ComponentOverlay
  */

export const ExperienceInfoCards = () => {
  return (
    <div className="bg-white" id="experience">
      {/* // Work Experience */}
      <ExperienceImageCard
        id="#experience"
        className="items-center justify-center"
        imgUrl={"../images/jitt.jpeg"}
        subHeading={"Work Experience"}
        heading={"Where I have been!"}
        height={"150"}
        TimeLine={<ExperienceTimeLineComponent />}
      >
        <ExperienceContent />
      </ExperienceImageCard>
    </div>
  );
};

const IMG_PADDING = 12;

const ExperienceImageCard = ({
  imgUrl,
  subHeading,
  heading,
  TimeLine,
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
      <div className={`relative h-[200vh]`}>
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy
          subHeading={subHeading}
          heading={heading}
          TimeLine={TimeLine}
          height={height}
        />
      </div>
      {children}
    </div>
  );
};

const ExperienceContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      A Timeline of my Work & Educational Experience
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">Testing 2</p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">Testing 3</p>
      <a
        href={`${process.env.PUBLIC_URL}/resume.pdf`}
        download="Jitt Hing Resume.pdf"
      >
        <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
          My Resume <FiArrowUpRight className="inline" />
        </button>
      </a>
    </div>
  </div>
);
