import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import { GeometricGrid, FloatingParticles, TreeRingsSvg } from "./SvgPatterns";
import { useMouseParallax } from "./use3DTilt";

const IMG_KITCHEN = "https://images.unsplash.com/photo-1765371515651-faa86f08f0ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBraXRjaGVuJTIwd29vZCUyMGRlc2lnbnxlbnwxfHx8fDE3NzU2NjY1NDR8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_CLOSET = "https://images.unsplash.com/photo-1774301211236-dab64d553241?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3YWxrLWluJTIwY2xvc2V0JTIwbHV4dXJ5fGVufDF8fHx8MTc3NTY2NjU0Nnww&ixlib=rb-4.1.0&q=80&w=1080";

export function CulinHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const imgLeftRef = useRef<HTMLDivElement>(null);
  const imgRightRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const treeRingRef1 = useMouseParallax(0.03);
  const treeRingRef2 = useMouseParallax(0.05);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate floating particles
      gsap.utils.toArray<SVGCircleElement>(".floating-particle").forEach((p) => {
        const speed = parseFloat(p.getAttribute("data-speed") || "1");
        gsap.to(p, {
          y: `random(-60, 60)`,
          x: `random(-30, 30)`,
          duration: 3 + speed * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2,
        });
      });

      // Animate grid pattern
      gsap.to(".svg-cell-hero-grid", {
        opacity: 0.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.05, from: "random" },
        ease: "sine.inOut",
      });

      // Tree rings rotation
      gsap.to(".tree-ring", {
        rotation: "+=360",
        duration: 40,
        repeat: -1,
        ease: "none",
        stagger: { each: 3, from: "center" },
        transformOrigin: "center center",
      });

      const tl = gsap.timeline({ delay: 0.5 });

      tl.fromTo(
        lineRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 1.2, ease: "power3.inOut", transformOrigin: "top" }
      )
        .fromTo(
          headingRef.current?.querySelectorAll(".word") || [],
          { y: 120, opacity: 0, rotateX: 90, scale: 0.8 },
          { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 1.2, ease: "power4.out", stagger: 0.1 },
          "-=0.6"
        )
        .fromTo(
          subRef.current,
          { y: 30, opacity: 0, filter: "blur(10px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          imgLeftRef.current,
          { x: -100, opacity: 0, rotateY: 15 },
          { x: 0, opacity: 1, rotateY: 0, duration: 1.4, ease: "power3.out" },
          "-=0.8"
        )
        .fromTo(
          imgRightRef.current,
          { x: 100, opacity: 0, rotateY: -15 },
          { x: 0, opacity: 1, rotateY: 0, duration: 1.4, ease: "power3.out" },
          "-=1.2"
        )
        .fromTo(
          scrollRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        );

      // Parallax on scroll
      const handleScroll = () => {
        const scrollY = window.scrollY;
        if (imgLeftRef.current) gsap.to(imgLeftRef.current, { y: scrollY * 0.15, duration: 0.3 });
        if (imgRightRef.current) gsap.to(imgRightRef.current, { y: scrollY * -0.08, duration: 0.3 });
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const words = "More Than Wood".split(" ");

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#1a1611] overflow-hidden flex items-center">
      {/* SVG Pattern Layers */}
      <GeometricGrid id="hero-grid" color="rgba(196,168,130,0.04)" />
      <FloatingParticles count={25} color="rgba(196,168,130,0.12)" />

      {/* Tree Ring decorations */}
      <div ref={treeRingRef1} className="absolute -left-[100px] top-[10%] w-[400px] h-[400px] opacity-40">
        <TreeRingsSvg />
      </div>
      <div ref={treeRingRef2} className="absolute -right-[80px] bottom-[5%] w-[350px] h-[350px] opacity-30">
        <TreeRingsSvg />
      </div>

      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />

      {/* Center vertical line */}
      <div ref={lineRef} className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#c4a882]/20 to-transparent" />

      {/* Image Left */}
      <div
        ref={imgLeftRef}
        className="absolute left-[5%] top-[15%] w-[30vw] max-w-[380px] aspect-[3/4] overflow-hidden opacity-0"
        style={{ perspective: "1000px" }}
      >
        <img src={IMG_KITCHEN} alt="Kitchen" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1611]/60 to-transparent" />
        {/* Decorative corner accents */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[#c4a882]/40" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-[#c4a882]/40" />
      </div>

      {/* Image Right */}
      <div
        ref={imgRightRef}
        className="absolute right-[5%] bottom-[10%] w-[28vw] max-w-[340px] aspect-[3/4] overflow-hidden opacity-0"
        style={{ perspective: "1000px" }}
      >
        <img src={IMG_CLOSET} alt="Dressing Room" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1611]/60 to-transparent" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#c4a882]/40" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-[#c4a882]/40" />
      </div>

      {/* Content Center */}
      <div className="relative z-10 w-full flex flex-col items-center text-center px-6 py-32">
        <p
          ref={subRef}
          className="font-body text-[#c4a882] text-xs tracking-[0.4em] uppercase mb-8 opacity-0"
        >
          Kitchens · Dressing Rooms · Custom Interiors
        </p>

        <h1
          ref={headingRef}
          className="font-heading text-white overflow-hidden"
          style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", lineHeight: 0.9, letterSpacing: "-2px" }}
        >
          {words.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.25em]" style={{ perspective: "600px", transformStyle: "preserve-3d" }}>
              {word}
            </span>
          ))}
        </h1>

        <div className="mt-12 flex items-center gap-8">
          <div className="w-16 h-px bg-[#c4a882]/40" />
          <p className="font-body text-white/50 text-sm max-w-sm" style={{ fontWeight: 300, lineHeight: 1.7 }}>
Custom-designed interiors where natural wood meets modern precision. Kitchens, dressing rooms, TV units, and more — crafted for you.          </p>
          <div className="w-16 h-px bg-[#c4a882]/40" />
        </div>

        <div ref={scrollRef} className="mt-20 flex flex-col items-center gap-2 opacity-0">
          <span className="font-body text-white/30 text-xs tracking-[0.3em] uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4 text-white/30 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
