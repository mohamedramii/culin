import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";
import { OrganicBlobs, DiagonalLines } from "./SvgPatterns";
import { use3DTilt } from "./use3DTilt";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Culin transformed our kitchen into a masterpiece. The attention to detail in every wood grain selection was extraordinary. It's not just a kitchen — it's art.",
    name: "Amira Hassan",
    role: "Homeowner, New Cairo",
  },
  {
    quote: "Our dressing room feels like a five-star boutique. The craftsmanship is unmatched. Friends walk in and think we hired an international firm.",
    name: "Youssef Karim",
    role: "Villa Owner, Sheikh Zayed",
  },
  {
    quote: "From concept to installation, the process was seamless. Culin understood our vision and elevated it beyond what we imagined possible.",
    name: "Layla Mostafa",
    role: "Interior Designer",
  },
];

function TestimonialCard({ t, i }: { t: typeof testimonials[0]; i: number }) {
  const tiltRef = use3DTilt(10);

  return (
    <div
      ref={tiltRef}
      className="testimonial-card border border-white/10 p-8 flex flex-col gap-6 hover:border-[#c4a882]/30 transition-colors duration-500 cursor-hover group"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      <div style={{ transform: "translateZ(20px)" }}>
        <Quote className="w-8 h-8 text-[#c4a882]/30 group-hover:text-[#c4a882]/60 transition-colors duration-500" />
      </div>
      <p className="font-body text-white/60 text-sm italic" style={{ fontWeight: 300, lineHeight: 1.8, transform: "translateZ(15px)" }}>
        "{t.quote}"
      </p>
      <div className="mt-auto pt-6 border-t border-white/10" style={{ transform: "translateZ(10px)" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c4a882] to-[#8a6b4a] flex items-center justify-center text-white font-heading text-sm">
            {t.name.charAt(0)}
          </div>
          <div>
            <div className="font-body text-white text-sm" style={{ fontWeight: 500 }}>{t.name}</div>
            <div className="font-body text-white/30 text-xs mt-0.5">{t.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CulinTestimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Blobs morph
      gsap.to(".blob-testi-blobs", {
        scale: "random(0.7, 1.4)",
        x: "random(-50, 50)",
        y: "random(-50, 50)",
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 1, from: "random" },
      });

      // Diagonal lines flow
      gsap.to(".diag-line-testi-diag", {
        strokeDashoffset: -120,
        duration: 10,
        repeat: -1,
        ease: "none",
      });

      gsap.fromTo(
        ".testimonial-card",
        { y: 60, opacity: 0, scale: 0.92 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out", stagger: 0.2,
          scrollTrigger: { trigger: ".testimonial-card", start: "top 85%" },
        }
      );

      // Quote icon spin on scroll
      gsap.to(".quote-spin", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#1a1611] py-32 px-6 lg:px-12 overflow-hidden">
      {/* SVG Patterns */}
      <OrganicBlobs id="testi-blobs" color="rgba(196,168,130,0.04)" />
      <DiagonalLines id="testi-diag" color="rgba(196,168,130,0.02)" />

      {/* Large decorative quote */}
      <div className="absolute top-16 right-16 opacity-[0.03] pointer-events-none quote-spin">
        <Quote className="w-64 h-64 text-[#c4a882]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-white/20" />
            <span className="font-body text-white/40 text-xs tracking-[0.3em] uppercase">Testimonials</span>
            <div className="w-12 h-px bg-white/20" />
          </div>
          <h2 className="font-heading text-white" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}>
            Voices of <span className="italic text-[#c4a882]">trust</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
