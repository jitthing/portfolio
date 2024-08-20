import MainSection from "./components/MainAbout";
import { ExperienceInfoCards } from "./components/ExperienceCardBody";
import { ProjectInfoCards } from "./components/ProjectCardBody";
import { SkillInfoCards } from "./components/SkillsCardBody";
import { About } from "./components/About";
import { ReactLenis, useLenis } from "lenis/react";

// import { Projects } from "./components/Projects";
function App() {
  // eslint-disable-next-line
  const lenis = useLenis(({ scroll }) => {});
  return (
    <>
      <ReactLenis root>
        <MainSection />
        <ExperienceInfoCards />
        <ProjectInfoCards />
        <SkillInfoCards />
        <About />
      </ReactLenis>
    </>
  );
}

export default App;
