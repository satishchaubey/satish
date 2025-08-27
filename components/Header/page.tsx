"use client";

import NavbarFlow from "@/components/ui/navbar-flow";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { Sun, Moon } from "lucide-react";
import React, { useState } from "react";

export default function NavbarFlowDemo() {
    const [showNavbar] = useState(true);

    return (
        <div className="relative not-prose w-full ">
            {showNavbar && (
                <div className="fixed top-0 left-0 right-0 z-50">
                    <NavbarFlow
                        emblem={
                            <>
                                <img src={`https://storage.googleapis.com/public-images-plutosone/cbms/campaign/image-1756189253048-assets_task_01k3h78k1te6jr0jyt2kebg97e_1756145983_img_1.webp`}
                                    alt="logo"
                                    className="w-14 h-14 rounded-full object-fill"
                                />
                            </>
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