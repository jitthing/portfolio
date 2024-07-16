import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import timelineElements from "../timelineElement";

export const ExperienceTimeLineComponent = () => {
  let IconStyles = {
    background: "#d3d3d3",
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
              <p>{element.description}</p>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </>
  );
};

const ComponentPicture = ({ imgUrl }) => {
  return <img src={imgUrl} alt="" />;
};
