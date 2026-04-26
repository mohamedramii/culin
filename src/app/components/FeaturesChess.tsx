const rows = [
  {
    title: "Designed to convert. Built to perform.",
    body: "Every pixel is intentional. Our AI studies what works across thousands of top sites—then builds yours to outperform them all.",
    button: "Learn more",
    gif: "https://motionsites.ai/assets/hero-finlytic-preview-CV9g0FHP.gif",
    reverse: false,
  },
  {
    title: "It gets smarter. Automatically.",
    body: "Your site evolves on its own. AI monitors every click, scroll, and conversion—then optimizes in real time. No manual updates. Ever.",
    button: "See how it works",
    gif: "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
    reverse: true,
  },
];

export function FeaturesChess() {
  return (
    <section className="py-24 px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="liquid-glass rounded-full px-3.5 py-1 text-xs text-white font-body inline-block mb-6">Capabilities</span>
        <h2 className="font-heading italic text-white tracking-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", lineHeight: 0.9 }}>
          Pro features. Zero complexity.
        </h2>
      </div>

      <div className="flex flex-col gap-20">
        {rows.map((row, i) => (
          <div
            key={i}
            className={`flex flex-col md:flex-row ${row.reverse ? "md:flex-row-reverse" : ""} items-center gap-12`}
          >
            <div className="flex-1 flex flex-col gap-4">
              <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-tight" style={{ lineHeight: 0.95 }}>
                {row.title}
              </h3>
              <p className="text-white/60 font-body text-sm md:text-base" style={{ fontWeight: 300 }}>
                {row.body}
              </p>
              <button className="liquid-glass-strong rounded-full px-5 py-2.5 text-white font-body text-sm w-fit">
                {row.button}
              </button>
            </div>
            <div className="flex-1 liquid-glass rounded-2xl overflow-hidden">
              <img src={row.gif} alt={row.title} className="w-full h-auto" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
