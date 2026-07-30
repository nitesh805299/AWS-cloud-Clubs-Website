import { useEffect, useRef, useState } from "react";

import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarDays,
  FaClock,
  FaLocationDot,
  FaRegCalendarCheck,
  FaUsers,
} from "react-icons/fa6";

import eventPlaceholder from "../../assets/events/event-placeholder.jpg";

const upcomingEvents = [
  {
    id: 1,
    title: "AWS Cloud Fundamentals",
    category: "Cloud Workshop",
    date: "Coming Soon",
    time: "To Be Announced",
    location: "AKGEC, Ghaziabad",
    description:
      "Explore the fundamentals of cloud computing and understand how modern applications are built using AWS services.",
    image: eventPlaceholder,
    registrationLink: "#join",
  },
  {
    id: 2,
    title: "Build and Deploy with AWS",
    category: "Hands-on Bootcamp",
    date: "Coming Soon",
    time: "To Be Announced",
    location: "AKGEC, Ghaziabad",
    description:
      "Learn how to build, deploy and manage a modern application through practical cloud-based development.",
    image: eventPlaceholder,
    registrationLink: "#join",
  },
];

const previousEvents = [
  {
    id: 1,
    title: "AWS Cloud Club Orientation",
    category: "Orientation",
    date: "Previous Event",
    image: eventPlaceholder,
  },
  {
    id: 2,
    title: "Introduction to Cloud Computing",
    category: "Technical Session",
    date: "Previous Event",
    image: eventPlaceholder,
  },
  {
    id: 3,
    title: "Student Community Meetup",
    category: "Community Event",
    date: "Previous Event",
    image: eventPlaceholder,
  },
  {
    id: 4,
    title: "Technology Awareness Session",
    category: "Seminar",
    date: "Previous Event",
    image: eventPlaceholder,
  },
];

