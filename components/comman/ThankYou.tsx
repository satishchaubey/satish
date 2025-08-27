import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, CheckCircle, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ThankYouProps {
  title?: string;
  message?: string;
  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  autoDismiss?: boolean;
  dismissTime?: number;
}

// Predefined positions to avoid random values during SSR
const PREDEFINED_POSITIONS = [
  { left: "10%", top: "15%" },
  { left: "25%", top: "45%" },
  { left: "40%", top: "75%" },
  { left: "55%", top: "25%" },
  { left: "70%", top: "55%" },
  { left: "85%", top: "35%" },
  { left: "20%", top: "65%" },
  { left: "35%", top: "25%" },
  { left: "50%", top: "45%" },
  { left: "65%", top: "75%" },
  { left: "80%", top: "15%" },
  { left: "95%", top: "55%" },
  { left: "15%", top: "35%" },
  { left: "30%", top: "65%" },
  { left: "45%", top: "25%" },
];

const ThankYou: React.FC<ThankYouProps> = ({
  title = "Loading...",
  message = "Network Slow Please Wait...",
  showButton = true,
  buttonText = "Close",
  onButtonClick,
  autoDismiss = false,
  dismissTime = 7000,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Use predefined positions to avoid hydration mismatch
  const sparklePositions = useMemo(() => {
    return PREDEFINED_POSITIONS.slice(0, 15);
  }, []);

  const starPositions = useMemo(() => {
    return PREDEFINED_POSITIONS.slice(0, 8);
  }, []);

  const heartPositions = useMemo(() => {
    return PREDEFINED_POSITIONS.slice(0, 5);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    
    if (autoDismiss) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onButtonClick) {
          onButtonClick();
        }
      }, dismissTime);

      return () => clearTimeout(timer);
    }
  }, [autoDismiss, dismissTime, onButtonClick]);

  // Don't render anything during SSR to avoid hydration issues
  if (!isMounted) {
    return null;
  }

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4  backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, type: "spring", damping: 20 }}
        className="relative max-w-md w-full"
      >
        {/* Animated background elements */}
        <AnimatePresence>
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
              }}
              transition={{ 
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="absolute text-yellow-400"
              style={sparklePositions[i]}
            >
              <Sparkles size={16} />
            </motion.div>
          ))}
        </AnimatePresence>

        <Card className="bg-background/95 backdrop-blur-md border-0 shadow-xl overflow-hidden">
          <CardContent className="p-6 text-center relative">
            {/* Floating hearts */}
            <AnimatePresence>
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    y: -100,
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                  className="absolute text-pink-500"
                  style={{
                    ...heartPositions[i],
                    bottom: "0%",
                  }}
                >
                  <Heart 
                    size={20} 
                    fill="currentColor" 
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Main content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative z-10"
            >
              {/* Checkmark circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 15,
                  delay: 0.3 
                }}
                className="mx-auto mb-4 w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-12 h-12 text-green-600" fill="currentColor" />
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
              >
                {title}
              </motion.h2>

              {/* Message */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="text-muted-foreground mb-6"
              >
                {message}
              </motion.p>

              {/* Quote icon decoration */}
              <motion.div
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ opacity: 0.1, rotate: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute top-2 left-2 text-muted-foreground"
              >
                <Quote size={40} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, rotate: 10 }}
                animate={{ opacity: 0.1, rotate: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute bottom-2 right-2 text-muted-foreground"
              >
                <Quote size={40} className="rotate-180" />
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>

        {/* Floating stars around the card */}
        <AnimatePresence>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: 360,
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="absolute text-yellow-300"
              style={starPositions[i]}
            >
              <Star 
                size={16} 
                fill="currentColor" 
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ThankYou;