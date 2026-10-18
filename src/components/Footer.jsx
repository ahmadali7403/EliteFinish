import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUp, ArrowUpRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const footerLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

// Same paint colours used across the site.
const paintColors = [
  "#E6C9A8",
  "#8FBFA8",
  "#C9C6BC",
  "#E39AB4",
  "#7FB2E5",
  "#D6FF63",
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: EASE },
  }),
};

export default function Footer() {
  const reduce = useReducedMotion();

  return (
    <footer className="relative overflow-x-clip border-t border-white/10 bg-[#151614]">
      {/* Thin paint strip: draws in from the left */}
      <div className="flex h-1 w-full">
        {paintColors.map((color, i) => (
          <motion.span
            key={color}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
            className="h-full flex-1 origin-left"
            style={{ background: color }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-6 pt-10 sm:px-10 lg:px-16">
        {/* Main row */}
        <div className="grid gap-8 lg:grid-cols-[1.3fr_auto_auto] lg:items-center lg:gap-12">
          {/* Brand */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <Link
              to="/"
              aria-label="Elite Finish home"
              className="display-font inline-block text-xl font-bold tracking-tight transition-colors hover:text-[#D6FF63]"
            >
              ELITE
              <motion.span
                animate={reduce ? undefined : { scale: [1, 1.5, 1] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block text-[#D6FF63]"
              >
                .
              </motion.span>
              FINISH
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-white/50">
              Refined painting. Thoughtful finishing. Better spaces for
              residential and commercial environments.
            </p>
          </motion.div>

          {/* Links */}
          <motion.nav
            aria-label="Navigate"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:gap-x-7">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group relative inline-block py-1 text-sm text-white/65 outline-none transition-colors hover:text-white focus-visible:text-[#D6FF63]"
                  >
                    {link.name}
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[#D6FF63] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="w-fit"
          >
            <motion.div
              whileHover={reduce ? undefined : { scale: 1.05 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
            >
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[#D6FF63] px-5 py-3 text-sm font-semibold text-black shadow-[0_0_30px_-10px_rgba(214,255,99,0.7)] transition-colors hover:bg-white"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/50 blur-md transition-transform duration-700 group-hover:translate-x-[520%]"
                />
                <span className="relative">Request a quote</span>
                <ArrowUpRight
                  size={16}
                  className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom row */}
        <div className="relative mt-8 flex flex-col gap-4 pt-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="absolute inset-x-0 top-0 h-px origin-left bg-white/10"
          />

          <p>© {new Date().getFullYear()} Elite Finish.</p>

          <div className="flex items-center justify-between gap-4 sm:justify-end sm:gap-5">
            <p className="flex items-center gap-3">
              Made for spaces that stand out.
              {/* Tiny paint chips that hop on hover */}
              <span aria-hidden className="hidden items-center gap-1 sm:flex">
                {paintColors.map((color) => (
                  <motion.span
                    key={color}
                    whileHover={reduce ? undefined : { y: -4, scale: 1.25 }}
                    transition={{ type: "spring", stiffness: 400, damping: 14 }}
                    className="size-2.5 rounded-full"
                    style={{ background: color }}
                  />
                ))}
              </span>
            </p>

            <motion.button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: reduce ? "auto" : "smooth",
                })
              }
              whileHover={reduce ? undefined : { y: -3 }}
              whileTap={reduce ? undefined : { scale: 0.92 }}
              aria-label="Back to top"
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-[#D6FF63] hover:bg-[#D6FF63] hover:text-[#151614]"
            >
              <ArrowUp size={15} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
