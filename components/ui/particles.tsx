"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type {
  Container,
  Engine,
  ISourceOptions,
} from "@tsparticles/engine";
import {
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";

interface ParticlesProps {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
  shape?: "circle" | "edge" | "triangle" | "polygon" | "star";
  staticity?: number;
  ease?: number;
  refresh?: boolean;
}

export default function ParticlesComponent({
  id = "tsparticles",
  className = "",
  background = "transparent",
  particleSize = 1,
  minSize = 0.5,
  maxSize = 1.5,
  speed = 1,
  particleColor = "#ffffff",
  particleDensity = 120,
  shape = "circle",
  staticity = 50,
  ease = 50,
  refresh = false,
}: ParticlesProps) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    // Particles loaded callback
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      key: `${id}-${refresh}`,
      background: {
        color: {
          value: background,
        },
      },
      fullScreen: {
        enable: false,
        zIndex: 1,
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
          resize: {
            enable: true,
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: particleColor,
        },
        links: {
          color: particleColor,
          distance: 150,
          enable: false,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: false,
          speed: speed,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: particleDensity,
        },
        opacity: {
          value: 0.5,
          random: {
            enable: true,
            minimumValue: 0.1,
          },
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.1,
            sync: false,
          },
        },
        shape: {
          type: shape,
        },
        size: {
          value: { min: minSize, max: maxSize },
          random: {
            enable: true,
            minimumValue: minSize,
          },
          animation: {
            enable: true,
            speed: 2,
            minimumValue: minSize,
            sync: false,
          },
        },
      },
      detectRetina: true,
    }),
    [
      id,
      background,
      particleColor,
      speed,
      particleDensity,
      minSize,
      maxSize,
      shape,
      refresh,
    ]
  );

  if (init) {
    return (
      <Particles
        id={id}
        className={className}
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
}