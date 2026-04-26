import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { WoodGrainPattern, HexagonPattern, FloatingParticles } from "../components/SvgPatterns";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: string;
  title: string;
  category: "Kitchen" | "Dressing" | "Interior";
  year: string;
  location: string;
  img: string;
  description: string;
};

const projects: Project[] = [
  {
    id: "oak-kitchen",
    title: "The Oak Kitchen",
    category: "Kitchen",
    year: "2025",
    location: "Riyadh",
    img: "https://images.unsplash.com/photo-1765371515651-faa86f08f0ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBraXRjaGVuJTIwd29vZCUyMGRlc2lnbnxlbnwxfHx8fDE3NzU2NjY1NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Solid oak cabinetry paired with honed marble — a warm, grounded kitchen.",
  },
  {
    id: "velvet-suite",
    title: "Velvet Suite",
    category: "Dressing",
    year: "2025",
    location: "Jeddah",
    img: "https://images.unsplash.com/photo-1774301211236-dab64d553241?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3YWxrLWluJTIwY2xvc2V0JTIwbHV4dXJ5fGVufDF8fHx8MTc3NTY2NjU0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "A walk-in sanctuary of walnut, brass, and backlit glass.",
  },
  {
    id: "marble-grain",
    title: "Marble & Grain",
    category: "Kitchen",
    year: "2024",
    location: "Dubai",
    img: "https://images.unsplash.com/photo-1768039049614-f3c2bae3f1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBraXRjaGVuJTIwbWFyYmxlJTIwY291bnRlcnRvcHxlbnwxfHx8fDE3NzU2MjQ4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Statement marble island anchored in warm timber architecture.",
  },
  {
    id: "living-space",
    title: "The Living Space",
    category: "Interior",
    year: "2024",
    location: "Doha",
    img: "https://images.unsplash.com/photo-1705321963943-de94bb3f0dd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaW50ZXJpb3IlMjBkZXNpZ24lMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3NTY2NjU0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Minimalist living, tactile surfaces, and hand-built millwork.",
  },
  {
    id: "linen-atelier",
    title: "Linen Atelier",
    category: "Dressing",
    year: "2024",
    location: "Riyadh",
    img: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    description: "Ash veneer island and leather-lined drawers for a quiet luxury feel.",
  },
  {
    id: "terracotta-kitchen",
    title: "Terracotta Kitchen",
    category: "Kitchen",
    year: "2023",
    location: "Muscat",
    img: "https://images.unsplash.com/photo-1556911220-bff31c812dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80",
    description: "Earthy clay tones with reclaimed oak — warmth meets craftsmanship.",
  },
];

const categories = ["All", "Kitchen", "Dressing", "Interior"] as const;

