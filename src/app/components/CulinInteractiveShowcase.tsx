import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GeometricGrid, FloatingParticles } from "./SvgPatterns";
import { useMouseParallax } from "./use3DTilt";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { id: 1, title: "Oak Essence", type: "Kitchen", img: "https://images.unsplash.com/photo-1765371515651-faa86f08f0ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3b29kJTIwa2l0Y2hlbiUyMGRlc2lnbnxlbnwxfHx8fDE3NzU2Njc5NTl8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 2, title: "Dark Walnut", type: "Dressing Room", img: "https://images.unsplash.com/photo-1562008088-e8fe0711f7e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjB3YWxrJTIwaW4lMjBjbG9zZXQlMjB3b29kfGVufDF8fHx8MTc3NTY2Nzk1OXww&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 3, title: "Minimalist Ash", type: "Shelving", img: "https://images.unsplash.com/photo-1765277789203-b26f51b78f47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwd29vZGVuJTIwc2hlbHZlcyUyMGRlY29yfGVufDF8fHx8MTc3NTY2Nzk1OXww&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 4, title: "Textured Ebony", type: "Panels", img: "https://images.unsplash.com/photo-1771150539043-9e6bc0cabd56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwcGFuZWxzJTIwdGV4dHVyZSUyMGRhcmt8ZW58MXx8fHwxNzc1NjY3OTU5fDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: 5, title: "Classic Maple", type: "Cabinetry", img: "https://images.unsplash.com/photo-1765371515651-faa86f08f0ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3b29kJTIwa2l0Y2hlbiUyMGRlc2lnbnxlbnwxfHx8fDE3NzU2Njc5NTl8MA&ixlib=rb-4.1.0&q=80&w=1080" },
];

export function CulinInteractiveShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useMouseParallax(0.04);
  const rotationRef = useRef({ val: 0, target: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from(".showcase-title", {
        y: 100,
        opacity: 0,
        rotateX: -45,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });

      // Distribute cards in 3D space
      const cards = gsap.utils.toArray<HTMLDivElement>(".showcase-card");
      const radius = window.innerWidth < 768 ? 200 : 400;
      const angleStep = 360 / cards.length;

      cards.forEach((card, i) => {
        gsap.set(card, {
          rotationY: i * angleStep,
          z: radius,
          transformOrigin: "50% 50% " + -radius + "px",
        });
      });

      // Auto rotation + mouse interaction
      const updateRotation = () => {
        rotationRef.current.val += (rotationRef.current.target - rotationRef.current.val) * 0.05;
        gsap.set(carouselRef.current, {
          rotationY: rotationRef.current.val,
        });
        requestAnimationFrame(updateRotation);
      };
      
      const rafId = requestAnimationFrame(updateRotation);

      return () => cancelAnimationFrame(rafId);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      // Adjust target rotation based on mouse position
      rotationRef.current.target = x * -180; // Max rotation 180deg left or right
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[100vh] bg-[#0f0d0a] overflow-hidden flex flex-col items-center justify-center py-32"
      style={{ perspective: "1500px" }}
    >
      <GeometricGrid id="showcase-grid" color="rgba(196,168,130,0.02)" />
      <FloatingParticles count={30} color="rgba(196,168,130,0.15)" />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 w-full px-6 pointer-events-none">
        <h2 className="showcase-title font-heading text-white text-[clamp(2.5rem,6vw,5rem)] leading-none" style={{ transformStyle: "preserve-3d" }}>
          Explore our <span className="italic text-[#c4a882]">materials</span>
        </h2>
        <p className="showcase-title font-body text-[#c4a882]/60 text-xs tracking-[0.3em] uppercase mt-6">
          Interactive 3D Experience
        </p>
      </div>

      <div ref={parallaxRef} className="relative w-full h-full flex items-center justify-center mt-32" style={{ transformStyle: "preserve-3d" }}>
        <div 
          ref={carouselRef} 
          className="relative w-[280px] h-[400px] md:w-[320px] md:h-[480px]" 
          style={{ transformStyle: "preserve-3d" }}
        >
          {ITEMS.map((item, i) => (
            <div 
              key={item.id} 
              className="showcase-card absolute inset-0 cursor-pointer group"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="w-full h-full rounded-sm overflow-hidden border border-[#c4a882]/20 group-hover:border-[#c4a882]/80 transition-colors duration-500 relative bg-[#1a1611]">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0a] via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="font-body text-[#c4a882] text-[10px] tracking-[0.2em] uppercase block mb-2">{item.type}</span>
                  <h3 className="font-heading text-white text-2xl">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 font-body text-white/30 text-xs tracking-[0.2em] uppercase flex items-center gap-4">
        <div className="w-8 h-[1px] bg-white/30" />
        Move cursor to rotate
        <div className="w-8 h-[1px] bg-white/30" />
      </div>
    </section>
  );
}
