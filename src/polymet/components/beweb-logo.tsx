import { cn } from "@/lib/utils";

interface BewebLogoProps {
  className?: string;
  /** Stroke weight in viewBox units */
  weight?: number;
}

/** BeWeb wordmark — "be" in Ladrillo, "Web" in Bruma */
export function BewebLogo({ className, weight = 2.6 }: BewebLogoProps) {
  return (
    <svg
      viewBox="0 0 94 30"
      className={cn("h-[26px] w-auto", className)}
      fill="none"
      strokeWidth={weight}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="BeWeb"
    >
      <g stroke="#B5473A">
        <path d="M3.5 4 V26" />
        <circle cx="10" cy="20" r="6.2" />
        <path d="M20 20 H32.4 A6.2 6.2 0 1 0 30.6 24.4" />
      </g>
      <g stroke="#9CC2E0">
        <path d="M36 4.5 L42 25.5 L48 10 L54 25.5 L60 4.5" />
        <path d="M64 20 H76.4 A6.2 6.2 0 1 0 74.6 24.4" />
        <path d="M81 4 V26" />
        <circle cx="87.5" cy="20" r="6.2" />
      </g>
    </svg>
  );
}
