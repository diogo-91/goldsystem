"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function MotionSystem() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".hero-line > span",
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "all",
        },
      );
      gsap.fromTo(
        ".hero-developed",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          delay: 0.55,
          ease: "power3.out",
          clearProps: "all",
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 32, opacity: 0.15 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 94%", once: true },
            clearProps: "all",
          },
        );
      });
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".transformation",
          start: "top 65%",
          end: "bottom 85%",
          scrub: 0.7,
        },
      });
      timeline
        .to(
          ".chaos-piece",
          { x: 0, y: 0, rotation: 0, stagger: 0.035, ease: "power1.inOut" },
          0,
        )
        .fromTo(
          ".network-line",
          { strokeDashoffset: 420 },
          { strokeDashoffset: 0, stagger: 0.06 },
          0.05,
        )
        .to(
          ".network-core",
          { scale: 1.08, boxShadow: "0 0 80px #4a9fff40", duration: 0.5 },
          0.2,
        )
        .fromTo(
          ".transformation-result",
          { opacity: 0.2, y: 25 },
          { opacity: 1, y: 0 },
          0.15,
        );
      gsap.fromTo(
        ".process-track-fill",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".process",
            start: "top 75%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        },
      );
    });
    return () => mm.revert();
  }, []);
  return null;
}
