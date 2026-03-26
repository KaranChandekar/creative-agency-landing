"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    // Scroll velocity-based skew effect + marquee modulation
    lenis.on("scroll", (e: { velocity: number }) => {
      const velocity = e.velocity;
      const clampedSkew = Math.max(-5, Math.min(5, velocity * 0.5));

      gsap.to(".skew-section", {
        skewY: clampedSkew,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Marquee velocity modulation
      const marquees = document.querySelectorAll(".marquee-track");
      marquees.forEach((track) => {
        const tween = (
          track as HTMLDivElement & { _marquee?: gsap.core.Tween }
        )._marquee;
        if (tween) {
          const speed = 1 + Math.abs(velocity) * 0.5;
          gsap.to(tween, {
            timeScale: speed,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      });
    });

    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
