import React from "react";
import { cn } from "@/lib/utils";

type GlowingBorderCardProps = {
  children: React.ReactNode;
  fromColor: string;
  toColor: string;
  className?: string;
};

export default function GlowingBorderCard({
  children,
  fromColor,
  toColor,
  className,
}: GlowingBorderCardProps) {
  return (
    <div className={cn("relative group ", className)}>
      {/* Glowing border */}
      <div
        className={cn(
          "absolute -inset-0.5 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt",
          `bg-gradient-to-r rounded-full from-${fromColor} to-${toColor}`
        )}
      />
      {/* Inner content */}
      <div className="relative flex items-center justify-center h-full rounded-full dark:bg-black p-6">
        {children}
      </div>
    </div>
  );
}
