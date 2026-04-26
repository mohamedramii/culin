// Reusable animated SVG patterns for each section

export function WoodGrainPattern({ id = "wood-grain", color = "rgba(196,168,130,0.06)" }: { id?: string; color?: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={id} x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          <path d="M0,40 Q50,20 100,40 T200,40" fill="none" stroke={color} strokeWidth="1" className={`svg-line-${id}`} />
          <path d="M0,80 Q50,60 100,80 T200,80" fill="none" stroke={color} strokeWidth="0.8" className={`svg-line-${id}`} />
          <path d="M0,120 Q50,100 100,120 T200,120" fill="none" stroke={color} strokeWidth="1.2" className={`svg-line-${id}`} />
          <path d="M0,160 Q50,140 100,160 T200,160" fill="none" stroke={color} strokeWidth="0.6" className={`svg-line-${id}`} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export function GeometricGrid({ id = "geo-grid", color = "rgba(255,255,255,0.04)" }: { id?: string; color?: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={id} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="80" height="80" fill="none" stroke={color} strokeWidth="0.5" className={`svg-cell-${id}`} />
          <circle cx="40" cy="40" r="2" fill={color} className={`svg-dot-${id}`} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export function OrganicBlobs({ id = "blobs", color = "rgba(196,168,130,0.08)" }: { id?: string; color?: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 1200 800" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="300" r="150" fill={color} className={`blob-${id} blob-1`} />
      <circle cx="900" cy="200" r="200" fill={color} className={`blob-${id} blob-2`} />
      <circle cx="600" cy="600" r="180" fill={color} className={`blob-${id} blob-3`} />
      <ellipse cx="1000" cy="600" rx="250" ry="150" fill={color} className={`blob-${id} blob-4`} />
    </svg>
  );
}

export function DiagonalLines({ id = "diag", color = "rgba(196,168,130,0.05)" }: { id?: string; color?: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={id} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="60" stroke={color} strokeWidth="1" className={`diag-line-${id}`} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export function HexagonPattern({ id = "hex", color = "rgba(196,168,130,0.04)" }: { id?: string; color?: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={id} x="0" y="0" width="100" height="115" patternUnits="userSpaceOnUse">
          <polygon points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5" fill="none" stroke={color} strokeWidth="0.8" className={`hex-${id}`} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export function FloatingParticles({ count = 20, color = "rgba(196,168,130,0.15)" }: { count?: number; color?: string }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    cx: Math.random() * 100,
    cy: Math.random() * 100,
    r: Math.random() * 3 + 1,
    id: i,
  }));

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      {particles.map((p) => (
        <circle
          key={p.id}
          cx={`${p.cx}%`}
          cy={`${p.cy}%`}
          r={p.r}
          fill={color}
          className="floating-particle"
          data-speed={Math.random() * 2 + 0.5}
        />
      ))}
    </svg>
  );
}

export function TreeRingsSvg({ className = "" }: { className?: string }) {
  return (
    <svg className={`pointer-events-none ${className}`} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      {[40, 70, 100, 130, 160, 190].map((r, i) => (
        <ellipse
          key={i}
          cx="200"
          cy="200"
          rx={r}
          ry={r * (0.85 + Math.random() * 0.3)}
          fill="none"
          stroke="rgba(196,168,130,0.12)"
          strokeWidth={0.8 + Math.random() * 0.5}
          className="tree-ring"
          style={{ transformOrigin: "center" }}
        />
      ))}
      <circle cx="200" cy="200" r="6" fill="rgba(196,168,130,0.2)" />
    </svg>
  );
}
