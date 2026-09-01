"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Layers, Copy, Check, Code2, Workflow, PlayCircle, Server, Database, Zap, ShieldCheck } from "lucide-react";
import LustreText from "../ui/lustretext";

interface ArchitectureProject {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  repo: string;
  badge: string;
  description: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  mermaidCode: string;
  videoUrl?: string;
  subTabs?: { id: string; label: string; project: ArchitectureProject }[];
}

// 1. Gemini Live API Data
const geminiLiveProject: ArchitectureProject = {
  id: "gemini-live",
  title: "Gemini Live API Real-Time Engine",
  shortTitle: "Gemini Live API",
  subtitle: "Low-Latency Bi-Directional Voice, Video & Audio Streaming System",
  repo: "github.com/satishchaubey/gemini-live-api",
  badge: "Real-Time AI & WebSockets",
  description:
    "Architected low-latency streaming pipeline enabling continuous bi-directional voice, video, and text interaction with Google Gemini Live API. Features real-time PCM 16kHz audio stream processing, dynamic interruption handling (barge-in), function calling, and live 24kHz audio synthesis.",
  techStack: ["Gemini 2.0 Live API", "WebSockets", "Python GenAI SDK", "PCM Audio Stream", "Function Calling"],
  metrics: [
    { label: "Stream Latency", value: "< 250ms" },
    { label: "Audio Fidelity", value: "24kHz PCM" },
    { label: "Supported Languages", value: "70+" },
    { label: "Concurrency", value: "Bi-directional" },
  ],
  mermaidCode: `graph TD
    subgraph ClientLayer["1. Multimodal Client Input Layer"]
        A1["🎤 Live Audio (PCM 16kHz)"]
        A2["📹 Live Video / Camera Frames"]
        A3["💬 Text Prompts & User Interrupts"]
    end

    subgraph TransportLayer["2. Real-Time Streaming & Auth Protocol"]
        B1["🔑 Ephemeral Token Service"]
        B2["⚡ WebSocket Bridge (Bi-directional)"]
        B3["⏱️ Low-Latency Interruption Handler (Barge-in)"]
    end

    subgraph CoreEngine["3. Gemini Live API Orchestration Engine"]
        C1["🤖 Gemini 2.0 / 2.5 Live Multimodal Model"]
        C2["🧠 Affective Dialog & Tone Synthesis"]
        C3["🛠️ Tool Use & Function Calling Engine"]
        C4["🔍 Google Search Grounding"]
    end

    subgraph OutputLayer["4. Real-Time Output & Feedback Stream"]
        D1["🔊 Live Audio Streaming (PCM 24kHz)"]
        D2["📝 Real-Time Audio Transcriptions"]
        D3["📊 Response Latency & Quality Metrics"]
    end

    A1 --> B2
    A2 --> B2
    A3 --> B2
    B1 --> B2
    B2 <--> B3
    B2 <--> C1
    C1 <--> C2
    C1 <--> C3
    C3 <--> C4
    C1 --> D1
    C1 --> D2
    C1 --> D3`,
};

