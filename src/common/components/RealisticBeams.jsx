import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function RealisticBeams({ intensity = "high" }) {
  const beams = useRef([]);

  const settings = {
    low: { rotateAmt: 3, durBase: 4, blur: 12, opacityMax: 0.20 },
    medium: { rotateAmt: 6, durBase: 3, blur: 14, opacityMax: 0.4 },
    high: { rotateAmt: 10, durBase: 2, blur: 18, opacityMax: 0.6 },
  }[intensity];

  useEffect(() => {
    beams.current.forEach((el, i) => {
      if (!el) return;
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.fromTo(
        el,
        {
          opacity: 0.2,
          rotate: i === 0 ? -settings.rotateAmt : i === 1 ? settings.rotateAmt : 0,
          transformOrigin: "top center",
        },
        {
          opacity: settings.opacityMax,
          rotate: i === 0
            ? -settings.rotateAmt / 3
            : i === 1
            ? settings.rotateAmt / 3
            : 0,
          duration: settings.durBase + i * 0.1,
          ease: "sine.inOut",
          yoyo: true,
        }
      );
    });
  }, [settings]);

  return (
    <div className="absolute inset-0 pointer-events-none z-15">
      <svg width="100%" height="100%" className="absolute top-0 left-0">
        <defs>
          <linearGradient id="beamA" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#b26dff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#b26dff" stopOpacity="0" />
          </linearGradient>

          <filter id="blurBeam">
            <feGaussianBlur stdDeviation={settings.blur} />
          </filter>
        </defs>

        <g style={{ mixBlendMode: "screen", filter: "url(#blurBeam)" }}>

          {/* Center Beam */}
          <polygon
            ref={(el) => (beams.current[0] = el)}
            points="650,-20 700,-20 950,900 450,900"
            fill="url(#beamA)"
          />

          {/* Left Beam */}
          <polygon
            ref={(el) => (beams.current[1] = el)}
            points="600,-20 560,-20 200,900 520,900"
            fill="url(#beamA)"
          />

          {/* Right Beam */}
          <polygon
            ref={(el) => (beams.current[2] = el)}
            points="760,-20 800,-20 1200,900 780,900"
            fill="url(#beamA)"
          />

        </g>
      </svg>
    </div>
  );
}

export default RealisticBeams;