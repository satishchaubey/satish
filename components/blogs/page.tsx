"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, BookOpen, Clock, ArrowRight, Bot, Code2, Server, Database, Globe, X, CheckCircle2 } from "lucide-react";
import LustreText from "../ui/lustretext";
import Link from "next/link";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Button } from "@/components/ui/button";

interface Article {
    id: number;
    title: string;
    category: "AI & LLMs" | "Next.js & React" | "Backend & APIs" | "Cloud & Architecture";
    readTime: string;
    date: string;
    description: string;
    tags: string[];
    content: string;
    link?: string;
    featured?: boolean;
}

const articles: Article[] = [
    {
        id: 9,
        title: "RAG vs CAG Architecture: Vector Search vs KV Prompt Caching in Production",
        category: "AI & LLMs",
        readTime: "8 min read",
        date: "Sep 2026",
        description: "Comprehensive architectural breakdown comparing Retrieval-Augmented Generation (RAG via Vector DBs) versus Cache-Augmented Generation (CAG via Gemini 2.0 / Claude 3.5 KV Prompt Caching) for sub-second enterprise AI context lookup.",
        tags: ["RAG", "CAG", "Prompt Caching", "Vector DB", "LLM Architecture"],
        featured: true,
        content: `
### 1. Introduction: RAG vs CAG
When building enterprise AI applications, developers face the challenge of providing LLMs with domain-specific knowledge without fine-tuning expensive model weights.

### 2. Retrieval-Augmented Generation (RAG)
RAG works by chunking documents, generating vector embeddings using models like OpenAI text-embedding-3 or Google Gecko, storing vectors in databases (Pinecone, PGVector, Qdrant), and performing Top-K similarity searches at query time.

**Pros**: Unlimited data scaling (millions of files), low storage costs.
**Cons**: Retrieval latency overhead, risk of chunking loss (missing surrounding context).

### 3. Cache-Augmented Generation (CAG)
CAG takes advantage of modern long-context LLMs (Gemini 2.0 Pro with 2M tokens, Claude 3.5 Sonnet with 200k tokens). The entire document corpus or code repository is pre-loaded directly into the model's context window with **KV (Key-Value) Prompt Caching** enabled at the API layer.

**Pros**: Zero retrieval loss, 100% full context awareness, sub-second TTFT (Time to First Token), 50%-90% API cost discount on cached tokens.
**Cons**: Context size bound by LLM context limit (1-2 Million tokens).

### 4. Architectural Choice Matrix
- **Use RAG** when dataset exceeds millions of documents or updates dynamically every minute across millions of users.
- **Use CAG** when repository/documentation is under 2M tokens (e.g. enterprise manuals, codebase, legal contract repositories).
- **Use Hybrid (RAG + CAG)** for multi-tenant large enterprise platforms.
        `
    },
    {
        id: 10,
        title: "Under the Hood: How Google V8 & Python CPython Execute Code Internally",
        category: "Cloud & Architecture",
        readTime: "9 min read",
        date: "Sep 2026",
        description: "Deep dive into JavaScript V8 Engine (Ignition Bytecode & TurboFan JIT) vs Python CPython (AST Parser, PVM Evaluation Stack, Ref Counting & GIL Lock) execution pipelines.",
        tags: ["V8 Engine", "CPython", "JIT Compiler", "Bytecode", "GIL Lock"],
        featured: true,
        content: `
### 1. The Need for Internal Understanding
Writing high-performance code requires knowing how runtime engines interpret, compile, and execute your functions under the hood.

### 2. Google V8 Engine (JavaScript)
V8 compiles JavaScript directly to native machine code using two primary engines:
- **Ignition (Interpreter)**: Rapidly parses AST into stack-based V8 Bytecode instructions for instant execution.
- **TurboFan (JIT Compiler)**: Monitors execution profiles ('Hot Functions'). When a function runs repeatedly with stable types, TurboFan compiles it into optimized Native Assembly Code.

### 3. CPython Engine (Python)
CPython compiles Python source code (.py) into 16-bit Bytecode (.pyc) opcodes, which are evaluated by the Python Virtual Machine (PVM):
- **PVM Evaluation Stack**: Stack-based evaluation loop executing instructions like \`LOAD_CONST\`, \`STORE_NAME\`, \`BINARY_ADD\`.
- **Reference Counting & GC**: Heap objects track \`ob_refcnt\`. Memory is freed instantly when count hits 0, backed by a 3-generation cyclic garbage collector.
- **GIL (Global Interpreter Lock)**: Mutual exclusion lock restricting bytecode execution to a single native thread at a time for PyObject safety.
        `
    },
    {
        id: 1,
        title: "Building AI SaaS Applications with Next.js 16 & LLM APIs",
        category: "AI & LLMs",
        readTime: "5 min read",
        date: "Aug 2026",
        description: "How to integrate OpenAI, Gemini, and Claude LLM APIs into Next.js 16 App Router for structured JSON outputs, streaming responses, and automated SaaS workflows.",
        tags: ["AI SaaS", "LLM APIs", "Next.js 16", "Structured JSON"],
        featured: true,
        content: `
### Next.js 16 App Router & AI Workflows
Integrating LLMs into Next.js 16 applications requires leveraging Server Actions and Server Components for secure API key management and zero-bundle-size SDK execution.

Key patterns include:
- **Streaming Responses**: Using Vercel AI SDK and ReadableStreams for instant UI response rendering.
- **Structured JSON Schema**: Enforcing Zod schema validation on model responses.
        `
    },
    {
        id: 2,
        title: "Integrating LLMs for Automated Call Analysis in Node.js",
        category: "AI & LLMs",
        readTime: "6 min read",
        date: "Jul 2026",
        description: "Architectural patterns for connecting audio speech-to-text streams with LLMs to perform automated sentiment scoring, call summarization, and real-time dashboard analytics.",
        tags: ["LLMs", "Node.js", "Call Analytics", "Speech-to-Text"],
        featured: true,
        content: `
### Real-Time Speech Processing Pipeline
Connecting telephony/WebRTC audio streams to Whisper STT and LLM sentiment engines requires asynchronous event streams and microservices queue processing using Redis and Node.js streams.
        `
    },
    {
        id: 3,
        title: "Building Multi-Language RAG Chatbots in Production",
        category: "AI & LLMs",
        readTime: "7 min read",
        date: "Jun 2026",
        description: "Step-by-step guide to building retrieval-augmented generation (RAG) chatbots using vector databases, Next.js, and Node.js for automated customer support and document assistance.",
        tags: ["RAG", "Vector DB", "Chatbot", "TypeScript"],
        content: "Detailed guide on vector embeddings, cosine distance thresholding, and multi-lingual prompt translation pipelines."
    },
    {
        id: 4,
        title: "Prompt Engineering & Zod Validation for Enterprise Backends",
        category: "AI & LLMs",
        readTime: "4 min read",
        date: "May 2026",
        description: "Best practices for designing deterministic JSON schemas with OpenAI function calling and Zod validation when consuming LLM endpoints in mission-critical backends.",
        tags: ["Prompt Engineering", "Zod", "Function Calling"],
        content: "How to enforce type safety when receiving non-deterministic AI generation outputs in production backends."
    },
    {
        id: 5,
        title: "Mastering Next.js 16 App Router & Server Actions",
        category: "Next.js & React",
        readTime: "6 min read",
        date: "Apr 2026",
        description: "Deep dive into Server Components, Parallel Routes, Server Actions, and dynamic caching strategies for ultra-fast full stack applications.",
        tags: ["Next.js 16", "React 19", "Server Actions"],
        content: "Optimizing Next.js 16 App Router caching, PPR (Partial Prerendering), and React 19 Server Actions."
    },
    {
        id: 6,
        title: "High-Throughput REST APIs with Node.js & Redis Caching",
        category: "Backend & APIs",
        readTime: "5 min read",
        date: "Mar 2026",
        description: "Architecting high-traffic RESTful APIs with Node.js, Express, and Redis caching for low-latency microservices performance.",
        tags: ["Node.js", "Redis", "High Traffic", "REST API"],
        content: "Leveraging Redis cache invalidation strategies, connection pooling, and Node.js cluster module for high-concurrency production REST APIs."
    },
    {
        id: 7,
        title: "Real-Time WebSockets Architecture for Trading Platforms",
        category: "Backend & APIs",
        readTime: "6 min read",
        date: "Feb 2026",
        description: "Building real-time crypto and stock trading dashboards using Socket.io, React, and Framer Motion with smooth live ticker updates.",
        tags: ["WebSockets", "Socket.io", "Real-time", "React"],
        content: "Handling binary WebSocket frames, state synchronization, and smooth UI animations for financial trading dashboards."
    }
];

