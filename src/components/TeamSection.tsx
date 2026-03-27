"use client";

import { useEffect, useRef, memo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Twitter } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  {
    name: "Alex Rivera",
    role: "Creative Director",
    bio: "10+ years shaping brand identities for Fortune 500 companies. Passionate about the intersection of design and technology.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    name: "Sarah Chen",
    role: "Lead Developer",
    bio: "Full-stack architect specializing in performant web experiences. Open-source contributor and WebGL enthusiast.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
  },
  {
    name: "Marcus Webb",
    role: "Motion Designer",
    bio: "Award-winning motion designer bringing brands to life through animation. Former Pixar and Google creative team.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
  },
  {
    name: "Emi Tanaka",
    role: "UX Strategist",
    bio: "Human-centered design advocate with expertise in research-driven product strategy. Speaker at Config and SXSW.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
  },
];

const TeamCard = memo(function TeamCard({
  member,
}: {
  member: (typeof TEAM)[0];
}) {
  return (
    <div className="team-card">
      <div className="team-card-image">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-top"
          unoptimized
        />
      </div>
      <div className="team-card-overlay">
        <h3
          className="text-xl font-bold text-text"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {member.name}
        </h3>
        <p className="mb-2 text-sm font-medium text-accent">{member.role}</p>
        <p className="text-sm leading-relaxed text-text/60">{member.bio}</p>
        <div className="team-card-socials">
          <a href="#" className="team-social-icon" aria-label="GitHub">
            <Github size={16} />
          </a>
          <a href="#" className="team-social-icon" aria-label="LinkedIn">
            <Linkedin size={16} />
          </a>
          <a href="#" className="team-social-icon" aria-label="Twitter">
            <Twitter size={16} />
          </a>
        </div>
      </div>
    </div>
  );
});

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current || !sectionRef.current) return;

    const cards = gridRef.current.querySelectorAll(".team-card");

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="skew-section py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p
            className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-accent"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            The Team
          </p>
          <h2
            className="text-4xl font-bold md:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
            data-cursor="text"
          >
            Meet the Creators
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TEAM.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
