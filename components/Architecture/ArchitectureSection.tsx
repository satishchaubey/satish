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
  repo: "github.com/satishchaubey/realtime-multimodal-streaming",
  badge: "Real-Time AI & WebSockets",
  description:
    "Architected low-latency streaming pipeline enabling continuous bi-directional voice, video, and text interaction with Multimodal AI models. Features real-time PCM audio processing, dynamic interruption handling, function calling, and live audio synthesis.",
  techStack: ["Multimodal LLM", "WebSockets", "Python SDK", "PCM Audio Stream", "Function Calling"],
  metrics: [
    { label: "Stream Latency", value: "< 250ms" },
    { label: "Audio Fidelity", value: "24kHz PCM" },
    { label: "Supported Languages", value: "70+" },
    { label: "Concurrency", value: "Bi-directional" },
  ],
  mermaidCode: `graph TD
    subgraph ClientLayer["1. Multimodal Client Layer"]
        A1["Text Prompts & User Interrupts"]
        A2["Live Audio Input"]
        A3["Live Video Input"]
    end

    subgraph TransportLayer["2. Real-Time Communication Layer"]
        B1["Secure Session Authentication"]
        B2["Bi-directional Streaming"]
        B3["Low-Latency Interruption Handler"]
    end

    subgraph CoreEngine["3. Multimodal AI Orchestration"]
        C1["Real-Time Multimodal AI Model"]
        C2["Context & Conversation Engine"]
        C3["Tool & Function Calling"]
        C4["External Information Retrieval"]
    end

    subgraph OutputLayer["4. Real-Time Response Layer"]
        D1["Live Audio Output"]
        D2["Real-Time Transcription"]
        D3["Latency & Quality Metrics"]
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

// 2. Monitoring Microservices Data
const monitoringOverview: ArchitectureProject = {
  id: "monitoring-overview",
  title: "AI Incident & Monitoring Platform Overview",
  shortTitle: "System Overview",
  subtitle: "Full-Stack Microservices Architecture, Distributed Event Stream & RCA Engine",
  repo: "github.com/satishchaubey/ai-monitoring-platform",
  badge: "Enterprise RAG Platform",
  description:
    "Enterprise AI-driven incident monitoring and root cause analysis (RCA) platform. Ingests high-throughput system metrics and logs via Distributed Event Stream, indexes vector embeddings in Vector Database, caches queries, and orchestrates omnichannel notifications.",
  techStack: ["API Gateway", "FastAPI Python 3.12", "Distributed Event Stream", "Vector Database", "Caching Layer", "Multimodal LLM"],
  metrics: [
    { label: "Daily Transactions", value: "20,000+" },
    { label: "RCA Generation", value: "< 2s" },
    { label: "Multi-Tenancy", value: "Isolated" },
    { label: "Notification SLA", value: "99.9%" },
  ],
  mermaidCode: `graph TD
    subgraph IngestionLayer["1. Data Ingestion"]
        M1["Alert Webhooks"]
        M2["Metrics & Monitoring Data"]
        M3["Application Logs"]
    end

    subgraph MessagingLayer["2. Event Processing"]
        K1["Distributed Event Stream"]
        K2["Queue & Worker Processing"]
    end

    subgraph Microservices["3. Backend & AI Platform"]
        G1["API Gateway"]
        I1["Incident Management Service"]
        R1["AI/RAG Service"]
        V1["Vector Database"]
        C1["Caching Layer"]
        L1["LLM Service"]
    end

    subgraph EscalationLayer["4. Notification Layer"]
        N1["Voice Notifications"]
        N2["Messaging Notifications"]
        N3["Email Notifications"]
        N4["Team Collaboration Alerts"]
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

const monitoringGateway: ArchitectureProject = {
  id: "monitoring-gateway",
  title: "API Gateway & Authentication Service",
  shortTitle: "Gateway Service",
  subtitle: "NestJS API Gateway, Token Auth & Redis Rate Throttler",
  repo: "github.com/satishchaubey/api-gateway-service",
  badge: "API Gateway",
  description:
    "Enterprise API Gateway serving as single entry point for microservices platform. Features token authentication, RBAC authorization, multi-tenant header context propagation, Redis rate limiting, real-time event hub, and reverse-proxy routing to downstream services.",
  techStack: ["NestJS", "TypeScript", "Redis", "Socket.io", "Token Auth", "Reverse Proxy"],
  metrics: [
    { label: "Proxy Latency", value: "< 10ms" },
    { label: "Auth Scheme", value: "Token + RBAC" },
    { label: "Multi-Tenancy", value: "Context Header" },
    { label: "Real-time Hub", value: "Socket.io" },
  ],
  mermaidCode: `graph TD
    subgraph Clients["1. Client Access Layer"]
        C1["Client Applications & Monitoring Webhooks"]
    end

    subgraph GatewayCore["2. API Gateway"]
        G1["Security & Header Sanitizer"]
        G2["Auth Guard & RBAC"]
        G3["Rate Limiter & Throttler"]
        G4["Real-Time Event Hub"]
        G5["Path Router & Load Balancer"]
    end

    subgraph Downstream["3. Microservices Core"]
        D1["Incident Management Service"]
        D2["AI Analysis Service"]
        D3["Knowledge Base Service"]
        D4["Service Health Verification"]
    end

    C1 --> G1
    G1 --> G2
    G2 --> G3
    G3 --> G5
    G2 <--> G4
    G5 --> D1
    G5 --> D2
    G5 --> D3
    G5 --> D4`,
};

