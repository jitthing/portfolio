import React from "react";
import { VscFileCode } from "react-icons/vsc";
import { AiOutlineApi } from "react-icons/ai";
import { BsDatabase } from "react-icons/bs";
import { IoLanguageOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    y: -20,
    opacity: 1,
    transition: { delay: 0.2, duration: 0.5 },
  },
};

const HoverDevCards = () => {
  return (
    <div className="p-4 w-full h-2/3 items-center xl:h-1/3">
      <div className="h-full grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card
          title="Frontend"
          subtitle="Hover Me!"
          Icon={VscFileCode}
          skills={["React", "Node js"]}
        ></Card>
        <Card
          title="Backend"
          subtitle="Hover Me!"
          Icon={AiOutlineApi}
          skills={["Flask", "Express js"]}
        ></Card>
        <Card
          title="Database"
          subtitle="Hover Me!"
          Icon={BsDatabase}
          skills={["MySQL", "MongoDB"]}
        ></Card>
        <Card
          title="Languages"
          subtitle="Hover Me!"
          Icon={IoLanguageOutline}
          skills={["Python", "Javascript", "PHP"]}
        ></Card>
      </div>
    </div>
  );
};

const Card = ({ title, subtitle, Icon, skills }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    // console.log(isHovered);
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    // console.log(isHovered);
    setIsHovered(false);
  };
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

      <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-200 group-hover:text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
      <Icon className="mb-2 text-2xl text-blue-600 group-hover:text-white transition-colors relative z-10 duration-300" />
      <h3 className="font-medium text-xl text-slate-950 group-hover:text-white relative z-10 duration-300">
        {title}
      </h3>
      <p className="text-slate-400 text-lg group-hover:text-transparent-white relative z-10 duration-300">
        {subtitle}
      </p>
      {isHovered && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-50 pt-4 w-full"
        >
          <div className="flex flex-row items-center px-2 w-full">
            {skills.map((skill, index) => {
              return (
                <ImageComponent
                  key={index}
                  imgUrl={`../images/${skill
                    .split(" ")
                    .join("")
                    .toLowerCase()}.png`}
                  name={skill}
                />
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

const ImageComponent = ({ imgUrl, name }) => {
  return (
    <div className="grid grid-rows-2 gap-2 justify-center px-2">
      <img width={80} height={80} src={imgUrl} alt={name} />
      <p className="text-center">{name.split(" ").join(".")}</p>
    </div>
  );
};
export default HoverDevCards;

// @media (max-width: 768px) {
//   .image-component {
//     transform: scale(0.8);
//   }
// }
