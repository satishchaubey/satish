"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, RotateCcw, CheckCircle2, XCircle, Code2, Layers, Cpu, Database, Lock, HelpCircle, Terminal, RefreshCw, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Preset {
  id: string;
  name: string;
  code: string;
  disassembly: string[];
  steps: {
    stage: "source" | "ast" | "bytecode" | "pvm" | "memory" | "gil";
    stageName: string;
    description: string;
    stack: string[];
    variables: Record<string, string>;
    refCount: Record<string, number>;
    gilStatus: "Acquired (Thread 1)" | "Released" | "Locked";
    activeOpcode?: string;
  }[];
}

const presets: Preset[] = [
  {
    id: "basic",
    name: "1. Variable Addition (x = 10, y = 20)",
    code: `x = 10\ny = 20\nz = x + y`,
    disassembly: [
      "0 LOAD_CONST          0 (10)",
      "2 STORE_NAME          0 (x)",
      "4 LOAD_CONST          1 (20)",
      "6 STORE_NAME          1 (y)",
      "8 LOAD_NAME           0 (x)",
      "10 LOAD_NAME          1 (y)",
      "12 BINARY_ADD",
      "14 STORE_NAME         2 (z)",
      "16 RETURN_VALUE"
    ],
    steps: [
      {
        stage: "source",
        stageName: "1. Source Code (.py)",
        description: "High-level Python source code is passed into CPython compiler.",
        stack: [],
        variables: {},
        refCount: {},
        gilStatus: "Acquired (Thread 1)"
      },
      {
        stage: "ast",
        stageName: "2. AST Parsing",
        description: "Lexer generates tokens; Parser builds Abstract Syntax Tree (AST node: Module -> Assign -> BinOp).",
        stack: [],
        variables: {},
        refCount: {},
        gilStatus: "Acquired (Thread 1)"
      },
      {
        stage: "bytecode",
        stageName: "3. Bytecode Compilation (.pyc)",
        description: "CPython compiler emits 16-bit stack-based instructions (Opcodes) into PyCodeObject.",
        stack: [],
        variables: {},
        refCount: {},
        gilStatus: "Acquired (Thread 1)",
        activeOpcode: "0 LOAD_CONST 0 (10)"
      },
      {
        stage: "pvm",
        stageName: "4. PVM Stack Evaluation",
        description: "PVM pushes constant value 10 onto the evaluation stack.",
        stack: ["10"],
        variables: {},
        refCount: {"10": 1},
        gilStatus: "Locked",
        activeOpcode: "2 STORE_NAME 0 (x)"
      },
      {
        stage: "memory",
        stageName: "5. PyObject & Ref Counting",
        description: "Binds name 'x' to PyObject(10). Reference count of int object 10 increases: ob_refcnt = 1.",
        stack: [],
        variables: { x: "10" },
        refCount: { "10": 1 },
        gilStatus: "Locked",
        activeOpcode: "4 LOAD_CONST 1 (20)"
      },
      {
        stage: "pvm",
        stageName: "4. PVM Stack Evaluation",
        description: "Loads 'x' (10) and 'y' (20) onto stack, then executes BINARY_ADD opcode.",
        stack: ["10", "20"],
        variables: { x: "10", y: "20" },
        refCount: { "10": 1, "20": 1 },
        gilStatus: "Locked",
        activeOpcode: "12 BINARY_ADD"
      },
      {
        stage: "gil",
        stageName: "6. GIL & Execution Complete",
        description: "Result 30 stored in name 'z'. GIL thread lock guarantees atomic PyObject evaluation in CPython.",
        stack: [],
        variables: { x: "10", y: "20", z: "30" },
        refCount: { "10": 1, "20": 1, "30": 1 },
        gilStatus: "Acquired (Thread 1)",
        activeOpcode: "16 RETURN_VALUE"
      }
    ]
  },
  {
    id: "function",
    name: "2. Function Call Scope (def multiply)",
    code: `def multiply(a, b):\n    return a * b\n\nresult = multiply(4, 5)`,
    disassembly: [
      "0 MAKE_FUNCTION       0",
      "2 STORE_NAME          0 (multiply)",
      "4 LOAD_NAME           0 (multiply)",
      "6 LOAD_CONST          1 (4)",
      "8 LOAD_CONST          2 (5)",
      "10 CALL_FUNCTION      2",
      "12 BINARY_MULTIPLY",
      "14 RETURN_VALUE"
    ],
    steps: [
      {
        stage: "source",
        stageName: "1. Function Definition",
        description: "CPython defines function PyCodeObject and binds it to global namespace symbol 'multiply'.",
        stack: [],
        variables: { multiply: "<function PyCodeObject>" },
        refCount: { multiply: 1 },
        gilStatus: "Acquired (Thread 1)"
      },
      {
        stage: "bytecode",
        stageName: "3. PyFrameObject Creation",
        description: "CALL_FUNCTION creates new PyFrameObject with local namespace for function arguments (a=4, b=5).",
        stack: ["4", "5"],
        variables: { multiply: "<function>", "local:a": "4", "local:b": "5" },
        refCount: { "4": 1, "5": 1 },
        gilStatus: "Locked",
        activeOpcode: "10 CALL_FUNCTION 2"
      },
      {
        stage: "pvm",
        stageName: "4. Frame Execution & Multiply",
        description: "PVM pops 4 and 5 from stack, computes 20, and pushes 20 onto return register.",
        stack: ["20"],
        variables: { multiply: "<function>", "local:a": "4", "local:b": "5" },
        refCount: { "20": 1 },
        gilStatus: "Locked",
        activeOpcode: "12 BINARY_MULTIPLY"
      },
      {
        stage: "memory",
        stageName: "5. Frame Destruction & RefCount",
        description: "Function frame pops off call stack. Local arguments 'a' and 'b' are destroyed; ref count decreases.",
        stack: [],
        variables: { multiply: "<function>", result: "20" },
        refCount: { "20": 1 },
        gilStatus: "Acquired (Thread 1)",
        activeOpcode: "14 RETURN_VALUE"
      }
    ]
  },
  {
    id: "gc",
    name: "3. Memory & Garbage Collection (Ref Counting)",
    code: `import sys\nlist1 = [1, 2]\nlist2 = list1\ndel list1`,
    disassembly: [
      "0 BUILD_LIST          2",
      "2 STORE_NAME          0 (list1)",
      "4 LOAD_NAME           0 (list1)",
      "6 STORE_NAME          1 (list2)",
      "8 DELETE_NAME         0 (list1)"
    ],
    steps: [
      {
        stage: "source",
        stageName: "1. PyListObject Allocation",
        description: "CPython allocates heap memory for PyListObject `[1, 2]` with ob_refcnt = 1 for name 'list1'.",
        stack: [],
        variables: { list1: "[1, 2]" },
        refCount: { "[1, 2]": 1 },
        gilStatus: "Acquired (Thread 1)",
        activeOpcode: "2 STORE_NAME 0 (list1)"
      },
      {
        stage: "memory",
        stageName: "5. Alias Assignment & Ref Increment",
        description: "Binding 'list2 = list1' creates second pointer to same PyListObject on heap. ob_refcnt increases to 2!",
        stack: [],
        variables: { list1: "[1, 2]", list2: "[1, 2]" },
        refCount: { "[1, 2]": 2 },
        gilStatus: "Locked",
        activeOpcode: "6 STORE_NAME 1 (list2)"
      },
      {
        stage: "memory",
        stageName: "5. del Keyword & Ref Decrement",
        description: "Executing 'del list1' removes symbol list1 from namespace. ob_refcnt decreases to 1. Object remains alive via list2!",
        stack: [],
        variables: { list2: "[1, 2]" },
        refCount: { "[1, 2]": 1 },
        gilStatus: "Acquired (Thread 1)",
        activeOpcode: "8 DELETE_NAME 0 (list1)"
      }
    ]
  }
];

