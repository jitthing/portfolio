import MainSection from "./components/MainAbout";
import { ExperienceInfoCards } from "./components/ExperienceCardBody";
import { ProjectInfoCards } from "./components/ProjectCardBody";
import { SkillInfoCards } from "./components/SkillsCardBody";
import { About } from "./components/About";
// import { Projects } from "./components/Projects";
function App() {
  return (
    <>
      <MainSection />
      <ExperienceInfoCards />
      <ProjectInfoCards />
      <SkillInfoCards />
      <About />
      {/* Add a contact component with all the links (LinkedIn, Github, Email) */}
    </>
  );
}

export default App;
