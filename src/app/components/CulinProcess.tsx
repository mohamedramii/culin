import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, PenTool, CheckSquare, Hammer, Star } from "lucide-react";
import { GeometricGrid } from "./SvgPatterns";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: MessageCircle,
    num: "01",
    title: "Consultation & Discovery",
    desc: "We listen, gather insights, and discuss your ideas to fully understand your needs and space.",
  },
  {
    icon: PenTool,
    num: "02",
    title: "Custom Design & Planning",
    desc: "We craft personalized layouts focused on functionality, aesthetics, and smart use of space.",
  },
  {
    icon: CheckSquare,
    num: "03",
    title: "Approval & Materials",
    desc: "We walk you through materials and finishes until you're fully satisfied, then move forward.",
  },
  {
    icon: Hammer,
    num: "04",
    title: "Manufacturing & Crafting",
    desc: "We craft your custom unit with premium materials and precise attention to detail.",
  },
  {
    icon: Star,
    num: "05",
    title: "Installation & Quality Check",
    desc: "Our team installs your design and conducts a thorough quality check for a flawless finish.",
  },
];

export function CulinProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".process-step");
      const dots = gsap.utils.toArray<HTMLElement>(".process-connect-dot");

      // Background grid animation
      gsap.to(".svg-dot-process-grid", {
        opacity: 0.6,
        scale: 1.5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.1, from: "random" },
        ease: "sine.inOut",
      });

      // Initial states: all cards hidden, all dots hidden
      gsap.set(cards, { y: 80, opacity: 0 });
      gsap.set(dots, { scale: 0, opacity: 0 });

      // Pinned timeline: line fills + cards rise + dots appear
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 10%",
          end: `+=${window.innerHeight * 4}`,
          pin: true,
          scrub: 1,
        },
      });

      // Calculate each dot's position as a fraction of the line width
      const lineEl = lineRef.current!;
      const lineRect = lineEl.getBoundingClientRect();
      const dotPositions = dots.map((dot) => {
        const dotRect = dot.getBoundingClientRect();
        return (dotRect.left + dotRect.width / 2 - lineRect.left) / lineRect.width;
      });

      // Line reaches dot 0 at time 0, then extends to each next dot
      tl.fromTo(lineEl, { scaleX: 0 }, { scaleX: dotPositions[0], ease: "none", duration: 0.8 }, 0);
      for (let i = 1; i < dotPositions.length; i++) {
        tl.to(lineEl, { scaleX: dotPositions[i], ease: "none", duration: 0.8 }, i);
      }

      // Each card + dot reveals at its scroll position
      cards.forEach((card, i) => {
        tl.to(card, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, i);
        tl.to(dots[i], { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" }, i);
      });

      // Icon hover rotation
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
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="process" className="relative bg-[#1a1611] py-32 px-6 lg:px-12 overflow-hidden">
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

        <div className="hidden lg:block relative mb-16">
          <div className="h-px bg-white/10 w-full" />
          <div ref={lineRef} className="absolute top-0 left-0 h-px bg-[#c4a882] w-full origin-left" />
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
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