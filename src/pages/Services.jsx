import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  animate,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight, Search, CheckCircle2, Paintbrush, X } from "lucide-react";

/* ----------------------------- DATA ----------------------------- */

const ALL = "All Services";
const EASE = [0.22, 1, 0.36, 1];

const serviceCategories = [
  {
    name: ALL,
    description: "Explore our complete painting and finishing solutions.",
  },
  {
    name: "Interior Painting",
    description: "Bring comfort and character to your indoor spaces.",
  },
  {
    name: "Exterior Painting",
    description: "Durable finishes that improve your property's appearance.",
  },
  {
    name: "Surface Preparation",
    description: "A smooth, properly prepared surface for a lasting finish.",
  },
  {
    name: "Decorative Finishes",
    description: "Add texture, detail and personality to your space.",
  },
  {
    name: "Protection & Waterproofing",
    description: "Help protect surfaces against moisture and deterioration.",
  },
  {
    name: "Repainting & Maintenance",
    description: "Refresh worn surfaces and restore their appearance.",
  },
];

// Each category gets its own "paint colour".
const swatchColors = {
  "Interior Painting": "#E6C9A8",
  "Exterior Painting": "#8FBFA8",
  "Surface Preparation": "#C9C6BC",
  "Decorative Finishes": "#E39AB4",
  "Protection & Waterproofing": "#7FB2E5",
  "Repainting & Maintenance": "#D6FF63",
};

const rainbowDot =
  "conic-gradient(#E6C9A8, #8FBFA8, #E39AB4, #7FB2E5, #D6FF63, #E6C9A8)";

const group = (category, names) => names.map((name) => ({ name, category }));

const services = [
  ...group("Interior Painting", [
    "Interior House Painting",
    "Bedroom Painting",
    "Living Room Painting",
    "Ceiling Painting",
    "Door, Frame and Trim Painting",
    "Kitchen Painting",
    "Bathroom Painting",
    "Staircase Painting",
    "Interior Wall Repainting",
  ]),
  ...group("Exterior Painting", [
    "Exterior House Painting",
    "House Front Elevation Painting",
    "Boundary Wall Painting",
    "Gate and Railing Painting",
    "Commercial Exterior Painting",
    "Residential Exterior Painting",
    "Roof Painting",
    "Garage Painting",
    "Exterior Wall Repainting",
  ]),
  ...group("Surface Preparation", [
    "Wall Putty and Surface Preparation",
    "Wall Crack Repair",
    "Wall Sanding and Smoothing",
    "Wall Primer Application",
    "Old Paint Removal",
    "Surface Cleaning and Preparation",
    "Wood Surface Preparation",
    "Metal Surface Preparation",
    "Plaster Repair",
  ]),
  ...group("Decorative Finishes", [
    "Texture Painting",
    "Feature Wall Painting",
    "Decorative Wall Finishes",
    "Wood Painting and Polishing",
    "Metal Painting",
    "Custom Colour Finishes",
    "Accent Wall Painting",
    "Cabinet Painting",
    "Furniture Painting",
  ]),
  ...group("Protection & Waterproofing", [
    "Waterproof Coating",
    "Damp Wall Treatment",
    "Anti-Rust Painting",
    "Exterior Weatherproof Coating",
    "Roof Waterproofing",
    "Protective Surface Coating",
  ]),
  ...group("Repainting & Maintenance", [
    "Complete House Repainting",
    "Rental Property Repainting",
    "Commercial Property Repainting",
  ]),
];

const categoryCounts = Object.fromEntries(
  serviceCategories.map((c) => [
    c.name,
    c.name === ALL
      ? services.length
      : services.filter((s) => s.category === c.name).length,
  ]),
);

const headlineWords = [
  { text: "Every" },
  { text: "surface.", br: true },
  { text: "A", className: "shimmer-text" },
  { text: "better", className: "shimmer-text" },
  { text: "finish.", className: "shimmer-text" },
];

/* --------------------------- HELPERS ---------------------------- */

function Counter({ to, pad = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const format = (n) => String(Math.round(n)).padStart(pad, "0");

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = format(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = format(v);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to, reduce]);

  return <span ref={ref}>{format(0)}</span>;
}

