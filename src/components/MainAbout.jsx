import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { HashLink as Link } from "react-router-hash-link";
import { DottedButton } from "./DottedButton";

const Main = styled(motion.main)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;
  padding-top: 100px; // Adjust if necessary for your header
  padding-bottom: 50px;
`;

const NavigationBarWrapper = styled.div`
  position: fixed;
  z-index: 100;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  max-width: 90%;

  @media (max-width: 768px) {
    bottom: 2rem;
  }

  @media (max-width: 480px) {
    bottom: 1.5rem;
  }
`;

const NavigationBar = styled(motion.div)`
  display: flex;
  gap: 1rem;
  padding: 1rem 2rem;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.2s ease-in-out;

  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    gap: 0.5rem;
    transform: scale(0.9);
  }
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

const ProfileImageContainer = styled(motion.div)`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  &:hover .hover-image {
    opacity: 1;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
`;

const HoverImage = styled(ProfileImage)`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

function MainSection() {
  const typingSpeed = 150,
    deletingSpeed = 50,
    delay = 1500;
  // eslint-disable-next-line
  const phrases = ["student", "developer", "software engineer"];
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(typingSpeed);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "-100px" });
  const { scrollY } = useScroll();

  // Create opacity value based on scroll position
  const navOpacity = useTransform(
    scrollY,
    [0, 100],
    [isInView ? 0.8 : 0.3, 0.3]
  );

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
    // eslint-disable-next-line
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
    <div className="flex flex-col h-[100vh]">
      <div className="h-5/6 grid gap-16 grid-cols-2 lg:grid-cols-2">
        <Main variants={containerVariants} initial="hidden" animate="visible">
          <Heading>Hello 👋🏼, I'm Jitt</Heading>
          <Subheading>
            I'm a {text}
            <Cursor id="cursor">|</Cursor>
          </Subheading>
        </Main>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-center items-start h-full rounded-xl pt-2"
        >
          <ProfileImageContainer
            whileHover={{
              scale: 1.05,
              rotate: -10,
            }}
            transition={{ duration: 0.2 }}
          >
            <ProfileImage
              src={`${process.env.PUBLIC_URL}/images/profile.jpg`}
              alt="profile"
            />
            <HoverImage
              className="hover-image"
              src={`${process.env.PUBLIC_URL}/images/profile2.jpg`}
              alt="profile hover"
            />
          </ProfileImageContainer>
        </motion.div>
      </div>
      <NavigationBarWrapper>
        <NavigationBar
          initial={{ opacity: 0.3 }}
          animate={{ opacity: navOpacity }}
          whileHover={{
            opacity: 1,
            scale: 1,
            background: "rgba(255, 255, 255, 0.95)",
          }}
          transition={{ duration: 0.2 }}
        >
          <Link to="#experience" smooth>
            <DottedButton name="Experience" />
          </Link>
          <Link to="#projects" smooth>
            <DottedButton name="Projects" />
          </Link>
          <Link to="#skills" smooth>
            <DottedButton name="Skills" />
          </Link>
        </NavigationBar>
      </NavigationBarWrapper>
    </div>
  );
}

export default MainSection;
