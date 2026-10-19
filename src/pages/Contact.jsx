import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const WHATSAPP_NUMBER = "923294285881";
const BUSINESS_EMAIL = "azmatullaha166@gmail.com";
const SERVICE_AREA = "Punjab, Pakistan";

const serviceOptions = [
  "Interior House Painting",
  "Exterior House Painting",
  "Bedroom Painting",
  "Living Room Painting",
  "Ceiling Painting",
  "Door, Frame and Trim Painting",
  "Kitchen Painting",
  "Bathroom Painting",
  "Staircase Painting",
  "Interior Wall Repainting",
  "House Front Elevation Painting",
  "Boundary Wall Painting",
  "Gate and Railing Painting",
  "Commercial Exterior Painting",
  "Roof Painting",
  "Garage Painting",
  "Wall Putty and Surface Preparation",
  "Wall Crack Repair",
  "Wall Sanding and Smoothing",
  "Wall Primer Application",
  "Old Paint Removal",
  "Plaster Repair",
  "Texture Painting",
  "Feature Wall Painting",
  "Decorative Wall Finishes",
  "Wood Painting and Polishing",
  "Metal Painting",
  "Custom Colour Finishes",
  "Accent Wall Painting",
  "Cabinet Painting",
  "Furniture Painting",
  "Waterproof Coating",
  "Damp Wall Treatment",
  "Anti-Rust Painting",
  "Exterior Weatherproof Coating",
  "Roof Waterproofing",
  "Protective Surface Coating",
  "Complete House Repainting",
  "Rental Property Repainting",
  "Commercial Property Repainting",
  "Multiple Services / Not Sure Yet",
];

const propertyTypes = [
  "Residential",
  "Commercial",
  "New Construction",
  "Renovation",
  "Other",
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

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  property: "Residential",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-sm text-[#F3F0E8] outline-none transition duration-300 placeholder:text-white/25 hover:border-white/25 focus:border-[#D6FF63]/60 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(214,255,99,0.08)] aria-[invalid=true]:border-red-300/60";

const headlineWords = [
  { text: "Let’s" },
  { text: "talk" },
  { text: "about", br: true },
  { text: "your" },
  { text: "next", className: "shimmer-text" },
  { text: "project.", className: "shimmer-text" },
];

/* --------------------------- HELPERS ---------------------------- */

// Slides each word up from behind a mask.
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
                delay: startDelay + i * 0.08,
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

// Small label with a line that draws in.
function Eyebrow({ children }) {
  return (
    <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#D6FF63]">
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        className="h-px w-8 origin-left bg-[#D6FF63]"
      />
      {children}
    </p>
  );
}

// Label + control + animated error message.
function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-white/75">
        {label}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden pt-2 text-xs text-red-300"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// One row in the contact details card.
function ContactRow({ icon: Icon, title, value, hint, href, external, index }) {
  const content = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#D6FF63] transition duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:border-[#D6FF63]/50">
        <Icon size={19} />
      </span>
      <span className="min-w-0">
        <span className="block font-medium">{title}</span>
        <span
          className={`mt-1 block break-all text-sm text-white/50 transition-colors ${
            href ? "group-hover:text-[#D6FF63]" : ""
          }`}
        >
          {value}
        </span>
        <span className="mt-1 block text-xs text-white/35">{hint}</span>
      </span>
    </>
  );

  const wrapperProps = {
    initial: { opacity: 0, x: -24 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay: 0.1 + index * 0.1, ease: EASE },
  };

  return href ? (
    <motion.a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...wrapperProps}
      className="group flex gap-4"
    >
      {content}
    </motion.a>
  ) : (
    <motion.div {...wrapperProps} className="group flex gap-4">
      {content}
    </motion.div>
  );
}

/* ----------------------------- PAGE ----------------------------- */

