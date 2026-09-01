"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface NumberCounterProps {
  value: string | number;
  className?: string;
  duration?: number;
}

export const NumberCounter: React.FC<NumberCounterProps> = ({
  value,
  className = "",
  duration = 1500
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const stringValue = String(value);
  const match = stringValue.match(/^([\d.]+)(.*)$/);

  if (!match) {
    return <span className={className}>{stringValue}</span>;
  }

  const targetNumber = parseFloat(match[1]);
  const suffix = match[2];

  useEffect(() => {
    if (!isInView || targetNumber === 0) return;

    let start = 0;
    const steps = 40;
    const increment = targetNumber / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, targetNumber, duration]);

  const formattedCount = Number.isInteger(targetNumber)
    ? Math.round(count)
    : count.toFixed(1);

  return (
    <span ref={ref} className={className}>
      {isInView ? formattedCount : "0"}{suffix}
    </span>
  );
};

export default NumberCounter;
