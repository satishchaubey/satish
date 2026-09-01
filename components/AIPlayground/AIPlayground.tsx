"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Send, User, Sparkles, RefreshCw, HelpCircle, CheckCircle2 } from "lucide-react";
import LustreText from "../ui/lustretext";
import ArchitectureSection from "../Architecture/ArchitectureSection";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

// 30 Detailed Questions & Answers Knowledge Base
const qaDatabase: { id: number; keywords: string[]; question: string; answer: string }[] = [
  {
    id: 1,
    keywords: ["who", "satish", "about", "intro", "bio"],
    question: "Who is Satish Chaubey?",
    answer: "Satish Kumar Chaubey is a Full Stack Engineer with 3+ years of experience building high-throughput payment engines, BBPS microservices, SaaS dashboards, and AI integrations based in Ghaziabad, UP, India."
  },
  {
    id: 2,
    keywords: ["experience", "years", "total exp", "how long"],
    question: "How many years of experience does Satish have?",
    answer: "Satish has 3+ years of production full stack development experience across FinTech SaaS enterprises and technology companies."
  },
  {
    id: 3,
    keywords: ["current", "role", "company", "present", "enterprise"],
    question: "What is Satish's current role and company?",
    answer: "Satish currently works as a Software Engineer at a FinTech & SaaS Enterprise (Feb 2024–Present), leading frontend SaaS engineering, payment gateway integrations, and BBPS bill payment engines."
  },
  {
    id: 4,
    keywords: ["skills", "tech stack", "technologies", "core skills"],
    question: "What are Satish's primary technical skills?",
    answer: "Satish specializes in React 19.x, Next.js 16 (App Router & React Compiler), TypeScript, Node.js, Express.js, NestJS, MongoDB, PostgreSQL, Redis, PayU, Razorpay, BBPS APIs, Tailwind CSS, Docker, and AWS."
  },
  {
    id: 5,
    keywords: ["frontend", "framework", "ui", "react", "next"],
    question: "What frontend technologies does Satish use?",
    answer: "Satish uses React 19.x, Next.js 16 (App Router & React Compiler), TypeScript, Tailwind CSS v4, Framer Motion, Redux Toolkit, and Vite for modern, high-performance web UIs."
  },
  {
    id: 6,
    keywords: ["backend", "node", "express", "server", "api"],
    question: "What backend technologies does Satish specialize in?",
    answer: "Satish specializes in Node.js, Express.js, NestJS, RESTful APIs, GraphQL, Redis microservices, and secure payment Webhooks."
  },
  {
    id: 7,
    keywords: ["database", "postgres", "mongo", "sql", "redis"],
    question: "What databases does Satish work with?",
    answer: "Satish works with PostgreSQL, MongoDB, and Redis caching for ultra-low latency query speeds and high concurrency."
  },
  {
    id: 8,
    keywords: ["payment", "payu", "razorpay", "gateway", "bbps"],
    question: "What payment gateways has Satish integrated?",
    answer: "Satish has integrated PayU, Razorpay, and Bharat Bill Payment System (BBPS) APIs for seamless bill payment and checkout flows."
  },
  {
    id: 9,
    keywords: ["bill payment", "transactions", "throughput"],
    question: "What is the High-Traffic Bill Payment Engine?",
    answer: "It is a high-traffic bill payment engine engineered by Satish that processes over 20,000+ daily transactions using Redis microservice caching."
  },
  {
    id: 10,
    keywords: ["daily", "volume", "transactions count", "20k", "20000"],
    question: "How many daily transactions does Satish's payment engine process?",
    answer: "His high-throughput payment engine processes 20,000+ live daily transactions smoothly."
  },
  {
    id: 11,
    keywords: ["banking", "digital banking", "enterprise banking"],
    question: "What is the Enterprise Digital Banking Platform?",
    answer: "An omni-channel production banking platform developed to streamline digital transaction management and secure user banking journeys."
  },
  {
    id: 12,
    keywords: ["ai call", "sentiment", "speech", "call monitoring"],
    question: "What is the AI Call Monitoring project?",
    answer: "An LLM-driven audio analysis system built by Satish that analyzes sales & support calls for sentiment scoring, agent compliance, and insights."
  },
  {
    id: 13,
    keywords: ["document ai", "chatbot", "multi country", "ai chatbot"],
    question: "What is the Multi-Country AI Assistance Chatbot?",
    answer: "An AI-powered conversational chatbot that assists users with multi-country guidelines, application steps, and document verification."
  },
  {
    id: 14,
    keywords: ["bound finance", "web3", "crypto", "exchange", "ethereum"],
    question: "What is Bound Finance Web3 Exchange?",
    answer: "A decentralized crypto trading platform built on Ethereum and Binance Smart Chain with Web3 wallet integration."
  },
  {
    id: 15,
    keywords: ["operational", "campaign", "dashboard", "enterprise"],
    question: "What are the Enterprise Operational & Campaign Dashboards?",
    answer: "Enterprise SaaS operational dashboards built by Satish supporting voucher management, campaign scheduling, analytics, and client management."
  },
  {
    id: 16,
    keywords: ["location", "city", "where", "address", "ghaziabad"],
    question: "Where is Satish located?",
    answer: "Satish is located in Ghaziabad, Uttar Pradesh, India, and is open to hybrid, remote, or relocation opportunities."
  },
  {
    id: 17,
    keywords: ["email", "mail", "gmail", "contact email"],
    question: "How can I contact Satish Chaubey via email?",
    answer: "You can email Satish directly at satishchaubey02@gmail.com."
  },
  {
    id: 18,
    keywords: ["phone", "mobile", "number", "call"],
    question: "What is Satish's phone number?",
    answer: "Satish can be reached by phone or WhatsApp at +91 8299805407."
  },
  {
    id: 19,
    keywords: ["linkedin", "social", "profile link"],
    question: "What is Satish's LinkedIn profile?",
    answer: "Satish's LinkedIn profile is linkedin.com/in/satish-chaubey."
  },
  {
    id: 20,
    keywords: ["github", "code repo", "projects github"],
    question: "What is Satish's GitHub profile?",
    answer: "Satish's GitHub profile is github.com/satishchaubey."
  },
  {
    id: 21,
    keywords: ["degree", "education", "bca", "graduation"],
    question: "What degree does Satish hold?",
    answer: "Satish holds a Bachelor of Computer Applications (BCA) degree."
  },
  {
    id: 22,
    keywords: ["college", "university", "itm", "gorakhpur"],
    question: "Where did Satish complete his BCA?",
    answer: "He completed his BCA at ITM College of Management, Gorakhpur (2019-2021)."
  },
  {
    id: 23,
    keywords: ["certification", "certificate", "mern cert"],
    question: "What certifications does Satish hold?",
    answer: "Satish holds a Full Stack MERN Developer Certification from Techpile Technology Pvt. Ltd."
  },
  {
    id: 24,
    keywords: ["speqto", "speqto role", "frontend speqto"],
    question: "What was Satish's role at Speqto Technology?",
    answer: "At Speqto Technology (Jun 2023–Jan 2024), Satish served as a Front-End Developer building React/Vite UIs and Web3 wallet connections."
  },
  {
    id: 25,
    keywords: ["techpile", "intern", "mern intern"],
    question: "What was Satish's role at Techpile Technology?",
    answer: "At Techpile Technology (Jun 2022–May 2023), Satish worked as a MERN Stack Intern building full-stack web applications."
  },
  {
    id: 26,
    keywords: ["docker", "cloud", "aws", "gcp", "devops"],
    question: "Does Satish have experience with Docker & Cloud?",
    answer: "Yes, Satish uses Docker for containerization and deploys applications on AWS and GCP cloud infrastructure."
  },
  {
    id: 27,
    keywords: ["performance", "speed", "optimization", "fast"],
    question: "How does Satish optimize application performance?",
    answer: "By utilizing Next.js Server Components, Redis data caching, code-splitting, lazy loading, and bundle size reduction (reducing page loads by ~20%)."
  },
  {
    id: 28,
    keywords: ["state", "redux", "zustand", "context"],
    question: "What state management tools does Satish use?",
    answer: "Satish uses Redux Toolkit, Zustand, and React Context API for global state management."
  },
  {
    id: 29,
    keywords: ["hire", "open", "job", "full time", "career"],
    question: "Is Satish open for full-time Full Stack Developer roles?",
    answer: "Yes! Satish is actively open to Full Stack Software Engineer roles and high-impact technical opportunities."
  },
  {
    id: 30,
    keywords: ["standout", "why hire", "unique", "special"],
    question: "What makes Satish Chaubey stand out as a Full Stack Engineer?",
    answer: "Satish combines deep frontend mastery (React 19, Next.js 15) with proven high-throughput backend architecture (20k+ daily txns, BBPS, PayU/Razorpay) and AI integration experience."
  },
  {
    id: 31,
    keywords: ["resume", "cv", "download", "pdf", "bio pdf"],
    question: "How can I view or download Satish's Resume?",
    answer: "📄 You can view and download Satish Chaubey's latest CV / Resume directly:\n\n👉 Click to Download PDF: /Satish_Kumar_Chaubey.pdf\n\nOr visit the /resume route to view his interactive experience timeline!"
  }
];

