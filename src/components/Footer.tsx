"use client";

import { useRef, useCallback } from "react";
import { Github, Linkedin, Twitter, Instagram, ArrowRight } from "lucide-react";
import gsap from "gsap";

const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
  {
    title: "Services",
    links: ["Web Design", "Branding", "Motion Design", "Development"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Support", "Community", "Changelog"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
];

const SOCIAL_ICONS = [
  { icon: Github, label: "GitHub" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Twitter, label: "Twitter" },
  { icon: Instagram, label: "Instagram" },
];

function MagneticIcon({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(ref.current, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  return (
    <a
      ref={ref}
      href="#"
      className="magnetic-icon"
      aria-label={label}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Icon size={20} />
    </a>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/5 bg-[#050505]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        {/* Top: columns + newsletter */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4
                className="mb-4 text-sm font-bold uppercase tracking-widest text-text"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="footer-link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4
              className="mb-4 text-sm font-bold uppercase tracking-widest text-text"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Newsletter
            </h4>
            <p className="mb-4 text-sm text-text/50">
              Stay updated with our latest projects and insights.
            </p>
            <form
              className="flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="newsletter-input"
                aria-label="Email address"
              />
              <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-white/5" />

        {/* Bottom: social + copyright */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex gap-4">
            {SOCIAL_ICONS.map((s) => (
              <MagneticIcon key={s.label} icon={s.icon} label={s.label} />
            ))}
          </div>

          <p
            className="text-sm text-text/30"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            &copy; {new Date().getFullYear()} VORTEX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
