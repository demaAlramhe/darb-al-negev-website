"use client";

type TravelDecorVariant = "routes" | "map" | "globe" | "stamps" | "pins";

interface TravelDecorProps {
  variant?: TravelDecorVariant;
  className?: string;
  /** Light decor for dark sections */
  light?: boolean;
}

export default function TravelDecor({
  variant = "routes",
  className = "",
  light = false,
}: TravelDecorProps) {
  const accent = light ? "rgba(255,255,255,0.08)" : "rgba(174,145,114,0.14)";
  const muted = light ? "rgba(255,255,255,0.05)" : "rgba(71,71,71,0.07)";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {variant === "routes" ? (
        <>
          <svg
            className="absolute -start-6 top-12 h-40 w-40 sm:h-52 sm:w-52"
            viewBox="0 0 200 200"
            fill="none"
          >
            <path
              d="M10 170 Q90 90 190 30"
              stroke={accent}
              strokeWidth="1.5"
              strokeDasharray="5 7"
              strokeLinecap="round"
            />
            <g transform="translate(175,22) rotate(-28)" fill={accent}>
              <path d="M0 0 L14 4 L0 8 L3 4 Z" />
              <path d="M3 4 L12 4 L10 5 L3 5 Z" opacity="0.7" />
            </g>
          </svg>
          <svg
            className="absolute -end-4 bottom-16 h-36 w-36 sm:h-44 sm:w-44"
            viewBox="0 0 200 200"
            fill="none"
          >
            <path
              d="M190 150 Q120 100 40 60"
              stroke={muted}
              strokeWidth="1.2"
              strokeDasharray="4 8"
              strokeLinecap="round"
            />
            <circle cx="40" cy="60" r="3" fill={accent} />
          </svg>
        </>
      ) : null}

      {variant === "map" ? (
        <svg
          className="absolute -end-16 top-8 h-64 w-64 opacity-80 sm:h-80 sm:w-80"
          viewBox="0 0 240 240"
          fill="none"
        >
          <path
            d="M60 40 C90 20 130 25 160 45 C190 65 200 100 185 130 C170 160 130 180 95 175 C60 170 35 145 30 110 C25 75 40 55 60 40Z"
            stroke={accent}
            strokeWidth="1.2"
          />
          <path
            d="M100 70 C115 65 130 72 135 88 C140 104 128 118 112 120 C96 122 88 105 92 90 C94 82 97 74 100 70Z"
            stroke={muted}
            strokeWidth="1"
          />
          <path
            d="M145 110 C158 105 172 115 175 130 C178 145 165 158 150 155 C135 152 128 138 132 124 C134 117 139 112 145 110Z"
            stroke={muted}
            strokeWidth="1"
          />
        </svg>
      ) : null}

      {variant === "globe" ? (
        <svg
          className="absolute start-4 bottom-8 h-48 w-48 sm:h-56 sm:w-56"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="70" stroke={accent} strokeWidth="1.2" />
          <ellipse cx="100" cy="100" rx="28" ry="70" stroke={muted} strokeWidth="1" />
          <ellipse cx="100" cy="100" rx="50" ry="70" stroke={muted} strokeWidth="0.8" />
          <line x1="30" y1="100" x2="170" y2="100" stroke={muted} strokeWidth="0.8" />
          <path d="M30 70 Q100 55 170 70" stroke={muted} strokeWidth="0.8" />
          <path d="M30 130 Q100 145 170 130" stroke={muted} strokeWidth="0.8" />
        </svg>
      ) : null}

      {variant === "stamps" ? (
        <>
          <div
            className="absolute end-8 top-12 h-20 w-20 rotate-12 rounded-full border border-dashed sm:h-24 sm:w-24"
            style={{ borderColor: accent }}
          />
          <div
            className="absolute start-6 bottom-20 h-16 w-16 -rotate-6 rounded-full border border-dashed sm:h-20 sm:w-20"
            style={{ borderColor: muted }}
          />
          <svg
            className="absolute end-1/4 bottom-10 h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke={accent}
            strokeWidth="1.2"
          >
            <path d="M12 2 L12 14 M12 14 L8 10 M12 14 L16 10" strokeLinecap="round" />
            <circle cx="12" cy="18" r="3" />
          </svg>
        </>
      ) : null}

      {variant === "pins" ? (
        <>
          <svg
            className="absolute start-1/4 top-16 h-10 w-10"
            viewBox="0 0 24 32"
            fill="none"
            stroke={accent}
            strokeWidth="1.2"
          >
            <path d="M12 2 C7 2 4 6 4 10 C4 16 12 28 12 28 C12 28 20 16 20 10 C20 6 17 2 12 2Z" />
            <circle cx="12" cy="10" r="3" fill={muted} stroke="none" />
          </svg>
          <svg
            className="absolute end-1/3 bottom-24 h-8 w-8 opacity-70"
            viewBox="0 0 24 32"
            fill="none"
            stroke={muted}
            strokeWidth="1.2"
          >
            <path d="M12 2 C7 2 4 6 4 10 C4 16 12 28 12 28 C12 28 20 16 20 10 C20 6 17 2 12 2Z" />
          </svg>
        </>
      ) : null}
    </div>
  );
}
