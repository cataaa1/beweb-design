import { cn } from "@/lib/utils";

interface ServiceVisualProps {
  active: number;
}

function Block({ className }: { className?: string }) {
  return <div className={cn("bg-bruma/15", className)} />;
}

export function ServiceVisual({ active }: ServiceVisualProps) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden border border-bruma/15 bg-marino bw-dots-bg">
      <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.14em] text-bruma/50">
        fig. 0{active + 1}
      </div>

      {/* 01 Institucional — layout wireframe */}
      <div
        className={cn(
          "absolute inset-10 flex flex-col gap-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          active === 0 ? "opacity-100 [transform:none]" : "pointer-events-none opacity-0 [transform:translateY(24px)_scale(0.96)]"
        )}
      >
        <div className="flex items-center justify-between">
          <Block className="h-3 w-16 bg-crema/70" />
          <div className="flex gap-2">
            <Block className="h-2 w-8" />
            <Block className="h-2 w-8" />
            <Block className="h-2 w-8" />
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <Block className="h-7 w-[85%] bg-crema/80" />
          <Block className="h-7 w-[60%] bg-crema/80" />
        </div>
        <Block className="mt-3 h-[38%] w-full bg-acero" />
        <div className="grid flex-1 grid-cols-3 gap-2">
          <Block />
          <Block />
          <Block className="bg-ladrillo/80" />
        </div>
      </div>

      {/* 02 Ecommerce — product grid + cart */}
      <div
        className={cn(
          "absolute inset-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          active === 1 ? "opacity-100 [transform:none]" : "pointer-events-none opacity-0 [transform:translateY(24px)_scale(0.96)]"
        )}
      >
        <div className="grid h-full grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-2 border border-bruma/10 p-2">
              <div className={cn("flex-1", i === 1 ? "bg-ladrillo/80" : "bg-acero/70")} />
              <Block className="h-2 w-3/4 bg-crema/60" />
              <Block className="h-2 w-1/3" />
            </div>
          ))}
        </div>
        <div className="absolute -right-2 bottom-8 w-44 border border-crema/20 bg-marino-2 p-3 shadow-2xl">
          <div className="flex items-center justify-between font-mono text-[10px] text-crema/70">
            <span>Carrito</span>
            <span>3</span>
          </div>
          <div className="mt-3 space-y-1.5">
            <Block className="h-2 w-full" />
            <Block className="h-2 w-4/5" />
          </div>
          <div className="mt-3 bg-ladrillo py-1.5 text-center font-mono text-[10px] text-crema">
            Pagar $ 48.900
          </div>
        </div>
      </div>

      {/* 03 Desarrollo — service graph */}
      <div
        className={cn(
          "absolute inset-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          active === 2 ? "opacity-100 [transform:none]" : "pointer-events-none opacity-0 [transform:translateY(24px)_scale(0.96)]"
        )}
      >
        <svg viewBox="0 0 300 380" className="h-full w-full">
          <g stroke="#9CC2E0" strokeOpacity="0.5" fill="none" strokeWidth="1.2">
            <path className="bw-dash" d="M150 70 L70 190" />
            <path className="bw-dash" d="M150 70 L230 190" />
            <path className="bw-dash" d="M70 190 L150 310" />
            <path className="bw-dash" d="M230 190 L150 310" />
          </g>
          {[
            { x: 150, y: 70, l: "web", c: "#EDE6D8" },
            { x: 70, y: 190, l: "api", c: "#3E5C7E" },
            { x: 230, y: 190, l: "worker", c: "#3E5C7E" },
            { x: 150, y: 310, l: "postgres", c: "#B5473A" },
          ].map((n) => (
            <g key={n.l}>
              <rect x={n.x - 44} y={n.y - 20} width="88" height="40" fill="#1F2F45" stroke={n.c} strokeWidth="1.2" />
              <rect x={n.x - 36} y={n.y - 4} width="8" height="8" fill={n.c} />
              <text x={n.x - 22} y={n.y + 4} fill="#EDE6D8" fontSize="11" fontFamily="Space Mono">
                {n.l}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* 04 Consultoría — maturity levels */}
      <div
        className={cn(
          "absolute inset-10 flex flex-col justify-end gap-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          active === 3 ? "opacity-100 [transform:none]" : "pointer-events-none opacity-0 [transform:translateY(24px)_scale(0.96)]"
        )}
      >
        {[
          { l: "L4", w: "w-[92%]", c: "bg-ladrillo" },
          { l: "L3", w: "w-[72%]", c: "bg-crema/80" },
          { l: "L2", w: "w-[52%]", c: "bg-bruma/70" },
          { l: "L1", w: "w-[32%]", c: "bg-acero" },
        ].map((b, i) => (
          <div key={b.l} className="flex items-center gap-3">
            <span className="w-6 font-mono text-[10px] text-crema/60">{b.l}</span>
            <div
              className={cn("h-10 origin-left transition-transform duration-1000", b.w, b.c)}
              style={{
                transform: active === 3 ? "scaleX(1)" : "scaleX(0)",
                transitionDelay: `${(3 - i) * 120}ms`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
