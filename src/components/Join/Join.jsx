import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Phone,
  User,
} from "lucide-react";

const domains = [
  "Frontend Development",
  "Backend Development",
  "AI / Machine Learning",
  "App Development",
  "DevOps",
  "UI / UX Design",
];

function Join() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Backend/API baad me connect karenge.
    setSubmitted(true);

    event.currentTarget.reset();
  };

  return (
    <section
      id="join"
      className="relative overflow-hidden bg-[#010611] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="join-grid absolute inset-0 opacity-25" />

        <div className="absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-blue-600/[0.08] blur-[140px]" />

        <div className="absolute -right-40 bottom-10 h-[450px] w-[450px] rounded-full bg-[#ff9900]/[0.08] blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* Heading */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-5 py-2.5">
            <GraduationCap className="text-[#ff9900]" size={20} />

            <span className="text-sm font-black uppercase tracking-[0.22em] text-slate-200">
              Student Registration
            </span>
          </div>

          <h2 className="mt-7 text-4xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
            Join AWS Cloud Club
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
            Become part of a growing student community focused on cloud
            computing, development, innovation, technical learning and
            collaborative projects.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.85fr_1.4fr]">
          {/* Left information */}
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7 sm:p-9">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#ff9900]">
              Why Join Us?
            </p>

            <h3 className="mt-4 text-3xl font-black text-white">
              Learn, build and grow together.
            </h3>

            <p className="mt-5 text-sm leading-7 text-slate-400">
              AWS Cloud Club AKGEC gives students a platform to explore
              technology, work on practical projects, attend workshops and
              connect with other motivated learners.
            </p>

            <div className="mt-8 space-y-5">
              {[
                "Hands-on technical workshops",
                "Collaborative student projects",
                "Cloud and development learning",
                "Leadership and teamwork opportunities",
                "Networking with technical enthusiasts",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={21}
                    className="mt-0.5 shrink-0 text-[#ff9900]"
                  />

                  <p className="text-sm leading-6 text-slate-300">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 rounded-2xl border border-blue-400/15 bg-blue-500/[0.06] p-5">
              <p className="text-sm font-bold text-blue-300">
                Registration Note
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Fill in correct academic and contact information. The club team
                may contact shortlisted students through email or phone.
              </p>
            </div>
          </div>

          {/* Registration form */}
          <div className="rounded-[28px] border border-white/10 bg-[#050b16]/90 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:p-9">
            {submitted && (
              <div className="mb-7 flex items-start gap-3 rounded-2xl border border-green-400/25 bg-green-400/10 p-4 text-green-300">
                <CheckCircle2 className="mt-0.5 shrink-0" />

                <div>
                  <p className="font-bold">Registration submitted</p>

                  <p className="mt-1 text-sm text-green-200/80">
                    This is currently a frontend demo. Backend integration will
                    be added later.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and email */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="join-label">
                    Full Name
                  </label>

                  <div className="join-input-wrapper">
                    <User size={18} />

                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      required
                      className="join-input"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="join-label">
                    College Email
                  </label>

                  <div className="join-input-wrapper">
                    <Mail size={18} />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="yourname@akgec.ac.in"
                      required
                      className="join-input"
                    />
                  </div>
                </div>
              </div>

              {/* Phone and branch */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="join-label">
                    Phone Number
                  </label>

                  <div className="join-input-wrapper">
                    <Phone size={18} />

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      required
                      className="join-input"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="branch" className="join-label">
                    Branch
                  </label>

                  <select
                    id="branch"
                    name="branch"
                    required
                    className="join-select"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select your branch
                    </option>
                    <option value="CSE">CSE</option>
                    <option value="CS">CS</option>
                    <option value="IT">IT</option>
                    <option value="CSE-AIML">CSE - AI/ML</option>
                    <option value="CSE-DS">CSE - Data Science</option>
                    <option value="ECE">ECE</option>
                    <option value="EN">Electrical Engineering</option>
                    <option value="ME">Mechanical Engineering</option>
                    <option value="CE">Civil Engineering</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Year and domain */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="year" className="join-label">
                    Current Year
                  </label>

                  <select
                    id="year"
                    name="year"
                    required
                    className="join-select"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select your year
                    </option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="domain" className="join-label">
                    Preferred Domain
                  </label>

                  <select
                    id="domain"
                    name="domain"
                    required
                    className="join-select"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select your preferred domain
                    </option>

                    {domains.map((domain) => (
                      <option key={domain} value={domain}>
                        {domain}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Skills */}
              <div>
                <label htmlFor="skills" className="join-label">
                  Skills
                </label>

                <input
                  id="skills"
                  name="skills"
                  type="text"
                  placeholder="Example: HTML, CSS, JavaScript, React, Python"
                  className="join-text-field"
                />
              </div>

              {/* Social links */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="linkedin" className="join-label">
                    LinkedIn Profile
                  </label>

                  <div className="join-input-wrapper">
                    <Linkedin size={18} />

                    <input
                      id="linkedin"
                      name="linkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/..."
                      className="join-input"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="github" className="join-label">
                    GitHub Profile
                  </label>

                  <div className="join-input-wrapper">
                    <Github size={18} />

                    <input
                      id="github"
                      name="github"
                      type="url"
                      placeholder="https://github.com/..."
                      className="join-input"
                    />
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div>
                <label htmlFor="reason" className="join-label">
                  Why do you want to join?
                </label>

                <textarea
                  id="reason"
                  name="reason"
                  rows="5"
                  placeholder="Tell us about your interests, learning goals and how you want to contribute..."
                  required
                  className="join-text-field resize-none"
                />
              </div>

              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 accent-[#ff9900]"
                />

                <span className="text-sm leading-6 text-slate-400">
                  I confirm that the information provided above is correct and I
                  agree to follow the club's guidelines and code of conduct.
                </span>
              </label>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#ff9900] px-7 py-4 font-black text-black transition duration-300 hover:-translate-y-1 hover:bg-[#ffad32] hover:shadow-[0_16px_40px_rgba(255,153,0,0.22)]"
              >
                Submit Registration

                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Join;