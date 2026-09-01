"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Calendar, School, CheckCircle2 } from "lucide-react";

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  description: string[];
}

interface ResumeEducationProps {
  education: EducationItem[];
}

const ResumeEducation: React.FC<ResumeEducationProps> = ({ education }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
      {education.map((edu, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-border/80 via-border/30 to-border/10 hover:from-teal-500 hover:via-blue-500 hover:to-purple-500 transition-all duration-300 shadow-md flex flex-col justify-between"
        >
          <div className="rounded-[15px] bg-card p-5 sm:p-6 space-y-4 h-full flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 border-b border-border/50 pb-3 mb-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="p-2.5 rounded-xl bg-background border border-border group-hover:scale-110 transition-transform flex-shrink-0">
                    {index === 0 ? (
                      <GraduationCap className="w-5 h-5 text-teal-500" />
                    ) : (
                      <Award className="w-5 h-5 text-purple-500" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug">
                      {edu.degree}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mt-1">
                      <School className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
                      <span className="leading-tight">{edu.institution}</span>
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-border bg-accent/50 text-[11px] font-semibold text-muted-foreground self-start sm:self-auto flex-shrink-0 w-fit">
                  <Calendar className="w-3 h-3" />
                  <span>{edu.period}</span>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
                {edu.description.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Badge Footer */}
            <div className="pt-3 border-t border-border/40 mt-4 flex items-center justify-between text-xs text-muted-foreground font-medium">
              <span className="text-teal-600 dark:text-teal-400 font-bold">Verified Academic Record</span>
              <span>Gorakhpur, UP</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ResumeEducation;