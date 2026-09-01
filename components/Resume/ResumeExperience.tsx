"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { AnimatedButton } from "../ui/animated-button";
import { Sparkles, Calendar, Building2, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

interface ResumeExperienceProps {
  experiences: ExperienceItem[];
}

const ResumeExperience: React.FC<ResumeExperienceProps> = ({ experiences }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleExperiences = showAll ? experiences : experiences.slice(0, 3);

  return (
    <div className="space-y-6 pt-4">
      {visibleExperiences.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-border/80 via-border/30 to-border/10 hover:from-teal-500 hover:via-blue-500 hover:to-purple-500 transition-all duration-300 shadow-md h-full"
        >
          <div className="rounded-[15px] bg-card p-5 sm:p-6 space-y-4 h-full flex flex-col justify-between">
            
            {/* Header / Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-3">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {exp.role}
                </h3>
                <div className="flex items-center gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400 mt-1">
                  <Building2 className="w-4 h-4 text-teal-500" />
                  <span>{exp.company}</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-accent/50 text-xs font-semibold text-muted-foreground w-fit">
                <Calendar className="w-3.5 h-3.5" />
                <span>{exp.period}</span>
              </div>
            </div>

            {/* Description Points */}
            <ul className="space-y-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
              {exp.description.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Tech Stack Pills */}
            <div className="pt-2 flex flex-wrap gap-1.5">
              {exp.technologies.map((tech: string) => (
                <span 
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-accent text-foreground border border-border/60"
                >
                  {tech}
                </span>
              ))}
            </div>

          </div>
        </motion.div>
      ))}

      {/* Show More/Less Button */}
      {experiences.length > 3 && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-border bg-card hover:bg-accent text-foreground text-xs md:text-sm font-semibold transition-all cursor-pointer hover:scale-105 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{showAll ? "Show Key Roles Only" : `View All Experience (${experiences.length} Roles)`}</span>
            {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeExperience;