const monitoringIncident: ArchitectureProject = {
  id: "monitoring-incident",
  title: "Incident Management & Escalation Engine",
  shortTitle: "Incident Engine",
  subtitle: "Incident Lifecycle Manager & Omnichannel Notification Service",
  repo: "github.com/satishchaubey/incident-management-engine",
  badge: "Service Orchestrator",
  description:
    "Core incident orchestration service. Ingests high-throughput system events, manages incident state lifecycles, enforces multi-level SLA matrices, and triggers omnichannel voice, messaging, email, and team collaboration alerts.",
  techStack: ["NestJS", "Distributed Event Stream", "PostgreSQL", "Voice Gateway", "Messaging API", "Email Service"],
  metrics: [
    { label: "Alert Ingestion", value: "Event Stream" },
    { label: "SLA Matrix", value: "Multi-Level SLA" },
    { label: "Voice Alerts", value: "Automated Calls" },
    { label: "Persistence", value: "Relational DB" },
  ],
  mermaidCode: `graph TD
    subgraph Ingestion["1. Event Ingestion"]
        K1["Event Stream Consumer"]
        K2["Tenant Context & Event Processing"]
    end

    subgraph IncidentEngine["2. Incident Management"]
        E1["Incident Lifecycle Management"]
        E2["SLA Tracking & Escalation"]
        E3["Context Enrichment"]
        E4["Incident Data Store"]
    end

    subgraph Omnichannel["3. Notification Layer"]
        T1["Voice Notifications"]
        W1["Messaging Notifications"]
        E1_mail["Email Notifications"]
        H1["Team Collaboration Alerts"]
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

const monitoringRAG: ArchitectureProject = {
  id: "monitoring-rag",
  title: "AI RAG & Vector Knowledge Microservice",
  shortTitle: "RAG Microservice",
  subtitle: "FastAPI Python Microservice, Vector Database & LLM Engine",
  repo: "github.com/satishchaubey/ai-rag-microservice",
  badge: "FastAPI & Vector RAG",
  description:
    "High-performance RAG document microservice. Processes PDF, Docx, Image OCR, and Plain Text files asynchronously via background workers, indexes embeddings into Vector Database, caches queries via Redis, and prompts LLMs for automated Root Cause Analysis (RCA).",
  techStack: ["FastAPI Python 3.12", "Vector Database", "Queue Worker", "Caching Layer", "Multimodal LLM", "OCR Engine"],
  metrics: [
    { label: "RCA Generation", value: "< 2s" },
    { label: "Vector Search", value: "Vector DB" },
    { label: "Embedding Cache", value: "Redis" },
    { label: "Document Formats", value: "PDF / Docx / OCR" },
  ],
  mermaidCode: `graph TD
    subgraph Extraction["1. Document Ingestion"]
        D1["PDF / Word / Text Documents"]
        D2["Images & Screenshots"]
        D3["Event-Based Task Processing"]
    end

    subgraph RAGWorker["2. RAG Processing Pipeline"]
        W1["Asynchronous Document Processing"]
        W2["Text Extraction & Chunking"]
        W3["Caching Layer"]
        W4["Vector Database"]
    end

    subgraph GeminiRCA["3. AI Analysis & RCA"]
        G1["Multimodal LLM"]
        G2["Context-Aware Prompting"]
        G3["Root Cause Analysis & Resolution Steps"]
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

// Main Monitoring Container Object with Sub-Tabs
const monitoringMainProject: ArchitectureProject = {
  ...monitoringOverview,
  id: "monitoring-ai",
  title: "AI Incident & Monitoring Platform",
  shortTitle: "AI Monitoring Platform",
  subTabs: [
    { id: "monitoring-overview", label: "📊 Overview", project: monitoringOverview },
    { id: "monitoring-gateway", label: "🛡️ Gateway", project: monitoringGateway },
    { id: "monitoring-incident", label: "⚙️ Incident Engine", project: monitoringIncident },
    { id: "monitoring-rag", label: "🧠 RAG Service", project: monitoringRAG },
  ],
};

// 3. Multi-Country AI Assistance & Document Pipeline Data
const documentAiProject: ArchitectureProject = {
  id: "document-ai",
  title: "Multi-Country AI Assistance & Document Pipeline",
  shortTitle: "AI Document Pipeline",
  subtitle: "FastAPI RAG Pipeline, Document Verification & Intent Router",
  repo: "github.com/satishchaubey/ai-document-pipeline",
  badge: "Sanitized Document AI",
  description:
    "Enterprise AI platform assisting applicants with multi-country guidelines, automated document pre-verification, instant checklist generation via RAG vector search, and dynamic human support escalation.",
  techStack: ["FastAPI Python 3.12", "LangChain RAG", "Vector Search", "AI Reasoning Pipeline", "Document OCR", "REST APIs"],
  metrics: [
    { label: "Coverage", value: "Global / Multi-Country" },
    { label: "Query Speed", value: "< 2.5s" },
    { label: "Verification Accuracy", value: "98.5%" },
    { label: "Escalation SLA", value: "Instant" },
  ],
  mermaidCode: `graph TD
    subgraph UserLayer["1. User & Applicant Interfaces"]
        U1["Web Portal / Mobile Interface"]
        U2["General Query Assistance"]
        U3["Document Upload"]
    end

    subgraph RouterLayer["2. Conversational Processing"]
        R1["Intent Classification Service"]
        R2["Entity & Requirement Extraction"]
    end

    subgraph AIKnowledgeLayer["3. AI Knowledge & Policy Layer"]
        V1["Knowledge & Vector Search"]
        L1["AI Reasoning Pipeline"]
        G1["Policy & Compliance Rules"]
    end

    subgraph ResponseLayer["4. Response & Escalation"]
        O1["Guidelines & Checklist Response"]
        O2["Document Verification Summary"]
        O3["Human Support Escalation"]
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
        T1["Floating Action Button (All Routes)"]
        T2["Mobile & Desktop Floating Window"]
        T3["30 Quick Question Pills"]
    end

    subgraph EngineLayer["2. Client Knowledge Matching Engine"]
        E1["Keyword & Entity Search Evaluator"]
        E2["30 Verified Knowledge Items DB"]
        E3["Hinglish Custom Persona Processor"]
    end

    subgraph DisplayLayer["3. Real-Time UI & Response Stream"]
        D1["Interactive Typing Animation"]
        D2["Instant CV Download Link Integration"]
        D3["Single-Click Clear Chat & State Sync"]
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

// 5. WhatsApp Chatbots Data (2 Sub-Bots)
const whatsappCustomerSupportBot: ArchitectureProject = {
  id: "whatsapp-support",
  title: "E-Commerce & Support WhatsApp Bot Engine",
  shortTitle: "Support Bot",
  subtitle: "Node.js Baileys / WhatsApp Business API, Express Webhooks & Live Agent Handover",
  repo: "github.com/satishchaubey/whatsapp-support-bot",
  badge: "WhatsApp Business API",
  description:
    "Enterprise WhatsApp conversational assistant handling real-time order tracking, automated FAQ resolutions, catalog browsing, interactive quick-reply menus, and instant seamless handover to human support agents when complex issues are detected.",
  techStack: ["Node.js", "Express.js", "WhatsApp Business API", "Redis Event Queue", "MongoDB", "Webhook Handler"],
  metrics: [
    { label: "Daily Messages", value: "15,000+" },
    { label: "Response Latency", value: "< 800ms" },
    { label: "Auto Resolution", value: "85%" },
    { label: "Live Handover", value: "Instant" },
  ],
  mermaidCode: `graph TD
    subgraph WhatsAppClient["1. WhatsApp User Interface"]
        U1["WhatsApp Mobile & Web App"]
        U2["Interactive Quick-Reply Buttons"]
    end

    subgraph WebhookGateway["2. Webhook Ingestion & Auth"]
        W1["Express Webhook Handler"]
        W2["HMAC Signature Verification"]
        W3["Redis Message Queue"]
    end

    subgraph BotEngine["3. Conversational Router & NLP"]
        R1["Message Intent Classifier"]
        R2["Session State & Context Manager"]
        R3["Catalog & FAQ Resolution Search"]
    end

    subgraph ServiceIntegration["4. Backend & Fulfillment"]
        D1["Order Fulfillment Service"]
        D2["Customer CRM Database"]
        D3["Live Support Agent Handover"]
    end

    U1 --> W1
    U2 --> W1
    W1 --> W2
    W2 --> W3
    W3 --> R1
    R1 <--> R2
    R1 --> R3
    R3 <--> D1
    R3 <--> D2
    R1 --> D3`,
};

const whatsappCampaignBot: ArchitectureProject = {
  id: "whatsapp-campaign",
  title: "Utility & Automated Campaign WhatsApp Bot Engine",
  shortTitle: "Campaign Bot",
  subtitle: "FastAPI Python, WhatsApp Cloud API, Asynchronous Queue Workers & Drip Campaigns",
  repo: "github.com/satishchaubey/whatsapp-campaign-bot",
  badge: "WhatsApp Cloud API",
  description:
    "High-throughput WhatsApp automation engine powering targeted multi-template drip campaigns, automated utility bill reminders, lead qualification flowcharts, interactive survey menus, and real-time delivery status analytics.",
  techStack: ["FastAPI Python 3.12", "WhatsApp Cloud API", "Interactive Button Payloads", "PostgreSQL", "Celery Queue", "Redis"],
  metrics: [
    { label: "Campaign Dispatch", value: "50,000+/day" },
    { label: "Delivery SLA", value: "< 1.2s" },
    { label: "Template Verification", value: "100% Compliant" },
    { label: "Engagement CTR", value: "3.2x vs Email" },
  ],
  mermaidCode: `graph TD
    subgraph CampaignEngine["1. Campaign & Drip Scheduler"]
        C1["Bulk Campaign Dispatcher"]
        C2["Celery Asynchronous Workers"]
        C3["Template & Button Payload Generator"]
    end

    subgraph CloudAPI["2. WhatsApp Cloud API Layer"]
        A1["WhatsApp Cloud API Gateway"]
        A2["Interactive Button & Menu Payloads"]
    end

    subgraph InteractionHandler["3. User Response Processing"]
        I1["Inbound Webhook Receiver"]
        I2["Lead Qualification Router"]
        I3["PostgreSQL Lead Persistence"]
        I4["Real-Time Delivery & Read Webhooks"]
    end

    C1 --> C2
    C2 --> C3
    C3 --> A1
    A1 --> A2
    A2 --> I1
    I1 --> I2
    I2 <--> I3
    A1 --> I4`,
};

// Main WhatsApp Chatbot Container Object with Sub-Tabs
const whatsappChatbotMainProject: ArchitectureProject = {
  ...whatsappCustomerSupportBot,
  id: "whatsapp-bots",
  title: "WhatsApp Conversational AI & Automation Engine",
  shortTitle: "WhatsApp Bots",
  subTabs: [
    { id: "whatsapp-support", label: "💬 E-Commerce & Support Bot", project: whatsappCustomerSupportBot },
    { id: "whatsapp-campaign", label: "🚀 Utility & Campaign Bot", project: whatsappCampaignBot },
  ],
};

// Clean 5 Primary Top Tabs
const primaryProjects: ArchitectureProject[] = [
  geminiLiveProject,
  monitoringMainProject,
  documentAiProject,
  whatsappChatbotMainProject,
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
      <div className="h-64 flex items-center justify-center rounded-2xl bg-card border border-border/50 text-xs font-mono text-muted-foreground animate-pulse">
        Rendering Architecture Diagram...
      </div>
    );
  }

  return (
    <div
      className="p-4 sm:p-6 rounded-2xl bg-card border border-border/50 overflow-x-auto flex justify-center items-center shadow-inner min-h-[300px]"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default function ArchitectureSection() {
  const pathname = usePathname();
  const isAIPlaygroundRoute = pathname === "/ai-playground";

  const [activeMainTab, setActiveMainTab] = useState<string>("gemini-live");
  const [activeSubTab, setActiveSubTab] = useState<string>("monitoring-overview");
  const [showCodeView, setShowCodeView] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

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
    <section id="architecture" className="relative py-2 px-1 sm:px-2 overflow-hidden border-t border-border/30">
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
            Detailed architectural flow diagrams for production AI systems — featuring real-time multimodal audio/video streaming, microservices, and RAG pipelines.
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
        <div className="rounded-2xl sm:rounded-3xl border border-border/40 bg-transparent p-1.5 sm:p-3 space-y-4 sm:space-y-6 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600" />

          {/* SECONDARY SUB-TABS BAR (Rendered only when AI Monitoring is active) */}
          {mainProject.subTabs && (
            <div className="space-y-2 border-b border-border/60 pb-3">
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase text-teal-500 flex items-center gap-1">
                <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Microservices Architecture:
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

          {/* Live System Demo Video Player (Commented Out) */}
          {/* 
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
          */}

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
