"use client";

import NavbarFlow from "@/components/ui/navbar-flow";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { Code2, Terminal } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";

export default function NavbarFlowDemo() {
    const [showNavbar] = useState(true);

    return (
        <div className="relative not-prose w-full ">
            {showNavbar && (
                <div className="fixed top-0 left-0 right-0 z-50">
                    <NavbarFlow
                        emblem={
                            <Link href="/" className="flex items-center gap-1.5 p-1 sm:p-1.5 group cursor-pointer" aria-label="Home">
                                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-teal-500 via-blue-500 to-purple-600 p-[2px] shadow-md shadow-teal-500/20 group-hover:scale-105 transition-all">
                                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                                        <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 dark:text-teal-400 group-hover:rotate-12 transition-transform duration-300" />
                                    </div>
                                </div>
                                <div className="hidden sm:flex flex-col text-left pr-2">
                                    <span className="text-sm font-extrabold tracking-tight text-foreground leading-none">Satish</span>
                                    <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 tracking-wider">DEV.IO</span>
                                </div>
                            </Link>
                        }
                        links={[
                            {
                                text: "Home",
                                url: "/",
                            },
                            {
                                text: "Experience",
                                url: "/resume",
                            },
                            {
                                text: "AI Assistant",
                                url: "/ai-playground",
                            },
                            {
                                text: "Games",
                                url: "/game",
                            },
                            //   {
                            //     text: "Products",
                            //     submenu: (
                            //       <div className="flex flex-col space-y-2">
                            //         <HoverLink url="/products/electronics">Electronics</HoverLink>
                            //         <HoverLink url="/products/clothing">Clothing</HoverLink>
                            //         <HoverLink url="/products/books">Books</HoverLink>
                            //         <HoverLink url="/products/home">Home & Garden</HoverLink>
                            //       </div>
                            //     ),
                            //   },
                            //   {
                            //     text: "Services",
                            //     submenu: (
                            //       <div className="grid grid-cols-1 gap-2 w-48">
                            //         <FeatureItem
                            //           heading="Web Development"
                            //           url="/services/web-development"
                            //           info="Custom websites and web applications"
                            //         />
                            //         <FeatureItem
                            //           heading="Mobile Apps"
                            //           url="/services/mobile-apps"
                            //           info="iOS and Android application development"
                            //         />
                            //         <FeatureItem
                            //           heading="Consulting"
                            //           url="/services/consulting"
                            //           info="Expert advice for your business"
                            //         />
                            //         <FeatureItem
                            //           heading="Support"
                            //           url="/services/support"
                            //           info="24/7 technical support services"
                            //         />
                            //       </div>
                            //     ),
                            //   },
                            //   {
                            //     text: "Blog",
                            //     submenu: (
                            //       <div className="flex flex-col space-y-2">
                            //         <HoverLink url="/blog/technology">Technology</HoverLink>
                            //         <HoverLink url="/blog/design">Design</HoverLink>
                            //         <HoverLink url="/blog/business">Business</HoverLink>
                            //         <HoverLink url="/blog/tutorials">Tutorials</HoverLink>
                            //       </div>
                            //     ),
                            //   },
                            {
                                text: "About",
                                url: "/about"
                            },
                            {
                                text: "Contact",
                                url: "/contact"
                            },
                        ]}
                        rightComponent={
                            <ThemeSwitch
                                showHiEmoji={true}
                            />
                        }
                    />
                </div>
            )}
           
        </div>
    );
}