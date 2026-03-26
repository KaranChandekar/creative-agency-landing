"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { useCursorStore } from "@/lib/cursor-store";
import { isTouchDevice } from "@/lib/utils";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { state, label } = useCursorStore();
  const mousePos = useRef({ x: -100, y: -100 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice()) return;

    window.addEventListener("mousemove", handleMouseMove);

    // Track hover states for interactive elements
    const handlePointerOver = (e: Event) => {
      const target = e.target as HTMLElement;
      const closest = target.closest(
        "a, button, [data-cursor='link']"
      );
      const projectCard = target.closest("[data-cursor='project']");
      const textArea = target.closest("[data-cursor='text']");

      if (projectCard) {
        useCursorStore.getState().setState("project", "View");
      } else if (textArea) {
        useCursorStore.getState().setState("text", "Read");
      } else if (closest) {
        useCursorStore.getState().setState("link");
      }
    };

    const handlePointerOut = (e: Event) => {
      const target = e.target as HTMLElement;
      const related = (e as MouseEvent).relatedTarget as HTMLElement | null;
      const interactive = target.closest(
        "a, button, [data-cursor='link'], [data-cursor='project'], [data-cursor='text']"
      );

      if (interactive && (!related || !interactive.contains(related))) {
        useCursorStore.getState().reset();
      }
    };

    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
    };
  }, [handleMouseMove]);

  if (typeof window !== "undefined" && isTouchDevice()) return null;

  const stateClass =
    state === "link"
      ? "link-hover"
      : state === "project"
        ? "project-hover"
        : state === "text"
          ? "text-hover"
          : "";

  return (
    <div ref={cursorRef} className={`custom-cursor ${stateClass}`}>
      {label && <span className="custom-cursor-label">{label}</span>}
    </div>
  );
}
