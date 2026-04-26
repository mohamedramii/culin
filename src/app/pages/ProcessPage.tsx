import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router";
import { ArrowLeft, ArrowUpRight, Compass, PenTool, Hammer, CheckCircle, Package, MessageCircle } from "lucide-react";
import { WoodGrainPattern, GeometricGrid, FloatingParticles, DiagonalLines } from "../components/SvgPatterns";

gsap.registerPlugin(ScrollTrigger);

const IMG_BLUEPRINT = "https://images.unsplash.com/photo-1582057811341-a22d524c6a4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3QlMjBibHVlcHJpbnQlMjBkZXNpZ24lMjBjb25zdWx0YXRpb24lMjBkZXNrfGVufDF8fHx8MTc3NzA0Mzk4NXww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_WORKSHOP = "https://images.unsplash.com/photo-1761544775659-aaa6fa2e5b3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwd29ya3Nob3AlMjBjcmFmdHNtYW4lMjBhcnRpc2FuJTIwam9pbmVyeXxlbnwxfHx8fDE3NzcwNDM5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080";

const steps = [
  {
    num: "01",
    icon: MessageCircle,
    title: "Discovery Call",
    duration: "Week 1",
    color: "#c4a882",
    desc: "It starts with a conversation. We learn about your space, your lifestyle, your aesthetic references and practical needs. There are no wrong answers — only honest ones that help us design better.",
    deliverables: ["Space brief document", "Lifestyle questionnaire", "Initial budget framework", "Project timeline estimate"],
  },
  {
    num: "02",
    icon: Compass,
    title: "Site Survey",
    duration: "Week 1–2",
    color: "#b8956e",
    desc: "Our team visits your space with laser measurement tools and a careful eye. We document every millimetre, every ceiling height, every pipe chase — because precision design starts with precise data.",
    deliverables: ["Full measured survey", "Existing condition photos", "Architectural constraints report", "Technical site notes"],
  },
  {
    num: "03",
    icon: PenTool,
    title: "Design & Visualisation",
    duration: "Weeks 2–6",
    color: "#aa8460",
    desc: "Our designers translate your brief into photorealistic 3D visualisations. We refine until every proportion, material, and detail resonates with you. No compromises. No 'that'll do'.",
    deliverables: ["Concept mood board", "Full 3D renders", "Material & finish selection", "Technical drawings", "Hardware specification"],
  },
  {
    num: "04",
    icon: Package,
    title: "Material Sourcing",
    duration: "Weeks 5–8",
    color: "#9a7050",
    desc: "We hand-select every plank, every stone slab, every hardware piece. Our timber is fully traceable. Our stones are chosen for their specific veining. We won't substitute quality.",
    deliverables: ["Timber selection & grading", "Stone or quartz selection", "Hardware samples signed off", "Supplier coordination"],
  },
  {
    num: "05",
    icon: Hammer,
    title: "Crafting",
    duration: "Weeks 6–14",
    color: "#8a6040",
    desc: "Master craftsmen work in our workshop, building your pieces with precision joinery, hand-sanded surfaces, and meticulous finishing. Every joint tested. Every surface checked.",
    deliverables: ["Workshop production", "Quality control checks", "Finish application", "Pre-installation dry-fit"],
  },
  {
    num: "06",
    icon: CheckCircle,
    title: "Installation & Handover",
    duration: "Final week",
    color: "#7a5030",
    desc: "Our installation team arrives, protects your property, and works methodically until everything is perfect. We don't sign off until every hinge, handle, and gap meets our standards. Then we hand over — and stay available.",
    deliverables: ["White-glove installation", "Snag list resolution", "Care & maintenance guide", "2-year warranty issued"],
  },
];

const materials = [
  { name: "European Oak", desc: "Our primary timber. Strong, beautiful grain, ages to perfection.", origin: "France / Germany" },
  { name: "American Walnut", desc: "Rich chocolate tones with remarkable natural character.", origin: "North America" },
  { name: "Natural Ash", desc: "Light and versatile — ideal for contemporary dressing rooms.", origin: "Europe" },
  { name: "Honed Marble", desc: "Matte finish for worktops that are tactile and timeless.", origin: "Italy / Turkey" },
  { name: "Calacatta Quartz", desc: "The durability of engineered stone with marble aesthetics.", origin: "Spain" },
  { name: "Solid Brass", desc: "Hand-aged hardware that improves with every year.", origin: "Artisan foundries" },
];

