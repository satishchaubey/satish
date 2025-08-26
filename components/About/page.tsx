"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, ChevronUp, Building, Code, Rocket, Zap, Sparkles, ExternalLink } from "lucide-react";
import { Gravity } from "@/components/ui/gravity";
import LustreText from "../ui/lustretext";
import { IconCloud } from "@/components/magicui/icon-cloud";
import { AnimatedButton } from "../ui/animated-button";



interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  technologies: string[];
  icon: React.ReactNode;
  accentColor: string;
  website?: string;
}

const WorkExperience = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const experiences: Experience[] = [
    {
      company: "plutos ONE",
      role: "Software Engineer",
      period: "Current",
      icon: <Rocket className="w-5 h-5" />,
      accentColor: "bg-background",
      website: "https://plutosone.com",
      technologies: ["React.js", "Next.js", "PayU", "Razorpay", "BBPS API", "AI SaaS"],
      description: [
        "Integrated PayU and Razorpay payment gateways for secure transactions",
        "Enabled seamless bill payments with Bharat Bill Payment System (BBPS) APIs",
        "Built scalable UI components for AI SaaS platform using React.js and Next.js",
        "Developed CBMS and VMS dashboards with campaign management features",
        "Led website development and maintenance, improving organizational efficiency"
      ]
    },
    {
      company: "Speqto Technology Pvt Ltd",
      role: "Front End Developer",
      period: "June 2023 - Jan 2024",
      icon: <Code className="w-5 h-5" />,
      accentColor: "bg-background",
      website: "https://speqto.com",
      technologies: ["React.js", "Vite", "Next.js", "REST APIs", "Blockchain", "Binance Smart Chain"],
      description: [
        "Built dynamic and responsive UIs using React.js, Vite, and Next.js",
        "Developed reusable components for improved performance and maintainability",
        "Integrated RESTful APIs for seamless backend communication",
        "Implemented decentralized features with Binance Smart Chain smart contracts"
      ]
    },
    {
      company: "Techpile Technology Pvt Ltd",
      role: "MERN Stack Intern",
      period: "June 2022 - April 2023",
      icon: <Zap className="w-5 h-5" />,
      accentColor: "bg-background",
      website: "https://techpile.com",
      technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Redux", "Bootstrap"],
      description: [
        "Contributed to full-stack web applications using MERN stack",
        "Built interactive user interfaces with React.js, Redux, and Bootstrap",
        "Gained experience in testing and deploying scalable applications",
        "Developed problem-solving skills in collaborative real-world projects"
      ]
    }
  ];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const slugs = [
    "typescript",
    "javascript",
    "dart",
    "java",
    "react",
    "flutter",
    "android",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "amazonaws",
    "postgresql",
    "firebase",
    "nginx",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "visualstudiocode",
    "androidstudio",
    "sonarqube",
    "figma",
  ];

  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
  );

  return (
    <section id="experience" ref={sectionRef} className="relative pt-35 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="flex justify-center  items-center">
        <IconCloud images={images} />
      </div>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mb-6 shadow-2xl"
          >
            <Building className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-gray-400 via-gray-500 to-gray-500 bg-clip-text text-transparent leading-tight drop-shadow-lg">
            <LustreText text=" Work Experience" />
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            My professional journey through innovative companies and exciting projects
          </p>
        </motion.div>

        {/* Experience Cards Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 relative"
        >
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              {/* Card with Gravity Effect */}
              <div className="relative flex flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-300 dark:border-gray-800 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md px-5 py-8 shadow-xl transition-colors group hover:scale-[1.02]">
                <Gravity number={15} />

                {/* Company Logo and Title */}
                <div className="relative z-10 flex items-center justify-between w-full mb-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`p-3 bg-gradient-to-r ${experience.accentColor} rounded-2xl text-white shadow-lg`}
                  >
                    {experience.icon}
                  </motion.div>
                  {experience.website && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full z-10"
                      onClick={() => window.open(experience.website, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Role and Company */}
                <CardTitle className="relative z-10 text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {experience.role}
                </CardTitle>
                <CardDescription className="relative z-10 text-lg font-semibold text-gray-700 dark:text-gray-300">
                  {experience.company}
                </CardDescription>

                {/* Period */}
                <div className="relative z-10 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <Calendar className="w-4 h-4" />
                  <span>{experience.period}</span>
                </div>

                <CardContent className="relative z-10 p-0 w-full mt-6">
                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-200 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-600"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Description Preview */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Key Achievements</h4>
                    <ul className="space-y-2">
                      {experience.description.slice(0, 2).map((item, descIndex) => (
                        <motion.li
                          key={descIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: descIndex * 0.1 }}
                          className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300"
                        >
                          <Sparkles className="w-3 h-3 text-yellow-400 flex-shrink-0 mt-1" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence mode="wait">
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mb-6"
                      >
                        <ul className="space-y-2">
                          {experience.description.slice(2).map((item, descIndex) => (
                            <motion.li
                              key={descIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: descIndex * 0.1 }}
                              className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300"
                            >
                              <Sparkles className="w-3 h-3 text-yellow-400 flex-shrink-0 mt-1" />
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Toggle Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative z-20">
                    <Button
                      onClick={() => toggleExpand(index)}
                      className={`w-full bg-gradient-to-r ${experience.accentColor} hover:shadow-2xl transition-all duration-300 text-white font-semibold py-3 rounded-xl text-sm`}
                      size="sm"
                    >
                      {expandedIndex === index ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-2" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-2" />
                          <div className=" font-extrabold bg-gradient-to-r from-gray-400 via-gray-500 to-gray-500 bg-clip-text text-transparent leading-tight drop-shadow-lg">
                            <LustreText text=" View More" />
                          </div>
                        </>
                      )}
                    </Button>
                  </motion.div>
                </CardContent>
              </div>
            </motion.div>
          ))}

        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="relative flex flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-300 dark:border-gray-800  dark:to-purple-900/20 px-5 py-8 shadow-xl">
            <Gravity number={10} className="absolute inset-0" />
            <div className="relative z-10 w-full">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Work Together?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Let's create something amazing. I'm always open to discussing new projects and opportunities.
              </p>
              <div className=" text-white font-semibold py-3 px-8 rounded-xl relative z-10 flex justify-center items-center">
                <AnimatedButton
                  className="bg-blue-400 text-white cursor-pointer"
                  variant="default"
                  size="default"
                  glow={true}
                  textEffect="normal"
                  uppercase={true}
                  rounded="custom"
                  asChild={false}
                  hideAnimations={false}
                  shimmerColor="#008080"
                  shimmerSize="0.15em"
                  shimmerDuration="3s"
                  borderRadius="100px"
                  background="rgba(0, 0, 0, 1)"
                >
                  {/* <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" /> */}
                  Contact Me
                </AnimatedButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default WorkExperience;