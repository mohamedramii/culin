import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { FloatingParticles, GeometricGrid, TreeRingsSvg } from "./SvgPatterns";
import { useMouseParallax } from "./use3DTilt";
import { Link } from "react-router";

gsap.registerPlugin(ScrollTrigger);

export function CulinCta() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ringRef = useMouseParallax(0.06);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<SVGCircleElement>(".floating-particle").forEach((p) => {
        const speed = parseFloat(p.getAttribute("data-speed") || "1");
        gsap.to(p, {
          y: `random(-80, 80)`,
          x: `random(-40, 40)`,
          duration: 4 + speed * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 3,
        });
      });

      gsap.to(".svg-dot-cta-grid", {
        opacity: 0.5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.08, from: "random" },
        ease: "sine.inOut",
      });

      gsap.to(".tree-ring", {
        rotation: "+=360",
        duration: 50,
        repeat: -1,
        ease: "none",
        stagger: { each: 4, from: "center" },
        transformOrigin: "center center",
      });

      gsap.fromTo(
        ".cta-text",
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: ".cta-text", start: "top 85%" },
        }
      );

      const buttons = document.querySelectorAll(".magnetic-btn");
      buttons.forEach((btn) => {
        btn.addEventListener("mousemove", (e: any) => {
          const rect = (btn as HTMLElement).getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative bg-[#1a1611] overflow-hidden">
      <GeometricGrid id="cta-grid" color="rgba(196,168,130,0.03)" />
      <FloatingParticles count={30} color="rgba(196,168,130,0.1)" />

      <div ref={ringRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10">
        <TreeRingsSvg />
      </div>

      <div className="relative py-32 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="cta-text font-heading text-white"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", lineHeight: 0.95 }}
          >
            Let's craft your<br />
            <span className="italic text-[#c4a882]">dream space</span>
          </h2>
          <p className="cta-text font-body text-white/40 text-sm md:text-base mt-8 max-w-lg mx-auto" style={{ fontWeight: 300, lineHeight: 1.8 }}>
            Book a free design consultation. Share your vision and let our team create something extraordinary — tailored entirely to you.
          </p>
          <div className="cta-text mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/contact"
              className="magnetic-btn bg-[#c4a882] text-[#1a1611] font-body text-xs tracking-[0.2em] uppercase px-8 py-4 flex items-center gap-3 hover:bg-[#d4b892] transition-colors duration-500"
            >
              Book Consultation <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              to="/portfolio"
              className="magnetic-btn border border-white/20 text-white font-body text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-white hover:text-[#1a1611] transition-all duration-500"
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>

      <footer className="relative border-t border-white/10 px-6 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <img src={new URL("../../assets/logo.png", import.meta.url).href} alt="Culin" className="h-12 w-auto" />
              <p className="font-body text-white/30 text-sm max-w-sm mt-4" style={{ fontWeight: 300, lineHeight: 1.8 }}>
                More than wood. Crafting bespoke kitchens and dressing rooms that merge natural beauty with modern design.
              </p>
            </div>
            <div>
              <h4 className="font-body text-white/60 text-xs tracking-[0.2em] uppercase mb-4" style={{ fontWeight: 500 }}>Navigation</h4>
              <div className="flex flex-col gap-3">
                {([
                  // ["About", "/about"],
                  // ["Services", "/services"],
                  // ["Portfolio", "/portfolio"],
                  // ["Process", "/process"],
                  // ["Contact", "/contact"],
                    ["About", "/"],
                  ["Services", "/"],
                  ["Portfolio", "/"],
                  ["Process", "/"],
                  ["Contact", "/"],
                ] as [string, string][]).map(([label, href]) => (
                  <Link key={label} to={href} className="font-body text-white/30 text-sm hover:text-[#c4a882] transition-colors duration-300" style={{ fontWeight: 300 }}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-body text-white/60 text-xs tracking-[0.2em] uppercase mb-4" style={{ fontWeight: 500 }}>Connect</h4>
              <div className="flex flex-col gap-3">
                {["Instagram", "Pinterest", "LinkedIn"].map((l) => (
                  <a key={l} href="#" className="font-body text-white/30 text-sm hover:text-[#c4a882] transition-colors duration-300" style={{ fontWeight: 300 }}>
                    {l}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-body text-white/20 text-xs">&copy; 2026 Culin. All rights reserved.</span>
            <div className="flex gap-6">
              {["Privacy", "Terms", "Cookies"].map((l) => (
                <a key={l} href="#" className="font-body text-white/20 text-xs hover:text-white/50 transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
