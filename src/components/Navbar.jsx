import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const links = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);

  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const closeMenu = () => setMenuOpen(false);

  const smoothTransition = reduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 380, damping: 30 };

  // Scrolled state + hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);

    if (menuOpen || reduceMotion) {
      setHidden(false);
      return;
    }
    setHidden(latest > previous && latest > 160);
  });

  // Close the mobile menu whenever the page changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock page scroll while the mobile menu is open + close on Escape
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isPathActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -25, opacity: 0 }}
      animate={{ y: hidden ? "-100%" : 0, opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, ease: EASE }}
      className={`sticky top-0 z-50 border-b backdrop-blur-2xl transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || menuOpen
          ? "border-white/[0.08] bg-[#151614]/90 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]"
          : "border-transparent bg-[#151614]/50"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className={`mx-auto flex max-w-[1600px] items-center justify-between px-5 transition-[height] duration-300 sm:px-8 lg:px-12 ${
          scrolled ? "h-[64px]" : "h-[76px]"
        }`}
      >
        {/* Brand */}
        <Link
          to="/"
          onClick={closeMenu}
          className="group relative z-[60] flex shrink-0 items-center gap-2"
          aria-label="Elite Finish home"
        >
          <span className="display-font text-[19px] font-bold tracking-[-0.07em] transition-colors duration-300 group-hover:text-[#D6FF63] sm:text-[22px]">
            ELITE
            <motion.span
              animate={reduceMotion ? undefined : { scale: [1, 1.5, 1] }}
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
          </span>

          <span className="hidden text-[9px] uppercase tracking-[0.22em] text-white/35 xl:block">
            Finishing studio
          </span>
        </Link>

        {/* Desktop navigation */}
        <div
          className="hidden items-center gap-1 lg:flex"
          onMouseLeave={() => setHoveredPath(null)}
        >
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              onMouseEnter={() => setHoveredPath(link.path)}
              onFocus={() => setHoveredPath(link.path)}
              onBlur={() => setHoveredPath(null)}
              className="relative rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#D6FF63]/60"
            >
              {({ isActive }) => (
                <motion.span
                  className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-[12px] transition-colors duration-300 xl:px-4 ${
                    isActive
                      ? "text-[#D6FF63]"
                      : "text-white/60 hover:text-white"
                  }`}
                  whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                >
                  {/* Hover pill: slides between links */}
                  {hoveredPath === link.path && !isActive && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.07]"
                      transition={smoothTransition}
                    />
                  )}

                  {/* Active pill */}
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-background"
                      className="absolute inset-0 rounded-full border border-[#D6FF63]/20 bg-[#D6FF63]/[0.09]"
                      transition={smoothTransition}
                    />
                  )}

                  <span className="relative z-10">{link.name}</span>

                  {isActive && (
                    <motion.span
                      layoutId="active-nav-dot"
                      className="relative z-10 ml-0.5 size-1.5 rounded-full bg-[#D6FF63] shadow-[0_0_8px_#D6FF63]"
                      transition={smoothTransition}
                    />
                  )}
                </motion.span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA */}
        <motion.div
          whileHover={reduceMotion ? undefined : { scale: 1.04 }}
          whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          className="hidden lg:block"
        >
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#D6FF63] py-2.5 pl-5 pr-2.5 text-[12px] font-bold text-[#151614] shadow-[0_0_30px_-10px_rgba(214,255,99,0.7)] transition-colors duration-300 hover:bg-[#e4ff99]"
          >
            {/* shine sweep on hover */}
            <span
              aria-hidden
              className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/50 blur-md transition-transform duration-700 group-hover:translate-x-[520%]"
            />
            <span className="relative">Let's talk</span>
            <span className="relative flex size-8 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={17} />
            </span>
          </Link>
        </motion.div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="relative z-[60] flex size-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-300 hover:border-[#D6FF63] hover:text-[#D6FF63] lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={menuOpen ? "close" : "open"}
              initial={
                reduceMotion ? false : { opacity: 0, rotate: -45, scale: 0.7 }
              }
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={
                reduceMotion
                  ? undefined
                  : { opacity: 0, rotate: 45, scale: 0.7 }
              }
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
              className="flex"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile navigation */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <>
            {/* Dim backdrop: tap to close */}
            <motion.div
              key="mobile-backdrop"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
              onClick={closeMenu}
              aria-hidden
              className="absolute inset-x-0 top-full -z-10 h-screen bg-black/55 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              id="mobile-navigation"
              key="mobile-navigation"
              initial={reduceMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }}
              className="absolute inset-x-0 top-full overflow-hidden border-b border-white/10 bg-[#151614]/[0.98] backdrop-blur-2xl lg:hidden"
            >
              <div className="mx-auto max-h-[calc(100dvh-5rem)] max-w-[1600px] overflow-y-auto px-5 pb-7 pt-5 sm:px-8">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                    Navigate
                  </span>
                  <span className="text-[10px] text-white/40">
                    ELITE FINISH
                  </span>
                </div>

                <div className="flex flex-col">
                  {links.map((link, index) => {
                    const isActive = isPathActive(link.path);

                    return (
                      <motion.div
                        key={link.path}
                        initial={reduceMotion ? false : { opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.45,
                          delay: reduceMotion ? 0 : 0.08 + index * 0.06,
                          ease: EASE,
                        }}
                      >
                        <NavLink
                          to={link.path}
                          end={link.path === "/"}
                          onClick={closeMenu}
                          className={`group relative flex items-center justify-between overflow-hidden border-b py-4 pl-4 pr-1 transition-all duration-300 ${
                            isActive
                              ? "border-[#D6FF63]/30 bg-[#D6FF63]/[0.06] text-[#D6FF63]"
                              : "border-white/[0.08] text-white/75 hover:pl-6 hover:text-white"
                          }`}
                        >
                          {/* active side bar */}
                          {isActive && (
                            <span className="absolute inset-y-0 left-0 w-1 bg-[#D6FF63]" />
                          )}

                          <span className="display-font text-2xl tracking-tight sm:text-3xl">
                            {link.name}
                          </span>

                          <span className="flex items-center gap-3">
                            <span className="text-[10px] text-white/30">
                              0{index + 1}
                            </span>

                            {isActive ? (
                              <span className="size-1.5 rounded-full bg-[#D6FF63] shadow-[0_0_8px_#D6FF63]" />
                            ) : (
                              <ArrowUpRight
                                size={17}
                                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                              />
                            )}
                          </span>
                        </NavLink>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.4,
                    delay: reduceMotion ? 0 : 0.42,
                    ease: EASE,
                  }}
                  className="pt-6"
                >
                  <Link
                    to="/contact"
                    onClick={closeMenu}
                    className="flex w-full items-center justify-between rounded-full bg-[#D6FF63] px-6 py-4 text-sm font-bold text-[#151614] shadow-[0_0_30px_-10px_rgba(214,255,99,0.7)] transition-transform active:scale-[0.98]"
                  >
                    Start a project
                    <ArrowUpRight size={19} />
                  </Link>

                  <p className="mt-4 text-center text-[10px] tracking-wide text-white/35">
                    Residential & commercial finishing
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
