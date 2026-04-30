import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { DiagonalLines, FloatingParticles } from "./SvgPatterns";

gsap.registerPlugin(ScrollTrigger);

const IMG_KITCHEN = "https://images.unsplash.com/photo-1765371515651-faa86f08f0ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBraXRjaGVuJTIwY2FiaW5ldHJ5JTIwd29vZCUyMGRlc2lnbnxlbnwxfHx8fDE3NzczNzE2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_DRESSING = "https://images.unsplash.com/photo-1774301211236-dab64d553241?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2Fsay1pbiUyMGNsb3NldCUyMGRyZXNzaW5nJTIwcm9vbSUyMHdhcmRyb2JlfGVufDF8fHx8MTc3NzM3MTY2MXww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_BATHROOM = "https://images.unsplash.com/photo-1763485956294-407e7388f63b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRocm9vbSUyMHZhbml0eSUyMGNhYmluZXQlMjB3b29kJTIwbHV4dXJ5fGVufDF8fHx8MTc3NzM3MTY2M3ww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_TV = "https://images.unsplash.com/photo-1774301266018-57c0b190ed43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBUViUyMGVudGVydGFpbm1lbnQlMjB1bml0JTIwd29vZCUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzc3MzcxNjU3fDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_DOOR = "https://images.unsplash.com/photo-1664188371127-3a53ce32daaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjB3b29kZW4lMjBkb29yJTIwaW50ZXJpb3IlMjBtb2Rlcm58ZW58MXx8fHwxNzc3MzcxNjU4fDA&ixlib=rb-4.1.0&q=80&w=1080";

const services = [
  { num: "01", title: "Custom Kitchen Designs", desc: "We create bespoke kitchen designs that combine luxury, functionality, and personalized style to fit your unique space — from custom cabinetry to premium countertops.", img: IMG_KITCHEN },
  { num: "02", title: "Dressing Rooms & Storage", desc: "Our custom dressing rooms offer tailored storage solutions that enhance organization and add elegance to your space. Your personal sanctuary, meticulously designed.", img: IMG_DRESSING },
  { num: "03", title: "Custom Bathroom Cabinets", desc: "We provide stylish, practical custom bathroom cabinets designed to optimize space and ensure lasting durability with premium wood finishes.", img: IMG_BATHROOM },
  { num: "04", title: "TV Units & Entertainment Centers", desc: "Our custom TV units and entertainment centers blend modern design with functional storage to enhance your living space with precision and quality.", img: IMG_TV },
  { num: "05", title: "Custom Wooden Doors", desc: "Custom wooden doors and complementary woodwork solutions, designed to match each space with precision and quality — adding character to every entrance.", img: IMG_DOOR },
];

export function CulinServices() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate diagonal lines
      gsap.to(".diag-line-services-diag", {
        strokeDashoffset: -100,
        duration: 8,
        repeat: -1,
        ease: "none",
      });

      // Floating particles
      gsap.utils.toArray<SVGCircleElement>(".floating-particle").forEach((p) => {
        const speed = parseFloat(p.getAttribute("data-speed") || "1");
        gsap.to(p, {
          y: `random(-50, 50)`,
          x: `random(-20, 20)`,
          duration: 3 + speed * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2,
        });
      });

      // Service cards with 3D flip entrance
      gsap.utils.toArray<HTMLElement>(".service-card").forEach((card) => {
        const img = card.querySelector(".service-img-wrap");
        const text = card.querySelector(".service-text");
        const num = card.querySelector(".service-num");
        const line = card.querySelector(".service-line");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 80%" },
        });

        tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.inOut" })
          .fromTo(num, { x: -40, opacity: 0, rotateY: 30 }, { x: 0, opacity: 1, rotateY: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
          .fromTo(img, { scale: 1.3, opacity: 0, rotateY: -10 }, { scale: 1, opacity: 1, rotateY: 0, duration: 1.4, ease: "power3.out" }, "-=0.6")
          .fromTo(text, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.8");
      });

      // Image parallax inside cards
      gsap.utils.toArray<HTMLElement>(".service-parallax-img").forEach((img) => {
        gsap.to(img, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative bg-[#1a1611] py-32 px-6 lg:px-12 overflow-hidden">
      {/* SVG Patterns */}
      <DiagonalLines id="services-diag" color="rgba(196,168,130,0.03)" />
      <FloatingParticles count={15} color="rgba(196,168,130,0.08)" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-white/20" />
          <span className="font-body text-white/40 text-xs tracking-[0.3em] uppercase">What We Do</span>
        </div>
        <h2 className="font-heading text-white mb-20" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}>
          Crafted for <span className="italic text-[#c4a882]">every space</span>
        </h2>

        <div className="flex flex-col gap-0">
          {services.map((s, i) => (
            <div
              key={s.num}
              className={`service-card group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-16 cursor-pointer`}
              style={{ perspective: "1200px" }}
            >
              {/* Animated top border */}
              <div className="service-line absolute top-0 left-0 right-0 h-px bg-white/10 origin-left col-span-full" />

              <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="service-img-wrap overflow-hidden relative">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="service-parallax-img w-full h-[120%] aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Hover overlay with animated border */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-4 border border-[#c4a882]/40" />
                  </div>
                </div>
              </div>

              <div className={`service-text flex flex-col gap-6 ${i % 2 === 1 ? "lg:order-1 lg:pl-12" : "lg:pl-12"}`}>
                <span className="service-num font-heading text-[#c4a882]/30 text-7xl" style={{ transformStyle: "preserve-3d" }}>{s.num}</span>
                <h3 className="font-heading text-white text-4xl md:text-5xl flex items-center gap-4 group-hover:text-[#c4a882] transition-colors duration-500" style={{ lineHeight: 1 }}>
                  {s.title}
                  <ArrowUpRight className="w-6 h-6 text-[#c4a882] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </h3>
                <p className="font-body text-white/50 text-sm max-w-md" style={{ fontWeight: 300, lineHeight: 1.8 }}>{s.desc}</p>
                <button className="font-body text-[#c4a882] text-xs tracking-[0.2em] uppercase flex items-center gap-3 w-fit group/btn">
                  <span className="border-b border-[#c4a882]/30 pb-1 group-hover/btn:border-[#c4a882] transition-colors duration-300">Explore</span>
                </button>
              </div>

              {i === services.length - 1 && <div className="h-px bg-white/10 col-span-full" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}