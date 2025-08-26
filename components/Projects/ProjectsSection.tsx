"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Github } from "lucide-react";

import { AnimatedButton } from "@/components/ui/animated-button";
import Link from "next/link";
import LustreText from "../ui/lustretext";

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    githubUrl: string;
    liveUrl: string;
    featured?: boolean;
}

const ProjectsSection = () => {
    const projects: Project[] = [
        {
            id: 1,
            title: "3D Portfolio Website",
            description: "A stunning 3D portfolio built with Three.js and React, featuring interactive 3D models and smooth animations.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
            technologies: ["Three.js", "React", "Tailwind CSS", "Framer Motion"],
            githubUrl: "https://github.com/yourusername/3d-portfolio",
            liveUrl: "https://yourportfolio.com",
            featured: true
        },
        {
            id: 2,
            title: "E-Commerce Platform",
            description: "Full-stack e-commerce solution with payment integration, user authentication, and admin dashboard.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
            technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
            githubUrl: "https://github.com/yourusername/ecommerce",
            liveUrl: "https://yourapp.com"
        },
        {
            id: 3,
            title: "Real-time Chat App",
            description: "WebSocket-based real-time messaging application with rooms, file sharing, and emoji reactions.",
            image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=500&h=300&fit=crop",
            technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
            githubUrl: "https://github.com/yourusername/chat-app",
            liveUrl: "https://chatapp.com"
        },
        {
            id: 4,
            title: "Task Management Dashboard",
            description: "Drag-and-drop task management system with real-time updates and team collaboration features.",
            image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
            technologies: ["React", "TypeScript", "Tailwind CSS", "WebSockets"],
            githubUrl: "https://github.com/yourusername/task-manager",
            liveUrl: "https://tasks.com"
        }
    ];

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
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut" as const,
            }
        }
    };

    return (
        <section id="projects" className="relative py-20 ">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-dot-gray-300 dark:bg-dot-gray-800" />

            <div className="relative z-10 max-w-7xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white  lg:text-6xl font-bold tracking-tight leading-tight">
                        <LustreText text="Featured Projects" />
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Here are some of my recent projects that showcase my skills in modern web development.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8"
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={itemVariants}
                            className="group"
                        >
                            <div className="relative w-full">
                                <div
                                    className="relative flex h-[500px] w-full flex-col items-start justify-end 
                  overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 
                  bg-white dark:bg-[#0a0a0a] 
                  px-6 py-8 shadow-2xl shadow-black/5 hover:shadow-xl transition-all duration-500 group-hover:scale-[1.02]"
                                >
                                    {/* Featured Badge */}
                                    {project.featured && (
                                        <div className="absolute top-4 right-4 z-50">
                                            <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                <Star className="w-3 h-3 fill-current" />
                                                Featured
                                            </div>
                                        </div>
                                    )}

                                    {/* Project Image */}
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            suppressHydrationWarning
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-50 w-full">
                                        {/* Technologies */}
                                        <div className="mb-4 flex flex-wrap gap-2">
                                            {project.technologies.map((tech, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-full text-xs text-white border border-white/20"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl font-bold text-white mb-3">
                                            {project.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-200 mb-6 leading-relaxed">
                                            {project.description}
                                        </p>

                                        {/* Buttons */}
                                        <div className="flex gap-3">
                                            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer " className="cursor-pointer hover:text-white">
                                                <AnimatedButton
                                                    className="bg-green-500 text-white cursor-pointer"
                                                    variant="default"
                                                    size="default"
                                                    glow={true}
                                                    textEffect="normal"
                                                    uppercase={true}
                                                    rounded="custom"
                                                    asChild={false}
                                                    hideAnimations={false}
                                                    shimmerColor="#39FF14"
                                                    shimmerSize="0.15em"
                                                    shimmerDuration="3s"
                                                    borderRadius="100px"
                                                    background="rgba(0, 0, 0, 1)"
                                                >

                                                    Live Demo

                                                </AnimatedButton>
                                            </Link>
                                            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer " className="cursor-pointer hover:text-white">
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
                                                    shimmerColor="#00FFFF"
                                                    shimmerSize="0.15em"
                                                    shimmerDuration="3s"
                                                    borderRadius="100px"
                                                    background="rgba(0, 0, 0, 1)"
                                                >

                                                    <Github className="w-4 h-4" />
                                                    Code
                                                </AnimatedButton>
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* View More Button */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-12 flex justify-center"
                >
                    <Link href="https://github.com/yourusername" className="cursor-pointer hover:text-white">
                        <AnimatedButton
                            className="bg-blue-400 text-white cursor-pointer w-full"
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
                            View More
                        </AnimatedButton>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsSection;