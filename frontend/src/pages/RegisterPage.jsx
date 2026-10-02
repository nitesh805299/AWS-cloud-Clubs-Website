import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  KeyRound,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    adminSecretCode: "",
  });

  const [showAdminCode, setShowAdminCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({ ...prev, role }));
    setShowAdminCode(role === "admin" || role === "team_member");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (showAdminCode && !formData.adminSecretCode.trim()) {
      setError("Please provide the Admin / Team Invite Secret Code.");
      return;
    }

    try {
      setLoading(true);
      const user = await register(formData);
      if (user.role === "admin" || user.role === "team_member") {
        navigate("/admin/events");
      } else {
        navigate("/#events");
      }
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#010611] text-white">
      <Navbar />

      <main className="relative flex min-h-[calc(100vh-140px)] items-center justify-center overflow-hidden px-5 py-32 sm:px-8">
        {/* Glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="events-grid absolute inset-0 opacity-20" />
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/[0.08] blur-[150px]" />
          <div className="absolute right-10 top-20 h-[350px] w-[350px] rounded-full bg-[#ff9900]/[0.08] blur-[140px]" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="rounded-[32px] border border-white/10 bg-[#07101e]/85 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
            <div className="text-center">
              <span className="rounded-full border border-[#ff9900]/30 bg-[#ff9900]/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#ffad32]">
                New Account
              </span>
              <h1 className="mt-4 text-3xl font-black text-white sm:text-4xl">
                Create Account
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Join the AWS Cloud Club community platform.
              </p>
            </div>

            {error && (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                <AlertCircle className="mt-0.5 shrink-0 text-red-400" size={18} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Account Type Toggle */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleRoleChange("student")}
                    className={`rounded-xl border py-3 text-xs font-bold uppercase tracking-wider transition ${
                      formData.role === "student"
                        ? "border-[#ff9900] bg-[#ff9900]/10 text-[#ffad32]"
                        : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20"
                    }`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleChange("admin")}
                    className={`rounded-xl border py-3 text-xs font-bold uppercase tracking-wider transition ${
                      formData.role === "admin" || formData.role === "team_member"
                        ? "border-[#ff9900] bg-[#ff9900]/10 text-[#ffad32]"
                        : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20"
                    }`}
                  >
                    Admin / Team
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                  Full Name
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Aarav Sharma"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-[#ff9900] focus:outline-none focus:ring-1 focus:ring-[#ff9900]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                  College Email Address
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
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                  Password (min 6 characters)
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-[#ff9900] focus:outline-none focus:ring-1 focus:ring-[#ff9900]"
                  />
                </div>
              </div>

              {/* Admin Invite Code (Only shown when Admin/Team is toggled) */}
              {showAdminCode && (
                <div className="rounded-2xl border border-[#ff9900]/30 bg-[#ff9900]/[0.06] p-4">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#ffad32]">
                    <ShieldCheck size={16} />
                    Society Admin Secret Key
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    Required to verify organizer permissions.
                  </p>
                  <div className="relative mt-3">
                    <KeyRound className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="password"
                      name="adminSecretCode"
                      value={formData.adminSecretCode}
                      onChange={handleChange}
                      placeholder="Enter invite secret key..."
                      className="w-full rounded-xl border border-white/10 bg-black/60 py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:border-[#ff9900] focus:outline-none focus:ring-1 focus:ring-[#ff9900]"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#ff5f1f] to-[#ff9900] py-4 text-sm font-black text-black shadow-[0_12px_35px_rgba(255,153,0,0.25)] transition duration-300 hover:shadow-[0_16px_45px_rgba(255,153,0,0.35)] disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Registration</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center text-xs text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-[#ff9900] hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer showJoinCTA={false} />
    </div>
  );
}

export default RegisterPage;
