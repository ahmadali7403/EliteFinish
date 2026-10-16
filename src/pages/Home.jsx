import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, MoveUpRight } from "lucide-react";

import {
  ServicesSection,
  WhyChooseUs,
  ProjectPreview,
  ProcessSection,
  FAQSection,
  FinalCTA,
} from "../components/home/HomeSections";

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <section className="relative flex min-h-[780px] items-center px-5 py-24 sm:min-h-[820px] sm:px-10 lg:min-h-[calc(100svh-80px)] lg:px-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=90"
            alt="Elegant contemporary living space"
            fetchPriority="high"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#151614]/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#151614] via-[#151614]/75 to-[#151614]/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151614] via-transparent to-[#151614]/20" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl"
          >
            <div className="mb-8 flex items-center gap-3">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#D6FF63]" />
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/75 sm:text-sm">
                Painting · Finishing · Transformation
              </p>
            </div>

            <h1 className="display-font text-5xl font-medium leading-[1.04] tracking-[-0.06em] sm:text-7xl lg:text-[100px]">
              Make room
              <br />
              for <span className="text-[#D6FF63]">better.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              Thoughtful painting and refined finishes for spaces that deserve a
              fresh perspective.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-[#D6FF63] px-6 py-4 text-sm font-semibold text-[#151614] transition hover:bg-white"
              >
                Discuss your project
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/[0.04] px-6 py-4 text-sm font-medium text-white backdrop-blur-sm transition hover:border-[#D6FF63] hover:text-[#D6FF63]"
              >
                Discover our services
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
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
              <ArrowDown
                size={16}
                className="transition-transform group-hover:translate-y-1"
              />
            </a>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-28 right-10 hidden xl:block">
          <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-black/20 p-4 backdrop-blur-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D6FF63] text-[#151614]">
              <MoveUpRight size={19} />
            </div>
            <div>
              <p className="text-sm font-medium">Your space, reimagined.</p>
              <p className="mt-1 text-xs text-white/50">
                Start with a conversation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO STRIP */}
      <section className="border-b border-white/10 px-5 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-white/45">
            A considered approach to every surface
          </p>
          <Link
            to="/about"
            className="group inline-flex items-center gap-2 text-sm text-[#D6FF63]"
          >
            Meet Elite Finish
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </section>

      {/* ALL HOME SECTIONS */}
      <div id="services">
        <ServicesSection />
      </div>

      <WhyChooseUs />

      <ProjectPreview />

      <ProcessSection />

      <FAQSection />

      <FinalCTA />
    </main>
  );
}
