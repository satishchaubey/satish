"use client";

import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState, useCallback } from "react";

type Grid = {
  rows: number;
  cols: number;
};

const DEFAULT_GRIDS: Record<string, Grid> = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
};

type PredefinedGridKey = keyof typeof DEFAULT_GRIDS;

interface PixelImageProps {
  src: string;
  grid?: PredefinedGridKey;
  customGrid?: Grid;
  grayscaleAnimation?: boolean;
  pixelFadeInDuration?: number; // in ms
  maxAnimationDelay?: number; // in ms
  colorRevealDelay?: number; // in ms
  className?: string;
}

export const PixelImage = ({
  src,
  grid = "8x8",
  grayscaleAnimation = true,
  pixelFadeInDuration = 700,
  maxAnimationDelay = 900,
  colorRevealDelay = 1000,
  customGrid,
  className,
}: PixelImageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const MIN_GRID = 1;
  const MAX_GRID = 16;

  const { rows, cols } = useMemo(() => {
    const isValidGrid = (grid?: Grid) => {
      if (!grid) return false;
      const { rows, cols } = grid;
      return (
        Number.isInteger(rows) &&
        Number.isInteger(cols) &&
        rows >= MIN_GRID &&
        cols >= MIN_GRID &&
        rows <= MAX_GRID &&
        cols <= MAX_GRID
      );
    };

    return isValidGrid(customGrid) ? customGrid! : DEFAULT_GRIDS[grid] || DEFAULT_GRIDS["8x8"];
  }, [customGrid, grid]);

  const triggerAnimation = useCallback(() => {
    setIsVisible(false);
    setShowColor(false);
    
    setAnimationKey((prev) => prev + 1);

    const visibleTimer = setTimeout(() => {
      setIsVisible(true);
    }, 40);

    const colorTimer = setTimeout(() => {
      setShowColor(true);
    }, colorRevealDelay);

    return () => {
      clearTimeout(visibleTimer);
      clearTimeout(colorTimer);
    };
  }, [colorRevealDelay]);

  useEffect(() => {
    const cleanup = triggerAnimation();
    return cleanup;
  }, [triggerAnimation]);

  const pieces = useMemo(() => {
    const total = rows * cols;
    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;

      const clipPath = `polygon(
        ${col * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${(row + 1) * (100 / rows)}%,
        ${col * (100 / cols)}% ${(row + 1) * (100 / rows)}%
      )`;

      const delay = Math.random() * maxAnimationDelay;
      return {
        clipPath,
        delay,
      };
    });
  }, [rows, cols, maxAnimationDelay, animationKey]);

  return (
    <div
      onClick={triggerAnimation}
      onMouseEnter={triggerAnimation}
      className={cn(
        "relative h-72 w-72 md:h-96 md:w-96 select-none overflow-hidden rounded-2xl cursor-pointer group shadow-2xl",
        className
      )}
      suppressHydrationWarning
    >
      {pieces.map((piece, index) => (
        <div
          key={`${animationKey}-${index}`}
          className={cn(
            "absolute inset-0 transition-all ease-out",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
          )}
          style={{
            clipPath: piece.clipPath,
            transitionDelay: `${piece.delay}ms`,
            transitionDuration: `${pixelFadeInDuration}ms`,
          }}
          suppressHydrationWarning
        >
          <img
            src={src}
            alt={`Pixel image piece ${index + 1}`}
            className={cn(
              "w-full h-full object-cover transition-all duration-700",
              grayscaleAnimation && (showColor ? "grayscale-0" : "grayscale contrast-125"),
            )}
            style={{
              transition: grayscaleAnimation
                ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
            }}
            draggable={false}
          />
        </div>
      ))}
      
      {/* Interactive hover hint badge */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 z-20 pointer-events-none">
        <span className="text-xs font-semibold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
          ✨ Re-animate Pixels
        </span>
      </div>
    </div>
  );
};
