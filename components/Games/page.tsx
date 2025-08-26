import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Timer, Target, Play, Trophy, RotateCcw, Info, Zap } from "lucide-react";
import { Confetti, type ConfettiRef } from "@/components/magicui/confetti";
import LustreText from "@/components/ui/lustretext";

interface Mole {
    id: number;
    isVisible: boolean;
    points: number;
}

const WhackADev = () => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameActive, setGameActive] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false); // New state for welcome screen
    const [highScore, setHighScore] = useState(0);
    const [moles, setMoles] = useState<Mole[]>([]);
    const confettiRef = useRef<ConfettiRef>(null);
    const [showConfetti, setShowConfetti] = useState(false);

    // Initialize moles
    useEffect(() => {
        setMoles(
            Array.from({ length: 6 }, (_, i) => ({
                id: i,
                isVisible: false,
                points: Math.floor(Math.random() * 3) + 1 // 1-3 points
            }))
        );
    }, []);

    // Game timer
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

    // Mole animation
    useEffect(() => {
        if (!gameActive) return;

        const moleInterval = setInterval(() => {
            setMoles((prevMoles) => {
                const randomIndex = Math.floor(Math.random() * prevMoles.length);
                return prevMoles.map((mole, index) =>
                    index === randomIndex ? { ...mole, isVisible: true } : mole
                );
            });

            // Hide mole after delay
            setTimeout(() => {
                setMoles((prevMoles) =>
                    prevMoles.map((mole) => ({ ...mole, isVisible: false }))
                );
            }, 800);
        }, 1000);

        return () => clearInterval(moleInterval);
    }, [gameActive]);

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setGameActive(true);
        setGameOver(false);
        setGameStarted(true); // Hide welcome screen
        setShowConfetti(false);
    };

    const endGame = () => {
        setGameActive(false);
        setGameOver(true);

        // Check if it's a new high score
        if (score > highScore) {
            setHighScore(score);
        }

        // Trigger confetti based on score
        if (score > 20) {
            setShowConfetti(true);
            if (confettiRef.current) {
                // Different confetti effects based on score range
                if (score > 100) {
                    // Legendary score - biggest confetti
                    confettiRef.current.fire({
                        particleCount: 150,
                        spread: 100,
                        startVelocity: 30,
                        origin: { y: 0.6 }
                    });
                } else if (score > 50) {
                    // Pro score - medium confetti
                    confettiRef.current.fire({
                        particleCount: 100,
                        spread: 70,
                        startVelocity: 25,
                        origin: { y: 0.6 }
                    });
                } else {
                    // Good score - smaller confetti
                    confettiRef.current.fire({
                        particleCount: 50,
                        spread: 50,
                        startVelocity: 20,
                        origin: { y: 0.6 }
                    });
                }
            }
        }
    };

    const whackMole = (mole: Mole) => {
        if (!mole.isVisible || !gameActive) return;

        setScore((prev) => prev + mole.points);
        setMoles((prev) =>
            prev.map((m) => (m.id === mole.id ? { ...m, isVisible: false } : m))
        );

        // Visual feedback
        document.getElementById(`mole-${mole.id}`)?.classList.add("whacked");
        setTimeout(() => {
            document.getElementById(`mole-${mole.id}`)?.classList.remove("whacked");
        }, 300);

        // Trigger confetti for high-value moles
        if (mole.points >= 3) {
            if (confettiRef.current) {
                confettiRef.current.fire({
                    particleCount: 20,
                    spread: 30,
                    origin: { y: 0.6 }
                });
            }
        }
    };

    const getEmoji = (points: number) => {
        const emojis = ["🐛", "🐢", "🐌", "🦥", "🐼", "🦊", "🐨", "🦁", "🐯", "🚀"];
        return emojis[points - 1] || "💻";
    };

    return (
        <div className="relative pt-30">
            {/* Confetti component - only show when game is over and score is good */}
            {showConfetti && (
                <Confetti
                    ref={confettiRef}
                    className="absolute left-0 top-0 z-50 size-full pointer-events-none"
                />
            )}

            <Card className="w-full relative z-10">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl  font-bold bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text ">
                        
                    </CardTitle>
                    <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-gray-400 via-gray-500 to-gray-500 bg-clip-text text-transparent leading-tight drop-shadow-lg">
                        💥<LustreText text=" Whack-a-Dev " />💥
                    </h2>
                    <CardDescription className="light:text-gray-300 dark:text-gray-300">
                        Whack the bugs before they escape! Different bugs = different points!
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Welcome Screen - Show before game starts */}
                    <AnimatePresence>
                        {!gameStarted && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="text-center p-6  rounded-2xl backdrop-blur-sm border border-white/10"
                            >
                                <Zap className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-pulse" />
                                <h3 className="text-2xl font-bold light:text-white mb-4">
                                    Welcome to Whack-a-Dev!
                                </h3>
                                <div className="text-left space-y-3 mb-6 light:text-gray-200">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-3">
                                            <Target className="w-4 h-4" />
                                        </div>
                                        <span className="">Click on bugs when they appear</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-3">
                                            <Timer className="w-4 h-4" />
                                        </div>
                                        <span>You have 30 seconds to score points</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-3">
                                            <Trophy className="w-4 h-4" />
                                        </div>
                                        <span>Different bugs give different points (1-3)</span>
                                    </div>
                                </div>
                                <Button
                                    onClick={startGame}
                                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-10 rounded-xl text-lg"
                                    size="lg"
                                >
                                    <Play className="w-6 h-6 mr-2" />
                                    Start Game
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Game Content - Show after welcome screen */}
                    <AnimatePresence>
                        {gameStarted && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-6"
                            >
                                {/* Score and Timer */}
                                <div className="flex justify-between items-center bg-black/20 p-4 rounded-xl backdrop-blur-sm">
                                    <div className="text-center">
                                        <div className="text-sm text-gray-400">SCORE</div>
                                        <div className="text-3xl font-bold text-green-400">{score}</div>
                                    </div>

                                    <div className="text-center">
                                        <div className="text-sm text-gray-400">TIME</div>
                                        <div className={`text-3xl font-bold ${timeLeft <= 10 ? "text-red-400 animate-pulse" : "text-yellow-400"}`}>
                                            {timeLeft}s
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <div className="text-sm text-gray-400">BEST</div>
                                        <div className="text-3xl font-bold text-blue-400">{highScore}</div>
                                    </div>
                                </div>

                                {/* Game Grid */}
                                <div className="grid grid-cols-3 gap-4 p-4 bg-black/10 rounded-2xl backdrop-blur-sm">
                                    {moles.map((mole) => (
                                        <motion.div
                                            key={mole.id}
                                            id={`mole-${mole.id}`}
                                            className="aspect-square md:aspect-video bg-gray-800/50 rounded-2xl border-2 border-gray-700 overflow-hidden cursor-pointer relative group"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => whackMole(mole)}
                                        >
                                            {/* Mole/Bug */}
                                            <AnimatePresence>
                                                {mole.isVisible && (
                                                    <motion.div
                                                        initial={{ y: 100, scale: 0.8 }}
                                                        animate={{ y: 0, scale: 1 }}
                                                        exit={{ y: 100, scale: 0.8 }}
                                                        transition={{ type: "spring", damping: 10, stiffness: 100 }}
                                                        className="w-full h-full flex items-center justify-center text-4xl"
                                                    >
                                                        {getEmoji(mole.points)}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Points indicator */}
                                            {mole.isVisible && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 0 }}
                                                    animate={{ opacity: 1, y: -5 }}
                                                    className="absolute top-2 right-2 text-xs font-bold bg-black/50 px-2 py-1 rounded-full text-white"
                                                >
                                                    +{mole.points}
                                                </motion.div>
                                            )}

                                            {/* Hole */}
                                            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gray-900/80 rounded-t-xl" />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Controls */}
                                <div className="flex gap-4 justify-center">
                                    {!gameActive && !gameOver && (
                                        <Button
                                            onClick={startGame}
                                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-xl"
                                            size="lg"
                                        >
                                            <Play className="w-5 h-5 mr-2" />
                                            Start Game
                                        </Button>
                                    )}

                                    {gameActive && (
                                        <Button
                                            onClick={endGame}
                                            variant="destructive"
                                            className="font-bold py-3 px-8 rounded-xl"
                                            size="lg"
                                        >
                                            End Game
                                        </Button>
                                    )}

                                    {gameOver && (
                                        <Button
                                            onClick={startGame}
                                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl"
                                            size="lg"
                                        >
                                            <RotateCcw className="w-5 h-5 mr-2" />
                                            Play Again
                                        </Button>
                                    )}
                                </div>

                                {/* Game Over Message */}
                                <AnimatePresence>
                                    {gameOver && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="text-center p-6 bg-black/20 rounded-2xl backdrop-blur-sm"
                                        >
                                            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                                            <h3 className="text-2xl font-bold text-white mb-2">
                                                Game Over!
                                            </h3>
                                            <p className="text-gray-300 mb-4">
                                                You scored {score} points! {score > highScore ? "🎉 New High Score! 🎉" : ""}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                {score === 0 && "😴 Were you even trying?"}
                                                {score > 0 && score <= 20 && "🐌 Slow and steady wins the race!"}
                                                {score > 20 && score <= 50 && "🚀 Great job! You're getting there!"}
                                                {score > 50 && score <= 100 && "🔥 Amazing! You're a bug-whacking pro!"}
                                                {score > 100 && "🤯 Legendary! The bugs fear you!"}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Instructions - Show on welcome screen */}
                    {!gameStarted && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center text-sm text-gray-400 p-4 bg-black/10 rounded-xl"
                        >
                            <Info className="w-5 h-5 inline mr-2" />
                            Click "Start Game" to begin whacking bugs!
                        </motion.div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default WhackADev;