"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, RotateCcw, CheckCircle2, XCircle, Code2, Layers, Cpu, Database, Zap, HelpCircle, Terminal, RefreshCw, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Preset {
  id: string;
  name: string;
  code: string;
  disassembly: string[];
  steps: {
    stage: "source" | "ast" | "ignition" | "turbofan" | "context" | "gc";
    stageName: string;
    description: string;
    callStack: string[];
    memoryHeap: Record<string, string>;
    jitState: "Unoptimized (Ignition)" | "Profiling (Hot Code)" | "JIT Optimized (TurboFan)" | "Deoptimized";
    activeBytecode?: string;
  }[];
}

const presets: Preset[] = [
  {
    id: "v8-pipeline",
    name: "1. V8 JIT Compilation & Execution (x = 10, y = 20)",
    code: `const x = 10;\nconst y = 20;\nfunction sum(a, b) {\n  return a + b;\n}\nsum(x, y);`,
    disassembly: [
      "LdaSmi          [10]",
      "Star            r0 (x)",
      "LdaSmi          [20]",
      "Star            r1 (y)",
      "Ldar            r0",
      "Add             r1, [0]",
      "Return"
    ],
    steps: [
      {
        stage: "source",
        stageName: "1. JS Source Code (.js)",
        description: "Raw JavaScript source code is passed into the V8 Engine Scanner.",
        callStack: ["Global Execution Context"],
        memoryHeap: {},
        jitState: "Unoptimized (Ignition)"
      },
      {
        stage: "ast",
        stageName: "2. Scanner & Parser (AST)",
        description: "Scanner converts script to Tokens; Parser generates Abstract Syntax Tree (AST node: VariableDeclaration, FunctionDeclaration).",
        callStack: ["Global Execution Context (Creation Phase)"],
        memoryHeap: { "sum()": "<function object>" },
        jitState: "Unoptimized (Ignition)"
      },
      {
        stage: "ignition",
        stageName: "3. Ignition Bytecode Interpreter",
        description: "Ignition compiles AST to V8 Bytecode instructions (LdaSmi [10], Star r0). Executes instantly without compilation delay.",
        callStack: ["Global Execution Context (Execution Phase)"],
        memoryHeap: { x: "10 (const)", y: "20 (const)", "sum()": "<function>" },
        jitState: "Unoptimized (Ignition)",
        activeBytecode: "LdaSmi [10]"
      },
      {
        stage: "context",
        stageName: "4. Execution Context & Call Stack",
        description: "sum(x, y) invocation creates new Function Execution Context pushed onto Call Stack.",
        callStack: ["Global Execution Context", "sum(a=10, b=20) Frame"],
        memoryHeap: { x: "10", y: "20", "local:a": "10", "local:b": "20" },
        jitState: "Profiling (Hot Code)",
        activeBytecode: "Add r1, [0]"
      },
      {
        stage: "turbofan",
        stageName: "5. TurboFan JIT Compiler (Hot Code)",
        description: "Profiler detects sum() is executed frequently ('Hot Function') with stable types (numbers). TurboFan compiles it into Optimized Machine Code (Assembly)!",
        callStack: ["Global Execution Context", "sum(a=10, b=20) [TurboFan Machine Code]"],
        memoryHeap: { x: "10", y: "20", result: "30" },
        jitState: "JIT Optimized (TurboFan)",
        activeBytecode: "Return"
      }
    ]
  },
  {
    id: "hoisting",
    name: "2. Creation Phase vs Execution Phase (Hoisting)",
    code: `console.log(a);\nvar a = 100;\nlet b = 200;`,
    disassembly: [
      "// Creation Phase: var a initialized as undefined",
      "// let b placed in Temporal Dead Zone (TDZ)",
      "LdaUndefined",
      "Star            r0 (a)",
      "LdaSmi          [100]",
      "Star            r0 (a)",
      "LdaSmi          [200]",
      "Star            r1 (b)"
    ],
    steps: [
      {
        stage: "context",
        stageName: "1. Global Creation Phase",
        description: "V8 scans code: Memory is allocated for 'var a' initialized to 'undefined'. 'let b' is hoisted into Temporal Dead Zone (TDZ).",
        callStack: ["Global Creation Phase"],
        memoryHeap: { a: "undefined", b: "<Uninitialized (TDZ)>" },
        jitState: "Unoptimized (Ignition)",
        activeBytecode: "LdaUndefined"
      },
      {
        stage: "ignition",
        stageName: "2. Execution Phase (Line 1)",
        description: "console.log(a) prints 'undefined' because 'a' is initialized as undefined in creation phase.",
        callStack: ["Global Execution Phase", "console.log(undefined)"],
        memoryHeap: { a: "undefined", b: "<Uninitialized (TDZ)>" },
        jitState: "Unoptimized (Ignition)",
        activeBytecode: "Star r0 (a)"
      },
      {
        stage: "context",
        stageName: "3. Value Assignment (Line 2 & 3)",
        description: "'var a' is assigned 100. 'let b' exits Temporal Dead Zone (TDZ) and is initialized to 200.",
        callStack: ["Global Execution Phase"],
        memoryHeap: { a: "100", b: "200" },
        jitState: "Unoptimized (Ignition)",
        activeBytecode: "Star r1 (b)"
      }
    ]
  },
  {
    id: "orinoco-gc",
    name: "3. Memory Allocation & Orinoco Garbage Collector",
    code: `let user = { name: 'Satish' };\nuser = null; // Re-assign pointer`,
    disassembly: [
      "CreateEmptyObjectLiteral",
      "SetNamedProperty    [name], ['Satish']",
      "Star                r0 (user)",
      "LdaNull",
      "Star                r0 (user)"
    ],
    steps: [
      {
        stage: "context",
        stageName: "1. Heap Object Allocation",
        description: "V8 allocates memory on the Heap in the Nursery / New Space (Young Generation) for Object { name: 'Satish' }.",
        callStack: ["Global Execution Phase"],
        memoryHeap: { "0x001 (User Object)": "{ name: 'Satish' }", user: "Ref ➔ 0x001" },
        jitState: "Unoptimized (Ignition)",
        activeBytecode: "Star r0 (user)"
      },
      {
        stage: "gc",
        stageName: "2. Pointer Re-assignment & Unreachable Object",
        description: "Setting user = null breaks the reference to Heap 0x001. Object 0x001 becomes an Unreachable Orphan object on the Heap.",
        callStack: ["Global Execution Phase"],
        memoryHeap: { "0x001 (Unreachable)": "{ name: 'Satish' }", user: "null" },
        jitState: "Unoptimized (Ignition)",
        activeBytecode: "LdaNull"
      },
      {
        stage: "gc",
        stageName: "3. Orinoco GC (Scavenger / Mark-Sweep)",
        description: "Orinoco Major GC executes Mark-and-Sweep algorithm. Reclaims unreferenced object memory at 0x001 from Heap!",
        callStack: ["Global Execution Phase", "Orinoco GC Worker Thread"],
        memoryHeap: { user: "null" },
        jitState: "Unoptimized (Ignition)"
      }
    ]
  }
];

