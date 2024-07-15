import React from "react";
import { VscFileCode } from "react-icons/vsc";
import { AiOutlineApi } from "react-icons/ai";
import { BsDatabase } from "react-icons/bs";
import { IoLanguageOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 0.2, duration: 0.5 },
  },
};

const HoverDevCards = () => {
  return (
    <div className="p-4 w-full h-1/3 items-center">
      <div className="h-full grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card
          title="Frontend"
          subtitle="Frameworks"
          href="#"
          Icon={VscFileCode}
          skills={["React"]}
        ></Card>
        <Card
          title="Backend"
          subtitle="Frameworks"
          href="#"
          Icon={AiOutlineApi}
          skills={["Flask"]}
        ></Card>
        <Card
          title="Database"
          subtitle="Something"
          href="#"
          Icon={BsDatabase}
          skills={["MySQL", "MongoDB"]}
        ></Card>
        <Card
          title="Languages"
          subtitle="Languages"
          href="#"
          Icon={IoLanguageOutline}
          skills={["Python", "Javascript", "PHP"]}
        ></Card>
      </div>
    </div>
  );
};

const Card = ({ title, subtitle, Icon, href, skills }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    console.log(isHovered);
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    console.log(isHovered);
    setIsHovered(false);
  };
  return (
    <a
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-400 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

      <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
      <Icon className="mb-2 text-2xl text-blue-600 group-hover:text-white transition-colors relative z-10 duration-300" />
      <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
        {title}
      </h3>
      <p className="text-slate-400 group-hover:text-blue-100 relative z-10 duration-300">
        {subtitle}
      </p>
      {isHovered && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="absolute z-50 pt-4"
        >
          <div className="flex flex-row items-center px-2">
            {skills.map((skill, index) => {
              return (
                <ImageComponent
                  key={index}
                  imgUrl={`../images/${skill.toLowerCase()}.png`}
                  name={skill}
                />
              );
            })}
          </div>
        </motion.div>
      )}
    </a>
  );
};

const ImageComponent = ({ imgUrl, name }) => {
  return (
    <div className="grid grid-rows-2 gap-2 justify-center">
      <img width={100} height={100} src={imgUrl} alt={name} />
      <p className="text-center">{name}</p>
    </div>
  );
};
export default HoverDevCards;
