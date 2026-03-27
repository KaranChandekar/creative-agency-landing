"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const titleText = titleRef.current.textContent || "";
    titleRef.current.innerHTML = "";

    // Split into words then chars
    const words = titleText.split(" ");
    words.forEach((word, wi) => {
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";
      wordSpan.style.whiteSpace = "nowrap";

      for (const char of word) {
        const charSpan = document.createElement("span");
        charSpan.className = "hero-title-char";
        charSpan.textContent = char;
        wordSpan.appendChild(charSpan);
      }

      titleRef.current!.appendChild(wordSpan);
      if (wi < words.length - 1) {
        const space = document.createElement("span");
        space.innerHTML = "&nbsp;";
        space.className = "hero-title-char";
        titleRef.current!.appendChild(space);
      }
    });

    const chars = titleRef.current.querySelectorAll(".hero-title-char");

    // Set initial states
    gsap.set(chars, { opacity: 0, scale: 0, rotation: -15 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
    gsap.set(ctaRef.current, { opacity: 0, y: 20 });

    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(chars, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.05,
    });

    tl.to(
      subtitleRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.3"
    );

    tl.to(
      ctaRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.2"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: "#0a0a0a" }}
    >
      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Decorative gradient circles */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[100px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center lg:px-8">
        <p
          className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-accent"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Creative Digital Agency
        </p>

        <h1
          ref={titleRef}
          className="mb-8 text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl lg:text-8xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          We Craft Digital Experiences
        </h1>

        <p
          ref={subtitleRef}
          className="mb-12 max-w-2xl text-center text-lg leading-relaxed text-text/60 md:text-xl"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Blending cutting-edge technology with bold creative vision to build
          award-winning digital products that captivate and convert.
        </p>

        <div className="flex justify-center">
          <a ref={ctaRef} href="#work" className="hero-cta">
            <span>Explore Our Work</span>
            <ArrowRight size={16} className="hero-cta-arrow" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span
          className="text-xs uppercase tracking-widest text-text/30"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Scroll
        </span>
        <div className="h-12 w-[1px] bg-gradient-to-b from-text/30 to-transparent" />
      </div>
    </section>
  );
}
