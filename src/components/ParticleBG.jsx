"use client";

import { useCallback } from "react";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";

export default function ParticleBG() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        particles: {
          number: {
            value: 50,
          },
          size: {
            value: 5,
          },
          move: {
            enable: true,
            speed: 1,
          },
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: "repulse",
            },
          },
        },
      }}
      className="absolute inset-0 -z-10"
    />
  );
}
