"use client";
import { motion } from "framer-motion";

const AnimatedDivider = () => {
  return (
    <motion.hr
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="my-6 border-t-2 border-gray-300 dark:border-gray-600  "
    />
  );
};

export default AnimatedDivider;
