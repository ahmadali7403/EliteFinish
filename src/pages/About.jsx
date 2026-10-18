import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Paintbrush,
  ShieldCheck,
  Sparkles,
  Layers3,
  ClipboardCheck,
  Brush,
  House,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const values = [
  {
    number: "01",
    icon: Layers3,
    title: "Preparation First",
    description:
      "A quality finish starts before the first coat. Proper surface preparation helps create a cleaner, more consistent result.",
    color: "#D6FF63",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Quality in Details",
    description:
      "From edges and corners to the final coat, every detail deserves attention throughout the painting process.",
    color: "#E6C9A8",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "A Cleaner Finish",
    description:
      "Thoughtful colour choices, smooth surfaces and careful finishing help bring the overall look of a space together.",
    color: "#8FBFA8",
  },
];

const process = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Understand Your Space",
    description:
      "We begin by understanding your property, painting requirements and the result you want to achieve.",
  },
  {
    number: "02",
    icon: Layers3,
    title: "Prepare the Surface",
    description:
      "Depending on the project, preparation may include cleaning, sanding, putty, primer and attention to surface imperfections.",
  },
  {
    number: "03",
    icon: Brush,
    title: "Apply the Finish",
    description:
      "The painting approach and materials are selected according to the surface, project requirements and agreed scope.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Review the Details",
    description:
      "The final result is reviewed for visible inconsistencies and finishing details before the project is wrapped up.",
  },
];

const services = [
  "Interior Painting",
  "Exterior Painting",
  "Surface Preparation",
  "Decorative Finishes",
  "Protection & Waterproofing",
  "Repainting & Maintenance",
];

function Reveal({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D6FF63] sm:text-xs">
      <span className="h-px w-7 bg-[#D6FF63]" />
      {children}
    </p>
  );
}

