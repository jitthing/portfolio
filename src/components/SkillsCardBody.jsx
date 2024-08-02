import { StickyImage } from "./StickyImage";
import { OverlayCopy } from "./OverlayCopy";
import HoverDevCards from "./SkillCards";

const IMG_PADDING = 12;

export const SkillInfoCards = () => {
  return (
    <div className="bg-white" id="skills">
      <SkillImageCard
        id="#skills"
        imgUrl={`${process.env.PUBLIC_URL}/images/coldplay.jpeg`}
        subHeading={"My Skills"}
        heading={"Coding Languages"}
        height={"150"}
        Component={<HoverDevCards />}
      />
    </div>
  );
};

const SkillImageCard = ({
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
      <div className={`relative h-[125vh]`}>
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
