"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SparklesProps {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
  speed?: number;
}

interface Particle {
  id: string;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export const SparklesCore: React.FC<SparklesProps> = ({
  id,
  className = "",
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 1200,
  particleColor = "#FFF",
  speed = 1,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = React.useRef<HTMLDivElement>(null);
  const context = React.useRef<CanvasRenderingContext2D | null>(null);
  const circles = React.useRef<any[]>([]);
  const mousePosition = React.useRef({ x: 0, y: 0 });
  const animationFrame = React.useRef<number>();
  const canvasSize = React.useRef({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();
    const handleResize = () => {
      initCanvas();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  const initCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      const canvas = canvasRef.current;
      const container = canvasContainerRef.current;
      canvas.width = container.offsetWidth * dpr;
      canvas.height = container.offsetHeight * dpr;
      canvas.style.width = container.offsetWidth + "px";
      canvas.style.height = container.offsetHeight + "px";
      context.current.scale(dpr, dpr);
      canvasSize.current.w = container.offsetWidth;
      canvasSize.current.h = container.offsetHeight;
      context.current.fillStyle = particleColor;
      context.current.strokeStyle = particleColor;
      context.current.lineWidth = 1;
      for (let i = 0; i < particleDensity; i++) {
        const circle = {
          x: Math.random() * canvasSize.current.w,
          y: Math.random() * canvasSize.current.h,
          translateX: 0,
          translateY: 0,
          size: Math.random() * (maxSize - minSize) + minSize,
          alpha: 0,
          targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
          dx: (Math.random() - 0.5) * 0.3 * speed,
          dy: (Math.random() - 0.5) * 0.3 * speed,
          magnetism: 0.1 + Math.random() * 4,
        };
        circles.current.push(circle);
      }
    }
  };

  const animate = () => {
    if (context.current && canvasSize.current.w && canvasSize.current.h) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
      circles.current.forEach((circle: any, i: number) => {
        // Handle the alpha value
        const edge = [
          circle.x + circle.translateX - circle.size, // distance from left edge
          canvasSize.current.w - circle.x - circle.translateX - circle.size, // distance from right edge
          circle.y + circle.translateY - circle.size, // distance from top edge
          canvasSize.current.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
        ];
        const closestEdge = edge.reduce((a, b) => Math.min(a, b));
        const remapClosestEdge = parseFloat(
          remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
        );
        if (remapClosestEdge > 1) {
          circle.alpha += 0.02;
          if (circle.alpha > circle.targetAlpha) {
            circle.alpha = circle.targetAlpha;
          }
        } else {
          circle.alpha = circle.targetAlpha * remapClosestEdge;
        }
        circle.x += circle.dx;
        circle.y += circle.dy;
        circle.translateX +=
          (mousePosition.current.x / (canvasSize.current.w) - 0.5) *
          circle.magnetism;
        circle.translateY +=
          (mousePosition.current.y / (canvasSize.current.h) - 0.5) *
          circle.magnetism;
        // circle gets out of the canvas
        if (
          circle.x < -circle.size ||
          circle.x > canvasSize.current.w + circle.size ||
          circle.y < -circle.size ||
          circle.y > canvasSize.current.h + circle.size
        ) {
          // remove the circle
          circles.current.splice(i, 1);
          // create a new circle
          const newCircle = {
            x: Math.random() * canvasSize.current.w,
            y: Math.random() * canvasSize.current.h,
            translateX: 0,
            translateY: 0,
            size: Math.random() * (maxSize - minSize) + minSize,
            alpha: 0,
            targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
            dx: (Math.random() - 0.5) * 0.3 * speed,
            dy: (Math.random() - 0.5) * 0.3 * speed,
            magnetism: 0.1 + Math.random() * 4,
          };
          circles.current.push(newCircle);
        }
        drawCircle(circle);
      });
    }
    animationFrame.current = requestAnimationFrame(animate);
  };

  const remapValue = (
    value: number,
    start1: number,
    stop1: number,
    start2: number,
    stop2: number
  ): number => {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  };

  const drawCircle = (circle: any) => {
    if (context.current) {
      context.current.beginPath();
      context.current.arc(
        circle.x + circle.translateX,
        circle.y + circle.translateY,
        circle.size,
        0,
        2 * Math.PI
      );
      context.current.fillStyle = `rgba(255, 255, 255, ${circle.alpha})`;
      context.current.fill();
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (canvasContainerRef.current) {
      const rect = canvasContainerRef.current.getBoundingClientRect();
      mousePosition.current.x = e.clientX - rect.left;
      mousePosition.current.y = e.clientY - rect.top;
    }
  };

  return (
    <div
      ref={canvasContainerRef}
      onMouseMove={onMouseMove}
      className={className}
      style={{
        background,
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export const Sparkles: React.FC<{
  children: React.ReactNode;
  className?: string;
  sparklesCount?: number;
}> = ({ children, className = "", sparklesCount = 50 }) => {
  const sparkles = Array.from({ length: sparklesCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 2,
  }));

  return (
    <div className={`relative ${className}`}>
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute bg-white rounded-full opacity-70"
          style={
            {
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
            } as React.CSSProperties
          }
          animate={{
            opacity: [0.7, 0.3, 0.7],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      {children}
    </div>
  );
};