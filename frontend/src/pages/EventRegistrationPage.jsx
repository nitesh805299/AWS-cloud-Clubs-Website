import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building,
  CalendarDays,
  CheckCircle2,
  Clock,
  Download,
  GraduationCap,
  Hash,
  Home,
  Loader2,
  Mail,
  MapPin,
  Printer,
  Ticket,
  User,
  Users,
} from "lucide-react";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useAuth } from "../context/AuthContext";

const branches = [
  "Computer Science and Engineering",
  "Computer Science",
  "Information Technology",
  "CSE - AI/ML",
  "CSE - Data Science",
  "Electronics and Communication",
  "Electrical and Electronics",
  "Mechanical Engineering",
  "Civil Engineering",
  "Other",
];

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

function EventRegistrationPage() {
  const { eventId } = useParams();
  const { user, token, isAuthenticated } = useAuth();

  const [event, setEvent] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [eventError, setEventError] = useState("");

  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    studentNumber: "",
    branch: "",
    year: "",
    residenceType: "Day Scholar",
    whyInterested: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(null);

  // Auto-fill student profile information if authenticated
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        studentName: prev.studentName || user.name || "",
        email: prev.email || user.email || "",
        studentNumber: prev.studentNumber || user.studentNumber || "",
        branch: prev.branch || user.branch || "",
      }));
    }
  }, [user]);

  // Query MongoDB backend to verify if currently logged-in student has already registered
  useEffect(() => {
    const checkBackendRegistration = async () => {
      if (!eventId || !token) return;
      try {
        const res = await fetch("http://localhost:5000/api/registrations/my-registrations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok && data.success && Array.isArray(data.data)) {
          const matched = data.data.find(
            (reg) => (reg.eventId?._id || reg.eventId) === eventId
          );
          if (matched) {
            setRegistrationSuccess(matched);
          }
        }
      } catch (err) {
        console.error("Error querying backend registrations:", err);
      }
    };

    checkBackendRegistration();
  }, [eventId, token]);

  
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoadingEvent(true);
        setEventError("");

        const response = await fetch(`http://localhost:5000/api/events/${eventId}`);
        const data = await response.json();

        if (response.ok && data.success) {
          setEvent(data.data);
        } else {
          setEventError(data.message || "Event not found");
        }
      } catch (err) {
        console.error("Error fetching event:", err);
        setEventError("Unable to connect to the backend server. Make sure it is running on port 5000.");
      } finally {
        setLoadingEvent(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Basic frontend checks
    if (!formData.studentName.trim() || !formData.email.trim() || !formData.studentNumber.trim()) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (!formData.branch || !formData.year) {
      setErrorMessage("Please select your Branch and Year of study.");
      return;
    }

    try {
      setSubmitting(true);

      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`http://localhost:5000/api/events/${eventId}/register`, {
        method: "POST",
        headers,
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.status === 201) {
        // Direct state update with real MongoDB registration record and ticket QR
        setRegistrationSuccess(result.data);
        return;
      }

      if (response.status === 409) {
        if (result.isAlreadyRegistered && result.data) {
          setRegistrationSuccess(result.data);
        } else {
          setErrorMessage(result.message || "You are already registered for this event.");
        }
        return;
      }

      setErrorMessage(result.message || "Registration failed. Please check your information.");
    } catch (err) {
      console.error("Registration error:", err);
      setErrorMessage("Failed to submit registration. Please ensure the backend server is running.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#010611] text-white">
      <Navbar />

      <main className="relative overflow-hidden px-5 pb-24 pt-32 sm:px-8 lg:px-12 lg:pt-36">
    
        <div className="pointer-events-none absolute inset-0">
          <div className="events-grid absolute inset-0 opacity-20" />
          <div className="absolute left-1/2 top-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/[0.07] blur-[150px]" />
          <div className="absolute right-[-10%] top-[30%] h-[400px] w-[400px] rounded-full bg-[#ff9900]/[0.08] blur-[140px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
        
          <Link
            to="/#events"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-[#ff9900]"
          >
            <ArrowLeft size={16} />
            Back to All Events
          </Link>

       
          {loadingEvent && (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[32px] border border-white/10 bg-white/[0.02] p-12 text-center">
              <Loader2 className="h-10 w-10 animate-spin text-[#ff9900]" />
              <p className="mt-4 text-sm font-semibold text-slate-400">Loading event details from backend...</p>
            </div>
          )}

      
          {!loadingEvent && eventError && (
            <div className="rounded-[32px] border border-red-500/20 bg-red-500/[0.05] p-10 text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
              <h2 className="mt-4 text-2xl font-black text-white">Event Unavailable</h2>
              <p className="mt-2 text-sm text-slate-400">{eventError}</p>
              <Link
                to="/"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#ff9900] px-6 py-3 font-bold text-black"
              >
                Go to Homepage
              </Link>
            </div>
          )}

          {!loadingEvent && registrationSuccess && (
            <section className="relative overflow-hidden rounded-[32px] border border-green-400/30 bg-green-400/[0.04] p-8 text-center shadow-[0_30px_100px_rgba(0,0,0,0.5)] sm:p-12">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-green-400/30 bg-green-400/10 text-green-400">
                <CheckCircle2 size={42} />
              </div>

              <span className="mt-6 inline-block rounded-full border border-green-400/30 bg-green-400/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-green-400">
                Registration Confirmed
              </span>

              <h1 className="mt-4 text-3xl font-black text-white sm:text-4xl">
                You're In, {registrationSuccess.studentName}!
              </h1>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-300">
                Your seat has been successfully reserved for{" "}
                <strong className="text-white">
                  {registrationSuccess.eventTitle || event?.title}
                </strong>
                .
              </p>

              {/* Verified Pass Card with Real QR */}
              <div className="mx-auto mt-8 max-w-md rounded-3xl border border-white/15 bg-black/75 p-6 text-left shadow-2xl backdrop-blur-md sm:p-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#ff9900]">
                    <Ticket size={16} />
                    Official Registration Pass
                  </div>
                  <span className="rounded-full bg-green-500/20 px-2.5 py-0.5 text-[11px] font-bold text-green-400">
                    {registrationSuccess.verificationStatus || "VERIFIED"}
                  </span>
                </div>

                
                {registrationSuccess.ticketQrCode && (
                  <div className="my-6 flex flex-col items-center justify-center rounded-2xl bg-white p-4">
                    <img
                      src={registrationSuccess.ticketQrCode}
                      alt={`QR pass for ${registrationSuccess.registrationId}`}
                      className="h-52 w-52 object-contain"
                    />
                    <p className="mt-2 text-[11px] font-mono font-bold uppercase tracking-wider text-black">
                      {registrationSuccess.registrationId}
                    </p>
                  </div>
                )}

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Registration Tracking ID
                    </p>
                    <p className="font-mono text-xl font-black tracking-wider text-[#ff9900]">
                      {registrationSuccess.registrationId}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Student Roll No</p>
                      <p className="font-semibold text-white">{registrationSuccess.studentNumber}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Branch</p>
                      <p className="font-semibold text-white">{registrationSuccess.branch || "CSIT"}</p>
                    </div>
                  </div>

                  <div className="pt-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Venue</p>
                    <p className="font-semibold text-white">
                      {registrationSuccess.venue || event?.venue || "AKGEC Campus"}
                    </p>
                  </div>

                  <div className="pt-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Date & Time</p>
                    <p className="font-semibold text-white">
                      {registrationSuccess.eventDate || event?.date} • {event?.startTime ? `${event.startTime} - ${event.endTime || event.endtime}` : "Scheduled Time"}
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-blue-400/20 bg-blue-500/10 p-3 text-xs text-blue-200">
                  💡 Present this ticket QR code on your phone when checking in at the event venue.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                {registrationSuccess.ticketQrCode && (
                  <a
                    href={registrationSuccess.ticketQrCode}
                    download={`Pass_${registrationSuccess.registrationId}.png`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff9900] px-6 py-3.5 text-sm font-black text-black transition hover:bg-[#ffad32]"
                  >
                    <Download size={16} />
                    Download Ticket QR
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/20"
                >
                  <Printer size={16} />
                  Print Pass
                </button>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-black/50 px-6 py-3.5 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  Back to Homepage
                </Link>
              </div>
            </section>
          )}

          {/* Registration Form State */}
          {!loadingEvent && event && !registrationSuccess && (
            <div className="space-y-8">
              {/* Event Header Banner */}
              <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#07101e]/90 p-7 shadow-2xl backdrop-blur-xl sm:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-[#ff9900]/30 bg-[#ff9900]/10 px-3.5 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#ffad32]">
                    {event.category || "Workshop"}
                  </span>
                  {event.isRegistrationOpen ? (
                    <span className="rounded-full border border-green-400/30 bg-green-400/10 px-3.5 py-1 text-xs font-bold text-green-400">
                      Seats Open
                    </span>
                  ) : (
                    <span className="rounded-full border border-red-400/30 bg-red-400/10 px-3.5 py-1 text-xs font-bold text-red-400">
                      Registration Closed
                    </span>
                  )}
                </div>

                <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-5xl">
                  {event.title}
                </h1>

                <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                  {event.description}
                </p>

             
                <div className="mt-7 flex flex-wrap gap-3 text-sm text-slate-200">
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2">
                    <CalendarDays className="text-[#ff9900]" size={16} />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2">
                    <Clock className="text-blue-400" size={16} />
                    {event.startTime} - {event.endTime || event.endtime}
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2">
                    <MapPin className="text-purple-400" size={16} />
                    {event.venue}
                  </div>
                  {event.capacity && (
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2">
                      <Users className="text-cyan-400" size={16} />
                      {event.remainingSeats !== undefined
                        ? `${event.remainingSeats} / ${event.capacity} Seats Available`
                        : `${event.capacity} Capacity`}
                    </div>
                  )}
                </div>
              </section>

              {/* Registration Form Card */}
              <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#07101e]/80 p-7 shadow-2xl backdrop-blur-xl sm:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl font-black text-white sm:text-3xl">
                    Register for this Event
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Fill in your verified student details. Registrations are linked to your official roll number.
                  </p>
                </div>

                {errorMessage && (
                  <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                    <AlertCircle className="mt-0.5 shrink-0 text-red-400" size={18} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                          type="text"
                          name="studentName"
                          value={formData.studentName}
                          onChange={handleChange}
                          placeholder="e.g. Aarav Sharma"
                          required
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-[#ff9900] focus:outline-none focus:ring-1 focus:ring-[#ff9900]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                        Student Number *
                      </label>
                      <div className="relative">
                        <Hash className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                          type="text"
                          name="studentNumber"
                          value={formData.studentNumber}
                          onChange={handleChange}
                          placeholder="e.g. 2200270"
                          required
                          className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-[#ff9900] focus:outline-none focus:ring-1 focus:ring-[#ff9900]"
                        />
                      </div>
                    </div>
                  </div>

                
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                      College Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="yourname@akgec.ac.in"
                        required
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-[#ff9900] focus:outline-none focus:ring-1 focus:ring-[#ff9900]"
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-slate-500">
                      Must be your official college email domain (@akgec.ac.in).
                    </p>
                  </div>

                
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                        Branch *
                      </label>
                      <div className="relative">
                        <GraduationCap className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <select
                          name="branch"
                          value={formData.branch}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-white/10 bg-[#07101e] py-3.5 pl-11 pr-4 text-sm text-white focus:border-[#ff9900] focus:outline-none focus:ring-1 focus:ring-[#ff9900]"
                        >
                          <option value="">Select your branch</option>
                          {branches.map((b) => (
                            <option key={b} value={b} className="bg-[#07101e] text-white">
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                        Year of Study *
                      </label>
                      <div className="relative">
                        <CalendarDays className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <select
                          name="year"
                          value={formData.year}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-white/10 bg-[#07101e] py-3.5 pl-11 pr-4 text-sm text-white focus:border-[#ff9900] focus:outline-none focus:ring-1 focus:ring-[#ff9900]"
                        >
                          <option value="">Select your year</option>
                          {years.map((y) => (
                            <option key={y} value={y} className="bg-[#07101e] text-white">
                              {y}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

               
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                      Are you a Day Scholar or Hosteler? *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {["Day Scholar", "Hosteler"].map((type) => (
                        <label
                          key={type}
                          className={`flex cursor-pointer items-center justify-center gap-3 rounded-xl border p-4 text-sm font-semibold transition ${
                            formData.residenceType === type
                              ? "border-[#ff9900] bg-[#ff9900]/10 text-[#ffad32]"
                              : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20"
                          }`}
                        >
                          <input
                            type="radio"
                            name="residenceType"
                            value={type}
                            checked={formData.residenceType === type}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          {type === "Day Scholar" ? <Home size={18} /> : <Building size={18} />}
                          <span>{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                 
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                      Why are you interested in this event?
                    </label>
                    <textarea
                      name="whyInterested"
                      rows={3}
                      value={formData.whyInterested}
                      onChange={handleChange}
                      placeholder="Briefly tell us what you hope to learn or build..."
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white placeholder-slate-500 focus:border-[#ff9900] focus:outline-none focus:ring-1 focus:ring-[#ff9900]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group relative flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#ff5f1f] to-[#ff9900] py-4 text-base font-black text-black shadow-[0_12px_35px_rgba(255,153,0,0.25)] transition duration-300 hover:shadow-[0_16px_45px_rgba(255,153,0,0.35)] disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Verifying & Reserving Seat in Database...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm Registration & Get Ticket Pass</span>
                        <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={18} />
                      </>
                    )}
                  </button>
                </form>
              </section>
            </div>
          )}
        </div>
      </main>

      <Footer showJoinCTA={false} />
    </div>
  );
}

export default EventRegistrationPage;
