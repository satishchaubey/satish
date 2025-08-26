"use client";

import React from "react";
import { motion } from "framer-motion";
import { AwsIcon, NextJsIcon, NodeJsIcon, ReactIcon, SqlIcon, ThreeJsIcon } from "../Icons";
import LustreText from "../ui/lustretext";

const skills = [
  { name: "Three.js", icon: <ThreeJsIcon />, color: "from-blue-500 to-purple-600", proficiency: "90%" },
  { name: "React", icon: <ReactIcon />, color: "from-cyan-500 to-blue-600", proficiency: "85%" },
  { name: "Next.js", icon: <NextJsIcon />, color: "from-gray-800 to-gray-900", proficiency: "80%" },
  { name: "Node.js", icon: <NodeJsIcon />, color: "from-green-500 to-green-700", proficiency: "75%" },
  { name: "SQL", icon: <SqlIcon />, color: "from-orange-500 to-red-600", proficiency: "70%" },
  { name: "AWS", icon: <AwsIcon />, color: "from-yellow-500 to-orange-600", proficiency: "65%" },
];

const SkillsComponent = () => {
  return (
    <>
      <div className=" ">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl opacity-10 animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-pulse-slow delay-1000" />
      </div>
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center relative"
      >
        <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-gray-400 via-gray-500 to-gray-500 bg-clip-text text-transparent leading-tight drop-shadow-lg">
         <LustreText text="Skills" />
        </h2>
        <p className="text-gray-300 mt-4 max-w-2xl mx-auto text-lg">
          Tools and technologies I excel at to build modern, high-performance applications.
        </p>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 p-6 relative z-10">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
            className="group relative flex flex-col items-center p-6 rounded-2xl 
                       backdrop-blur-lg bg-white/5 border border-gray-700/40 
                       hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden shadow-lg"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className={`p-4 rounded-2xl mb-5 bg-gradient-to-tr ${skill.color} shadow-lg`}
            >
              <div className="text-white text-4xl drop-shadow-lg">{skill.icon}</div>
            </motion.div>

            <h3 className="text-lg font-bold text-blue text-center group-hover:text-purple-300 transition">
              {skill.name}
            </h3>
            
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileHover={{ width: skill.proficiency }}
                transition={{ duration: 0.5 }}
                className={`h-full bg-gradient-to-r ${skill.color}`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Bars Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="space-y-8 p-8 mt-12 relative z-10"
      > 
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <span className={`w-3 h-3 rounded-full mr-3 bg-gradient-to-r ${skill.color}`}></span>
                <span className="font-medium text-gray-300">{skill.name}</span>
              </div>
              <span className="text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 rounded-full shadow-md">
                {skill.proficiency}
              </span>
            </div>

            {/* Progress bar with glow effect */}
            <div className="w-full bg-gray-800/40 rounded-full h-3.5 shadow-inner overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: skill.proficiency }}
                transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`h-full rounded-full bg-gradient-to-r ${skill.color} relative`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 animate-pulse"></div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default SkillsComponent;