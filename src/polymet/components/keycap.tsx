import { cn } from "@/lib/utils";
import type { Tool } from "@/polymet/data/beweb-data";

type KeycapTone = "crema" | "marino" | "ladrillo" | "acero";

interface KeycapProps {
  tool: Tool;
  tone?: KeycapTone;
  pressed?: boolean;
  onPress?: () => void;
}

const TONES: Record<KeycapTone, { face: string; side: string; text: string; sub: string }> = {
  crema: { face: "bg-crema", side: "#b8ad98", text: "text-marino", sub: "text-marino/50" },
  marino: { face: "bg-marino", side: "#0d131d", text: "text-crema", sub: "text-crema/50" },
  ladrillo: { face: "bg-ladrillo", side: "#7a2d24", text: "text-crema", sub: "text-crema/60" },
  acero: { face: "bg-acero", side: "#243a52", text: "text-crema", sub: "text-crema/60" },
};

export function Keycap({ tool, tone = "crema", pressed = false, onPress }: KeycapProps) {
  const t = TONES[tone];
  return (
    <button
      type="button"
      onClick={onPress}
      aria-label={tool.name}
      aria-pressed={pressed}
      className={cn(
        "group relative aspect-square w-full rounded-[14px] transition-[transform,box-shadow] duration-150 ease-out",
        pressed
          ? "translate-y-[7px]"
          : "hover:translate-y-[3px] active:translate-y-[7px]"
      )}
      style={{
        boxShadow: pressed
          ? `0 2px 0 ${t.side}, 0 6px 10px -4px rgba(27,36,51,0.45)`
          : `0 9px 0 ${t.side}, 0 24px 34px -10px rgba(27,36,51,0.55)`,
      }}
    >
      <span className={cn("absolute inset-0 rounded-[14px]", t.face)} />
      <span className="absolute inset-[7%] rounded-[10px] shadow-[inset_0_-3px_0_rgba(0,0,0,0.08),inset_0_2px_0_rgba(255,255,255,0.25)]" />
      <span className={cn("absolute left-[14%] top-[12%] text-left font-mono text-[10px] uppercase tracking-[0.1em]", t.sub)}>
        {tool.group}
      </span>
      <span
        className={cn(
          "absolute inset-0 grid place-items-center text-[clamp(22px,3.2vw,40px)] font-medium tracking-[-0.04em]",
          t.text
        )}
      >
        {tool.short}
      </span>
      <span className={cn("absolute bottom-[12%] left-[14%] right-[14%] truncate text-left text-[12px] font-medium", t.text)}>
        {tool.name}
      </span>
    </button>
  );
}
