'use client';

import AIPlayground from "@/components/AIPlayground/AIPlayground";
import Blogs from "@/components/blogs/page";
import VenomBeamDemo from "@/components/home/page";
import ProjectsSection from "@/components/Projects/ProjectsSection";
import SkillsComponent from "@/components/Skills/SkillsComponent";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <VenomBeamDemo />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="py-2 md:py-4"
        >
          <ProjectsSection />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="py-2 md:py-4 border-t border-border/40"
        >
          <SkillsComponent />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="py-2 md:py-4 border-t border-border/40"
        >
          <AIPlayground />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="py-2 md:py-4 border-t border-border/40"
        >
          <Blogs />
        </motion.div>
      </motion.div>
    </div>
  );
}
