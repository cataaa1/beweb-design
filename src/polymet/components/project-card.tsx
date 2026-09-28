import { useRef, type PointerEvent } from "react";
import { ArrowUpRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/polymet/data/beweb-data";

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
}

export function ProjectCard({ project, index, className }: ProjectCardProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = frameRef.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateY(${px * 7}deg) rotateX(${py * -7}deg) translateZ(0)`;
    el.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
  };

  const onLeave = () => {
    const el = frameRef.current;
    if (el) el.style.transform = "perspective(1100px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("group block", className)}
    >
      <div
        ref={frameRef}
        className="relative overflow-hidden border border-bruma/15 bg-marino-2 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] transition-transform duration-500 ease-out [transform-style:preserve-3d]"
      >
        <div className="flex items-center gap-3 border-b border-bruma/10 px-3 py-2">
          <span className="flex gap-1">
            <span className="h-2 w-2 bg-ladrillo/80" />
            <span className="h-2 w-2 bg-bruma/30" />
            <span className="h-2 w-2 bg-bruma/30" />
          </span>
          <span className="flex-1 truncate font-mono text-[10px] text-crema/40">
            {project.domain}
          </span>
          <span className="font-mono text-[10px] text-crema/40">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.image}
            alt={`Sitio de ${project.name}`}
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(420px_circle_at_var(--gx,50%)_var(--gy,50%),rgba(237,230,216,0.16),transparent_60%)]" />
          <span className="absolute bottom-3 right-3 grid h-11 w-11 translate-y-3 place-items-center bg-ladrillo text-crema opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRightIcon className="h-4 w-4" />
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto] gap-x-6 gap-y-2">
        <h3 className="text-2xl font-medium tracking-[-0.03em] text-crema">{project.name}</h3>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-crema/50 pt-2">
          {project.type}
        </span>
        <p className="max-w-md text-sm leading-relaxed text-crema/60">{project.summary}</p>
        <span className="font-mono text-[11px] text-bruma/70 self-end text-right">
          Visitar sitio ↗
        </span>
      </div>
    </a>
  );
}
