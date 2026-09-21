import { useEffect } from "react";

/**
 * Adds `.is-visible` to any element with `.reveal`, `.reveal-scale`,
 * `.reveal-left`, or `.reveal-right` when it enters the viewport.
 * Supports staggering via `data-delay="150"` (ms).
 */
export const useScrollReveal = () => {
  useEffect(() => {
    const selector = ".reveal, .reveal-scale, .reveal-left, .reveal-right";
    const items = Array.from(document.querySelectorAll<HTMLElement>(selector));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = Number(el.dataset.delay || 0);
            window.setTimeout(() => el.classList.add("is-visible"), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    items.forEach((el) => io.observe(el));

    // Observe items added later
    const mo = new MutationObserver(() => {
      document
        .querySelectorAll<HTMLElement>(selector)
        .forEach((el) => {
          if (!el.classList.contains("is-visible")) io.observe(el);
        });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
};
