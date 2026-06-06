function MapPin({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <ellipse cx="0" cy="8" rx="3.5" ry="1.2" fill="#474747" fillOpacity="0.12" />
      <path
        d="M0 -7 C3.2 -7 5.5 -4.5 5.5 -1.2 C5.5 2.5 0 9 0 9 C0 9 -5.5 2.5 -5.5 -1.2 C-5.5 -4.5 -3.2 -7 0 -7 Z"
        fill="#ae9172"
        fillOpacity="0.82"
        stroke="#8a7358"
        strokeWidth="0.6"
      />
      <circle cx="0" cy="-1.5" r="2" fill="#fff" fillOpacity="0.9" />
    </g>
  );
}

function RoutePlane({ x, y, rotate }: { x: number; y: number; rotate: number }) {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotate})`}>
      <circle r="7" fill="#fff" fillOpacity="0.85" stroke="#ae9172" strokeWidth="0.7" />
      <path
        d="M-3.5 0 L3.5 0 M0 -2.5 L2.5 0 L0 2.5"
        stroke="#474747"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>
  );
}

export default function HeroMapBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
      aria-hidden
    >
      <svg
        className="h-full w-full scale-[1.02]"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="heroSeaMed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b8c8d6" />
            <stop offset="100%" stopColor="#a3b8c9" />
          </linearGradient>
          <linearGradient id="heroSeaRed" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#afc2d0" />
            <stop offset="100%" stopColor="#9eb4c4" />
          </linearGradient>
          <linearGradient id="heroLandSand" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8dfd0" />
            <stop offset="100%" stopColor="#d9cbb5" />
          </linearGradient>
          <linearGradient id="heroLandTan" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4c4aa" />
            <stop offset="100%" stopColor="#e2d6c3" />
          </linearGradient>
          <linearGradient id="heroLandDesert" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dbc9ad" />
            <stop offset="100%" stopColor="#cbb895" />
          </linearGradient>
        </defs>

        {/* Base paper tone */}
        <rect width="400" height="300" fill="#e9e4db" />

        {/* Mediterranean Sea */}
        <path
          d="M0 0 H400 V118 C320 108, 260 98, 200 92 C130 84, 70 78, 0 88 Z"
          fill="url(#heroSeaMed)"
          fillOpacity="0.92"
        />

        {/* Red Sea */}
        <path
          d="M332 68 L400 62 V300 H318 C322 220, 328 145, 332 68 Z"
          fill="url(#heroSeaRed)"
          fillOpacity="0.88"
        />

        {/* Gulf / lower sea */}
        <path
          d="M248 198 C290 188, 340 192, 400 186 V300 H210 C220 258, 235 225, 248 198 Z"
          fill="#a8bcc9"
          fillOpacity="0.75"
        />

        {/* Turkey / Anatolia */}
        <path
          d="M0 72 C55 58, 120 48, 190 52 C250 56, 310 62, 400 58 V0 H0 Z"
          fill="url(#heroLandSand)"
          stroke="#9a8f7e"
          strokeWidth="1"
          strokeOpacity="0.45"
        />

        {/* Levant + Israel strip */}
        <path
          d="M118 92 C138 88, 152 108, 148 138 C146 162, 132 182, 118 198 C108 188, 102 168, 104 142 C106 118, 110 100, 118 92 Z"
          fill="url(#heroLandTan)"
          stroke="#8f8475"
          strokeWidth="0.9"
          strokeOpacity="0.5"
        />

        {/* Jordan */}
        <path
          d="M148 108 C178 102, 210 108, 228 128 C238 148, 232 178, 210 192 C188 200, 162 188, 152 168 C144 148, 142 124, 148 108 Z"
          fill="#e0d4c0"
          stroke="#8f8475"
          strokeWidth="0.85"
          strokeOpacity="0.45"
        />

        {/* Sinai */}
        <path
          d="M118 198 C132 182, 152 188, 168 210 C176 232, 168 258, 148 272 C128 278, 108 262, 102 238 C98 218, 106 208, 118 198 Z"
          fill="url(#heroLandDesert)"
          stroke="#8f8475"
          strokeWidth="0.85"
          strokeOpacity="0.45"
        />

        {/* Egypt / Nile delta area */}
        <path
          d="M0 88 C40 96, 78 108, 102 128 C108 158, 98 198, 78 228 C52 252, 22 262, 0 258 Z"
          fill="#dccfbb"
          stroke="#8f8475"
          strokeWidth="0.85"
          strokeOpacity="0.4"
        />

        {/* Arabia / Gulf coast */}
        <path
          d="M228 128 C268 118, 310 128, 332 148 C340 178, 320 212, 280 228 C248 238, 218 222, 210 192 C202 162, 212 138, 228 128 Z"
          fill="#d8c9ae"
          stroke="#8f8475"
          strokeWidth="0.85"
          strokeOpacity="0.42"
        />

        {/* Cyprus */}
        <ellipse cx="92" cy="72" rx="14" ry="8" fill="#e6dcc8" stroke="#9a8f7e" strokeWidth="0.7" strokeOpacity="0.4" />

        {/* Internal region borders */}
        <path
          d="M118 92 L148 108 M152 168 L168 210 M210 192 L228 128"
          stroke="#8f8475"
          strokeWidth="0.65"
          strokeOpacity="0.35"
          strokeDasharray="3 3"
        />
        <path
          d="M102 128 C120 136, 138 132, 148 108"
          stroke="#8f8475"
          strokeWidth="0.6"
          strokeOpacity="0.32"
        />

        {/* Coastline emphasis */}
        <path
          d="M0 88 C70 82, 118 92, 148 108 C178 102, 228 128 C268 118, 332 68"
          stroke="#7a8794"
          strokeWidth="1.1"
          strokeOpacity="0.38"
          fill="none"
        />
        <path
          d="M118 198 C148 272, 210 192, 248 198 C290 188, 332 148"
          stroke="#7a8794"
          strokeWidth="1"
          strokeOpacity="0.32"
          fill="none"
        />

        {/* Lat / long grid */}
        {[60, 120, 180, 240].map((y) => (
          <line
            key={`h-${y}`}
            x1="0"
            y1={y}
            x2="400"
            y2={y}
            stroke="#474747"
            strokeOpacity="0.07"
            strokeWidth="0.6"
          />
        ))}
        {[80, 160, 240, 320].map((x) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1="0"
            x2={x}
            y2="300"
            stroke="#474747"
            strokeOpacity="0.07"
            strokeWidth="0.6"
          />
        ))}

        {/* Flight routes — Tel Aviv area to Istanbul, Dubai, Eilat, North */}
        <path
          id="route-ist"
          d="M128 118 C98 78, 72 58, 48 48"
          stroke="#ae9172"
          strokeWidth="1.6"
          strokeOpacity="0.62"
          strokeDasharray="5 4"
          strokeLinecap="round"
        />
        <path
          id="route-dxb"
          d="M128 118 C188 108, 248 132, 292 152"
          stroke="#ae9172"
          strokeWidth="1.6"
          strokeOpacity="0.58"
          strokeDasharray="5 4"
          strokeLinecap="round"
        />
        <path
          id="route-eilat"
          d="M128 118 C132 158, 138 198, 142 232"
          stroke="#8a7358"
          strokeWidth="1.4"
          strokeOpacity="0.52"
          strokeDasharray="4 5"
          strokeLinecap="round"
        />
        <path
          id="route-north"
          d="M128 118 C118 98, 108 82, 98 68"
          stroke="#8a7358"
          strokeWidth="1.3"
          strokeOpacity="0.48"
          strokeDasharray="4 5"
          strokeLinecap="round"
        />

        <RoutePlane x={82} y={58} rotate={-35} />
        <RoutePlane x={228} y={122} rotate={18} />

        {/* Location pins — hub + destinations */}
        <MapPin x={128} y={118} />
        <MapPin x={48} y={48} />
        <MapPin x={292} y={152} />
        <MapPin x={142} y={232} />
        <MapPin x={98} y={68} />

        {/* Map legend chip */}
        <g transform="translate(14, 14)">
          <rect width="54" height="18" rx="9" fill="#fff" fillOpacity="0.72" stroke="#ae9172" strokeOpacity="0.25" />
          <circle cx="24" cy="9" r="2.2" fill="#ae9172" fillOpacity="0.75" />
          <line x1="30" y1="9" x2="44" y2="9" stroke="#ae9172" strokeWidth="1.2" strokeDasharray="3 2" strokeOpacity="0.55" />
        </g>

        {/* Compass */}
        <g transform="translate(352, 34)">
          <circle r="16" fill="#fff" fillOpacity="0.65" stroke="#8f8475" strokeOpacity="0.35" strokeWidth="0.8" />
          <path d="M0 -10 L2.5 0 L0 10 L-2.5 0 Z" fill="#ae9172" fillOpacity="0.65" />
          <text y="24" textAnchor="middle" fill="#474747" fillOpacity="0.35" fontSize="7" fontWeight="600">
            N
          </text>
        </g>
      </svg>

      {/* Light readability wash — map stays ~35–40% dominant */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/18 via-white/8 to-brand-bg/12" />
      <div className="absolute inset-0 rounded-2xl bg-white/10" />
    </div>
  );
}