export function ProcessPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero chars
      const chars = heroTitleRef.current?.querySelectorAll<HTMLSpanElement>(".char") ?? [];
      if (chars.length) {
        gsap.fromTo(chars,
          { yPercent: 120, rotate: 8, opacity: 0 },
          { yPercent: 0, rotate: 0, opacity: 1, duration: 1.1, ease: "power4.out", stagger: 0.04, delay: 0.2 }
        );
      }
      gsap.fromTo(".proc-sub", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.9 });

      // Floating particles
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

      // Diagonal lines
      gsap.to(".diag-line-proc-diag", { strokeDashoffset: -100, duration: 8, repeat: -1, ease: "none" });

      // Grid dots shimmer
      gsap.to(".svg-dot-proc-grid", {
        opacity: 0.5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.1, from: "random" },
        ease: "sine.inOut",
      });

      // Step cards 3D entrance
      gsap.utils.toArray<HTMLElement>(".step-card").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 80, opacity: 0, rotateY: i % 2 === 0 ? -15 : 15, scale: 0.95 },
          {
            y: 0, opacity: 1, rotateY: 0, scale: 1, duration: 1.1, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );

        // Icon hover
        const icon = card.querySelector(".step-icon");
        if (icon) {
          card.addEventListener("mouseenter", () => {
            gsap.to(icon, { rotateY: 360, duration: 0.7, ease: "power2.inOut" });
          });
        }
      });

      // Deliverable items
      gsap.utils.toArray<HTMLElement>(".deliverable-item").forEach((item) => {
        gsap.fromTo(item,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 92%" } }
        );
      });

      // Progress bar scroll
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: ".steps-section", start: "top 60%", end: "bottom 60%", scrub: 1 },
        }
      );

      // Materials cards
      gsap.utils.toArray<HTMLElement>(".material-card").forEach((card) => {
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 88%" } }
        );
      });

      // Images clip reveal
      gsap.fromTo(".proc-img",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power3.inOut",
          scrollTrigger: { trigger: ".proc-img", start: "top 80%" } }
      );

      // Marquee
      gsap.to(".proc-marquee", { xPercent: -50, duration: 28, ease: "none", repeat: -1 });

      // Section headings
      gsap.utils.toArray<HTMLElement>(".proc-heading").forEach((h) => {
        gsap.fromTo(h,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: h, start: "top 85%" } }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const splitTitle = (text: string) =>
    text.split("").map((ch, i) => (
      <span key={i} className="char inline-block" style={{ whiteSpace: ch === " " ? "pre" : "normal" }}>{ch}</span>
    ));

  return (
    <div ref={rootRef} className="bg-[#f5f0eb] text-[#1a1611]">

      {/* ===== HERO ===== */}
      <section className="relative min-h-[100vh] flex items-center px-6 lg:px-12 pt-40 pb-24 overflow-hidden bg-[#1a1611] text-white">
        <WoodGrainPattern id="proc-grain" color="rgba(196,168,130,0.07)" />
        <FloatingParticles count={22} color="rgba(196,168,130,0.18)" />

        {/* Animated SVG rings decoration */}
        <div className="absolute bottom-10 right-10 hidden lg:block pointer-events-none opacity-15">
          <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
            {[180, 130, 90, 55, 25].map((r, i) => (
              <circle
                key={i}
                cx="200" cy="200" r={r}
                stroke="#c4a882"
                strokeWidth="0.5"
                strokeDasharray={`${3 + i} ${5 + i}`}
                style={{
                  transformOrigin: "200px 200px",
                  animation: `spin ${10 + i * 5}s linear infinite ${i % 2 === 0 ? "" : "reverse"}`,
                }}
              />
            ))}
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto w-full">
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-[#c4a882] font-body text-xs tracking-[0.3em] uppercase mb-12 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back Home
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-[#c4a882]/50" />
            <span className="proc-sub font-body text-[#c4a882] text-xs tracking-[0.3em] uppercase">How We Work</span>
          </div>

          <h1 ref={heroTitleRef} className="font-heading leading-[0.95] max-w-5xl" style={{ fontSize: "clamp(3rem, 9vw, 9rem)" }}>
            <span className="block overflow-hidden">{splitTitle("From vision")}</span>
            <span className="block overflow-hidden italic text-[#c4a882]">{splitTitle("to reality")}</span>
          </h1>

          <p className="proc-sub mt-10 max-w-xl font-body text-white/60 leading-relaxed">
            Six precise steps. Zero shortcuts. A process refined over 13 years and 500+ projects to ensure every outcome is extraordinary.
          </p>
        </div>
      </section>

      {/* ===== PROGRESS BAR ===== */}
      <div className="sticky top-[72px] z-40 bg-[#1a1611]/95 backdrop-blur-sm px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-px bg-white/10 w-full">
            <div ref={lineRef} className="absolute top-0 left-0 h-px bg-[#c4a882] w-full origin-left" />
          </div>
          <div className="flex justify-between mt-3">
            {steps.map((s) => (
              <span key={s.num} className="font-body text-white/30 text-xs tracking-[0.2em] hidden md:block">{s.num}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ===== STEPS ===== */}
      <section className="steps-section relative py-24 px-6 lg:px-12 overflow-hidden">
        <GeometricGrid id="proc-grid" color="rgba(26,22,17,0.03)" />

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col gap-6">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className={`step-card group border border-[#1a1611]/10 hover:border-[#c4a882]/30 transition-all duration-500 overflow-hidden`}
                style={{ perspective: "1000px" }}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-0`}>
                  {/* Left: Number + Icon + Duration */}
                  <div className="bg-[#1a1611] p-10 flex flex-col justify-between min-h-[200px] lg:min-h-[260px]">
                    <div>
                      <span className="font-heading text-[#c4a882]/30 text-6xl">{s.num}</span>
                      <div
                        className="step-icon w-14 h-14 border border-[#c4a882]/30 flex items-center justify-center mt-6 group-hover:border-[#c4a882]/60 group-hover:bg-[#c4a882]/10 transition-all duration-500"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <s.icon className="w-6 h-6 text-[#c4a882]" strokeWidth={1.2} />
                      </div>
                    </div>
                    <span className="font-body text-white/30 text-xs tracking-[0.2em] uppercase mt-6">{s.duration}</span>
                  </div>

                  {/* Right: Content */}
                  <div className="p-10 flex flex-col gap-6">
                    <h3
                      className="font-heading text-[#1a1611] group-hover:text-[#c4a882] transition-colors duration-500"
                      style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", lineHeight: 1.1 }}
                    >
                      {s.title}
                    </h3>
                    <p className="font-body text-[#1a1611]/60 text-sm" style={{ fontWeight: 300, lineHeight: 1.9 }}>
                      {s.desc}
                    </p>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {s.deliverables.map((d) => (
                        <div key={d} className="deliverable-item flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#c4a882] mt-1.5 shrink-0" />
                          <span className="font-body text-[#1a1611]/50 text-sm" style={{ fontWeight: 300 }}>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT WE USE (MATERIALS) ===== */}
      <section className="relative py-32 px-6 lg:px-12 bg-[#1a1611] text-white overflow-hidden">
        <WoodGrainPattern id="proc-materials-grain" color="rgba(196,168,130,0.05)" />
        <DiagonalLines id="proc-diag" color="rgba(196,168,130,0.03)" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-white/20" />
                <span className="font-body text-white/40 text-xs tracking-[0.3em] uppercase">What We Use</span>
              </div>
              <h2 className="proc-heading font-heading text-white" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05 }}>
                Materials of <span className="italic text-[#c4a882]">distinction</span>
              </h2>
              <p className="font-body text-white/50 text-sm mt-8" style={{ fontWeight: 300, lineHeight: 1.9 }}>
                Every material we use is selected for longevity, beauty, and authenticity. We work with the same suppliers we've trusted for over a decade — because trust compounds over time, just like good wood.
              </p>
            </div>
            <div className="proc-img overflow-hidden" style={{ clipPath: "inset(0 100% 0 0)" }}>
              <img src={IMG_BLUEPRINT} alt="Design process" className="w-full aspect-[4/3] object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {materials.map((m) => (
              <div
                key={m.name}
                className="material-card group border border-white/10 p-8 hover:border-[#c4a882]/40 hover:bg-[#c4a882]/5 transition-all duration-500"
              >
                <h4 className="font-heading text-white text-xl mb-2 group-hover:text-[#c4a882] transition-colors duration-500">{m.name}</h4>
                <p className="font-body text-white/40 text-sm" style={{ fontWeight: 300, lineHeight: 1.7 }}>{m.desc}</p>
                <div className="mt-5 pt-4 border-t border-white/10">
                  <span className="font-body text-white/25 text-xs tracking-[0.2em] uppercase">{m.origin}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WORKSHOP IMAGE ===== */}
      <section className="relative h-[60vh] overflow-hidden">
        <img src={IMG_WORKSHOP} alt="Our workshop" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#1a1611]/50" />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center px-6">
          <div>
            <p className="font-body text-white/70 text-sm tracking-[0.3em] uppercase mb-4">Our workshop</p>
            <h2 className="font-heading italic text-[#c4a882]" style={{ fontSize: "clamp(2rem, 6vw, 5rem)", lineHeight: 1 }}>
              Where ideas become objects
            </h2>
          </div>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <section className="py-10 bg-[#f5f0eb] border-y border-[#1a1611]/10 overflow-hidden">
        <div className="proc-marquee flex gap-16 whitespace-nowrap">
          {[...Array(2)].map((_, r) => (
            <div key={r} className="flex gap-16 items-center">
              {["Discovery", "Design", "Materials", "Crafting", "Installation", "Handover"].map((t, i) => (
                <div key={i} className="flex items-center gap-16">
                  <span className="font-heading italic text-[#1a1611]/50" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>{t}</span>
                  <span className="w-3 h-3 rotate-45 bg-[#c4a882]" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-32 px-6 lg:px-12 text-center overflow-hidden">
        <GeometricGrid id="proc-cta-grid" color="rgba(26,22,17,0.03)" />
        <div className="relative max-w-3xl mx-auto">
          <h2 className="proc-heading font-heading text-[#1a1611]" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.1 }}>
            Ready to start<br /><span className="italic text-[#c4a882]">step one?</span>
          </h2>
          <p className="font-body text-[#1a1611]/60 mt-6 leading-relaxed">
            The first conversation is free. The design process is transparent. The result is extraordinary.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-[#1a1611] text-white font-body text-xs tracking-[0.3em] uppercase px-10 py-5 mt-12 hover:bg-[#c4a882] hover:text-[#1a1611] transition-all duration-500"
          >
            Book Your Discovery Call <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
