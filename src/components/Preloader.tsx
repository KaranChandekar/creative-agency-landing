"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const obj = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete,
        });
      },
    });

    tl.to(obj, {
      val: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        const v = Math.round(obj.val);
        setCount(v);
        if (barRef.current) {
          barRef.current.style.width = `${v}%`;
        }
      },
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="preloader">
      <span ref={counterRef} className="preloader-counter">
        {count}%
      </span>
      <div className="preloader-bar-track">
        <div ref={barRef} className="preloader-bar-fill" />
      </div>
    </div>
  );
}
