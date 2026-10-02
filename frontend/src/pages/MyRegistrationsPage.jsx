import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  Download,
  Loader2,
  MapPin,
  Printer,
  QrCode,
  Ticket,
} from "lucide-react";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useAuth } from "../context/AuthContext";

function MyRegistrationsPage() {
  const { user, token, isAuthenticated } = useAuth();

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedPass, setSelectedPass] = useState(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const res = await fetch("http://localhost:5000/api/registrations/my-registrations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (res.ok && data.success) {
          setRegistrations(data.data);
        } else {
          setError(data.message || "Could not fetch registrations.");
        }
      } catch (err) {
        setError("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [token]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#010611] text-white">
        <Navbar />
        <main className="flex min-h-[60vh] items-center justify-center px-5 pt-36">
          <div className="max-w-md rounded-3xl border border-white/10 bg-[#07101e] p-8 text-center shadow-2xl">
            <Ticket className="mx-auto h-16 w-16 text-[#ff9900]" />
            <h1 className="mt-4 text-2xl font-black text-white">Sign In to View Passes</h1>
            <p className="mt-2 text-sm text-slate-300">
              Please log in with your college student account to see your registered events and entry passes.
            </p>
            <Link
              to="/login"
              className="mt-6 inline-block rounded-xl bg-[#ff9900] px-6 py-3 text-sm font-bold text-black"
            >
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

        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="border-b border-white/10 pb-6">
            <span className="rounded-full border border-[#ff9900]/30 bg-[#ff9900]/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#ffad32]">
              Student Portal
            </span>
            <h1 className="mt-3 text-3xl font-black text-white sm:text-5xl">
              My Event Registrations
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Your registered events, verified passes, and digital QR codes queried directly from the database.
            </p>
          </div>

          {loading && (
            <div className="flex min-h-[300px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-[#ff9900]" />
            </div>
          )}

          {!loading && error && (
            <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-sm text-red-200">
              {error}
            </div>
          )}

          {!loading && !error && registrations.length === 0 && (
            <div className="mt-10 rounded-3xl border border-white/10 bg-[#07101e]/80 p-12 text-center">
              <Ticket className="mx-auto h-12 w-12 text-slate-500" />
              <h3 className="mt-4 text-xl font-bold text-white">No Event Registrations Yet</h3>
              <p className="mt-2 text-sm text-slate-400">
                You haven't registered for any AWS Cloud Club events yet.
              </p>
              <Link
                to="/#events"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#ff9900] px-6 py-3 font-bold text-black"
              >
                Explore Upcoming Events
              </Link>
            </div>
          )}

          {!loading && registrations.length > 0 && (
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {registrations.map((reg) => (
                <div
                  key={reg._id}
                  className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#07101e]/90 p-6 shadow-xl backdrop-blur-xl transition hover:border-white/20"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="font-mono text-xs font-bold text-[#ff9900]">
                        {reg.registrationId}
                      </span>
                      <span className="rounded-full bg-green-500/20 px-2.5 py-0.5 text-[10px] font-bold text-green-400">
                        {reg.verificationStatus}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-black text-white">
                      {reg.eventId?.title || "Society Event"}
                    </h3>

                    <div className="mt-4 space-y-2 text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-[#ff9900]" />
                        <span>{reg.eventId?.date || "Event Date"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-blue-400" />
                        <span>{reg.eventId?.startTime || "Time"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-purple-400" />
                        <span className="truncate">{reg.eventId?.venue || "Campus Venue"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3 border-t border-white/10 pt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedPass(reg)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#ff9900] py-3 text-xs font-black text-black transition hover:bg-[#ffad32]"
                    >
                      <QrCode size={16} />
                      View Pass & QR
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Ticket Pass Modal */}
      {selectedPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-5 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl border border-white/15 bg-[#07101e] p-6 text-center shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={() => setSelectedPass(null)}
              className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-bold text-green-400">
              Verified Event Pass
            </span>

            <h3 className="mt-3 text-2xl font-black text-white">
              {selectedPass.studentName}
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              {selectedPass.eventId?.title}
            </p>

            {selectedPass.ticketQrCode && (
              <div className="my-5 flex flex-col items-center justify-center rounded-2xl bg-white p-4">
                <img
                  src={selectedPass.ticketQrCode}
                  alt={`Ticket QR for ${selectedPass.registrationId}`}
                  className="h-52 w-52 object-contain"
                />
                <p className="mt-2 text-[11px] font-mono font-bold uppercase tracking-wider text-black">
                  {selectedPass.registrationId}
                </p>
              </div>
            )}

            <div className="mb-6 space-y-1.5 rounded-xl border border-white/10 bg-black/40 p-4 text-left text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Roll Number:</span>
                <span className="font-semibold text-white">{selectedPass.studentNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Branch & Year:</span>
                <span className="text-slate-300">{selectedPass.branch} • {selectedPass.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Venue:</span>
                <span className="text-slate-300">{selectedPass.eventId?.venue}</span>
              </div>
            </div>

            <div className="flex gap-3">
              {selectedPass.ticketQrCode && (
                <a
                  href={selectedPass.ticketQrCode}
                  download={`Pass_${selectedPass.registrationId}.png`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#ff9900] py-3 text-xs font-black text-black transition hover:bg-[#ffad32]"
                >
                  <Download size={14} /> Download QR
                </a>
              )}
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 py-3 text-xs font-bold text-white transition hover:bg-white/20"
              >
                <Printer size={14} /> Print
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer showJoinCTA={false} />
    </div>
  );
}

export default MyRegistrationsPage;
