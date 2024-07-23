import { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExperienceTimeLineComponent } from "./TimeLine";
import { Projects } from "./Projects";
import HoverDevCards from "./SkillCards";

// might need to split each card into its own component in order to change the relative height and shit
/* Structure of each component would look like
  < <ComponentName>ImageCard />
  within this is StickyImage + ComponentOverlay
  */

export const InfoCards = () => {
  return (
    <div className="bg-white">
      {/* // Work Experience */}
      <ExperienceImageCard
        className="items-center justify-center"
        imgUrl={"../images/jitt.jpeg"}
        subHeading={"Work Experience"}
        heading={"Where I have been!"}
        height={"150"}
        TimeLine={<ExperienceTimeLineComponent />}
      >
        <ExperienceContent />
      </ExperienceImageCard>
      {/* // Projects */}
      <ProjectImageCard
        imgUrl={"../images/jitt_and_mary.jpeg"}
        subHeading={"Subheading"}
        heading={"Heading"}
        height={"150"}
        TimeLine={<Projects />}
      >
        <ProjectContent />
      </ProjectImageCard>
      {/* // Skills */}
      <SkillImageCard
        imgUrl={"../images/floorball.jpeg"}
        subHeading={"My Skills"}
        heading={"Coding Languages"}
        height={"150"}
        TimeLine={<HoverDevCards />}
      />
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

const ProjectImageCard = ({
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
      <div className={`relative h-[250vh]`}>
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

const SkillImageCard = ({
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
      <div className={`relative h-[125vh]`}>
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

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  console.log(scrollYProgress);

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh + ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        style={{
          opacity,
        }}
        className="absolute inset-0 bg-neutral-950/70"
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subHeading, heading, TimeLine, height }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [500, -500]);
  // need to fix this opacity relative to the whole height
  const opacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 1, 0]);
  //  TO REMEMBER: CHANGE THE INSET ON MOTION.DIV IN ACCORDANCE TO HEIGHT OF OVERLAY
  return (
    <motion.div
      ref={targetRef}
      style={{
        y,
        opacity,
      }}
      className={`absolute left-0 inset-y-28 flex w-full flex-col items-center justify-center text-white`}
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subHeading}
      </p>
      <p className="mb-6 text-center text-3xl font-bold md:text-6xl">
        {heading}
      </p>
      {TimeLine}
    </motion.div>
  );
};

const ExperienceContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">Testing</h2>
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

const ProjectContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Brief snapshot of the projects I have done so far!
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">test</p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
        To view all my projects, click below to visit my Github page!
      </p>
      <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
        Github <FiArrowUpRight className="inline" />
      </button>
    </div>
  </div>
);