const getAIResponse = (query: string): string => {
  const q = query.toLowerCase();

  // Find exact or best matching question
  const match = qaDatabase.find((item) =>
    item.keywords.some((key) => q.includes(key))
  );

  if (match) {
    return `📌 ${match.question}\n\n${match.answer}`;
  }

  return `🤖 Satish Chaubey is a Full Stack Engineer (3+ years exp) specializing in React 19, Next.js 15, Node.js, BBPS payment engines, and AI applications.\n\nYou can select any of the 30 questions below or ask me about his skills, experience, projects, or contact info!`;
};

const AIPlayground = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "👋 Hi! I am Satish's AI Assistant. You can pick any of the 30 curated questions below or type your query!",
      timestamp: "Just now",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollInnerChatOnly = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollInnerChatOnly();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiReply = getAIResponse(query);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-0 px-4 max-w-4xl mx-auto space-y-3">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
          <Bot className="w-4 h-4" /> AI Playground — 30 Questions Knowledge Base
        </div>
        <h1 className="text-lg sm:text-3xl md:text-5xl font-extrabold tracking-tight">
          <LustreText text="Chat with Satish AI" className="text-lg sm:text-3xl md:text-5xl font-extrabold" />
        </h1>
        <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground max-w-xl mx-auto">
          Explore 30 verified questions and answers about Satish Chaubey's 3+ years experience, 13 production projects, and core tech stack.
        </p>
      </div>

      {/* Main Chatbot Interface Container */}
      <div className="rounded-3xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col h-[450px] sm:h-[520px] md:h-[560px] max-w-3xl mx-auto">
        
        {/* Chatbot Header */}
        <div className="p-3 sm:p-4 border-b border-border bg-accent/40 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-teal-500 to-purple-600 flex items-center justify-center text-white shadow-md flex-shrink-0 aspect-square">
              <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xs sm:text-sm font-bold text-foreground leading-tight truncate sm:whitespace-normal">
                Satish AI Knowledge Base (30 Q&As)
              </h3>
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-emerald-500 font-semibold mt-0.5">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                <span className="truncate">30 Verified Answers Loaded</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setMessages([messages[0]])}
            className="p-2 rounded-xl border border-border bg-background hover:bg-accent text-muted-foreground hover:text-foreground text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap flex-shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="hidden sm:inline">Clear Chat</span>
            <span className="sm:hidden">Clear</span>
          </button>
        </div>

        {/* Messages Body */}
        <div ref={messagesContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-background/50">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 max-w-[85%] ${
                msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                msg.sender === "user" 
                  ? "bg-teal-500 text-white" 
                  : "bg-purple-600 text-white"
              }`}>
                {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`p-2.5 sm:p-3.5 rounded-2xl text-xs sm:text-sm leading-normal sm:leading-relaxed whitespace-pre-line shadow-sm ${
                msg.sender === "user"
                  ? "bg-teal-600 text-white rounded-tr-none"
                  : "bg-card border border-border text-foreground rounded-tl-none"
              }`}>
                {msg.text}
                <div className={`text-[9px] mt-1 text-right ${msg.sender === "user" ? "text-teal-200" : "text-muted-foreground"}`}>
                  {msg.timestamp}
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 items-center text-xs text-muted-foreground p-2">
              <Bot className="w-4 h-4 text-purple-500 animate-spin" />
              <span>Searching Knowledge Base...</span>
            </motion.div>
          )}
        </div>

        {/* 30 Questions Scrollable Pills */}
        <div className="px-3 py-2.5 bg-accent/20 border-t border-border flex gap-2 overflow-x-auto [::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {qaDatabase.map((q) => (
            <button
              key={q.id}
              onClick={() => handleSend(q.question)}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold border border-border bg-card hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 text-foreground transition-all cursor-pointer whitespace-nowrap flex-shrink-0 flex items-center gap-1 shadow-sm"
            >
              <Sparkles className="w-3 h-3 text-amber-500 flex-shrink-0" />
              <span>{q.id}. {q.question}</span>
            </button>
          ))}
        </div>

        {/* Input Footer */}
        <div className="p-3 border-t border-border bg-card flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type any question or click one of the 30 questions above..."
            className="flex-1 px-4 py-2.5 rounded-2xl bg-background border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:border-teal-500 transition-colors"
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="p-2.5 rounded-2xl bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white disabled:opacity-40 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Architecture & AI Engineering Mermaid Showcase Section */}
      <ArchitectureSection />
    </div>
  );
};

export default AIPlayground;
