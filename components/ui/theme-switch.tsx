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
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const [showHi, setShowHi] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    const activeTheme = theme === "system" ? resolvedTheme : theme;
    const isDark = activeTheme === "dark";

    const handleToggle = React.useCallback(() => {
      const nextTheme = isDark ? "light" : "dark";
      setTheme(nextTheme);
      
      // Show "Hi" emoji briefly when toggling
      if (showHiEmoji) {
        setShowHi(true);
        setTimeout(() => setShowHi(false), 1000);
      }
    }, [isDark, setTheme, showHiEmoji]);

    if (!mounted) {
      return (
        <div className={cn("relative flex items-center gap-2", className)} ref={ref} {...props}>
          <div className="relative inline-flex w-16 h-8 rounded-full border border-input bg-background/50 p-1 shadow-sm opacity-60" />
        </div>
      );
    }

    return (
      <div className={cn("relative flex items-center gap-2", className)} ref={ref} {...props}>
        {/* Hi emoji that appears briefly */}
        {showHi && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce z-50">
            <span className="text-2xl">👋</span>
          </div>
        )}
        
        {/* Theme switch button */}
        <button
          type="button"
          aria-label="Toggle theme"
          className={cn(
            "relative inline-flex w-16 h-8 rounded-full border border-input bg-background p-1 shadow-sm transition-colors cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
          onClick={handleToggle}
        >
          {/* Toggle indicator */}
          <div
            className={cn(
              "absolute top-1 left-1 h-6 w-6 rounded-full bg-foreground text-background flex items-center justify-center transition-transform duration-300 z-10",
              isDark && "transform translate-x-8"
            )}
          >
            {isDark ? <Moon size={14} /> : <Sun size={14} />}
          </div>
          
          {/* Background icons */}
          <div className="flex w-full justify-between items-center px-1">
            <Sun size={14} className={cn("transition-colors", !isDark ? "text-amber-500 font-bold opacity-100" : "text-muted-foreground opacity-50")} />
            <Moon size={14} className={cn("transition-colors", isDark ? "text-blue-400 font-bold opacity-100" : "text-muted-foreground opacity-50")} />
          </div>
        </button>
      </div>
    );
  }
);

ThemeSwitch.displayName = "ThemeSwitch";

export { ThemeSwitch };