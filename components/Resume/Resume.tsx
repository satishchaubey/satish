// components/resume/Resume.tsx
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
import FloatingResumeDownload from "../comman/Download";
import ThankYou from "../comman/ThankYou";

const experiences: any[] = [
  {
    role: "Software Engineer (Frontend)",
    company: "Plutos One Pvt Ltd",
    period: "Feb 2024 - Present",
    description: [
      "Maintained and developed the Plutos One website, AI SaaS platform, and multiple banking campaigns using Next.js 15 mono-repo.",
      "Integrated PayU and Razorpay payment gateways ensuring secure transactions.",
      "Built and optimized dynamic Next.js applications managing 30+ campaigns with efficient routing.",
      "Developed CBMS, EMS (poll uploads), and VMS (voucher uploads & campaign assignment) dashboards to streamline client management.",
      "Enhanced API performance, reducing page load times by 20%."
    ],
    technologies: ["Next.js 15", "React.js", "TailwindCSS", "ShadCN", "REST APIs", "PayU", "Razorpay"]
  },
  {
    role: "Frontend Developer",
    company: "Speqto Technology Pvt Ltd",
    period: "Jun 2023 - Jan 2024",
    description: [
      "Built reusable UI components with React.js, Next.js, and Vite; integrated RESTful APIs and Binance Smart Chain (BSC) smart contracts.",
      "Implemented secure decentralized wallet features with a focus on responsiveness, cross-browser compatibility, and performance optimization."
    ],
    technologies: ["React.js", "Next.js", "Vite", "TailwindCSS", "REST APIs", "Blockchain", "BSC"]
  },
  {
    role: "Freelance Frontend Developer",
    company: "Trading Solutions",
    period: "Aug 2024 - Present",
    description: [
      "Developing a modern trading solution platform with a focus on speed, responsiveness, and scalability using Next.js.",
      "Leveraged ShadCN UI components and TailwindCSS to design a sleek, consistent, and user-friendly interface.",
      "Implemented reusable, accessible UI components for dashboards, trading charts, and user portfolios.",
      "Optimized frontend performance and API integrations to ensure seamless real-time trading interactions."
    ],
    technologies: ["Next.js", "ShadCN", "TailwindCSS", "TypeScript"]
  },
  {
    role: "MERN Stack Developer (Internship)",
    company: "Techpile Technology Pvt Ltd",
    period: "Jun 2022 - May 2023",
    description: [
      "Developed web applications using MongoDB, Express.js, React.js, and Node.js.",
      "Created responsive, interactive UIs with React.js, Redux, and Bootstrap."
    ],
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Redux", "Bootstrap"]
  },
  {
    role: "Freelance Frontend Developer",
    company: "Bound Finance (Crypto Trading Platform)",
    period: "Dec 2023 - Jan 2024",
    description: [
      "Developed the frontend for Bound Finance, a crypto trading platform.",
      "Integrated MetaMask wallet connection using wagmi hooks.",
      "Built responsive UI with React.js and optimized performance for smooth Web3 interactions."
    ],
    technologies: ["React.js", "Wagmi", "MetaMask", "Web3.js", "TailwindCSS", "Blockchain"]
  },
  {
    role: "Freelance Frontend Developer",
    company: "Bound Finance Landing Page",
    period: "Dec 2023",
    description: [
      "Designed and developed a modern, responsive landing page for Bound Finance to highlight platform features and educate users on its working model.",
      "Implemented pixel-perfect UI components using React.js and TailwindCSS, ensuring seamless responsiveness across devices.",
      "Optimized load performance and SEO, resulting in faster rendering and improved visibility."
    ],
    technologies: ["React.js", "TailwindCSS"]
  },
  {
    role: "Freelance Frontend Developer",
    company: "Bound Finance Ethernet",
    period: "Ongoing",
    description: [
      "Currently building a crypto trading platform where users can securely buy and sell Ethereum with real-time price updates.",
      "Integrated wallet connection and transaction features using Wagmi hooks and Web3.js, ensuring smooth MetaMask interactions.",
      "Focused on scalability and performance to handle high-volume Web3 transactions efficiently."
    ],
    technologies: ["React.js", "Wagmi", "Web3.js", "Blockchain"]
  },
  {
    role: "Freelance Frontend Developer",
    company: "Udenz Book Appointment",
    period: "Nov 2023",
    description: [
      "Developed a healthcare booking platform where patients can easily schedule doctor appointments and manage prescriptions online.",
      "Created an intuitive UI with React.js and TailwindCSS, improving user experience for both patients and doctors.",
      "Enhanced accessibility and responsiveness, enabling seamless use across mobile and desktop devices."
    ],
    technologies: ["React.js", "TailwindCSS"]
  },

];

const education: any[] = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "ITM, GIDA, Gorakhpur",
    period: "2020 - 2023",
    description: [
      "Gained strong fundamentals in programming, data structures, and web technologies.",
      "Focused on practical learning through projects involving MERN stack and software development.",
      "Built problem-solving and analytical skills with hands-on coding experience."
    ]
  },
  {
    degree: "Higher Secondary Education (12th - PCM)",
    institution: "Shree Ram Swaroop Inter College, Payagpur, Bahraich",
    // period: "2018 - 2020",
    description: [
      "Specialized in Physics, Chemistry, and Mathematics.",
      "Developed logical thinking and technical aptitude, forming the base for software studies."
    ]
  },
  {
    degree: "Secondary Education (10th)",
    institution: "City Montessori School, Bahraich",
    // period: "2017 - 2018",
    description: [
      "Completed foundational education with a focus on Mathematics and Science.",
      "Sparked early interest in computers and technology."
    ]
  }
];


