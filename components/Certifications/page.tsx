"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Heart, Sparkles, CheckCircle2 } from "lucide-react";

interface Certification {
  name: string;
  institution: string;
  year: number;
}

interface ResumeCertificationsProps {
  certifications: Certification[];
}

const ResumeCertifications: React.FC<ResumeCertificationsProps> = ({ certifications }) => {
  return (
    <div className="space-y-4">
      {certifications.map((cert, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-border/80 via-border/30 to-border/10 hover:from-teal-500 hover:via-purple-500 transition-all duration-300 shadow-md"
        >
          <div className="rounded-[15px] bg-card p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-background border border-border group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6 text-teal-500" />
            </div>
            <div>
              <h4 className="text-base font-bold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {cert.name}
              </h4>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">
                {cert.institution} • {cert.year}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

interface ResumeHobbiesProps {
  hobbies: string[];
}

const ResumeHobbies: React.FC<ResumeHobbiesProps> = ({ hobbies }) => {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-md">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
        <Heart className="w-4 h-4 text-purple-500" />
        <span className="text-sm font-bold text-foreground">Interests & Hobbies</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {hobbies.map((hobby, index) => (
          <span
            key={index}
            className="px-3 py-1 rounded-full text-xs font-semibold border border-border bg-background hover:bg-accent text-foreground transition-all cursor-default flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>{hobby}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export { ResumeCertifications, ResumeHobbies };