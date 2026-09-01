"use client";

import LustreText from "@/components/ui/lustretext";
import TextHighlighter from "@/components/ui/text-highlighter";
import Typeanimation from "@/components/ui/typeanimation";
import { motion, useInView } from "framer-motion";
import { PixelImage } from "../magicui/pixel-image";
import Link from "next/link";
import { ArrowRight, Code2, FileText, Github, Linkedin, Mail, Sparkles, Terminal, CheckCircle2 } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { useEffect, useRef, useState } from "react";

// Animated Number Counter Component
const NumberCounter = ({ value }: { value: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const match = value.match(/^([\d.]+)(.*)$/);
  const targetNumber = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    if (!isInView || targetNumber === 0) return;

    let start = 0;
    const duration = 1600; // 1.6s counting animation
    const steps = 40;
    const increment = targetNumber / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, targetNumber]);

  const formattedCount = Number.isInteger(targetNumber)
    ? Math.round(count)
    : count.toFixed(1);

  return (
    <span ref={ref}>
      {isInView ? formattedCount : "0"}{suffix}
    </span>
  );
};

export default function VenomBeamDemo() {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100
            }
        }
    };

    const stats = [
        { label: "Years Experience", value: "3+", icon: <Terminal className="w-5 h-5 text-teal-500" /> },
        { label: "Projects Delivered", value: "15+", icon: <Code2 className="w-5 h-5 text-purple-500" /> },
        { label: "Tech Stack Mastery", value: "10+", icon: <Sparkles className="w-5 h-5 text-amber-500" /> },
        { label: "Uptime & Quality", value: "99.9%", icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" /> }
    ];

    return (
        <div className="flex flex-col justify-center items-center pt-20 md:pt-24 pb-8 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
            {/* Top Hero Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12 w-full">
                
                {/* Left Side: Hero Text & Information */}
                <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1 space-y-6">
                    
                    {/* Status Badge (Commented Out)
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2.5 self-center lg:self-start px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 backdrop-blur-md shadow-sm"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-teal-700 dark:text-teal-300 tracking-wide">
                            Available for Full Stack & Engineering Roles
                        </span>
                    </motion.div>
                    */}

                    {/* Main Headline */}
                    <div className="space-y-2">
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none">
                            <LustreText text="Satish Kumar Chaubey" className="text-3xl sm:text-5xl lg:text-6xl font-black" />
                        </h1>
                        
                        <div className="pt-1">
                            <TextHighlighter type="zigzag" highlightColor="#00ffb788" repeat>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 dark:from-teal-300 dark:via-blue-400 dark:to-purple-400 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                                    Full Stack Engineer
                                </span>
                            </TextHighlighter>
                        </div>
                    </div>

                    {/* Typewriter Animation Pill */}
                    <div className="flex items-center justify-center lg:justify-start">
                        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-card border border-border shadow-sm text-xs sm:text-sm font-semibold max-w-full overflow-hidden">
                            <span className="text-muted-foreground font-mono flex-shrink-0">Specializing in:</span>
                            <Typeanimation
                                words={["React & Next.js 16", "Node.js & NestJS", "BBPS & Payment Gateways", "PostgreSQL & MongoDB", "Tailwind & TypeScript"]}
                                typingSpeed="slow"
                                deletingSpeed="slow"
                                gradientFrom="teal-500"
                                gradientTo="blue-500"
                                pauseDuration={2200}
                                className="text-xs sm:text-sm md:text-base font-extrabold text-teal-600 dark:text-teal-400 truncate"
                            />
                        </div>
                    </div>

                    {/* Bio Description */}
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                        I build high-scale, production-ready web applications & APIs with modern full-stack architectures. Specialized in crafting responsive frontends, payment integrations (BBPS, PayU, Razorpay), real-time automation tools, and cloud backend engines.
                    </p>

                    {/* Core Specialization Pills Grid */}
                    <div className="grid grid-cols-2 gap-2 pt-1 max-w-xl mx-auto lg:mx-0">
                        {[
                            { title: "Full Stack SaaS", desc: "Next.js 16, React 19, TypeScript", icon: "🚀" },
                            { title: "Payment Systems", desc: "BBPS, Razorpay, PayU Integration", icon: "💳" },
                            { title: "Backend APIs", desc: "Node.js, NestJS, PostgreSQL, Mongo", icon: "⚙️" },
                            { title: "AI & Automation", desc: "Lead Mailers, AI Tools & Scripts", icon: "🤖" },
                        ].map((spec, i) => (
                            <div
                                key={i}
                                className="p-2.5 rounded-xl border border-border/80 bg-card/60 backdrop-blur-sm flex items-center gap-2.5 text-left transition-all hover:bg-card hover:border-teal-500/40"
                            >
                                <span className="text-base flex-shrink-0">{spec.icon}</span>
                                <div className="min-w-0">
                                    <div className="text-xs font-bold text-foreground truncate">{spec.title}</div>
                                    <div className="text-[10px] text-muted-foreground truncate">{spec.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons & Socials */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-3 w-full sm:w-auto">
                            <Link href="#projects" className="w-full sm:w-auto">
                                <AnimatedButton
                                    className="w-full bg-gradient-to-r from-teal-500 via-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:shadow-teal-500/25 cursor-pointer text-xs sm:text-sm px-5 py-2.5 flex items-center justify-center rounded-full"
                                    variant="default"
                                    size="default"
                                    glow={true}
                                    textEffect="normal"
                                    rounded="custom"
                                    borderRadius="100px"
                                    background="rgba(13, 148, 136, 0.95)"
                                >
                                    <span>Explore Projects</span> <ArrowRight className="ml-1.5 w-4 h-4 flex-shrink-0" />
                                </AnimatedButton>
                            </Link>

                            <Link href="/resume" className="w-full sm:w-auto">
                                <AnimatedButton
                                    className="w-full border border-border text-foreground hover:bg-accent hover:text-accent-foreground font-semibold cursor-pointer text-xs sm:text-sm px-5 py-2.5 flex items-center justify-center rounded-full"
                                    variant="default"
                                    size="default"
                                    glow={false}
                                    textEffect="normal"
                                    rounded="custom"
                                    borderRadius="100px"
                                    background="transparent"
                                >
                                    <FileText className="mr-1.5 w-4 h-4 flex-shrink-0" /> <span>Resume</span>
                                </AnimatedButton>
                            </Link>
                        </div>

                        {/* Social Quick Links */}
                        <div className="flex items-center gap-2">
                            <a
                                href="https://github.com/satishchaubey"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-full border border-border bg-card hover:bg-accent hover:border-teal-500/50 hover:scale-110 transition-all text-foreground"
                                aria-label="GitHub"
                                title="GitHub Profile"
                            >
                                <Github className="w-4 h-4" />
                            </a>
                            <a
                                href="https://linkedin.com/in/satish-chaubey"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-full border border-border bg-card hover:bg-accent hover:border-blue-500/50 hover:scale-110 transition-all text-blue-600 dark:text-blue-400"
                                aria-label="LinkedIn"
                                title="LinkedIn Profile"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <Link
                                href="/contact"
                                className="p-2.5 rounded-full border border-border bg-card hover:bg-accent hover:border-purple-500/50 hover:scale-110 transition-all text-purple-600 dark:text-purple-400"
                                aria-label="Contact"
                                title="Send Email / Contact"
                            >
                                <Mail className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Side: Profile Card & Floating Badges */}
                <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
                    <motion.div
                        className="relative w-full max-w-md"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Decorative Gradient Backdrop Glow */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-25 animate-pulse" />

                        {/* Card Container */}
                        <motion.div
                            className="relative rounded-3xl border border-border bg-card/90 backdrop-blur-2xl p-5 sm:p-6 shadow-2xl overflow-hidden space-y-4"
                            whileHover={{ y: -4 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            {/* Header Status Bar inside Profile Card */}
                            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground pb-1">
                                <span className="flex items-center gap-1.5 text-emerald-500 font-bold">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                                    Online & Ready
                                </span>
                                <span className="text-[11px] font-mono text-muted-foreground">New Delhi, India 🇮🇳</span>
                            </div>

                            {/* Pixel Art / Image Container */}
                            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-neutral-950 flex justify-center items-center">
                                <PixelImage src={`/satish.jpg`} grid="8x8" />

                                {/* Online Pulse Badge */}
                                <motion.div
                                    className="absolute bottom-3 right-3 h-4 w-4 bg-emerald-500 rounded-full border-2 border-card z-20"
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

                            {/* Floating Tech Badges */}
                            <div className="flex flex-wrap gap-2 justify-center">
                                <span className="px-3 py-1 text-xs font-bold rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-300 border border-teal-500/30">
                                    ⚡ Next.js 16
                                </span>
                                <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-300 border border-blue-500/30">
                                    🚀 NestJS
                                </span>
                                <span className="px-3 py-1 text-xs font-bold rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/30">
                                    💎 React 19.x
                                </span>
                                <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/30">
                                    🔥 MERN Stack
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Key Statistics Bar */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full items-stretch"
            >
                {stats.map((stat, idx) => (
                    <div 
                        key={idx}
                        className="p-4 sm:p-5 rounded-2xl border border-border bg-card/70 backdrop-blur-md hover:bg-card hover:border-teal-500/40 transition-all duration-300 flex flex-col items-center justify-between text-center shadow-md group hover:scale-[1.02] min-h-[130px] sm:min-h-[150px]"
                    >
                        <div className="p-2.5 sm:p-3 rounded-xl bg-background border border-border mb-2 group-hover:scale-110 transition-transform">
                            {stat.icon}
                        </div>
                        <div className="flex flex-col items-center justify-center flex-1">
                            <span className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                                <NumberCounter value={stat.value} />
                            </span>
                            <span className="text-[11px] sm:text-xs md:text-sm font-bold text-muted-foreground mt-1 leading-tight text-center">
                                {stat.label}
                            </span>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
