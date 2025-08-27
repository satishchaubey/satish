"use client";

import { HomeIcon, BriefcaseIcon, GamepadIcon, UserIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "@/components/magicui/dock";

export type IconProps = React.HTMLAttributes<SVGElement>;

// Define your navigation items
const NAV_ITEMS = [
  { href: "/", icon: HomeIcon, label: "Home" },
  { href: "/resume", icon: BriefcaseIcon, label: "Experience" },
  { href: "/game", icon: GamepadIcon, label: "Games" },
  { href: "/about", icon: UserIcon, label: "About" },
  { href: "/contact", icon: MailIcon, label: "Contact" },
];

export function PortfolioDock() {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <TooltipProvider>
        <Dock direction="middle" className="bg-background/80 backdrop-blur-md rounded-full border shadow-lg p-2">
          {NAV_ITEMS.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full hover:bg-primary/10 transition-colors"
                    )}
                  >
                    <item.icon className="size-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        </Dock>
      </TooltipProvider>
    </div>
  );
}