const jsQuizzes = [
  {
    id: 1,
    question: "What components form the core compilation & execution pipeline of Google V8 JavaScript Engine?",
    options: [
      "Ignition (Interpreter) & TurboFan (JIT Compiler)",
      "Babel & Webpack",
      "Nginx & Apache",
      "Virtual DOM & Redux"
    ],
    answer: 0,
    explanation: "V8 uses Ignition to rapidly convert AST into Bytecode for instant execution, while TurboFan profiles and compiles 'hot code' directly into optimized native machine code!"
  },
  {
    id: 2,
    question: "What happens during the Creation Phase of a JavaScript Execution Context?",
    options: [
      "Code is executed line by line",
      "Memory space is allocated for variables and functions; 'var' is initialized to undefined, and 'let/const' enter TDZ",
      "Garbage collection deletes all variables",
      "CSS styles are injected into DOM"
    ],
    answer: 1,
    explanation: "In the Creation Phase (before code execution), JavaScript hoists declarations: function declarations are stored in memory, 'var' variables are initialized to 'undefined', and 'let/const' are allocated in the Temporal Dead Zone (TDZ)."
  },
  {
    id: 3,
    question: "How does V8's Orinoco Garbage Collector identify memory that can be reclaimed?",
    options: [
      "By restarting the browser tab every 10 seconds",
      "Mark-and-Sweep algorithm: Traces roots (Global, Call Stack) to mark reachable objects; unreached objects are swept",
      "Manual delete operators in JavaScript code",
      "By clearing the browser local storage"
    ],
    answer: 1,
    explanation: "Orinoco uses a parallel, concurrent Mark-and-Sweep Garbage Collector that traverses objects reachable from root references and sweeps unreachable memory from the Heap!"
  }
];

