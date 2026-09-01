import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, CheckCircle, AlertCircle, X, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/toast";

interface FloatingResumeDownloadProps {
  fileName?: string;
  filePath?: string;
  className?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

const FloatingResumeDownload: React.FC<FloatingResumeDownloadProps> = ({
  fileName = "Satish_Kumar_Chaubey.pdf",
  filePath = "/Satish_Kumar_Chaubey.pdf",
  className = "",
  position = "bottom-right"
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "success" | "error">("idle");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { toast } = useToast();

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadStatus("idle");

    try {
      // Create a temporary anchor element to trigger download
      const link = document.createElement("a");
      link.href = filePath;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Simulate a brief delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));

      setDownloadStatus("success");
      
      toast({
        title: "Downloaded Successfully",
        description: "My resume has been downloaded successfully.",
        variant: "success",
      })
      // Auto-collapse after successful download
      setTimeout(() => {
        setIsExpanded(false);
      }, 2000);
    } catch (error) {
      console.error("Download failed:", error);
      setDownloadStatus("error");
    } finally {
      setIsDownloading(false);

      // Reset status after 3 seconds
      setTimeout(() => {
        setDownloadStatus("idle");
      }, 3000);
    }
  };

  // Responsive positioning
  const positionClasses = {
    "bottom-right": "bottom-20 right-4 sm:bottom-6 sm:right-6 md:bottom-10 md:right-30",
    "bottom-left": "bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8",
    "top-right": "top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8",
    "top-left": "top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8",
  };

  // Comment out resume download option completely per user request
  return null;

  return (
    <div className={`cursor-pointer fixed ${positionClasses[position]} z-50 ${className}`}>
      {/* Expanded Card View */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-background border rounded-lg shadow-lg p-4 w-72 sm:w-80 mb-3"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">Download Resume</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close resume download"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <motion.div
                  animate={{
                    scale: isDownloading ? [1, 1.1, 1] : 1,
                    rotate: isDownloading ? [0, 5, -5, 0] : 0
                  }}
                  transition={{ duration: 0.5, repeat: isDownloading ? Infinity : 0 }}
                >
                  <FileDown size={40} className="text-primary mx-auto" />
                </motion.div>

                {downloadStatus === "success" && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-1 -right-1"
                  >
                    <CheckCircle size={16} className="text-green-500 bg-background rounded-full" />
                  </motion.div>
                )}

                {downloadStatus === "error" && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-1 -right-1"
                  >
                    <AlertCircle size={16} className="text-red-500 bg-background rounded-full" />
                  </motion.div>
                )}
              </div>

              <p className="text-sm text-muted-foreground text-center">
                Get my latest resume to learn more about my experience and skills.
              </p>

              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full relative overflow-hidden"
                size="lg"
              >
                <motion.span
                  animate={{
                    opacity: isDownloading ? 0 : 1,
                    y: isDownloading ? 10 : 0
                  }}
                  className="flex items-center gap-2"
                >
                  <Download size={18} />
                  Download Resume
                </motion.span>

                {isDownloading && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Download size={18} />
                    </motion.div>
                  </motion.div>
                )}
              </Button>

              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: downloadStatus !== "idle" ? 1 : 0,
                  height: downloadStatus !== "idle" ? "auto" : 0
                }}
                className="text-sm w-full text-center"
              >
                {downloadStatus === "success" && (
                  <p className="text-green-600 flex items-center gap-1 justify-center">
                    <CheckCircle size={16} />
                    Download started!
                  </p>
                )}
                {downloadStatus === "error" && (
                  <p className="text-red-600 flex items-center gap-1 justify-center">
                    <AlertCircle size={16} />
                    Download failed. Try again.
                  </p>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button with improved icon display */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center relative group"
        aria-label={isExpanded ? "Close resume download" : "Download resume"}
      >
        {/* Animated icon change */}
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} className="sm:w-6 sm:h-6 w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="file-icon"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <FileDown size={24} className="sm:w-6 sm:h-6 w-5 h-5" />

              {/* Download indicator arrow */}
              <motion.div
                className="absolute -top-1 -right-1 bg-blue-400 rounded-full p-0.5"
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Download size={10} className="text-white" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse animation effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary opacity-0"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />

        {/* Tooltip on hover */}
        <div className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 bg-foreground text-background text-xs rounded whitespace-nowrap">
          Download Resume
        </div>
      </motion.button>
    </div>
  );
};

export default FloatingResumeDownload;