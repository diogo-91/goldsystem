"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function MotionSystem() {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".ref-hero-copy > *",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.07,
          ease: "power2.out",
          clearProps: "all",
        },
      );
      gsap.fromTo(
        ".ref-hero-overlays",
        { y: 18, opacity: 0.25 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          delay: 0.12,
          ease: "power2.out",
          clearProps: "all",
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        if (element.closest("dialog")) return;
        gsap.fromTo(
          element,
          { y: 18, opacity: 0.5 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 94%", once: true },
            clearProps: "all",
          },
        );
      });
    });
    return () => media.revert();
  }, []);
  return null;
}
