import { HlsVideo } from "./HlsVideo";

const HLS_URL = "https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8";

const stats = [
  { value: "200+", label: "Sites launched" },
  { value: "98%", label: "Client satisfaction" },
  { value: "3.2x", label: "More conversions" },
  { value: "5 days", label: "Average delivery" },
];

export function Stats() {
  return (
    <section className="relative overflow-hidden py-24">
      <HlsVideo
        src={HLS_URL}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "saturate(0)" }}
      />
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: 200, background: "linear-gradient(to bottom, black, transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 200, background: "linear-gradient(to top, black, transparent)" }}
      />

      <div className="relative z-10 px-8 lg:px-16 max-w-5xl mx-auto">
        <div className="liquid-glass rounded-3xl p-12 md:p-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-heading italic text-white" style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}>
                  {s.value}
                </div>
                <div className="text-white/60 font-body text-sm" style={{ fontWeight: 300 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