const pythonQuizzes = [
  {
    id: 1,
    question: "What converts high-level Python source code (.py) into Bytecode (.pyc) before execution?",
    options: [
      "Operating System Kernel",
      "CPython Compiler",
      "Browser V8 Engine",
      "Garbage Collector"
    ],
    answer: 1,
    explanation: "CPython's built-in compiler parses the source code into an AST and compiles it into platform-independent Bytecode (.pyc instructions)!"
  },
  {
    id: 2,
    question: "What is the primary responsibility of CPython's GIL (Global Interpreter Lock)?",
    options: [
      "To prevent syntax errors in loops",
      "To restrict thread execution to a single native thread at a time for PyObject thread safety",
      "To compress compiled bytecode files",
      "To automatically convert Python into C++ code"
    ],
    answer: 1,
    explanation: "The GIL is a mutual-exclusion lock in CPython that prevents multiple native threads from executing Python bytecodes concurrently, ensuring memory safety for PyObjects."
  },
  {
    id: 3,
    question: "How does CPython's primary memory management determine when to free heap memory?",
    options: [
      "Manual free() calls required by developer",
      "Reference Counting (ob_refcnt = 0) + Generational Cyclic Garbage Collector",
      "Restarting the computer",
      "Clearing the browser cache"
    ],
    answer: 1,
    explanation: "CPython immediately deallocates an object when its reference count (ob_refcnt) drops to 0, backed by a 3-generation cyclic Garbage Collector for circular references!"
  }
];