export function PortfolioPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [active, setActive] = useState<Project | null>(null);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Hero intro + scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title split-letters reveal
      const title = heroTitleRef.current;
      if (title) {
        const chars = title.querySelectorAll<HTMLSpanElement>(".char");
        gsap.fromTo(
          chars,
          { yPercent: 120, rotate: 8, opacity: 0 },
          {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.04,
            delay: 0.2,
          }
        );
      }

      gsap.fromTo(
        ".hero-sub",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.9 }
      );

      gsap.fromTo(
        ".filter-pill",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out", delay: 1.1 }
      );

      // Floating hex + particles pulse
      gsap.to(".hex-port-page-hex", {
        opacity: 0.6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.15, from: "random" },
        ease: "sine.inOut",
      });

      // Rotating 3D cube
      gsap.to(cubeRef.current, {
        rotateY: 360,
        duration: 14,
        repeat: -1,
        ease: "none",
      });
      gsap.to(cubeRef.current, {
        rotateX: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      // Stats counter
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = Number(el.dataset.target || "0");
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      // Marquee scroll
      gsap.to(".marquee-track", {
        xPercent: -50,
        duration: 30,
        ease: "none",
        repeat: -1,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Re-animate grid when filter changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".grid-card",
        { y: 60, opacity: 0, rotateX: 10 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
        }
      );

      // Parallax each image
      gsap.utils.toArray<HTMLElement>(".grid-img").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [filter]);

  // Card tilt on mouse move
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 10,
      rotateX: -y * 10,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
    });
    const img = card.querySelector<HTMLElement>(".grid-img-inner");
    if (img) {
      gsap.to(img, { x: x * -20, y: y * -20, duration: 0.6, ease: "power2.out" });
    }
  };

  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "elastic.out(1,0.5)" });
    const img = card.querySelector<HTMLElement>(".grid-img-inner");
    if (img) gsap.to(img, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1,0.5)" });
  };

  // Split title helper
  const splitTitle = (text: string) =>
    text.split("").map((ch, i) => (
      <span key={i} className="char inline-block" style={{ whiteSpace: ch === " " ? "pre" : "normal" }}>
        {ch}
      </span>
    ));

  return (
    <div ref={rootRef} className="bg-[#f5f0eb] text-[#1a1611]">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[100vh] flex items-center px-6 lg:px-12 pt-40 pb-24 overflow-hidden bg-[#1a1611] text-white">
        <WoodGrainPattern id="port-page-grain" color="rgba(196,168,130,0.08)" />
        <FloatingParticles count={24} color="rgba(196,168,130,0.25)" />

        {/* Rotating 3D cube */}
        <div
          className="absolute top-1/2 right-[8%] -translate-y-1/2 hidden lg:block pointer-events-none"
          style={{ perspective: "1200px" }}
        >
          <div
            ref={cubeRef}
            className="relative"
            style={{
              width: 220,
              height: 220,
              transformStyle: "preserve-3d",
            }}
          >
            {[
              { t: "translateZ(110px)" },
              { t: "translateZ(-110px) rotateY(180deg)" },
              { t: "rotateY(90deg) translateZ(110px)" },
              { t: "rotateY(-90deg) translateZ(110px)" },
              { t: "rotateX(90deg) translateZ(110px)" },
              { t: "rotateX(-90deg) translateZ(110px)" },
            ].map((face, i) => (
              <div
                key={i}
                className="absolute inset-0 border border-[#c4a882]/40 bg-[#c4a882]/5 backdrop-blur-sm flex items-center justify-center"
                style={{ transform: face.t }}
              >
                <span className="font-heading italic text-[#c4a882]/80 text-5xl">C</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto w-full">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#c4a882] font-body text-xs tracking-[0.3em] uppercase mb-12 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back Home
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-[#c4a882]/50" />
            <span className="hero-sub font-body text-[#c4a882] text-xs tracking-[0.3em] uppercase">
              Selected Works · 2023—2025
            </span>
          </div>

          <h1
            ref={heroTitleRef}
            className="font-heading leading-[0.95] max-w-5xl"
            style={{ fontSize: "clamp(3rem, 9vw, 9rem)" }}
          >
            <span className="block overflow-hidden">{splitTitle("Our")}</span>
            <span className="block overflow-hidden italic text-[#c4a882]">{splitTitle("Portfolio")}</span>
          </h1>

          <p className="hero-sub mt-10 max-w-xl font-body text-white/60 leading-relaxed">
            A curated archive of kitchens, dressing rooms, and intimate interiors —
            each crafted in solid timber, stone, and patient attention to detail.
          </p>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-3 mt-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`filter-pill font-body text-xs tracking-[0.25em] uppercase px-6 py-3 border transition-all duration-500 ${
                  filter === cat
                    ? "bg-[#c4a882] border-[#c4a882] text-[#1a1611]"
                    : "border-white/20 text-white/70 hover:border-[#c4a882] hover:text-[#c4a882]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GRID ===== */}
      <section className="relative py-32 px-6 lg:px-12 overflow-hidden">
        <HexagonPattern id="port-page-hex" color="rgba(26,22,17,0.035)" />

        <div className="relative max-w-7xl mx-auto">
          <div
            key={filter}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
            style={{ perspective: "1400px" }}
          >
            {filtered.map((p, i) => (
              <div
                key={p.id}
                className="grid-card group cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  marginTop: i % 2 === 1 ? "4rem" : "0",
                }}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                onClick={() => setActive(p)}
              >
                <div className="grid-img relative overflow-hidden aspect-[4/5] bg-[#1a1611]/5">
                  <div className="grid-img-inner absolute inset-[-10%]">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1611]/70 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Number */}
                  <span className="absolute top-6 left-6 font-heading text-white/50 text-sm tracking-[0.3em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Category */}
                  <span className="absolute top-6 right-6 font-body text-white/70 text-xs tracking-[0.25em] uppercase px-3 py-1 border border-white/30 backdrop-blur-sm">
                    {p.category}
                  </span>

                  {/* Animated SVG corner */}
                  <svg className="absolute bottom-6 right-6 w-10 h-10 text-[#c4a882] opacity-0 group-hover:opacity-100 transition-opacity duration-500" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1" className="animate-[spin_8s_linear_infinite]" strokeDasharray="4 4" />
                    <path d="M14 26 L26 14 M18 14 H26 V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                  </svg>

                  {/* Title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3
                      className="font-heading text-white leading-tight group-hover:text-[#c4a882] transition-colors duration-500"
                      style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
                    >
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 font-body text-white/60 text-xs tracking-[0.2em] uppercase">
                      <span>{p.location}</span>
                      <span className="w-1 h-1 rounded-full bg-white/40" />
                      <span>{p.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="relative py-24 px-6 lg:px-12 bg-[#1a1611] text-white overflow-hidden">
        <WoodGrainPattern id="port-stats-grain" color="rgba(196,168,130,0.06)" />
        <div className="relative max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { n: 120, label: "Projects Delivered" },
            { n: 14, label: "Countries" },
            { n: 38, label: "Craftsmen" },
            { n: 12, label: "Years of Craft" },
          ].map((s) => (
            <div key={s.label} className="border-l border-[#c4a882]/30 pl-6">
              <div className="flex items-baseline gap-1">
                <span className="stat-num font-heading text-[#c4a882]" data-target={s.n} style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1 }}>
                  0
                </span>
                <span className="font-heading text-[#c4a882]/60 text-2xl">+</span>
              </div>
              <p className="font-body text-white/50 text-xs tracking-[0.25em] uppercase mt-3">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <section className="py-10 bg-[#f5f0eb] border-y border-[#1a1611]/10 overflow-hidden">
        <div className="marquee-track flex gap-16 whitespace-nowrap">
          {[...Array(2)].map((_, r) => (
            <div key={r} className="flex gap-16 items-center">
              {["Crafted in Oak", "Designed with Soul", "Built to Last", "Timber · Stone · Brass", "Made by Hand"].map((t, i) => (
                <div key={i} className="flex items-center gap-16">
                  <span className="font-heading italic text-[#1a1611]/70" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>{t}</span>
                  <span className="w-3 h-3 rotate-45 bg-[#c4a882]" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-32 px-6 lg:px-12 text-center overflow-hidden">
        <HexagonPattern id="port-cta-hex" color="rgba(26,22,17,0.04)" />
        <div className="relative max-w-3xl mx-auto">
          <h2 className="font-heading" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.1 }}>
            Have a space in <span className="italic text-[#c4a882]">mind?</span>
          </h2>
          <p className="font-body text-[#1a1611]/60 mt-6 leading-relaxed">
            Let's turn it into the next project in this archive.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-3 bg-[#1a1611] text-white font-body text-xs tracking-[0.3em] uppercase px-10 py-5 mt-12 hover:bg-[#c4a882] hover:text-[#1a1611] transition-all duration-500"
          >
            Start a Project <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ===== MODAL ===== */}
      {active && (
        <div
          className="fixed inset-0 z-[60] bg-[#1a1611]/85 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setActive(null)}
        >
          <div
            className="relative bg-[#f5f0eb] max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={active.img} alt={active.title} className="w-full aspect-[16/10] object-cover" />
            <div className="p-8 md:p-12">
              <span className="font-body text-[#c4a882] text-xs tracking-[0.3em] uppercase">
                {active.category} · {active.location} · {active.year}
              </span>
              <h3 className="font-heading mt-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1 }}>
                {active.title}
              </h3>
              <p className="font-body text-[#1a1611]/70 mt-6 leading-relaxed">{active.description}</p>
              <button
                onClick={() => setActive(null)}
                className="mt-10 border border-[#1a1611]/20 font-body text-xs tracking-[0.3em] uppercase px-6 py-3 hover:bg-[#1a1611] hover:text-white transition-all duration-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
