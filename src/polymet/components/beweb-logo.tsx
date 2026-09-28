import { cn } from "@/lib/utils";

interface BewebLogoProps {
  className?: string;
  markOnly?: boolean;
}

const CELLS = [
  [1, 0, 1],
  [1, 1, 0],
  [1, 0, 1],
];

export function BewebLogo({ className, markOnly = false }: BewebLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 15 15" className="h-[18px] w-[18px]" aria-hidden="true">
        {CELLS.flatMap((row, y) =>
          row.map((on, x) =>
            on ? (
              <rect
                key={`${x}-${y}`}
                x={x * 5}
                y={y * 5}
                width="4.2"
                height="4.2"
                fill={x === 2 && y === 0 ? "#B5473A" : "currentColor"}
              />
            ) : null
          )
        )}
      </svg>
      {!markOnly && (
        <span className="font-sans text-[19px] font-semibold tracking-[-0.04em] leading-none">
          beweb
        </span>
      )}
    </span>
  );
}
