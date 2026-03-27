"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return;

    const children = contentRef.current.children;

    const ctx = gsap.context(() => {
      gsap.from(children, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="video-section skew-section">
      {/* Video Background with fallback */}
      <div className="video-bg">
        {/* Fallback gradient if video doesn't load */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 30%, #0a1628 60%, #0a0a0a 100%)",
          }}
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="relative z-1"
          poster="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80"
        >
          <source
            src="https://videos.pexels.com/video-files/3129671/3129671-sd_640_360_30fps.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Overlay */}
      <div className="video-overlay" />

      {/* Content */}
      <div ref={contentRef} className="video-content mx-auto max-w-4xl px-6">
        <p
          className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          How We Work
        </p>
        <h2
          className="mb-6 text-4xl font-bold md:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-display)" }}
          data-cursor="text"
        >
          Our Creative
          <br />
          Process
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-text/60">
          Combining art and technology to deliver experiences that resonate. From
          concept to launch, every pixel is intentional.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a href="#contact" className="hero-cta">
            <span>Start a Project</span>
            <ArrowRight size={16} className="hero-cta-arrow" />
          </a>
          <button
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
            aria-label="Watch showreel"
          >
            <Play size={16} />
            Watch Showreel
          </button>
        </div>
      </div>
    </section>
  );
}
