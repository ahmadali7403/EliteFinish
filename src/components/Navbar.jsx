import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `text-sm transition-colors duration-200 hover:text-[#D6FF63] ${
      isActive ? "text-[#D6FF63]" : "text-white/65"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#151614]/90 backdrop-blur-xl">
      <nav className="flex min-h-[76px] items-center justify-between px-6 md:px-12">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="relative z-50 text-xl font-bold tracking-tight"
        >
          ELITE<span className="text-[#D6FF63]">.</span>FINISH
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClass}>
              {link.name}
            </NavLink>
          ))}

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#D6FF63] px-5 py-3 text-sm font-semibold text-black transition hover:scale-105"
          >
            Get a quote <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="relative z-50 rounded-full border border-white/15 p-3 transition hover:border-[#D6FF63] md:hidden"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {/* Mobile navigation panel */}
      <div
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out md:hidden ${
          menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/10 px-6 pb-7 pt-5">
            <div className="flex flex-col">
              {links.map((link, index) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between border-b border-white/[0.07] py-4 text-lg transition ${
                      isActive ? "text-[#D6FF63]" : "text-white/75"
                    }`
                  }
                >
                  <span>{link.name}</span>
                  <span className="text-xs text-white/30">0{index + 1}</span>
                </NavLink>
              ))}
            </div>

            <Link
              to="/contact"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
              className="mt-5 flex items-center justify-between rounded-full bg-[#D6FF63] px-5 py-4 font-semibold text-black"
            >
              Start a project <ArrowUpRight size={19} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
