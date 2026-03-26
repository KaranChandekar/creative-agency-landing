import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function animateHeroTitle(container: HTMLElement) {
  const chars = container.querySelectorAll(".hero-title-char");
  const tl = gsap.timeline();

  tl.from(chars, {
    opacity: 0,
    scale: 0,
    rotation: -15,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.05,
  });

  return tl;
}

export function animateImageReveal(element: HTMLElement) {
  gsap.fromTo(
    element,
    { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.8,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    }
  );
}

export function animateStaggerIn(
  elements: HTMLElement[] | NodeListOf<Element>,
  options?: { stagger?: number; y?: number; trigger?: HTMLElement }
) {
  gsap.from(elements, {
    opacity: 0,
    y: options?.y ?? 60,
    duration: 0.8,
    ease: "power2.out",
    stagger: options?.stagger ?? 0.15,
    scrollTrigger: {
      trigger: options?.trigger ?? elements[0],
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
}

export function createHorizontalScroll(
  container: HTMLElement,
  track: HTMLElement
) {
  const totalWidth = track.scrollWidth - container.offsetWidth;

  return gsap.to(track, {
    x: -totalWidth,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: () => `+=${totalWidth}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });
}

export function createMarquee(
  track: HTMLElement,
  direction: "left" | "right"
) {
  const distance = track.scrollWidth / 2;
  const xPercent = direction === "left" ? -100 : 0;
  const xPercentEnd = direction === "left" ? 0 : -100;

  gsap.set(track, { xPercent: xPercent });

  return gsap.to(track, {
    xPercent: xPercentEnd,
    duration: 20,
    ease: "none",
    repeat: -1,
  });
}
