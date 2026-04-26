import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WoodGrainPattern, TreeRingsSvg } from "./SvgPatterns";
import { useMouseParallax } from "./use3DTilt";

gsap.registerPlugin(ScrollTrigger);

const IMG_TEXTURE = "https://images.unsplash.com/photo-1566733622605-eedf4a0f8223?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwdGV4dHVyZSUyMG9hayUyMGdyYWluJTIwY2xvc2V1cHxlbnwxfHx8fDE3NzU2NjY1NDV8MA&ixlib=rb-4.1.0&q=80&w=1080";

const materials = [
  { name: "White Oak", origin: "European Forests", property: "Warm golden tones with a distinctive grain pattern that ages beautifully.", color: "#d4a574" },
  { name: "Walnut", origin: "North American", property: "Rich, dark hues that deepen with age. The ultimate luxury.", color: "#5c3d2e" },
  { name: "Ash", origin: "Scandinavian", property: "Light and resilient with a smooth, flowing grain.", color: "#e8dcc8" },
  { name: "Maple", origin: "Canadian", property: "Clean, uniform texture. Perfect for modern, minimal spaces.", color: "#f0e0c0" },
];

export function CulinMaterials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const treeRef = useMouseParallax(0.04);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate wood grain
      gsap.to(".svg-line-materials-wood", {
        attr: { d: "M0,40 Q60,10 120,45 T200,35" },
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });

      // Marquee
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          ease: "none",
          duration: 20,
          repeat: -1,
        });
      }

      // Tree ring pulse
      gsap.to(".tree-ring", {
        scale: "+=0.05",
        opacity: "random(0.08, 0.2)",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.4, from: "center" },
        transformOrigin: "center center",
      });

      // Material cards slide in
      gsap.utils.toArray<HTMLElement>(".material-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { x: 60, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
            delay: i * 0.1,
          }
        );
      });

      // Image reveal
      gsap.fromTo(
        ".material-hero-img",
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.6,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ".material-hero-img", start: "top 75%" },
        }
      );

      // Color swatch pop
      gsap.fromTo(
        ".color-swatch",
        { scale: 0, rotation: -90 },
        {
          scale: 1, rotation: 0, duration: 0.6, ease: "back.out(3)", stagger: 0.1,
          scrollTrigger: { trigger: ".color-swatch", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#f5f0eb] py-32 overflow-hidden">
      {/* SVG Pattern */}
      <WoodGrainPattern id="materials-wood" color="rgba(26,22,17,0.03)" />

      {/* Floating tree ring */}
      <div ref={treeRef} className="absolute right-[-100px] top-[20%] w-[350px] h-[350px] opacity-20">
        <TreeRingsSvg />
      </div>

      {/* Marquee */}
      <div className="mb-24 overflow-hidden">
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="font-heading text-[#1a1611]/[0.05] mx-4" style={{ fontSize: "clamp(5rem, 12vw, 10rem)" }}>
              Oak &middot; Walnut &middot; Ash &middot; Maple &middot;&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div className="material-hero-img relative" style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}>
            <img src={IMG_TEXTURE} alt="Wood grain" className="w-full aspect-[3/4] object-cover" />
            {/* Decorative frame */}
            <div className="absolute inset-6 border border-[#c4a882]/20 pointer-events-none" />
          </div>

          {/* Right: Materials list */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-[#1a1611]/30" />
              <span className="font-body text-[#1a1611]/50 text-xs tracking-[0.3em] uppercase">Materials</span>
            </div>
            <h2 className="font-heading text-[#1a1611] mb-12" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}>
              Only the <span className="italic text-[#c4a882]">finest</span>
            </h2>

            <div className="flex flex-col gap-0">
              {materials.map((m, i) => (
                <div
                  key={m.name}
                  className={`material-card py-6 border-t border-[#1a1611]/10 ${
                    i === materials.length - 1 ? "border-b" : ""
                  } group cursor-pointer hover:pl-4 transition-all duration-500`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="color-swatch w-8 h-8 rounded-full flex-shrink-0 border border-[#1a1611]/10 group-hover:scale-125 transition-transform duration-500"
                        style={{ backgroundColor: m.color }}
                      />
                      <div>
                        <h4 className="font-heading text-[#1a1611] text-2xl group-hover:text-[#c4a882] transition-colors duration-300">
                          {m.name}
                        </h4>
                        <p className="font-body text-[#1a1611]/40 text-xs tracking-[0.1em] uppercase mt-1">{m.origin}</p>
                      </div>
                    </div>
                  </div>
                  <p className="font-body text-[#1a1611]/50 text-sm mt-3 ml-12 max-w-sm" style={{ fontWeight: 300 }}>
                    {m.property}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
