import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Gem, HeartHandshake, Lightbulb } from "lucide-react";
import { DiagonalLines } from "./SvgPatterns";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: Sparkles,
    num: "01",
    title: "Tailored to You",
    desc: "We provide custom designs tailored to meet the unique needs and preferences of each client, ensuring that your space fits perfectly with your vision.",
  },
  {
    icon: Gem,
    num: "02",
    title: "Premium Yet Affordable",
    desc: "We combine high-end materials and skilled craftsmanship with affordable pricing — delivering premium solutions without the premium price tag.",
  },
  {
    icon: HeartHandshake,
    num: "03",
    title: "Client-First Always",
    desc: "We put our clients first by listening to their needs and providing solutions that exceed expectations at every step of the process.",
  },
  {
    icon: Lightbulb,
    num: "04",
    title: "Modern & Innovative",
    desc: "We stay ahead of industry trends and provide modern, functional designs that blend style and practicality for spaces that stand the test of time.",
  },
];

export function CulinWhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // CULIN background text slides down from top
      gsap.fromTo(
        ".whyus-bg-text",
        { top: "-100%" },
        {
          top: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      // Diagonal lines flow
      gsap.to(".diag-line-whyus-diag", {
        strokeDashoffset: -100,
        duration: 10,
        repeat: -1,
        ease: "none",
      });

      // Section heading
      gsap.fromTo(
        ".whyus-heading",
        { y: 60, opacity: 0, skewY: 2 },
        {
          y: 0, opacity: 1, skewY: 0, duration: 1.1, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: ".whyus-heading", start: "top 85%" },
        }
      );

      // Cards stagger entrance with 3D rotate
      gsap.utils.toArray<HTMLElement>(".whyus-card").forEach((card, i) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 85%" },
        });

        tl.fromTo(
          card,
          { y: 80, opacity: 0, rotateX: 15, scale: 0.95 },
          { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 0.9, ease: "power3.out" }
        );

        tl.fromTo(
          card.querySelector(".whyus-num"),
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.5"
        );
      });

      // Icon hover flip
      document.querySelectorAll<HTMLElement>(".whyus-icon-wrap").forEach((el) => {
        el.addEventListener("mouseenter", () => {
          gsap.to(el.querySelector(".whyus-icon-inner"), {
            rotateY: 180, duration: 0.5, ease: "power2.inOut",
          });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el.querySelector(".whyus-icon-inner"), {
            rotateY: 0, duration: 0.5, ease: "power2.inOut",
          });
        });
      });

      // Animated border on card hover is handled by Tailwind
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f5f0eb] py-32 px-6 lg:px-12 overflow-hidden"
    >
      <DiagonalLines id="whyus-diag" color="rgba(26,22,17,0.04)" />

      {/* Large background text — scrolls down from top */}
      <div
        className="whyus-bg-text absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
        style={{ top: "-30%" }}
      >
        <span
          className="font-heading text-[#1a1611]/[0.03] whitespace-nowrap"
          style={{ fontSize: "clamp(8rem, 18vw, 22rem)", lineHeight: 1 }}
        >
          CULIN
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Heading block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-[#1a1611]/20" />
              <span className="font-body text-[#1a1611]/40 text-xs tracking-[0.3em] uppercase">
                Why Choose Culin
              </span>
            </div>
            <h2
              className="font-heading text-[#1a1611]"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
            >
              <span className="whyus-heading block">The difference</span>
              <span className="whyus-heading block italic text-[#c4a882]">
                is in the details
              </span>
            </h2>
          </div>
          <p
            className="font-body text-[#1a1611]/50 text-sm max-w-xs lg:text-right"
            style={{ fontWeight: 300, lineHeight: 1.8 }}
          >
            Four core principles that define every project we take on — from first consultation to final installation.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <div
              key={r.num}
              className="whyus-card group relative bg-white/60 border border-[#1a1611]/08 p-8 flex flex-col gap-6 cursor-pointer hover:bg-white hover:border-[#c4a882]/30 hover:shadow-lg transition-all duration-500"
              style={{ perspective: "800px", transformStyle: "preserve-3d" }}
            >
              {/* Number */}
              <span className="whyus-num font-heading text-[#c4a882]/20 absolute top-6 right-6"
                style={{ fontSize: "clamp(3rem, 5vw, 4rem)", lineHeight: 1 }}
              >
                {r.num}
              </span>

              {/* Icon */}
              <div
                className="whyus-icon-wrap w-12 h-12 border border-[#1a1611]/15 flex items-center justify-center group-hover:border-[#c4a882]/60 group-hover:bg-[#c4a882]/08 transition-all duration-500"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="whyus-icon-inner" style={{ transformStyle: "preserve-3d" }}>
                  <r.icon className="w-5 h-5 text-[#1a1611]/60 group-hover:text-[#c4a882] transition-colors duration-500" strokeWidth={1.3} />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3 mt-2">
                <h3
                  className="font-heading text-[#1a1611] group-hover:text-[#c4a882] transition-colors duration-500"
                  style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)", lineHeight: 1.15 }}
                >
                  {r.title}
                </h3>
                <p
                  className="font-body text-[#1a1611]/50 text-sm"
                  style={{ fontWeight: 300, lineHeight: 1.8 }}
                >
                  {r.desc}
                </p>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-[#c4a882] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </div>
          ))}
        </div>

        {/* Bottom CTA line */}
        <div className="mt-20 flex items-center gap-6">
          <div className="flex-1 h-px bg-[#1a1611]/10" />
          <span className="font-body text-[#1a1611]/30 text-xs tracking-[0.2em] uppercase whitespace-nowrap">
            Cairo · Al Maryoutia · Egypt
          </span>
          <div className="flex-1 h-px bg-[#1a1611]/10" />
        </div>
      </div>
    </section>
  );
}