function UpcomingEventCard({ event, index }) {
  return (
    <article className="event-upcoming-card group relative min-h-[470px] overflow-hidden rounded-[28px] border border-white/10 bg-[#020713]">
      {/* Background image */}
      <img
        src={event.image}
        alt={event.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
      />

      {/* Readability overlays */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#010611] via-[#010611]/75 to-black/5" />

      <div className="absolute inset-0 bg-gradient-to-r from-[#010611]/70 via-[#010611]/15 to-transparent" />

      {/* Glass shine only — no blur */}
      <div className="event-card-shine pointer-events-none absolute inset-0 z-[2]" />

      {/* Top information */}
      <div className="relative z-10 flex items-start justify-between p-6 sm:p-8">
        <div className="flex items-center gap-2 rounded-full border border-[#ff9900]/35 bg-black/55 px-4 py-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#ff9900] shadow-[0_0_12px_rgba(255,153,0,1)]" />

          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#ffad32]">
            Upcoming
          </span>
        </div>

        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/55 text-sm font-black text-white">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-blue-300">
          {event.category}
        </p>

        <h3 className="mt-3 max-w-xl text-3xl font-black leading-tight tracking-[-0.035em] text-white sm:text-4xl">
          {event.title}
        </h3>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
          {event.description}
        </p>

        {/* Event details */}
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-4 py-2 text-sm text-slate-200">
            <FaCalendarDays className="text-[#ff9900]" />
            {event.date}
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-4 py-2 text-sm text-slate-200">
            <FaClock className="text-blue-400" />
            {event.time}
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-4 py-2 text-sm text-slate-200">
            <FaLocationDot className="text-purple-400" />
            {event.location}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            href={event.registrationLink}
            className="group/button inline-flex items-center justify-center gap-3 rounded-xl bg-[#ff9900] px-6 py-3.5 font-black text-black transition duration-300 hover:-translate-y-1 hover:bg-[#ffad32] hover:shadow-[0_14px_35px_rgba(255,153,0,0.25)]"
          >
            Register Interest

            <FaArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/15 bg-black/45 px-6 py-3.5 font-bold text-white transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-blue-400/10"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Bottom glowing line */}
      <div className="absolute inset-x-[8%] bottom-0 z-20 h-px bg-gradient-to-r from-transparent via-[#ff9900] to-transparent shadow-[0_0_16px_rgba(255,153,0,0.8)]" />
    </article>
  );
}

function PreviousEventCard({ event }) {
  return (
    <article className="event-netflix-card group relative w-[285px] shrink-0 overflow-hidden rounded-[22px] border border-white/10 bg-[#020713] sm:w-[330px] lg:w-[360px]">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          draggable="false"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Only dark gradient — no blur overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#010611]/85 via-transparent to-black/10" />

        {/* Category badge */}
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white">
          {event.category}
        </span>

        {/* Hover shine */}
        <div className="event-small-card-shine pointer-events-none absolute inset-0" />
      </div>

      {/* Card content */}
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff9900]">
          {event.date}
        </p>

        <h3 className="mt-2 text-xl font-black leading-tight text-white">
          {event.title}
        </h3>

        <button
          type="button"
          className="mt-5 inline-flex items-center gap-3 text-sm font-bold text-blue-300 transition-all duration-300 hover:gap-5 hover:text-[#ff9900]"
        >
          View Details
          <FaArrowRight />
        </button>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-blue-500 via-[#ff9900] to-purple-500 transition-all duration-500 group-hover:w-full" />
    </article>
  );
}

function Events() {
  const sliderRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const scrollSlider = (direction) => {
    const slider = sliderRef.current;

    if (!slider) return;

    slider.scrollBy({
      left: direction === "next" ? 380 : -380,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (isHovered) return undefined;

    const intervalId = window.setInterval(() => {
      const slider = sliderRef.current;

      if (!slider) return;

      const reachedEnd =
        slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 20;

      if (reachedEnd) {
        slider.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        slider.scrollBy({
          left: 380,
          behavior: "smooth",
        });
      }
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [isHovered]);

  return (
    <section
      id="events"
      className="relative overflow-hidden bg-[#010611] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      {/* Section background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="events-grid absolute inset-0 opacity-25" />

        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/[0.07] blur-[150px]" />

        <div className="absolute -left-48 top-[48%] h-[470px] w-[470px] rounded-full bg-purple-600/[0.06] blur-[140px]" />

        <div className="absolute -right-48 bottom-[5%] h-[470px] w-[470px] rounded-full bg-[#ff9900]/[0.06] blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px]">
        {/* Heading */}
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-5 py-2.5">
            <FaRegCalendarCheck className="text-[#ff9900]" />

            <span className="text-sm font-black uppercase tracking-[0.25em] text-slate-200 sm:text-base">
              Explore Our Events
            </span>
          </div>

          <h2 className="mt-7 bg-gradient-to-r from-blue-400 via-purple-400 to-[#ff9900] bg-clip-text text-5xl font-black uppercase leading-none tracking-[-0.055em] text-transparent sm:text-7xl lg:text-[96px]">
            Events
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
            Discover workshops, technical sessions and collaborative
            experiences designed to help students learn, connect and build with
            modern cloud technologies.
          </p>
        </div>

        {/* Upcoming events */}
        <div className="mt-20">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#ff9900]">
                Coming Next
              </p>

              <h3 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                Upcoming Events
              </h3>
            </div>

            <p className="max-w-lg text-sm leading-7 text-slate-500">
              Event schedules and registration details will be announced by the
              AWS Cloud Club team.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {upcomingEvents.map((event, index) => (
              <UpcomingEventCard
                key={event.id}
                event={event}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Previous events */}
        <div className="mt-28">
          <div className="mb-8 flex items-end justify-between gap-5">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-400">
                Our Journey
              </p>

              <h3 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                Previous Events
              </h3>
            </div>

            {/* Slider navigation */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollSlider("previous")}
                aria-label="Previous event"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition duration-300 hover:-translate-y-1 hover:border-[#ff9900]/60 hover:bg-[#ff9900] hover:text-black"
              >
                <FaArrowLeft />
              </button>

              <button
                type="button"
                onClick={() => scrollSlider("next")}
                aria-label="Next event"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition duration-300 hover:-translate-y-1 hover:border-[#ff9900]/60 hover:bg-[#ff9900] hover:text-black"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>

          <div
            ref={sliderRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="events-slider flex gap-5 overflow-x-auto pb-6"
          >
            {previousEvents.map((event) => (
              <PreviousEventCard key={event.id} event={event} />
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-slate-600">
            <span>Swipe or use arrows</span>
            <span>04 Events</span>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-20 grid overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.025] sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              value: "02",
              label: "Upcoming Events",
              icon: FaCalendarDays,
            },
            {
              value: "04",
              label: "Previous Events",
              icon: FaRegCalendarCheck,
            },
            {
              value: "06",
              label: "Technical Domains",
              icon: FaUsers,
            },
            {
              value: "01",
              label: "Growing Community",
              icon: FaUsers,
            },
          ].map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={`p-7 text-center ${
                  index < 3 ? "border-b border-white/10 lg:border-b-0" : ""
                } ${index < 3 ? "lg:border-r lg:border-white/10" : ""}`}
              >
                <Icon className="mx-auto text-xl text-[#ff9900]" />

                <p className="mt-4 text-4xl font-black text-white">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Events;