"use client";

import { useEffect, useRef, memo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: "Nebula Studios",
    description:
      "A fully immersive brand identity and website for a next-gen gaming studio.",
    tags: ["Branding", "Web Design", "Motion"],
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
  },
  {
    id: 2,
    title: "Arcadia Finance",
    description:
      "Fintech platform redesign with intuitive dashboards and real-time data visualization.",
    tags: ["UI/UX", "React", "D3.js"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    id: 3,
    title: "Echo Collective",
    description:
      "Music label website with interactive audio visualizations and artist profiles.",
    tags: ["WebGL", "Audio API", "Next.js"],
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
  },
  {
    id: 4,
    title: "Verdant Living",
    description:
      "Sustainable lifestyle e-commerce with 3D product exploration and AR try-on.",
    tags: ["E-commerce", "Three.js", "AR"],
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
  },
  {
    id: 5,
    title: "Pulse Health",
    description:
      "Health & wellness app with real-time biometric tracking and personalized insights.",
    tags: ["Mobile", "Swift", "ML"],
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
  },
];

const ProjectCard = memo(function ProjectCard({
  project,
}: {
  project: (typeof PROJECTS)[0];
}) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.8,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="project-card" data-cursor="project">
      <div ref={imageRef} className="project-card-image project-card-image-reveal">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 1023px) 100vw, 400px"
          className="object-cover"
          unoptimized
        />
        <div className="project-card-image-overlay" />
      </div>

      <div className="project-card-content">
        <h3
          className="mb-2 text-xl font-bold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {project.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-text/60">
          {project.description}
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors hover:text-accent/80"
        >
          View Project <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
});

export default function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const totalWidth =
        trackRef.current!.scrollWidth - sectionRef.current!.offsetWidth;

      gsap.to(trackRef.current, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="work" className="relative overflow-hidden pt-16 md:pt-24">
      {/* Section header — visible on all sizes */}
      <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
        <p
          className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-accent"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Selected Work
        </p>
        <h2
          className="text-4xl font-bold md:text-5xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Our Projects
        </h2>
      </div>

      {/* Desktop: horizontal scroll track */}
      <div
        ref={trackRef}
        className="hidden lg:flex items-end gap-10 pb-24"
        style={{ paddingLeft: "max(2rem, calc((100vw - 80rem) / 2 + 1.5rem))", paddingRight: "2rem" }}
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Mobile/Tablet: vertical grid */}
      <div className="mx-auto grid max-w-7xl gap-6 px-6 pb-16 sm:grid-cols-2 lg:hidden">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