export default function JSInternalsPlayground() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("v8-pipeline");
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [userQuizAnswers, setUserQuizAnswers] = useState<Record<number, number>>({});

  const preset = presets.find((p) => p.id === selectedPresetId) || presets[0];
  const step = preset.steps[currentStepIndex] || preset.steps[0];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= preset.steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2000 / playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, preset.steps.length, playbackSpeed]);

  const handlePresetSelect = (id: string) => {
    setSelectedPresetId(id);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6">
      {/* Visualizer Header */}
      <div className="text-center space-y-2 border-b border-border/50 pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
          <Cpu className="w-4 h-4 text-teal-500" /> V8 Engine, Ignition & TurboFan JIT Architecture
        </div>
        <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight">
          How JavaScript Works Internally
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
          Trace JS execution inside V8: Source Code ➔ AST ➔ Ignition Bytecode ➔ TurboFan JIT Native Machine Code ➔ Memory Heap & Orinoco GC.
        </p>
      </div>

      {/* Preset Selector Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-bold text-muted-foreground mr-1">Execution Scenario:</span>
        {presets.map((p) => (
          <button
            key={p.id}
            onClick={() => handlePresetSelect(p.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedPresetId === p.id
                ? "bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md scale-[1.02]"
                : "bg-accent/60 text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 sm:p-3 rounded-2xl bg-card border border-border/50">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <Button
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-[11px] sm:text-xs px-2.5 sm:px-3.5 py-1.5 gap-1 sm:gap-1.5 cursor-pointer flex-shrink-0"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? "Pause" : "Auto Play"}
          </Button>

          <Button
            size="sm"
            variant="outline"
            disabled={currentStepIndex >= preset.steps.length - 1}
            onClick={() => setCurrentStepIndex((prev) => Math.min(preset.steps.length - 1, prev + 1))}
            className="text-[11px] sm:text-xs font-bold px-2.5 sm:px-3.5 py-1.5 gap-1 cursor-pointer flex-shrink-0"
          >
            <SkipForward className="w-3.5 h-3.5" /> Step Forward
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setCurrentStepIndex(0);
              setIsPlaying(false);
            }}
            className="text-[11px] sm:text-xs font-bold px-2 sm:px-3 py-1.5 gap-1 cursor-pointer flex-shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </Button>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-bold text-muted-foreground flex-shrink-0">
          <span>Speed:</span>
          {[0.5, 1, 2].map((spd) => (
            <button
              key={spd}
              onClick={() => setPlaybackSpeed(spd)}
              className={`px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono cursor-pointer transition-all ${
                playbackSpeed === spd
                  ? "bg-teal-500 text-white font-bold"
                  : "bg-accent/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>

      {/* Current Execution Stage Pill */}
      <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-teal-500 flex-shrink-0 animate-pulse" />
          <span className="text-xs sm:text-sm font-bold text-teal-950 dark:text-teal-300">
            Active Stage: {step.stageName}
          </span>
        </div>
        <div className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-md bg-teal-500/20 text-teal-950 dark:text-teal-200">
          Step {currentStepIndex + 1} of {preset.steps.length}
        </div>
      </div>

      {/* Description Message Box */}
      <p className="text-xs sm:text-sm text-foreground bg-card border border-border/60 p-3 rounded-xl leading-relaxed font-medium">
        💡 {step.description}
      </p>

      {/* MAIN 4-PANEL ARCHITECTURE DISPLAY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* PANEL 1: Source Code & Ignition Bytecode */}
        <div className="space-y-2 p-4 rounded-2xl bg-slate-950 border border-border/60 text-slate-100">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-teal-400 flex items-center gap-1.5">
              <Code2 className="w-4 h-4" /> JavaScript Source Code (.js)
            </span>
            <span className="text-[10px] font-mono text-slate-400">V8 Scanner</span>
          </div>
          <pre className="font-mono text-xs text-teal-300 bg-slate-900/80 p-3 rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
            {preset.code}
          </pre>

          <div className="pt-2">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-1.5">
              <Layers className="w-3.5 h-3.5" /> Ignition Bytecode Instructions
            </span>
            <div className="space-y-1 font-mono text-[11px]">
              {preset.disassembly.map((opcode, idx) => {
                const isActive = step.activeBytecode && opcode.includes(step.activeBytecode.split(" ")[0]);
                return (
                  <div
                    key={idx}
                    className={`px-2 py-1 rounded transition-all ${
                      isActive
                        ? "bg-teal-500/30 text-teal-300 font-bold border-l-4 border-teal-400 pl-3"
                        : "text-slate-400 bg-slate-900/40"
                    }`}
                  >
                    {opcode}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* PANEL 2: Call Stack, Memory Heap & TurboFan JIT */}
        <div className="space-y-4 p-4 rounded-2xl bg-card border border-border/60">
          <div className="flex items-center justify-between border-b border-border/50 pb-2">
            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
              <Terminal className="w-4 h-4" /> Call Stack (LIFO Execution Frames)
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">V8 Stack Engine</span>
          </div>

          <div className="min-h-[90px] p-3 rounded-xl bg-accent/40 border border-border/50 flex flex-col-reverse justify-start gap-1 font-mono text-xs">
            {step.callStack.length === 0 ? (
              <span className="text-muted-foreground text-[11px] italic text-center py-4">
                [ Call Stack Empty ]
              </span>
            ) : (
              step.callStack.map((frame, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-3 py-1.5 rounded-lg bg-teal-500/20 border border-teal-500/40 text-teal-950 dark:text-teal-200 font-bold flex justify-between items-center"
                >
                  <span>Frame #{idx + 1}</span>
                  <span className="text-teal-950 dark:text-teal-300 font-extrabold">{frame}</span>
                </motion.div>
              ))
            )}
          </div>

          {/* Memory Heap Allocation */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" /> Memory Heap & Variable Binding
            </span>
            <div className="p-3 rounded-xl bg-accent/40 border border-border/50 space-y-1.5 text-xs font-mono">
              {Object.keys(step.memoryHeap).length === 0 ? (
                <span className="text-muted-foreground text-[11px] italic">No active objects in Memory Heap</span>
              ) : (
                Object.entries(step.memoryHeap).map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center px-2 py-1 rounded bg-card border border-border/40">
                    <span className="text-purple-950 dark:text-purple-300 font-bold">{k}</span>
                    <span className="text-teal-950 dark:text-teal-300">{v}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* TurboFan JIT & Orinoco GC Status Bar */}
          <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
            <div className="p-2.5 rounded-xl bg-accent/50 border border-border/50 flex flex-col justify-center">
              <span className="text-[10px] text-muted-foreground font-extrabold uppercase flex items-center gap-1">
                <Flame className="w-3 h-3 text-orange-500" /> TurboFan JIT Status:
              </span>
              <span className="font-bold text-orange-950 dark:text-orange-300 text-xs mt-0.5">
                {step.jitState}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-accent/50 border border-border/50 flex flex-col justify-center">
              <span className="text-[10px] text-muted-foreground font-extrabold uppercase flex items-center gap-1">
                <RefreshCw className="w-3 h-3 text-teal-500" /> Orinoco GC:
              </span>
              <span className="font-bold text-teal-950 dark:text-teal-300 text-xs mt-0.5">
                {step.stage === "gc" ? "Mark-Sweep Sweeping" : "Idle / Concurrent"}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* QUIZ SECTION */}
      <div className="p-4 sm:p-6 rounded-2xl bg-card border border-border/60 space-y-4">
        <div className="flex items-center gap-2 border-b border-border/50 pb-3">
          <HelpCircle className="w-5 h-5 text-teal-500" />
          <h4 className="text-base sm:text-lg font-extrabold">JavaScript Internals & V8 Engine Quiz</h4>
        </div>

        <div className="space-y-4">
          {jsQuizzes.map((q) => {
            const selectedOpt = userQuizAnswers[q.id];
            const isSubmitted = selectedOpt !== undefined;
            const isCorrect = selectedOpt === q.answer;

            return (
              <div key={q.id} className="p-3 sm:p-4 rounded-xl bg-accent/30 border border-border/40 space-y-2.5">
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  Q{q.id}: {q.question}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => setUserQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                      className={`px-3 py-2 rounded-xl text-left text-xs font-medium transition-all cursor-pointer border ${
                        selectedOpt === optIdx
                          ? optIdx === q.answer
                            ? "bg-emerald-500/20 text-emerald-950 dark:text-emerald-300 border-emerald-500/50 font-bold"
                            : "bg-rose-500/20 text-rose-950 dark:text-rose-300 border-rose-500/50 font-bold"
                          : "bg-card border-border/50 text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {isSubmitted && (
                  <div className={`p-2.5 rounded-lg text-xs font-medium border flex items-start gap-2 ${
                    isCorrect ? "bg-emerald-500/10 text-emerald-950 dark:text-emerald-300 border-emerald-500/30" : "bg-rose-500/10 text-rose-950 dark:text-rose-300 border-rose-500/30"
                  }`}>
                    {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> : <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />}
                    <div>
                      <p className="font-bold">{isCorrect ? "Correct!" : "Incorrect."}</p>
                      <p className="text-[11px] mt-0.5 opacity-90">{q.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
