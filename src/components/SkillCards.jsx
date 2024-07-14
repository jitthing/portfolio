import React from "react";
import styled from "styled-components";
import { FiUsers } from "react-icons/fi";
import { VscFileCode } from "react-icons/vsc";
import { BsDatabase } from "react-icons/bs";

const HoverDevCards = () => {
  return (
    <div className="p-4 w-full h-3/6 items-center">
      <div className="h-full grid gap-4 grid-cols-2 lg:grid-cols-3">
        <Card
          title="Frontend"
          subtitle="Manage profile"
          href="#"
          Icon={VscFileCode}
        />
        <Card title="Backend" subtitle="Manage team" href="#" Icon={FiUsers} />
        <Card
          title="Database"
          subtitle="Manage cards"
          href="#"
          Icon={BsDatabase}
        />
      </div>
    </div>
  );
};

const Card = ({ title, subtitle, Icon, href }) => {
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
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

      <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300" />
      <Icon className="mb-2 text-2xl text-violet-600 group-hover:text-white transition-colors relative z-10 duration-300" />
      <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
        {title}
      </h3>
      <p className="text-slate-400 group-hover:text-violet-200 relative z-10 duration-300">
        {subtitle}
      </p>
      {isHovered && (
        <p className="absolute z-50 transition-all duration-300 ease-in">
          Hello
        </p>
      )}
    </a>
  );
};
export default HoverDevCards;