export default function About() {
  const reduce = useReducedMotion();

  // Same cursor spotlight style as the Services page.
  const hx = useMotionValue(0);
  const hy = useMotionValue(0);

  const heroGlow = useMotionTemplate`
    radial-gradient(
      520px circle at ${hx}px ${hy}px,
      rgba(214,255,99,0.10),
      transparent 70%
    )
  `;

  function onHeroMove(e) {
    if (reduce) return;

    const rect = e.currentTarget.getBoundingClientRect();
    hx.set(e.clientX - rect.left);
    hy.set(e.clientY - rect.top);
  }

  // Same image parallax effect as the Services page.
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
        @keyframes about-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        .about-shimmer {
          background-image: linear-gradient(
            90deg,
            #D6FF63 0%,
            #F4FFD0 25%,
            #D6FF63 50%,
            #B7E83F 75%,
            #D6FF63 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: about-shimmer 5s linear infinite;
        }

        .about-grain {
          background-image: radial-gradient(
            rgba(255,255,255,0.10) 1px,
            transparent 1px
          );
          background-size: 26px 26px;
        }

        @media (prefers-reduced-motion: reduce) {
          .about-shimmer {
            animation: none;
          }
        }
      `}</style>

      {/* ======================== HERO ======================== */}
      <section
        onMouseMove={onHeroMove}
        className="relative overflow-hidden border-b border-white/10"
      >
        {/* Background dot grid */}
        <div
          aria-hidden
          className="about-grain pointer-events-none absolute inset-0 opacity-70"
          style={{
            maskImage:
              "radial-gradient(ellipse at 30% 40%, #000 20%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 30% 40%, #000 20%, transparent 75%)",
          }}
        />

        {/* Cursor-following glow */}
        <motion.div
          aria-hidden
          style={{ background: heroGlow }}
          className="pointer-events-none absolute inset-0"
        />

        {/* Floating background glows */}
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

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-28">
          {/* Hero text */}
          <div>
            <motion.p
              initial={reduce ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#D6FF63]"
            >
              <motion.span
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                className="h-px w-8 origin-left bg-[#D6FF63]"
              />
              About Elite Finish
            </motion.p>

            <h1 className="max-w-3xl text-[2.6rem] font-semibold leading-[1.06] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.1rem]">
              <motion.span
                initial={reduce ? false : { opacity: 0, y: "110%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
                className="block"
              >
                Every space
              </motion.span>

              <motion.span
                initial={reduce ? false : { opacity: 0, y: "110%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.28, ease: EASE }}
                className="about-shimmer block"
              >
                deserves
              </motion.span>

              <motion.span
                initial={reduce ? false : { opacity: 0, y: "110%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.4, ease: EASE }}
                className="block"
              >
                a better finish.
              </motion.span>
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-6 max-w-xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8"
            >
              At Elite Finish, painting is about more than changing a colour. It
              is about preparing surfaces, refining details and helping spaces
              look their best through thoughtful painting and finishing
              solutions.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/services"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#D6FF63] px-6 py-3.5 text-sm font-semibold text-[#151614] shadow-[0_0_40px_-8px_rgba(214,255,99,0.4)] transition-colors hover:bg-white"
                >
                  Explore Our Services
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-6 py-3.5 text-sm font-medium transition-colors hover:border-[#D6FF63] hover:text-[#D6FF63]"
                >
                  Let's Talk
                  <ArrowUpRight size={16} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Small trust statement */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-10 flex max-w-lg items-center gap-3 border-t border-white/10 pt-6"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D6FF63]/20 bg-[#D6FF63]/[0.07]">
                <Paintbrush size={21} className="text-[#D6FF63]" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  Preparation first. Quality in every detail.
                </p>
                <p className="mt-1 text-xs text-white/45">
                  The Elite Finish approach
                </p>
              </div>
            </motion.div>
          </div>

          {/* Hero image — styled like Services page */}
          <div
            ref={imageRef}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            {/* Arch outline */}
            <motion.div
              aria-hidden
              initial={reduce ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.45 }}
              className="absolute -inset-2 rounded-t-[11rem] rounded-b-[2rem] border border-[#D6FF63]/25 sm:-inset-3 sm:rounded-t-[15rem]"
            />

            {/* Image reveal */}
            <motion.div
              initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 1.3, delay: 0.2, ease: EASE }}
              className="relative h-[380px] overflow-hidden rounded-t-[10rem] rounded-b-3xl sm:h-[500px] sm:rounded-t-[14rem]"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=85"
                alt="Modern interior with refined wall finishes"
                initial={reduce ? false : { scale: 1.35 }}
                animate={{ scale: 1.15 }}
                transition={{ duration: 2, ease: EASE }}
                style={{ y: imageY }}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#151614]/70 via-transparent to-transparent" />
            </motion.div>

            {/* Floating paint colour chips */}
            <div className="absolute -left-1 top-1/3 flex flex-col gap-2 sm:-left-5">
              {["#E6C9A8", "#8FBFA8", "#E39AB4", "#7FB2E5"].map((color, i) => (
                <motion.span
                  key={color}
                  initial={reduce ? false : { opacity: 0, x: -20 }}
                  animate={
                    reduce
                      ? { opacity: 1, x: 0 }
                      : { opacity: 1, x: 0, y: [0, -6, 0] }
                  }
                  transition={
                    reduce
                      ? { delay: 0.9 + i * 0.1 }
                      : {
                          opacity: {
                            delay: 0.9 + i * 0.1,
                            duration: 0.5,
                          },
                          x: {
                            delay: 0.9 + i * 0.1,
                            duration: 0.5,
                          },
                          y: {
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.4,
                          },
                        }
                  }
                  className="h-9 w-9 rounded-xl border-2 border-[#151614] shadow-lg sm:h-11 sm:w-11"
                  style={{ background: color }}
                />
              ))}
            </div>

            {/* Floating glass card — same style as Services */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={
                reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -8, 0] }
              }
              transition={
                reduce
                  ? { duration: 0.6, delay: 1 }
                  : {
                      opacity: { duration: 0.6, delay: 1 },
                      y: {
                        duration: 5,
                        delay: 1.5,
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

      {/* ====================== WHO WE ARE ====================== */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionLabel>Who We Are</SectionLabel>

            <h2 className="max-w-md text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              A thoughtful approach to{" "}
              <span className="text-[#D6FF63]">every surface.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="max-w-2xl">
              <p className="text-base leading-8 text-white/65 sm:text-lg">
                Elite Finish focuses on painting and finishing solutions for
                spaces that deserve care, attention and a clean final look. From
                a single room to a property's exterior, the right result begins
                with understanding the surface and the job at hand.
              </p>

              <p className="mt-5 text-sm leading-7 text-white/45 sm:text-base">
                Our approach centres on proper preparation, suitable finishing
                methods and attention to the details that bring a project
                together. Every property has different needs, so the work should
                be planned around its surfaces, requirements and intended
                result.
              </p>

              <div className="mt-8 h-px w-full bg-white/10" />

              <div className="mt-6 flex items-start gap-3">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-[#D6FF63]"
                />
                <p className="text-sm leading-6 text-white/65">
                  A clear focus on preparation, finishing details and the needs
                  of each individual project.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================== OUR VALUES ====================== */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
          <Reveal className="max-w-2xl">
            <SectionLabel>What Guides Us</SectionLabel>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Good work starts
              <br />
              <span className="text-white/35">with the right approach.</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
              A finish is only as good as the care taken throughout the process.
              These principles shape how we think about painting and finishing
              projects.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {values.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.number} delay={index * 0.1}>
                  <motion.article
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#151614] p-6 transition-colors duration-300 hover:border-white/25 sm:p-8"
                  >
                    <div
                      className="absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-[0.06] blur-3xl transition-opacity group-hover:opacity-20"
                      style={{ background: item.color }}
                    />

                    <div className="relative flex items-center justify-between">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]"
                        style={{ color: item.color }}
                      >
                        <Icon size={23} strokeWidth={1.6} />
                      </div>

                      <span className="text-xs tabular-nums text-white/30">
                        {item.number}
                      </span>
                    </div>

                    <h3 className="relative mt-8 text-xl font-medium">
                      {item.title}
                    </h3>

                    <p className="relative mt-3 text-sm leading-7 text-white/50">
                      {item.description}
                    </p>

                    <div
                      className="relative mt-7 h-px w-10 transition-all duration-300 group-hover:w-20"
                      style={{ background: item.color }}
                    />
                  </motion.article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================== OUR PROCESS ====================== */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionLabel>How We Approach It</SectionLabel>

            <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              From preparation
              <br />
              to the final <span className="text-[#D6FF63]">coat.</span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/50 sm:text-base">
              Every project is different, but a considered process helps keep
              the work organised and the finishing details in focus.
            </p>

            <Link
              to="/services"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#D6FF63] transition-colors hover:text-white"
            >
              See what we do
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <div className="mt-12 hidden overflow-hidden rounded-2xl border border-white/10 lg:block">
              <img
                src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=900&q=85"
                alt="Painting tools and surface finishing work"
                className="h-64 w-full object-cover opacity-80"
                loading="lazy"
              />
            </div>
          </Reveal>

          <div className="relative">
            <div className="absolute bottom-8 left-[21px] top-8 w-px bg-white/10 sm:left-[25px]" />

            <div className="space-y-8 sm:space-y-10">
              {process.map((step, index) => {
                const Icon = step.icon;

                return (
                  <Reveal key={step.number} delay={index * 0.08}>
                    <div className="relative flex gap-5 sm:gap-7">
                      <div className="relative z-10 flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-[#D6FF63]/30 bg-[#20211D] text-[#D6FF63] sm:h-[52px] sm:w-[52px]">
                        <Icon size={20} strokeWidth={1.6} />
                      </div>

                      <div className="flex-1 border-b border-white/10 pb-7 sm:pb-9">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D6FF63]">
                          Step {step.number}
                        </span>

                        <h3 className="mt-3 text-xl font-medium sm:text-2xl">
                          {step.title}
                        </h3>

                        <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====================== SERVICES STRIP ====================== */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-[0.7fr_1.3fr] md:items-center md:py-16">
          <Reveal>
            <SectionLabel>Our Expertise</SectionLabel>

            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              One place for your
              <br />
              painting needs.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2.5">
              {services.map((service) => (
                <Link
                  key={service}
                  to="/services"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-3 text-xs text-white/65 transition-all duration-300 hover:border-[#D6FF63]/50 hover:bg-[#D6FF63]/[0.06] hover:text-[#D6FF63] sm:text-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D6FF63]/70 transition-colors group-hover:bg-[#D6FF63]" />
                  {service}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================== CALL TO ACTION ====================== */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#D6FF63]/[0.12] via-white/[0.035] to-transparent p-7 sm:p-12 md:p-16">
            <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#D6FF63]/10 blur-[90px]" />

            <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <SectionLabel>Your Project Starts Here</SectionLabel>

                <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
                  Let's create a finish
                  <br />
                  <span className="text-[#D6FF63]">that feels right.</span>
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
                  Tell us about your space, the surfaces you want painted and
                  the result you have in mind. Let's discuss the right approach
                  for your project.
                </p>
              </div>

              <Link
                to="/contact"
                className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#D6FF63] px-7 py-4 text-sm font-semibold text-[#151614] transition-colors hover:bg-white"
              >
                Discuss Your Project
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="relative mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:text-sm">
              {[
                "Interior & exterior",
                "Surface preparation",
                "Finishing details",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <Check size={14} className="text-[#D6FF63]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ====================== FOOTNOTE ====================== */}
      <div className="mx-auto flex max-w-7xl items-start gap-3 px-5 pb-10 text-xs leading-6 text-white/35 sm:px-8">
        <House size={16} className="mt-1 shrink-0 text-[#D6FF63]" />

        <p>
          Every property has different requirements. Project scope, materials,
          availability and pricing should be confirmed during your enquiry.
        </p>
      </div>
    </main>
  );
}
