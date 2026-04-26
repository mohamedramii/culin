import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { WoodGrainPattern, OrganicBlobs, GeometricGrid, FloatingParticles } from "../components/SvgPatterns";

gsap.registerPlugin(ScrollTrigger);

const IMG_WORKSHOP = "https://images.unsplash.com/photo-1761544775659-aaa6fa2e5b3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwd29ya3Nob3AlMjBjcmFmdHNtYW4lMjBhcnRpc2FuJTIwam9pbmVyeXxlbnwxfHx8fDE3NzcwNDM5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_STUDIO = "https://images.unsplash.com/photo-1656646424826-c50ece5d75ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmlvciUyMGRlc2lnbiUyMHN0dWRpbyUyMG9mZmljZSUyMGVsZWdhbnR8ZW58MXx8fHwxNzc3MDQzOTgxfDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_WOOD = "https://images.unsplash.com/photo-1776260700036-d3f9dfebacc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwZ3JhaW4lMjB0ZXh0dXJlJTIwY2xvc2UtdXAlMjBtYXRlcmlhbCUyMG5hdHVyYWx8ZW58MXx8fHwxNzc3MDQzOTg1fDA&ixlib=rb-4.1.0&q=80&w=1080";

const team = [
  { name: "Khaled Al-Rashid", role: "Founder & Creative Director", since: "2012" },
  { name: "Lina Moradi", role: "Head of Design", since: "2015" },
  { name: "Tariq Mansour", role: "Master Craftsman", since: "2013" },
  { name: "Sara Al-Hamdan", role: "Client Experience Lead", since: "2018" },
];

const values = [
  { num: "01", title: "Authenticity", desc: "Every piece of wood we select is chosen for its natural character. No veneers, no shortcuts — only the real thing." },
  { num: "02", title: "Precision", desc: "Tolerances measured in fractions of a millimeter. Because the difference between good and extraordinary lives in the details." },
  { num: "03", title: "Longevity", desc: "We design for decades, not seasons. Sustainable materials, joinery that endures, finishes that age gracefully." },
  { num: "04", title: "Partnership", desc: "Your space is an extension of you. We listen first, design second — ensuring every line resonates with your life." },
];

const timeline = [
  { year: "2012", event: "Culin founded in Riyadh with a small workshop and a bold vision." },
  { year: "2015", event: "Expanded to Dubai, launching our signature dressing room collection." },
  { year: "2018", event: "Opened our flagship design studio, welcoming clients into our world." },
  { year: "2021", event: "Recognized internationally — projects spanning 14 countries." },
  { year: "2024", event: "Launched our timber sourcing program, ensuring fully traceable wood." },
  { year: "2025", event: "500+ projects delivered. The journey continues." },
];

