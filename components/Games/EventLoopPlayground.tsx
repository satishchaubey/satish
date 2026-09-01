"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw, SkipForward, Cpu, Layers, Clock, Zap, CheckCircle2, HelpCircle, Code2, Sparkles, AlertCircle } from "lucide-react";
import LustreText from "@/components/ui/lustretext";

interface ExecutionStep {
  stepIndex: number;
  callStack: string[];
  webAPIs: { id: string; name: string }[];
  microtaskQueue: { id: string; name: string }[];
  macrotaskQueue: { id: string; name: string }[];
  consoleOutput: { text: string; source: "sync" | "microtask" | "macrotask" }[];
  highlightLine?: number;
  activeComponent: "stack" | "webapi" | "microtask" | "macrotask" | "console" | "idle";
  explanation: string;
}

interface Preset {
  id: string;
  title: string;
  description: string;
  code: string;
  expectedOrder: string[];
  quizOptions: string[][];
  steps: ExecutionStep[];
}

const PRESETS: Preset[] = [
  {
    id: "basic",
    title: "1. Macro vs Microtask Basics",
    description: "Understand synchronous code execution vs Promise microtasks & setTimeout macrotasks.",
    code: `console.log("1: Synchronous 🚀");

setTimeout(() => {
  console.log("2: setTimeout Callback ⏰");
}, 0);

Promise.resolve().then(() => {
  console.log("3: Promise Microtask ⚡");
});

console.log("4: Synchronous End 🏁");`,
    expectedOrder: [
      "1: Synchronous 🚀",
      "4: Synchronous End 🏁",
      "3: Promise Microtask ⚡",
      "2: setTimeout Callback ⏰",
    ],
    quizOptions: [
      ["1: Synchronous 🚀", "4: Synchronous End 🏁", "3: Promise Microtask ⚡", "2: setTimeout Callback ⏰"],
      ["1: Synchronous 🚀", "2: setTimeout Callback ⏰", "3: Promise Microtask ⚡", "4: Synchronous End 🏁"],
      ["1: Synchronous 🚀", "4: Synchronous End 🏁", "2: setTimeout Callback ⏰", "3: Promise Microtask ⚡"],
    ],
    steps: [
      {
        stepIndex: 0,
        callStack: [],
        webAPIs: [],
        microtaskQueue: [],
        macrotaskQueue: [],
        consoleOutput: [],
        activeComponent: "idle",
        explanation: "Click 'Play' or 'Step Forward' to begin the Event Loop simulation.",
      },
      {
        stepIndex: 1,
        callStack: ['console.log("1: Synchronous 🚀")'],
        webAPIs: [],
        microtaskQueue: [],
        macrotaskQueue: [],
        consoleOutput: [],
        highlightLine: 1,
        activeComponent: "stack",
        explanation: "1️⃣ Synchronous line 1 enters the Call Stack and executes immediately.",
      },
      {
        stepIndex: 2,
        callStack: [],
        webAPIs: [],
        microtaskQueue: [],
        macrotaskQueue: [],
        consoleOutput: [{ text: "1: Synchronous 🚀", source: "sync" }],
        highlightLine: 1,
        activeComponent: "console",
        explanation: "Outputs '1: Synchronous 🚀' directly to the console. Call stack is cleared.",
      },
      {
        stepIndex: 3,
        callStack: ["setTimeout(..., 0)"],
        webAPIs: [],
        microtaskQueue: [],
        macrotaskQueue: [],
        consoleOutput: [{ text: "1: Synchronous 🚀", source: "sync" }],
        highlightLine: 3,
        activeComponent: "stack",
        explanation: "2️⃣ setTimeout is pushed to Call Stack. Since it's a Web API, JS offloads the timer.",
      },
      {
        stepIndex: 4,
        callStack: [],
        webAPIs: [{ id: "t1", name: "Timer (0ms)" }],
        microtaskQueue: [],
        macrotaskQueue: [],
        consoleOutput: [{ text: "1: Synchronous 🚀", source: "sync" }],
        highlightLine: 3,
        activeComponent: "webapi",
        explanation: "Timer registered in Web APIs container. When 0ms finishes, callback moves to Macrotask Queue.",
      },
      {
        stepIndex: 5,
        callStack: [],
        webAPIs: [],
        microtaskQueue: [],
        macrotaskQueue: [{ id: "m1", name: "setTimeout callback ⏰" }],
        consoleOutput: [{ text: "1: Synchronous 🚀", source: "sync" }],
        highlightLine: 4,
        activeComponent: "macrotask",
        explanation: "Timer expired! Callback pushed to Macrotask (Callback) Queue. (Waits for Call Stack to clear).",
      },
      {
        stepIndex: 6,
        callStack: ["Promise.resolve().then(...)"],
        webAPIs: [],
        microtaskQueue: [],
        macrotaskQueue: [{ id: "m1", name: "setTimeout callback ⏰" }],
        consoleOutput: [{ text: "1: Synchronous 🚀", source: "sync" }],
        highlightLine: 7,
        activeComponent: "stack",
        explanation: "3️⃣ Promise.then expression executes on the Call Stack.",
      },
      {
        stepIndex: 7,
        callStack: [],
        webAPIs: [],
        microtaskQueue: [{ id: "p1", name: "Promise callback ⚡" }],
        macrotaskQueue: [{ id: "m1", name: "setTimeout callback ⏰" }],
        consoleOutput: [{ text: "1: Synchronous 🚀", source: "sync" }],
        highlightLine: 8,
        activeComponent: "microtask",
        explanation: "Promise resolved! Its `.then` callback is queued in the Microtask Queue (Higher priority!).",
      },
      {
        stepIndex: 8,
        callStack: ['console.log("4: Synchronous End 🏁")'],
        webAPIs: [],
        microtaskQueue: [{ id: "p1", name: "Promise callback ⚡" }],
        macrotaskQueue: [{ id: "m1", name: "setTimeout callback ⏰" }],
        consoleOutput: [{ text: "1: Synchronous 🚀", source: "sync" }],
        highlightLine: 11,
        activeComponent: "stack",
        explanation: "4️⃣ Main script synchronous end log executes on Call Stack.",
      },
      {
        stepIndex: 9,
        callStack: [],
        webAPIs: [],
        microtaskQueue: [{ id: "p1", name: "Promise callback ⚡" }],
        macrotaskQueue: [{ id: "m1", name: "setTimeout callback ⏰" }],
        consoleOutput: [
          { text: "1: Synchronous 🚀", source: "sync" },
          { text: "4: Synchronous End 🏁", source: "sync" },
        ],
        highlightLine: 11,
        activeComponent: "console",
        explanation: "Outputs '4: Synchronous End 🏁'. Main script execution completed! Call stack is empty.",
      },
      {
        stepIndex: 10,
        callStack: ["Promise callback ⚡"],
        webAPIs: [],
        microtaskQueue: [],
        macrotaskQueue: [{ id: "m1", name: "setTimeout callback ⏰" }],
        consoleOutput: [
          { text: "1: Synchronous 🚀", source: "sync" },
          { text: "4: Synchronous End 🏁", source: "sync" },
        ],
        highlightLine: 8,
        activeComponent: "stack",
        explanation: "⚡ EVENT LOOP CHECK: Microtask Queue has higher priority! Dequeues Promise microtask into Call Stack.",
      },
      {
        stepIndex: 11,
        callStack: [],
        webAPIs: [],
        microtaskQueue: [],
        macrotaskQueue: [{ id: "m1", name: "setTimeout callback ⏰" }],
        consoleOutput: [
          { text: "1: Synchronous 🚀", source: "sync" },
          { text: "4: Synchronous End 🏁", source: "sync" },
          { text: "3: Promise Microtask ⚡", source: "microtask" },
        ],
        highlightLine: 8,
        activeComponent: "console",
        explanation: "Outputs '3: Promise Microtask ⚡'. Microtask Queue is now empty!",
      },
      {
        stepIndex: 12,
        callStack: ["setTimeout callback ⏰"],
        webAPIs: [],
        microtaskQueue: [],
        macrotaskQueue: [],
        consoleOutput: [
          { text: "1: Synchronous 🚀", source: "sync" },
          { text: "4: Synchronous End 🏁", source: "sync" },
          { text: "3: Promise Microtask ⚡", source: "microtask" },
        ],
        highlightLine: 4,
        activeComponent: "stack",
        explanation: "⏰ EVENT LOOP CHECK: Microtask Queue empty. Dequeues Macrotask (setTimeout callback) into Call Stack.",
      },
      {
        stepIndex: 13,
        callStack: [],
        webAPIs: [],
        microtaskQueue: [],
        macrotaskQueue: [],
        consoleOutput: [
          { text: "1: Synchronous 🚀", source: "sync" },
          { text: "4: Synchronous End 🏁", source: "sync" },
          { text: "3: Promise Microtask ⚡", source: "microtask" },
          { text: "2: setTimeout Callback ⏰", source: "macrotask" },
        ],
        highlightLine: 4,
        activeComponent: "console",
        explanation: "Outputs '2: setTimeout Callback ⏰'. All queues cleared! Event Loop cycle complete 🎉",
      },
    ],
  },
  {
    id: "nested",
    title: "2. Chained Promises & Nested Microtasks",
    description: "See how microtasks queued inside microtasks drain completely before any macrotask runs.",
    code: `console.log("A: Start");

setTimeout(() => console.log("B: Timeout 1"), 0);

Promise.resolve().then(() => {
  console.log("C: Promise 1");
  Promise.resolve().then(() => console.log("D: Nested Promise"));
});

setTimeout(() => console.log("E: Timeout 2"), 0);

console.log("F: End");`,
    expectedOrder: [
      "A: Start",
      "F: End",
      "C: Promise 1",
      "D: Nested Promise",
      "B: Timeout 1",
      "E: Timeout 2",
    ],
    quizOptions: [
      ["A: Start", "F: End", "C: Promise 1", "D: Nested Promise", "B: Timeout 1", "E: Timeout 2"],
      ["A: Start", "F: End", "C: Promise 1", "B: Timeout 1", "D: Nested Promise", "E: Timeout 2"],
      ["A: Start", "B: Timeout 1", "C: Promise 1", "D: Nested Promise", "E: Timeout 2", "F: End"],
    ],
    steps: [
      {
        stepIndex: 0,
        callStack: [],
        webAPIs: [],
        microtaskQueue: [],
        macrotaskQueue: [],
        consoleOutput: [],
        activeComponent: "idle",
        explanation: "Simulation ready. Press Step or Play to execute.",
      },
      {
        stepIndex: 1,
        callStack: ['console.log("A: Start")'],
        webAPIs: [],
        microtaskQueue: [],
        macrotaskQueue: [],
        consoleOutput: [{ text: "A: Start", source: "sync" }],
        highlightLine: 1,
        activeComponent: "console",
        explanation: "Sync log 'A: Start' executed.",
      },
      {
        stepIndex: 2,
        callStack: [],
        webAPIs: [],
        microtaskQueue: [],
        macrotaskQueue: [{ id: "t1", name: "Timeout 1 Callback" }],
        consoleOutput: [{ text: "A: Start", source: "sync" }],
        highlightLine: 3,
        activeComponent: "macrotask",
        explanation: "Timeout 1 registered and queued in Macrotask Queue.",
      },
      {
        stepIndex: 3,
        callStack: [],
        webAPIs: [],
        microtaskQueue: [{ id: "p1", name: "Promise 1 Callback" }],
        macrotaskQueue: [{ id: "t1", name: "Timeout 1 Callback" }],
        consoleOutput: [{ text: "A: Start", source: "sync" }],
        highlightLine: 5,
        activeComponent: "microtask",
        explanation: "Promise 1 queued in Microtask Queue.",
      },
      {
        stepIndex: 4,
        callStack: [],
        webAPIs: [],
        microtaskQueue: [{ id: "p1", name: "Promise 1 Callback" }],
        macrotaskQueue: [
          { id: "t1", name: "Timeout 1 Callback" },
          { id: "t2", name: "Timeout 2 Callback" },
        ],
        consoleOutput: [{ text: "A: Start", source: "sync" }],
        highlightLine: 10,
        activeComponent: "macrotask",
        explanation: "Timeout 2 queued in Macrotask Queue after Timeout 1.",
      },
      {
        stepIndex: 5,
        callStack: ['console.log("F: End")'],
        webAPIs: [],
        microtaskQueue: [{ id: "p1", name: "Promise 1 Callback" }],
        macrotaskQueue: [
          { id: "t1", name: "Timeout 1 Callback" },
          { id: "t2", name: "Timeout 2 Callback" },
        ],
        consoleOutput: [
          { text: "A: Start", source: "sync" },
          { text: "F: End", source: "sync" },
        ],
        highlightLine: 12,
        activeComponent: "console",
        explanation: "Sync log 'F: End' executed. Main thread callstack cleared!",
      },
      {
        stepIndex: 6,
        callStack: ["Promise 1 Callback"],
        webAPIs: [],
        microtaskQueue: [],
        macrotaskQueue: [
          { id: "t1", name: "Timeout 1 Callback" },
          { id: "t2", name: "Timeout 2 Callback" },
        ],
        consoleOutput: [
          { text: "A: Start", source: "sync" },
          { text: "F: End", source: "sync" },
          { text: "C: Promise 1", source: "microtask" },
        ],
        highlightLine: 6,
        activeComponent: "console",
        explanation: "⚡ Microtask 1 runs and logs 'C: Promise 1'. It also queues another inner Promise!",
      },
      {
        stepIndex: 7,
        callStack: [],
        webAPIs: [],
        microtaskQueue: [{ id: "p2", name: "Nested Promise Callback" }],
        macrotaskQueue: [
          { id: "t1", name: "Timeout 1 Callback" },
          { id: "t2", name: "Timeout 2 Callback" },
        ],
        consoleOutput: [
          { text: "A: Start", source: "sync" },
          { text: "F: End", source: "sync" },
          { text: "C: Promise 1", source: "microtask" },
        ],
        highlightLine: 7,
        activeComponent: "microtask",
        explanation: "🔥 CRITICAL EVENT LOOP RULE: Microtask queue MUST be completely drained before Macrotask queue is checked!",
      },
      {
        stepIndex: 8,
        callStack: ["Nested Promise Callback"],
        webAPIs: [],
        microtaskQueue: [],
        macrotaskQueue: [
          { id: "t1", name: "Timeout 1 Callback" },
          { id: "t2", name: "Timeout 2 Callback" },
        ],
        consoleOutput: [
          { text: "A: Start", source: "sync" },
          { text: "F: End", source: "sync" },
          { text: "C: Promise 1", source: "microtask" },
          { text: "D: Nested Promise", source: "microtask" },
        ],
        highlightLine: 7,
        activeComponent: "console",
        explanation: "Nested Promise microtask runs and logs 'D: Nested Promise'. Microtask queue is now empty!",
      },
      {
        stepIndex: 9,
        callStack: ["Timeout 1 Callback"],
        webAPIs: [],
        microtaskQueue: [],
        macrotaskQueue: [{ id: "t2", name: "Timeout 2 Callback" }],
        consoleOutput: [
          { text: "A: Start", source: "sync" },
          { text: "F: End", source: "sync" },
          { text: "C: Promise 1", source: "microtask" },
          { text: "D: Nested Promise", source: "microtask" },
          { text: "B: Timeout 1", source: "macrotask" },
        ],
        highlightLine: 3,
        activeComponent: "console",
        explanation: "Now Event Loop processes Macrotask 1 ('B: Timeout 1').",
      },
      {
        stepIndex: 10,
        callStack: ["Timeout 2 Callback"],
        webAPIs: [],
        microtaskQueue: [],
        macrotaskQueue: [],
        consoleOutput: [
          { text: "A: Start", source: "sync" },
          { text: "F: End", source: "sync" },
          { text: "C: Promise 1", source: "microtask" },
          { text: "D: Nested Promise", source: "microtask" },
          { text: "B: Timeout 1", source: "macrotask" },
          { text: "E: Timeout 2", source: "macrotask" },
        ],
        highlightLine: 10,
        activeComponent: "console",
        explanation: "Event Loop processes Macrotask 2 ('E: Timeout 2'). All queues empty!",
      },
    ],
  },
  {
    id: "asyncawait",
    title: "3. Async / Await Under The Hood",
    description: "See how `await` pauses function execution and wraps remaining code into a Promise microtask.",
    code: `async function fetchData() {
  console.log("1: In Async Function 🟢");
  await Promise.resolve();
  console.log("2: After Await ⚡");
}

console.log("3: Script Start 🚀");
fetchData();
console.log("4: Script End 🏁");`,
    expectedOrder: [
      "3: Script Start 🚀",
      "1: In Async Function 🟢",
      "4: Script End 🏁",
      "2: After Await ⚡",
    ],
    quizOptions: [
      ["3: Script Start 🚀", "1: In Async Function 🟢", "4: Script End 🏁", "2: After Await ⚡"],
      ["3: Script Start 🚀", "1: In Async Function 🟢", "2: After Await ⚡", "4: Script End 🏁"],
      ["1: In Async Function 🟢", "3: Script Start 🚀", "4: Script End 🏁", "2: After Await ⚡"],
    ],
    steps: [
      {
        stepIndex: 0,
        callStack: [],
        webAPIs: [],
        microtaskQueue: [],
        macrotaskQueue: [],
        consoleOutput: [],
        activeComponent: "idle",
        explanation: "Click Step or Play to simulate Async/Await execution.",
      },
      {
        stepIndex: 1,
        callStack: ['console.log("3: Script Start 🚀")'],
        webAPIs: [],
        microtaskQueue: [],
        macrotaskQueue: [],
        consoleOutput: [{ text: "3: Script Start 🚀", source: "sync" }],
        highlightLine: 7,
        activeComponent: "console",
        explanation: "Sync log '3: Script Start 🚀' executes.",
      },
      {
        stepIndex: 2,
        callStack: ["fetchData()", 'console.log("1: In Async Function 🟢")'],
        webAPIs: [],
        microtaskQueue: [],
        macrotaskQueue: [],
        consoleOutput: [
          { text: "3: Script Start 🚀", source: "sync" },
          { text: "1: In Async Function 🟢", source: "sync" },
        ],
        highlightLine: 2,
        activeComponent: "console",
        explanation: "Calling `fetchData()` enters function synchronously and executes line 2!",
      },
      {
        stepIndex: 3,
        callStack: ["fetchData() (Paused at await)"],
        webAPIs: [],
        microtaskQueue: [{ id: "await1", name: "Resuming fetchData() after await ⚡" }],
        macrotaskQueue: [],
        consoleOutput: [
          { text: "3: Script Start 🚀", source: "sync" },
          { text: "1: In Async Function 🟢", source: "sync" },
        ],
        highlightLine: 3,
        activeComponent: "microtask",
        explanation: "💡 KEY CONCEPT: `await` pauses `fetchData()` execution and queues all remaining lines as a Microtask!",
      },
      {
        stepIndex: 4,
        callStack: ['console.log("4: Script End 🏁")'],
        webAPIs: [],
        microtaskQueue: [{ id: "await1", name: "Resuming fetchData() after await ⚡" }],
        macrotaskQueue: [],
        consoleOutput: [
          { text: "3: Script Start 🚀", source: "sync" },
          { text: "1: In Async Function 🟢", source: "sync" },
          { text: "4: Script End 🏁", source: "sync" },
        ],
        highlightLine: 9,
        activeComponent: "console",
        explanation: "Main thread continues synchronously to '4: Script End 🏁'. Stack empties.",
      },
      {
        stepIndex: 5,
        callStack: ["fetchData() (Resumed)"],
        webAPIs: [],
        microtaskQueue: [],
        macrotaskQueue: [],
        consoleOutput: [
          { text: "3: Script Start 🚀", source: "sync" },
          { text: "1: In Async Function 🟢", source: "sync" },
          { text: "4: Script End 🏁", source: "sync" },
          { text: "2: After Await ⚡", source: "microtask" },
        ],
        highlightLine: 4,
        activeComponent: "console",
        explanation: "Event Loop picks up microtask, resumes `fetchData()`, and logs '2: After Await ⚡'. Done!",
      },
    ],
  },
];

