"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, Sparkles, ChevronDown, ChevronUp } from "lucide-react";

interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
}

interface ResumeProjectsProps {
  projects: ProjectItem[];
}

const ResumeProjects: React.FC<ResumeProjectsProps> = ({ projects }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <div className="space-y-6 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.35, delay: index * 0.03 }}
              className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-border/80 via-border/30 to-border/10 hover:from-teal-500 hover:via-blue-500 hover:to-purple-500 transition-all duration-300 shadow-md flex flex-col justify-between"
            >
              <div className="rounded-[15px] bg-card p-5 space-y-3.5 h-full flex flex-col justify-between">
                <div>
                  {/* Header */}
                  <div className="flex items-center gap-3 border-b border-border/50 pb-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-background border border-border group-hover:scale-110 transition-transform">
                      <FolderGit2 className="w-5 h-5 text-teal-500" />
                    </div>
                    <h3 className="text-base font-bold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="pt-2 border-t border-border/40 flex flex-wrap gap-1.5 mt-auto">
                  {project.technologies.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-accent text-foreground border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Expand Button */}
      {projects.length > 6 && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-border bg-card hover:bg-accent text-foreground text-xs md:text-sm font-semibold transition-all cursor-pointer hover:scale-105 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{showAll ? "Show Top Projects" : `View All Production Projects (${projects.length} Total)`}</span>
            {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeProjects;