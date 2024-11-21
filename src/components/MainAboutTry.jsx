import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { HashLink as Link } from "react-router-hash-link";
import { DottedButton } from "./DottedButton";

const HeroSection = styled.section`
  height: 300vh;
  position: relative;
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const HeroImage = styled(motion.img)`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const ContentWrapper = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 0 2rem;
`;

const Heading = styled(motion.h1)`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Subheading = styled(motion.div)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const NavigationButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

function MainSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <HeroSection ref={containerRef}>
      <StickyContainer>
        <HeroImage
          src={`${process.env.PUBLIC_URL}/images/profile.jpg`}
          style={{
            scale: imageScale,
            opacity: imageOpacity,
          }}
        />

        <ContentWrapper
          style={{
            y: textY,
            opacity: textOpacity,
          }}
        >
          <Heading>Hello 👋🏼, I'm Jitt</Heading>
          <Subheading>
            I'm a software engineer passionate about building great experiences
          </Subheading>

          <NavigationButtons>
            <Link to="#experience" smooth>
              <DottedButton name="Experience" />
            </Link>
            <Link to="#projects" smooth>
              <DottedButton name="Projects" />
            </Link>
            <Link to="#skills" smooth>
              <DottedButton name="Skills" />
            </Link>
          </NavigationButtons>
        </ContentWrapper>
      </StickyContainer>
    </HeroSection>
  );
}

export default MainSection;
