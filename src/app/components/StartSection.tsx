import { ArrowUpRight } from "lucide-react";
import { HlsVideo } from "./HlsVideo";

const HLS_URL = "https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8";

export function StartSection() {
  return (
    <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
      <HlsVideo src={HLS_URL} className="absolute inset-0 w-full h-full object-cover" />
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: 200, background: "linear-gradient(to bottom, black, transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 200, background: "linear-gradient(to top, black, transparent)" }}
      />

      <div className="relative z-10 text-center flex flex-col items-center gap-6 px-4 py-24">
        <span className="liquid-glass rounded-full px-3.5 py-1 text-xs text-white font-body">How It Works</span>
        <h2 className="font-heading italic text-white tracking-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", lineHeight: 0.9 }}>
          You dream it. We ship it.
        </h2>
        <p className="text-white/60 font-body text-sm md:text-base max-w-lg" style={{ fontWeight: 300 }}>
          Share your vision. Our AI handles the rest—wireframes, design, code, launch. All in days, not quarters.
        </p>
        <button className="liquid-glass-strong rounded-full px-6 py-3 text-white font-body text-sm flex items-center gap-2">
          Get Started <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