// 2. Plutos Sub-Microservices Data
const plutosOverview: ArchitectureProject = {
  id: "plutos-overview",
  title: "Plutos AI Monitoring Platform Overview",
  shortTitle: "System Overview",
  subtitle: "Full-Stack Microservices Architecture, Kafka Event Stream & Gemini RCA",
  repo: "github.com/plutos-one/ai-monitoring-platform",
  badge: "Enterprise RAG Platform",
  description:
    "Enterprise AI-driven incident monitoring and root cause analysis (RCA) platform. Ingests high-throughput system metrics and logs via Apache Kafka, indexes vector embeddings in ChromaDB, caches queries via Redis, and orchestrates omnichannel alerts (Twilio Voice, WhatsApp, SES, Webhooks).",
  techStack: ["NestJS Gateway", "FastAPI Python 3.12", "Apache Kafka", "ChromaDB", "Redis Cache", "Gemini 2.5 Flash"],
  metrics: [
    { label: "Daily Transactions", value: "20,000+" },
    { label: "RCA Generation", value: "< 2s" },
    { label: "Multi-Tenancy", value: "Isolated" },
    { label: "Notification SLA", value: "99.9%" },
  ],
  videoUrl: "/plutos-monitoring-demo.mp4",
  mermaidCode: `graph TD
    subgraph IngestionLayer["1. Log & Metric Ingestion Layer"]
        M1["📊 InfluxDB / Prometheus Metrics"]
        M2["📑 System Logs & Traces"]
        M3["🚨 Automated Alarm Webhooks"]
    end

    subgraph MessagingLayer["2. Distributed Event Bus"]
        K1["⚡ Apache Kafka Event Stream"]
        K2["🔄 Queue Partitioning & Worker Dispatch"]
    end

    subgraph Microservices["3. Microservices Core & RAG Engine"]
        G1["🛡️ NestJS Monitoring Gateway"]
        I1["⚙️ NestJS Incident Management Engine"]
        R1["⚡ Python FastAPI RAG Microservice"]
        V1["🗄️ ChromaDB Vector Database"]
        C1["🚀 Redis Embedding & Query Cache"]
        L1["🧠 Google Gemini LLM (2.5 & 2.0 Flash)"]
    end

    subgraph EscalationLayer["4. Omnichannel Alerting & SLA Matrix"]
        N1["📞 Twilio Automated Voice Calls"]
        N2["💬 WhatsApp (Gupshup Gateway)"]
        N3["📧 AWS SES Email Reports"]
        N4["🔔 Slack & Teams Webhooks"]
    end

    M1 --> K1
    M2 --> K1
    M3 --> K1
    K1 --> K2
    K2 --> G1
    G1 --> I1
    I1 <--> R1
    R1 <--> V1
    R1 <--> C1
    R1 <--> L1
    I1 --> N1
    I1 --> N2
    I1 --> N3
    I1 --> N4`,
};

const plutosGateway: ArchitectureProject = {
  id: "plutos-gateway",
  title: "Plutos AI Gateway & Auth Service",
  shortTitle: "Gateway Service",
  subtitle: "NestJS API Gateway, JWT RBAC Auth & Redis Rate Throttler",
  repo: "github.com/plutos-one/monitoring-gateway",
  badge: "NestJS Gateway",
  description:
    "Enterprise API Gateway serving as single entry point for Plutos AI Monitoring Platform. Features JWT authentication, RBAC authorization, multi-tenant header context propagation, Redis rate limiting, Socket.io real-time event hub, and reverse-proxy routing to downstream microservices.",
  techStack: ["NestJS", "TypeScript", "Redis ioredis", "Socket.io", "Passport JWT", "http-proxy"],
  metrics: [
    { label: "Proxy Latency", value: "< 10ms" },
    { label: "Auth Scheme", value: "JWT + RBAC" },
    { label: "Multi-Tenancy", value: "Header Context" },
    { label: "Real-time Hub", value: "Socket.io" },
  ],
  videoUrl: "/plutos-monitoring-demo.mp4",
  mermaidCode: `graph TD
    subgraph Clients["1. Client Requests Layer"]
        C1["🌐 Web Dashboard"]
        C2["📱 Mobile App"]
        C3["🚨 Monitoring Alarm Hooks"]
    end

    subgraph GatewayCore["2. NestJS Gateway Core"]
        G1["🛡️ CORS & Header Sanitizer"]
        G2["🔑 JWT & RBAC Auth Guards"]
        G3["⚡ Redis Rate Limiter & Throttler"]
        G4["⚡ Socket.io Real-Time Event Hub"]
        G5["🔀 Path Router (http-proxy-middleware)"]
    end

    subgraph Downstream["3. Downstream Microservices"]
        D1["⚙️ Incident Platform (/incidents, /tenants)"]
        D2["🧠 AI RCA Engine (/rca)"]
        D3["🗄️ RAG Knowledge Service (/knowledge)"]
        D4["📑 API Intelligence Service (/validate)"]
    end

    C1 --> G1
    C2 --> G1
    C3 --> G1
    G1 --> G2
    G2 --> G3
    G3 --> G5
    G2 <--> G4
    G5 -->|/incidents| D1
    G5 -->|/rca| D2
    G5 -->|/knowledge| D3
    G5 -->|/validate| D4`,
};

