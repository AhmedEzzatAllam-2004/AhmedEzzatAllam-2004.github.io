import Hero from "@/components/Hero";
import About from "@/components/About";
import { WhatIKnow } from "@/components/Skills";
import Experience from "@/components/Experience";
import ProjectsSection from "@/components/ProjectsSection";
import { ContactsSlide } from "@/components/ContactsSlide";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative w-full overflow-x-clip bg-black text-white">
      <Hero />
      <About />

      <div id="skills">
        <WhatIKnow />
      </div>

      <Experience />
      <ProjectsSection />
      <ContactsSlide />
      <Footer />
    </div>
  );
};

export default Index;