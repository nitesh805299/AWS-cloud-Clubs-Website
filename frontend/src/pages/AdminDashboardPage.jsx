import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  Loader2,
  MapPin,
  Plus,
  RefreshCw,
  Shield,
  Trash2,
  Users,
} from "lucide-react";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useAuth } from "../context/AuthContext";

function AdminDashboardPage() {
  const { user, token, isTeamMember, isAdmin } = useAuth();

  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventsError, setEventsError] = useState("");

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loadingRegistrations, setLoadingRegistrations] = useState(false);

  const [actionMessage, setActionMessage] = useState("");

  // Fetch all events from backend
  const fetchEvents = async () => {
    try {
      setLoadingEvents(true);
      setEventsError("");

      const res = await fetch("http://localhost:5000/api/events");
      const data = await res.json();

      if (res.ok && data.success) {
        setEvents(data.data);
      } else {
        setEventsError(data.message || "Failed to load events");
      }
    } catch (err) {
      setEventsError("Unable to connect to backend server.");
    } finally {
      setLoadingEvents(false);
    }
  };

  useEffect(() => {
    if (isTeamMember) {
      fetchEvents();
    }
  }, [isTeamMember]);

  // View registrations for a specific event
  const handleViewRegistrations = async (event) => {
    setSelectedEvent(event);
    setLoadingRegistrations(true);
    setActionMessage("");

    try {
      const res = await fetch(`http://localhost:5000/api/events/${event._id}/registrations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setRegistrations(data.data);
      } else {
        setRegistrations([]);
        setActionMessage(data.message || "Could not fetch attendees.");
      }
    } catch (err) {
      console.error(err);
      setActionMessage("Error fetching registrations.");
    } finally {
      setLoadingRegistrations(false);
    }
  };

  // Toggle event registration status (open/closed)
  const handleToggleRegistration = async (eventId, currentStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isRegistrationOpen: !currentStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        fetchEvents();
      } else {
        alert(data.message || "Failed to update event");
      }
    } catch (err) {
      alert("Error updating event.");
    }
  };

  // Delete event
  const handleDeleteEvent = async (eventId, title) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${title}" and all its registrations?`)) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        if (selectedEvent?._id === eventId) {
          setSelectedEvent(null);
          setRegistrations([]);
        }
        fetchEvents();
      } else {
        alert(data.message || "Failed to delete event");
      }
    } catch (err) {
      alert("Error deleting event.");
    }
  };

  // Export registrations as CSV
  const handleExportCSV = () => {
    if (!registrations || registrations.length === 0) return;

    const headers = [
      "Student Name",
      "Roll Number",
      "Email",
      "Branch",
      "Year",
      "Residence",
      "Registration ID",
      "Status",
      "Registered At",
    ];

    const rows = registrations.map((r) => [
      `"${r.studentName}"`,
      `"${r.studentNumber}"`,
      `"${r.email}"`,
      `"${r.branch}"`,
      `"${r.year}"`,
      `"${r.residenceType || "Day Scholar"}"`,
      `"${r.registrationId}"`,
      `"${r.verificationStatus}"`,
      `"${new Date(r.registeredAt).toLocaleString()}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${selectedEvent.title.replace(/\s+/g, "_")}_Registrations.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isTeamMember) {
    return (
      <div className="min-h-screen bg-[#010611] text-white">
        <Navbar />
        <main className="flex min-h-[60vh] items-center justify-center px-5 pt-36">
          <div className="max-w-md rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-center">
            <Shield className="mx-auto h-16 w-16 text-red-400" />
            <h1 className="mt-4 text-2xl font-black text-white">Organizer Access Only</h1>
            <p className="mt-2 text-sm text-slate-300">
              You must be logged in as an authorized society team member or admin.
            </p>
            <Link to="/login" className="mt-6 inline-block rounded-xl bg-[#ff9900] px-6 py-3 text-sm font-bold text-black">
              Sign In
            </Link>
          </div>
        </main>
        <Footer showJoinCTA={false} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#010611] text-white">
      <Navbar />

      <main className="relative overflow-hidden px-5 pb-24 pt-32 sm:px-8 lg:px-12 lg:pt-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="events-grid absolute inset-0 opacity-20" />
          <div className="absolute left-1/2 top-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/[0.07] blur-[150px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-[#ff9900]/30 bg-[#ff9900]/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#ffad32]">
                  {user?.role === "admin" ? "Administrator Portal" : "Team Member Portal"}
                </span>
                <span className="text-xs text-slate-400">Logged in as {user?.name}</span>
              </div>
              <h1 className="mt-3 text-3xl font-black text-white sm:text-5xl">
                Event Management
              </h1>
            </div>

            <div className="flex gap-3">
              <Link
                to="/admin/create-event"
                className="inline-flex items-center gap-2 rounded-xl bg-[#ff9900] px-5 py-3 font-bold text-black shadow-lg transition hover:bg-[#ffad32]"
              >
                <Plus size={18} />
                Create New Event
              </Link>
              <button
                type="button"
                onClick={fetchEvents}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-bold text-white transition hover:bg-white/10"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>

          {/* Events Grid / List */}
          <div className="mt-10">
            <h2 className="text-xl font-black text-white">
              Society Events in Database ({events.length})
            </h2>

            {loadingEvents && (
              <div className="mt-6 flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-[#ff9900]" />
              </div>
            )}

            {!loadingEvents && eventsError && (
              <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-sm text-red-200">
                {eventsError}
              </div>
            )}

            {!loadingEvents && !eventsError && events.length === 0 && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center">
                <p className="text-base text-slate-300">
                  No events found in the database.
                </p>
                <Link
                  to="/admin/create-event"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#ff9900] px-5 py-2.5 text-sm font-bold text-black"
                >
                  <Plus size={16} /> Create First Event
                </Link>
              </div>
            )}

            {!loadingEvents && events.length > 0 && (
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <div
                    key={event._id}
                    className={`flex flex-col justify-between rounded-2xl border p-6 transition ${
                      selectedEvent?._id === event._id
                        ? "border-[#ff9900] bg-[#ff9900]/[0.05]"
                        : "border-white/10 bg-[#07101e]/80 hover:border-white/20"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-blue-400">
                          {event.category || "Workshop"}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                            event.isRegistrationOpen
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {event.isRegistrationOpen ? "Open" : "Closed"}
                        </span>
                      </div>

                      <h3 className="mt-3 text-lg font-black text-white line-clamp-1">
                        {event.title}
                      </h3>

                      <p className="mt-2 text-xs text-slate-400 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="mt-4 space-y-1.5 text-xs text-slate-300">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-[#ff9900]" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-blue-400" />
                          <span>{event.startTime} - {event.endTime || event.endtime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-purple-400" />
                          <span className="truncate">{event.venue}</span>
                        </div>
                        <div className="flex items-center gap-2 font-semibold text-cyan-300">
                          <Users size={14} />
                          <span>
                            {event.registeredCount || 0} Registered / {event.capacity} Capacity
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                      <button
                        type="button"
                        onClick={() => handleViewRegistrations(event)}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#ff9900] py-2 text-xs font-black text-black transition hover:bg-[#ffad32]"
                      >
                        <Eye size={14} />
                        View Attendees ({event.registeredCount || 0})
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleRegistration(event._id, event.isRegistrationOpen)}
                        className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                      >
                        {event.isRegistrationOpen ? "Close" : "Open"}
                      </button>

                      {isAdmin && (
                        <button
                          type="button"
                          onClick={() => handleDeleteEvent(event._id, event.title)}
                          className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/20"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Attendee Registrations Table */}
          {selectedEvent && (
            <div className="mt-16 rounded-[32px] border border-white/10 bg-[#07101e]/90 p-8 shadow-2xl backdrop-blur-xl">
              <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-[#ff9900]">
                    Attendee List
                  </span>
                  <h3 className="mt-1 text-2xl font-black text-white">
                    {selectedEvent.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Total Registrations: <strong>{registrations.length}</strong> / Capacity: {selectedEvent.capacity}
                  </p>
                </div>

                <div className="flex gap-3">
                  {registrations.length > 0 && (
                    <button
                      type="button"
                      onClick={handleExportCSV}
                      className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-xs font-black text-black transition hover:bg-green-400"
                    >
                      <Download size={14} />
                      Export CSV
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(null)}
                    className="rounded-xl border border-white/15 px-4 py-2.5 text-xs font-bold text-slate-300 transition hover:bg-white/10"
                  >
                    Close Table
                  </button>
                </div>
              </div>

              {loadingRegistrations && (
                <div className="flex items-center justify-center p-12">
                  <Loader2 className="h-8 w-8 animate-spin text-[#ff9900]" />
                </div>
              )}

              {!loadingRegistrations && registrations.length === 0 && (
                <div className="p-12 text-center text-slate-400">
                  No students have registered for this event yet.
                </div>
              )}

              {!loadingRegistrations && registrations.length > 0 && (
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-400">
                        <th className="pb-3 pl-2">#</th>
                        <th className="pb-3">Student Name</th>
                        <th className="pb-3">Roll Number</th>
                        <th className="pb-3">College Email</th>
                        <th className="pb-3">Branch</th>
                        <th className="pb-3">Year</th>
                        <th className="pb-3">Residence</th>
                        <th className="pb-3">Tracking ID</th>
                        <th className="pb-3">Registered At</th>
                        <th className="pb-3 pr-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-200">
                      {registrations.map((reg, idx) => (
                        <tr key={reg._id} className="hover:bg-white/[0.02]">
                          <td className="py-3 pl-2 text-slate-500">{idx + 1}</td>
                          <td className="py-3 font-semibold text-white">{reg.studentName}</td>
                          <td className="py-3 font-mono">{reg.studentNumber}</td>
                          <td className="py-3 text-slate-300">{reg.email}</td>
                          <td className="py-3">{reg.branch}</td>
                          <td className="py-3">{reg.year}</td>
                          <td className="py-3">{reg.residenceType || "Day Scholar"}</td>
                          <td className="py-3 font-mono font-bold text-[#ff9900]">{reg.registrationId}</td>
                          <td className="py-3 text-slate-400">
                            {new Date(reg.registeredAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 pr-2">
                            <span className="rounded-full bg-green-500/20 px-2.5 py-0.5 text-[10px] font-bold text-green-400">
                              {reg.verificationStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer showJoinCTA={false} />
    </div>
  );
}

export default AdminDashboardPage;
