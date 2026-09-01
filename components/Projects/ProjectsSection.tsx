"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Github, ExternalLink, Sparkles, Code2, ArrowUpRight, Layers, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import Link from "next/link";
import LustreText from "../ui/lustretext";

interface Project {
    id: number;
    title: string;
    category: "Full Stack" | "Frontend" | "Real-time & Web3" | "SaaS";
    description: string;
    image: string;
    technologies: string[];
    githubUrl: string;
    liveUrl: string;
    featured?: boolean;
}

const ProjectsSection = () => {
    const [activeFilter, setActiveFilter] = useState<string>("All");

    const projects: Project[] = [
        {
            id: 0,
            title: "SheetSync — Interactive Lead & Bulk Mailer Suite",
            category: "Full Stack",
            description: "Production email outreach and lead automation suite. Features batch raw email parsing, Fresh Outreach vs Follow-Up modes, Gmail drafts sync, PDF resume attachments, and SMTP delivery logs.",
            image: "/sheetsync-mailer.jpg",
            technologies: ["React 19", "Next.js 15", "SMTP / Nodemailer", "Gmail API", "PDF Engine", "Tailwind CSS"],
            githubUrl: "https://github.com/satishchaubey",
            liveUrl: "https://github.com/satishchaubey",
            featured: true
        },
        {
            id: 1,
            title: "Enterprise BBPS Payment SaaS Platform",
            category: "SaaS",
            description: "High-scale AI SaaS and BBPS bill payments engine integrated with PayU & Razorpay payment gateways, analytics, and client campaign dashboards.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
            technologies: ["Next.js 15", "React.js", "BBPS API", "PayU / Razorpay", "Tailwind CSS"],
            githubUrl: "https://github.com/satishchaubey",
            liveUrl: "https://github.com/satishchaubey",
            featured: true
        },
        {
            id: 2,
            title: "Omni-Channel Enterprise Digital Banking Platform",
            category: "SaaS",
            description: "Production enterprise digital banking portal and transaction management suite built with Next.js & React, prioritizing secure data handling and intuitive banking user journeys.",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
            technologies: ["Next.js 15", "React 19", "Redux Toolkit", "TypeScript", "REST API"],
            githubUrl: "https://github.com/satishchaubey",
            liveUrl: "https://github.com/satishchaubey",
            featured: true
        },
        {
            id: 3,
            title: "High-Traffic Microservices Bill Payment Engine",
            category: "SaaS",
            description: "High-throughput bill payment engine engineered to process 20,000+ daily transactions with Redis caching and microservices architecture.",
            image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=500&fit=crop",
            technologies: ["Next.js", "Node.js", "Express.js", "MongoDB", "Redis Caching"],
            githubUrl: "https://github.com/satishchaubey",
            liveUrl: "https://github.com/satishchaubey",
            featured: true
        },
        {
            id: 4,
            title: "AI Call Monitoring & Sentiment Analytics",
            category: "SaaS",
            description: "Automated call monitoring platform powered by LLM-based call analysis APIs, audio sentiment scoring, and real-time operational dashboards.",
            image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=500&fit=crop",
            technologies: ["Next.js", "Node.js", "LLM APIs", "WebSockets", "ShadCN UI"],
            githubUrl: "https://github.com/satishchaubey",
            liveUrl: "https://github.com/satishchaubey",
            featured: true
        },
        {
            id: 5,
            title: "Multi-Country AI Assistance & Document Pipeline",
            category: "Real-time & Web3",
            description: "Multinational assistance chatbot handling complex queries, automated documentation pre-verification, and real-time customer support routing.",
            image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=500&fit=crop",
            technologies: ["React.js", "LLM APIs", "Node.js", "FastAPI", "Vector Search"],
            githubUrl: "https://github.com/satishchaubey",
            liveUrl: "https://github.com/satishchaubey"
        },
        {
            id: 6,
            title: "Bound Finance Crypto Trading Platform",
            category: "Real-time & Web3",
            description: "Web3 crypto platform with real-time WebSocket ticker updates, wallet integration (MetaMask & Wagmi), dynamic trading charts, and responsive dashboards.",
            image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&h=500&fit=crop",
            technologies: ["Next.js", "TypeScript", "Web3.js", "Wagmi", "Framer Motion"],
            githubUrl: "https://github.com/satishchaubey",
            liveUrl: "https://satishchaubey.vercel.app/"
        },
        {
            id: 7,
            title: "Udenz Healthcare Appointment Portal",
            category: "Full Stack",
            description: "Comprehensive patient-doctor scheduling system with electronic prescription records, real-time booking, and secure NestJS backend.",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
            technologies: ["React.js", "NestJS", "PostgreSQL", "Tailwind CSS", "REST API"],
            githubUrl: "https://github.com/satishchaubey",
            liveUrl: "https://satishchaubey.vercel.app/"
        },
        {
            id: 8,
            title: "Real-Time Trading Solutions Dashboard",
            category: "Real-time & Web3",
            description: "Scalable trading metrics and portfolio manager with real-time updates, MongoDB persistence, and customized analytics widgets.",
            image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop",
            technologies: ["Next.js", "Node.js", "MongoDB", "Redux Toolkit", "ShadCN UI"],
            githubUrl: "https://github.com/satishchaubey",
            liveUrl: "https://satishchaubey.vercel.app/"
        },
        {
            id: 9,
            title: "Full Stack MERN E-Commerce Platform",
            category: "Full Stack",
            description: "Feature-rich e-commerce store with JWT authentication, cart management, Stripe checkout integration, and full admin management.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
            technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Redux"],
            githubUrl: "https://github.com/satishchaubey",
            liveUrl: "https://satishchaubey.vercel.app/"
        },
        {
            id: 10,
            title: "Enterprise Operational & Campaign Dashboards",
            category: "SaaS",
            description: "Operational dashboards supporting voucher management, election poll uploads, client campaign assignments, and analytical reporting.",
            image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=500&fit=crop",
            technologies: ["Next.js", "React.js", "Tailwind CSS", "ShadCN", "REST APIs"],
            githubUrl: "https://github.com/satishchaubey",
            liveUrl: "https://github.com/satishchaubey"
        },
        {
            id: 11,
            title: "Bound Finance Ethereum Exchange",
            category: "Real-time & Web3",
            description: "Crypto platform enabling users to buy and sell Ethereum securely with real-time price updates and Web3.js transaction flows.",
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
            technologies: ["React.js", "Wagmi", "Web3.js", "MetaMask", "Ethereum"],
            githubUrl: "https://github.com/satishchaubey",
            liveUrl: "https://github.com/satishchaubey"
        },
        {
            id: 12,
            title: "Enterprise Vouchers & Rewards Platform",
            category: "SaaS",
            description: "Production website and voucher redemption engine with performance optimization and dynamic campaign routing.",
            image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=500&fit=crop",
            technologies: ["Next.js 15", "React 19", "Tailwind CSS", "TypeScript"],
            githubUrl: "https://github.com/satishchaubey",
            liveUrl: "https://github.com/satishchaubey"
        },
        {
            id: 13,
            title: "Bound Finance Landing Page",
            category: "Real-time & Web3",
            description: "Pixel-perfect, high-converting landing page highlighting Web3 crypto features, security protocols, and platform architecture.",
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=500&fit=crop",
            technologies: ["React.js", "Tailwind CSS", "SEO", "Framer Motion"],
            githubUrl: "https://github.com/satishchaubey",
            liveUrl: "https://github.com/satishchaubey"
        }
    ];

    const [showAll, setShowAll] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const categories = ["All", "SaaS", "Real-time & Web3", "Full Stack"];

    const filteredProjects = activeFilter === "All" 
        ? projects 
        : projects.filter(p => p.category === activeFilter);

    const initialLimit = isMobile ? 4 : 3;
    const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, initialLimit);

    return (
        <section id="projects" className="relative py-3 md:py-4 px-4 overflow-hidden">
            {/* Background Decorative Blur Orbs */}
            <div className="absolute top-1/3 -left-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto">
                
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-4">
                        <Sparkles className="w-3.5 h-3.5" /> Portfolio Highlights
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                        <LustreText text="Featured Projects" className="text-4xl md:text-6xl font-extrabold" />
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore some of my production-grade web applications, SaaS platforms, and full stack solutions.
                    </p>

                    {/* Filter Category Tabs in a Single Horizontal Row */}
                    <div className="mt-6 sm:mt-8 flex flex-nowrap items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto [::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-w-full px-1 py-1">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveFilter(category)}
                                className={`relative px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer flex-shrink-0 whitespace-nowrap ${
                                    activeFilter === category
                                        ? "text-white"
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                }`}
                            >
                                {activeFilter === category && (
                                    <motion.div
                                        layoutId="activeProjectTab"
                                        className="absolute inset-0 bg-gradient-to-r from-teal-500 via-blue-600 to-purple-600 rounded-full z-0 shadow-lg"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{category}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Projects Grid: 2 Cards Side-by-Side on Mobile */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                    <AnimatePresence>
                        {visibleProjects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 15 }}
                                transition={{ duration: 0.3, delay: idx * 0.03 }}
                                className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-border/80 via-border/30 to-border/10 hover:from-teal-500 hover:via-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg transform-gpu"
                            >
                                <div className="relative flex flex-col h-full w-full rounded-[15px] bg-card overflow-hidden p-2.5 sm:p-5">
                                    
                                    {/* Project Image Container */}
                                    <div className="relative w-full h-28 sm:h-44 md:h-48 rounded-xl overflow-hidden border border-border/40 mb-2.5 sm:mb-4 bg-neutral-950">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=500&fit=crop";
                                            }}
                                            suppressHydrationWarning
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                        {/* Top Badges */}
                                        <div className="absolute top-2 left-2 right-2 sm:top-3 sm:left-3 sm:right-3 flex items-center justify-between z-10">
                                            <span className="px-2 py-0.5 bg-black/60 rounded-full text-[9px] sm:text-[10px] font-semibold text-teal-300 border border-teal-500/30 truncate max-w-[70%]">
                                                {project.category}
                                            </span>
                                            {project.featured && (
                                                <div className="flex items-center gap-0.5 sm:gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-1.5 sm:px-2.5 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold shadow-sm">
                                                    <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
                                                    <span className="hidden sm:inline">Featured</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Tech Pills */}
                                    <div className="mb-2 flex flex-wrap gap-1">
                                        {project.technologies.slice(0, 3).map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-1.5 sm:px-2 py-0.5 bg-accent/80 rounded-full text-[9px] sm:text-[10px] font-medium text-foreground border border-border/50 truncate"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xs sm:text-base md:text-lg font-bold text-foreground mb-1.5 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-1">
                                        {project.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2 flex-grow">
                                        {project.description}
                                    </p>

                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* View All Toggle Button */}
                {filteredProjects.length > initialLimit && (
                    <div className="flex justify-center pt-8">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-teal-500/40 bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400 text-xs sm:text-sm font-bold transition-all cursor-pointer hover:scale-105 shadow-md"
                        >
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            <span>{showAll ? "Show Top Projects" : `View All Projects (${filteredProjects.length} Total)`}</span>
                            {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                    </div>
                )}

                {/* View GitHub Repository CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-center mt-16 flex justify-center"
                >
                    <Link 
                        href="https://github.com/satishchaubey" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="cursor-pointer max-w-[92vw] sm:max-w-none"
                    >
                        <AnimatedButton
                            className="bg-gradient-to-r from-teal-500 via-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-purple-500/25 cursor-pointer px-4 sm:px-8 py-2.5 text-xs sm:text-sm flex items-center justify-center"
                            variant="default"
                            size="default"
                            glow={true}
                            textEffect="normal"
                            rounded="custom"
                            borderRadius="100px"
                            background="rgba(15, 23, 42, 0.9)"
                        >
                            <Github className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="truncate">Explore Repositories on GitHub</span>
                        </AnimatedButton>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsSection;