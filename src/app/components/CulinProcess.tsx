import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass, PenTool, Hammer, CheckCircle } from "lucide-react";
import { GeometricGrid } from "./SvgPatterns";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: Compass, num: "01", title: "Discovery", desc: "We listen to your vision, study your space, and understand how you live. Every great design starts with the right questions." },
  { icon: PenTool, num: "02", title: "Design", desc: "Our designers create detailed 3D visualizations, material selections, and technical drawings — refining until every detail is perfect." },
  { icon: Hammer, num: "03", title: "Crafting", desc: "Master artisans bring designs to life using premium hardwoods and precision engineering. Every joint, every surface, handcrafted." },
  { icon: CheckCircle, num: "04", title: "Installation", desc: "Our team installs with surgical precision. We don't leave until every handle, hinge, and panel is flawless." },
];

export function CulinProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Grid pattern shimmer
      gsap.to(".svg-dot-process-grid", {
        opacity: 0.6,
        scale: 1.5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.1, from: "random" },
        ease: "sine.inOut",
      });

      // Progress line with scroll
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%", end: "bottom 60%", scrub: 1 },
        }
      );

      // Steps entrance with 3D
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step, i) => {
        gsap.fromTo(
          step,
          { y: 80, opacity: 0, rotateY: 20, scale: 0.9 },
          {
            y: 0, opacity: 1, rotateY: 0, scale: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 85%" },
          }
        );
      });

      // Icon continuous rotation on hover area
      iconRefs.current.forEach((iconEl) => {
        if (!iconEl) return;
        const icon = iconEl.querySelector(".process-icon-inner");
        if (!icon) return;

        iconEl.addEventListener("mouseenter", () => {
          gsap.to(icon, { rotateY: 360, duration: 0.6, ease: "power2.inOut" });
        });
        iconEl.addEventListener("mouseleave", () => {
          gsap.to(icon, { rotateY: 0, duration: 0.6, ease: "power2.inOut" });
        });
      });

      // Connecting dots animation
      gsap.fromTo(
        ".process-connect-dot",
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)", stagger: 0.2,
          scrollTrigger: { trigger: ".process-connect-dot", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="relative bg-[#1a1611] py-32 px-6 lg:px-12 overflow-hidden">
      {/* SVG Pattern */}
      <GeometricGrid id="process-grid" color="rgba(196,168,130,0.03)" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-white/20" />
            <span className="font-body text-white/40 text-xs tracking-[0.3em] uppercase">Our Process</span>
            <div className="w-12 h-px bg-white/20" />
          </div>
          <h2 className="font-heading text-white" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}>
            From vision to <span className="italic text-[#c4a882]">reality</span>
          </h2>
        </div>

        {/* Progress line */}
        <div className="hidden lg:block relative mb-16">
          <div className="h-px bg-white/10 w-full" />
          <div ref={lineRef} className="absolute top-0 left-0 h-px bg-[#c4a882] w-full origin-left" />
          {/* Connection dots */}
          <div className="absolute top-0 left-0 w-full flex justify-between -translate-y-1/2">
            {steps.map((_, i) => (
              <div
                key={i}
                className="process-connect-dot w-3 h-3 rounded-full bg-[#c4a882] border-2 border-[#1a1611]"
                style={{ marginLeft: i === 0 ? "12.5%" : "0", marginRight: i === steps.length - 1 ? "12.5%" : "0" }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((s, i) => (
            <div
              key={s.num}
              ref={(el) => { iconRefs.current[i] = el; }}
              className="process-step group cursor-hover"
              style={{ perspective: "800px", transformStyle: "preserve-3d" }}
            >
              <div className="w-16 h-16 border border-[#c4a882]/30 flex items-center justify-center mb-6 group-hover:bg-[#c4a882]/10 group-hover:border-[#c4a882]/60 transition-all duration-500"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="process-icon-inner" style={{ transformStyle: "preserve-3d" }}>
                  <s.icon className="w-7 h-7 text-[#c4a882]" strokeWidth={1.2} />
                </div>
              </div>
              <span className="font-heading text-[#c4a882]/30 text-sm">{s.num}</span>
              <h3 className="font-heading text-white text-2xl mt-2 mb-4 group-hover:text-[#c4a882] transition-colors duration-500" style={{ lineHeight: 1.1 }}>{s.title}</h3>
              <p className="font-body text-white/40 text-sm" style={{ fontWeight: 300, lineHeight: 1.8 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