export const EventLoopPlayground: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<Preset>(PRESETS[0]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(1200); // ms per step
  const [quizMode, setQuizMode] = useState(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const currentStep = selectedPreset.steps[currentStepIndex] || selectedPreset.steps[0];

  // Auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= selectedPreset.steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, selectedPreset, speed]);

  const handleSelectPreset = (preset: Preset) => {
    setSelectedPreset(preset);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleNextStep = () => {
    if (currentStepIndex < selectedPreset.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Playground Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-teal-500/10 via-blue-500/10 to-purple-500/10 border border-teal-500/20">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-400 text-xs font-bold">
            <Cpu className="w-3.5 h-3.5" /> Interactive JS Event Loop Visualizer
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-foreground">
            JavaScript Event Loop Playground
          </h3>
          <p className="text-xs text-muted-foreground">
            Visualize how Call Stack, Web APIs, Microtask Queue (Promises), & Macrotask Queue (setTimeout) execute!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={quizMode ? "default" : "outline"}
            onClick={() => setQuizMode(!quizMode)}
            className={`rounded-full text-xs font-bold cursor-pointer ${
              quizMode ? "bg-amber-500 text-black hover:bg-amber-400" : ""
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 mr-1" />
            {quizMode ? "Exit Quiz" : "Test Output Quiz"}
          </Button>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleSelectPreset(preset)}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer space-y-1 ${
              selectedPreset.id === preset.id
                ? "border-teal-500 bg-teal-500/10 shadow-sm"
                : "border-border bg-card/60 hover:bg-accent"
            }`}
          >
            <div className="text-xs font-bold text-foreground flex items-center justify-between">
              <span>{preset.title}</span>
              {selectedPreset.id === preset.id && <Sparkles className="w-3.5 h-3.5 text-teal-400" />}
            </div>
            <p className="text-[10px] text-muted-foreground line-clamp-2">{preset.description}</p>
          </button>
        ))}
      </div>

      {/* Quiz Mode Overlay / Section */}
      {quizMode && (
        <Card className="p-4 sm:p-6 border border-amber-500/30 bg-amber-500/5 space-y-4 rounded-2xl">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            <h4 className="text-sm sm:text-base font-bold text-foreground">
              Predict the Console Output Order!
            </h4>
          </div>
          <p className="text-xs text-muted-foreground">
            Before running the visualizer, can you guess the exact order in which `console.log()` statements will print?
          </p>

          <div className="space-y-2">
            {selectedPreset.quizOptions.map((option, idx) => {
              const isCorrectOption =
                JSON.stringify(option) === JSON.stringify(selectedPreset.expectedOrder);
              const isSelected = selectedQuizOption === idx;

              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedQuizOption(idx);
                    setQuizSubmitted(true);
                  }}
                  className={`w-full p-3 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer flex items-center justify-between ${
                    quizSubmitted
                      ? isCorrectOption
                        ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300 font-bold"
                        : isSelected
                        ? "border-rose-500/60 bg-rose-500/10 text-rose-300"
                        : "border-border bg-card text-muted-foreground"
                      : isSelected
                      ? "border-amber-500 bg-amber-500/20 text-foreground"
                      : "border-border bg-card hover:bg-accent text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-background border border-border flex items-center justify-center text-[10px] font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option.join(" ➔ ")}</span>
                  </div>

                  {quizSubmitted && isCorrectOption && (
                    <span className="text-emerald-400 font-sans font-bold flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-4 h-4" /> Correct!
                    </span>
                  )}
                  {quizSubmitted && isSelected && !isCorrectOption && (
                    <span className="text-rose-400 font-sans font-bold flex items-center gap-1 text-[11px]">
                      <AlertCircle className="w-4 h-4" /> Incorrect
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {quizSubmitted && (
            <div className="p-3 rounded-xl bg-background border border-border text-xs text-muted-foreground">
              <span className="font-bold text-foreground">Explanation:</span>{" "}
              {selectedPreset.steps[selectedPreset.steps.length - 1].explanation}
            </div>
          )}
        </Card>
      )}

      {/* Code Editor & Simulation Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Code Snippet Box */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-teal-400" /> Source Code
            </span>
            <span className="text-[10px] text-teal-500 font-mono">JavaScript (V8 Runtime)</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-100 overflow-x-auto shadow-inner space-y-1 relative min-h-[220px]">
            {selectedPreset.code.split("\n").map((line, i) => {
              const lineNum = i + 1;
              const isHighlighted = currentStep.highlightLine === lineNum;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-2 py-0.5 rounded transition-colors ${
                    isHighlighted ? "bg-teal-500/20 text-teal-300 font-bold border-l-2 border-teal-400" : ""
                  }`}
                >
                  <span className="text-zinc-600 select-none w-4 text-right text-[10px]">
                    {lineNum}
                  </span>
                  <span className="whitespace-pre">{line}</span>
                </div>
              );
            })}
          </div>

          {/* Controls Bar */}
          <div className="p-3 rounded-2xl bg-card border border-border space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <Button
                  size="sm"
                  variant={isPlaying ? "destructive" : "default"}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="rounded-xl text-xs font-bold cursor-pointer bg-teal-500 hover:bg-teal-600 text-white"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 mr-1" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 mr-1" /> Play Sim
                    </>
                  )}
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleNextStep}
                  disabled={currentStepIndex >= selectedPreset.steps.length - 1}
                  className="rounded-xl text-xs font-bold cursor-pointer"
                >
                  <SkipForward className="w-3.5 h-3.5 mr-1" /> Step
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleReset}
                  className="rounded-xl text-xs cursor-pointer text-muted-foreground"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </Button>
              </div>

              {/* Speed Controller */}
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-muted-foreground">Speed:</span>
                {[
                  { label: "0.5x", val: 1800 },
                  { label: "1x", val: 1200 },
                  { label: "2x", val: 600 },
                ].map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setSpeed(s.val)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                      speed === s.val
                        ? "bg-teal-500 text-white"
                        : "bg-muted text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step Progress Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                <span>Step {currentStepIndex + 1} of {selectedPreset.steps.length}</span>
                <span>{Math.round(((currentStepIndex + 1) / selectedPreset.steps.length) * 100)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={selectedPreset.steps.length - 1}
                value={currentStepIndex}
                onChange={(e) => {
                  setCurrentStepIndex(Number(e.target.value));
                  setIsPlaying(false);
                }}
                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Event Loop Visual Architecture Diagram */}
        <div className="lg:col-span-7 space-y-4">
          {/* Explanation Alert Box */}
          <div className="p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-teal-400 font-bold">
              <Sparkles className="w-4 h-4" /> Current Event Loop Action
            </div>
            <p className="text-foreground leading-relaxed">
              {currentStep.explanation}
            </p>
          </div>

          {/* Grid of Event Loop Engines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 1. Call Stack */}
            <div
              className={`p-3.5 rounded-2xl border transition-all space-y-2 min-h-[140px] flex flex-col justify-between ${
                currentStep.activeComponent === "stack"
                  ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/50"
                  : "border-border bg-card/60"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold text-cyan-600 dark:text-cyan-400">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4" /> Call Stack (LIFO)
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">V8 Main Thread</span>
              </div>

              <div className="space-y-1.5 flex-1 flex flex-col-reverse justify-start">
                <AnimatePresence>
                  {currentStep.callStack.length === 0 ? (
                    <div className="text-[11px] text-muted-foreground/60 italic text-center py-4">
                      Stack empty (Idle)
                    </div>
                  ) : (
                    currentStep.callStack.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="p-2 rounded-xl bg-cyan-500/15 dark:bg-cyan-500/25 border border-cyan-500/50 text-cyan-950 dark:text-cyan-200 font-mono text-[11px] font-bold truncate shadow-sm"
                      >
                        ▶ {item}
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* 2. Web APIs Container */}
            <div
              className={`p-3.5 rounded-2xl border transition-all space-y-2 min-h-[140px] flex flex-col justify-between ${
                currentStep.activeComponent === "webapi"
                  ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/50"
                  : "border-border bg-card/60"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> Web APIs / Timers
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">Async Threads</span>
              </div>

              <div className="space-y-1.5 flex-1 flex flex-col justify-start">
                <AnimatePresence>
                  {currentStep.webAPIs.length === 0 ? (
                    <div className="text-[11px] text-muted-foreground/60 italic text-center py-4">
                      No active Web APIs
                    </div>
                  ) : (
                    currentStep.webAPIs.map((api) => (
                      <motion.div
                        key={api.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="p-2 rounded-xl bg-amber-500/15 dark:bg-amber-500/25 border border-amber-500/50 text-amber-950 dark:text-amber-200 font-mono text-[11px] font-bold truncate shadow-sm"
                      >
                        ⏳ {api.name}
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* 3. Microtask Queue (Promises) */}
            <div
              className={`p-3.5 rounded-2xl border transition-all space-y-2 min-h-[140px] flex flex-col justify-between ${
                currentStep.activeComponent === "microtask"
                  ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/10 ring-1 ring-purple-500/50"
                  : "border-border bg-card/60"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Microtask Queue
                </span>
                <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-800 dark:text-purple-300 text-[9px] font-extrabold uppercase">
                  High Priority
                </span>
              </div>

              <div className="space-y-1.5 flex-1 flex flex-col justify-start">
                <AnimatePresence>
                  {currentStep.microtaskQueue.length === 0 ? (
                    <div className="text-[11px] text-muted-foreground/60 italic text-center py-4">
                      Microtask queue empty
                    </div>
                  ) : (
                    currentStep.microtaskQueue.map((m) => (
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-2 rounded-xl bg-purple-500/15 dark:bg-purple-500/25 border border-purple-500/50 text-purple-950 dark:text-purple-200 font-mono text-[11px] font-bold truncate shadow-sm"
                      >
                        ⚡ {m.name}
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* 4. Macrotask Queue (Callback Queue) */}
            <div
              className={`p-3.5 rounded-2xl border transition-all space-y-2 min-h-[140px] flex flex-col justify-between ${
                currentStep.activeComponent === "macrotask"
                  ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/50"
                  : "border-border bg-card/60"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                <span className="flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4" /> Macrotask (Callback) Queue
                </span>
                <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-800 dark:text-blue-300 text-[9px] font-extrabold uppercase">
                  Normal Priority
                </span>
              </div>

              <div className="space-y-1.5 flex-1 flex flex-col justify-start">
                <AnimatePresence>
                  {currentStep.macrotaskQueue.length === 0 ? (
                    <div className="text-[11px] text-muted-foreground/60 italic text-center py-4">
                      Macrotask queue empty
                    </div>
                  ) : (
                    currentStep.macrotaskQueue.map((m) => (
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-2 rounded-xl bg-blue-500/15 dark:bg-blue-500/25 border border-blue-500/50 text-blue-950 dark:text-blue-200 font-mono text-[11px] font-bold truncate shadow-sm"
                      >
                        ⏰ {m.name}
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* 5. Terminal Console Output Log */}
          <div
            className={`p-3.5 rounded-2xl border transition-all space-y-2 ${
              currentStep.activeComponent === "console"
                ? "border-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500/50"
                : "border-border bg-card"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <span className="flex items-center gap-1.5">
                <Code2 className="w-4 h-4" /> Browser Console Output
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">
                {currentStep.consoleOutput.length} line(s) printed
              </span>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs space-y-1 min-h-[90px] shadow-inner">
              {currentStep.consoleOutput.length === 0 ? (
                <span className="text-zinc-500 italic">No output printed yet...</span>
              ) : (
                currentStep.consoleOutput.map((log, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-emerald-500 select-none">›</span>
                    <span
                      className={
                        log.source === "microtask"
                          ? "text-purple-300 font-bold"
                          : log.source === "macrotask"
                          ? "text-blue-300 font-bold"
                          : "text-emerald-300 font-bold"
                      }
                    >
                      {log.text}
                    </span>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventLoopPlayground;
