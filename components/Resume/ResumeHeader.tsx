"use client";
import React from "react";
import { Mail, Phone, MapPin, Linkedin, Github, FileText, Download, Briefcase } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import LustreText from "../ui/lustretext";
import { PixelImage } from "../magicui/pixel-image";
import { AnimatedButton } from "../ui/animated-button";

interface ResumeHeaderProps {
  imageUrl?: string;
  name?: string;
  title?: string;
  description?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
}

const ResumeHeader: React.FC<ResumeHeaderProps> = ({
  imageUrl = "/satish.jpg",
  name = "Satish Kumar Chaubey",
  title = "Full Stack Engineer | MERN | Next.js | Node.js | TypeScript",
  description = "Full Stack Engineer with 3+ years of experience building and optimizing production web applications using React.js, Next.js, TypeScript, Node.js, Express.js, MongoDB, and Redis. Experienced in developing enterprise & banking platforms, payment workflows (PayU, Razorpay, BBPS), and high-volume bill payment applications.",
  email = "satishchaubey02@gmail.com",
  phone = "+91 8299805407",
  location = "Ghaziabad, Uttar Pradesh, India",
  linkedin = "https://linkedin.com/in/satish-chaubey",
  github = "https://github.com/satishchaubey",
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center py-2 md:py-3">
      {/* Left Info Section (Order 2 on mobile, Order 1 on desktop) */}
      <div className="lg:col-span-8 space-y-4 text-left order-2 lg:order-1">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-600 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
          <Briefcase className="w-3.5 h-3.5" /> 3+ Years Production Experience
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          <LustreText text={name} className="text-3xl md:text-5xl font-extrabold" />
        </h1>
        
        <p className="text-base md:text-lg font-bold text-teal-600 dark:text-teal-400">
          {title}
        </p>
        
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
          {description}
        </p>

        {/* Contact Pills Grid */}
        <div className="flex flex-wrap gap-2 sm:gap-3 text-xs md:text-sm pt-2">
          <a href={`mailto:${email}`} className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-accent text-foreground transition-colors">
            <Mail size={15} className="text-purple-500 flex-shrink-0" />
            <span className="truncate max-w-[200px] sm:max-w-none">{email}</span>
          </a>
          
          <a href={`tel:${phone}`} className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-accent text-foreground transition-colors">
            <Phone size={15} className="text-emerald-500 flex-shrink-0" />
            <span>{phone}</span>
          </a>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-card text-muted-foreground">
            <MapPin size={15} className="text-teal-500 flex-shrink-0" />
            <span className="truncate max-w-[180px] sm:max-w-none">{location}</span>
          </div>

          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-accent text-blue-600 dark:text-blue-400 transition-colors">
            <Linkedin size={15} className="flex-shrink-0" />
            <span>LinkedIn</span>
          </a>
          
          <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-accent text-foreground transition-colors">
            <Github size={15} className="flex-shrink-0" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      {/* Right Profile Image Section (Order 1 on mobile, Order 2 on desktop) */}
      <div className="lg:col-span-4 flex justify-center lg:justify-end order-1 lg:order-2">
        <div className="relative w-full max-w-[220px] sm:max-w-[260px]">
          <div className="relative rounded-2xl border border-border bg-card p-2.5 sm:p-3 shadow-xl overflow-hidden">
            <div className="relative overflow-hidden rounded-xl bg-neutral-950 flex justify-center items-center">
              <PixelImage src={imageUrl} grid="8x8" />
              
              <motion.div
                className="absolute bottom-3 right-3 h-3.5 w-3.5 bg-emerald-500 rounded-full border-2 border-card"
                animate={{ 
                  scale: [1, 1.25, 1],
                  boxShadow: ["0 0 0 0 rgba(16, 185, 129, 0.7)", "0 0 0 8px rgba(16, 185, 129, 0)", "0 0 0 0 rgba(16, 185, 129, 0)"]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeHeader;