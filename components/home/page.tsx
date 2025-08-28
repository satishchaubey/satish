"use client";

import Globe from "@/components/ui/globe";
import LustreText from "@/components/ui/lustretext";
import TextHighlighter from "@/components/ui/text-highlighter";
import Typeanimation from '@/components/ui/typeanimation';
import { motion } from "framer-motion";
import { PixelImage } from "../magicui/pixel-image";

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
        <div className="flex justify-center items-center min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                {/* Left Side: Text */}
                <div className="flex flex-col justify-center text-center md:text-left order-2 md:order-1">
                    <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                        <LustreText text="Hi,I'm Satish Chaubey" className="text-3xl md:text-5xl font-extrabold text-teal-600" />
                        <br />
                        <div className="font-extrabold">
                            <TextHighlighter type="zigzag" highlightColor="#00ffb7ff" repeat>
                                <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-xl lg:text-4xl font-bold tracking-tight ">
                                    Full Stack Engineer
                                </span>
                            </TextHighlighter>
                            <br />
                            <Typeanimation
                                words={["React JS", "Next JS", "Node JS", "Nest JS", "Redux Toolkit", "ShadCN", "Tailwind"]}
                                typingSpeed="slow"
                                deletingSpeed="slow"
                                gradientFrom="red-500"
                                gradientTo="yellow-500"
                                pauseDuration={2000}
                                className="text-3xl md:text-5xl font-extrabold text-teal-600"
                            />
                        </div>
                    </h2>
                    <p className="mt-4 p-4 md:p-0  text-base md:text-lg text-neutral-700 dark:text-neutral-400">
                        I build scalable, high-performance web applications using modern technologies. On the frontend, I craft responsive UIs with Next.js, React, TailwindCSS, ShadCN, and Framer Motion. On the backend, I develop reliable systems with NestJS, Node.js, BullMQ, and Express, backed by SQL/MongoDB and deployed on AWS/GCP. I also leverage Redux Toolkit and WebSockets to deliver fast, real-time, and seamless digital experiences.
                    </p>
                </div>

                {/* Right Side: Globe */}
                <div className="flex justify-center order-1 md:order-2 pt-10 md:pt-0">
                    {/* <Globe
                        rotateCities={["delhi", "gorakhpur"]}
                        rotationSpeed={3000}
                        markers={[
                            { location: [28.6139, 77.2090], size: 0.1 }, // Delhi
                            { location: [26.7606, 83.3732], size: 0.1 }, // Gorakhpur
                        ]}
                        glowColor={[0.1, 0.8, 1]}
                        markerColor={[0.1, 0.8, 1]}
                    // className="max-w-[500px] w-full"
                    /> */}
                    {/* Profile Image Section */}
                    <motion.div
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
                                    <PixelImage src={`/satish.jpg`} grid="8x8" />
                                </motion.div>
                            </>

                            {/* Online Status Indicator */}
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
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