function RevealWords({ words, startDelay = 0 }) {
  return (
    <>
      {words.map(({ text, className = "", br }, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-2 align-bottom">
            <motion.span
              initial={{ y: "115%", rotate: 3 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{
                duration: 0.85,
                delay: startDelay + i * 0.09,
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

function Highlight({ text, query }) {
  if (!query) return text;
  const i = text.toLowerCase().indexOf(query.toLowerCase());
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded bg-[#D6FF63]/25 px-0.5 text-[#D6FF63]">
        {text.slice(i, i + query.length)}
      </mark>
      {text.slice(i + query.length)}
    </>
  );
}

// Paint-chip style service card with a cursor-following glow.
function ServiceCard({ service, index, query }) {
  const color = swatchColors[service.category];
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(280px circle at ${mx}px ${my}px, rgba(214,255,99,0.13), transparent 70%)`;

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  }

  return (
    <motion.article
      layout
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{
        duration: 0.35,
        delay: Math.min(index, 8) * 0.04,
        ease: EASE,
      }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-white/25"
    >
      {/* Paint swatch */}
      <div
        className="relative h-16 overflow-hidden sm:h-[72px]"
        style={{ background: color }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-black/15" />
        <span
          aria-hidden
          className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/30 blur-md transition-transform duration-700 group-hover:translate-x-[420%]"
        />
        <span className="absolute right-4 top-3 text-xs font-semibold tabular-nums text-[#151614]/60">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Glow */}
      <motion.div
        aria-hidden
        style={{ background: glow }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative flex flex-1 flex-col px-5 pb-5 pt-8 sm:px-6 sm:pb-6">
        {/* Icon sits on the swatch edge */}
        <div
          className="absolute -top-5 left-5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-[#151614] transition duration-500 group-hover:-rotate-12 group-hover:scale-110 sm:left-6"
          style={{ color }}
        >
          <Paintbrush size={19} strokeWidth={1.7} />
        </div>

        <p className="text-base font-medium leading-6 text-white/95">
          <Highlight text={service.name} query={query} />
        </p>
        <p className="mt-2 flex items-center gap-2 text-xs text-white/45">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: color }}
          />
          {service.category}
        </p>

        <Link
          to={`/contact?service=${encodeURIComponent(service.name)}`}
          className="mt-6 inline-flex w-fit items-center gap-2 text-sm text-white/65 transition-colors hover:text-[#D6FF63]"
        >
          Enquire about service
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </motion.article>
  );
}

/* ----------------------------- PAGE ----------------------------- */

export default function Services() {
  const reduce = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [search, setSearch] = useState("");
  const query = search.trim();

  const filteredServices = useMemo(() => {
    const q = query.toLowerCase();
    return services.filter((service) => {
      const matchesCategory =
        activeCategory === ALL || service.category === activeCategory;
      return matchesCategory && service.name.toLowerCase().includes(q);
    });
  }, [activeCategory, query]);

  const activeDescription =
    serviceCategories.find((c) => c.name === activeCategory)?.description || "";

  function clearFilters() {
    setSearch("");
    setActiveCategory(ALL);
  }

  // Hero: cursor spotlight
  const hx = useMotionValue(0);
  const hy = useMotionValue(0);
  const heroGlow = useMotionTemplate`radial-gradient(520px circle at ${hx}px ${hy}px, rgba(214,255,99,0.10), transparent 70%)`;
  function onHeroMove(e) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    hx.set(e.clientX - r.left);
    hy.set(e.clientY - r.top);
  }

  // Hero: image parallax
  const imageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["-6%", "6%"],
  );

  return (
    <main className="min-h-screen overflow-x-clip bg-[#151614] text-[#F3F0E8]">
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

      {/* ============================ HERO ============================ */}
      <section
        onMouseMove={onHeroMove}
        className="relative overflow-hidden border-b border-white/10"
      >
        {/* dot grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            WebkitMaskImage:
              "radial-gradient(ellipse at 30% 40%, #000 20%, transparent 75%)",
            maskImage:
              "radial-gradient(ellipse at 30% 40%, #000 20%, transparent 75%)",
          }}
        />
        {/* cursor spotlight */}
        <motion.div
          aria-hidden
          style={{ background: heroGlow }}
          className="pointer-events-none absolute inset-0"
        />
        {/* floating glows */}
        <motion.div
          aria-hidden
          animate={reduce ? undefined : { y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#D6FF63]/10 blur-[100px]"
        />
        <motion.div
          aria-hidden
          animate={reduce ? undefined : { y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#D6FF63]/[0.06] blur-[110px]"
        />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
          {/* Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#D6FF63]"
            >
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                className="h-px w-8 origin-left bg-[#D6FF63]"
              />
              What We Do
            </motion.p>

            <h1 className="max-w-3xl text-[2.6rem] font-semibold leading-[1.06] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.25rem]">
              <RevealWords words={headlineWords} startDelay={0.25} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mt-6 max-w-xl text-base leading-7 text-white/60 sm:text-lg"
            >
              From interior transformations to exterior protection, explore
              painting and finishing services designed around your property.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <motion.a
                href="#service-directory"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 rounded-full bg-[#D6FF63] px-6 py-3.5 text-sm font-semibold text-[#151614] shadow-[0_0_40px_-8px_rgba(214,255,99,0.6)] transition-colors hover:bg-white"
              >
                Explore Services
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </motion.a>

              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex rounded-full border border-white/20 bg-white/[0.03] px-6 py-3.5 text-sm font-medium backdrop-blur transition-colors hover:border-[#D6FF63] hover:text-[#D6FF63]"
                >
                  Get a Quote
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.15 }}
              className="mt-10 grid max-w-lg grid-cols-3 gap-3"
            >
              {[
                {
                  to: services.length,
                  pad: 0,
                  label: "Listed services",
                  accent: true,
                },
                {
                  to: serviceCategories.length - 1,
                  pad: 2,
                  label: "Service categories",
                },
                { to: 1, pad: 2, label: "Clear starting point" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 backdrop-blur transition-colors hover:border-[#D6FF63]/40"
                >
                  <p
                    className={`text-2xl font-semibold sm:text-3xl ${s.accent ? "text-[#D6FF63]" : ""}`}
                  >
                    <Counter to={s.to} pad={s.pad} />
                  </p>
                  <p className="mt-1 text-[11px] leading-4 text-white/50 sm:text-xs">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Arch image */}
          <div
            ref={imageRef}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            {/* outline arch */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="absolute -inset-2 rounded-t-[11rem] rounded-b-[2rem] border border-[#D6FF63]/25 sm:-inset-3 sm:rounded-t-[15rem]"
            />

            {/* Image revealed like a paint roller wipe */}
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 1.3, delay: 0.3, ease: EASE }}
              className="relative h-[380px] overflow-hidden rounded-t-[10rem] rounded-b-3xl sm:h-[500px] sm:rounded-t-[14rem]"
            >
              <motion.img
                src="/public/images//services-hero.jpeg"
                alt="Modern interior with refined wall finishes"
                initial={{ scale: 1.35 }}
                animate={{ scale: 1.15 }}
                transition={{ duration: 2, ease: EASE }}
                style={{ y: imageY }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151614]/70 via-transparent to-transparent" />
            </motion.div>

            {/* Paint chips floating on the left */}
            <div className="absolute -left-1 top-1/3 flex flex-col gap-2 sm:-left-5">
              {["#E6C9A8", "#8FBFA8", "#E39AB4", "#7FB2E5"].map((c, i) => (
                <motion.span
                  key={c}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    reduce
                      ? { opacity: 1, x: 0 }
                      : { opacity: 1, x: 0, y: [0, -6, 0] }
                  }
                  transition={
                    reduce
                      ? { delay: 1.2 + i * 0.1 }
                      : {
                          opacity: { delay: 1.2 + i * 0.1, duration: 0.5 },
                          x: { delay: 1.2 + i * 0.1, duration: 0.5 },
                          y: {
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.4,
                          },
                        }
                  }
                  className="h-9 w-9 rounded-xl border-2 border-[#151614] shadow-lg sm:h-11 sm:w-11"
                  style={{ background: c }}
                />
              ))}
            </div>

            {/* Glass card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -8, 0] }
              }
              transition={
                reduce
                  ? { duration: 0.6, delay: 1.3 }
                  : {
                      opacity: { duration: 0.6, delay: 1.3 },
                      y: {
                        duration: 5,
                        delay: 1.9,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }
              }
              className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/15 bg-[#151614]/75 p-4 backdrop-blur-xl sm:bottom-7 sm:left-8 sm:right-8 sm:p-5"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#D6FF63]">
                The Elite Finish Approach
              </p>
              <p className="mt-2 text-base font-medium sm:text-lg">
                Preparation first. Quality in every detail.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================= DIRECTORY ========================= */}
      <section
        id="service-directory"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 md:py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D6FF63]">
              Service Directory
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
              Find the right service.
            </h2>
            <div className="relative mt-3 min-h-[3rem] max-w-xl">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={activeDescription}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm leading-6 text-white/55"
                >
                  {activeDescription}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full md:max-w-sm">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search painting services..."
              aria-label="Search painting services"
              className="w-full rounded-full border border-white/15 bg-white/[0.04] py-3.5 pl-11 pr-11 text-sm outline-none transition duration-300 placeholder:text-white/35 focus:border-[#D6FF63]/60 focus:shadow-[0_0_0_4px_rgba(214,255,99,0.08)] [&::-webkit-search-cancel-button]:hidden"
            />
            <AnimatePresence>
              {search && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-[#D6FF63] hover:text-[#151614]"
                >
                  <X size={14} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Category chips */}
        <LayoutGroup id="service-chips">
          <div className="mt-8 flex flex-wrap gap-2">
            {serviceCategories.map((category) => {
              const active = activeCategory === category.name;
              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => setActiveCategory(category.name)}
                  className={`relative flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs transition-colors duration-200 sm:text-sm ${
                    active
                      ? "border-transparent font-medium text-[#151614]"
                      : "border-white/15 text-white/65 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="service-active-chip"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                      className="absolute inset-0 rounded-full bg-[#D6FF63]"
                    />
                  )}
                  <span
                    className="relative z-10 h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-black/20"
                    style={{
                      background: swatchColors[category.name] || rainbowDot,
                    }}
                  />
                  <span className="relative z-10">
                    {category.name}{" "}
                    <span className={active ? "opacity-60" : "opacity-40"}>
                      {categoryCounts[category.name]}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <div className="mt-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <p className="text-sm text-white/55" aria-live="polite">
            <span className="inline-block min-w-[1.5ch] font-semibold text-white">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={filteredServices.length}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="inline-block"
                >
                  {filteredServices.length}
                </motion.span>
              </AnimatePresence>
            </span>{" "}
            services found
          </p>

          <AnimatePresence>
            {(search || activeCategory !== ALL) && (
              <motion.button
                type="button"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={clearFilters}
                className="text-sm text-[#D6FF63] hover:text-white"
              >
                Clear filters
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Cards */}
        <motion.div
          layout
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <ServiceCard
                key={service.name}
                service={service}
                index={index}
                query={query}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        <AnimatePresence>
          {filteredServices.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 rounded-2xl border border-white/10 px-5 py-16 text-center"
            >
              <motion.div
                animate={reduce ? undefined : { rotate: [0, -12, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
                className="inline-block"
              >
                <Search className="mx-auto text-white/30" size={30} />
              </motion.div>
              <h3 className="mt-4 text-lg font-medium">No services found</h3>
              <p className="mt-2 text-sm text-white/50">
                Try another keyword or clear your filters.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-full bg-[#D6FF63] px-5 py-2.5 text-sm font-semibold text-[#151614] transition-colors hover:bg-white"
              >
                Show all services
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ======================== PROCESS BANNER ======================== */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#D6FF63]/[0.12] via-white/[0.03] to-transparent p-7 sm:p-12"
        >
          <motion.span
            aria-hidden
            animate={reduce ? undefined : { x: ["-120%", "420%"] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute inset-y-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-[#D6FF63]/[0.08] to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#D6FF63]/15 blur-3xl"
          />

          <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D6FF63]">
                Have a project in mind?
              </p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Let's discuss your space.
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/60">
                Tell us what you need, and we can discuss the next steps for
                your painting project.
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="shrink-0"
            >
              <Link
                to="/contact"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D6FF63] px-7 py-4 text-sm font-semibold text-[#151614] shadow-[0_0_40px_-8px_rgba(214,255,99,0.6)] transition-colors hover:bg-white md:w-auto"
              >
                Discuss Your Project
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ========================== TRUST NOTE ========================== */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto flex max-w-7xl items-start gap-3 px-5 py-10 text-sm leading-6 text-white/45 sm:px-8"
      >
        <CheckCircle2 size={18} className="mt-1 shrink-0 text-[#D6FF63]" />
        <p>
          Every project is different. Final service availability, materials,
          timeline and pricing should be confirmed during your enquiry.
        </p>
      </motion.section>
    </main>
  );
}
