import { useEffect, useState } from "react";

const LINES = [
  { cmd: "figma export --tokens", out: "142 tokens" },
  { cmd: "astro build", out: "ok 1.2s" },
  { cmd: "pnpm test", out: "86 passed" },
  { cmd: "docker push beweb/api", out: "sha:9f2c" },
  { cmd: "vercel deploy --prod", out: "live" },
  { cmd: "lighthouse /", out: "100 / 100" },
];

export function DeployTicker() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % (LINES.length + 2)), 1100);
    return () => clearInterval(id);
  }, []);

  const shown = LINES.slice(0, Math.min(step, LINES.length));

  return (
    <div className="w-[280px] border border-bruma/15 bg-marino/85 font-mono text-[11px] leading-relaxed text-crema/80 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-bruma/10 px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-bruma/60">
        <span>beweb / deploy</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 bg-ladrillo bw-blink" />
          prod
        </span>
      </div>
      <ul className="h-[132px] space-y-0.5 overflow-hidden px-3 py-2.5">
        {shown.map((l) => (
          <li key={l.cmd} className="flex justify-between gap-3 animate-in fade-in slide-in-from-bottom-1 duration-300">
            <span className="truncate">
              <span className="text-ladrillo">›</span> {l.cmd}
            </span>
            <span className={l.out === "live" ? "text-bruma" : "text-crema/40"}>{l.out}</span>
          </li>
        ))}
        {step < LINES.length && (
          <li>
            <span className="text-ladrillo">›</span> <span className="inline-block h-3 w-1.5 translate-y-0.5 bg-crema/70 bw-blink" />
          </li>
        )}
      </ul>
    </div>
  );
}
