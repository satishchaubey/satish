"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

import Link from "next/link";
import StylishDock from "@/components/ui/magicdock";
import { HomeIcon, InfoIcon, PhoneIcon, SettingsIcon } from "lucide-react"

interface NavLink {
  text: string;
  url?: string;
  submenu?: React.ReactNode;
}

const dockItems = [
  {
    id: 1,
    icon: <HomeIcon size={24} />,
    label: "Home",
    description: "Go to homepage",
    onClick: () =>
      window.scrollTo({ top: 0, behavior: "smooth" }), // scroll to top
  },
  {
    id: 2,
    icon: <InfoIcon size={24} />,
    label: "About",
    description: "Learn more about us",
    onClick: () => {
      document
        .getElementById("about")
        ?.scrollIntoView({ behavior: "smooth" })
    },
  },
  {
    id: 3,
    icon: <PhoneIcon size={24} />,
    label: "Contact",
    description: "Get in touch",
    onClick: () => {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" })
    },
  },
]

interface NavbarFlowProps {
  emblem?: React.ReactNode;
  links?: NavLink[];
  extraIcons?: React.ReactNode[];
  styleName?: string;
  rightComponent?: React.ReactNode;
}

interface ListItemProps {
  setSelected: (element: string | null) => void;
  selected: string | null;
  element: string;
  children: React.ReactNode;
}

interface HoverLinkProps {
  url: string;
  children: React.ReactNode;
  onPress?: () => void;
}

interface FeatureItemProps {
  heading: string;
  url: string;
  info: string;
  onPress?: () => void;
}

const springTransition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

