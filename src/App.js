import MainSection from "./components/MainAbout";
import { ExperienceInfoCards } from "./components/ExperienceCardBody";
import { ProjectInfoCards } from "./components/ProjectCardBody";
import { SkillInfoCards } from "./components/SkillsCardBody";
import { TryAbout } from "./components/TryAbout";
// import { Projects } from "./components/Projects";
function App() {
  return (
    <>
      <MainSection />
      <ExperienceInfoCards />
      <ProjectInfoCards />
      <SkillInfoCards />
      <TryAbout />
      {/* Add a contact component with all the links (LinkedIn, Github, Email) */}
    </>
  );
}

export default App;
