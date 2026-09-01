"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Timer, Target, Play, Trophy, RotateCcw, Info, Zap, Gamepad2, Brain, Keyboard, Sparkles, RefreshCw } from "lucide-react";
import { Confetti, type ConfettiRef } from "@/components/magicui/confetti";
import LustreText from "@/components/ui/lustretext";

// ----------------------------------------------------
// GAME 1: WHACK-A-BUG
// ----------------------------------------------------
interface Mole {
  id: number;
  isVisible: boolean;
  type: "syntax" | "memory" | "prod" | "coffee";
  points: number;
  label: string;
  emoji: string;
}

const moleTypes: Omit<Mole, "id" | "isVisible">[] = [
  { type: "syntax", points: 10, label: "Syntax Error", emoji: "🐛" },
  { type: "memory", points: 25, label: "Memory Leak", emoji: "⚠️" },
  { type: "prod", points: 50, label: "Prod Incident", emoji: "💥" },
  { type: "coffee", points: 5, label: "Coffee Boost", emoji: "☕" },
];

const WhackGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [moles, setMoles] = useState<Mole[]>([]);
  const [combo, setCombo] = useState(1);
  const confettiRef = useRef<ConfettiRef>(null);

  useEffect(() => {
    setMoles(
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        isVisible: false,
        type: "syntax",
        points: 10,
        label: "Syntax Error",
        emoji: "🐛"
      }))
    );
  }, []);

  useEffect(() => {
    if (!gameActive || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  useEffect(() => {
    if (!gameActive) return;
    const moleInterval = setInterval(() => {
      setMoles((prev) => {
        const randomIndex = Math.floor(Math.random() * prev.length);
        const randomType = moleTypes[Math.floor(Math.random() * moleTypes.length)];
        return prev.map((m, idx) =>
          idx === randomIndex ? { ...m, ...randomType, isVisible: true } : m
        );
      });

      setTimeout(() => {
        setMoles((prev) => prev.map((m) => ({ ...m, isVisible: false })));
      }, 900);
    }, 1100);

    return () => clearInterval(moleInterval);
  }, [gameActive]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setCombo(1);
    setGameActive(true);
    setGameOver(false);
  };

  const endGame = () => {
    setGameActive(false);
    setGameOver(true);
    if (score > highScore) setHighScore(score);
    if (score > 100 && confettiRef.current) {
      confettiRef.current.fire({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  };

  const whack = (mole: Mole) => {
    if (!mole.isVisible || !gameActive) return;

    if (mole.type === "coffee") {
      setTimeLeft((t) => t + 3);
    }

    const earned = mole.points * combo;
    setScore((s) => s + earned);
    setCombo((c) => Math.min(c + 1, 4));

    setMoles((prev) =>
      prev.map((m) => (m.id === mole.id ? { ...m, isVisible: false } : m))
    );
  };

  return (
    <div className="space-y-6">
      <Confetti ref={confettiRef} className="absolute inset-0 pointer-events-none z-50" />

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 bg-accent/50 p-3 sm:p-4 rounded-2xl border border-border text-center items-center">
        <div>
          <span className="text-[10px] sm:text-xs text-muted-foreground font-bold uppercase tracking-wider block whitespace-nowrap">SCORE</span>
          <p className="text-xl sm:text-3xl font-extrabold text-teal-500 mt-1">{score}</p>
        </div>
        <div>
          <span className="text-[10px] sm:text-xs text-muted-foreground font-bold uppercase tracking-wider block whitespace-nowrap">TIME</span>
          <p className={`text-xl sm:text-3xl font-extrabold mt-1 ${timeLeft <= 10 ? "text-red-500 animate-pulse" : "text-amber-500"}`}>
            {timeLeft}s
          </p>
        </div>
        <div>
          <span className="text-[10px] sm:text-xs text-muted-foreground font-bold uppercase tracking-wider block whitespace-nowrap">HIGH SCORE</span>
          <p className="text-xl sm:text-3xl font-extrabold text-purple-500 mt-1">{highScore}</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-4 p-4 bg-background rounded-2xl border border-border">
        {moles.map((mole) => (
          <motion.div
            key={mole.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => whack(mole)}
            className="aspect-square sm:aspect-video rounded-xl border-2 border-border bg-card flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group select-none shadow-sm"
          >
            <AnimatePresence>
              {mole.isVisible && (
                <motion.div
                  initial={{ y: 50, scale: 0.6 }}
                  animate={{ y: 0, scale: 1 }}
                  exit={{ y: 50, scale: 0.6 }}
                  className="flex flex-col items-center justify-center space-y-1"
                >
                  <span className="text-4xl">{mole.emoji}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-background border border-border text-foreground">
                    {mole.label} (+{mole.points})
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="absolute bottom-0 inset-x-0 h-2 bg-border/60" />
          </motion.div>
        ))}
      </div>

      {/* Action Button */}
      <div className="flex justify-center pt-2">
        {!gameActive ? (
          <Button
            onClick={startGame}
            className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-pointer"
          >
            <Play className="w-5 h-5 mr-2" /> {gameOver ? "Play Again" : "Start Whack-a-Bug"}
          </Button>
        ) : (
          <Button onClick={endGame} variant="destructive" className="font-bold py-3 px-8 rounded-full cursor-pointer">
            End Game
          </Button>
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------
// GAME 2: TECH STACK MEMORY MATCH
// ----------------------------------------------------
const techCardsData = [
  { id: 1, name: "React", icon: "⚛️" },
  { id: 2, name: "Next.js", icon: "▲" },
  { id: 3, name: "Node.js", icon: "🟩" },
  { id: 4, name: "TypeScript", icon: "📘" },
  { id: 5, name: "MongoDB", icon: "🍃" },
  { id: 6, name: "Redis", icon: "🔴" },
];

const MemoryGame = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const initGame = () => {
    const deck = [...techCardsData, ...techCardsData]
      .sort(() => Math.random() - 0.5)
      .map((card, idx) => ({ ...card, uniqueId: idx }));
    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (idx: number) => {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(idx)) return;

    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].name === cards[second].name) {
        setMatched((prev) => [...prev, first, second]);
        setFlipped([]);
        if (matched.length + 2 === cards.length) {
          setWon(true);
        }
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-accent/50 p-4 rounded-2xl border border-border">
        <div>
          <span className="text-xs text-muted-foreground font-bold">MOVES</span>
          <p className="text-2xl font-extrabold text-teal-500">{moves}</p>
        </div>
        <div>
          <span className="text-xs text-muted-foreground font-bold">MATCHES</span>
          <p className="text-2xl font-extrabold text-purple-500">{matched.length / 2} / {techCardsData.length}</p>
        </div>
        <Button onClick={initGame} variant="outline" size="sm" className="rounded-full cursor-pointer">
          <RefreshCw className="w-4 h-4 mr-1" /> Reset
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(idx);
          return (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardClick(idx)}
              className={`aspect-square rounded-xl border-2 cursor-pointer flex flex-col items-center justify-center font-bold text-2xl transition-all shadow-sm ${
                isFlipped
                  ? "border-teal-500 bg-teal-500/10 text-foreground"
                  : "border-border bg-card text-transparent"
              }`}
            >
              {isFlipped ? card.icon : "❓"}
              {isFlipped && <span className="text-[10px] text-muted-foreground mt-1">{card.name}</span>}
            </motion.div>
          );
        })}
      </div>

      {won && (
        <div className="p-4 bg-teal-500/10 border border-teal-500/30 rounded-2xl text-center">
          <Sparkles className="w-8 h-8 text-teal-500 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-foreground">Memory Match Complete! 🎉</h3>
          <p className="text-xs text-muted-foreground">You matched all stack cards in {moves} moves.</p>
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------
// GAME 3: SPEED TYPER CODE CHALLENGE
// ----------------------------------------------------
const codeSnippets = [
  "const engineer = { name: 'Satish', role: 'Full Stack' };",
  "import { useState, useEffect } from 'react';",
  "const res = await fetch('/api/bbps/transactions');",
  "export default function App() { return <Navbar />; }",
];

const TyperGame = () => {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [finished, setFinished] = useState(false);

  const target = codeSnippets[snippetIndex];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!startTime) setStartTime(Date.now());
    setInput(val);

    if (val === target) {
      const elapsedMinutes = (Date.now() - (startTime || Date.now())) / 60000;
      const words = target.split(" ").length;
      setWpm(Math.round(words / (elapsedMinutes || 0.01)));
      setFinished(true);
    }
  };

  const resetTyper = () => {
    setSnippetIndex((prev) => (prev + 1) % codeSnippets.length);
    setInput("");
    setStartTime(null);
    setWpm(0);
    setFinished(false);
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl bg-card border border-border space-y-4">
        <span className="text-xs font-bold text-teal-500 uppercase tracking-wider">Target Code Snippet</span>
        <div className="p-3 rounded-xl bg-background border border-border font-mono text-xs sm:text-sm text-foreground overflow-x-auto">
          {target}
        </div>

        <input
          type="text"
          value={input}
          onChange={handleChange}
          disabled={finished}
          placeholder="Type the exact code snippet here..."
          className="w-full p-3 rounded-xl bg-background border border-border font-mono text-xs sm:text-sm text-foreground focus:outline-none focus:border-teal-500 transition-colors"
        />

        {finished && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-2">
            <Trophy className="w-8 h-8 text-amber-500 mx-auto" />
            <h4 className="text-base font-bold text-foreground">Completed! WPM: {wpm}</h4>
            <Button onClick={resetTyper} size="sm" className="rounded-full bg-teal-500 text-white cursor-pointer">
              Next Snippet
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------
// MAIN GAMES HUB CONTAINER
// ----------------------------------------------------
const WhackADev = () => {
  const [activeTab, setActiveTab] = useState<"whack" | "memory" | "typer">("whack");

  return (
    <div className="pt-20 md:pt-24 pb-12 px-4 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
          <Gamepad2 className="w-4 h-4" /> Developer Arcade & Mini Games
        </div>
        <h1 className="text-lg sm:text-3xl md:text-5xl font-extrabold tracking-tight">
          <LustreText text="Dev Arcade Hub" className="text-lg sm:text-3xl md:text-5xl font-extrabold" />
        </h1>
        <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground max-w-xl mx-auto">
          Test your reaction speed, memory, and coding typing velocity in interactive mini-games built for developers.
        </p>
      </div>

      {/* Game Selector Tabs: Equal 3-Column Strip on Mobile */}
      <div className="grid grid-cols-3 gap-1.5 sm:flex sm:flex-row sm:justify-center sm:gap-2 max-w-md mx-auto pt-2">
        <button
          onClick={() => setActiveTab("whack")}
          className={`flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs md:text-sm font-bold transition-all cursor-pointer w-full ${
            activeTab === "whack"
              ? "bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md"
              : "border border-border bg-card text-muted-foreground hover:bg-accent"
          }`}
        >
          <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="truncate">Whack-a-Bug</span>
        </button>

        <button
          onClick={() => setActiveTab("memory")}
          className={`flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs md:text-sm font-bold transition-all cursor-pointer w-full ${
            activeTab === "memory"
              ? "bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md"
              : "border border-border bg-card text-muted-foreground hover:bg-accent"
          }`}
        >
          <Brain className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="truncate">Memory Match</span>
        </button>

        <button
          onClick={() => setActiveTab("typer")}
          className={`flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs md:text-sm font-bold transition-all cursor-pointer w-full ${
            activeTab === "typer"
              ? "bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md"
              : "border border-border bg-card text-muted-foreground hover:bg-accent"
          }`}
        >
          <Keyboard className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="truncate">Speed Typer</span>
        </button>
      </div>

      {/* Active Game Card */}
      <Card className="rounded-3xl border border-border bg-card p-4 sm:p-6 shadow-xl">
        {activeTab === "whack" && <WhackGame />}
        {activeTab === "memory" && <MemoryGame />}
        {activeTab === "typer" && <TyperGame />}
      </Card>
    </div>
  );
};

export default WhackADev;