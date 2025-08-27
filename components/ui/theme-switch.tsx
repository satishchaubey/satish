"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Sun, Moon } from "lucide-react";

interface ThemeSwitchProps extends React.HTMLAttributes<HTMLDivElement> {
  showHiEmoji?: boolean;
}

const ThemeSwitch = React.forwardRef<HTMLDivElement, ThemeSwitchProps>(
  ({ className, showHiEmoji = true, ...props }, ref) => {
    const { theme, setTheme } = useTheme();
    const [isClient, setIsClient] = React.useState(false);
    const [showHi, setShowHi] = React.useState(false);

    React.useEffect(() => {
      setIsClient(true);
    }, []);

    const handleToggle = React.useCallback(() => {
      setTheme(theme === "light" ? "dark" : "light");
      
      // Show "Hi" emoji briefly when toggling
      if (showHiEmoji) {
        setShowHi(true);
        setTimeout(() => setShowHi(false), 1000);
      }
    }, [theme, setTheme, showHiEmoji]);

    if (!isClient) return null;

    return (
      <div className={cn("relative flex items-center gap-2", className)} ref={ref} {...props}>
        {/* Hi emoji that appears briefly */}
        {showHi && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <span className="text-2xl">👋</span>
          </div>
        )}
        
        {/* Theme switch */}
        <div
          className={cn(
            "relative inline-flex w-16 h-8 rounded-full border border-input bg-background p-1 shadow-sm transition-colors cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
          onClick={handleToggle}
        >
          {/* Toggle indicator */}
          <div
            className={cn(
              "absolute top-1 left-1 h-6 w-6 rounded-full bg-foreground text-background flex items-center justify-center transition-transform duration-300",
              theme === "dark" && "transform translate-x-8"
            )}
          >
            {theme === "light" ? <Sun size={14} /> : <Moon size={14} />}
          </div>
          
          {/* Icons in background */}
          <div className="flex w-full justify-between items-center px-1">
            <Sun size={14} className="text-muted-foreground" />
            <Moon size={14} className="text-muted-foreground" />
          </div>
        </div>
      </div>
    );
  }
);

ThemeSwitch.displayName = "ThemeSwitch";

export { ThemeSwitch };