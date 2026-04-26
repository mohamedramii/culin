import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router";
import { ArrowLeft, ArrowUpRight, MapPin, Phone, Mail, Instagram, Linkedin, Send } from "lucide-react";
import { WoodGrainPattern, FloatingParticles, GeometricGrid, TreeRingsSvg } from "../components/SvgPatterns";

gsap.registerPlugin(ScrollTrigger);

type FormState = {
  name: string;
  email: string;
  phone: string;
  project: string;
  budget: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  project: "Kitchen",
  budget: "",
  message: "",
};

const offices = [
  {
    city: "Riyadh",
    address: "Al Olaya District, King Fahd Road",
    phone: "+966 11 234 5678",
    email: "riyadh@culin.sa",
    flag: "🇸🇦",
  },
  {
    city: "Dubai",
    address: "Design District, D3, Block C",
    phone: "+971 4 567 8901",
    email: "dubai@culin.ae",
    flag: "🇦🇪",
  },
  {
    city: "Doha",
    address: "West Bay, Al Corniche Street",
    phone: "+974 4 123 4567",
    email: "doha@culin.qa",
    flag: "🇶🇦",
  },
];

export function ContactPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

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
      gsap.fromTo(".contact-sub", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.8 });

      // Floating particles
      gsap.utils.toArray<SVGCircleElement>(".floating-particle").forEach((p) => {
        const speed = parseFloat(p.getAttribute("data-speed") || "1");
        gsap.to(p, {
          y: `random(-80, 80)`, x: `random(-40, 40)`,
          duration: 4 + speed * 2, repeat: -1, yoyo: true, ease: "sine.inOut",
          delay: Math.random() * 3,
        });
      });

      // Tree ring rotation
      gsap.to(".tree-ring", {
        rotation: "+=360", duration: 50, repeat: -1, ease: "none",
        stagger: { each: 4, from: "center" }, transformOrigin: "center center",
      });

      // Mouse parallax for ring
      const handleMouse = (e: MouseEvent) => {
        if (!ringRef.current) return;
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) * 0.03;
        const dy = (e.clientY - cy) * 0.03;
        gsap.to(ringRef.current, { x: dx, y: dy, duration: 1, ease: "power2.out" });
      };
      window.addEventListener("mousemove", handleMouse);

      // Form entrance
      gsap.fromTo(".form-field",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.08, delay: 1 }
      );

      // Office cards
      gsap.utils.toArray<HTMLElement>(".office-card").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.1,
            scrollTrigger: { trigger: card, start: "top 88%" } }
        );
      });

      // Grid dots
      gsap.to(".svg-dot-contact-grid", {
        opacity: 0.5, duration: 2, repeat: -1, yoyo: true,
        stagger: { each: 0.08, from: "random" }, ease: "sine.inOut",
      });

      // Magnetic buttons
      document.querySelectorAll(".magnetic-contact").forEach((btn) => {
        btn.addEventListener("mousemove", (e: any) => {
          const rect = (btn as HTMLElement).getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: "power2.out" });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.3)" });
        });
      });

      return () => window.removeEventListener("mousemove", handleMouse);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const splitTitle = (text: string) =>
    text.split("").map((ch, i) => (
      <span key={i} className="char inline-block" style={{ whiteSpace: ch === " " ? "pre" : "normal" }}>{ch}</span>
    ));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Animate submit button
    gsap.to(".submit-btn", { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
    setTimeout(() => setSubmitted(true), 300);
  };

  const inputCls = (name: string) =>
    `w-full bg-transparent border-b ${
      focused === name ? "border-[#c4a882]" : "border-white/20"
    } py-4 font-body text-white text-sm placeholder:text-white/30 outline-none transition-colors duration-300`;

  return (
    <div ref={rootRef} className="bg-[#1a1611] text-white">

      {/* ===== HERO + FORM ===== */}
      <section className="relative min-h-screen px-6 lg:px-12 pt-36 pb-24 overflow-hidden">
        <WoodGrainPattern id="contact-grain" color="rgba(196,168,130,0.06)" />
        <FloatingParticles count={25} color="rgba(196,168,130,0.12)" />

        {/* Rotating tree rings bg */}
        <div ref={ringRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-5 pointer-events-none">
          <TreeRingsSvg />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-[#c4a882] font-body text-xs tracking-[0.3em] uppercase mb-12 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back Home
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            {/* Left: Hero text */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-[#c4a882]/50" />
                <span className="contact-sub font-body text-[#c4a882] text-xs tracking-[0.3em] uppercase">Get in Touch</span>
              </div>

              <h1 ref={heroTitleRef} className="font-heading leading-[0.95]" style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}>
                <span className="block overflow-hidden">{splitTitle("Let's craft")}</span>
                <span className="block overflow-hidden italic text-[#c4a882]">{splitTitle("your space")}</span>
              </h1>

              <p className="contact-sub mt-10 max-w-md font-body text-white/50 leading-relaxed text-sm" style={{ fontWeight: 300 }}>
                Whether you have a detailed brief or just an idea on the back of a napkin — we want to hear about it. Book a free consultation and let's see what's possible.
              </p>

              {/* Info blocks */}
              <div className="contact-sub mt-16 flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-[#c4a882]/30 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#c4a882]" />
                  </div>
                  <div>
                    <p className="font-body text-white/40 text-xs tracking-[0.2em] uppercase mb-1">Phone</p>
                    <a href="tel:+966112345678" className="font-body text-white text-sm hover:text-[#c4a882] transition-colors">+966 11 234 5678</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-[#c4a882]/30 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#c4a882]" />
                  </div>
                  <div>
                    <p className="font-body text-white/40 text-xs tracking-[0.2em] uppercase mb-1">Email</p>
                    <a href="mailto:hello@culin.sa" className="font-body text-white text-sm hover:text-[#c4a882] transition-colors">hello@culin.sa</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-[#c4a882]/30 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#c4a882]" />
                  </div>
                  <div>
                    <p className="font-body text-white/40 text-xs tracking-[0.2em] uppercase mb-1">Studio</p>
                    <span className="font-body text-white text-sm">Al Olaya, King Fahd Road, Riyadh</span>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="contact-sub mt-12 flex items-center gap-6">
                <span className="font-body text-white/30 text-xs tracking-[0.2em] uppercase">Follow us</span>
                {[
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:border-[#c4a882] hover:text-[#c4a882] transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:pt-20">
              {submitted ? (
                <div className="border border-[#c4a882]/30 p-12 text-center">
                  <div className="w-16 h-16 border border-[#c4a882]/50 flex items-center justify-center mx-auto mb-8">
                    <Send className="w-6 h-6 text-[#c4a882]" />
                  </div>
                  <h3 className="font-heading text-white text-3xl mb-4">Message received.</h3>
                  <p className="font-body text-white/50 text-sm" style={{ fontWeight: 300, lineHeight: 1.8 }}>
                    Thank you, {form.name || ""}. One of our team will be in touch within one business day.
                  </p>
                  <button
                    onClick={() => { setForm(initialForm); setSubmitted(false); }}
                    className="mt-10 font-body text-xs tracking-[0.2em] uppercase text-[#c4a882] hover:text-white border-b border-[#c4a882]/40 hover:border-white pb-1 transition-all duration-300"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                  <div className="form-field">
                    <label className="font-body text-white/40 text-xs tracking-[0.25em] uppercase mb-2 block">Full Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      required
                      placeholder="Khaled Al-Rashid"
                      className={inputCls("name")}
                    />
                  </div>

                  <div className="form-field grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label className="font-body text-white/40 text-xs tracking-[0.25em] uppercase mb-2 block">Email *</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        required
                        placeholder="hello@example.com"
                        className={inputCls("email")}
                      />
                    </div>
                    <div>
                      <label className="font-body text-white/40 text-xs tracking-[0.25em] uppercase mb-2 block">Phone</label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        onFocus={() => setFocused("phone")}
                        onBlur={() => setFocused(null)}
                        placeholder="+966 5x xxx xxxx"
                        className={inputCls("phone")}
                      />
                    </div>
                  </div>

                  <div className="form-field grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label className="font-body text-white/40 text-xs tracking-[0.25em] uppercase mb-2 block">Project Type *</label>
                      <select
                        name="project"
                        value={form.project}
                        onChange={handleChange}
                        onFocus={() => setFocused("project")}
                        onBlur={() => setFocused(null)}
                        className={inputCls("project") + " cursor-pointer"}
                        style={{ appearance: "none" }}
                      >
                        <option value="Kitchen">Kitchen</option>
                        <option value="Dressing Room">Dressing Room</option>
                        <option value="Custom Millwork">Custom Millwork</option>
                        <option value="Multi-Room">Multi-Room</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-body text-white/40 text-xs tracking-[0.25em] uppercase mb-2 block">Budget Range</label>
                      <select
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        onFocus={() => setFocused("budget")}
                        onBlur={() => setFocused(null)}
                        className={inputCls("budget") + " cursor-pointer"}
                        style={{ appearance: "none" }}
                      >
                        <option value="">Select a range</option>
                        <option value="50-100k SAR">50,000 – 100,000 SAR</option>
                        <option value="100-250k SAR">100,000 – 250,000 SAR</option>
                        <option value="250-500k SAR">250,000 – 500,000 SAR</option>
                        <option value="500k+ SAR">500,000+ SAR</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="font-body text-white/40 text-xs tracking-[0.25em] uppercase mb-2 block">Tell us about your project</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      rows={5}
                      placeholder="Describe your space, style references, and timeline..."
                      className={inputCls("message") + " resize-none"}
                    />
                  </div>

                  <div className="form-field flex items-center justify-between pt-4">
                    <span className="font-body text-white/30 text-xs" style={{ fontWeight: 300 }}>
                      * Required fields. We never share your data.
                    </span>
                    <button
                      type="submit"
                      className="submit-btn magnetic-contact bg-[#c4a882] text-[#1a1611] font-body text-xs tracking-[0.25em] uppercase px-8 py-4 flex items-center gap-3 hover:bg-[#d4b892] transition-colors duration-500"
                    >
                      Send Message <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== OFFICES ===== */}
      <section className="relative py-32 px-6 lg:px-12 bg-[#f5f0eb] text-[#1a1611] overflow-hidden">
        <GeometricGrid id="contact-grid" color="rgba(26,22,17,0.03)" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-[#1a1611]/20" />
              <span className="font-body text-[#1a1611]/40 text-xs tracking-[0.3em] uppercase">Our Studios</span>
              <div className="w-12 h-px bg-[#1a1611]/20" />
            </div>
            <h2 className="font-heading text-[#1a1611]" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05 }}>
              Find us <span className="italic text-[#c4a882]">near you</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((o) => (
              <div
                key={o.city}
                className="office-card group border border-[#1a1611]/10 p-10 hover:border-[#c4a882]/40 hover:bg-[#c4a882]/5 transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{o.flag}</span>
                  <h3 className="font-heading text-[#1a1611] text-2xl group-hover:text-[#c4a882] transition-colors duration-500">{o.city}</h3>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#c4a882] mt-0.5 shrink-0" />
                    <span className="font-body text-[#1a1611]/60 text-sm" style={{ fontWeight: 300 }}>{o.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#c4a882] shrink-0" />
                    <a href={`tel:${o.phone}`} className="font-body text-[#1a1611]/60 text-sm hover:text-[#c4a882] transition-colors" style={{ fontWeight: 300 }}>{o.phone}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#c4a882] shrink-0" />
                    <a href={`mailto:${o.email}`} className="font-body text-[#1a1611]/60 text-sm hover:text-[#c4a882] transition-colors" style={{ fontWeight: 300 }}>{o.email}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER STRIP ===== */}
      <section className="relative py-20 px-6 lg:px-12 bg-[#1a1611] overflow-hidden">
        <WoodGrainPattern id="contact-footer-grain" color="rgba(196,168,130,0.05)" />
        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <Link to="/" className="font-heading italic text-[#c4a882] text-4xl tracking-tight">Culin</Link>
          <p className="font-body text-white/30 text-sm text-center" style={{ fontWeight: 300 }}>
            Crafting bespoke kitchens, dressing rooms &amp; interiors since 2012.
          </p>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 font-body text-xs tracking-[0.25em] uppercase text-white/60 hover:text-[#c4a882] transition-colors"
          >
            View Portfolio <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