const plutosIncident: ArchitectureProject = {
  id: "plutos-incident",
  title: "Plutos AI Incident & Escalation Platform",
  shortTitle: "Incident Engine",
  subtitle: "NestJS Incident Lifecycle Manager & Omnichannel Voice/WhatsApp Escalation",
  repo: "github.com/plutos-one/monitoring-incident-platform",
  badge: "NestJS Orchestrator",
  description:
    "Core incident orchestration microservice. Ingests high-throughput system alerts via Apache Kafka, manages incident state lifecycles (Detected ➔ In-Progress ➔ Resolved), enforces multi-level SLA matrices, and triggers omnichannel voice, WhatsApp, SES, and Slack webhooks.",
  techStack: ["NestJS", "Apache Kafka", "PostgreSQL", "Twilio Voice", "Gupshup WhatsApp", "AWS SES"],
  metrics: [
    { label: "Alert Ingestion", value: "Kafka Event Bus" },
    { label: "SLA Matrix", value: "Multi-Level SLA" },
    { label: "Voice Alerts", value: "Twilio Voice" },
    { label: "Persistence", value: "PostgreSQL" },
  ],
  videoUrl: "/plutos-monitoring-demo.mp4",
  mermaidCode: `graph TD
    subgraph Ingestion["1. Ingestion & Event Handling"]
        K1["⚡ Kafka Alert Consumer"]
        K2["🔍 Multi-Tenant Context Isolator"]
    end

    subgraph IncidentEngine["2. NestJS Incident Lifecycle Engine"]
        E1["📑 Incident State Machine (Detected ➔ Resolved)"]
        E2["⏱️ SLA Monitoring & Auto-Escalation Timer"]
        E3["📊 Metric & Log Context Enricher"]
        E4["🗄️ PostgreSQL Incident Data Store"]
    end

    subgraph Omnichannel["3. Omnichannel Notification Dispatch"]
        T1["📞 Twilio Automated Voice Call Engine"]
        W1["💬 Gupshup WhatsApp Gateway"]
        E1_mail["📧 AWS SES Email Reports"]
        H1["🔔 Slack & Teams Webhooks"]
    end

    K1 --> K2
    K2 --> E1
    E1 <--> E4
    E1 --> E2
    E1 --> E3
    E2 --> T1
    E2 --> W1
    E2 --> E1_mail
    E2 --> H1`,
};

