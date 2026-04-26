import { useEffect, useRef } from "react";
import gsap from "gsap";

import imgCustomInteriors from "figma:asset/567210d0fafcd692004671dd66b4a733d1fccc4a.png";
import imgDressingRoom from "figma:asset/f7b6f623fd087cbd7d7e431d00e962e72498cef0.png";
import imgOakKitchen from "figma:asset/0b7f033fb21dd8ee9e26a8255b80ba7c0205ccf4.png";
import imgKitchens from "figma:asset/b05518179cdbc57e1530e6e5165e2110ca56e5ec.png";
import imgLivingSpace from "figma:asset/73f461a24ea54993b01b159b86354004bc4ec84f.png";
import imgLogo from "figma:asset/logo.png";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  // Vertical columns (left half) — animate by height (clipPath top→bottom)
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  // Horizontal rows (right half) — animate by width (clipPath left→right)
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      // ── Columns: reveal from bottom to top (grow by height) ──────────────
      tl.fromTo(
        [col1Ref.current, col3Ref.current],
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, stagger: 0.12 },
        0
      )
        .fromTo(
          col2Ref.current,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2 },
          0.08
        )

        // ── Rows: reveal from right to left (grow by width) ──────────────────
        .fromTo(
          [row1Ref.current, row3Ref.current],
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, stagger: 0.12 },
          0.1
        )
        .fromTo(
          row2Ref.current,
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2 },
          0.18
        )

        // ── Logo fade + scale in ─────────────────────────────────────────────
        .fromTo(
          logoRef.current,
          { opacity: 0, scale: 0.85, y: 12 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "power2.out" },
          1.0
        )

        // ── Grid closes (reverse of opening) ───────────────────────────────────
        .to(
          [col1Ref.current, col3Ref.current],
          { clipPath: "inset(100% 0% 0% 0%)", duration: 1, stagger: 0.08 },
          2.6
        )
        .to(
          col2Ref.current,
          { clipPath: "inset(0% 0% 100% 0%)", duration: 1 },
          2.68
        )
        .to(
          [row1Ref.current, row3Ref.current],
          { clipPath: "inset(0% 100% 0% 0%)", duration: 1, stagger: 0.08 },
          2.62
        )
        .to(
          row2Ref.current,
          { clipPath: "inset(0% 0% 0% 100%)", duration: 1 },
          2.7
        )

        // ── Logo flies to navbar position (FLIP) ─────────────────────────────
        .call(() => {
          const splashLogo = logoRef.current;
          const navLogo = document.getElementById("navbar-logo");
          if (!splashLogo || !navLogo) {
            gsap.to(wrapperRef.current, { opacity: 0, duration: 0.7, onComplete });
            return;
          }
          const from = splashLogo.getBoundingClientRect();
          const to = navLogo.getBoundingClientRect();
          const dx = to.left + to.width / 2 - (from.left + from.width / 2);
          const dy = to.top + to.height / 2 - (from.top + from.height / 2);
          const targetScale = to.height / from.height;

          gsap.to(splashLogo, {
            x: dx,
            y: dy,
            scale: targetScale,
            duration: 0.8,
            ease: "power3.inOut",
            onComplete: () => {
              // Use data attribute so navbar knows logo is revealed (survives re-render)
              navLogo.dataset.revealed = "true";
              navLogo.style.opacity = "1";
              gsap.to(wrapperRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut",
                onComplete,
              });
            },
          });
        }, [], 2.8);
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#1a1611]"
      style={{ willChange: "opacity" }}
    >
      {/* ── Grid layout ─────────────────────────────────────── */}
      <div className="absolute inset-0 flex">
        {/* LEFT: 3 vertical columns */}
        <div className="flex flex-1 gap-[2px]">
          {/* Col 1 — Custom Interiors */}
          <div
            ref={col1Ref}
            className="flex-1 relative overflow-hidden"
            style={{ clipPath: "inset(100% 0% 0% 0%)" }}
          >
            <img
              src={imgCustomInteriors}
              alt="Custom Interiors"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[rgba(44,13,12,0.35)]" />
          </div>

          {/* Col 2 — Dressing Room */}
          <div
            ref={col2Ref}
            className="flex-1 relative overflow-hidden"
            style={{ clipPath: "inset(0% 0% 100% 0%)" }}
          >
            <img
              src={imgDressingRoom}
              alt="Dressing Room"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[rgba(44,13,12,0.35)]" />
          </div>

          {/* Col 3 — Oak Kitchen */}
          <div
            ref={col3Ref}
            className="flex-1 relative overflow-hidden"
            style={{ clipPath: "inset(100% 0% 0% 0%)" }}
          >
            <img
              src={imgOakKitchen}
              alt="The Oak Kitchen"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[rgba(44,13,12,0.35)]" />
          </div>
        </div>

        {/* 2px gap between halves */}
        <div className="w-[2px] bg-[#1a1611] shrink-0" />

        {/* RIGHT: 3 horizontal rows */}
        <div className="flex-1 flex flex-col gap-[2px]">
          {/* Row 1 — Kitchens */}
          <div
            ref={row1Ref}
            className="flex-1 relative overflow-hidden"
            style={{ clipPath: "inset(0% 100% 0% 0%)" }}
          >
            <img
              src={imgKitchens}
              alt="Kitchens"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[rgba(44,13,12,0.35)]" />
          </div>

          {/* Row 2 — Dressing Room (horizontal) */}
          <div
            ref={row2Ref}
            className="flex-1 relative overflow-hidden"
            style={{ clipPath: "inset(0% 0% 0% 100%)" }}
          >
            <img
              src={imgDressingRoom}
              alt="Dressing Room"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-[rgba(44,13,12,0.35)]" />
          </div>

          {/* Row 3 — Living Space */}
          <div
            ref={row3Ref}
            className="flex-1 relative overflow-hidden"
            style={{ clipPath: "inset(0% 100% 0% 0%)" }}
          >
            <img
              src={imgLivingSpace}
              alt="The Living Space"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[rgba(44,13,12,0.35)]" />
          </div>
        </div>
      </div>

      {/* ── Global dark overlay ──────────────────────────────── */}
      <div className="absolute inset-0 bg-[rgba(44,13,12,0.45)] pointer-events-none" />

      {/* ── Logo centered ────────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          ref={logoRef}
          src={imgLogo}
          alt="Culin"
          className="w-[clamp(200px,22vw,360px)] object-contain"
          style={{ opacity: 0 }}
        />
      </div>
    </div>
  );
}
