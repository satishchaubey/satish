"use client";

import { HomeIcon, BriefcaseIcon, GamepadIcon, UserIcon, MailIcon, BotIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "@/components/magicui/dock";

const NAV_ITEMS = [
  { href: "/", icon: HomeIcon, label: "Home" },
  { href: "/resume", icon: BriefcaseIcon, label: "Experience" },
  { href: "/ai-playground", icon: BotIcon, label: "AI Assistant" },
  { href: "/game", icon: GamepadIcon, label: "Games" },
  { href: "/about", icon: UserIcon, label: "About" },
  { href: "/contact", icon: MailIcon, label: "Contact" },
];

export function PortfolioDock() {
  const pathname = usePathname();

  return (
    <div className="z-50 pointer-events-auto">
      <div className="bg-card/95 backdrop-blur-xl rounded-full border border-border shadow-md p-1 flex items-center gap-0.5 sm:gap-1.5">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              aria-label={item.label}
              className={cn(
                "p-1.5 sm:p-2 rounded-full transition-all flex items-center justify-center relative cursor-pointer",
                isActive
                  ? "bg-teal-500 text-white shadow-sm scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {isActive && (
                <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-white" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}