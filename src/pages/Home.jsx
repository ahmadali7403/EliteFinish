import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  animate,
  useInView,
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

/* ------------------------- SMALL HELPERS ------------------------- */

// Thin green bar at the top showing scroll progress.
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

// Counts from 0 to `to` when it enters the screen.
function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = to + suffix;
      return;
    }
    const controls = animate(0, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, reduce]);

  return <span ref={ref}>0{suffix}</span>;
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
                ease: [0.22, 1, 0.36, 1],
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

// TODO: replace with your real numbers.
const stats = [
  { value: 500, suffix: "+", label: "Projects completed" },
  { value: 10, suffix: "+", label: "Years of experience" },
  { value: 45, suffix: "", label: "Services offered" },
  { value: 100, suffix: "%", label: "Focus on finish quality" },
];

const headlineWords = [
  { text: "Make" },
  { text: "room", br: true },
  { text: "for" },
  { text: "better.", className: "text-[#D6FF63]" },
];

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

  return (
    <main className="overflow-x-clip">
      <ScrollProgress />

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative flex min-h-[780px] items-center overflow-hidden px-5 py-24 sm:min-h-[820px] sm:px-10 lg:min-h-[calc(100svh-80px)] lg:px-16"
      >
        {/* Background: slow zoom-out + parallax */}
        <motion.div
          style={{ y: imageY }}
          className="absolute inset-x-0 -top-[10%] h-[120%]"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=90"
            alt="Elegant contemporary living space"
            fetchPriority="high"
            initial={{ scale: 1.18 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#151614]/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#151614] via-[#151614]/75 to-[#151614]/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151614] via-transparent to-[#151614]/20" />
        </motion.div>

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
            <h1 className="display-font text-5xl font-medium leading-[1.04] tracking-[-0.06em] sm:text-7xl lg:text-[100px]">
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
                  className="group inline-flex items-center gap-3 rounded-full bg-[#D6FF63] px-6 py-4 text-sm font-semibold text-[#151614] transition-colors hover:bg-white"
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
            className="mt-20 flex flex-col justify-between gap-6 border-t border-white/20 pt-5 sm:mt-28 sm:flex-row sm:items-end"
          >
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
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 group-hover:border-[#D6FF63]"
              >
                <ArrowDown size={15} />
              </motion.span>
            </a>
          </motion.div>
        </motion.div>

        {/* Floating glass card (desktop only) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.7 }}
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

      {/* INTRO STRIP with animated stats */}
      <section className="border-b border-white/10 px-5 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase tracking-[0.2em] text-white/45"
            >
              A considered approach to every surface
            </motion.p>

            <Link
              to="/about"
              className="group inline-flex items-center gap-2 text-sm text-[#D6FF63]"
            >
              Meet Elite Finish
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-[#D6FF63]/40"
              >
                <div className="display-font text-4xl text-[#D6FF63] sm:text-5xl">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-xs leading-5 text-white/50 sm:text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
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
