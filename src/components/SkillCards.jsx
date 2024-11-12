import React from "react";
import { VscFileCode } from "react-icons/vsc";
import { AiOutlineApi } from "react-icons/ai";
import { BsDatabase } from "react-icons/bs";
import { IoLanguageOutline } from "react-icons/io5";
import { motion } from "framer-motion";

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
          skills={["React", "Vue", "Node js"]}
        />
        <Card
          title="Backend"
          subtitle="Hover to explore"
          Icon={AiOutlineApi}
          skills={["Flask", "Express js"]}
        />
        <Card
          title="Database"
          subtitle="Hover to explore"
          Icon={BsDatabase}
          skills={["MySQL", "MongoDB", "Firebase"]}
        />
        <Card
          title="Languages"
          subtitle="Hover to explore"
          Icon={IoLanguageOutline}
          skills={["Python", "Javascript", "PHP"]}
        />
      </div>
    </div>
  );
};

const Card = ({ title, subtitle, Icon, skills }) => {
  const [isHovered, setIsHovered] = React.useState(false);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouch}
      className="relative h-[250px] sm:h-[280px] md:h-[300px]"
    >
      <div
        className={`group absolute top-0 left-0 right-0 z-20 p-4 sm:p-6 rounded-xl sm:rounded-2xl 
        border border-slate-200 bg-white/80 backdrop-blur-sm hover:bg-white
        hover:shadow-lg hover:shadow-slate-200 overflow-hidden
        transition-[height,background,shadow] duration-500 ease-in-out
        ${isHovered ? "h-auto" : "h-[250px] sm:h-[280px] md:h-[300px]"}`}
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-rose-500/80 to-rose-700/80 
          rounded-2xl translate-y-[101%] group-hover:translate-y-[0%] transition-transform duration-500 ease-in-out
          opacity-0 group-hover:opacity-100"
        />

        <Icon
          className="absolute z-0 -top-8 -right-8 text-9xl text-slate-100 
          group-hover:text-rose-300/30 group-hover:rotate-12 transition-all duration-500 ease-in-out"
        />

        <div className="relative z-10 h-full flex flex-col">
          <div className="mb-4">
            <Icon className="mb-3 text-3xl text-rose-500 group-hover:text-white transition-colors duration-300" />
            <h3 className="font-semibold text-xl text-slate-800 group-hover:text-white transition-colors duration-300">
              {title}
            </h3>
            <p className="text-slate-500 group-hover:text-rose-100 group-hover:opacity-0 transition-all duration-300">
              {subtitle}
            </p>
          </div>

          {isHovered && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
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
    <div className="flex flex-col items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5">
      <img className={`${sizeClass} object-contain`} src={imgUrl} alt={name} />
      <p className="text-xs sm:text-sm md:text-base text-white font-medium whitespace-nowrap">
        {name.split(" ").join(".")}
      </p>
    </div>
  );
};

export default HoverDevCards;