export default function Contact() {
  const [searchParams] = useSearchParams();
  const reduceMotion = useReducedMotion();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const requestedService = searchParams.get("service");

    if (requestedService) {
      setForm((current) => ({
        ...current,
        service: requestedService,
      }));
    }
  }, [searchParams]);

  // How many required fields are filled (drives the progress bar).
  const completed = useMemo(
    () =>
      [
        form.name.trim(),
        emailPattern.test(form.email),
        form.service,
        form.message.trim(),
      ].filter(Boolean).length,
    [form],
  );

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setSubmitted(false);
  };

  const selectProperty = (value) => {
    setForm((current) => ({ ...current, property: value }));
    setSubmitted(false);
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!form.email.trim() || !emailPattern.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!form.service) {
      nextErrors.service = "Please select a service.";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Please tell us about your project.";
    }

    setErrors(nextErrors);

    // Move focus to the first field with a problem.
    const firstInvalid = ["name", "email", "service", "message"].find(
      (key) => nextErrors[key],
    );
    if (firstInvalid) document.getElementById(firstInvalid)?.focus();

    return Object.keys(nextErrors).length === 0;
  };

  const createMessage = () =>
    [
      "Hello Elite Finish! I'd like to enquire about a project.",
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || "Not provided"}`,
      `Property type: ${form.property}`,
      `Service: ${form.service}`,
      "",
      `Project details: ${form.message}`,
    ].join("\n");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      createMessage(),
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  // Cursor glow on the details card
  const gx = useMotionValue(0);
  const gy = useMotionValue(0);
  const cardGlow = useMotionTemplate`radial-gradient(320px circle at ${gx}px ${gy}px, rgba(214,255,99,0.10), transparent 70%)`;
  const onCardMove = (e) => {
    if (reduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    gx.set(e.clientX - r.left);
    gy.set(e.clientY - r.top);
  };

  // Cursor spotlight on the hero
  const hx = useMotionValue(0);
  const hy = useMotionValue(0);
  const heroGlow = useMotionTemplate`radial-gradient(520px circle at ${hx}px ${hy}px, rgba(214,255,99,0.10), transparent 70%)`;
  const onHeroMove = (e) => {
    if (reduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    hx.set(e.clientX - r.left);
    hy.set(e.clientY - r.top);
  };

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
              "radial-gradient(ellipse at 30% 40%, #000 15%, transparent 75%)",
            maskImage:
              "radial-gradient(ellipse at 30% 40%, #000 15%, transparent 75%)",
          }}
        />
        <motion.div
          aria-hidden
          style={{ background: heroGlow }}
          className="pointer-events-none absolute inset-0"
        />
        <motion.div
          aria-hidden
          animate={
            reduceMotion ? undefined : { y: [0, 40, 0], scale: [1, 1.15, 1] }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#D6FF63]/10 blur-[110px]"
        />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24 lg:py-28">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#D6FF63]"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="h-px w-8 origin-left bg-[#D6FF63]"
            />
            Contact Elite Finish
          </motion.p>

          <h1 className="mt-6 max-w-4xl text-[2.5rem] font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <RevealWords words={headlineWords} startDelay={0.25} />
          </h1>

          <div className="mt-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="max-w-xl text-base leading-8 text-white/60 sm:text-lg"
            >
              Tell us what you have in mind. Share a few details about your
              space and the finish you want to achieve.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.05 }}
              className="w-fit"
            >
              <Link
                to="/services"
                className="group relative inline-flex items-center gap-2 pb-1 text-sm text-white/65 transition-colors hover:text-[#D6FF63]"
              >
                Explore our services
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#D6FF63] transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            </motion.div>
          </div>

          {/* paint strip draws in */}
          <div className="mt-10 flex h-1 max-w-sm overflow-hidden rounded-full">
            {paintColors.map((color, i) => (
              <motion.span
                key={color}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 1.1 + i * 0.07,
                  ease: EASE,
                }}
                className="h-full flex-1 origin-left"
                style={{ background: color }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================== CONTACT DETAILS + FORM ================== */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        {/* Details card */}
        <motion.aside
          onMouseMove={onCardMove}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative h-fit overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-8 lg:sticky lg:top-28"
        >
          <motion.div
            aria-hidden
            style={{ background: cardGlow }}
            className="pointer-events-none absolute inset-0"
          />

          <div className="relative">
            <Eyebrow>Get in Touch</Eyebrow>

            <div className="mt-4 overflow-hidden pb-1">
              <motion.h2
                initial={{ y: "105%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
                className="text-2xl font-semibold sm:text-3xl"
              >
                Start with a conversation.
              </motion.h2>
            </div>

            <p className="mt-4 text-sm leading-7 text-white/55">
              Tell us about your painting or finishing project. We can discuss
              your requirements and the next steps.
            </p>

            <div className="mt-9 space-y-6">
              <ContactRow
                index={0}
                icon={MessageCircle}
                title="WhatsApp"
                value="+92 329 4285881"
                hint="Chat directly with us"
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                external
              />
              <ContactRow
                index={1}
                icon={Mail}
                title="Email"
                value={BUSINESS_EMAIL}
                hint="Send us your project details"
                href={`mailto:${BUSINESS_EMAIL}`}
              />
              <ContactRow
                index={2}
                icon={MapPin}
                title="Service Area"
                value={SERVICE_AREA}
                hint="Confirm availability for your location."
              />
            </div>

            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              className="mt-9"
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#D6FF63] px-5 py-3.5 text-sm font-semibold text-[#151614] shadow-[0_0_40px_-10px_rgba(214,255,99,0.7)] transition-colors hover:bg-white"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/50 blur-md transition-transform duration-700 group-hover:translate-x-[520%]"
                />
                <MessageCircle size={17} className="relative" />
                <span className="relative">Chat on WhatsApp</span>
                <ArrowUpRight
                  size={16}
                  className="relative transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </motion.div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2 text-xs text-white/40">
                <motion.span
                  animate={
                    reduceMotion ? undefined : { rotate: [0, 20, -20, 0] }
                  }
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  className="inline-flex"
                >
                  <Sparkles size={15} className="text-[#D6FF63]" />
                </motion.span>
                A clear brief helps us understand your project.
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="min-w-0"
        >
          <div className="mb-7">
            <Eyebrow>Project Enquiry</Eyebrow>

            <div className="mt-3 overflow-hidden pb-1">
              <motion.h2
                initial={{ y: "105%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
                className="text-2xl font-semibold sm:text-3xl"
              >
                Tell us what you need.
              </motion.h2>
            </div>

            <p className="mt-3 text-sm leading-6 text-white/50">
              Fields marked with * are required. Your enquiry will open in
              WhatsApp for you to review and send.
            </p>

            {/* Progress of required fields */}
            <div className="mt-5" aria-live="polite">
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  animate={{ width: `${(completed / 4) * 100}%` }}
                  transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
                  className="h-full rounded-full bg-[#D6FF63]"
                />
              </div>
              <p className="mt-2 text-xs text-white/40">
                {completed} of 4 required fields done
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Full Name *" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  autoComplete="name"
                  placeholder="Your name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={fieldClass}
                />
              </Field>

              <Field id="email" label="Email Address *" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateField}
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={fieldClass}
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="phone" label="Phone / WhatsApp">
                <div className="relative">
                  <Phone
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                  />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={updateField}
                    autoComplete="tel"
                    placeholder="Your contact number"
                    className={`${fieldClass} pl-10`}
                  />
                </div>
              </Field>

              <Field
                id="service"
                label="Service Required *"
                error={errors.service}
              >
                <div className="relative">
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={updateField}
                    aria-invalid={Boolean(errors.service)}
                    aria-describedby={
                      errors.service ? "service-error" : undefined
                    }
                    className={`${fieldClass} appearance-none bg-[#1c1d19] pr-10`}
                  >
                    <option value="">Choose a service</option>
                    {serviceOptions.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
                  />
                </div>
              </Field>
            </div>

            {/* Property type: animated chips (same options as before) */}
            <div>
              <p
                id="property-label"
                className="mb-2 block text-sm text-white/75"
              >
                Property Type
              </p>
              <LayoutGroup id="property-chips">
                <div
                  role="radiogroup"
                  aria-labelledby="property-label"
                  className="flex flex-wrap gap-2"
                >
                  {propertyTypes.map((type) => {
                    const active = form.property === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => selectProperty(type)}
                        className={`relative rounded-full border px-4 py-2.5 text-xs outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#D6FF63]/60 sm:text-sm ${
                          active
                            ? "border-transparent font-medium text-[#151614]"
                            : "border-white/15 text-white/65 hover:border-white/40 hover:text-white"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="property-active-chip"
                            transition={
                              reduceMotion
                                ? { duration: 0 }
                                : {
                                    type: "spring",
                                    stiffness: 380,
                                    damping: 30,
                                  }
                            }
                            className="absolute inset-0 rounded-full bg-[#D6FF63]"
                          />
                        )}
                        <span className="relative z-10">{type}</span>
                      </button>
                    );
                  })}
                </div>
              </LayoutGroup>
            </div>

            <Field
              id="message"
              label="Project Details *"
              error={errors.message}
            >
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={updateField}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                placeholder="Describe the space, approximate size, location and the finish you want..."
                className={`${fieldClass} resize-y leading-6`}
              />
            </Field>

            <motion.button
              type="submit"
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#D6FF63] px-6 py-4 text-sm font-semibold text-[#151614] shadow-[0_0_40px_-10px_rgba(214,255,99,0.7)] transition-colors hover:bg-white"
            >
              <span
                aria-hidden
                className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/50 blur-md transition-transform duration-700 group-hover:translate-x-[520%]"
              />
              <span className="relative">Send Enquiry via WhatsApp</span>
              <Send
                size={16}
                className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1"
              />
            </motion.button>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  role="status"
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="flex items-start gap-3 rounded-xl border border-[#D6FF63]/25 bg-[#D6FF63]/[0.06] p-4"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 14,
                      delay: 0.15,
                    }}
                    className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#D6FF63] text-[#151614]"
                  >
                    <Check size={14} strokeWidth={3} />
                  </motion.span>
                  <div>
                    <p className="text-sm font-medium text-[#D6FF63]">
                      WhatsApp enquiry prepared.
                    </p>
                    <p className="mt-1 text-xs leading-6 text-white/55">
                      WhatsApp should open with your details. Review the message
                      and press Send there to submit your enquiry.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </section>

      {/* ========================= CLOSING CTA ========================= */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#D6FF63]/[0.12] via-white/[0.03] to-transparent p-7 sm:p-10 md:flex-row md:items-center md:justify-between"
        >
          <motion.span
            aria-hidden
            animate={reduceMotion ? undefined : { x: ["-120%", "420%"] }}
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

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D6FF63]">
              Still Exploring?
            </p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              Find the right finish for your project.
            </h2>
          </div>

          <motion.div
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="relative w-fit shrink-0"
          >
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-6 py-3.5 text-sm font-medium backdrop-blur transition-colors hover:border-[#D6FF63] hover:text-[#D6FF63]"
            >
              Browse Services
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
