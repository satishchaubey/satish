"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Heart,
  Send,
  Github,
  Linkedin,
  ArrowUp,
  MapPin,
  Phone,
  Code2,
  Sparkles
} from "lucide-react";
import { AnimatedButton } from "../ui/animated-button";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { ThemeSwitch } from "../ui/theme-switch";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/satishchaubey",
      hoverBg: "hover:bg-slate-800 hover:text-white"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/satish-chaubey",
      hoverBg: "hover:bg-[#0A66C2] hover:text-white"
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="w-5 h-5" />,
      href: "https://wa.me/918299805407",
      hoverBg: "hover:bg-[#25D366] hover:text-white"
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:satishchaubey02@gmail.com",
      hoverBg: "hover:bg-purple-600 hover:text-white"
    }
  ];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Featured Projects", href: "#projects" },
    { name: "Skills Matrix", href: "#skills" },
    { name: "Experience & CV", href: "/resume" },
    { name: "Interactive Games", href: "/game" },
    { name: "About Me", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <footer className="relative pt-16 pb-12 border-t border-border bg-card/60 backdrop-blur-xl mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-border">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-500 via-blue-500 to-purple-600 p-[2px] shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-base font-extrabold tracking-tight text-foreground">Satish Chaubey</span>
                <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 tracking-wider">FULL STACK ENGINEER</span>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Full Stack Engineer with 3+ years of experience building production web applications, payment workflows, and high-volume banking systems.
            </p>

            <div className="space-y-2 text-xs text-muted-foreground pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-500" />
                <span>Ghaziabad, Uttar Pradesh, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-500" />
                <a href="mailto:satishchaubey02@gmail.com" className="hover:text-foreground transition-colors">
                  satishchaubey02@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500" />
                <a href="tel:+918299805407" className="hover:text-foreground transition-colors">
                  +91 8299805407
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1.5 w-fit"
                  >
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Core Tech Stack */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
              Tech Stack
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">⚡ Next.js 16 & React 19.x</li>
              <li className="flex items-center gap-2">💎 TypeScript & Redux</li>
              <li className="flex items-center gap-2">🚀 Node.js & Express</li>
              <li className="flex items-center gap-2">⚙️ NestJS & REST APIs</li>
              <li className="flex items-center gap-2">💳 PayU & Razorpay</li>
              <li className="flex items-center gap-2">🗄️ PostgreSQL & MongoDB</li>
              <li className="flex items-center gap-2">🔥 Redis & AWS / GCP</li>
            </ul>
          </div>

          {/* Column 4: Stay Connected & Socials */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
              Stay Connected
            </h4>
            <p className="text-xs text-muted-foreground">
              Subscribe or message directly for new projects and collaborations.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center gap-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-background border-border text-foreground text-xs h-10"
                  required
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-lg bg-teal-500 hover:bg-teal-600 text-white transition-colors cursor-pointer flex-shrink-0"
                  aria-label="Send"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {submitted && (
                <span className="text-xs font-semibold text-emerald-500">
                  ✓ Message received! I'll get back to you soon.
                </span>
              )}
            </form>

            <div className="pt-2">
              <span className="text-xs font-semibold text-muted-foreground block mb-2">
                Social Accounts:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 rounded-xl border border-border bg-background text-foreground transition-all duration-300 ${social.hoverBg} hover:scale-110`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
                <ThemeSwitch showHiEmoji={false} />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Scroll To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
            <span>© 2026 Satish Kumar Chaubey. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current animate-pulse" />
            <span>using Next.js 16 & Tailwind CSS.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background hover:bg-accent text-foreground transition-all cursor-pointer hover:scale-105"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;