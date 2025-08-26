"use client";

import Globe from "@/components/ui/globe";
import LustreText from "@/components/ui/lustretext";
import TextHighlighter from "@/components/ui/text-highlighter";
import Typeanimation from '@/components/ui/typeanimation';

export default function VenomBeamDemo() {
    return (
        <div className=" md:pt-30 ">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                {/* Left Side: Text */}
                <div className="flex flex-col justify-center text-center md:text-left">
                    <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                        Hi,I'm  {" "}
                        <LustreText text=" Satish Chaubey" />
                        <br />
                        <div className="font-extrabold tracking-tight  leading-snug">
                            <TextHighlighter type="zigzag" highlightColor="#00ffb7ff" repeat>
                                <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
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
                    <p className="mt-4 text-base md:text-lg text-neutral-700 dark:text-neutral-400">
                        I build scalable, high-performance web applications using modern technologies. On the frontend, I craft responsive UIs with Next.js, React, TailwindCSS, ShadCN, and Framer Motion. On the backend, I develop reliable systems with NestJS, Node.js, BullMQ, and Express, backed by SQL/MongoDB and deployed on AWS/GCP. I also leverage Redux Toolkit and WebSockets to deliver fast, real-time, and seamless digital experiences.
                    </p>
                </div>

                {/* Right Side: Globe */}
                <div className="flex justify-center">
                    <Globe
                        rotateCities={["delhi", "gorakhpur"]}
                        rotationSpeed={3000}
                        markers={[
                            { location: [28.6139, 77.2090], size: 0.1 }, // Delhi
                            { location: [26.7606, 83.3732], size: 0.1 }, // Gorakhpur
                        ]}
                        glowColor={[0.1, 0.8, 1]}
                        markerColor={[0.1, 0.8, 1]}
                    // className="max-w-[500px] w-full"
                    />
                </div>
            </div>
        </div>
    );
}
