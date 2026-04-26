import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { HexagonPattern } from "./SvgPatterns";
import { use3DTilt } from "./use3DTilt";

gsap.registerPlugin(ScrollTrigger);

const DETAILS = [
  {
    title: "Precision Joinery",
    desc: "Every joint is meticulously crafted to ensure longevity and aesthetic perfection.",
    img: "https://images.unsplash.com/photo-1765277789203-b26f51b78f47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwd29vZGVuJTIwc2hlbHZlcyUyMGRlY29yfGVufDF8fHx8MTc3NTY2Nzk1OXww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    title: "Natural Grain",
    desc: "We hand-select each piece of wood to highlight its unique natural patterns.",
    img: "https://images.unsplash.com/photo-1771150539043-9e6bc0cabd56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwcGFuZWxzJTIwdGV4dHVyZSUyMGRhcmt8ZW58MXx8fHwxNzc1NjY3OTU5fDA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

export function CulinDetails3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tiltRef1 = use3DTilt(10);
  const tiltRef2 = use3DTilt(10);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SVG path drawing animation
      gsap.fromTo(".path-line",
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 3,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1
          }
        }
      );

      // Text reveal
      gsap.fromTo(".detail-text",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%"
          }
        }
      );

      // Image reveal
      gsap.fromTo(".detail-img",
        { scale: 0.8, opacity: 0, rotateY: 20 },
        {
          scale: 1, opacity: 1, rotateY: 0, stagger: 0.3, duration: 1.2, ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%"
          }
        }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 bg-[#1a1611] overflow-hidden">
      <HexagonPattern id="details-hex" color="rgba(196,168,130,0.03)" />
      
      {/* Decorative SVG connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ strokeDasharray: 1000 }}>
        <path className="path-line" d="M 0 200 Q 500 50 1000 300 T 2000 100" fill="none" stroke="rgba(196,168,130,0.2)" strokeWidth="1" />
        <path className="path-line" d="M 0 600 Q 600 800 1200 400 T 2000 600" fill="none" stroke="rgba(196,168,130,0.1)" strokeWidth="1" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center mb-24">
          <p className="detail-text font-body text-[#c4a882] text-xs tracking-[0.4em] uppercase mb-4">
            Uncompromising Quality
          </p>
          <h2 className="detail-text font-heading text-white text-[clamp(2.5rem,5vw,4rem)] max-w-2xl" style={{ lineHeight: 1.1 }}>
            It's all in the <span className="italic text-[#c4a882]">details</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {DETAILS.map((detail, idx) => (
            <div 
              key={idx} 
              ref={idx === 0 ? tiltRef1 : tiltRef2}
              className="detail-img relative group cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              <div 
                className="relative overflow-hidden aspect-[4/5] rounded-sm bg-[#0f0d0a] shadow-2xl transition-transform duration-500 group-hover:shadow-[#c4a882]/10"
                style={{ transformStyle: "preserve-3d" }}
              >
                <img 
                  src={detail.img} 
                  alt={detail.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                  style={{ transform: "translateZ(-20px)" }}
                />
                
                {/* 3D floating badge */}
                <div 
                  className="absolute top-8 right-8 w-16 h-16 rounded-full border border-[#c4a882]/40 flex items-center justify-center backdrop-blur-md bg-black/20"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <ArrowUpRight className="text-[#c4a882] w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
                </div>

                <div 
                  className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#0f0d0a] to-transparent"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <div className="w-12 h-px bg-[#c4a882]/60 mb-6" />
                  <h3 className="font-heading text-white text-3xl mb-3">{detail.title}</h3>
                  <p className="font-body text-white/60 text-sm max-w-sm leading-relaxed">
                    {detail.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