export default function PythonInternalsPlayground() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("basic");
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-950 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Cpu className="w-4 h-4 text-amber-500" /> CPython Interpreter & PVM Architecture
        </div>
        <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight">
          How Python Works Internally
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
          Trace Python execution from Source Code ➔ AST ➔ Bytecode Opcodes ➔ PVM Evaluation Stack ➔ Memory & GIL Lock.
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
                ? "bg-amber-500 text-slate-950 shadow-md scale-[1.02]"
                : "bg-accent/60 text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-card border border-border/50">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs gap-1.5 cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? "Pause" : "Auto Play"}
          </Button>

          <Button
            size="sm"
            variant="outline"
            disabled={currentStepIndex >= preset.steps.length - 1}
            onClick={() => setCurrentStepIndex((prev) => Math.min(preset.steps.length - 1, prev + 1))}
            className="text-xs font-bold gap-1 cursor-pointer"
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
            className="text-xs font-bold gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </Button>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
          <span>Speed:</span>
          {[0.5, 1, 2].map((spd) => (
            <button
              key={spd}
              onClick={() => setPlaybackSpeed(spd)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer transition-all ${
                playbackSpeed === spd
                  ? "bg-amber-500 text-slate-950 font-bold"
                  : "bg-accent/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>

      {/* Current Execution Stage Pill */}
      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500 flex-shrink-0 animate-pulse" />
          <span className="text-xs sm:text-sm font-bold text-amber-950 dark:text-amber-300">
            Active Stage: {step.stageName}
          </span>
        </div>
        <div className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-950 dark:text-amber-200">
          Step {currentStepIndex + 1} of {preset.steps.length}
        </div>
      </div>

      {/* Description Message Box */}
      <p className="text-xs sm:text-sm text-foreground bg-card border border-border/60 p-3 rounded-xl leading-relaxed font-medium">
        💡 {step.description}
      </p>

      {/* MAIN 4-PANEL ARCHITECTURE DISPLAY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* PANEL 1: Source Code & AST */}
        <div className="space-y-2 p-4 rounded-2xl bg-slate-950 border border-border/60 text-slate-100">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Code2 className="w-4 h-4" /> Python Source Code (.py)
            </span>
            <span className="text-[10px] font-mono text-slate-400">CPython Parser</span>
          </div>
          <pre className="font-mono text-xs text-amber-300 bg-slate-900/80 p-3 rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
            {preset.code}
          </pre>

          <div className="pt-2">
            <span className="text-xs font-bold text-teal-400 flex items-center gap-1.5 mb-1.5">
              <Layers className="w-3.5 h-3.5" /> Disassembled Bytecode (.pyc)
            </span>
            <div className="space-y-1 font-mono text-[11px]">
              {preset.disassembly.map((opcode, idx) => {
                const isActive = step.activeOpcode && opcode.includes(step.activeOpcode.split(" ")[1]);
                return (
                  <div
                    key={idx}
                    className={`px-2 py-1 rounded transition-all ${
                      isActive
                        ? "bg-amber-500/30 text-amber-300 font-bold border-l-4 border-amber-400 pl-3"
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

        {/* PANEL 2: PVM Evaluation Stack & Namespaces */}
        <div className="space-y-4 p-4 rounded-2xl bg-card border border-border/60">
          <div className="flex items-center justify-between border-b border-border/50 pb-2">
            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
              <Terminal className="w-4 h-4" /> PVM Evaluation Stack (LIFO)
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">Python Virtual Machine</span>
          </div>

          <div className="min-h-[90px] p-3 rounded-xl bg-accent/40 border border-border/50 flex flex-col-reverse justify-start gap-1 font-mono text-xs">
            {step.stack.length === 0 ? (
              <span className="text-muted-foreground text-[11px] italic text-center py-4">
                [ Stack Empty ]
              </span>
            ) : (
              step.stack.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-3 py-1.5 rounded-lg bg-teal-500/20 border border-teal-500/40 text-teal-950 dark:text-teal-200 font-bold flex justify-between items-center"
                >
                  <span>Stack Top #{idx + 1}</span>
                  <span className="text-amber-950 dark:text-amber-300 font-extrabold">{item}</span>
                </motion.div>
              ))
            )}
          </div>

          {/* Symbol Table / Namespaces */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" /> PyFrameObject Namespace Symbols
            </span>
            <div className="p-3 rounded-xl bg-accent/40 border border-border/50 space-y-1.5 text-xs font-mono">
              {Object.keys(step.variables).length === 0 ? (
                <span className="text-muted-foreground text-[11px] italic">No active bindings in namespace</span>
              ) : (
                Object.entries(step.variables).map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center px-2 py-1 rounded bg-card border border-border/40">
                    <span className="text-purple-950 dark:text-purple-300 font-bold">{k}</span>
                    <span className="text-teal-950 dark:text-teal-300">➔ PyObject({v})</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* GIL & Memory RefCount Status Bar */}
          <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
            <div className="p-2.5 rounded-xl bg-accent/50 border border-border/50 flex flex-col justify-center">
              <span className="text-[10px] text-muted-foreground font-extrabold uppercase flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-500" /> GIL Lock Status:
              </span>
              <span className="font-bold text-amber-950 dark:text-amber-300 text-xs mt-0.5">
                {step.gilStatus}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-accent/50 border border-border/50 flex flex-col justify-center">
              <span className="text-[10px] text-muted-foreground font-extrabold uppercase flex items-center gap-1">
                <RefreshCw className="w-3 h-3 text-teal-500" /> Max ob_refcnt:
              </span>
              <span className="font-bold text-teal-950 dark:text-teal-300 text-xs mt-0.5">
                {Object.values(step.refCount)[0] ? `ob_refcnt = ${Object.values(step.refCount)[0]}` : "0 (GC Clean)"}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* QUIZ SECTION */}
      <div className="p-4 sm:p-6 rounded-2xl bg-card border border-border/60 space-y-4">
        <div className="flex items-center gap-2 border-b border-border/50 pb-3">
          <HelpCircle className="w-5 h-5 text-amber-500" />
          <h4 className="text-base sm:text-lg font-extrabold">Python Internals Knowledge Quiz</h4>
        </div>

        <div className="space-y-4">
          {pythonQuizzes.map((q) => {
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
