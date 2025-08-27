"use client";

import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Heart,
  Send,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube
} from "lucide-react";
import { AnimatedButton } from "../ui/animated-button";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { SiUpwork, SiFiverr } from 'react-icons/si'
import { ThemeSwitch } from "../ui/theme-switch";


const Footer = () => {
  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5 text-[#333]" />,
      href: "https://github.com/satishchaubey/satishchaubey",
      color: "hover:text-gray-400"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5 text-[#0A66C2]" />,
      href: "https://www.linkedin.com/in/satish-chaubey/",
      color: "hover:text-blue-400"
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5 text-[#E1306C]" />,
      href: "https://instagram.com/yourusername",
      color: "hover:text-pink-400"
    },
    {
      name: "YouTube",
      icon: <Youtube className="w-5 h-5 text-[#E1306C]" />,
      href: "https://youtube.com/yourusername",
      color: "hover:text-red-400"
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="w-5 h-5 text-[#25D366]" />,
      href: "https://youtube.com/yourusername",
      color: "hover:text-red-400"
    },
    {
      name: "Fiverr",
      icon: <SiFiverr className="w-5 h-5 text-[#6fda44]" />,
      href: "https://youtube.com/yourusername",
      color: "hover:text-red-400"
    },
    {
      name: "Upwork",
      icon: <SiUpwork className="w-5 h-5 text-[#1DBF73]" />,
      href: "https://youtube.com/yourusername",
      color: "hover:text-red-400"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const, // 👈 fix here
      },
    },
  };

  return (
    <footer className="relative ">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/10 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
        >
          {/* Left Section - Contact Form */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-4">
              <motion.h2
                variants={itemVariants}
                className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Let's Connect
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-gray-400 text-lg max-w-md" >
                Feel free to drop a message or follow on my social profiles below.
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 h-12 flex-1"
                />
                <AnimatedButton
                  className="bg-blue-400 text-white cursor-pointer"
                  variant="default"
                  size="default"
                  glow={true}
                  textEffect="normal"
                  uppercase={true}
                  rounded="custom"
                  asChild={false}
                  hideAnimations={false}
                  shimmerColor="#008080"
                  shimmerSize="0.15em"
                  shimmerDuration="3s"
                  borderRadius="100px"
                  background="rgba(0, 0, 0, 1)"
                >
                  <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Contact Me
                </AnimatedButton>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Section - Social Links */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-6">
              <motion.h3
                variants={itemVariants}
                className="text-xl font-semibold text-white"
              >
                Follow Me
              </motion.h3>

              <motion.div
                variants={containerVariants}
                className="flex flex-wrap gap-4"
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    variants={itemVariants}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 border border-gray-700 text-gray-300 ${social.color} hover:scale-110 transition-all duration-300 group relative overflow-hidden`}
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.a>
                ))}
                <ThemeSwitch
                  showHiEmoji={true}
                />
              </motion.div>
            </div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-950 dark:text-white">Quick Links</h4>
              <div className="flex flex-wrap gap-6 text-gray-400">
                {["Home"].map((link) => (
                  <motion.div
                    key={link}
                    className="hover:text-white transition-colors duration-200"
                    whileHover={{ x: 5 }}
                  >
                    <Link href={`/`}>{link}</Link>
                  </motion.div>
                ))}
                {["Experience"].map((link) => (
                  <motion.div
                    key={link}
                    className="hover:text-white transition-colors duration-200"
                    whileHover={{ x: 5 }}
                  >
                    <Link href={`/resume`}>{link}</Link>
                  </motion.div>
                ))}
                {["Game", "About", "Contact"].map((link) => (
                  <motion.div
                    key={link}
                    className="hover:text-white transition-colors duration-200"
                    whileHover={{ x: 5 }}
                  >
                    <Link href={`/${link.toLowerCase()}`}>{link}</Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center text-gray-400">
            <span>© 2025 Satish Kumar Chaubey. All rights reserved.</span>
            <Heart className="w-4 h-4 mx-1 text-red-500 fill-current animate-pulse" />
          </div>
        </motion.div>
        {/* Floating Elements */}
        <motion.div
          className="absolute bottom-10 right-10 opacity-10"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Mail className="w-20 h-20" />
        </motion.div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />

    </footer>
  );
};

export default Footer;