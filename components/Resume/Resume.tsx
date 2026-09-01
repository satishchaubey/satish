"use client";

import React, { useState } from "react";
import ResumeHeader from "./ResumeHeader";
import ResumeSkills from "./ResumeSkills";
import ResumeExperience from "./ResumeExperience";
import ResumeEducation from "./ResumeEducation";
import ResumeProjects from "./ResumeProjects";
import { BlurFade } from "@/components/magicui/blur-fade";
import LustreText from "../ui/lustretext";
import AnimatedDivider from "../comman/underline";
import { ResumeCertifications, ResumeHobbies } from "../Certifications/page";
import ThankYou from "../comman/ThankYou";

const experiences: any[] = [
  {
    role: "Software Engineer",
    company: "FinTech & SaaS Enterprise",
    period: "Feb 2024 - Present",
    description: [
      "Develop full-stack and frontend-focused features for SaaS, banking, and enterprise platforms using Next.js, React.js, TypeScript, and Node.js.",
      "Led frontend development across 30+ enterprise application pages and maintained client & internal operational dashboards.",
      "Architected AI RAG (Retrieval-Augmented Generation) & CAG (Cache-Augmented Generation) document search pipelines and conversational AI microservices.",
      "Integrated PayU and Razorpay payment gateways with secure frontend workflows and backend API coordination.",
      "Collaborated within microservices architecture and optimized application performance through Redis caching, API optimization, and lazy loading.",
      "Engineered high-traffic bill payment platform with microservices architecture."
    ],
    technologies: ["Next.js 15", "React 19", "TypeScript", "Node.js", "Express", "PayU", "Razorpay", "BBPS API", "Redis", "AI RAG/CAG", "Vector DBs"]
  },
  {
    role: "Front-End Developer",
    company: "Speqto Technology Pvt. Ltd.",
    period: "Jun 2023 - Jan 2024",
    description: [
      "Built reusable UI components and production interfaces using React.js, Next.js, and Vite.",
      "Integrated decentralized wallet workflows with REST APIs and contributed to blockchain-based applications with BSC smart contract integration.",
      "Improved responsive behavior and cross-browser compatibility across application interfaces."
    ],
    technologies: ["React.js", "Next.js", "Vite", "Tailwind CSS", "REST APIs", "BSC Smart Contracts"]
  },
  {
    role: "MERN Stack Intern",
    company: "Techpile Technology Pvt. Ltd.",
    period: "Jun 2022 - May 2023",
    description: [
      "Developed full-stack applications using MongoDB, Express.js, React.js, and Node.js.",
      "Built interactive user interfaces with React, Redux Toolkit, and Bootstrap.",
      "Developed backend APIs and integrated application databases."
    ],
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Redux", "Bootstrap"]
  }
];

const education: any[] = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "ITM College of Management, Gorakhpur",
    period: "2019 - 2021",
    description: [
      "Gained strong fundamentals in programming, data structures, database management, and web development.",
      "Focused on practical application building using the MERN stack and modern JavaScript frameworks."
    ]
  },
  {
    degree: "MERN Stack Developer Certification",
    institution: "Techpile Technology Pvt. Ltd.",
    period: "2022 - 2023",
    description: [
      "Comprehensive full-stack training covering MongoDB, Express.js, React.js, Node.js, Redux, and REST API deployment."
    ]
  }
];

const skills: any[] = [
  { name: "React.js & Next.js", category: "Frontend", proficiency: 5 },
  { name: "TypeScript & JavaScript", category: "Frontend", proficiency: 5 },
  { name: "Tailwind CSS & ShadCN UI", category: "Frontend", proficiency: 5 },
  { name: "Redux Toolkit & Zustand", category: "Frontend", proficiency: 4 },
  { name: "Node.js & Express.js", category: "Backend", proficiency: 5 },
  { name: "FastAPI & REST APIs", category: "Backend", proficiency: 4 },
  { name: "AI RAG & CAG Architecture (Gemini, Vector DBs)", category: "AI & Backend", proficiency: 5 },
  { name: "Payment Gateways (PayU, Razorpay)", category: "Backend", proficiency: 5 },
  { name: "MongoDB & Redis Caching", category: "Database", proficiency: 5 },
  { name: "PostgreSQL & MySQL", category: "Database", proficiency: 4 },
  { name: "AWS & GCP Cloud", category: "DevOps", proficiency: 4 },
  { name: "Git, GitHub & Postman", category: "Tools", proficiency: 5 }
];

