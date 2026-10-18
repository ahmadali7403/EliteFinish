import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Clock3,
  Layers3,
  Paintbrush,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { div, h1 } from "motion/react-client";

const EASE = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

/* ----------------------------- DATA ----------------------------- */

const services = [
  {
    number: "01",
    icon: Paintbrush,
    title: "Interior Painting",
    color: "#E6C9A8",
    description:
      "Refresh your rooms with considered colours and a clean, consistent finish.",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=900&q=85",
  },
  {
    number: "02",
    icon: Layers3,
    title: "Exterior Painting",
    color: "#8FBFA8",
    description:
      "Give your property's exterior a renewed look with careful preparation and finishing.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=85",
  },
  {
    number: "03",
    icon: WandSparkles,
    title: "Surface Preparation",
    color: "#C9C6BC",
    description:
      "Create a better foundation with attention to surface condition before painting.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=85",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Decorative Finishes",
    color: "#E39AB4",
    description:
      "Explore finishing options that help bring your preferred look and feel together.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Care in every detail",
    text: "A thoughtful approach to preparation, application and finishing.",
  },
  {
    icon: Clock3,
    title: "Clear communication",
    text: "Know the proposed scope, next steps and expectations before work begins.",
  },
  {
    icon: Layers3,
    title: "A considered finish",
    text: "Attention to colour, surfaces and the overall look of your space.",
  },
];

const process = [
  {
    number: "01",
    title: "Tell us about your space",
    text: "Share your ideas, location and the type of work you have in mind.",
  },
  {
    number: "02",
    title: "Discuss the details",
    text: "Review the scope, surface condition, finish preferences and quotation.",
  },
  {
    number: "03",
    title: "Plan the work",
    text: "Agree on the work plan and schedule before the project begins.",
  },
  {
    number: "04",
    title: "Review the finish",
    text: "Walk through the completed work and discuss any final details.",
  },
];

const faqs = [
  {
    question: "How do I get a quotation?",
    answer:
      "Use the contact page to tell us about your project. Include your location, the type of surface and any reference photos you have. The final quotation depends on the project scope and condition.",
  },
  {
    question: "What types of projects can I enquire about?",
    answer:
      "You can enquire about painting and finishing work for your property. The exact services available should be confirmed with the Elite Finish team before your project is booked.",
  },
  {
    question: "How long will my project take?",
    answer:
      "Timing depends on the size of the area, preparation required, materials and finish. A realistic schedule can be discussed once the project details are understood.",
  },
  {
    question: "Do you work in my area?",
    answer:
      "Share your city or area through the contact page so the team can confirm whether your project is within its service coverage.",
  },
];

/* --------------------------- HELPERS ---------------------------- */

// Card with a lime glow that follows the cursor.
function GlowCard({ className = "", children, ...rest }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(300px circle at ${mx}px ${my}px, rgba(214,255,99,0.13), transparent 70%)`;

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  }

  return (
    <motion.div
      onMouseMove={onMove}
      className={`group relative overflow-hidden ${className}`}
      {...rest}
    >
      <motion.div
        aria-hidden
        style={{ background: glow }}
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
    </motion.div>
  );
}

// Image that moves slowly inside its frame while scrolling.
function ParallaxImage({ src, alt, className = "" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["-9%", "9%"],
  );

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y }}
        className={`h-[120%] w-full -translate-y-[8%] object-cover transition duration-700 group-hover:scale-[1.06] ${className}`}
      />
    </div>
  );
}

export function SectionHeading({ eyebrow, title, text, centered = false }) {
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-2xl`}>
      <p
        className={`mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#D6FF63] ${
          centered ? "justify-center" : ""
        }`}
      >
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="h-px w-8 origin-left bg-[#D6FF63]"
        />
        {eyebrow}
      </p>

      <div className="overflow-hidden pb-2">
        <motion.h2
          initial={{ y: "105%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="display-font text-4xl font-medium leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h2>
      </div>

      {text && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className={`mt-5 max-w-xl leading-7 text-white/60 ${centered ? "mx-auto" : ""}`}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}

/* ------------------------- 1. SERVICES -------------------------- */

export function ServicesSection() {
  return (
    <section className="overflow-x-clip px-5 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                Good work starts
                <br />
                with the details.
              </>
            }
            text="Explore painting and finishing options for spaces that deserve a thoughtful refresh."
          />
          <Link
            to="/services"
            className="group inline-flex w-fit items-center gap-2 border-b border-white/25 pb-3 text-sm transition hover:border-[#D6FF63] hover:text-[#D6FF63]"
          >
            All services
            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <GlowCard
                key={service.number}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: index * 0.09, ease: EASE }}
                whileHover={{ y: -8 }}
                className="rounded-2xl border border-white/10 bg-white/[0.025] transition-colors duration-300 hover:border-white/25"
              >
                <div className="relative h-56 overflow-hidden">
                  <ParallaxImage
                    src={service.image}
                    alt={`${service.title} visual reference`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151614]/70 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-xs text-white/80 backdrop-blur">
                    {service.number}
                  </span>
                  {/* paint colour bar */}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: 0.3 + index * 0.09,
                      ease: EASE,
                    }}
                    className="absolute inset-x-0 bottom-0 h-1.5 origin-left"
                    style={{ background: service.color }}
                  />
                </div>

                <div className="relative p-6">
                  <div
                    className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition duration-500 group-hover:-rotate-12 group-hover:scale-110"
                    style={{ color: service.color }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="display-font text-xl">{service.title}</h3>
                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/55">
                    {service.description}
                  </p>
                  <Link
                    to="/contact"
                    className="mt-5 inline-flex items-center gap-2 text-sm text-[#D6FF63] transition-all group-hover:gap-3"
                  >
                    Enquire <ArrowRight size={16} />
                  </Link>
                </div>
              </GlowCard>
            );
          })}
        </div>

        <p className="mt-5 text-xs leading-5 text-white/35">
          Images are illustrative references, not verified Elite Finish project
          photos.
        </p>
      </div>
    </section>
  );
}

/* ------------------------ 2. WHY CHOOSE US ----------------------- */

