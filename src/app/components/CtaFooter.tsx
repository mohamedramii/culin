import { HlsVideo } from "./HlsVideo";

const HLS_URL = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

export function CtaFooter() {
  return (
    <section className="relative overflow-hidden">
      <HlsVideo src={HLS_URL} className="absolute inset-0 w-full h-full object-cover" />
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: 200, background: "linear-gradient(to bottom, black, transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 200, background: "linear-gradient(to top, black, transparent)" }}
      />

      <div className="relative z-10 text-center flex flex-col items-center px-8 py-24">
        <h2 className="font-heading italic text-white tracking-tight max-w-3xl" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 0.85 }}>
          Your next website starts here.
        </h2>
        <p className="mt-6 text-white/60 font-body text-sm md:text-base max-w-md" style={{ fontWeight: 300 }}>
          Book a free strategy call. See what AI-powered design can do. No commitment, no pressure. Just possibilities.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <button className="liquid-glass-strong rounded-full px-6 py-3 text-white font-body text-sm">
            Book a Call
          </button>
          <button className="bg-white text-black rounded-full px-6 py-3 font-body text-sm hover:bg-white/90 transition-colors">
            View Pricing
          </button>
        </div>

        <footer className="mt-32 pt-8 border-t border-white/10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white/40 text-xs font-body">&copy; 2026 Studio. All rights reserved.</span>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a key={link} href="#" className="text-white/40 text-xs font-body hover:text-white/60 transition-colors">
                {link}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </section>
  );
}
