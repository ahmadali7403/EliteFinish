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
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Droplets,
  House,
  Layers3,
  Paintbrush,
  Search,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";

/* ----------------------------- DATA ----------------------------- */

const EASE = [0.22, 1, 0.36, 1];

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
    "Color Consultation",
  ]),
  ...group("Exterior Painting", [
    "Exterior House Painting",
    "House Front Elevation Painting",
    "Boundary Wall Painting",
    "Gate and Railing Painting",
    "Fence Painting",
    "Garage Painting",
    "Commercial Property Painting",
    "Rental Property Painting",
    "New House Painting",
  ]),
  ...group("Surface Preparation", [
    "Wall Putty and Surface Preparation",
    "Wall Crack Repair",
    "Wall Sanding and Smoothing",
    "Wall Primer Application",
    "Old Paint Removal",
    "Wallpaper Removal and Wall Repainting",
    "POP and Plaster Painting",
    "Pressure Washing Before Painting",
    "Paint Removal and Restoration",
  ]),
  ...group("Decorative Finishes", [
    "Texture Painting",
    "Feature Wall Painting",
    "Luxury and Decorative Wall Finishes",
    "Custom Wall Design Painting",
    "Wood Painting and Polishing",
    "Metal Painting",
    "Enamel Painting",
    "Spray Painting",
    "Floor Coating and Painting",
  ]),
  ...group("Protection & Waterproofing", [
    "Wall Waterproofing",
    "Roof and Terrace Waterproofing",
    "Damp Proofing and Damp Wall Treatment",
    "Heat-Resistant Roof Coating",
    "Anti-Rust Painting",
    "Anti-Fungal Wall Coating",
  ]),
  ...group("Repainting & Refresh", [
    "House Repainting",
    "Paint Touch-Up Services",
    "Old House Renovation Painting",
  ]),
];

// Each category gets its own "paint colour".
const swatchColors = {
  "Interior Painting": "#E6C9A8",
  "Exterior Painting": "#8FBFA8",
  "Surface Preparation": "#C9C6BC",
  "Decorative Finishes": "#E39AB4",
  "Protection & Waterproofing": "#7FB2E5",
  "Repainting & Refresh": "#D6FF63",
};

const rainbowDot =
  "conic-gradient(#E6C9A8, #8FBFA8, #E39AB4, #7FB2E5, #D6FF63, #E6C9A8)";

const categories = [
  {
    name: "Interior Painting",
    description: "Refresh rooms, ceilings and interior surfaces.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=850&q=85",
    icon: House,
  },
  {
    name: "Exterior Painting",
    description: "Give exterior walls and property surfaces a fresh look.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=850&q=85",
    icon: Paintbrush,
  },
  {
    name: "Surface Preparation",
    description: "Prepare, repair and smooth surfaces before painting.",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=850&q=85",
    icon: Wrench,
  },
  {
    name: "Decorative Finishes",
    description: "Explore feature walls and specialist finishes.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=850&q=85",
    icon: Sparkles,
  },
  {
    name: "Protection & Waterproofing",
    description: "Options for damp treatment and protective coatings.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=850&q=85",
    icon: Droplets,
  },
  {
    name: "Repainting & Refresh",
    description: "Touch-ups, repainting and property refreshes.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=850&q=85",
    icon: Layers3,
  },
].map((c) => ({
  ...c,
  count: services.filter((s) => s.category === c.name).length,
}));

const ALL = "All Services";
const filters = [ALL, ...categories.map((c) => c.name)];
const PREVIEW_COUNT = 12;

const headlineWords = [
  { text: "Every" },
  { text: "surface.", br: true },
  { text: "A", className: "shimmer-text" },
  { text: "better", className: "shimmer-text" },
  { text: "finish.", className: "shimmer-text" },
];

/* --------------------------- HELPERS ---------------------------- */

