"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  
  useEffect(() => {
    // Only run on desktop devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Enlarge cursor if hovering over a clickable element
      if (
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button"
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100] hidden md:block"
      style={{
        backgroundColor: "white",
        mixBlendMode: "difference", // This makes it invert colors underneath
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        x: position.x,
        y: position.y,
        scale: isPointer ? 1.8 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 800,
        damping: 35,
        mass: 0.2
      }}
    />
  );
}