const skills: any[] = [
  { name: "React.js", category: "Frontend", proficiency: 5 },
  { name: "Next.js (Latest)", category: "Frontend", proficiency: 5 },
  { name: "Redux Toolkit / Thunk", category: "Frontend", proficiency: 4 },
  { name: "JavaScript (ES6+)", category: "Frontend", proficiency: 5 },
  { name: "HTML5", category: "Frontend", proficiency: 5 },
  { name: "CSS3 / SCSS", category: "Frontend", proficiency: 4 },
  { name: "TailwindCSS", category: "Frontend", proficiency: 5 },
  { name: "Bootstrap / MUI / ShadCN", category: "Frontend", proficiency: 4 },
  { name: "REST API Integration", category: "Other", proficiency: 5 },
  { name: "Payment Gateways (PayU, Razorpay)", category: "Other", proficiency: 4 },
  { name: "Microservices", category: "Backend", proficiency: 3 },
  { name: "Docker / Jenkins", category: "DevOps", proficiency: 3 },
  { name: "Git, GitHub, Postman, Jira", category: "Tools", proficiency: 5 },
  { name: "Performance Optimization", category: "Other", proficiency: 4 }
];

const freelanceProjects = [
  {
    title: "Featured Projects",
    description: " Portfolio projects coming soon. Check my GitHub for current work.",
    technologies: ["Next.js", "TailwindCSS", "TypeScript", "ShadCN"]
  },
  {
    title: "Trading Solutions",
    description: "A modern trading solution platform focused on speed, responsiveness, and scalability. Implemented reusable dashboards, trading charts, and portfolio components with optimized API integrations.",
    technologies: ["Next.js", "ShadCN", "TailwindCSS", "TypeScript"]
  },
  {
    title: "Bound Finance (Crypto Trading Platform)",
    description: "Frontend for a crypto trading platform with MetaMask integration, built responsive UI, and optimized performance for smooth Web3 interactions.",
    technologies: ["React.js", "Wagmi", "MetaMask", "Web3.js", "TailwindCSS", "Blockchain"]
  },
  {
    title: "Bound Finance Landing Page",
    description: "Responsive landing page for Bound Finance, featuring pixel-perfect UI, SEO optimization, and seamless cross-device responsiveness.",
    technologies: ["React.js", "TailwindCSS"]
  },
  {
    title: "Bound Finance Ethernet",
    description: "Ongoing project for a crypto trading platform enabling secure Ethereum trading with real-time updates and wallet integration.",
    technologies: ["React.js", "Wagmi", "Web3.js", "Blockchain"]
  },
  {
    title: "Udenz Book Appointment",
    description: "Healthcare booking platform for scheduling doctor appointments and managing prescriptions with an intuitive, responsive UI.",
    technologies: ["React.js", "TailwindCSS"]
  }
];

const certifications: any[] = [
  {
    name: "MERN Stack Developer Certification",
    institution: "Techpile Technology Pvt Ltd",
    year: 2023
  }
];

const hobbies: any[] = [
  "Exploring Emerging Technologies",
  "Traveling",
  "Book Reading",
  "Cricket"
];


const ResumePage: React.FC<any> = () => {
  const [showThankYou, setShowThankYou] = useState(true);

  return (
    <div className="min-h-screen py-8 px-4" suppressHydrationWarning>
      <BlurFade delay={0.5} inView>
        <>
          <ResumeHeader />
        </>
      </BlurFade>
      <AnimatedDivider />
      <BlurFade delay={0.5} inView>
        <>
          <h2 className="text-2xl  md:text-4xl  font-extrabold bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent leading-tight drop-shadow-lg">
            <LustreText text="Work Experience" />
          </h2>
          <ResumeExperience
            experiences={experiences}
          />
        </>
      </BlurFade>
      <BlurFade delay={0.5} inView>
        <>
          <h2 className="text-2xl md:text-4xl pt-30  font-extrabold bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent leading-tight drop-shadow-lg">
            <LustreText text="Skills" />
          </h2>
          <ResumeSkills
            skills={skills}
          />
        </>
      </BlurFade>
      <AnimatedDivider />
      <BlurFade delay={0.5} inView>
        <>
          <h2 className="text-2xl  md:text-4xl  font-extrabold bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent leading-tight drop-shadow-lg">
            <LustreText text="Education " />
          </h2>
          <ResumeEducation
            education={education}
          />
        </>
      </BlurFade>
      <AnimatedDivider />
      <BlurFade delay={0.5} inView>
        <>
          <h2 className="text-2xl  md:text-4xl  font-extrabold bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent leading-tight drop-shadow-lg">
            <LustreText text="Projects" />
          </h2>
          <ResumeProjects
            projects={freelanceProjects}
          />
        </>
      </BlurFade>
      <AnimatedDivider />
      <BlurFade delay={0.5} inView>
        <>
          <h2 className="text-2xl  md:text-4xl  font-extrabold bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent leading-tight drop-shadow-lg">
            <LustreText text="Certifications" />
          </h2>
          <ResumeCertifications certifications={certifications} />
        </>
      </BlurFade>
      <AnimatedDivider />
      <BlurFade delay={0.5} inView>
        <>
          <h2 className="text-2xl  md:text-4xl  font-extrabold bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent leading-tight drop-shadow-lg">
            <LustreText text="Hobbies & Interests" />
          </h2>
          <ResumeHobbies hobbies={hobbies} />
        </>
      </BlurFade>


      <ThankYou
        onButtonClick={() => setShowThankYou(false)}
        autoDismiss={true}
        dismissTime={3000}
        title="Professional Experience"
        message="A journey of building impactful products, solving problems, and collaborating with amazing teams and clients."
      />
      
      <FloatingResumeDownload />
    </div>
  );
};

export default ResumePage;