// Marquee component added here
function Marquee({ reduce }) {
  const items = useMemo(() => services.map((s) => s.name), []);
  const row = [...items, ...items];
  return (
    <div className="relative mt-16 overflow-hidden border-y border-white/10 py-4 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap text-sm text-white/45"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 70, ease: "linear", repeat: Infinity }}
      >
        {row.map((name, i) => (
          <span key={i} className="flex items-center gap-10">
            {name}
            <span className="h-1.5 w-1.5 rounded-full bg-[#D6FF63]/60" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Counts up from 0 when scrolled into view.
function Counter({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = to;
      return;
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v);
      },
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return <span ref={ref}>0</span>;
}

// Slides each word up from behind a mask.
function RevealWords({ words, startDelay = 0 }) {
  return (
    <>
      {words.map(({ text, className = "", br }, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-2 align-bottom">
            <motion.span
              initial={{ y: "115%", rotate: 3 }}
              whileInView={{ y: 0, rotate: 0 }}
              viewport={{ once: true }}
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

// Wraps matching text in a highlighted <mark>.
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

// Big category card: 3D tilt + spotlight + paint-colour bar.
function CategoryCard({ category, index, onSelect, reduce }) {
  const Icon = category.icon;
  const color = swatchColors[category.name];
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [7, -7]), {
    stiffness: 180,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-7, 7]), {
    stiffness: 180,
    damping: 18,
  });
  const spotlight = useTransform(
    [x, y],
    ([px, py]) =>
      `radial-gradient(380px circle at ${px * 100}% ${py * 100}%, rgba(214,255,99,0.2), transparent 60%)`,
  );

  function handleMove(e) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  }
  function handleLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(category.name)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: EASE }}
      style={
        reduce ? undefined : { rotateX, rotateY, transformPerspective: 900 }
      }
      whileTap={{ scale: 0.98 }}
      className="group relative min-h-[300px] overflow-hidden rounded-2xl border border-white/10 text-left sm:min-h-[340px]"
    >
      <img
        src={category.image}
        alt={`${category.name} visual reference`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition duration-[900ms] ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#10110F] via-[#151614]/50 to-[#151614]/5 transition duration-500 group-hover:via-[#151614]/30" />
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Paint colour bar: grows on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1.5 origin-left scale-x-[0.28] transition-transform duration-500 ease-out group-hover:scale-x-100"
        style={{ background: color }}
      />

      <span className="absolute right-5 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-md transition duration-300 group-hover:rotate-45 group-hover:border-[#D6FF63] group-hover:bg-[#D6FF63] group-hover:text-[#151614]">
        <ArrowUpRight size={18} />
      </span>

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
        <div className="mb-5 flex items-center justify-between">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-md transition duration-500 group-hover:-rotate-6 group-hover:scale-110"
            style={{ color }}
          >
            <Icon size={20} />
          </span>
          <span className="flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs text-white/70 backdrop-blur-md">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: color }}
            />
            {category.count} services
          </span>
        </div>

        <h3 className="display-font text-2xl font-medium sm:text-3xl">
          {category.name}
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-6 text-white/65">
          {category.description}
        </p>

        <span className="mt-5 inline-flex items-center gap-2 text-sm text-[#D6FF63] transition-all duration-300 group-hover:gap-4">
          Explore services <ArrowRight size={16} />
        </span>
      </div>
    </motion.button>
  );
}

