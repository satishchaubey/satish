'use client';

import Blogs from "@/components/blogs/page";
import VenomBeamDemo from "@/components/home/page";
import ProjectsSection from "@/components/Projects/ProjectsSection";
import SkillsComponent from "@/components/Skills/SkillsComponent";

export default function Home() {
  return (
    <div className="font-sans  ">
      <>
        <VenomBeamDemo />
        <div className="pb-20">
          <ProjectsSection />
        </div>
        <div className="">
          <SkillsComponent />
        </div>
        <div>
          <Blogs />
        </div>

      </>
    </div>
  );
}
