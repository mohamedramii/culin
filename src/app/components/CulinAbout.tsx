import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WoodGrainPattern, OrganicBlobs } from "./SvgPatterns";
import { use3DTilt } from "./use3DTilt";

gsap.registerPlugin(ScrollTrigger);

const IMG_CRAFT = "https://images.unsplash.com/photo-1722411927625-0e478acf502b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kd29ya2luZyUyMGNyYWZ0c21hbiUyMHdvcmtzaG9wfGVufDF8fHx8MTc3NTY0MjA5NHww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_TEXTURE = "https://images.unsplash.com/photo-1566733622605-eedf4a0f8223?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwdGV4dHVyZSUyMG9hayUyMGdyYWluJTIwY2xvc2V1cHxlbnwxfHx8fDE3NzU2NjY1NDV8MA&ixlib=rb-4.1.0&q=80&w=1080";

export function CulinAbout() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tiltRef = use3DTilt(8);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate wood grain SVG lines
      gsap.to(".svg-line-about-wood", {
        strokeDashoffset: 0,
        duration: 3,
        ease: "none",
        repeat: -1,
        stagger: 0.5,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      // Blobs morph
      gsap.to(".blob-about-blobs", {
        scale: "random(0.8, 1.3)",
        x: "random(-40, 40)",
        y: "random(-40, 40)",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 1.5, from: "random" },
      });

      // Reveal heading
      gsap.fromTo(
        ".about-heading-line",
        { y: 80, opacity: 0, skewY: 3 },
        {
          y: 0, opacity: 1, skewY: 0, duration: 1, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: ".about-heading-line", start: "top 85%" },
        }
      );

      // Image clip reveal
      gsap.fromTo(
        ".about-img",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power3.inOut", stagger: 0.3,
          scrollTrigger: { trigger: ".about-img", start: "top 80%" },
        }
      );

      // Counter animation
      const stats = [
        { target: 15, suffix: "+" },
        { target: 500, suffix: "+" },
        { target: 100, suffix: "%" },
      ];
      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stats[i].target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val) + stats[i].suffix;
          },
        });
      });

      // Body text
      gsap.fromTo(
        ".about-body",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".about-body", start: "top 85%" },
        }
      );

      // Decorative line draw
      gsap.fromTo(
        ".about-deco-line",
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.5, ease: "power3.inOut",
          scrollTrigger: { trigger: ".about-deco-line", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative bg-[#f5f0eb] py-32 px-6 lg:px-12 overflow-hidden">
      {/* SVG Patterns */}
      <WoodGrainPattern id="about-wood" color="rgba(26,22,17,0.04)" />
      <OrganicBlobs id="about-blobs" color="rgba(196,168,130,0.06)" />

      <div className="relative max-w-7xl mx-auto">
        {/* Label */}
        <div className="flex items-center gap-4 mb-16">
          <div className="about-deco-line w-12 h-px bg-[#1a1611]/30 origin-left" />
          <span className="font-body text-[#1a1611]/50 text-xs tracking-[0.3em] uppercase">Our Story</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Text */}
          <div>
            <h2 className="font-heading text-[#1a1611] mb-8" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}>
              <span className="about-heading-line block">Where nature</span>
              <span className="about-heading-line block italic text-[#c4a882]">meets architecture</span>
            </h2>

            <p className="about-body font-body text-[#1a1611]/60 text-sm max-w-md" style={{ fontWeight: 300, lineHeight: 1.8 }}>
              Culin was born from a passion for authentic craftsmanship. We believe every kitchen
              should inspire, every dressing room should delight. Our designs merge the raw beauty
              of natural wood with precise, modern engineering — creating spaces that feel both
              timeless and distinctly contemporary.
            </p>

            <div className="mt-12 grid grid-cols-3 gap-8">
              {[
                { label: "Years Experience" },
                { label: "Projects Delivered" },
                { label: "Handcrafted" },
              ].map((s, i) => (
                <div key={s.label} className="cursor-hover">
                  <span
                    ref={(el) => { counterRefs.current[i] = el; }}
                    className="font-heading text-[#1a1611] text-4xl block"
                  >
                    0
                  </span>
                  <div className="font-body text-[#1a1611]/40 text-xs tracking-[0.1em] uppercase mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Images with 3D tilt */}
          <div ref={tiltRef} className="relative" style={{ transformStyle: "preserve-3d" }}>
            <div className="about-img overflow-hidden" style={{ clipPath: "inset(0 100% 0 0)" }}>
              <img src={IMG_CRAFT} alt="Craftsman at work" className="w-full aspect-[4/3] object-cover" />
            </div>
            <div
              className="about-img absolute -bottom-12 -left-8 w-[60%] overflow-hidden shadow-2xl"
              style={{ clipPath: "inset(0 100% 0 0)", transform: "translateZ(40px)" }}
            >
              <img src={IMG_TEXTURE} alt="Wood texture" className="w-full aspect-square object-cover" />
            </div>
            {/* Floating accent square */}
            <div
              className="absolute -top-6 -right-6 w-24 h-24 border border-[#c4a882]/30"
              style={{ transform: "translateZ(60px)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
