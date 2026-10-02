import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarDays,
  FaClock,
  FaDownload,
  FaLocationDot,
  FaQrcode,
  FaRegCalendarCheck,
  FaUsers,
  FaXmark,
} from "react-icons/fa6";
import { AlertCircle, CheckCircle2, Loader2, RefreshCw, Ticket, Users } from "lucide-react";

import eventPlaceholder from "../../assets/events/event-placeholder.jpg";
import { useAuth } from "../../context/AuthContext";

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

function UpcomingEventCard({ event, index, onOpenEventQr, onOpenTicketQr, userRegistration }) {
  const eventId = event._id || event.id;
  const eventImage = event.bannerUrl || eventPlaceholder;
  const eventTime =
    event.time ||
    (event.startTime && (event.endTime || event.endtime)
      ? `${event.startTime} - ${event.endTime || event.endtime}`
      : "To Be Announced");
  const eventLocation = event.venue || event.location || "AKGEC, Ghaziabad";

  // Check if registration is open & seats are available
  const isAvailable =
    event.isRegistrationOpen !== false &&
    (event.remainingSeats === undefined || event.remainingSeats > 0);

  // Check if current user in MongoDB has registered for this event
  const registrationRecord = userRegistration || null;
  const isRegistered = !!registrationRecord;

  return (
    <article className="event-upcoming-card group relative min-h-[470px] overflow-hidden rounded-[28px] border border-white/10 bg-[#020713]">
      {/* Background image */}
      <img
        src={eventImage}
        alt={event.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
      />

      {/* Readability overlays */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#010611] via-[#010611]/75 to-black/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#010611]/70 via-[#010611]/15 to-transparent" />

      {/* Glass shine */}
      <div className="event-card-shine pointer-events-none absolute inset-0 z-[2]" />

      {/* Top information */}
      <div className="relative z-10 flex items-start justify-between p-6 sm:p-8">
        <div className="flex items-center gap-2">
          {isRegistered ? (
            <div className="flex items-center gap-2 rounded-full border border-green-400/40 bg-green-500/20 px-4 py-2">
              <CheckCircle2 size={14} className="text-green-400" />
              <span className="text-xs font-black uppercase tracking-[0.18em] text-green-400">
                You're Registered
              </span>
            </div>
          ) : isAvailable ? (
            <div className="flex items-center gap-2 rounded-full border border-[#ff9900]/35 bg-black/55 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#ff9900] shadow-[0_0_12px_rgba(255,153,0,1)]" />
              <span className="text-xs font-black uppercase tracking-[0.18em] text-[#ffad32]">
                Registration Open
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-full border border-red-400/35 bg-black/55 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-red-400" />
              <span className="text-xs font-black uppercase tracking-[0.18em] text-red-400">
                Closed
              </span>
            </div>
          )}
        </div>

        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/55 text-sm font-black text-white">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-blue-300">
          {event.category || "Cloud Workshop"}
        </p>

        <h3 className="mt-3 max-w-xl text-3xl font-black leading-tight tracking-[-0.035em] text-white sm:text-4xl">
          {event.title}
        </h3>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
          {event.description}
        </p>

        {/* Event details metadata */}
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-4 py-2 text-sm text-slate-200">
            <FaCalendarDays className="text-[#ff9900]" />
            {event.date}
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-4 py-2 text-sm text-slate-200">
            <FaClock className="text-blue-400" />
            {eventTime}
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-4 py-2 text-sm text-slate-200">
            <FaLocationDot className="text-purple-400" />
            {eventLocation}
          </div>

          {event.capacity && (
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-4 py-2 text-sm text-slate-200">
              <Users size={15} className="text-cyan-400" />
              <span>
                {event.remainingSeats !== undefined
                  ? `${event.remainingSeats} / ${event.capacity} Seats Left`
                  : `${event.capacity} Capacity`}
              </span>
            </div>
          )}
        </div>

        {/* Dynamic Action Buttons */}
        <div className="mt-7 flex flex-wrap gap-3">
          {isRegistered ? (
            <>
              <Link
                to={`/events/${eventId}/register`}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-green-500/40 bg-green-500/15 px-6 py-3.5 font-black text-green-400 transition hover:bg-green-500/25"
              >
                <CheckCircle2 size={18} />
                Registered
              </Link>

              <button
                type="button"
                onClick={() => onOpenTicketQr(registrationRecord, event)}
                className="group/button inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#ff9900] px-6 py-3.5 font-black text-black transition duration-300 hover:-translate-y-1 hover:bg-[#ffad32] hover:shadow-[0_14px_35px_rgba(255,153,0,0.25)]"
              >
                <Ticket size={18} />
                View Ticket QR
              </button>
            </>
          ) : isAvailable ? (
            <>
              <Link
                to={`/events/${eventId}/register`}
                className="group/button inline-flex items-center justify-center gap-3 rounded-xl bg-[#ff9900] px-6 py-3.5 font-black text-black transition duration-300 hover:-translate-y-1 hover:bg-[#ffad32] hover:shadow-[0_14px_35px_rgba(255,153,0,0.25)]"
              >
                Register Now
                <FaArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
              </Link>

              <button
                type="button"
                onClick={() => onOpenEventQr(event)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-black/50 px-5 py-3.5 font-bold text-white transition duration-300 hover:-translate-y-1 hover:border-[#ff9900]/50 hover:bg-[#ff9900]/10"
              >
                <FaQrcode className="text-[#ff9900]" />
                Event QR
              </button>
            </>
          ) : (
            <>
              <button
                disabled
                className="inline-flex cursor-not-allowed items-center justify-center rounded-xl border border-white/10 bg-slate-800 px-6 py-3.5 font-bold text-slate-400"
              >
                Registration Closed
              </button>

              <button
                type="button"
                onClick={() => onOpenEventQr(event)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-black/50 px-5 py-3.5 font-bold text-white transition hover:bg-white/10"
              >
                <FaQrcode className="text-[#ff9900]" />
                Event QR
              </button>
            </>
          )}
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
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          draggable="false"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010611]/85 via-transparent to-black/10" />
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white">
          {event.category}
        </span>
        <div className="event-small-card-shine pointer-events-none absolute inset-0" />
      </div>

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

      <div className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-blue-500 via-[#ff9900] to-purple-500 transition-all duration-500 group-hover:w-full" />
    </article>
  );
}

function Events() {
  const sliderRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { token, isAuthenticated } = useAuth();

  // Dynamic API state
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventsError, setEventsError] = useState("");
  const [myRegistrationsMap, setMyRegistrationsMap] = useState({});

  // Modals state
  const [selectedEventForQr, setSelectedEventForQr] = useState(null);
  const [eventQrImage, setEventQrImage] = useState("");
  const [loadingEventQr, setLoadingEventQr] = useState(false);

  const [selectedTicketPass, setSelectedTicketPass] = useState(null);

  // Fetch upcoming events from backend
  const fetchUpcomingEvents = async () => {
    try {
      setLoadingEvents(true);
      setEventsError("");

      const res = await fetch("http://localhost:5000/api/events");
      const json = await res.json();

      if (res.ok && json.success && Array.isArray(json.data)) {
        setUpcomingEvents(json.data);
      } else {
        setEventsError(json.message || "Failed to load events.");
      }
    } catch (err) {
      console.error("Backend error:", err);
      setEventsError("Unable to connect to backend server at http://localhost:5000.");
    } finally {
      setLoadingEvents(false);
    }
  };

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  // Fetch current student registrations directly from MongoDB
  useEffect(() => {
    const fetchMyRegistrations = async () => {
      if (!token) {
        setMyRegistrationsMap({});
        return;
      }
      try {
        const res = await fetch("http://localhost:5000/api/registrations/my-registrations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json();
        if (res.ok && json.success && Array.isArray(json.data)) {
          const map = {};
          json.data.forEach((reg) => {
            const eId = reg.eventId?._id || reg.eventId;
            if (eId) map[eId] = reg;
          });
          setMyRegistrationsMap(map);
        }
      } catch (err) {
        console.error("Error fetching registrations from backend:", err);
      }
    };

    fetchMyRegistrations();
  }, [token]);

  // Open Event Registration QR (for posters & sharing)
  const handleOpenEventQr = async (event) => {
    setSelectedEventForQr(event);
    setLoadingEventQr(true);
    setEventQrImage("");

    const eventId = event._id || event.id;
    try {
      const res = await fetch(`http://localhost:5000/api/events/${eventId}/qrcode`);
      const json = await res.json();
      if (res.ok && json.success) {
        setEventQrImage(json.data.qrCodeImage);
      }
    } catch (err) {
      console.error("Error fetching event QR:", err);
    } finally {
      setLoadingEventQr(false);
    }
  };

  // Open Ticket Pass QR (personal verified pass)
  const handleOpenTicketQr = (registrationData, event) => {
    setSelectedTicketPass({
      ...registrationData,
      eventTitle: event.title,
      eventDate: event.date,
      venue: event.venue,
    });
  };

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
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: 380, behavior: "smooth" });
      }
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [isHovered]);

  return (
    <section
      id="events"
      className="relative overflow-hidden bg-[#010611] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      {/* Background decorations */}
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
              Live events automatically synced from the AWS Cloud Club backend database.
            </p>
          </div>

          {/* 1. Loading State */}
          {loadingEvents && (
            <div className="grid gap-6 lg:grid-cols-2">
              {[1, 2].map((n) => (
                <div
                  key={n}
                  className="flex min-h-[470px] animate-pulse flex-col justify-between rounded-[28px] border border-white/10 bg-white/[0.02] p-8"
                >
                  <div className="flex justify-between">
                    <div className="h-7 w-28 rounded-full bg-white/10" />
                    <div className="h-10 w-10 rounded-full bg-white/10" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 w-32 rounded bg-white/10" />
                    <div className="h-8 w-3/4 rounded bg-white/10" />
                    <div className="h-4 w-full rounded bg-white/10" />
                    <div className="h-10 w-44 rounded-xl bg-white/10" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 2. Error State */}
          {!loadingEvents && eventsError && (
            <div className="rounded-[28px] border border-red-500/30 bg-red-500/10 p-8 text-center sm:p-12">
              <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
              <h4 className="mt-4 text-2xl font-black text-white">
                Unable to Load Events
              </h4>
              <p className="mt-2 text-sm text-slate-300">{eventsError}</p>
              <button
                type="button"
                onClick={fetchUpcomingEvents}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#ff9900] px-6 py-3 font-bold text-black transition hover:bg-[#ffad32]"
              >
                <RefreshCw size={16} />
                Retry
              </button>
            </div>
          )}

          {/* 3. Empty Events State */}
          {!loadingEvents && !eventsError && upcomingEvents.length === 0 && (
            <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-12 text-center">
              <FaRegCalendarCheck className="mx-auto text-4xl text-[#ff9900]" />
              <h4 className="mt-4 text-2xl font-black text-white">
                No Upcoming Events Scheduled
              </h4>
              <p className="mt-2 text-sm text-slate-400">
                New cloud workshops and hackathons are being planned by the AWS Cloud Club team. Check back soon!
              </p>
            </div>
          )}

          {/* 4. Dynamic Events Grid */}
          {!loadingEvents && !eventsError && upcomingEvents.length > 0 && (
            <div className="grid gap-6 lg:grid-cols-2">
              {upcomingEvents.map((event, index) => (
                <UpcomingEventCard
                  key={event._id || event.id}
                  event={event}
                  index={index}
                  onOpenEventQr={handleOpenEventQr}
                  onOpenTicketQr={handleOpenTicketQr}
                  userRegistration={myRegistrationsMap[event._id || event.id]}
                />
              ))}
            </div>
          )}
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
        </div>

        {/* Statistics Bar */}
        <div className="mt-20 grid overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.025] sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: String(upcomingEvents.length).padStart(2, "0"), label: "Upcoming Events", icon: FaCalendarDays },
            { value: "04", label: "Previous Events", icon: FaRegCalendarCheck },
            { value: "06", label: "Technical Domains", icon: FaUsers },
            { value: "01", label: "Growing Community", icon: FaUsers },
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
                <p className="mt-4 text-4xl font-black text-white">{stat.value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal 1: Event Registration Share QR */}
      {selectedEventForQr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-[32px] border border-white/15 bg-[#07101e] p-7 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedEventForQr(null)}
              className="absolute right-5 top-5 rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <FaXmark size={20} />
            </button>

            <span className="inline-block rounded-full border border-[#ff9900]/30 bg-[#ff9900]/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#ffad32]">
              Event Registration QR
            </span>

            <h3 className="mt-3 text-2xl font-black text-white">
              {selectedEventForQr.title}
            </h3>

            <p className="mt-2 text-xs text-slate-400">
              Scan to open the registration page directly on any phone camera.
            </p>

            <div className="my-6 flex min-h-[220px] items-center justify-center rounded-2xl bg-white p-4">
              {loadingEventQr ? (
                <div className="flex items-center gap-2 text-sm font-bold text-black">
                  <Loader2 className="animate-spin" size={18} />
                  Generating QR Code...
                </div>
              ) : eventQrImage ? (
                <img
                  src={eventQrImage}
                  alt={`QR code for ${selectedEventForQr.title}`}
                  className="h-56 w-56 object-contain"
                />
              ) : (
                <p className="text-sm font-semibold text-slate-600">
                  Unable to generate QR code.
                </p>
              )}
            </div>

            <div className="flex gap-3">
              {eventQrImage && (
                <a
                  href={eventQrImage}
                  download={`${selectedEventForQr.title.replace(/\s+/g, "_")}_QR.png`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#ff9900] py-3 text-sm font-black text-black transition hover:bg-[#ffad32]"
                >
                  <FaDownload />
                  Download QR
                </a>
              )}
              <button
                type="button"
                onClick={() => setSelectedEventForQr(null)}
                className="flex-1 rounded-xl border border-white/15 bg-white/5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Student Verified Ticket Pass QR */}
      {selectedTicketPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-5 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-[32px] border border-green-500/30 bg-[#07101e] p-7 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedTicketPass(null)}
              className="absolute right-5 top-5 rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <FaXmark size={20} />
            </button>

            <span className="inline-block rounded-full border border-green-400/30 bg-green-500/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-green-400">
              Verified Ticket Pass
            </span>

            <h3 className="mt-3 text-2xl font-black text-white">
              {selectedTicketPass.studentName}
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              {selectedTicketPass.eventTitle}
            </p>

            <div className="my-5 flex min-h-[220px] items-center justify-center rounded-2xl bg-white p-4">
              {selectedTicketPass.ticketQrCode ? (
                <img
                  src={selectedTicketPass.ticketQrCode}
                  alt={`Ticket QR for ${selectedTicketPass.registrationId}`}
                  className="h-56 w-56 object-contain"
                />
              ) : (
                <div className="text-center text-slate-800">
                  <FaQrcode size={48} className="mx-auto text-slate-700" />
                  <p className="mt-2 text-xs font-bold font-mono">
                    {selectedTicketPass.registrationId}
                  </p>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-left text-xs space-y-1.5 mb-5">
              <div className="flex justify-between">
                <span className="text-slate-400">Registration ID:</span>
                <span className="font-mono font-bold text-[#ff9900]">{selectedTicketPass.registrationId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Roll Number:</span>
                <span className="font-semibold text-white">{selectedTicketPass.studentNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="font-semibold text-green-400">VERIFIED</span>
              </div>
            </div>

            <div className="flex gap-3">
              {selectedTicketPass.ticketQrCode && (
                <a
                  href={selectedTicketPass.ticketQrCode}
                  download={`Ticket_${selectedTicketPass.registrationId}.png`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#ff9900] py-3 text-sm font-black text-black transition hover:bg-[#ffad32]"
                >
                  <FaDownload />
                  Download Ticket QR
                </a>
              )}
              <button
                type="button"
                onClick={() => setSelectedTicketPass(null)}
                className="flex-1 rounded-xl border border-white/15 bg-white/5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Events;