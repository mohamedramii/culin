const testimonials = [
  {
    quote: "A complete rebuild in five days. The result outperformed everything we'd spent months building before.",
    name: "Sarah Chen",
    role: "CEO, Luminary",
  },
  {
    quote: "Conversions up 4x. That's not a typo. The design just works differently when it's built on real data.",
    name: "Marcus Webb",
    role: "Head of Growth, Arcline",
  },
  {
    quote: "They didn't just design our site. They defined our brand. World-class doesn't begin to cover it.",
    name: "Elena Voss",
    role: "Brand Director, Helix",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="liquid-glass rounded-full px-3.5 py-1 text-xs text-white font-body inline-block mb-6">What They Say</span>
        <h2 className="font-heading italic text-white tracking-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", lineHeight: 0.9 }}>
          Don't take our word for it.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.name} className="liquid-glass rounded-2xl p-8 flex flex-col gap-4">
            <p className="text-white/80 font-body text-sm italic" style={{ fontWeight: 300 }}>"{t.quote}"</p>
            <div>
              <div className="text-white font-body text-sm" style={{ fontWeight: 500 }}>{t.name}</div>
              <div className="text-white/50 font-body text-xs" style={{ fontWeight: 300 }}>{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