const freelanceProjects = [
  {
    title: "Enterprise BBPS Payment SaaS Platform",
    description: "High-scale AI SaaS and BBPS bill payments engine integrated with PayU & Razorpay payment gateways, analytics, and client campaign dashboards.",
    technologies: ["Next.js 15", "React 19", "BBPS API", "PayU / Razorpay", "Tailwind CSS"]
  },
  {
    title: "Omni-Channel Enterprise Digital Banking Platform",
    description: "Production enterprise digital banking portal and transaction management suite built with Next.js & React, prioritizing secure data handling and intuitive banking user journeys.",
    technologies: ["Next.js 15", "React 19", "Redux Toolkit", "TypeScript", "REST API"]
  },
  {
    title: "High-Traffic Microservices Bill Payment Engine",
    description: "High-throughput bill payment engine engineered with Redis caching and microservices architecture.",
    technologies: ["Next.js", "Node.js", "Express.js", "MongoDB", "Redis Caching"]
  },
  {
    title: "AI Call Monitoring & Sentiment Analytics",
    description: "Automated call monitoring platform powered by LLM-based call analysis APIs, audio sentiment scoring, and real-time operational dashboards.",
    technologies: ["Next.js", "Node.js", "LLM APIs", "WebSockets", "ShadCN UI"]
  },
  {
    title: "Multi-Country AI Assistance & Document Pipeline",
    description: "Multinational assistance chatbot handling complex queries, automated documentation pre-verification, and real-time customer support routing.",
    technologies: ["React.js", "LLM APIs", "Node.js", "FastAPI", "Vector Search"]
  },
  {
    title: "Bound Finance Crypto Trading Platform",
    description: "Web3 crypto platform with real-time WebSocket ticker updates, wallet integration (MetaMask & Wagmi), dynamic trading charts, and responsive dashboards.",
    technologies: ["Next.js", "TypeScript", "Web3.js", "Wagmi", "Framer Motion"]
  },
  {
    title: "Udenz Healthcare Appointment Portal",
    description: "Comprehensive patient-doctor scheduling system with electronic prescription records, real-time booking, and secure NestJS backend.",
    technologies: ["React.js", "NestJS", "PostgreSQL", "Tailwind CSS", "REST API"]
  },
  {
    title: "Real-Time Trading Solutions Dashboard",
    description: "Scalable trading metrics and portfolio manager with real-time updates, MongoDB persistence, and customized analytics widgets.",
    technologies: ["Next.js", "Node.js", "MongoDB", "Redux Toolkit", "ShadCN UI"]
  },
  {
    title: "Full Stack MERN E-Commerce Platform",
    description: "Feature-rich e-commerce store with JWT authentication, cart management, Stripe checkout integration, and full admin management.",
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Redux"]
  },
  {
    title: "Enterprise Operational & Campaign Dashboards",
    description: "Operational dashboards supporting voucher management, election poll uploads, client campaign assignments, and analytical reporting.",
    technologies: ["Next.js", "React.js", "Tailwind CSS", "ShadCN", "REST APIs"]
  },
  {
    title: "Bound Finance Ethereum Exchange",
    description: "Crypto platform enabling users to buy and sell Ethereum securely with real-time price updates and Web3.js transaction flows.",
    technologies: ["React.js", "Wagmi", "Web3.js", "MetaMask", "Ethereum"]
  },
  {
    title: "Enterprise Vouchers & Rewards Platform",
    description: "Production website and voucher redemption engine with performance optimization and dynamic campaign routing.",
    technologies: ["Next.js 15", "React 19", "Tailwind CSS", "TypeScript"]
  },
  {
    title: "Bound Finance Landing Page",
    description: "Pixel-perfect, high-converting landing page highlighting Web3 crypto features, security protocols, and platform architecture.",
    technologies: ["React.js", "Tailwind CSS", "SEO", "Framer Motion"]
  }
];

const certifications: any[] = [
  {
    name: "MERN Stack Developer Certification",
    institution: "Techpile Technology Pvt. Ltd.",
    year: 2023
  }
];

const hobbies: any[] = [
  "Exploring Emerging AI Technologies",
  "Building Open Source Projects",
  "Tech Reading & Blogging",
  "Cricket"
];

const ResumePage: React.FC<any> = () => {
  const [showThankYou, setShowThankYou] = useState(true);

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-8 px-4 md:px-8 max-w-6xl mx-auto space-y-4" suppressHydrationWarning>
      {/* 1. Profile Header & Summary */}
      <BlurFade delay={0.2} inView>
        <ResumeHeader />
      </BlurFade>
      
      <AnimatedDivider />
      
      {/* 2. Work Experience */}
      <BlurFade delay={0.3} inView>
        <div className="pt-1">
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-2">
            <LustreText text="Work Experience" />
          </h2>
          <ResumeExperience experiences={experiences} />
        </div>
      </BlurFade>

      <AnimatedDivider />

      {/* 3. Core Technical Skills */}
      <BlurFade delay={0.4} inView>
        <div className="pt-1">
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-2">
            <LustreText text="Core Technical Skills" />
          </h2>
          <ResumeSkills skills={skills} />
        </div>
      </BlurFade>
      
      <AnimatedDivider />
      
      {/* 4. Production Projects */}
      <BlurFade delay={0.5} inView>
        <div className="pt-1">
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-2">
            <LustreText text="Production Projects" />
          </h2>
          <ResumeProjects projects={freelanceProjects} />
        </div>
      </BlurFade>
      
      <AnimatedDivider />
      
      {/* 5. Education */}
      <BlurFade delay={0.6} inView>
        <div className="pt-1">
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-2">
            <LustreText text="Education" />
          </h2>
          <ResumeEducation education={education} />
        </div>
      </BlurFade>
      
      <AnimatedDivider />
      
      {/* 6. Certifications & Hobbies */}
      <BlurFade delay={0.7} inView>
        <div className="pt-1">
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-2">
            <LustreText text="Certifications & Hobbies" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResumeCertifications certifications={certifications} />
            <ResumeHobbies hobbies={hobbies} />
          </div>
        </div>
      </BlurFade>
    </div>
  );
};

export default ResumePage;