import React, { useRef } from "react";
import { VscFileCode } from "react-icons/vsc";
import { AiOutlineApi } from "react-icons/ai";
import { BsDatabase } from "react-icons/bs";
import { IoLanguageOutline } from "react-icons/io5";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const HoverDevCards = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 w-full min-h-[50vh] flex items-center justify-center">
      <div
        className="w-full max-w-7xl grid gap-4 sm:gap-6 
        grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      >
        <Card
          title="Frontend"
          subtitle="Hover to explore"
          Icon={VscFileCode}
          skills={["React", "Next.js", "Vue", "Node js"]}
        />
        <Card
          title="Backend"
          subtitle="Hover to explore"
          Icon={AiOutlineApi}
          skills={["Flask", "Express js", "Go"]}
        />
        <Card
          title="Database"
          subtitle="Hover to explore"
          Icon={BsDatabase}
          skills={["MySQL", "MongoDB", "Firebase", "Supabase"]}
        />
        <Card
          title="Languages"
          subtitle="Hover to explore"
          Icon={IoLanguageOutline}
          skills={["Python", "Javascript", "Typescript", "PHP"]}
        />
      </div>
    </div>
  );
};

const Card = ({ title, subtitle, Icon, skills }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const ref = useRef(null);

  // 3D tilt effect setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x);
  const ySpring = useSpring(y);
  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * 32.5;
    const mouseY = (e.clientY - rect.top) * 32.5;

    const rX = (mouseY / height - 16.25) * -1;
    const rY = mouseX / width - 16.25;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleTouch = () => {
    setIsHovered(!isHovered);
  };

  const getImageSizeClass = (skillsLength) => {
    if (skillsLength <= 3) {
      return "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16";
    } else if (skillsLength <= 5) {
      return "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14";
    } else {
      return "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12";
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouch}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative h-[250px] sm:h-[280px] md:h-[300px]"
    >
      <div
        className="absolute inset-0 rounded-2xl bg-rose-500/20 blur-xl
        transition-all duration-500 ease-in-out"
        style={{
          transform: "translateZ(-20px)",
          opacity: isHovered ? 1 : 0,
        }}
      />

      <div
        style={{
          transform: "translateZ(20px)",
          transformStyle: "preserve-3d",
        }}
        className={`group absolute top-0 left-0 right-0 z-20 p-4 sm:p-6 rounded-xl sm:rounded-2xl 
        border border-slate-200/50 bg-white/90 backdrop-blur-md
        transition-all duration-500 ease-in-out
        ${
          isHovered
            ? "h-auto shadow-2xl"
            : "h-[250px] sm:h-[280px] md:h-[300px] shadow-lg"
        }`}
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-rose-500/90 to-rose-700/90 
          rounded-2xl translate-y-[101%] group-hover:translate-y-[0%] transition-transform duration-500 ease-in-out
          opacity-0 group-hover:opacity-100 shadow-lg shadow-rose-500/50"
        />

        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
          transition-opacity duration-500 ease-in-out pointer-events-none
          shadow-[inset_0_0_30px_rgba(0,0,0,0.2)]"
        />

        <Icon
          style={{
            transform: "translateZ(30px)",
          }}
          className="absolute z-0 -top-8 -right-8 text-9xl text-slate-100 
          group-hover:text-rose-300/40 group-hover:rotate-12 transition-all duration-500 ease-in-out
          drop-shadow-2xl"
        />

        <div className="relative z-10 h-full flex flex-col">
          <div
            style={{
              transform: "translateZ(40px)",
            }}
            className="mb-4"
          >
            <Icon
              className="mb-3 text-3xl text-rose-500 group-hover:text-white transition-colors duration-300
              drop-shadow-md"
            />
            <h3
              className="font-semibold text-xl text-slate-800 group-hover:text-white transition-colors duration-300
              drop-shadow-md"
            >
              {title}
            </h3>
            <div className="relative h-6">
              <p
                className="absolute inset-0 text-slate-500 transition-all duration-300
                group-hover:opacity-0 group-hover:translate-y-2"
              >
                {subtitle}
              </p>
              <p
                className="absolute inset-0 text-rose-100 transition-all duration-300
                opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
              >
                Tilt me!
              </p>
            </div>
          </div>

          {isHovered && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{
                transform: "translateZ(50px)",
              }}
              className="w-full"
            >
              <div className="px-2">
                <div className="flex flex-wrap gap-3 justify-center">
                  {skills.map((skill, index) => (
                    <ImageComponent
                      key={index}
                      imgUrl={`${process.env.PUBLIC_URL}/images/${skill
                        .split(" ")
                        .join("")
                        .toLowerCase()}.png`}
                      name={skill}
                      sizeClass={getImageSizeClass(skills.length)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ImageComponent = ({ imgUrl, name, sizeClass }) => {
  return (
    <div
      className="flex flex-col items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5"
      style={{
        transform: "translateZ(60px)",
      }}
    >
      <img
        className={`${sizeClass} object-contain drop-shadow-lg hover:drop-shadow-2xl 
        transition-all duration-300`}
        src={imgUrl}
        alt={name}
      />
      <p
        className="text-xs sm:text-sm md:text-base text-white font-medium whitespace-nowrap
        drop-shadow-md"
      >
        {name.split(" ").join(".")}
      </p>
    </div>
  );
};

export default HoverDevCards;
