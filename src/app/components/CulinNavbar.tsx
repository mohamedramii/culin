import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";

const links: { label: string; href: string }[] = [
  // { label: "About", href: "/about" },
  // { label: "Services", href: "/services" },
  // { label: "Portfolio", href: "/portfolio" },
  // { label: "Process", href: "/process" },
  // { label: "Contact", href: "/contact" },


  { label: "About", href: "/" },
  { label: "Services", href: "/" },
  { label: "Portfolio", href: "/" },
  { label: "Process", href: "/" },
  { label: "Contact", href: "/" },
];

export function CulinNavbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoRevealed, setLogoRevealed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
    );

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    // Check if splash already revealed the logo (via data attribute)
    const checkRevealed = () => {
      const logoEl = document.getElementById("navbar-logo");
      if (logoEl?.dataset.revealed === "true") {
        setLogoRevealed(true);
      }
    };
    checkRevealed();

    // Safety: reveal logo if splash didn't (e.g. direct URL navigation)
    const logoRevealTimer = setTimeout(() => {
      const logoEl = document.getElementById("navbar-logo");
      if (logoEl && !logoEl.dataset.revealed) {
        logoEl.dataset.revealed = "true";
        setLogoRevealed(true);
      }
    }, 6000);

    // Poll for splash revealing the logo
    const pollInterval = setInterval(checkRevealed, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(logoRevealTimer);
      clearInterval(pollInterval);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#1a1611]/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img id="navbar-logo" src={new URL("../../assets/logo.png", import.meta.url).href} alt="Culin" className="h-12 w-auto" style={{ opacity: logoRevealed ? 1 : 0 }} />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`font-body text-xs tracking-[0.2em] uppercase transition-colors duration-300 relative group ${
                isActive(link.href)
                  ? "text-[#c4a882]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
              {/* Active underline */}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-[#c4a882] transition-all duration-300 ${
                  isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </div>

        <Link
          // to="/contact"
            to="/"

          className="hidden md:block border border-white/20 text-white font-body text-xs tracking-[0.2em] uppercase px-6 py-3 hover:bg-[#c4a882] hover:text-[#1a1611] hover:border-[#c4a882] transition-all duration-500"
        >
          Book Consultation
        </Link>

        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#1a1611] px-6 pb-8 flex flex-col gap-6">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-body text-sm tracking-[0.2em] uppercase transition-colors ${
                isActive(link.href) ? "text-[#c4a882]" : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            // to="/contact"
            to="/"
            onClick={() => setMenuOpen(false)}
            className="border border-white/20 text-white font-body text-xs tracking-[0.2em] uppercase px-6 py-3 w-fit hover:bg-[#c4a882] hover:text-[#1a1611] transition-all duration-500"
          >
            Book Consultation
          </Link>
        </div>
      )}
    </nav>
  );
}
