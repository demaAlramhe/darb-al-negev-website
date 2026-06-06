type AboutVisualProps = {
  className?: string;
};

export function AboutTripsVisual({ className = "" }: AboutVisualProps) {
  return (
    <svg
      viewBox="0 0 120 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx="60" cy="44" r="28" fill="#ae9172" fillOpacity="0.12" />
      <circle cx="60" cy="44" r="20" stroke="#ae9172" strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="4 4" />
      <ellipse cx="60" cy="44" rx="28" ry="12" stroke="#474747" strokeOpacity="0.15" strokeWidth="1" />
      <path
        d="M34 44 C48 28, 72 28, 86 44 C72 60, 48 60, 34 44 Z"
        stroke="#474747"
        strokeOpacity="0.12"
        strokeWidth="1"
      />
      <path
        d="M28 52 Q60 22 92 36"
        stroke="#ae9172"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        strokeLinecap="round"
      />
      <g transform="translate(78, 28) rotate(25)">
        <path d="M0 0 L12 0 L8 4 L10 8 L0 4 Z" fill="#474747" fillOpacity="0.55" />
      </g>
      <circle cx="42" cy="50" r="3" fill="#ae9172" fillOpacity="0.7" />
      <circle cx="72" cy="38" r="3" fill="#ae9172" fillOpacity="0.7" />
      <path d="M42 50 L72 38" stroke="#ae9172" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 3" />
    </svg>
  );
}

export function AboutDealsVisual({ className = "" }: AboutVisualProps) {
  return (
    <svg
      viewBox="0 0 120 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect x="18" y="34" width="34" height="38" rx="6" fill="#ae9172" fillOpacity="0.14" stroke="#ae9172" strokeOpacity="0.3" strokeWidth="1" />
      <rect x="26" y="42" width="8" height="8" rx="1.5" fill="#474747" fillOpacity="0.15" />
      <rect x="38" y="42" width="8" height="8" rx="1.5" fill="#474747" fillOpacity="0.15" />
      <rect x="26" y="54" width="8" height="8" rx="1.5" fill="#474747" fillOpacity="0.15" />
      <rect x="38" y="54" width="8" height="8" rx="1.5" fill="#474747" fillOpacity="0.15" />
      <path d="M35 34 V26 H55 L62 34 Z" fill="#ae9172" fillOpacity="0.25" />

      <rect x="68" y="40" width="34" height="24" rx="5" fill="#dfded8" stroke="#474747" strokeOpacity="0.18" strokeWidth="1" />
      <path d="M74 52 H96" stroke="#474747" strokeOpacity="0.2" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M74 57 H90" stroke="#474747" strokeOpacity="0.15" strokeWidth="1" strokeLinecap="round" />
      <circle cx="88" cy="48" r="4" fill="#ae9172" fillOpacity="0.45" />

      <g transform="translate(52, 18) rotate(-20)">
        <path d="M0 0 L16 0 L11 5 L14 10 L0 5 Z" fill="#474747" fillOpacity="0.5" />
        <path d="M14 10 L18 12 L14 8 Z" fill="#ae9172" fillOpacity="0.6" />
      </g>

      <rect x="58" y="68" width="24" height="10" rx="5" fill="#ae9172" fillOpacity="0.25" stroke="#ae9172" strokeOpacity="0.35" strokeWidth="0.8" />
      <path d="M64 73 L67 76 L72 70" stroke="#ae9172" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AboutSupportVisual({ className = "" }: AboutVisualProps) {
  return (
    <svg
      viewBox="0 0 120 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect x="22" y="24" width="76" height="48" rx="10" fill="#ae9172" fillOpacity="0.1" stroke="#ae9172" strokeOpacity="0.25" strokeWidth="1" />
      <rect x="30" y="34" width="36" height="5" rx="2.5" fill="#474747" fillOpacity="0.12" />
      <rect x="30" y="44" width="48" height="5" rx="2.5" fill="#474747" fillOpacity="0.1" />
      <rect x="30" y="54" width="28" height="5" rx="2.5" fill="#474747" fillOpacity="0.08" />

      <circle cx="82" cy="48" r="14" fill="#dfded8" stroke="#ae9172" strokeOpacity="0.35" strokeWidth="1" />
      <path
        d="M76 48 C76 43.5 79 40 82 40 C85 40 88 43.5 88 48 V52 H90 C91 52 92 53 92 54 V56 C92 57 91 58 90 58 H74 C73 58 72 57 72 56 V54 C72 53 73 52 74 52 H76 V48 Z"
        fill="#474747"
        fillOpacity="0.45"
      />

      <circle cx="38" cy="68" r="8" fill="#ae9172" fillOpacity="0.85" />
      <path d="M35 68 L37 70 L41 66" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

      <circle cx="58" cy="68" r="8" fill="#ae9172" fillOpacity="0.35" stroke="#ae9172" strokeOpacity="0.5" strokeWidth="1" />
      <circle cx="58" cy="68" r="2.5" fill="#474747" fillOpacity="0.35" />

      <circle cx="78" cy="68" r="8" fill="#ae9172" fillOpacity="0.35" stroke="#ae9172" strokeOpacity="0.5" strokeWidth="1" />
      <path d="M75 68 H81 M78 65 V71" stroke="#474747" strokeOpacity="0.35" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export const aboutFeatureVisuals = [AboutTripsVisual, AboutDealsVisual, AboutSupportVisual] as const;
