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
        <div className="flex flex-col justify-center items-center pt-20 md:pt-24 pb-4 px-4 md:px-8 max-w-7xl mx-auto">
            {/* Top Hero Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 w-full">
                
                {/* Left Side: Hero Text & Information */}
                <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
                    
                    {/* Status Badge */}
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 self-center lg:self-start px-4 py-2.5 rounded-full border border-teal-500/30 bg-teal-500/10 backdrop-blur-md mb-8 shadow-sm"
                    >
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs md:text-sm font-semibold text-teal-700 dark:text-teal-300">
                            Available for Full Stack & Engineering Roles
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <h1 className="text-lg sm:text-3xl lg:text-5xl font-extrabold tracking-tight">
                        <LustreText text="Satish Kumar Chaubey" className="text-lg sm:text-3xl lg:text-5xl font-extrabold" />
                        
                        <div className="mt-1.5">
                            <TextHighlighter type="zigzag" highlightColor="#00ffb788" repeat>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 dark:from-teal-300 dark:via-blue-400 dark:to-purple-400 text-base sm:text-2xl lg:text-4xl font-extrabold tracking-tight">
                                    Full Stack Engineer
                                </span>
                            </TextHighlighter>
                        </div>
                    </h1>

                    {/* Typewriter Animation */}
                    <div className="mt-4 text-base sm:text-2xl font-bold flex items-center justify-center lg:justify-start gap-1.5 h-10 sm:h-12">
                        <span className="text-muted-foreground text-xs sm:text-lg font-medium">Specializing in:</span>
                        <Typeanimation
                            words={["React & Next.js", "Node.js & NestJS", "Redux & WebSockets", "PostgreSQL & MongoDB", "Tailwind & ShadCN"]}
                            typingSpeed="slow"
                            deletingSpeed="slow"
                            gradientFrom="blue-500"
                            gradientTo="purple-500"
                            pauseDuration={2000}
                            className="text-xs sm:text-xl lg:text-3xl font-extrabold text-teal-600 dark:text-teal-400"
                        />
                    </div>

                    {/* Bio Description */}
                    <p className="mt-4 sm:mt-6 text-xs sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                        I craft scalable, high-performance web applications with modern architectures. Experienced in building responsive UIs, robust backend APIs, payment integrations (BBPS, Razorpay, PayU), and real-time streaming interfaces.
                    </p>

                    {/* Action Buttons */}
                    <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:items-center justify-center lg:justify-start max-w-sm sm:max-w-none mx-auto lg:mx-0">
                        <Link href="#projects" className="w-full sm:w-auto">
                            <AnimatedButton
                                className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-teal-500/25 cursor-pointer text-xs sm:text-sm px-2.5 sm:px-5 py-2.5 flex items-center justify-center"
                                variant="default"
                                size="default"
                                glow={true}
                                textEffect="normal"
                                rounded="custom"
                                borderRadius="100px"
                                background="rgba(13, 148, 136, 0.9)"
                            >
                                <span className="truncate">Projects</span> <ArrowRight className="ml-1 w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                            </AnimatedButton>
                        </Link>

                        <Link href="/resume" className="w-full sm:w-auto">
                            <AnimatedButton
                                className="w-full border border-border text-foreground hover:bg-accent hover:text-accent-foreground font-semibold cursor-pointer text-xs sm:text-sm px-2.5 sm:px-5 py-2.5 flex items-center justify-center"
                                variant="default"
                                size="default"
                                glow={false}
                                textEffect="normal"
                                rounded="custom"
                                borderRadius="100px"
                                background="transparent"
                            >
                                <FileText className="mr-1 w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" /> <span className="truncate">Resume</span>
                            </AnimatedButton>
                        </Link>
                    </div>

                    {/* Social Quick Links */}
                    <div className="mt-6 flex items-center justify-center lg:justify-start gap-4">
                        <a
                            href="https://github.com/satishchaubey"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full border border-border bg-background/50 hover:bg-accent hover:scale-110 transition-all text-foreground"
                            aria-label="GitHub"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                        <a
                            href="https://linkedin.com/in/satish-chaubey"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full border border-border bg-background/50 hover:bg-accent hover:scale-110 transition-all text-blue-600 dark:text-blue-400"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <Link
                            href="/contact"
                            className="p-2.5 rounded-full border border-border bg-background/50 hover:bg-accent hover:scale-110 transition-all text-purple-600 dark:text-purple-400"
                            aria-label="Contact"
                        >
                            <Mail className="w-4 h-4" />
                        </Link>
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
                        <div className="absolute -inset-1.5 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600 rounded-3xl blur-xl opacity-30 animate-pulse" />

                        {/* Card Container */}
                        <motion.div
                            className="relative rounded-3xl border border-border bg-card/80 backdrop-blur-xl p-6 shadow-2xl overflow-hidden"
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            {/* Pixel Art / Image Container */}
                            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-neutral-950 flex justify-center items-center">
                                <PixelImage src={`/satish.jpg`} grid="8x8" />

                                {/* Online Pulse Badge */}
                                <motion.div
                                    className="absolute bottom-4 right-4 h-4 w-4 bg-emerald-500 rounded-full border-2 border-card z-20"
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
                            <div className="mt-4 flex flex-wrap gap-2 justify-center">
                                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-300 border border-teal-500/20">
                                    ⚡ Next.js 16
                                </span>
                                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-300 border border-blue-500/20">
                                    🚀 NestJS
                                </span>
                                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20">
                                    💎 React 19.x
                                </span>
                                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/20">
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
                className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full items-stretch"
            >
                {stats.map((stat, idx) => (
                    <div 
                        key={idx}
                        className="p-3.5 sm:p-5 rounded-2xl border border-border bg-card/60 backdrop-blur-md hover:bg-card/90 transition-all duration-300 flex flex-col items-center justify-between text-center shadow-md group hover:scale-[1.03] min-h-[140px] sm:min-h-[160px]"
                    >
                        <div className="p-2.5 sm:p-3 rounded-xl bg-background border border-border mb-2 group-hover:scale-110 transition-transform">
                            {stat.icon}
                        </div>
                        <div className="flex flex-col items-center justify-center flex-1">
                            <span className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                                <NumberCounter value={stat.value} />
                            </span>
                            <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-muted-foreground mt-1 leading-tight text-center">
                                {stat.label}
                            </span>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
