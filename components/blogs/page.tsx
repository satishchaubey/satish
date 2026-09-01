"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, BookOpen, Clock, ArrowRight, Bot, Code2, Server, Database, Globe } from "lucide-react";
import LustreText from "../ui/lustretext";
import Link from "next/link";
import { AnimatedButton } from "@/components/ui/animated-button";

interface Article {
    id: number;
    title: string;
    category: "AI & LLMs" | "Next.js & React" | "Backend & APIs" | "Cloud & Architecture";
    readTime: string;
    date: string;
    description: string;
    tags: string[];
    link?: string;
    featured?: boolean;
}

const articles: Article[] = [
    {
        id: 1,
        title: "Building AI SaaS Applications with Next.js 15 & LLM APIs",
        category: "AI & LLMs",
        readTime: "5 min read",
        date: "Aug 2026",
        description: "How to integrate OpenAI, Gemini, and Claude LLM APIs into Next.js 15 App Router for structured JSON outputs, streaming responses, and automated SaaS workflows.",
        tags: ["AI SaaS", "LLM APIs", "Next.js 15", "Structured JSON"],
        link: "https://nextjs.org/docs",
        featured: true
    },
    {
        id: 2,
        title: "Integrating LLMs for Automated Call Analysis in Node.js",
        category: "AI & LLMs",
        readTime: "6 min read",
        date: "Jul 2026",
        description: "Architectural patterns for connecting audio speech-to-text streams with LLMs to perform automated sentiment scoring, call summarization, and real-time dashboard analytics.",
        tags: ["LLMs", "Node.js", "Call Analytics", "Speech-to-Text"],
        featured: true
    },
    {
        id: 3,
        title: "Building Multi-Language RAG Chatbots in Production",
        category: "AI & LLMs",
        readTime: "7 min read",
        date: "Jun 2026",
        description: "Step-by-step guide to building retrieval-augmented generation (RAG) chatbots using vector databases, Next.js, and Node.js for automated customer support and document assistance.",
        tags: ["RAG", "Vector DB", "Chatbot", "TypeScript"]
    },
    {
        id: 4,
        title: "Prompt Engineering & Zod Validation for Enterprise Backends",
        category: "AI & LLMs",
        readTime: "4 min read",
        date: "May 2026",
        description: "Best practices for designing deterministic JSON schemas with OpenAI function calling and Zod validation when consuming LLM endpoints in mission-critical backends.",
        tags: ["Prompt Engineering", "Zod", "Function Calling"],
    },
    {
        id: 5,
        title: "Mastering Next.js 15 App Router & Server Actions",
        category: "Next.js & React",
        readTime: "6 min read",
        date: "Apr 2026",
        description: "Deep dive into Server Components, Parallel Routes, Server Actions, and dynamic caching strategies for ultra-fast full stack applications.",
        tags: ["Next.js 15", "React 19", "Server Actions"]
    },
    {
        id: 6,
        title: "High-Throughput REST APIs with Node.js & Redis Caching",
        category: "Backend & APIs",
        readTime: "5 min read",
        date: "Mar 2026",
        description: "Architecting high-traffic RESTful APIs with Node.js, Express, and Redis caching for low-latency microservices performance.",
        tags: ["Node.js", "Redis", "High Traffic", "REST API"]
    },
    {
        id: 7,
        title: "Real-Time WebSockets Architecture for Trading Platforms",
        category: "Backend & APIs",
        readTime: "6 min read",
        date: "Feb 2026",
        description: "Building real-time crypto and stock trading dashboards using Socket.io, React, and Framer Motion with smooth live ticker updates.",
        tags: ["WebSockets", "Socket.io", "Real-time", "React"]
    },
    {
        id: 8,
        title: "SQL vs MongoDB: Choosing Databases for Banking & Bill Payments",
        category: "Cloud & Architecture",
        readTime: "5 min read",
        date: "Jan 2026",
        description: "Comparing relational (PostgreSQL/MySQL) and non-relational (MongoDB) databases for high-volume payment processing and transaction audit logs.",
        tags: ["PostgreSQL", "MongoDB", "Database Architecture"]
    }
];

const categories = ["All Articles", "AI & LLMs", "Next.js & React", "Backend & APIs", "Cloud & Architecture"];

export default function Blogs() {
    const [activeCategory, setActiveCategory] = useState<string>("All Articles");

    const filteredArticles = activeCategory === "All Articles"
        ? articles
        : articles.filter(a => a.category === activeCategory);

    return (
        <section id="blogs" className="py-3 md:py-4 px-4 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-4">
                    <Bot className="w-3.5 h-3.5" /> AI & Full Stack Insights
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                    <LustreText text="Blogs & Technical Articles" className="text-4xl md:text-6xl font-extrabold" />
                </h2>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base md:text-lg">
                    In-depth technical guides, architecture breakdowns, and AI integration articles written for modern engineers.
                </p>

                {/* Category Navigation Tabs */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-2 md:gap-3">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                                activeCategory === category
                                    ? "bg-foreground text-background shadow-md scale-105"
                                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Articles Card Grid */}
            <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {filteredArticles.map((article, idx) => (
                        <motion.div
                            key={article.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.35, delay: idx * 0.04, type: "spring", stiffness: 140 }}
                            className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-border/80 via-border/30 to-border/10 hover:from-purple-500 hover:via-teal-500 hover:to-blue-500 transition-all duration-500 shadow-md flex flex-col justify-between"
                        >
                            <div className="relative flex flex-col h-full w-full rounded-[15px] bg-card/90 backdrop-blur-xl p-5 md:p-6 justify-between">
                                <div>
                                    {/* Top Metadata */}
                                    <div className="flex items-center justify-between gap-2 mb-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border ${
                                            article.category === "AI & LLMs" 
                                                ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30" 
                                                : "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30"
                                        }`}>
                                            {article.category}
                                        </span>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                                            <Clock className="w-3 h-3" />
                                            <span>{article.readTime}</span>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-base md:text-lg font-bold text-foreground mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>

                                    {/* Excerpt Description */}
                                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                                        {article.description}
                                    </p>
                                </div>

                                <div>
                                    {/* Tags */}
                                    <div className="mb-4 flex flex-wrap gap-1.5">
                                        {article.tags.map((tag, tagIdx) => (
                                            <span
                                                key={tagIdx}
                                                className="px-2 py-0.5 bg-accent/60 backdrop-blur-md rounded-full text-[10px] font-medium text-foreground border border-border/50"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Footer / Read Link */}
                                    <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
                                        <span>Read Full Guide</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
