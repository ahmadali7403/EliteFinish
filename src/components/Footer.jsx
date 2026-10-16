import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const footerLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 pb-8 pt-16 md:px-12">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <Link to="/" className="text-2xl font-bold tracking-tight">
            ELITE<span className="text-[#D6FF63]">.</span>FINISH
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-7 text-white/50">
            Refined painting. Thoughtful finishing. Better spaces for
            residential and commercial environments.
          </p>

          <Link
            to="/contact"
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#D6FF63] px-5 py-3 text-sm font-semibold text-black transition hover:scale-105"
          >
            Request a quote <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="md:justify-self-end">
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-white/40">
            Navigate
          </p>

          <div className="flex flex-col gap-4">
            {footerLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="w-fit text-lg text-white/70 transition hover:translate-x-1 hover:text-[#D6FF63]"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Elite Finish.</p>
        <p>Made for spaces that stand out.</p>
      </div>
    </footer>
  );
}
