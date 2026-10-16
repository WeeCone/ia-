"use client";

import { useEffect } from "react";

/**
 * Starts the [data-reveal] / [data-reveal-stagger] transitions defined in globals.css as each block enters the screen,
 * once. Blocks already on screen are marked shown before anything is hidden, so nothing flickers on load.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const targets = [...document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-stagger]")];

    for (const target of targets) {
      if (target.hasAttribute("data-reveal-stagger")) {
        [...target.children].forEach((child, index) => (child as HTMLElement).style.setProperty("--i", String(index)));
      }
      if (target.getBoundingClientRect().top < window.innerHeight * 0.92) target.classList.add("is-in");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    targets.filter((target) => !target.classList.contains("is-in")).forEach((target) => observer.observe(target));
    root.classList.add("reveal-ready");

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