const ListItem: React.FC<ListItemProps> = ({
  setSelected,
  selected,
  element,
  children,
}) => {
  return (
    <div
      className="relative"
      onMouseEnter={() => setSelected(element)}
      onMouseLeave={(e) => {
        const dropdown = e.currentTarget.querySelector('.dropdown-content');
        if (dropdown) {
          const dropdownRect = dropdown.getBoundingClientRect();
          if (e.clientY < dropdownRect.top - 20) {
            setSelected(null);
          }
        }
      }}
    >
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-gray-800 dark:text-gray-200 font-medium text-base lg:text-xl whitespace-nowrap hover:opacity-[0.9] hover:text-gray-900 dark:hover:text-white py-1"
      >
        {element}
      </motion.p>
      {selected !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={springTransition}
        >
          {selected === element && (
            <div className="absolute top-[calc(100%_+_0.5rem)] left-1/2 transform -translate-x-1/2 z-50">
              <motion.div
                transition={springTransition}
                layoutId="selected"
                className="dropdown-content bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-2xl"
                style={{
                  maxWidth: 'min(90vw, 400px)',
                }}
                onMouseEnter={() => setSelected(element)}
                onMouseLeave={() => setSelected(null)}
              >
                <motion.div layout className="w-max h-full p-4 min-w-48">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const HoverLink: React.FC<HoverLinkProps> = ({ url, children, onPress }) => {
  return (
    <a
      href={url}
      onClick={onPress}
      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
    >
      {children}
    </a>
  );
};

export const FeatureItem: React.FC<FeatureItemProps> = ({
  heading,
  url,
  info,
  onPress,
}) => {
  return (
    <a
      href={url}
      onClick={onPress}
      className="block p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
    >
      <h4 className="font-medium text-gray-900 dark:text-white">{heading}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{info}</p>
    </a>
  );
};

const NavbarFlow: React.FC<NavbarFlowProps> = ({
  emblem,
  links = [],
  extraIcons = [],
  styleName = "",
  rightComponent,
}) => {
  const [sequenceDone, setSequenceDone] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [selectedSubmenu, setSelectedSubmenu] = useState<string | null>(null);
  const [openedSections, setOpenedSections] = useState<Record<string, boolean>>(
    {}
  );
  const [isMounted, setIsMounted] = useState(false);

  const navMotion = useAnimation();
  const emblemMotion = useAnimation();
  const switchMotion = useAnimation();
  const svgMotion = useAnimation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const detectMobile = () => {
      setMobileView(window.innerWidth < 768);
    };

    detectMobile();
    window.addEventListener("resize", detectMobile);
    return () => window.removeEventListener("resize", detectMobile);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const runSequence = async () => {
      if (mobileView) {
        await Promise.all([
          emblemMotion.start({
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          }),
          navMotion.start({
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" },
          }),
          switchMotion.start({
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          }),
        ]);
      } else {
        await navMotion.start({
          width: "auto",
          padding: "10px 30px",
          transition: { duration: 0.8, ease: "easeOut" },
        });

        await svgMotion.start({
          opacity: 1,
          transition: { duration: 0.5 },
        });

        await Promise.all([
          emblemMotion.start({
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          }),
          switchMotion.start({
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          }),
        ]);
      }

      setSequenceDone(true);
    };

    runSequence();
  }, [navMotion, emblemMotion, switchMotion, svgMotion, mobileView, isMounted]);

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  const toggleSection = (text: string) => {
    setOpenedSections((prev) => ({
      ...prev,
      [text]: !prev[text],
    }));
  };

  const hideMobileMenu = () => {
    setMobileMenuVisible(false);
  };

  const renderSubmenuItems = (submenu: React.ReactNode) => {
    if (!React.isValidElement(submenu)) return null;

    const submenuProps = submenu.props as { children?: React.ReactNode };
    if (!submenuProps.children) return null;

    return React.Children.map(submenuProps.children, (child, childIdx) => (
      <div key={childIdx} onClick={hideMobileMenu}>
        {child}
      </div>
    ));
  };

  return (
    <div className={`sticky top-0 z-50 w-full ${styleName}`}>
      <div className="hidden md:block">
        <div className="relative w-full max-w-7xl mx-auto h-24 flex items-center justify-between px-4 lg:px-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={emblemMotion}
            className="bg-gray-100/80 dark:bg-black/95 backdrop-blur-sm text-gray-800 dark:text-gray-200 rounded-full font-semibold text-lg lg:text-xl z-10 flex-shrink-0"
          >
            {emblem}
          </motion.div>

          <motion.nav
            initial={{
              width: "120px",
              padding: "8px 20px",
            }}
            animate={navMotion}
            // className="bg-gray-200/80 dark:bg-black/95 backdrop-blur-sm rounded-full flex items-center justify-center gap-6 lg:gap-12 z-10 flex-shrink-0"
            onMouseLeave={() => setSelectedSubmenu(null)}
            className="bg-white/30 border dark:bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center gap-6 lg:gap-12 z-10 flex-shrink-0"
          >
            {links.map((element) => (
              <div key={element.text}>
                {element.submenu ? (
                  <ListItem
                    setSelected={setSelectedSubmenu}
                    selected={selectedSubmenu}
                    element={element.text}
                  >
                    {element.submenu}
                  </ListItem>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: sequenceDone ? 1 : 0 }}
                  >
                    <Link
                      href={element.url || "/"}
                      className="text-gray-500 dark:text-gray-200 font-medium text-base lg:text-sm whitespace-nowrap hover:text-gray-900 dark:hover:text-white transition-colors py-1"
                    >
                      {element.text}
                    </Link>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={switchMotion}
            className="bg-gray-200/80  dark:bg-black/95 backdrop-blur-sm rounded-full p-2 lg:p-3 z-10 flex-shrink-0 flex items-center gap-2 lg:gap-3"
          >
            {extraIcons.map((icon, idx) => (
              <div key={idx} className="flex items-center justify-center">
                {icon}
              </div>
            ))}

            {rightComponent && (
              <div className="flex items-center justify-center">
                {rightComponent}
              </div>
            )}
          </motion.div>

          <motion.svg
            initial={{ opacity: 0 }}
            animate={svgMotion}
            className="absolute inset-0 w-full h-full z-0 pointer-events-none"
            viewBox="0 0 1400 96"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="connectionBlur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
              </filter>
              <linearGradient
                id="blueGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="cyanGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="purpleGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="orangeGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="1" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="redGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
                <stop offset="50%" stopColor="#ef4444" stopOpacity="1" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="greenGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>

            <motion.path
              d="M 700 48 Q 500 30, 300 40 Q 200 35, 120 48"
              stroke="url(#blueGradient)"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 2, ease: "easeOut", delay: 1.5 }}
            />
            <motion.path
              d="M 700 48 Q 500 30, 300 40 Q 200 35, 120 48"
              stroke="url(#blueGradient)"
              strokeWidth="3"
              fill="none"
              transform="scale(-1,1) translate(-1400,0)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 2, ease: "easeOut", delay: 1.5 }}
            />
            <motion.path
              d="M 700 44 Q 520 60, 320 50 Q 220 55, 130 44"
              stroke="url(#cyanGradient)"
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 2.2, ease: "easeOut", delay: 1.7 }}
            />
            <motion.path
              d="M 700 44 Q 520 60, 320 50 Q 220 55, 130 44"
              stroke="url(#cyanGradient)"
              strokeWidth="2.5"
              fill="none"
              transform="scale(-1,1) translate(-1400,0)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 2.2, ease: "easeOut", delay: 1.7 }}
            />
            <motion.path
              d="M 700 52 Q 480 25, 280 45 Q 180 30, 110 52"
              stroke="url(#purpleGradient)"
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 1.9 }}
            />
            <motion.path
              d="M 700 52 Q 480 25, 280 45 Q 180 30, 110 52"
              stroke="url(#purpleGradient)"
              strokeWidth="2.5"
              fill="none"
              transform="scale(-1,1) translate(-1400,0)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 1.9 }}
            />
            <motion.path
              d="M 700 48 Q 900 35, 1100 45 Q 1200 40, 1280 48"
              stroke="url(#orangeGradient)"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 2, ease: "easeOut", delay: 2.1 }}
            />
            <motion.path
              d="M 700 48 Q 900 35, 1100 45 Q 1200 40, 1280 48"
              stroke="url(#orangeGradient)"
              strokeWidth="3"
              fill="none"
              transform="scale(-1,1) translate(-1400,0)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 2, ease: "easeOut", delay: 2.1 }}
            />
            <motion.path
              d="M 700 44 Q 880 65, 1080 50 Q 1180 60, 1270 44"
              stroke="url(#redGradient)"
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 2.2, ease: "easeOut", delay: 2.3 }}
            />
            <motion.path
              d="M 700 44 Q 880 65, 1080 50 Q 1180 60, 1270 44"
              stroke="url(#redGradient)"
              strokeWidth="2.5"
              fill="none"
              transform="scale(-1,1) translate(-1400,0)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 2.2, ease: "easeOut", delay: 2.3 }}
            />
            <motion.path
              d="M 700 52 Q 920 25, 1120 40 Q 1220 30, 1290 52"
              stroke="url(#greenGradient)"
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 2.5 }}
            />
            <motion.path
              d="M 700 52 Q 920 25, 1120 40 Q 1220 30, 1290 52"
              stroke="url(#greenGradient)"
              strokeWidth="2.5"
              fill="none"
              transform="scale(-1,1) translate(-1400,0)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 2.5 }}
            />

            <g filter="url(#connectionBlur)" opacity="0.3">
              <path
                d="M 700 48 Q 500 30, 300 40 Q 200 35, 120 48"
                stroke="#3b82f6"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M 700 44 Q 520 60, 320 50 Q 220 55, 130 44"
                stroke="#06b6d4"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M 700 52 Q 480 25, 280 45 Q 180 30, 110 52"
                stroke="#8b5cf6"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M 700 48 Q 900 35, 1100 45 Q 1200 40, 1280 48"
                stroke="#f59e0b"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M 700 44 Q 880 65, 1080 50 Q 1180 60, 1270 44"
                stroke="#ef4444"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M 700 52 Q 920 25, 1120 40 Q 1220 30, 1290 52"
                stroke="#10b981"
                strokeWidth="4"
                fill="none"
              />
            </g>
          </motion.svg>
        </div>
      </div>

      {/* mobile view */}
      <div className="block md:hidden">
        <div className="fixed bottom-0 left-0 w-full  z-50 md:hidden">
          <StylishDock
            items={dockItems}
            distance={150}
            panelHeight={60}
            baseItemSize={40}
            magnification={70}
            variant="default"
          />
        </div>
      </div>
    </div>
  );
};

export default NavbarFlow;