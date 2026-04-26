import { Zap, Palette, BarChart3, Shield } from "lucide-react";

const features = [
  { icon: Zap, title: "Days, Not Months", desc: "Concept to launch at a pace that redefines fast. Because waiting isn't a strategy." },
  { icon: Palette, title: "Obsessively Crafted", desc: "Every detail considered. Every element refined. Design so precise, it feels inevitable." },
  { icon: BarChart3, title: "Built to Convert", desc: "Layouts informed by data. Decisions backed by performance. Results you can measure." },
  { icon: Shield, title: "Secure by Default", desc: "Enterprise-grade protection comes standard. SSL, DDoS mitigation, compliance. All included." },
];

export function FeaturesGrid() {
  return (
    <section className="py-24 px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="liquid-glass rounded-full px-3.5 py-1 text-xs text-white font-body inline-block mb-6">Why Us</span>
        <h2 className="font-heading italic text-white tracking-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", lineHeight: 0.9 }}>
          The difference is everything.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f) => (
          <div key={f.title} className="liquid-glass rounded-2xl p-6 flex flex-col gap-4">
            <div className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center">
              <f.icon className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-white font-body text-sm" style={{ fontWeight: 500 }}>{f.title}</h4>
            <p className="text-white/60 font-body text-sm" style={{ fontWeight: 300 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
