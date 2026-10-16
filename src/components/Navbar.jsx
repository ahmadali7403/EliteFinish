import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  const closeMenu = () => setMenuOpen(false);

  const smoothTransition = reduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 380, damping: 30 };

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: reduceMotion ? 0 : 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#151614]/85 backdrop-blur-2xl"
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        {/* Brand */}
        <Link
          to="/"
          onClick={closeMenu}
          className="group relative z-[60] flex shrink-0 items-center gap-2"
          aria-label="Elite Finish home"
        >
          <span className="display-font text-[19px] font-bold tracking-[-0.07em] transition-colors duration-300 group-hover:text-[#D6FF63] sm:text-[22px]">
            ELITE<span className="text-[#D6FF63]">.</span>FINISH
          </span>

          <span className="hidden text-[9px] uppercase tracking-[0.22em] text-white/35 xl:block">
            Finishing studio
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link, index) => (
            <NavLink key={link.path} to={link.path}>
              {({ isActive }) => (
                <motion.span
                  className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-[12px] transition-colors duration-300 xl:px-4 ${
                    isActive
                      ? "text-[#D6FF63]"
                      : "text-white/60 hover:text-white"
                  }`}
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-background"
                      className="absolute inset-0 rounded-full border border-[#D6FF63]/20 bg-[#D6FF63]/[0.09]"
                      transition={smoothTransition}
                    />
                  )}

                  {/* <span className="relative z-10 text-[9px] text-white/30">
                    0{index + 1}
                  </span> */}

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
        <Link
          to="/contact"
          className="group hidden items-center gap-3 rounded-full bg-[#D6FF63] py-2.5 pl-5 pr-2.5 text-[12px] font-bold text-[#151614] transition-colors duration-300 hover:bg-[#e4ff99] lg:inline-flex"
        >
          Let's talk
          <span className="flex size-8 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight size={17} />
          </span>
        </Link>

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
              transition={{
                duration: reduceMotion ? 0 : 0.18,
              }}
              className="flex"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile navigation panel */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            key="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-x-0 top-full overflow-hidden border-b border-white/10 bg-[#151614]/[0.98] backdrop-blur-2xl lg:hidden"
          >
            <div className="mx-auto max-h-[calc(100dvh-76px)] max-w-[1600px] overflow-y-auto px-5 pb-7 pt-5 sm:px-8">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                  Navigate
                </span>

                <span className="text-[10px] text-white/40">ELITE FINISH</span>
              </div>

              <div className="flex flex-col">
                {links.map((link, index) => {
                  const isActive = location.pathname === link.path;

                  return (
                    <motion.div
                      key={link.path}
                      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.3,
                        delay: reduceMotion ? 0 : index * 0.055,
                      }}
                    >
                      <NavLink
                        to={link.path}
                        onClick={closeMenu}
                        className={`flex items-center justify-between border-b py-4 pl-4 transition-all duration-300 ${
                          isActive
                            ? "border-[#D6FF63]/30 bg-[#D6FF63]/[0.06] text-[#D6FF63]"
                            : "border-white/[0.08] text-white/75 hover:pl-6 hover:text-white"
                        }`}
                      >
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
                            <ArrowUpRight size={17} />
                          )}
                        </span>
                      </NavLink>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.3,
                  delay: reduceMotion ? 0 : 0.25,
                }}
                className="pt-6"
              >
                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className="flex w-full items-center justify-between rounded-full bg-[#D6FF63] px-6 py-4 text-sm font-bold text-[#151614] transition-transform active:scale-[0.98]"
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
        )}
      </AnimatePresence>
    </motion.header>
  );
}
