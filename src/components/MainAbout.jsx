import React, { useState, useEffect } from "react";
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

const Subheading = styled.span`
  font-size: 1.2em;
  color: #666;
`;

const Cursor = styled.span`
  color: #0072ef;
  animation: blink 1s linear infinite;

  @keyframes blink {
    0% {
      opacity: 100%;
    }
    50% {
      opacity: 0%;
    }
  }
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
  const typingSpeed = 150,
    deletingSpeed = 50,
    delay = 1500;
  const phrases = ["a student", "a developer", "a designer"];
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(typingSpeed);

  useEffect(() => {
    let timeout;

    // Function to handle the typing effect
    const handleTyping = () => {
      const i = count % phrases.length;
      const fullText = phrases[i];
      const updatedText = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);
      setText(updatedText);

      if (!isDeleting && updatedText === fullText) {
        // Pause before deleting
        setSpeed(delay);
        setIsDeleting(true);
      } else if (isDeleting && updatedText === "") {
        // Start typing the next phrase
        setIsDeleting(false);
        setCount(count + 1);
        setSpeed(typingSpeed);
      } else {
        // Determine speed of typing
        setSpeed(isDeleting ? deletingSpeed : typingSpeed);
      }
    };

    timeout = setTimeout(handleTyping, speed);

    return () => clearTimeout(timeout);
  }, [
    text,
    isDeleting,
    speed,
    phrases,
    count,
    typingSpeed,
    deletingSpeed,
    delay,
  ]);

  return (
    <Main variants={containerVariants} initial="hidden" animate="visible">
      <Heading>Hello 👋🏼, I'm Jitt</Heading>
      <Subheading>
        I'm {text}
        <Cursor id="cursor">|</Cursor>
      </Subheading>
    </Main>
  );
}

export default MainSection;
