"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SparklesTextProps {
  children: string;
  className?: string;
  sparklesCount?: number;
  colors?: {
    first: string;
    second: string;
  };
}

interface Sparkle {
  id: number;
  x: string;
  y: string;
  color: string;
  delay: number;
  scale: number;
  lifespan: number;
}

const SparklesText = ({
  children,
  className,
  sparklesCount = 10,
  colors = {
    first: "#9E7AFF",
    second: "#FE8BBB",
  },
  ...props
}: SparklesTextProps) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const generateSpark = (id: number): Sparkle => ({
      id,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      color: Math.random() > 0.5 ? colors.first : colors.second,
      delay: Math.random() * 2,
      scale: Math.random() * 1 + 0.3,
      lifespan: Math.random() * 10 + 5,
    });

    const initializeSparks = () => {
      const newSparks = Array.from({ length: sparklesCount }, (_, i) =>
        generateSpark(i)
      );
      setSparkles(newSparks);
    };

    const updateSparks = () => {
      setSparkles((currentSparks) =>
        currentSparks.map((spark) => {
          if (spark.lifespan <= 0) {
            return generateSpark(spark.id);
          } else {
            return { ...spark, lifespan: spark.lifespan - 0.1 };
          }
        })
      );
    };

    initializeSparks();
    const interval = setInterval(updateSparks, 100);

    return () => clearInterval(interval);
  }, [colors.first, colors.second, sparklesCount]);

  return (
    <div
      className={cn("relative inline-block", className)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0">
        {sparkles.map((sparkle) => (
          <motion.svg
            key={sparkle.id}
            className="pointer-events-none absolute z-20"
            style={{
              left: sparkle.x,
              top: sparkle.y,
              color: sparkle.color,
            }}
            width="21"
            height="21"
            viewBox="0 0 21 21"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, sparkle.scale, 0],
            }}
            transition={{
              duration: sparkle.lifespan / 10,
              delay: sparkle.delay,
              repeat: Infinity,
            }}
          >
            <path
              d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7848 10.0553 20.7848 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7848 10.0553 20.7848 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
              fill="currentColor"
            />
          </motion.svg>
        ))}
      </span>
    </div>
  );
};

export { SparklesText };