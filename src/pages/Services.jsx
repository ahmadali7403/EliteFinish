import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  animate,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight, Search, CheckCircle2, Paintbrush, X } from "lucide-react";

/* ----------------------------- DATA ----------------------------- */

const ALL = "All Services";

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
  { text: "A", className: "text-[#D6FF63]" },
  { text: "better", className: "text-[#D6FF63]" },
  { text: "finish.", className: "text-[#D6FF63]" },
];

const EASE = [0.22, 1, 0.36, 1];

/* --------------------------- HELPERS ---------------------------- */

// Counts up from 0 when it scrolls into view.
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

// Slides each word up from behind a mask.
function RevealWords({ words, startDelay = 0 }) {
  return (
    <>
      {words.map(({ text, className = "", br }, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-1 align-bottom">
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

// Highlights the matching part of a search.
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
      const matchesSearch = service.name.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, query]);

  const activeDescription =
    serviceCategories.find((c) => c.name === activeCategory)?.description || "";

  function clearFilters() {
    setSearch("");
    setActiveCategory(ALL);
  }

  // Parallax for the hero image
  const imageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["-8%", "8%"],
  );

  return (
    <main className="min-h-screen overflow-x-clip bg-[#151614] text-[#F3F0E8]">
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden border-b border-white/10">
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

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
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

            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
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
                className="group inline-flex items-center gap-2 rounded-full bg-[#D6FF63] px-6 py-3.5 text-sm font-semibold text-[#151614] transition-colors hover:bg-white"
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
                  className="inline-flex rounded-full border border-white/20 px-6 py-3.5 text-sm font-medium transition-colors hover:border-[#D6FF63] hover:text-[#D6FF63]"
                >
                  Get a Quote
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.15 }}
              className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 sm:flex sm:flex-wrap sm:gap-x-10"
            >
              <div>
                <p className="text-2xl font-semibold text-[#D6FF63] sm:text-3xl">
                  <Counter to={services.length} />
                </p>
                <p className="mt-1 text-xs text-white/50">Listed services</p>
              </div>
              <div>
                <p className="text-2xl font-semibold sm:text-3xl">
                  <Counter to={serviceCategories.length - 1} pad={2} />
                </p>
                <p className="mt-1 text-xs text-white/50">Service categories</p>
              </div>
              <div>
                <p className="text-2xl font-semibold sm:text-3xl">
                  <Counter to={1} pad={2} />
                </p>
                <p className="mt-1 text-xs text-white/50">
                  Clear starting point
                </p>
              </div>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            className="relative"
          >
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="absolute -inset-2 rounded-[2rem] border border-[#D6FF63]/20 sm:-inset-3"
            />
            <div className="relative h-[320px] overflow-hidden rounded-[1.5rem] sm:h-[440px]">
              <motion.img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=85"
                alt="Modern interior with refined wall finishes"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1.08 }}
                transition={{ duration: 2, ease: EASE }}
                style={{ y: imageY }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -8, 0] }
              }
              transition={
                reduce
                  ? { duration: 0.6, delay: 1.2 }
                  : {
                      opacity: { duration: 0.6, delay: 1.2 },
                      y: {
                        duration: 5,
                        delay: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }
              }
              className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/15 bg-[#151614]/80 p-4 backdrop-blur-xl sm:bottom-7 sm:left-7 sm:right-7 sm:p-5"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#D6FF63]">
                The Elite Finish Approach
              </p>
              <p className="mt-2 text-base font-medium sm:text-lg">
                Preparation first. Quality in every detail.
              </p>
            </motion.div>
          </motion.div>
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
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Find the right service.
            </h2>

            {/* Description changes smoothly with the category */}
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

        {/* Category chips: wrap on small screens, sliding active pill */}
        <LayoutGroup id="service-chips">
          <div className="mt-8 flex flex-wrap gap-2">
            {serviceCategories.map((category) => {
              const active = activeCategory === category.name;
              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => setActiveCategory(category.name)}
                  className={`relative rounded-full border px-4 py-2.5 text-xs transition-colors duration-200 sm:text-sm ${
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

        {/* Service cards */}
        <motion.div
          layout
          className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.article
                layout
                key={service.name}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{
                  duration: 0.3,
                  delay: Math.min(index, 8) * 0.035,
                }}
                whileHover={{ y: -5 }}
                className="group relative flex min-h-40 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition-colors duration-300 hover:border-[#D6FF63]/40 hover:bg-white/[0.05] sm:p-6"
              >
                {/* hover glow */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#D6FF63]/0 blur-2xl transition-colors duration-500 group-hover:bg-[#D6FF63]/15"
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#D6FF63] transition duration-500 group-hover:-rotate-12 group-hover:scale-110 group-hover:border-[#D6FF63]/40">
                    <Paintbrush size={19} strokeWidth={1.6} />
                  </div>
                  <span className="text-xs tabular-nums text-white/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative mt-7">
                  <p className="text-base font-medium leading-6 transition-colors group-hover:text-[#D6FF63]">
                    <Highlight text={service.name} query={query} />
                  </p>
                  <p className="mt-2 text-xs text-white/40">
                    {service.category}
                  </p>
                </div>

                <Link
                  to={`/contact?service=${encodeURIComponent(service.name)}`}
                  className="relative mt-5 inline-flex w-fit items-center gap-2 text-sm text-white/65 transition-colors hover:text-[#D6FF63]"
                >
                  Enquire about service
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </motion.article>
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
      <section className="relative overflow-hidden border-y border-white/10 bg-white/[0.025]">
        <motion.span
          aria-hidden
          animate={reduce ? undefined : { x: ["-120%", "420%"] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute inset-y-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-[#D6FF63]/[0.06] to-transparent"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
          className="relative mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D6FF63]">
              Have a project in mind?
            </p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              Let's discuss your space.
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/55">
              Tell us what you need, and we can discuss the next steps for your
              painting project.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="shrink-0"
          >
            <Link
              to="/contact"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D6FF63] px-6 py-3.5 text-sm font-semibold text-[#151614] transition-colors hover:bg-white md:w-auto"
            >
              Discuss Your Project
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ========================== TRUST NOTE ========================== */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto flex max-w-7xl items-start gap-3 px-5 py-8 text-sm leading-6 text-white/45 sm:px-8"
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
