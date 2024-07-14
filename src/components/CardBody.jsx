import { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExperienceTimeLineComponent } from "./TimeLine";
import HoverDevCards from "./SkillCards";

export const InfoCards = () => {
  return (
    <div className="bg-white">
      {/* // Work Experience */}
      <ImageCard
        className="items-center justify-center"
        imgUrl={"../images/jitt.jpeg"}
        subHeading={"Work Experience"}
        heading={"Where I have been!"}
        height={"150"}
        TimeLine={<ExperienceTimeLineComponent />}
      >
        <Content header={"hgosfdhgf"} subHeading={"hgskjhjkfsd"} />
      </ImageCard>
      {/* // Projects */}
      <ImageCard
        imgUrl={"../images/jitt_and_mary.jpeg"}
        subHeading={"Subheading"}
        heading={"Heading"}
        height={"150"}
      >
        <Content />
      </ImageCard>
      {/* // Skills */}
      <ImageCard
        imgUrl={"../images/floorball.jpeg"}
        subHeading={"Skills"}
        heading={"Categories"}
        height={"150"}
        TimeLine={<HoverDevCards />}
      >
        <Content />
      </ImageCard>
    </div>
  );
};

const IMG_PADDING = 12;

const ImageCard = ({
  imgUrl,
  subHeading,
  heading,
  TimeLine,
  height,
  children,
}) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className={`relative h-[${height}vh]`}>
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

  let pixels = 250 * (height / 150);

  const y = useTransform(scrollYProgress, [0, 1], [pixels, -pixels]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);
  //  TO REMEMBER: CHANGE THE INSET ON MOTION.DIV IN ACCORDANCE TO HEIGHT OF OVERLAY
  return (
    <motion.div
      ref={targetRef}
      style={{
        y,
        opacity,
      }}
      className={`absolute left-0 inset-y-28 flex h-screen w-full flex-col items-center justify-center text-white`}
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

const Content = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Additional content explaining the above card here
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
        blanditiis soluta eius quam modi aliquam quaerat odit deleniti minima
        maiores voluptate est ut saepe accusantium maxime doloremque nulla
        consectetur possimus.
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        reiciendis blanditiis aliquam aut fugit sint.
      </p>
      <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
        Learn more <FiArrowUpRight className="inline" />
      </button>
    </div>
  </div>
);