const categories = ["All Articles", "AI & LLMs", "Next.js & React", "Backend & APIs", "Cloud & Architecture"];

export default function Blogs() {
    const [activeCategory, setActiveCategory] = useState<string>("All Articles");
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

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
                            onClick={() => setSelectedArticle(article)}
                            className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-border/80 via-border/30 to-border/10 hover:from-purple-500 hover:via-teal-500 hover:to-blue-500 transition-all duration-500 shadow-md flex flex-col justify-between cursor-pointer"
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
                                        <span>Read Full Article</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* FULL ARTICLE MODAL READER */}
            <AnimatePresence>
                {selectedArticle && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-2xl space-y-6"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedArticle(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-accent hover:bg-accent/80 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Modal Header */}
                            <div className="space-y-3 border-b border-border/50 pb-4">
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 uppercase">
                                        {selectedArticle.category}
                                    </span>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                                        <Clock className="w-3.5 h-3.5" /> {selectedArticle.readTime} • {selectedArticle.date}
                                    </span>
                                </div>

                                <h2 className="text-xl sm:text-3xl font-extrabold text-foreground leading-tight">
                                    {selectedArticle.title}
                                </h2>

                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {selectedArticle.tags.map((tag, tIdx) => (
                                        <span key={tIdx} className="px-2.5 py-0.5 rounded-full bg-accent text-[11px] font-semibold text-muted-foreground border border-border/50">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Article Body */}
                            <div className="text-xs sm:text-sm text-muted-foreground space-y-4 leading-relaxed font-sans whitespace-pre-line">
                                <p className="text-foreground font-semibold text-sm sm:text-base border-l-4 border-purple-500 pl-3 italic">
                                    {selectedArticle.description}
                                </p>

                                <div>{selectedArticle.content}</div>
                            </div>

                            {/* Modal Footer */}
                            <div className="pt-4 border-t border-border/50 flex justify-between items-center text-xs">
                                <span className="text-muted-foreground">Written by Satish Chaubey</span>
                                <Button
                                    onClick={() => setSelectedArticle(null)}
                                    size="sm"
                                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold cursor-pointer"
                                >
                                    Close Reader
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
