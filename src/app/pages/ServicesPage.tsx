import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router";
import { ArrowLeft, ArrowUpRight, ChevronDown } from "lucide-react";
import { WoodGrainPattern, DiagonalLines, FloatingParticles, HexagonPattern } from "../components/SvgPatterns";

gsap.registerPlugin(ScrollTrigger);

const IMG_KITCHEN = "https://images.unsplash.com/photo-1771371282665-545256b20dca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBraXRjaGVuJTIwaW50ZXJpb3IlMjBuYXR1cmFsJTIwd29vZCUyMGNhYmluZXRyeXxlbnwxfHx8fDE3NzcwNDM5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_DRESSING = "https://images.unsplash.com/photo-1774301211236-dab64d553241?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YWxrLWluJTIwY2xvc2V0JTIwZHJlc3NpbmclMjByb29tJTIwd2FyZHJvYmV8ZW58MXx8fHwxNzc3MDQzOTgwfDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_MILLWORK = "https://images.unsplash.com/photo-1680704249080-16c1f8cba335?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBidWlsdC1pbiUyMHNoZWx2aW5nJTIwbWlsbHdvcmslMjBiZXNwb2tlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc3MDQzOTg0fDA&ixlib=rb-4.1.0&q=80&w=1080";

const services = [
  {
    num: "01",
    title: "Bespoke Kitchens",
    subtitle: "The heart of every home",
    img: IMG_KITCHEN,
    desc: "We design and build kitchens that are as functional as they are beautiful. From custom cabinetry in solid hardwood to precision-cut stone countertops, every element is conceived for your lifestyle. Our kitchens don't just look good — they work flawlessly, day after day.",
    features: [
      "Solid oak, walnut & ash cabinetry",
      "Custom stone & quartz worktops",
      "Integrated appliance solutions",
      "Hand-finished hardware in brass or matte black",
      "Built-in lighting systems",
      "Full 3D visualisation before build",
    ],
    color: "#c4a882",
  },
  {
    num: "02",
    title: "Dressing Rooms",
    subtitle: "Your personal sanctuary",
    img: IMG_DRESSING,
    desc: "A dressing room should be a daily ritual — not a chore. We design walk-in wardrobes and fitted rooms that organise beautifully, feel luxurious, and reflect your personal aesthetic. Backlit displays, velvet-lined drawers, mirrored panels — every detail considered.",
    features: [
      "Custom hanging & folding systems",
      "Backlit display shelving",
      "Velvet-lined drawer inserts",
      "Island with stone or leather top",
      "Integrated mirrors & vanity",
      "Scent & humidity control options",
    ],
    color: "#a08060",
  },
  {
    num: "03",
    title: "Custom Millwork",
    subtitle: "Architecture in wood",
    img: IMG_MILLWORK,
    desc: "Beyond kitchens and closets — we craft bespoke built-ins, wall panelling, architectural shelving, vanity units, and statement furniture pieces. If it can be made from timber, we can make it extraordinary.",
    features: [
      "Built-in bookshelves & libraries",
      "Wall cladding & panelling",
      "Freestanding statement furniture",
      "Bathroom vanity units",
      "Architectural archways & columns",
      "Outdoor timber structures",
    ],
    color: "#8a6a4a",
  },
];

const faqs = [
  { q: "How long does a project take?", a: "A standard kitchen project takes 10–16 weeks from design sign-off to installation. Dressing rooms typically run 8–12 weeks. Complex multi-room projects are scheduled individually." },
  { q: "Do you work outside Saudi Arabia?", a: "Yes. We have completed projects across the UAE, Qatar, Kuwait, Bahrain, Jordan, and internationally. Our team travels for full-service delivery." },
  { q: "What woods do you use?", a: "Our primary timbers are solid European oak, American walnut, and natural ash. We also work with reclaimed woods, teak, and exotic veneers on request." },
  { q: "Can I see my design before you build?", a: "Absolutely. Every project includes full photorealistic 3D renders and, for larger projects, a physical material sample board." },
  { q: "What's included in your service fee?", a: "Design, 3D visualisation, technical drawings, project management, crafting, delivery, and installation are all included. No hidden fees." },
];

