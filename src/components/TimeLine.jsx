import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import timelineElements from "../timelineElement";

// import { SiAccenture } from "react-icons/si";

export const ExperienceTimeLineComponent = () => {
  let IconStyles = {
    background: "#FFFFFF",
    // border: "2px solid",
    display: "flex",
    alignItems: "center",
  };

  return (
    <>
      <VerticalTimeline
        className="font-sans"
        contentStyle="relative"
        lineColor="white"
      >
        {timelineElements.map((element) => {
          return (
            <VerticalTimelineElement
              key={element.id}
              className="text-black"
              date={element.date}
              dateClassName="text-white"
              iconStyle={IconStyles}
              icon={
                <ComponentPicture
                  className="flex flex-row justify-center"
                  imgUrl={`../../images/${element.icon}.png`}
                />
              }
            >
              <h3 className="vertical-timeline-element-title text-xl">
                {element.title}
              </h3>
              <h5 className="vertical-timeline-element-subtitle text-lg">
                {element.location}
              </h5>
              <p>
                <ul>
                  {element.description.map((desc, index) => {
                    return <li key={index}>{desc}</li>;
                  })}
                </ul>
              </p>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </>
  );
};

const ComponentPicture = ({ imgUrl }) => {
  return <img className="ps-1" height={57} width={57} src={imgUrl} alt="" />;
};
