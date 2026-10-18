import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowUpRight, MoveUpRight } from "lucide-react";

import ServicesSection from "../components/home/ServicesSection";

import {
  WhyChooseUs,
  ProjectPreview,
  ProcessSection,
  FAQSection,
  FinalCTA,
} from "../components/home/HomeSections";

const EASE = [0.22, 1, 0.36, 1];

/* ------------------------- SMALL HELPERS ------------------------- */

// Thin lime bar at the top showing scroll progress.
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[#D6FF63]"
    />
  );
}

// Pulls its child gently toward the cursor.
function Magnetic({ children, strength = 0.3 }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });

  function onMove(e) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

// Slides each word up from behind a mask.
function RevealWords({ words, startDelay = 0 }) {
  return (
    <>
      {words.map(({ text, className = "", br }, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-2 align-bottom">
            <motion.span
              initial={{ y: "115%", rotate: 4 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{
                duration: 0.9,
                delay: startDelay + i * 0.1,
                ease: EASE,
              }}
              className={`inline-block ${className}`}
            >
              {text}&nbsp;
            </motion.span>
          </span>
          {br && <br />}
        </span>
      ))}
    </>
  );
}

/* ----------------------------- DATA ----------------------------- */

const headlineWords = [
  { text: "Make" },
  { text: "room", br: true },
  { text: "for" },
  { text: "better.", className: "shimmer-text" },
];

const paintChips = ["#E6C9A8", "#8FBFA8", "#E39AB4", "#7FB2E5"];

/* ------------------------------ PAGE ----------------------------- */

export default function Home() {
  const reduce = useReducedMotion();
  const heroRef = useRef(null);

  // Parallax: image moves slower than the page, text fades on exit.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", reduce ? "0%" : "22%"],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", reduce ? "0%" : "-12%"],
  );
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Cursor spotlight
  const sx = useMotionValue(0);
  const sy = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgba(214,255,99,0.10), transparent 70%)`;
  function onHeroMove(e) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    sx.set(e.clientX - r.left);
    sy.set(e.clientY - r.top);
  }

  return (
    <main className="overflow-x-clip">
      <style>{`
        @keyframes shimmer-move { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        .shimmer-text {
          background-image: linear-gradient(90deg, #D6FF63 0%, #F4FFD0 25%, #D6FF63 50%, #B7E83F 75%, #D6FF63 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer-move 5s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) { .shimmer-text { animation: none; } }
      `}</style>

      <ScrollProgress />

      {/* HERO */}
      <section
        ref={heroRef}
        onMouseMove={onHeroMove}
        className="relative flex min-h-[780px] items-center overflow-hidden px-5 py-24 sm:min-h-[820px] sm:px-10 lg:min-h-[calc(100svh-80px)] lg:px-16"
      >
        {/* Background image: revealed like a paint-roller wipe, then parallax */}
        <motion.div
          style={{ y: imageY }}
          className="absolute inset-x-0 -top-[10%] h-[120%]"
        >
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.4, ease: EASE }}
            className="absolute inset-0"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=90"
              alt="Elegant contemporary living space"
              fetchPriority="high"
              initial={{ scale: 1.25 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.4, ease: EASE }}
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[#151614]/55" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#151614] via-[#151614]/75 to-[#151614]/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151614] via-transparent to-[#151614]/20" />
          </motion.div>
        </motion.div>

        {/* Dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            WebkitMaskImage:
              "radial-gradient(ellipse at 25% 45%, #000 15%, transparent 70%)",
            maskImage:
              "radial-gradient(ellipse at 25% 45%, #000 15%, transparent 70%)",
          }}
        />

        {/* Cursor spotlight */}
        <motion.div
          aria-hidden
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0"
        />

        {/* Floating glow */}
        <motion.div
          aria-hidden
          animate={reduce ? undefined : { y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[#D6FF63]/[0.08] blur-[110px]"
        />

        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 mx-auto w-full max-w-7xl"
        >
          <div className="max-w-5xl">
            {/* Tag pill */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D6FF63] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D6FF63]" />
              </span>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/80 sm:text-[13px]">
                Painting · Finishing · Transformation
              </p>
            </motion.div>

            {/* Headline */}
            <h1 className="display-font text-[2.9rem] font-medium leading-[1.04] tracking-[-0.06em] sm:text-7xl lg:text-[100px]">
              <RevealWords words={headlineWords} startDelay={0.3} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8"
            >
              Thoughtful painting and refined finishes for spaces that deserve a
              fresh perspective.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <Magnetic>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#D6FF63] px-6 py-4 text-sm font-semibold text-[#151614] shadow-[0_0_40px_-8px_rgba(214,255,99,0.6)] transition-colors hover:bg-white"
                >
                  Discuss your project
                  <ArrowUpRight
                    size={18}
                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </Link>
              </Magnetic>

              <Magnetic>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/[0.04] px-6 py-4 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-[#D6FF63] hover:text-[#D6FF63]"
                >
                  Discover our services
                </Link>
              </Magnetic>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="relative mt-20 flex flex-col justify-between gap-6 pt-5 sm:mt-28 sm:flex-row sm:items-end"
          >
            {/* line draws from left */}
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 1.3, ease: EASE }}
              className="absolute inset-x-0 top-0 h-px origin-left bg-white/20"
            />

            <p className="max-w-xs text-xs leading-6 text-white/55 sm:text-sm">
              The right finish changes more than a room.
              <br />
              It changes how the space feels.
            </p>

            <a
              href="#services"
              className="group flex w-fit items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:text-[#D6FF63]"
            >
              Scroll to explore
              <motion.span
                animate={reduce ? undefined : { y: [0, 6, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 transition-colors group-hover:border-[#D6FF63]"
              >
                <ArrowDown size={15} />
              </motion.span>
            </a>
          </motion.div>
        </motion.div>

        {/* Floating paint chips (desktop only, decorative) */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-10 top-[26%] hidden flex-col gap-3 xl:flex"
        >
          {paintChips.map((c, i) => (
            <motion.span
              key={c}
              initial={{ opacity: 0, x: 30 }}
              animate={
                reduce
                  ? { opacity: 1, x: 0 }
                  : { opacity: 1, x: 0, y: [0, -7, 0] }
              }
              transition={
                reduce
                  ? { delay: 1.4 + i * 0.1 }
                  : {
                      opacity: { delay: 1.4 + i * 0.1, duration: 0.5 },
                      x: { delay: 1.4 + i * 0.1, duration: 0.5 },
                      y: {
                        duration: 4 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.4,
                      },
                    }
              }
              className="h-12 w-12 rounded-2xl border-2 border-white/20 shadow-xl"
              style={{ background: c }}
            />
          ))}
        </div>

        {/* Floating glass card (desktop only) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.7 }}
          className="pointer-events-none absolute bottom-28 right-10 hidden xl:block"
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-3 rounded-2xl border border-white/15 bg-black/20 p-4 backdrop-blur-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D6FF63] text-[#151614]">
              <MoveUpRight size={19} />
            </div>
            <div>
              <p className="text-sm font-medium">Your space, reimagined.</p>
              <p className="mt-1 text-xs text-white/50">
                Start with a conversation
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* INTRO STRIP */}
      <section className="relative px-5 py-8 sm:px-10 lg:px-16">
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-white/10"
        />

        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-xs uppercase tracking-[0.2em] text-white/45"
          >
            A considered approach to every surface
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="w-fit"
          >
            <Link
              to="/about"
              className="group relative inline-flex items-center gap-2 pb-1 text-sm text-[#D6FF63]"
            >
              Meet Elite Finish
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#D6FF63] transition-transform duration-500 group-hover:scale-x-100" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ALL HOME SECTIONS */}
      <ServicesSection />
      <WhyChooseUs />
      <ProjectPreview />
      <ProcessSection />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}