const plutosRAG: ArchitectureProject = {
  id: "plutos-rag",
  title: "Plutos AI RAG & Vector Knowledge Microservice",
  shortTitle: "RAG Microservice",
  subtitle: "FastAPI Python Microservice, ChromaDB Vector Store & Gemini RCA Engine",
  repo: "github.com/plutos-one/monitoring-rag-services",
  badge: "FastAPI & ChromaDB RAG",
  description:
    "High-performance RAG document microservice. Processes PDF, Docx, Image OCR, and Plain Text files asynchronously via Kafka workers, indexes embeddings into ChromaDB, caches queries via Redis, and prompts Gemini 2.5/2.0 Flash for automated Root Cause Analysis (RCA).",
  techStack: ["FastAPI Python 3.12", "ChromaDB", "Kafka Worker", "Redis Cache", "Gemini 2.5 Flash", "Tesseract OCR"],
  metrics: [
    { label: "RCA Generation", value: "< 2s" },
    { label: "Vector Search", value: "ChromaDB" },
    { label: "Embedding Cache", value: "Redis" },
    { label: "Document Formats", value: "PDF / Docx / OCR" },
  ],
  videoUrl: "/plutos-monitoring-demo.mp4",
  mermaidCode: `graph TD
    subgraph Extraction["1. Multi-Format Document Ingestion"]
        D1["📄 PDF / Word / Text Documents"]
        D2["🖼️ Images & Screenshots (Tesseract OCR)"]
        D3["⚡ Kafka Task Dispatcher"]
    end

    subgraph RAGWorker["2. Python FastAPI RAG Worker Pipeline"]
        W1["⚙️ Asynchronous Kafka Document Worker"]
        W2["✂️ Recursive Text Chunking & Extractor"]
        W3["🚀 Redis Embedding & Query Cache"]
        W4["🗄️ ChromaDB Vector Store"]
    end

    subgraph GeminiRCA["3. Gemini LLM & RCA Generation"]
        G1["🧠 Google Gemini 2.5 / 2.0 Flash"]
        G2["💬 Rochie Monitoring Persona Prompt"]
        G3["📊 Root Cause Analysis & Resolution Steps"]
    end

    D1 --> D3
    D2 --> D3
    D3 --> W1
    W1 --> W2
    W2 <--> W3
    W2 <--> W4
    W4 <--> G1
    G1 --> G2
    G2 --> G3`,
};

// Main Plutos Container Object with Sub-Tabs
const plutosMainProject: ArchitectureProject = {
  ...plutosOverview,
  id: "plutos-ai",
  title: "Plutos AI Monitoring Platform",
  shortTitle: "Plutos AI Monitoring",
  subTabs: [
    { id: "plutos-overview", label: "📊 Overview", project: plutosOverview },
    { id: "plutos-gateway", label: "🛡️ Gateway", project: plutosGateway },
    { id: "plutos-incident", label: "⚙️ Incident Engine", project: plutosIncident },
    { id: "plutos-rag", label: "🧠 RAG Service", project: plutosRAG },
  ],
};

// 3. Visa AI Chatbot Data
const visaChatbotProject: ArchitectureProject = {
  id: "visa-chatbot",
  title: "Visa & CSC Multi-Country AI Chatbot",
  shortTitle: "Visa AI Chatbot",
  subtitle: "FastAPI RAG Pipeline, Document OCR Verification & Intent Router",
  repo: "github.com/satishchaubey/visa-csc-ai-chatbot",
  badge: "Document AI & RAG Chatbot",
  description:
    "Enterprise AI chatbot assisting applicants with multi-country visa guidelines, automated passport & document pre-verification (OCR), instant checklist generation via LangChain RAG vector search, and dynamic human agent escalation.",
  techStack: ["FastAPI Python 3.12", "LangChain RAG", "ChromaDB", "Google Gemini Flash", "Document OCR", "REST APIs"],
  metrics: [
    { label: "Country Coverage", value: "Global / CSC" },
    { label: "Query Speed", value: "< 2.5s" },
    { label: "Verification Accuracy", value: "98.5%" },
    { label: "Escalation SLA", value: "Instant" },
  ],
  mermaidCode: `graph TD
    subgraph UserLayer["1. User & Applicant Interfaces"]
        U1["🌐 Web Portal / Mobile Widget"]
        U2["💬 Visa & CSC Query Assistance"]
        U3["📄 Document Upload (PDF / Passport Scan)"]
    end

    subgraph RouterLayer["2. Conversational Intent Router"]
        R1["⚡ FastAPI Intent Classifier"]
        R2["🧠 Entity Extractor (Country, Visa Type, Document Rules)"]
    end

    subgraph AIKnowledgeLayer["3. Vector RAG Search & Policy Engine"]
        V1["🗄️ Vector Database (Emb. Documents)"]
        L1["🤖 LangChain / LLM Reasoning Pipeline"]
        G1["🔍 Multi-Country Compliance Rules Engine"]
    end

    subgraph ResponseLayer["4. Response Synthesis & Escalation"]
        O1["✅ Instant Guidelines & Checklist Response"]
        O2["📋 Automated Document Pre-Verification Report"]
        O3["👨‍💼 Human Agent Escalation Queue (High Priority)"]
    end

    U1 --> R1
    U2 --> R1
    U3 --> R1
    R1 --> R2
    R2 <--> V1
    R2 <--> L1
    L1 <--> G1
    L1 --> O1
    L1 --> O2
    G1 --> O3`,
};