// Compact directory card with a paint-colour strip and cursor glow.
function DirectoryCard({ service, index, query }) {
  const color = swatchColors[service.category];
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(240px circle at ${mx}px ${my}px, rgba(214,255,99,0.12), transparent 70%)`;

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  }

  return (
    <motion.article
      layout
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{
        duration: 0.3,
        delay: Math.min(index, 8) * 0.035,
        ease: EASE,
      }}
      whileHover={{ y: -4 }}
      className="group relative flex min-h-[104px] items-start gap-3 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 pl-6 transition-colors duration-300 hover:border-white/25 sm:p-5 sm:pl-7"
    >
      {/* paint strip: widens on hover */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-1.5 transition-all duration-300 group-hover:w-3"
        style={{ background: color }}
      />
      <motion.div
        aria-hidden
        style={{ background: glow }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <span
        className="relative mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] transition duration-500 group-hover:rotate-[360deg]"
        style={{ color }}
      >
        <Check size={16} />
      </span>

      <div className="relative min-w-0 flex-1">
        <h4 className="text-sm font-medium leading-5 text-white/90">
          <Highlight text={service.name} query={query} />
        </h4>
        <p className="mt-2 text-xs leading-5 text-white/40">
          {service.category}
        </p>
      </div>

      <Link
        to={`/contact?service=${encodeURIComponent(service.name)}`}
        aria-label={`Enquire about ${service.name}`}
        className="relative mt-1 shrink-0 text-white/30 transition duration-300 hover:text-[#D6FF63] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      >
        <ArrowUpRight size={17} />
      </Link>
    </motion.article>
  );
}

/* --------------------------- COMPONENT -------------------------- */

export default function ServicesSection() {
  const reduce = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState(ALL);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const query = search.trim();

  const filteredServices = useMemo(() => {
    const q = query.toLowerCase();
    return services.filter((s) => {
      const inCategory = activeFilter === ALL || s.category === activeFilter;
      const inSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q);
      return inCategory && inSearch;
    });
  }, [activeFilter, query]);

  const isPreview = !showAll && !query && activeFilter === ALL;
  const visibleServices = isPreview
    ? filteredServices.slice(0, PREVIEW_COUNT)
    : filteredServices;

  function selectCategory(name) {
    setActiveFilter(name);
    setShowAll(true);
    document
      .getElementById("service-directory")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function resetAll() {
    setSearch("");
    setActiveFilter(ALL);
    setShowAll(false);
  }

  return (
    <section
      id="services"
      className="relative overflow-x-clip bg-[#151614] px-5 py-24 sm:px-10 lg:px-16 lg:py-32"
    >
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

      {/* dot grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[700px] opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          WebkitMaskImage:
            "radial-gradient(ellipse at 25% 20%, #000 15%, transparent 70%)",
          maskImage:
            "radial-gradient(ellipse at 25% 20%, #000 15%, transparent 70%)",
        }}
      />

      {/* Floating glows (vertical movement only) */}
      <motion.div
        aria-hidden
        animate={reduce ? undefined : { y: [0, 40, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-40 top-60 h-80 w-80 rounded-full bg-[#D6FF63]/[0.06] blur-[100px]"
      />
      <motion.div
        aria-hidden
        animate={reduce ? undefined : { y: [0, -50, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-40 top-[900px] h-96 w-96 rounded-full bg-[#D6FF63]/[0.05] blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* ---------- Intro ---------- */}
        <div className="grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 flex items-center gap-3"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D6FF63] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D6FF63]" />
              </span>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#D6FF63]">
                What we can help with
              </p>
            </motion.div>

            <h2 className="display-font max-w-3xl text-[2.6rem] font-medium leading-[1.06] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              <RevealWords words={headlineWords} />
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="lg:pb-2"
          >
            <p className="max-w-lg leading-7 text-white/60">
              From a single room to a complete property refresh, explore
              painting and finishing services to find the right starting point
              for your project.
            </p>

            {/* Animated stats */}
            <div className="mt-7 grid max-w-md grid-cols-3 gap-3">
              {[
                { value: services.length, label: "Services" },
                { value: categories.length, label: "Categories" },
                { value: 1, label: "Quote form" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -3 }}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur transition-colors hover:border-[#D6FF63]/40"
                >
                  <div className="display-font text-3xl text-[#D6FF63]">
                    <Counter to={stat.value} />
                  </div>
                  <div className="mt-1 text-xs text-white/50">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ---------- Marquee Added Here ---------- */}
        <Marquee reduce={reduce} />

        {/* ---------- Category cards ---------- */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.name}
              category={category}
              index={index}
              onSelect={selectCategory}
              reduce={reduce}
            />
          ))}
        </div>

        {/* ---------- Directory ---------- */}
        <div
          id="service-directory"
          className="mt-24 scroll-mt-28 border-t border-white/10 pt-12 sm:mt-32 sm:pt-16"
        >
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-[#D6FF63]">
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="h-px w-8 origin-left bg-[#D6FF63]"
                />
                Complete service directory
              </p>

              <div className="overflow-hidden pb-2">
                <motion.h3
                  initial={{ y: "105%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="display-font text-3xl font-medium tracking-[-0.04em] sm:text-5xl"
                >
                  Find your service.
                </motion.h3>
              </div>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">
                Browse all {services.length} services or search for the work you
                have in mind.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={filteredServices.length}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="display-font text-2xl text-[#D6FF63]"
                >
                  {filteredServices.length}
                </motion.span>
              </AnimatePresence>
              <span className="text-xs uppercase leading-5 tracking-wider text-white/55">
                Matching
                <br />
                services
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="mt-9 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1D1E1A] px-4 transition duration-300 focus-within:border-[#D6FF63]/60 focus-within:shadow-[0_0_0_4px_rgba(214,255,99,0.08)] sm:px-5">
            <Search className="shrink-0 text-white/40" size={20} />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search services, e.g. bedroom, waterproofing..."
              aria-label="Search painting services"
              className="min-w-0 flex-1 bg-transparent py-4 text-sm text-white outline-none placeholder:text-white/35 [&::-webkit-search-cancel-button]:hidden"
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
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-[#D6FF63] hover:text-[#151614]"
                >
                  <X size={14} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Filter chips: wrap, colour dots, sliding active pill */}
          <LayoutGroup id="filters">
            <div className="mt-5 flex flex-wrap gap-2">
              {filters.map((filter) => {
                const active = activeFilter === filter;
                const count =
                  filter === ALL
                    ? services.length
                    : services.filter((s) => s.category === filter).length;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => {
                      setActiveFilter(filter);
                      setShowAll(filter !== ALL);
                    }}
                    className={`relative flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs transition-colors duration-200 sm:text-sm ${
                      active
                        ? "border-transparent font-medium text-[#151614]"
                        : "border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="active-chip"
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
                      style={{ background: swatchColors[filter] || rainbowDot }}
                    />
                    <span className="relative z-10">
                      {filter}{" "}
                      <span className={active ? "opacity-60" : "opacity-40"}>
                        {count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          <div className="mb-4 mt-5 flex items-center justify-between gap-4">
            <p className="text-xs text-white/45" aria-live="polite">
              Showing {visibleServices.length} of {filteredServices.length}{" "}
              matching services
            </p>
            <AnimatePresence>
              {(activeFilter !== ALL || query) && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onClick={resetAll}
                  className="text-xs text-[#D6FF63] hover:text-white"
                >
                  Reset filters
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Service cards */}
          <motion.div
            layout
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {visibleServices.map((service, index) => (
                <DirectoryCard
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-dashed border-white/15 px-5 py-12 text-center"
              >
                <motion.div
                  animate={reduce ? undefined : { rotate: [0, -12, 12, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                  }}
                  className="inline-block"
                >
                  <Search className="mx-auto mb-4 text-white/35" size={28} />
                </motion.div>
                <h4 className="text-lg font-medium">
                  No matching service found
                </h4>
                <p className="mt-2 text-sm text-white/50">
                  Try another search term or reset the category filter.
                </p>
                <button
                  type="button"
                  onClick={resetAll}
                  className="mt-5 rounded-full bg-[#D6FF63] px-5 py-3 text-sm font-medium text-[#151614] transition hover:bg-white"
                >
                  Show all services
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* View all */}
          {isPreview && filteredServices.length > PREVIEW_COUNT && (
            <div className="mt-8 text-center">
              <motion.button
                type="button"
                onClick={() => setShowAll(true)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-4 text-sm transition-colors hover:border-[#D6FF63] hover:text-[#D6FF63]"
              >
                View all {services.length} services
                <ChevronDown
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-y-1"
                />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
