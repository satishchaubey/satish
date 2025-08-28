"use client";
import React from "react";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import GlowingBorderCard from "@/components/ui/glowingbordercard";
import LustreText from "../ui/lustretext";
import { PixelImage } from "../magicui/pixel-image";


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
  about?: string;
}

const ResumeHeader: React.FC<ResumeHeaderProps> = ({
  imageUrl = "/satish.jpg",
  name = "Satish Kumar Chaubey",
  title = "Frontend Developer | Software Engineer",
  description = "Full Stack Developer passionate about building scalable, high-performance web applications with React.js, Next.js, Node.js, Express.js, NestJS, MongoDB, SQL, BullMQ, and AWS.",
  about = "Frontend Developer with 2.4 years of experience building scalable, high-performance web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js). Skilled in crafting dynamic, responsive UIs, integrating RESTful APIs, and optimizing performance for speed and efficiency.",
  email = "satishchaubey02@gmail.com",
  phone = "+91 8299805407",
  location = "Ghaziabad, India",
  linkedin = "https://www.linkedin.com/in/satish-chaubey/",
  github = "https://github.com/satishchaubey/satishchaubey",
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

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

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 150,
        delay: 0.5
      }
    },
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        type: "spring" as const,
        stiffness: 300
      }
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Info Section */}
      <motion.div
        className="order-2 md:order-1 "
        variants={itemVariants}
      >
        <motion.h1
          className="text-2xl md:text-3xl font-semibold mb-2"
          whileHover={{ scale: 1.05 }}
          variants={itemVariants}
        >
           <p className="text-2xl md:text-4xl pt-0 md:pt-10 font-extrabold bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent leading-tight drop-shadow-lg">
            <LustreText text={name} />
          </p>
        </motion.h1>
        
        <motion.p 
          className="text-gray-400 mb-4"
          variants={itemVariants}
        >
          {title}
        </motion.p>
        
        <motion.p 
          className="text-gray-500 mb-6"
          variants={itemVariants}
        >
          {description}
        </motion.p>

        {/* Contact Section */}
        <motion.div
          className="space-y-3 text-sm text-gray-400"
          variants={containerVariants}
        >
          <motion.p 
            className="flex items-center gap-2"
            variants={itemVariants}
            whileHover={{ x: 5 }}
          >
            <motion.span variants={iconVariants} whileHover="hover">
              <Mail size={16} />
            </motion.span>
            {email}
          </motion.p>
          
          <motion.p 
            className="flex items-center gap-2"
            variants={itemVariants}
            whileHover={{ x: 5 }}
          >
            <motion.span variants={iconVariants} whileHover="hover">
              <Phone size={16} />
            </motion.span>
            {phone}
          </motion.p>
          
          <motion.p 
            className="flex items-center gap-2"
            variants={itemVariants}
            whileHover={{ x: 5 }}
          >
            <motion.span variants={iconVariants} whileHover="hover">
              <MapPin size={16} />
            </motion.span>
            {location}
          </motion.p>
          
          <motion.p 
            className="flex items-center gap-2"
            variants={itemVariants}
            whileHover={{ x: 5 }}
          >
            <motion.span variants={iconVariants} whileHover="hover">
              <Linkedin size={16} />
            </motion.span>
            <Link href={linkedin} target="_blank" className="hover:underline">
              LinkedIn
            </Link>
          </motion.p>
          
          <motion.p 
            className="flex items-center gap-2"
            variants={itemVariants}
            whileHover={{ x: 5 }}
          >
            <motion.span variants={iconVariants} whileHover="hover">
              <Github size={16} />
            </motion.span>
            <Link href={github} target="_blank" className="hover:underline">
              GitHub
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Profile Image Section */}
      {/* <motion.div
        className="flex justify-center order-1 md:order-2"
        variants={itemVariants}
      >
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="  "
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
              <PixelImage src={imageUrl} grid="8x8" />
            </motion.div>
          </>
          
          <motion.div
            className="absolute bottom-8 right-8 md:bottom-6 md:right-8 h-4 w-4 md:h-5 md:w-5 bg-green-500 rounded-full border-2 border-background"
            animate={{ 
              scale: [1, 1.3, 1],
              boxShadow: ["0 0 0 0 rgba(34, 197, 94, 0.7)", "0 0 0 10px rgba(34, 197, 94, 0)", "0 0 0 0 rgba(34, 197, 94, 0)"]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div> */}
    </motion.div>
  );
};

export default ResumeHeader;