// 4. Portfolio AI Chatbot Data
const portfolioChatbotProject: ArchitectureProject = {
  id: "portfolio-chatbot",
  title: "Satish Portfolio Universal AI Chatbot",
  shortTitle: "Portfolio AI",
  subtitle: "Instant 30 Q&A Knowledge Engine & Floating Conversational Drawer",
  repo: "github.com/satishchaubey/portfolio",
  badge: "Conversational Portfolio AI",
  description:
    "Interactive portfolio AI assistant built with React 19, Framer Motion, and keyword entity matching over 30 verified knowledge items, accessible across all portfolio routes via a global floating drawer.",
  techStack: ["React 19", "Next.js 15", "Framer Motion", "Keyword Matcher", "Tailwind CSS v4"],
  metrics: [
    { label: "Knowledge Items", value: "30 Verified Q&As" },
    { label: "Response Time", value: "< 50ms" },
    { label: "Global Drawer", value: "All Routes" },
    { label: "Hinglish Persona", value: "Custom Built" },
  ],
  mermaidCode: `graph TD
    subgraph TriggerLayer["1. User Trigger & Global Floating Drawer"]
        T1["💬 Floating Action Button (All Routes)"]
        T2["📱 Mobile & Desktop Floating Window"]
        T3["⚡ 30 Quick Question Pills"]
    end

    subgraph EngineLayer["2. Client Knowledge Matching Engine"]
        E1["🔍 Keyword & Entity Search Evaluator"]
        E2["📚 30 Verified Knowledge Items DB"]
        E3["🤖 Hinglish Custom Persona Processor"]
    end

    subgraph DisplayLayer["3. Real-Time UI & Response Stream"]
        D1["💬 Interactive Typing Animation"]
        D2["📄 Instant CV Download Link Integration"]
        D3["🔄 Single-Click Clear Chat & State Sync"]
    end

    T1 --> T2
    T2 --> T3
    T3 --> E1
    E1 <--> E2
    E1 --> E3
    E3 --> D1
    E3 --> D2
    E3 --> D3`,
};

// Clean 4 Primary Top Tabs
const primaryProjects: ArchitectureProject[] = [
  geminiLiveProject,
  plutosMainProject,
  visaChatbotProject,
  portfolioChatbotProject,
];

