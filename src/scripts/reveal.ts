// Scroll reveals: [data-reveal] blocks fade/slide in, [data-split] headings slide each line up.
// Same thresholds, offsets and timings as the old Reveal / SplitLines React components.

export function showReveal(el: HTMLElement) {
  el.style.transform = "translate3d(0,0,0)";
  el.style.opacity = "1";
}

export function hideReveal(el: HTMLElement) {
  el.style.transform = `translate3d(0,${el.dataset.y ?? 28}px,0)`;
  el.style.opacity = "0";
}

const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      showReveal(entry.target as HTMLElement);
      obs.unobserve(entry.target);
    }
  },
  { threshold: 0.15 },
);

/** Starts (or restarts) watching a reveal block */
export function observeReveal(el: HTMLElement) {
  revealObserver.observe(el);
}

const splitObserver = new IntersectionObserver(
  (entries, obs) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.querySelectorAll<HTMLElement>("[data-split-line]").forEach((line) => {
        line.style.transform = "translate3d(0,0,0)";
      });
      obs.unobserve(entry.target);
    }
  },
  { threshold: 0.2 },
);

document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(observeReveal);
document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => splitObserver.observe(el));
