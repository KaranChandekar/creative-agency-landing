"use client";

import { useState, useCallback, lazy, Suspense } from "react";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import SmoothScroll from "@/components/SmoothScroll";

const ProjectShowcase = lazy(() => import("@/components/ProjectShowcase"));
const MarqueeSection = lazy(() => import("@/components/MarqueeSection"));
const VideoSection = lazy(() => import("@/components/VideoSection"));
const TeamSection = lazy(() => import("@/components/TeamSection"));
const Footer = lazy(() => import("@/components/Footer"));

function SectionFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
    </div>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && <Preloader onComplete={handlePreloaderComplete} />}

      <CustomCursor />

      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <SmoothScroll>
          <Navigation />
          <main>
            <Hero />

            <Suspense fallback={<SectionFallback />}>
              <ProjectShowcase />
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
              <MarqueeSection />
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
              <VideoSection />
            </Suspense>

            <Suspense fallback={<SectionFallback />}>
              <TeamSection />
            </Suspense>
          </main>

          <Suspense fallback={<SectionFallback />}>
            <Footer />
          </Suspense>
        </SmoothScroll>
      </div>
    </>
  );
}
