"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, ChevronUp, Rocket, Zap, Sparkles, ExternalLink, User, Code2, Terminal, ShieldCheck, HeartHandshake, ArrowRight, FileText } from "lucide-react";
import LustreText from "../ui/lustretext";
import { IconCloud } from "@/components/magicui/icon-cloud";
import { AnimatedButton } from "../ui/animated-button";
import Link from "next/link";

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  technologies: string[];
  icon: React.ReactNode;
  website?: string;
}

const WorkExperience = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const experiences: Experience[] = [
    {
      company: "Plutos One Pvt. Ltd.",
      role: "Software Engineer",
      period: "Feb 2024 - Present",
      icon: <Rocket className="w-5 h-5 text-teal-500" />,
      website: "https://plutosone.com",
      technologies: ["React 19", "Next.js 15", "TypeScript", "Node.js", "PayU", "Razorpay", "BBPS API", "Redis"],
      description: [
        "Led frontend engineering for SaaS, BBPS bill payment engines, and 30+ client campaigns.",
        "Integrated PayU and Razorpay payment gateways with secure transaction workflows.",
        "Built CBMS, EMS, and VMS operational dashboards handling voucher uploads and poll management.",
        "Engineered high-traffic CSC & SVC bill payment platform processing 20,000+ daily transactions."
      ]
    },
    {
      company: "Speqto Technology Pvt. Ltd.",
      role: "Front-End Developer",
      period: "Jun 2023 - Jan 2024",
      icon: <Code2 className="w-5 h-5 text-purple-500" />,
      website: "https://speqto.com",
      technologies: ["React.js", "Vite", "Next.js", "REST APIs", "Binance Smart Chain"],
      description: [
        "Developed dynamic user interfaces and reusable UI component libraries.",
        "Integrated decentralized Web3 wallet workflows and BSC smart contract features.",
        "Optimized cross-browser rendering speeds and mobile responsive behaviors."
      ]
    },
    {
      company: "Techpile Technology Pvt. Ltd.",
      role: "MERN Stack Intern",
      period: "Jun 2022 - May 2023",
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      website: "https://techpile.in",
      technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Redux", "Bootstrap"],
      description: [
        "Built end-to-end full-stack web applications using MongoDB, Express, React, and Node.js.",
        "Created interactive user interfaces with Redux Toolkit and REST API integrations."
      ]
    }
  ];

  const slugs = [
    "typescript", "javascript", "react", "nextdotjs", "html5", "css3", "tailwindcss",
    "redux", "bootstrap", "mui", "vite", "sass", "nodedotjs", "express", "nestjs",
    "python", "fastapi", "postgresql", "mongodb", "redis", "mysql", "amazonaws",
    "googlecloud", "docker", "nginx", "git", "github", "postman", "figma",
    "visualstudiocode", "npm", "pnpm", "vercel", "socketdotio", "swagger"
  ];

  const images = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`);

  const values = [
    { title: "Scalable Architecture", desc: "Designing robust systems capable of handling 20,000+ daily production transactions effortlessly.", icon: <Terminal className="w-5 h-5 text-teal-500" /> },
    { title: "Performance First", desc: "Optimizing bundle sizes, lazy loading, and caching with Redis to reduce page load speeds by 20%.", icon: <Zap className="w-5 h-5 text-amber-500" /> },
    { title: "Security & Payments", desc: "Integrating end-to-end encrypted payment workflows with PayU, Razorpay, and BBPS APIs.", icon: <ShieldCheck className="w-5 h-5 text-purple-500" /> },
  ];

  return (
    <div className="pt-20 md:pt-24 pb-12 px-4 max-w-6xl mx-auto space-y-16">
      
      {/* Top Bio & 3D Tech Sphere Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Bio Left Column */}
        <div className="lg:col-span-7 space-y-5 text-left order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
            <User className="w-4 h-4" /> About Satish Chaubey
          </div>

          <h1 className="text-lg sm:text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            <LustreText text="Passionate Full Stack Engineer" className="text-lg sm:text-3xl lg:text-5xl font-extrabold" />
          </h1>

          <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
            I am a **Full Stack Engineer** with **3+ years of experience** building high-throughput web applications using **Next.js 16** (App Router & React Compiler) and **React 19.x**, payment engines, SaaS dashboards, and AI integrations. Based in Uttar Pradesh, India, I specialize in crafting clean, resilient JavaScript/TypeScript applications across the full web stack.
          </p>

          <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
            Over the past 3 years, I have architected high-traffic bill payment systems processing over 20,000 transactions per day, integrated payment gateways (PayU, Razorpay, BBPS), and developed enterprise platforms like Central Bank of India’s Saarthi.
          </p>

          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:items-center pt-2 max-w-sm sm:max-w-none">
            <Link href="/resume" className="w-full sm:w-auto">
              <AnimatedButton
                className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold cursor-pointer text-xs sm:text-sm px-2.5 sm:px-5 py-2.5 flex items-center justify-center"
                variant="default"
                size="default"
                glow={true}
                rounded="custom"
                borderRadius="100px"
                background="rgba(13, 148, 136, 0.9)"
              >
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 flex-shrink-0" /> <span className="truncate">Resume</span>
              </AnimatedButton>
            </Link>

            <Link href="/contact" className="w-full sm:w-auto">
              <AnimatedButton
                className="w-full border border-border text-foreground hover:bg-accent font-semibold cursor-pointer text-xs sm:text-sm px-2.5 sm:px-5 py-2.5 flex items-center justify-center"
                variant="default"
                size="default"
                glow={false}
                rounded="custom"
                borderRadius="100px"
                background="transparent"
              >
                <span className="truncate">Contact</span> <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 flex-shrink-0" />
              </AnimatedButton>
            </Link>
          </div>
        </div>

        {/* 3D Tech Sphere Right Column */}
        <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
          <div className="relative w-full max-w-[360px] flex justify-center items-center p-0 bg-transparent overflow-visible">
            <IconCloud images={images} />
          </div>
        </div>
      </div>

      {/* Core Engineering Values */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-teal-500 uppercase tracking-wider">Engineering Philosophy</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
            Core Principles & Standards
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, idx) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 rounded-2xl border border-border bg-card hover:border-teal-500/40 transition-all duration-300 space-y-2 shadow-sm"
            >
              <div className="p-2.5 rounded-xl bg-background border border-border w-fit">
                {v.icon}
              </div>
              <h3 className="text-base font-bold text-foreground">{v.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Professional Career Timeline */}
      <div className="space-y-6 pt-4">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-teal-500 uppercase tracking-wider">Career History</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
            Professional Experience
          </h2>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-border/80 via-border/30 to-border/10 hover:from-teal-500 hover:via-blue-500 transition-all duration-300 shadow-md"
            >
              <div className="rounded-[15px] bg-card p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-background border border-border">
                      {exp.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-semibold text-teal-600 dark:text-teal-400">{exp.company}</p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-accent/50 text-xs font-semibold text-muted-foreground w-fit">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <ul className="space-y-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-accent text-foreground border border-border/60">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default WorkExperience;