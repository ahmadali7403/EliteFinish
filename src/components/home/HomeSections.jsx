import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  Layers3,
  Paintbrush,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from "lucide-react";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const services = [
  {
    number: "01",
    icon: Paintbrush,
    title: "Interior Painting",
    description:
      "Refresh your rooms with considered colours and a clean, consistent finish.",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=900&q=85",
  },
  {
    number: "02",
    icon: Layers3,
    title: "Exterior Painting",
    description:
      "Give your property's exterior a renewed look with careful preparation and finishing.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=85",
  },
  {
    number: "03",
    icon: WandSparkles,
    title: "Surface Preparation",
    description:
      "Create a better foundation with attention to surface condition before painting.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=85",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Decorative Finishes",
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

export function SectionHeading({ eyebrow, title, text, centered = false }) {
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-2xl`}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#D6FF63]">
        {eyebrow}
      </p>
      <h2 className="display-font text-4xl font-medium leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {text && <p className="mt-5 max-w-xl leading-7 text-white/60">{text}</p>}
    </div>
  );
}

export function ServicesSection() {
  return (
    <section className="px-5 py-24 sm:px-10 lg:px-16 lg:py-32">
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
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.number}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={`${service.title} visual reference`}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151614]/70 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-xs text-white/80 backdrop-blur">
                    {service.number}
                  </span>
                </div>

                <div className="p-6">
                  <Icon className="mb-5 text-[#D6FF63]" size={23} />
                  <h3 className="display-font text-xl">{service.title}</h3>
                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/55">
                    {service.description}
                  </p>
                  <Link
                    to="/contact"
                    className="mt-5 inline-flex items-center gap-2 text-sm text-[#D6FF63] transition group-hover:gap-3"
                  >
                    Enquire <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.article>
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

export function WhyChooseUs() {
  return (
    <section className="border-y border-white/[0.07] bg-[#1C1D19] px-5 py-24 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
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
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm transition hover:border-[#D6FF63] hover:text-[#D6FF63]"
          >
            Get to know us <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="space-y-4">
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="flex gap-5 rounded-2xl border border-white/10 p-6 sm:p-7"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D6FF63]/10 text-[#D6FF63]">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="display-font text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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
    <section className="px-5 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Visual direction"
            title={
              <>
                See the potential
                <br />
                in every space.
              </>
            }
            text="A look at the kind of clean, considered spaces that can inspire your next project."
          />
          <Link
            to="/projects"
            className="group inline-flex w-fit items-center gap-2 text-sm text-[#D6FF63]"
          >
            Explore gallery
            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-12 md:items-start">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className={`group ${project.className}`}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white/5">
                <img
                  src={project.image}
                  alt={project.label}
                  loading="lazy"
                  className="h-[300px] w-full object-cover transition duration-700 group-hover:scale-[1.035] sm:h-[390px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[#D6FF63]">
                      {project.label}
                    </p>
                    <h3 className="display-font mt-2 text-2xl sm:text-3xl">
                      {project.title}
                    </h3>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/20 transition group-hover:border-[#D6FF63] group-hover:bg-[#D6FF63] group-hover:text-[#151614]">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-5 text-xs leading-5 text-white/35">
          These are inspiration images only. Replace them with actual project
          photos before presenting this gallery as completed work.
        </p>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="bg-[#D6FF63] px-5 py-24 text-[#151614] sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-black/60">
              How it works
            </p>
            <h2 className="display-font text-4xl font-medium leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              From first idea
              <br />
              to final detail.
            </h2>
            <p className="mt-5 max-w-md leading-7 text-black/65">
              A clear process helps everyone understand the scope, expectations
              and next steps.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#151614] px-6 py-4 text-sm font-semibold text-white transition hover:bg-black/80"
            >
              Start an enquiry <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="divide-y divide-black/15">
            {process.map((item, index) => (
              <motion.div
                key={item.number}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="grid grid-cols-[48px_1fr] gap-4 py-6 sm:grid-cols-[64px_1fr] sm:gap-6"
              >
                <span className="display-font pt-1 text-sm text-black/50">
                  {item.number}
                </span>
                <div>
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
    </section>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="px-5 py-24 sm:px-10 lg:px-16 lg:py-32">
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

        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question} className="py-1">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 py-5 text-left sm:py-6"
                >
                  <span className="display-font text-lg sm:text-xl">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-[#D6FF63] transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 pr-8 text-sm leading-7 text-white/55">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="px-5 pb-24 sm:px-10 lg:px-16 lg:pb-32">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-[#20211D] px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
        <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-[#D6FF63]/10 blur-3xl" />

        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs uppercase tracking-[0.24em] text-[#D6FF63]">
              Your next project starts here
            </p>
            <h2 className="display-font text-4xl leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
              Ready for a
              <br />
              fresh perspective?
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-white/60">
              Tell us about your space, your ideas and the finish you have in
              mind.
            </p>
          </div>

          <Link
            to="/contact"
            className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#D6FF63] px-6 py-4 text-sm font-semibold text-[#151614] transition hover:bg-white"
          >
            Let's talk
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
