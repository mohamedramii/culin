import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HexagonPattern } from "./SvgPatterns";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const IMG1 = "https://images.unsplash.com/photo-1765371515651-faa86f08f0ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBraXRjaGVuJTIwd29vZCUyMGRlc2lnbnxlbnwxfHx8fDE3NzU2NjY1NDR8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG2 = "https://images.unsplash.com/photo-1774301211236-dab64d553241?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3YWxrLWluJTIwY2xvc2V0JTIwbHV4dXJ5fGVufDF8fHx8MTc3NTY2NjU0Nnww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG3 = "https://images.unsplash.com/photo-1768039049614-f3c2bae3f1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBraXRjaGVuJTIwbWFyYmxlJTIwY291bnRlcnRvcHxlbnwxfHx8fDE3NzU2MjQ4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG4 = "https://images.unsplash.com/photo-1705321963943-de94bb3f0dd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaW50ZXJpb3IlMjBkZXNpZ24lMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3NTY2NjU0Nnww&ixlib=rb-4.1.0&q=80&w=1080";

const projects = [
  { img: IMG1, title: "The Oak Kitchen", category: "Kitchen Design", year: "2025" },
  { img: IMG2, title: "Velvet Suite", category: "Dressing Room", year: "2025" },
  { img: IMG3, title: "Marble & Grain", category: "Kitchen Design", year: "2024" },
  { img: IMG4, title: "The Living Space", category: "Custom Interior", year: "2024" },
];

export function CulinPortfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const cursorImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hex pattern pulse
      gsap.to(".hex-portfolio-hex", {
        opacity: 0.5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.2, from: "random" },
        ease: "sine.inOut",
      });

      // Portfolio items staggered reveal with rotation
      gsap.fromTo(
        ".portfolio-item",
        { y: 80, opacity: 0, rotateX: 8 },
        {
          y: 0, opacity: 1, rotateX: 0, duration: 1, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: ".portfolio-grid", start: "top 80%" },
        }
      );

      // Image parallax
      gsap.utils.toArray<HTMLElement>(".portfolio-img").forEach((img) => {
        gsap.to(img, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (cursorImgRef.current && hoveredIdx !== null) {
        gsap.to(cursorImgRef.current, {
          x: e.clientX + 20,
          y: e.clientY - 40,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [hoveredIdx]);

  return (
    <section ref={sectionRef} id="portfolio" className="relative bg-[#f5f0eb] py-32 px-6 lg:px-12 overflow-hidden">
      {/* SVG Pattern */}
      <HexagonPattern id="portfolio-hex" color="rgba(26,22,17,0.03)" />

      {/* Floating project preview on hover (desktop) */}
      <div
        ref={cursorImgRef}
        className="fixed top-0 left-0 w-64 h-48 pointer-events-none z-50 hidden md:block overflow-hidden transition-opacity duration-300"
        style={{ opacity: hoveredIdx !== null ? 1 : 0 }}
      >
        {hoveredIdx !== null && (
          <img src={projects[hoveredIdx].img} alt="" className="w-full h-full object-cover" />
        )}
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-[#1a1611]/30" />
              <span className="font-body text-[#1a1611]/50 text-xs tracking-[0.3em] uppercase">Selected Work</span>
            </div>
            <h2 className="font-heading text-[#1a1611]" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}>
              Our <span className="italic text-[#c4a882]">portfolio</span>
            </h2>
          </div>
          <button className="hidden md:flex items-center gap-2 border border-[#1a1611]/20 text-[#1a1611] font-body text-xs tracking-[0.2em] uppercase px-6 py-3 hover:bg-[#1a1611] hover:text-white transition-all duration-500">
            View All <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Alternate: List view with hover preview */}
        <div className="portfolio-grid flex flex-col">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className="portfolio-item group cursor-pointer py-10 border-t border-[#1a1611]/10 last:border-b"
              style={{ perspective: "1000px" }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <span className="font-heading text-[#c4a882]/40 text-3xl w-12">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-heading text-[#1a1611] text-3xl md:text-4xl group-hover:text-[#c4a882] transition-colors duration-500 group-hover:translate-x-4 transition-transform" style={{ lineHeight: 1.1 }}>
                      {p.title}
                    </h3>
                    <p className="font-body text-[#1a1611]/40 text-xs tracking-[0.2em] uppercase mt-2">{p.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-body text-[#1a1611]/30 text-sm hidden md:block">{p.year}</span>
                  <ArrowUpRight className="w-5 h-5 text-[#1a1611]/20 group-hover:text-[#c4a882] group-hover:rotate-45 transition-all duration-500" />
                </div>
              </div>

              {/* Mobile image */}
              <div className="md:hidden mt-6 overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full aspect-[16/9] object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
