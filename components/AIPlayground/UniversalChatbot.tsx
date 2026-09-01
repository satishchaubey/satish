"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, User, Sparkles, RefreshCw, X, MessageSquare, ChevronDown, FileDown } from "lucide-react";

import { usePathname } from "next/navigation";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

// 30 Verified Q&A Knowledge Base
const qaDatabase: { id: number; keywords: string[]; question: string; answer: string }[] = [
  {
    id: 1,
    keywords: ["who", "satish", "about", "intro", "bio"],
    question: "Who is Satish Chaubey?",
    answer: "Satish Kumar Chaubey is a Full Stack Engineer with 3+ years of experience building high-throughput payment engines, BBPS microservices, SaaS dashboards, and AI integrations."
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
    answer: "Satish currently works as a Software Engineer at a FinTech & SaaS Enterprise (Feb 2024–Present), leading frontend SaaS engineering and payment engines."
  },
  {
    id: 4,
    keywords: ["skills", "tech stack", "technologies", "core skills"],
    question: "What are Satish's primary technical skills?",
    answer: "Satish specializes in React 19, Next.js 15, TypeScript, Node.js, Express.js, NestJS, MongoDB, PostgreSQL, Redis, PayU, Razorpay, BBPS APIs, Tailwind CSS, Docker, and AWS."
  },
  {
    id: 5,
    keywords: ["frontend", "framework", "ui", "react", "next"],
    question: "What frontend technologies does Satish use?",
    answer: "Satish uses React 19, Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, and Redux Toolkit."
  },
  {
    id: 6,
    keywords: ["backend", "node", "express", "server", "api"],
    question: "What backend technologies does Satish specialize in?",
    answer: "Satish specializes in Node.js, Express.js, NestJS, REST APIs, Redis microservices, and secure payment Webhooks."
  },
  {
    id: 7,
    keywords: ["bill payment", "transactions", "throughput"],
    question: "What is the High-Traffic Bill Payment Engine?",
    answer: "A high-traffic bill payment engine engineered by Satish with Redis caching and microservices architecture."
  },
  {
    id: 8,
    keywords: ["contact", "email", "phone", "reach", "hire"],
    question: "How can I contact Satish?",
    answer: "📧 Email: satishchaubey02@gmail.com\n📞 Phone: +91 8299805407\n📍 Location: Ghaziabad, UP, India"
  },
  {
    id: 9,
    keywords: ["project", "projects", "build"],
    question: "What production projects has Satish built?",
    answer: "Satish built 13+ production projects including High-Traffic Payment Engine, Digital Banking Platform, AI Call Monitoring, Multi-Country AI Pipeline, and Web3 Bound Finance."
  },
  {
    id: 10,
    keywords: ["degree", "education", "bca", "college"],
    question: "What degree does Satish hold?",
    answer: "Satish holds a Bachelor of Computer Applications (BCA) degree from ITM College of Management, Gorakhpur (2019-2021)."
  },
  {
    id: 11,
    keywords: ["resume", "cv", "download", "pdf", "bio pdf"],
    question: "How can I view or download Satish's Resume?",
    answer: "📄 You can download Satish Chaubey's latest CV / Resume directly:\n\n👉 Click to Download PDF: /Satish_Kumar_Chaubey.pdf\n\nOr visit the /resume page to view his online experience timeline!"
  }
];

const getAIResponse = (query: string): string => {
  const q = query.toLowerCase();

  const match = qaDatabase.find((item) =>
    item.keywords.some((key) => q.includes(key))
  );

  if (match) {
    return `📌 ${match.question}\n\n${match.answer}`;
  }

  return `🤖 Satish Chaubey is a Full Stack Engineer (3+ years exp) specializing in React 19, Next.js 15, Node.js, BBPS payment engines, and AI applications.\n\nYou can contact Satish at satishchaubey02@gmail.com or ask me about his skills, experience, and projects!`;
};

export default function UniversalChatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "👋 Hi! I am Satish's AI Assistant. How can I help you today?",
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isAiPlaygroundRoute = pathname === "/ai-playground";

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

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
    <AnimatePresence>
      {!isAiPlaygroundRoute && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Floating Action Container */}
          <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-2">
            
            {/* Download Resume Animated Ticker Pill */}
            {!isOpen && (
              <motion.a
                href="/Satish_Kumar_Chaubey.pdf"
                download="Satish_Kumar_Chaubey.pdf"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/95 backdrop-blur-md border border-teal-500/40 text-foreground text-[11px] sm:text-xs font-bold shadow-xl hover:border-teal-500 transition-all cursor-pointer group"
              >
                <FileDown className="w-3.5 h-3.5 text-teal-500 animate-bounce flex-shrink-0" />
                <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Download Resume (PDF)
                </span>
              </motion.a>
            )}

            {/* Floating Trigger Button */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-card/90 backdrop-blur-xl border border-teal-500/40 text-foreground shadow-2xl flex items-center gap-2 cursor-pointer hover:border-teal-500 transition-all group"
              aria-label="Toggle AI Assistant Chat"
            >
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-teal-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
              </div>

              <span className="font-bold text-xs text-foreground pr-0.5">
                {isOpen ? "Close AI" : "Satish AI"}
              </span>
            </motion.button>
          </div>

      {/* Floating Chat Drawer Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-16 right-3 sm:right-6 md:bottom-20 md:right-6 w-[90vw] max-w-[360px] h-[400px] sm:h-[460px] bg-card border border-border rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-3.5 border-b border-border bg-accent/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-foreground">Satish AI Assistant</h3>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Online & Ready</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMessages([messages[0]])}
                  title="Clear Chat"
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Window"
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div ref={messagesEndRef} className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-background/50">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 max-w-[88%] ${
                    msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 ${
                    msg.sender === "user" ? "bg-teal-500 text-white" : "bg-purple-600 text-white"
                  }`}>
                    {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div className={`p-2.5 sm:p-3 rounded-2xl text-[11px] sm:text-xs leading-normal whitespace-pre-line shadow-sm ${
                    msg.sender === "user"
                      ? "bg-teal-600 text-white rounded-tr-none"
                      : "bg-card border border-border text-foreground rounded-tl-none"
                  }`}>
                    {msg.text}
                    <div className={`text-[8px] mt-1 text-right ${msg.sender === "user" ? "text-teal-200" : "text-muted-foreground"}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex gap-2 items-center text-[11px] text-muted-foreground p-1">
                  <Bot className="w-3.5 h-3.5 text-purple-500 animate-spin" />
                  <span>AI Assistant is typing...</span>
                </div>
              )}
            </div>

            {/* Quick Questions Horizontal Scroll */}
            <div className="px-3 py-2 bg-accent/20 border-t border-border flex gap-1.5 overflow-x-auto [::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {qaDatabase.slice(0, 5).map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleSend(q.question)}
                  className="px-2.5 py-1 rounded-full text-[10px] font-semibold border border-border bg-card hover:border-teal-500 hover:text-teal-600 text-foreground transition-all cursor-pointer whitespace-nowrap flex-shrink-0 flex items-center gap-1 shadow-sm"
                >
                  <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                  <span>{q.question}</span>
                </button>
              ))}
            </div>

            {/* Footer Input */}
            <div className="p-2.5 border-t border-border bg-card flex items-center gap-1.5">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask AI about Satish..."
                className="flex-1 px-3 py-2 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:border-teal-500"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="p-2 rounded-xl bg-gradient-to-r from-teal-500 to-purple-600 text-white disabled:opacity-40 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
