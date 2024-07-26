import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

export const OverlayCopy = ({ subHeading, heading, TimeLine, height }) => {
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