export function AboutPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title reveal
      const chars = heroTitleRef.current?.querySelectorAll<HTMLSpanElement>(".char") ?? [];
      if (chars.length) {
        gsap.fromTo(chars,
          { yPercent: 120, rotate: 8, opacity: 0 },
          { yPercent: 0, rotate: 0, opacity: 1, duration: 1.1, ease: "power4.out", stagger: 0.04, delay: 0.2 }
        );
      }

      gsap.fromTo(".about-hero-sub", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.9 });

      // Rotating 3D cube
      gsap.to(cubeRef.current, { rotateY: 360, duration: 14, repeat: -1, ease: "none" });
      gsap.to(cubeRef.current, { rotateX: 360, duration: 20, repeat: -1, ease: "none" });

      // Blob morph
      gsap.to(".blob-about-page-blobs", {
        scale: "random(0.8, 1.3)",
        x: "random(-40, 40)",
        y: "random(-40, 40)",
        duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut",
        stagger: { each: 1.5, from: "random" },
      });

      // Values cards entrance
      gsap.utils.toArray<HTMLElement>(".value-card").forEach((card) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0, rotateX: 10 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" } }
        );
      });

      // Timeline items
      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item, i) => {
        gsap.fromTo(item,
          { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 85%" } }
        );
      });

      // Timeline line draw
      gsap.fromTo(".timeline-line",
        { scaleY: 0 },
        { scaleY: 1, duration: 2, ease: "none",
          scrollTrigger: { trigger: ".timeline-line", start: "top 80%", end: "bottom 80%", scrub: 1 } }
      );

      // Image reveals
      gsap.fromTo(".about-img-reveal",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power3.inOut",
          scrollTrigger: { trigger: ".about-img-reveal", start: "top 80%" } }
      );

      // Section headings
      gsap.utils.toArray<HTMLElement>(".section-heading").forEach((h) => {
        gsap.fromTo(h,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: h, start: "top 85%" } }
        );
      });

      // Team cards
      gsap.utils.toArray<HTMLElement>(".team-card").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.1,
            scrollTrigger: { trigger: card, start: "top 90%" } }
        );
      });

      // Counter animation
      gsap.utils.toArray<HTMLElement>(".about-stat-num").forEach((el) => {
        const target = Number(el.dataset.target ?? 0);
        gsap.fromTo({ val: 0 },
          { val: 0 },
          {
            val: target, duration: 2, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
            onUpdate: function () { el.textContent = Math.floor(this.targets()[0].val) + (el.dataset.suffix ?? ""); },
          }
        );
        gsap.fromTo(el, { innerText: 0 } as any,
          {
            innerText: target, duration: 2, ease: "power2.out", snap: { innerText: 1 },
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      // Marquee
      gsap.to(".about-marquee-track", { xPercent: -50, duration: 28, ease: "none", repeat: -1 });

      // Decorative lines
      gsap.fromTo(".deco-line-h",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power3.inOut",
          scrollTrigger: { trigger: ".deco-line-h", start: "top 90%" } }
      );
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
        <WoodGrainPattern id="about-page-grain" color="rgba(196,168,130,0.07)" />
        <FloatingParticles count={20} color="rgba(196,168,130,0.2)" />

        {/* Rotating 3D Cube */}
        <div className="absolute top-1/2 right-[8%] -translate-y-1/2 hidden lg:block pointer-events-none" style={{ perspective: "1200px" }}>
          <div ref={cubeRef} className="relative" style={{ width: 200, height: 200, transformStyle: "preserve-3d" }}>
            {[
              { t: "translateZ(100px)" },
              { t: "translateZ(-100px) rotateY(180deg)" },
              { t: "rotateY(90deg) translateZ(100px)" },
              { t: "rotateY(-90deg) translateZ(100px)" },
              { t: "rotateX(90deg) translateZ(100px)" },
              { t: "rotateX(-90deg) translateZ(100px)" },
            ].map((face, i) => (
              <div
                key={i}
                className="absolute inset-0 border border-[#c4a882]/40 bg-[#c4a882]/5 backdrop-blur-sm flex items-center justify-center"
                style={{ transform: face.t }}
              >
                <span className="font-heading italic text-[#c4a882]/80 text-4xl">C</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto w-full">
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-[#c4a882] font-body text-xs tracking-[0.3em] uppercase mb-12 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back Home
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <div className="deco-line-h w-12 h-px bg-[#c4a882]/50 origin-left" />
            <span className="about-hero-sub font-body text-[#c4a882] text-xs tracking-[0.3em] uppercase">Our Story · Since 2012</span>
          </div>

          <h1 ref={heroTitleRef} className="font-heading leading-[0.95] max-w-5xl" style={{ fontSize: "clamp(3rem, 9vw, 9rem)" }}>
            <span className="block overflow-hidden">{splitTitle("Crafted")}</span>
            <span className="block overflow-hidden italic text-[#c4a882]">{splitTitle("with soul")}</span>
          </h1>

          <p className="about-hero-sub mt-10 max-w-xl font-body text-white/60 leading-relaxed">
            Culin was born from an obsession with natural materials and the belief that a beautifully designed space changes how you feel every single day.
          </p>
        </div>
      </section>

      {/* ===== STORY ===== */}
      <section className="relative py-32 px-6 lg:px-12 overflow-hidden">
        <OrganicBlobs id="about-page-blobs" color="rgba(196,168,130,0.05)" />
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="deco-line-h w-12 h-px bg-[#1a1611]/30 origin-left" />
                <span className="font-body text-[#1a1611]/50 text-xs tracking-[0.3em] uppercase">The Beginning</span>
              </div>
              <h2 className="section-heading font-heading text-[#1a1611] mb-8" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05 }}>
                Where nature<br /><span className="italic text-[#c4a882]">meets architecture</span>
              </h2>
              <div className="space-y-5 font-body text-[#1a1611]/60" style={{ fontWeight: 300, lineHeight: 1.9, fontSize: "0.95rem" }}>
                <p>
                  Culin began in 2012 in a small Riyadh workshop. Founder Khaled Al-Rashid had a simple but audacious idea: that kitchens and dressing rooms deserved the same attention to craft as fine furniture — solid joinery, honest materials, enduring beauty.
                </p>
                <p>
                  Over thirteen years, that workshop has grown into a studio of designers, craftsmen, and material specialists who collectively share one conviction: spaces should be alive with intention, every surface a deliberate choice.
                </p>
                <p>
                  Today, Culin works across the GCC and beyond — but the philosophy hasn't changed. Wood is our first language. Precision is our practice. Your satisfaction is our only measure.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="about-img-reveal overflow-hidden" style={{ clipPath: "inset(0 100% 0 0)" }}>
                <img src={IMG_WORKSHOP} alt="Culin Workshop" className="w-full aspect-[4/3] object-cover" />
              </div>
              <div className="absolute -bottom-10 -left-8 w-[55%] overflow-hidden shadow-2xl border-4 border-[#f5f0eb]">
                <img src={IMG_WOOD} alt="Wood texture" className="w-full aspect-square object-cover" />
              </div>
              <div className="absolute -top-6 -right-6 w-20 h-20 border border-[#c4a882]/40" />
              <div className="absolute bottom-20 -right-4 w-10 h-10 bg-[#c4a882]/20" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="relative py-24 px-6 lg:px-12 bg-[#1a1611] text-white overflow-hidden">
        <WoodGrainPattern id="about-stats-grain" color="rgba(196,168,130,0.05)" />
        <div className="relative max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { n: 13, suffix: "+", label: "Years of Craft" },
            { n: 500, suffix: "+", label: "Projects Delivered" },
            { n: 14, suffix: "", label: "Countries" },
            { n: 38, suffix: "", label: "Master Craftsmen" },
          ].map((s) => (
            <div key={s.label} className="border-l border-[#c4a882]/30 pl-6">
              <div className="flex items-baseline gap-1">
                <span
                  className="about-stat-num font-heading text-[#c4a882]"
                  data-target={s.n}
                  data-suffix={s.suffix}
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1 }}
                >
                  0
                </span>
                <span className="font-heading text-[#c4a882]/60 text-2xl">{s.suffix}</span>
              </div>
              <p className="font-body text-white/50 text-xs tracking-[0.25em] uppercase mt-3">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="relative py-32 px-6 lg:px-12 overflow-hidden">
        <GeometricGrid id="about-values-grid" color="rgba(26,22,17,0.03)" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-[#1a1611]/20" />
              <span className="font-body text-[#1a1611]/40 text-xs tracking-[0.3em] uppercase">What Drives Us</span>
              <div className="w-12 h-px bg-[#1a1611]/20" />
            </div>
            <h2 className="section-heading font-heading text-[#1a1611]" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05 }}>
              Our <span className="italic text-[#c4a882]">values</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <div
                key={v.num}
                className="value-card group border border-[#1a1611]/10 p-10 hover:border-[#c4a882]/40 hover:bg-[#c4a882]/5 transition-all duration-500 cursor-default"
                style={{ perspective: "800px" }}
              >
                <span className="font-heading text-[#c4a882]/30 text-5xl">{v.num}</span>
                <h3 className="font-heading text-[#1a1611] text-3xl mt-4 mb-4 group-hover:text-[#c4a882] transition-colors duration-500" style={{ lineHeight: 1.1 }}>
                  {v.title}
                </h3>
                <p className="font-body text-[#1a1611]/60 text-sm" style={{ fontWeight: 300, lineHeight: 1.85 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className="relative py-32 px-6 lg:px-12 bg-[#1a1611] text-white overflow-hidden">
        <WoodGrainPattern id="about-timeline-grain" color="rgba(196,168,130,0.05)" />
        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-white/20" />
              <span className="font-body text-white/40 text-xs tracking-[0.3em] uppercase">Our Journey</span>
              <div className="w-12 h-px bg-white/20" />
            </div>
            <h2 className="section-heading font-heading text-white" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05 }}>
              A decade of <span className="italic text-[#c4a882]">milestones</span>
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
            <div className="timeline-line absolute left-1/2 top-0 bottom-0 w-px bg-[#c4a882] -translate-x-1/2 origin-top" />

            <div className="flex flex-col gap-16">
              {timeline.map((t, i) => (
                <div
                  key={t.year}
                  className={`timeline-item relative flex items-center gap-8 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <span className="font-heading text-[#c4a882] text-sm tracking-[0.3em]">{t.year}</span>
                    <p className="font-body text-white/60 text-sm mt-2" style={{ fontWeight: 300, lineHeight: 1.8 }}>{t.event}</p>
                  </div>
                  {/* Dot */}
                  <div className="relative z-10 w-4 h-4 rounded-full bg-[#c4a882] border-2 border-[#1a1611] shrink-0" />
                  {/* Empty side */}
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="relative py-32 px-6 lg:px-12 overflow-hidden">
        <OrganicBlobs id="about-team-blobs" color="rgba(196,168,130,0.04)" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-[#1a1611]/20" />
              <span className="font-body text-[#1a1611]/40 text-xs tracking-[0.3em] uppercase">The People</span>
              <div className="w-12 h-px bg-[#1a1611]/20" />
            </div>
            <h2 className="section-heading font-heading text-[#1a1611]" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05 }}>
              Minds behind the <span className="italic text-[#c4a882]">craft</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="team-card group cursor-default">
                <div className="aspect-[3/4] bg-[#1a1611]/5 relative overflow-hidden mb-6">
                  <img src={IMG_STUDIO} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1611]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute bottom-4 right-4 font-body text-white/80 text-xs tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Since {member.since}
                  </span>
                </div>
                <h3 className="font-heading text-[#1a1611] text-xl group-hover:text-[#c4a882] transition-colors duration-500" style={{ lineHeight: 1.2 }}>{member.name}</h3>
                <p className="font-body text-[#1a1611]/50 text-xs tracking-[0.15em] uppercase mt-2">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <section className="py-10 bg-[#1a1611] border-y border-white/10 overflow-hidden">
        <div className="about-marquee-track flex gap-16 whitespace-nowrap">
          {[...Array(2)].map((_, r) => (
            <div key={r} className="flex gap-16 items-center">
              {["Crafted in Oak", "Designed with Soul", "Built to Last", "Timber · Stone · Brass", "Made by Hand"].map((t, i) => (
                <div key={i} className="flex items-center gap-16">
                  <span className="font-heading italic text-white/50" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>{t}</span>
                  <span className="w-3 h-3 rotate-45 bg-[#c4a882]" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-32 px-6 lg:px-12 text-center overflow-hidden">
        <GeometricGrid id="about-cta-grid" color="rgba(26,22,17,0.04)" />
        <div className="relative max-w-3xl mx-auto">
          <h2 className="section-heading font-heading text-[#1a1611]" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.1 }}>
            Ready to begin your <span className="italic text-[#c4a882]">story?</span>
          </h2>
          <p className="font-body text-[#1a1611]/60 mt-6 leading-relaxed">
            Every great space starts with a conversation. Let's have ours.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-[#1a1611] text-white font-body text-xs tracking-[0.3em] uppercase px-10 py-5 mt-12 hover:bg-[#c4a882] hover:text-[#1a1611] transition-all duration-500"
          >
            Get in Touch <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
