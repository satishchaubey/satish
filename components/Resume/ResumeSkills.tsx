"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Server, 
  Database, 
  Cpu, 
  Wrench, 
  Sparkles,
  Layers,
  Zap,
  Globe,
  ShieldCheck,
  Workflow,
  ChevronDown,
  ChevronUp
} from "lucide-react";

import NumberCounter from "@/components/ui/NumberCounter";

interface ResumeSkillItem {
  name: string;
  category: string;
  proficiency: number;
  level?: string;
  experience?: string;
}

interface ResumeSkillsProps {
  skills: ResumeSkillItem[];
}

const getSkillIcon = (name: string, category: string) => {
  const n = name.toLowerCase();
  if (n.includes("react") || n.includes("next")) return <Code2 className="w-5 h-5 text-teal-500" />;
  if (n.includes("type") || n.includes("java")) return <Globe className="w-5 h-5 text-blue-500" />;
  if (n.includes("tailwind") || n.includes("shadcn")) return <Layers className="w-5 h-5 text-cyan-500" />;
  if (n.includes("node") || n.includes("express")) return <Server className="w-5 h-5 text-emerald-500" />;
  if (n.includes("fastapi") || n.includes("api")) return <Workflow className="w-5 h-5 text-purple-500" />;
  if (n.includes("payu") || n.includes("payment")) return <ShieldCheck className="w-5 h-5 text-amber-500" />;
  if (n.includes("mongo") || n.includes("redis") || n.includes("sql")) return <Database className="w-5 h-5 text-indigo-500" />;
  if (n.includes("aws") || n.includes("gcp") || n.includes("cloud")) return <Cpu className="w-5 h-5 text-orange-500" />;
  return <Wrench className="w-5 h-5 text-slate-400" />;
};

const ResumeSkills: React.FC<ResumeSkillsProps> = ({ skills }) => {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [showAll, setShowAll] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const categories = ["All", "Frontend", "Backend", "Database", "DevOps", "Tools"];

  const filteredSkills = activeTab === "All" 
    ? skills 
    : skills.filter((s) => s.category.toLowerCase().includes(activeTab.toLowerCase()));

  const initialLimit = isMobile ? 4 : 3;
  const visibleSkills = showAll ? filteredSkills : filteredSkills.slice(0, initialLimit);

  return (
    <div className="space-y-6 pt-2">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeTab === cat
                ? "bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md"
                : "border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
          >
            {cat === "All" ? "All Skills" : cat}
          </button>
        ))}
      </div>

      {/* Grid of Skill Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {visibleSkills.map((skill, idx) => {
            const percentage = skill.proficiency * 20;
            const level = skill.proficiency >= 5 ? "Proficient" : skill.proficiency >= 4 ? "Moderate" : "Proficient";
            const icon = getSkillIcon(skill.name, skill.category);

            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: idx * 0.02 }}
                className="group relative rounded-xl border border-border/70 bg-card p-4 hover:border-teal-500/50 hover:shadow-lg transition-all duration-300 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-background border border-border group-hover:scale-105 transition-transform">
                      {icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {skill.name}
                      </h4>
                      <span className="text-[11px] text-muted-foreground font-medium">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border border-teal-500/30 bg-teal-500/10 text-teal-600 dark:text-teal-300">
                    {level}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] font-semibold text-muted-foreground">
                    <span>Proficiency</span>
                    <span className="text-foreground font-bold">
                      <NumberCounter value={`${percentage}%`} />
                    </span>
                  </div>
                  <div className="w-full bg-accent/60 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: idx * 0.03 }}
                      className="h-full rounded-full bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* View All Skills Toggle Button */}
      {filteredSkills.length > initialLimit && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-border bg-card hover:bg-accent text-foreground text-xs md:text-sm font-semibold transition-all cursor-pointer hover:scale-105 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{showAll ? "Show Top Skills" : `View All Technical Skills (${filteredSkills.length} Total)`}</span>
            {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeSkills;