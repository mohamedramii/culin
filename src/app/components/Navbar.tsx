import { ArrowUpRight } from "lucide-react";

const links = ["Home", "Services", "Work", "Process", "Pricing"];

export function Navbar() {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-8 lg:px-16 py-3 flex items-center justify-between">
      <div className="text-white font-heading italic text-2xl tracking-tight">Studio</div>
      <div className="hidden md:flex items-center liquid-glass rounded-full px-1.5 py-1">
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="px-3 py-2 text-sm text-white/90 font-body hover:text-white transition-colors"
          >
            {link}
          </a>
        ))}
        <button className="bg-white text-black rounded-full px-3.5 py-1.5 text-sm font-body flex items-center gap-1 hover:bg-white/90 transition-colors">
          Get Started <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </nav>
  );
}