export function ServicesPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      gsap.fromTo(".srv-hero-sub", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.9 });

      // Diagonal lines animation
      gsap.to(".diag-line-srv-page-diag", {
        strokeDashoffset: -100,
        duration: 8,
        repeat: -1,
        ease: "none",
      });

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

      // Service blocks
      gsap.utils.toArray<HTMLElement>(".service-block").forEach((block, i) => {
        const img = block.querySelector(".srv-img");
        const text = block.querySelector(".srv-text");
        const line = block.querySelector(".srv-line");

        const tl = gsap.timeline({ scrollTrigger: { trigger: block, start: "top 80%" } });
        tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.inOut" })
          .fromTo(img, { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }, "-=0.5")
          .fromTo(text, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.8");
      });

      // Feature items
      gsap.utils.toArray<HTMLElement>(".feature-item").forEach((item) => {
        gsap.fromTo(item,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 90%" } }
        );
      });

      // FAQ
      gsap.utils.toArray<HTMLElement>(".faq-item").forEach((item) => {
        gsap.fromTo(item,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 90%" } }
        );
      });

      // Marquee
      gsap.to(".srv-marquee-track", { xPercent: -50, duration: 30, ease: "none", repeat: -1 });

      // Section headings
      gsap.utils.toArray<HTMLElement>(".srv-heading").forEach((h) => {
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
        <WoodGrainPattern id="srv-page-grain" color="rgba(196,168,130,0.07)" />
        <FloatingParticles count={20} color="rgba(196,168,130,0.15)" />

        {/* SVG decorative rings */}
        <div className="absolute top-1/2 right-[6%] -translate-y-1/2 hidden lg:block pointer-events-none opacity-20">
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
            <circle cx="150" cy="150" r="140" stroke="#c4a882" strokeWidth="0.5" strokeDasharray="6 6" className="animate-[spin_30s_linear_infinite]" style={{ transformOrigin: "150px 150px" }} />
            <circle cx="150" cy="150" r="100" stroke="#c4a882" strokeWidth="0.5" strokeDasharray="4 8" className="animate-[spin_20s_linear_infinite_reverse]" style={{ transformOrigin: "150px 150px" }} />
            <circle cx="150" cy="150" r="60" stroke="#c4a882" strokeWidth="1" strokeDasharray="2 6" className="animate-[spin_12s_linear_infinite]" style={{ transformOrigin: "150px 150px" }} />
            <circle cx="150" cy="150" r="8" fill="#c4a882" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto w-full">
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-[#c4a882] font-body text-xs tracking-[0.3em] uppercase mb-12 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back Home
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-[#c4a882]/50" />
            <span className="srv-hero-sub font-body text-[#c4a882] text-xs tracking-[0.3em] uppercase">What We Create</span>
          </div>

          <h1 ref={heroTitleRef} className="font-heading leading-[0.95] max-w-5xl" style={{ fontSize: "clamp(3rem, 9vw, 9rem)" }}>
            <span className="block overflow-hidden">{splitTitle("Crafted")}</span>
            <span className="block overflow-hidden italic text-[#c4a882]">{splitTitle("for living")}</span>
          </h1>

          <p className="srv-hero-sub mt-10 max-w-xl font-body text-white/60 leading-relaxed">
            Three core disciplines. Endless possibilities. Every project custom-made to fit your space, your life, your taste.
          </p>

          {/* Service anchors */}
          <div className="flex flex-wrap gap-4 mt-14">
            {services.map((s) => (
              <a
                key={s.num}
                href={`#service-${s.num}`}
                className="srv-hero-sub font-body text-xs tracking-[0.2em] uppercase px-6 py-3 border border-white/20 text-white/70 hover:border-[#c4a882] hover:text-[#c4a882] transition-all duration-400"
              >
                {s.num} — {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="relative py-12 px-6 lg:px-12 overflow-hidden">
        <DiagonalLines id="srv-page-diag" color="rgba(26,22,17,0.03)" />

        <div className="relative max-w-7xl mx-auto">
          {services.map((s, i) => (
            <div
              key={s.num}
              id={`service-${s.num}`}
              className="service-block relative py-24 scroll-mt-24"
            >
              {/* Top border line */}
              <div className="srv-line absolute top-0 left-0 right-0 h-px bg-[#1a1611]/10 origin-left" />

              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center`} style={{ perspective: "1200px" }}>

                {/* Image */}
                <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="srv-img overflow-hidden relative group">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-4 border border-[#c4a882]/40" />
                    </div>
                    {/* Number badge */}
                    <span
                      className="absolute top-6 left-6 font-heading text-8xl"
                      style={{ color: "rgba(255,255,255,0.08)", lineHeight: 1 }}
                    >
                      {s.num}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className={`srv-text flex flex-col gap-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div>
                    <span className="font-body text-[#c4a882] text-xs tracking-[0.3em] uppercase">{s.subtitle}</span>
                    <h2
                      className="srv-heading font-heading text-[#1a1611] mt-3"
                      style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05 }}
                    >
                      {s.title}
                    </h2>
                  </div>

                  <p className="font-body text-[#1a1611]/60 text-sm" style={{ fontWeight: 300, lineHeight: 1.9 }}>
                    {s.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {s.features.map((f) => (
                      <div key={f} className="feature-item flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c4a882] mt-2 shrink-0" />
                        <span className="font-body text-[#1a1611]/60 text-sm" style={{ fontWeight: 300 }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-3 bg-[#1a1611] text-white font-body text-xs tracking-[0.25em] uppercase px-8 py-4 mt-4 w-fit hover:bg-[#c4a882] hover:text-[#1a1611] transition-all duration-500"
                  >
                    Start a Project <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Bottom border for last item */}
              {i === services.length - 1 && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-[#1a1611]/10" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <section className="py-10 bg-[#1a1611] border-y border-white/10 overflow-hidden">
        <div className="srv-marquee-track flex gap-16 whitespace-nowrap">
          {[...Array(2)].map((_, r) => (
            <div key={r} className="flex gap-16 items-center">
              {["Kitchens", "Dressing Rooms", "Custom Millwork", "Solid Hardwood", "Handcrafted"].map((t, i) => (
                <div key={i} className="flex items-center gap-16">
                  <span className="font-heading italic text-white/50" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>{t}</span>
                  <span className="w-3 h-3 rotate-45 bg-[#c4a882]" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="relative py-32 px-6 lg:px-12 bg-[#1a1611] text-white overflow-hidden">
        <WoodGrainPattern id="srv-faq-grain" color="rgba(196,168,130,0.05)" />
        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-white/20" />
              <span className="font-body text-white/40 text-xs tracking-[0.3em] uppercase">FAQ</span>
              <div className="w-12 h-px bg-white/20" />
            </div>
            <h2 className="srv-heading font-heading text-white" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05 }}>
              Questions <span className="italic text-[#c4a882]">answered</span>
            </h2>
          </div>

          <div className="flex flex-col">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item border-t border-white/10">
                <button
                  className="w-full flex items-center justify-between py-7 text-left gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-heading text-white text-xl" style={{ lineHeight: 1.2 }}>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#c4a882] shrink-0 transition-transform duration-400 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{ maxHeight: openFaq === i ? "300px" : "0px" }}
                >
                  <p className="font-body text-white/50 text-sm pb-7" style={{ fontWeight: 300, lineHeight: 1.85 }}>{faq.a}</p>
                </div>
              </div>
            ))}
            <div className="border-t border-white/10" />
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-32 px-6 lg:px-12 text-center overflow-hidden">
        <HexagonPattern id="srv-cta-hex" color="rgba(26,22,17,0.04)" />
        <div className="relative max-w-3xl mx-auto">
          <h2 className="srv-heading font-heading text-[#1a1611]" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.1 }}>
            Have a space in <span className="italic text-[#c4a882]">mind?</span>
          </h2>
          <p className="font-body text-[#1a1611]/60 mt-6 leading-relaxed">
            Book a free consultation and tell us about your project. We'll take it from there.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-[#1a1611] text-white font-body text-xs tracking-[0.3em] uppercase px-10 py-5 mt-12 hover:bg-[#c4a882] hover:text-[#1a1611] transition-all duration-500"
          >
            Book a Consultation <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
