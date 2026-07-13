"use client";

export default function Logo({ size = 120, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
      >
        {/* Outer gold ring */}
        <circle cx="100" cy="100" r="96" stroke="url(#goldGradient)" strokeWidth="2" fill="none" />
        <circle cx="100" cy="100" r="90" stroke="rgba(212,175,55,0.15)" strokeWidth="1" fill="none" />

        {/* Inner dark circle */}
        <circle cx="100" cy="100" r="88" fill="#0D1117" opacity="0.9" />

        {/* Fog gradient at bottom */}
        <defs>
          <linearGradient id="goldGradient" x1="0" y1="0" x2="200" y2="200">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#E8C95A" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
          <linearGradient id="fogGradient" x1="100" y1="140" x2="100" y2="180">
            <stop offset="0%" stopColor="#8D99AE" stopOpacity="0" />
            <stop offset="100%" stopColor="#8D99AE" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="mountainGradient" x1="100" y1="80" x2="100" y2="150">
            <stop offset="0%" stopColor="#1B4332" />
            <stop offset="100%" stopColor="#0f2a1f" />
          </linearGradient>
        </defs>

        {/* Background mountains (far) */}
        <path
          d="M30 150 L55 105 L70 120 L90 85 L110 115 L130 90 L150 110 L170 95 L185 150 Z"
          fill="#0f2a1f"
          opacity="0.6"
        />

        {/* Main mountains */}
        <path
          d="M20 155 L50 110 L65 125 L85 90 L100 105 L115 80 L135 110 L155 95 L175 120 L185 155 Z"
          fill="url(#mountainGradient)"
        />

        {/* Snow caps */}
        <path d="M82 93 L85 90 L88 93 Z" fill="#F5F0E6" opacity="0.8" />
        <path d="M112 83 L115 80 L118 83 Z" fill="#F5F0E6" opacity="0.8" />

        {/* Tent */}
        <path
          d="M95 148 L105 130 L115 148 Z"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1.5"
          opacity="0.8"
        />
        <line x1="105" y1="130" x2="105" y2="148" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />

        {/* Fog layer */}
        <ellipse cx="100" cy="155" rx="70" ry="8" fill="url(#fogGradient)" />

        {/* Stars */}
        <circle cx="50" cy="60" r="1" fill="#F5F0E6" opacity="0.7" />
        <circle cx="140" cy="50" r="1.2" fill="#F5F0E6" opacity="0.6" />
        <circle cx="80" cy="45" r="0.8" fill="#F5F0E6" opacity="0.5" />
        <circle cx="160" cy="70" r="0.8" fill="#D4AF37" opacity="0.6" />
        <circle cx="45" cy="80" r="0.6" fill="#D4AF37" opacity="0.4" />

        {/* Moon */}
        <circle cx="155" cy="55" r="6" fill="#F5F0E6" opacity="0.15" />
        <circle cx="157" cy="53" r="5" fill="#0D1117" opacity="0.9" />

        {/* ESCAPISM text arc */}
        <path id="textArc" d="M40,165 A65,65 0 0,1 160,165" fill="none" />
        <text>
          <textPath
            href="#textArc"
            startOffset="50%"
            textAnchor="middle"
            fill="#D4AF37"
            fontFamily="'Playfair Display', serif"
            fontSize="14"
            letterSpacing="6"
            fontWeight="600"
          >
            ESCAPISM
          </textPath>
        </text>
      </svg>
    </div>
  );
}