// Mermaid Renderer Sub-Component
const MermaidDiagram = ({ code, id }: { code: string; id: string }) => {
  const [svgContent, setSvgContent] = useState<string>("");
  const [isRendering, setIsRendering] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setIsRendering(true);

    const renderGraph = async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
          fontFamily: "Inter, sans-serif",
          themeVariables: {
            primaryColor: "#0d9488",
            primaryTextColor: "#ffffff",
            primaryBorderColor: "#14b8a6",
            lineColor: "#38bdf8",
            secondaryColor: "#7c3aed",
            tertiaryColor: "#1e293b",
          },
        });

        const uniqueId = `mermaid-svg-${id}-${Math.random().toString(36).substring(2, 7)}`;
        const { svg } = await mermaid.render(uniqueId, code);
        if (isMounted) {
          setSvgContent(svg);
          setIsRendering(false);
        }
      } catch (err) {
        console.error("Mermaid Render Error:", err);
        if (isMounted) {
          setIsRendering(false);
        }
      }
    };

    renderGraph();
    return () => {
      isMounted = false;
    };
  }, [code, id]);

  if (isRendering) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-3">
        <Workflow className="w-8 h-8 text-teal-500 animate-spin" />
        <span className="text-xs text-muted-foreground font-semibold">Rendering System Architecture Diagram...</span>
      </div>
    );
  }

  return (
    <div
      className="w-full overflow-x-auto p-4 sm:p-6 flex justify-center items-center bg-card rounded-2xl border border-border/50 [::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default function ArchitectureSection() {
  const pathname = usePathname();
  const isAIPlaygroundRoute = pathname === "/ai-playground";

  const [activeMainTab, setActiveMainTab] = useState<string>("gemini-live");
  const [activeSubTab, setActiveSubTab] = useState<string>("plutos-overview");
  const [copied, setCopied] = useState<boolean>(false);
  const [showCodeView, setShowCodeView] = useState<boolean>(false);

  const mainProject = primaryProjects.find((p) => p.id === activeMainTab) || primaryProjects[0];

  // If active main project has sub-tabs, resolve active sub-project data
  const currentDisplayProject: ArchitectureProject =
    mainProject.subTabs
      ? mainProject.subTabs.find((st) => st.id === activeSubTab)?.project || mainProject.subTabs[0].project
      : mainProject;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentDisplayProject.mermaidCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="architecture" className="relative py-6 sm:py-8 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-border/30">
      <div className="relative z-10 max-w-6xl mx-auto space-y-3 sm:space-y-4">
        {/* Header Title */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
            <Workflow className="w-4 h-4" /> System Architecture & AI Engineering
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            <LustreText text="Production System Diagrams" className="text-2xl sm:text-4xl md:text-5xl font-extrabold" />
          </h2>

          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Detailed architectural flow diagrams for production AI systems built by Satish Chaubey — featuring real-time multimodal audio/video streaming & microservices RAG pipelines.
          </p>
        </div>

        {/* PRIMARY TOP TABS BAR (4 Main Projects Only) */}
        <div className="grid grid-cols-2 sm:flex sm:flex-row sm:items-center sm:justify-center gap-1.5 sm:gap-2 px-1 py-1">
          {primaryProjects.map((project) => (
            <button
              key={project.id}
              onClick={() => {
                setActiveMainTab(project.id);
                setShowCodeView(false);
                if (project.subTabs) {
                  setActiveSubTab(project.subTabs[0].id);
                }
              }}
              className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeMainTab === project.id
                  ? "bg-gradient-to-r from-teal-500 to-purple-600 text-white shadow-lg scale-[1.01]"
                  : "border border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">{project.shortTitle}</span>
            </button>
          ))}
        </div>

        {/* MAIN DISPLAY CARD */}
        <div className="rounded-2xl sm:rounded-3xl border border-border/40 bg-transparent p-3.5 sm:p-8 space-y-4 sm:space-y-6 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600" />

          {/* SECONDARY SUB-TABS BAR (Rendered only when Plutos AI Monitoring is active) */}
          {mainProject.subTabs && (
            <div className="space-y-2 border-b border-border/60 pb-3">
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase text-teal-500 flex items-center gap-1">
                <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Plutos Microservices:
              </span>
              <div className="grid grid-cols-2 sm:flex sm:flex-row gap-1.5">
                {mainProject.subTabs.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      setActiveSubTab(st.id);
                      setShowCodeView(false);
                    }}
                    className={`px-2.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer text-center justify-center whitespace-nowrap ${
                      activeSubTab === st.id
                        ? "bg-teal-500/20 text-teal-600 dark:text-teal-300 border border-teal-500/40 shadow-sm"
                        : "bg-accent/50 text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Project Details Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 border-b border-border/50 pb-4 sm:pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/30 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider">
                  {currentDisplayProject.badge}
                </span>
              </div>
              <h3 className="text-lg sm:text-2xl font-extrabold text-foreground">
                {currentDisplayProject.title}
              </h3>
              <p className="text-[11px] sm:text-sm text-muted-foreground">
                {currentDisplayProject.subtitle}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <button
                onClick={() => setShowCodeView(!showCodeView)}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full border text-[11px] sm:text-xs font-semibold transition-all cursor-pointer shadow-sm ${
                  showCodeView
                    ? "bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30"
                    : "bg-background hover:bg-accent text-foreground border-border"
                }`}
              >
                <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-500 flex-shrink-0" />
                <span className="whitespace-nowrap">{showCodeView ? "View Diagram" : "View Code"}</span>
              </button>

              <button
                onClick={handleCopyCode}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold transition-all cursor-pointer shadow-sm ${
                  copied
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                    : "bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-400 hover:bg-teal-500/20"
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 flex-shrink-0" /> : <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />}
                <span className="whitespace-nowrap">{copied ? "Copied!" : "Copy Code"}</span>
              </button>
            </div>
          </div>

          {/* Description & Metrics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center">
            <div className="lg:col-span-7 space-y-2.5">
              <p className="text-[11px] sm:text-sm text-muted-foreground leading-relaxed">
                {currentDisplayProject.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-0.5">
                {currentDisplayProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[10px] sm:text-[11px] font-semibold bg-accent text-foreground border border-border/60 leading-tight"
                  >
                    ⚡ {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* System Performance Metrics */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-2 sm:gap-2.5">
              {currentDisplayProject.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-2 sm:p-3 rounded-xl border border-border bg-background text-center space-y-0.5 shadow-sm"
                >
                  <span className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground font-bold uppercase tracking-wider block truncate">
                    {m.label}
                  </span>
                  <span className="text-xs sm:text-base md:text-lg font-extrabold text-teal-600 dark:text-teal-400 block truncate">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Live System Demo Video Player (Only on /ai-playground route) */}
          {isAIPlaygroundRoute && currentDisplayProject.videoUrl && (
            <div className="p-2 sm:p-4 rounded-xl sm:rounded-2xl border border-teal-500/30 bg-card space-y-2 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-teal-400 min-w-0">
                  <PlayCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-500 animate-pulse flex-shrink-0" />
                  <span className="truncate">Live Demo — {currentDisplayProject.shortTitle}</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-muted-foreground font-mono bg-accent px-1.5 py-0.5 rounded-md whitespace-nowrap flex-shrink-0">
                  MP4 Video
                </span>
              </div>
              <div className="relative rounded-lg sm:rounded-xl overflow-hidden border border-border/50 bg-card aspect-video">
                <video
                  src={currentDisplayProject.videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-contain max-h-[360px] mx-auto pointer-events-none"
                />
              </div>
            </div>
          )}

          {/* Diagram / Code Viewer Area */}
          <div className="pt-2">
            <div className="flex items-center justify-between gap-2 text-[11px] sm:text-xs text-muted-foreground font-bold uppercase tracking-wider mb-2 px-1">
              <span className="flex items-center gap-1.5 min-w-0">
                <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0" />
                <span className="truncate">{showCodeView ? "Mermaid Code" : "Architecture Diagram"}</span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-teal-500 font-mono whitespace-nowrap flex-shrink-0">
                Scroll Enabled
              </span>
            </div>

            {showCodeView ? (
              <pre className="p-4 rounded-2xl bg-card border border-border font-mono text-xs text-teal-600 dark:text-emerald-400 overflow-x-auto max-h-[420px] leading-relaxed shadow-inner">
                <code>{currentDisplayProject.mermaidCode}</code>
              </pre>
            ) : (
              <MermaidDiagram code={currentDisplayProject.mermaidCode} id={currentDisplayProject.id} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
