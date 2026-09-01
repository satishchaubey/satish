"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Server, Database, Cpu, Layers, Terminal, Wrench, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import LustreText from "../ui/lustretext";
import { AwsIcon, NextJsIcon, NodeJsIcon, ReactIcon, SqlIcon } from "../Icons";

import NumberCounter from "@/components/ui/NumberCounter";

interface SkillItem {
  name: string;
  category: "Frontend" | "Backend" | "Database & Cloud" | "Tools & Styling";
  level: "Proficient" | "Moderate" | "Intermediate";
  percentage: number;
  icon?: React.ReactNode;
  color: string;
}

const allSkills: SkillItem[] = [
  // Frontend
  { name: "React.js & Next.js (App & Page Router)", category: "Frontend", level: "Proficient", percentage: 95, icon: <NextJsIcon />, color: "from-teal-500 to-emerald-500" },
  { name: "TypeScript & JavaScript", category: "Frontend", level: "Proficient", percentage: 92, icon: <ReactIcon />, color: "from-cyan-500 to-blue-500" },
  { name: "Tailwind CSS, ShadCN & Radix UI", category: "Frontend", level: "Proficient", percentage: 95, color: "from-teal-400 to-cyan-500" },
  { name: "Redux Toolkit & State Management", category: "Frontend", level: "Moderate", percentage: 88, color: "from-purple-500 to-indigo-600" },
  { name: "Vite & Modern Frontend Tooling", category: "Frontend", level: "Moderate", percentage: 86, color: "from-pink-500 to-rose-500" },
  { name: "SCSS, MUI & Bootstrap", category: "Frontend", level: "Moderate", percentage: 85, color: "from-indigo-400 to-purple-500" },

  // Backend
  { name: "Node.js & Express.js", category: "Backend", level: "Moderate", percentage: 78, icon: <NodeJsIcon />, color: "from-green-500 to-emerald-600" },
  { name: "PayU & Razorpay Gateways", category: "Backend", level: "Moderate", percentage: 75, color: "from-emerald-500 to-teal-500" },
  { name: "REST APIs & FastAPI Integration", category: "Backend", level: "Moderate", percentage: 72, color: "from-blue-500 to-indigo-500" },
  { name: "Redis Caching & Event Streams", category: "Backend", level: "Moderate", percentage: 68, color: "from-red-500 to-rose-600" },
  { name: "LLM & AI RAG/CAG Architecture", category: "Backend", level: "Moderate", percentage: 65, color: "from-purple-500 to-pink-500" },

  // Database & Cloud
  { name: "MongoDB & Mongoose ODM", category: "Database & Cloud", level: "Proficient", percentage: 92, color: "from-emerald-500 to-teal-600" },
  { name: "MERN & Microservices Architecture", category: "Database & Cloud", level: "Proficient", percentage: 90, color: "from-purple-600 to-indigo-600" },
  { name: "MySQL & Relational Databases", category: "Database & Cloud", level: "Moderate", percentage: 84, icon: <SqlIcon />, color: "from-blue-600 to-indigo-600" },
  { name: "GCP Deployment & AWS (EC2, S3)", category: "Database & Cloud", level: "Moderate", percentage: 82, icon: <AwsIcon />, color: "from-amber-500 to-orange-600" },

  // Tools & Testing
  { name: "Git, GitHub & Version Control", category: "Tools & Styling", level: "Proficient", percentage: 95, color: "from-slate-700 to-slate-900" },
  { name: "Postman & API Testing", category: "Tools & Styling", level: "Proficient", percentage: 92, color: "from-orange-500 to-amber-600" },
  { name: "VS Code & Developer Tooling", category: "Tools & Styling", level: "Proficient", percentage: 95, color: "from-blue-500 to-cyan-600" },
];

const categories = [
  { name: "All Skills", icon: <Layers className="w-4 h-4" /> },
  { name: "Frontend", icon: <Code2 className="w-4 h-4 text-teal-500" /> },
  { name: "Backend", icon: <Server className="w-4 h-4 text-purple-500" /> },
  { name: "Database & Cloud", icon: <Database className="w-4 h-4 text-blue-500" /> },
  { name: "Tools & Styling", icon: <Wrench className="w-4 h-4 text-amber-500" /> },
];

const SkillsComponent = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All Skills");
  const [showAll, setShowAll] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredSkills = activeCategory === "All Skills" 
    ? allSkills 
    : allSkills.filter(s => s.category === activeCategory);

  const initialLimit = isMobile ? 4 : 3;
  const visibleSkills = showAll ? filteredSkills : filteredSkills.slice(0, initialLimit);

  return (
    <section id="skills" className="py-3 md:py-4 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-4">
          <Cpu className="w-3.5 h-3.5" /> Technical Skill Stack
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
          <LustreText text="Skills & Core Competencies" className="text-4xl md:text-6xl font-extrabold" />
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base md:text-lg">
          Hands-on full stack skills across frontend, backend, databases, payment gateways, and cloud deployment.
        </p>

        {/* Category Navigation Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === cat.name
                  ? "bg-foreground text-background shadow-md scale-105"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Skill Cards Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {visibleSkills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.35, delay: idx * 0.03, type: "spring", stiffness: 150 }}
              className="group p-5 rounded-2xl border border-border bg-card/90 backdrop-blur-md hover:border-teal-500/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {skill.icon ? (
                      <div className="p-2 rounded-xl bg-background border border-border group-hover:scale-110 transition-transform">
                        {skill.icon}
                      </div>
                    ) : (
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${skill.color}`} />
                    )}
                    <span className="font-bold text-foreground text-sm md:text-base group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-border bg-background text-muted-foreground flex-shrink-0">
                    {skill.level}
                  </span>
                </div>
              </div>

              {/* Progress Meter Bar */}
              <div className="mt-4">
                <div className="flex justify-between items-center text-xs text-muted-foreground mb-1.5 font-medium">
                  <span>Proficiency</span>
                  <span className="font-bold text-foreground">
                    <NumberCounter value={`${skill.percentage}%`} />
                  </span>
                </div>
                <div className="w-full bg-accent/60 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: idx * 0.05 }}
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* View All Skills Toggle Button */}
      {filteredSkills.length > initialLimit && (
        <div className="flex justify-center pt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-teal-500/40 bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 text-xs sm:text-sm font-bold transition-all cursor-pointer hover:scale-105 shadow-md"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{showAll ? "Show Top Skills" : `View All Skills & Core Competencies (${filteredSkills.length} Total)`}</span>
            {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      )}
    </section>
  );
};

export default SkillsComponent;