export function WhyChooseUs() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-y border-white/[0.07] bg-[#1C1D19] px-5 py-24 sm:px-10 lg:px-16 lg:py-28">
      <motion.div
        aria-hidden
        animate={reduce ? undefined : { y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#D6FF63]/[0.07] blur-[100px]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="The Elite Finish approach"
            title={
              <>
                A better finish
                <br />
                is in the details.
              </>
            }
            text="The way a project is prepared, communicated and finished matters as much as the final colour."
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 w-fit"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm transition-colors hover:border-[#D6FF63] hover:text-[#D6FF63]"
              >
                Get to know us
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="space-y-4">
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <GlowCard
                key={item.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, delay: index * 0.12, ease: EASE }}
                whileHover={{ x: 8 }}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-[#D6FF63]/40 sm:p-7"
              >
                <div className="relative z-[2] flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D6FF63]/10 text-[#D6FF63] transition duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-[#D6FF63] group-hover:text-[#151614]">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="display-font text-xl">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/55">
                      {item.text}
                    </p>
                  </div>
                </div>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------ 3. PROJECT PREVIEW --------------------- */

export function ProjectPreview() {
  const projects = [
    {
      label: "Interior inspiration",
      title: "Warm, considered living",
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
      className: "md:col-span-7",
    },
    {
      label: "Exterior inspiration",
      title: "A fresh first impression",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=85",
      className: "md:col-span-5 md:mt-20",
    },
    {
      label: "Space inspiration",
      title: "Simple. Calm. Timeless.",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
      className: "md:col-span-8",
    },
  ];

  return (
    <div></div>
    // <section className="overflow-x-clip px-5 py-24 sm:px-10 lg:px-16 lg:py-32">
    //   <div className="mx-auto max-w-7xl">
    //     <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
    //       <SectionHeading
    //         eyebrow="Visual direction"
    //         title={
    //           <>
    //             See the potential
    //             <br />
    //             in every space.
    //           </>
    //         }
    //         text="A look at the kind of clean, considered spaces that can inspire your next project."
    //       />
    //       <Link
    //         to="/projects"
    //         className="group inline-flex w-fit items-center gap-2 text-sm text-[#D6FF63]"
    //       >
    //         Explore gallery
    //         <ArrowUpRight
    //           size={17}
    //           className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
    //         />
    //       </Link>
    //     </div>

    //     <div className="mt-12 grid gap-5 md:grid-cols-12 md:items-start">
    //       {projects.map((project, index) => (
    //         <motion.article
    //           key={project.title}
    //           initial={{ opacity: 0, y: 40 }}
    //           whileInView={{ opacity: 1, y: 0 }}
    //           viewport={{ once: true, amount: 0.1 }}
    //           transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
    //           className={`group ${project.className}`}
    //         >
    //           {/* image is revealed like a paint wipe */}
    //           <motion.div
    //             initial={{ clipPath: "inset(100% 0 0 0)" }}
    //             whileInView={{ clipPath: "inset(0% 0 0 0)" }}
    //             viewport={{ once: true, amount: 0.15 }}
    //             transition={{
    //               duration: 1.1,
    //               delay: 0.1 + index * 0.1,
    //               ease: EASE,
    //             }}
    //             className="relative h-[300px] overflow-hidden rounded-2xl bg-white/5 sm:h-[390px]"
    //           >
    //             <ParallaxImage src={project.image} alt={project.label} />
    //             <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

    //             <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
    //               <div>
    //                 <p className="text-xs uppercase tracking-[0.18em] text-[#D6FF63]">
    //                   {project.label}
    //                 </p>
    //                 <h3 className="display-font mt-2 text-2xl transition-transform duration-500 group-hover:-translate-y-1 sm:text-3xl">
    //                   {project.title}
    //                 </h3>
    //               </div>
    //               <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/20 backdrop-blur transition duration-300 group-hover:rotate-45 group-hover:border-[#D6FF63] group-hover:bg-[#D6FF63] group-hover:text-[#151614]">
    //                 <ArrowUpRight size={20} />
    //               </span>
    //             </div>
    //           </motion.div>
    //         </motion.article>
    //       ))}
    //     </div>

    //     <p className="mt-5 text-xs leading-5 text-white/35">
    //       These are inspiration images only. Replace them with actual project
    //       photos before presenting this gallery as completed work.
    //     </p>
    //   </div>
    // </section>
  );
}

/* --------------------------- 4. PROCESS -------------------------- */

export function ProcessSection() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 55%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 110, damping: 26 });

  return (
    <section className="overflow-x-clip bg-[#D6FF63] px-5 py-24 text-[#151614] sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-black/60">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE }}
                className="h-px w-8 origin-left bg-black/50"
              />
              How it works
            </p>

            <div className="overflow-hidden pb-2">
              <motion.h2
                initial={{ y: "105%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="display-font text-4xl font-medium leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-6xl"
              >
                From first idea
                <br />
                to final detail.
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-5 max-w-md leading-7 text-black/65"
            >
              A clear process helps everyone understand the scope, expectations
              and next steps.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 w-fit"
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#151614] px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-black/80"
                >
                  Start an enquiry
                  <ArrowUpRight
                    size={17}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Steps with a progress line that fills while scrolling */}
          <div ref={listRef} className="relative pl-6 sm:pl-8">
            <div
              aria-hidden
              className="absolute bottom-0 left-0 top-0 w-[2px] bg-black/15"
            />
            <motion.div
              aria-hidden
              style={{ scaleY: lineScale }}
              className="absolute bottom-0 left-0 top-0 w-[2px] origin-top bg-[#151614]"
            />

            <div className="divide-y divide-black/15">
              {process.map((item, index) => (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.05,
                    ease: EASE,
                  }}
                  className="group relative grid grid-cols-[44px_1fr] gap-4 py-7 sm:grid-cols-[64px_1fr] sm:gap-6"
                >
                  {/* dot on the line */}
                  <motion.span
                    aria-hidden
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 18,
                      delay: 0.15,
                    }}
                    className="absolute -left-[31px] top-9 h-3 w-3 rounded-full border-2 border-[#151614] bg-[#D6FF63] sm:-left-[39px]"
                  />
                  <span className="display-font pt-1 text-sm text-black/50 transition-colors group-hover:text-black">
                    {item.number}
                  </span>
                  <div className="transition-transform duration-300 group-hover:translate-x-1.5">
                    <h3 className="display-font text-xl font-semibold sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-sm leading-6 text-black/65">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- 5. FAQ ---------------------------- */

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="overflow-x-clip px-5 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="Good to know"
          title={
            <>
              Questions before
              <br />
              you get started?
            </>
          }
          text="A few useful details to help you plan your painting or finishing enquiry."
        />

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
                className={`relative overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  isOpen
                    ? "border-[#D6FF63]/40 bg-white/[0.04]"
                    : "border-white/10 bg-white/[0.015] hover:border-white/25"
                }`}
              >
                {/* active side bar */}
                <motion.span
                  aria-hidden
                  animate={{ scaleY: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-y-0 left-0 w-1 origin-top bg-[#D6FF63]"
                />

                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-7 sm:py-6"
                >
                  <span className="display-font text-lg sm:text-xl">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isOpen
                        ? "border-[#D6FF63] bg-[#D6FF63] text-[#151614]"
                        : "border-white/20 text-[#D6FF63]"
                    }`}
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl px-5 pb-6 pr-8 text-sm leading-7 text-white/55 sm:px-7">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- 6. FINAL CTA ------------------------ */

export function FinalCTA() {
  const reduce = useReducedMotion();

  return (
    // <section className="overflow-x-clip px-5 pb-24 sm:px-10 lg:px-16 lg:pb-32">
    //   <motion.div
    //     initial={{ opacity: 0, y: 50, scale: 0.97 }}
    //     whileInView={{ opacity: 1, y: 0, scale: 1 }}
    //     viewport={{ once: true, amount: 0.25 }}
    //     transition={{ duration: 0.8, ease: EASE }}
    //     className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#D6FF63]/[0.12] via-[#20211D] to-[#20211D] px-6 py-14 sm:px-12 sm:py-20 lg:px-16"
    //   >
    //     <motion.div
    //       aria-hidden
    //       animate={reduce ? undefined : { y: [0, 30, 0], x: [0, -20, 0] }}
    //       transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    //       className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-[#D6FF63]/15 blur-3xl"
    //     />
    //     <motion.span
    //       aria-hidden
    //       animate={reduce ? undefined : { x: ["-120%", "420%"] }}
    //       transition={{
    //         duration: 6,
    //         repeat: Infinity,
    //         repeatDelay: 3,
    //         ease: "easeInOut",
    //       }}
    //       className="pointer-events-none absolute inset-y-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-[#D6FF63]/[0.07] to-transparent"
    //     />

    //     <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
    //       <div className="max-w-3xl">
    //         <p className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-[#D6FF63]">
    //           <motion.span
    //             initial={{ scaleX: 0 }}
    //             whileInView={{ scaleX: 1 }}
    //             viewport={{ once: true }}
    //             transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
    //             className="h-px w-8 origin-left bg-[#D6FF63]"
    //           />
    //           Your next project starts here
    //         </p>

    //         <div className="overflow-hidden pb-2">
    //           <motion.h2
    //             initial={{ y: "105%" }}
    //             whileInView={{ y: 0 }}
    //             viewport={{ once: true, amount: 0.4 }}
    //             transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
    //             className="display-font text-4xl leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-7xl"
    //           >
    //             Ready for a
    //             <br />
    //             fresh perspective?
    //           </motion.h2>
    //         </div>

    //         <motion.p
    //           initial={{ opacity: 0, y: 16 }}
    //           whileInView={{ opacity: 1, y: 0 }}
    //           viewport={{ once: true }}
    //           transition={{ duration: 0.6, delay: 0.4 }}
    //           className="mt-5 max-w-xl leading-7 text-white/60"
    //         >
    //           Tell us about your space, your ideas and the finish you have in
    //           mind.
    //         </motion.p>
    //       </div>

    //       <motion.div
    //         initial={{ opacity: 0, scale: 0.8 }}
    //         whileInView={{ opacity: 1, scale: 1 }}
    //         viewport={{ once: true }}
    //         transition={{
    //           type: "spring",
    //           stiffness: 200,
    //           damping: 16,
    //           delay: 0.5,
    //         }}
    //         whileHover={{ scale: 1.06 }}
    //         whileTap={{ scale: 0.96 }}
    //         className="w-fit"
    //       >
    //         <Link
    //           to="/contact"
    //           className="group inline-flex items-center gap-3 rounded-full bg-[#D6FF63] px-7 py-4 text-sm font-semibold text-[#151614] shadow-[0_0_40px_-8px_rgba(214,255,99,0.6)] transition-colors hover:bg-white"
    //         >
    //           Let's talk
    //           <ArrowUpRight
    //             size={18}
    //             className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
    //           />
    //         </Link>
    //       </motion.div>
    //     </div>
    //   </motion.div>
    // </section>
    <div></div>
  );
}
