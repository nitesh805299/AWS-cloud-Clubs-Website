import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Image,
  Loader2,
  MapPin,
  PlusCircle,
  ShieldAlert,
  Users,
} from "lucide-react";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useAuth } from "../context/AuthContext";

const categories = [
  "Cloud Workshop",
  "Hands-on Bootcamp",
  "Technical Seminar",
  "Tech Talk & Panel",
  "Hackathon",
  "Orientation & Meetup",
];

function AdminEventCreatePage() {
  const navigate = useNavigate();
  const { user, token, isTeamMember } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    category: "Cloud Workshop",
    description: "",
    date: "",
    startTime: "02:00 PM",
    endTime: "04:00 PM",
    venue: "Main Seminar Hall, CSIT, AKGEC",
    capacity: 150,
    registrationDeadline: "",
    bannerUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isTeamMember) {
    return (
      <div className="min-h-screen bg-[#010611] text-white">
        <Navbar />
        <main className="flex min-h-[60vh] items-center justify-center px-5 pt-36">
          <div className="max-w-md rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-center">
            <ShieldAlert className="mx-auto h-16 w-16 text-red-400" />
            <h1 className="mt-4 text-2xl font-black text-white">Access Denied</h1>
            <p className="mt-2 text-sm text-slate-300">
              Only authenticated AWS Cloud Club team members and administrators can publish events.
            </p>
            <Link
              to="/login"
              className="mt-6 inline-block rounded-xl bg-[#ff9900] px-6 py-3 text-sm font-bold text-black"
            >
              Sign In as Admin
            </Link>
          </div>
        </main>
        <Footer showJoinCTA={false} />
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.title.trim() || !formData.description.trim() || !formData.date.trim() || !formData.venue.trim()) {
      setError("Please fill in all mandatory event details.");
      return;
    }

    if (!formData.registrationDeadline) {
      setError("Please select a registration deadline.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          capacity: Number(formData.capacity) || 150,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create event");
      }

      setSuccess("Event published successfully to MongoDB! Redirecting to upcoming events...");
      setTimeout(() => {
        navigate("/#events");
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#010611] text-white">
      <Navbar />

      <main className="relative overflow-hidden px-5 pb-24 pt-32 sm:px-8 lg:px-12 lg:pt-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="events-grid absolute inset-0 opacity-20" />
          <div className="absolute left-1/2 top-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/[0.07] blur-[150px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl">
          <Link
            to="/admin/events"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-[#ff9900]"
          >
            <ArrowLeft size={16} />
            Back to Event Management
          </Link>

          <div className="rounded-[32px] border border-white/10 bg-[#07101e]/85 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div>
                <span className="rounded-full border border-[#ff9900]/30 bg-[#ff9900]/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#ffad32]">
                  Organizer Panel
                </span>
                <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                  Create Society Event
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                  Publish a real event directly to the database. It will immediately appear in Upcoming Events.
                </p>
              </div>
            </div>

            {error && (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                <AlertCircle className="mt-0.5 shrink-0 text-red-400" size={18} />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-200">
                <CheckCircle2 className="mt-0.5 shrink-0 text-green-400" size={18} />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* Event Title */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. AWS Cloud Workshop & Architecture Deep Dive"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white placeholder-slate-500 focus:border-[#ff9900] focus:outline-none focus:ring-1 focus:ring-[#ff9900]"
                />
              </div>

              {/* Category & Capacity */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-[#07101e] p-4 text-sm text-white focus:border-[#ff9900] focus:outline-none focus:ring-1 focus:ring-[#ff9900]"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c} className="bg-[#07101e] text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                    Maximum Capacity (Seats) *
                  </label>
                  <div className="relative">
                    <Users className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="number"
                      name="capacity"
                      min={1}
                      max={1000}
                      value={formData.capacity}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-[#ff9900] focus:outline-none focus:ring-1 focus:ring-[#ff9900]"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                  Description *
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detailed description of what students will learn, agenda, prerequisites..."
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white placeholder-slate-500 focus:border-[#ff9900] focus:outline-none focus:ring-1 focus:ring-[#ff9900]"
                />
              </div>

              {/* Date & Timings */}
              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                    Date String *
                  </label>
                  <div className="relative">
                    <Calendar className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="text"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      placeholder="e.g. October 20, 2026"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-[#ff9900] focus:outline-none focus:ring-1 focus:ring-[#ff9900]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                    Start Time *
                  </label>
                  <div className="relative">
                    <Clock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="text"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      placeholder="e.g. 02:00 PM"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-[#ff9900] focus:outline-none focus:ring-1 focus:ring-[#ff9900]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                    End Time *
                  </label>
                  <div className="relative">
                    <Clock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="text"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      placeholder="e.g. 04:00 PM"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-[#ff9900] focus:outline-none focus:ring-1 focus:ring-[#ff9900]"
                    />
                  </div>
                </div>
              </div>

              {/* Venue & Registration Deadline */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                    Venue / Location *
                  </label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="text"
                      name="venue"
                      value={formData.venue}
                      onChange={handleChange}
                      placeholder="e.g. Main Seminar Hall, CSIT Block"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-[#ff9900] focus:outline-none focus:ring-1 focus:ring-[#ff9900]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                    Registration Deadline Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    name="registrationDeadline"
                    value={formData.registrationDeadline}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#07101e] p-3.5 text-sm text-white focus:border-[#ff9900] focus:outline-none focus:ring-1 focus:ring-[#ff9900]"
                  />
                </div>
              </div>

              {/* Banner URL */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                  Event Banner Image URL (Optional)
                </label>
                <div className="relative">
                  <Image className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="url"
                    name="bannerUrl"
                    value={formData.bannerUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/event-banner.jpg"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-[#ff9900] focus:outline-none focus:ring-1 focus:ring-[#ff9900]"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#ff5f1f] to-[#ff9900] py-4 text-base font-black text-black shadow-[0_12px_35px_rgba(255,153,0,0.25)] transition duration-300 hover:shadow-[0_16px_45px_rgba(255,153,0,0.35)] disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Publishing Event to MongoDB...</span>
                  </>
                ) : (
                  <>
                    <PlusCircle size={18} />
                    <span>Publish Event Live to Website</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer showJoinCTA={false} />
    </div>
  );
}

export default AdminEventCreatePage;
