import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Main = styled(motion.main)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding-top: 100px; // Adjust if necessary for your header
  padding-bottom: 50px;
  height: 100vh;
`;

const Heading = styled.h1`
  font-size: 2.5em;
  color: #333;
`;

const Subheading = styled.p`
  font-size: 1.2em;
  color: #666;
`;

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.3, duration: 0.6 },
  },
};

function MainSection() {
  return (
    <Main variants={containerVariants} initial="hidden" animate="visible">
      <Heading>Hello, I'm [Your Name]</Heading>
      <Subheading>I'm a [Your Profession]. Welcome to my portfolio!</Subheading>
    </Main>
  );
}

export default MainSection;
