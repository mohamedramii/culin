import { ArrowUpRight, Play } from "lucide-react";
import { motion } from "motion/react";
import { BlurText } from "./BlurText";

const HERO_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4";
const partners = ["Stripe", "Vercel", "Linear", "Notion", "Figma"];

export function Hero() {
  return (
    <section className="relative overflow-visible" style={{ height: 1000 }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute left-0 w-full h-auto object-contain z-0"
        style={{ top: "20%" }}
        src={HERO_VIDEO}
      />
      <div className="absolute inset-0 bg-black/5 z-0" />
      <div
        className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none"
        style={{
          height: 300,
          background: "linear-gradient(to bottom, transparent, black)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center" style={{ paddingTop: 150 }}>
        <div className="liquid-glass rounded-full px-1 py-1 flex items-center gap-2 mb-8">
          <span className="bg-white text-black rounded-full px-3 py-1 text-xs font-body" style={{ fontWeight: 600 }}>New</span>
          <span className="text-white text-xs font-body pr-3">Introducing AI-powered web design.</span>
        </div>

        <h1 className="max-w-2xl" style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", lineHeight: 0.8, letterSpacing: "-4px" }}>
          <BlurText
            text="The Website Your Brand Deserves"
            className="font-heading italic text-white justify-center"
            delay={100}
          />
        </h1>

        <motion.p
          className="mt-8 max-w-md text-white font-body text-sm md:text-base"
          style={{ fontWeight: 300, lineHeight: 1.4 }}
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Stunning design. Blazing performance. Built by AI, refined by experts. This is web design, wildly reimagined.
        </motion.p>

        <motion.div
          className="mt-8 flex items-center gap-4"
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <button className="liquid-glass-strong rounded-full px-5 py-2.5 text-white font-body text-sm flex items-center gap-2">
            Get Started <ArrowUpRight className="w-4 h-4" />
          </button>
          <button className="text-white font-body text-sm flex items-center gap-2 hover:text-white/80 transition-colors">
            <Play className="w-4 h-4" fill="white" /> Watch the Film
          </button>
        </motion.div>

        <div className="mt-auto pt-16 pb-8 flex flex-col items-center gap-6">
          <div className="liquid-glass rounded-full px-3.5 py-1 text-xs text-white font-body">
            Trusted by the teams behind
          </div>
          <div className="flex items-center gap-12 md:gap-16 flex-wrap justify-center">
            {partners.map((p) => (
              <span key={p} className="text-2xl md:text-3xl font-heading italic text-white">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
