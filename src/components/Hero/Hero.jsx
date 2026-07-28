import {
  ArrowRight,
  CalendarDays,
  Code2,
  Lightbulb,
  Play,
  Rocket,
  Users,
} from "lucide-react";

import awsCloudClubTransparentLogo from "../../assets/logos/aws-cloud-clubs-logo-transparent.png";

const particles = [
  { left: "7%", top: "18%", delay: "0s", duration: "7s", size: "5px" },
  { left: "15%", top: "72%", delay: "1s", duration: "9s", size: "4px" },
  { left: "28%", top: "25%", delay: "2s", duration: "8s", size: "6px" },
  { left: "39%", top: "84%", delay: "0.5s", duration: "10s", size: "4px" },
  { left: "52%", top: "16%", delay: "1.5s", duration: "7s", size: "5px" },
  { left: "65%", top: "78%", delay: "2.5s", duration: "9s", size: "6px" },
  { left: "76%", top: "21%", delay: "0.8s", duration: "8s", size: "4px" },
  { left: "87%", top: "68%", delay: "1.8s", duration: "10s", size: "5px" },
  { left: "94%", top: "25%", delay: "3s", duration: "7s", size: "4px" },
];

const members = [
  { initials: "NK", position: "" },
  { initials: "AS", position: "-ml-3" },
  { initials: "RM", position: "-ml-3" },
  { initials: "SK", position: "-ml-3" },
];

function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#020713] px-5 pb-16 pt-32 sm:px-8 lg:px-10 lg:pt-36 xl:px-14"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[65%] top-[45%] h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[130px]" />

        <div className="absolute left-[12%] top-[50%] h-[450px] w-[450px] rounded-full bg-cyan-400/5 blur-[130px]" />

        <div className="absolute right-[4%] top-[25%] h-[420px] w-[420px] rounded-full bg-[#ff9900]/5 blur-[130px]" />

        <div className="hero-grid absolute inset-0 opacity-20" />
      </div>

      {/* Floating background particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((particle, index) => (
          <span
            key={index}
            className={`hero-particle absolute rounded-full ${
              index % 3 === 0
                ? "bg-[#ff9900] shadow-[0_0_18px_rgba(255,153,0,0.9)]"
                : index % 2 === 0
                  ? "bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)]"
                  : "bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.9)]"
            }`}
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      {/* Moving network lines */}
      <div className="pointer-events-none absolute inset-0 hidden opacity-25 lg:block">
        <svg
          viewBox="0 0 1440 900"
          className="h-full w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 630 C210 510 350 690 520 555 C710 405 825 620 985 475 C1140 350 1270 520 1440 385"
            fill="none"
            stroke="url(#heroLineGradientOne)"
            strokeWidth="1.2"
            strokeDasharray="8 14"
            className="hero-network-line"
          />

          <path
            d="M0 315 C190 435 360 220 550 370 C730 505 850 250 1020 390 C1185 510 1300 305 1440 420"
            fill="none"
            stroke="url(#heroLineGradientTwo)"
            strokeWidth="1"
            strokeDasharray="7 16"
            className="hero-network-line hero-network-line-delay"
          />

          <defs>
            <linearGradient id="heroLineGradientOne" x1="0" x2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
              <stop offset="48%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ff9900" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="heroLineGradientTwo" x1="0" x2="1">
              <stop offset="0%" stopColor="#ff9900" stopOpacity="0" />
              <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] xl:gap-10">
        {/* Left content */}
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
          <div className="inline-flex items-center gap-3 rounded-full border border-blue-400/20 bg-blue-400/5 px-4 py-2 text-sm font-medium text-blue-300 backdrop-blur-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-400" />
            </span>

            Building the next generation of cloud innovators
          </div>

          <h1 className="mt-7 text-5xl font-bold leading-[1.04] tracking-[-0.04em] text-white sm:text-6xl lg:text-[66px] xl:text-[78px]">
            Connecting Minds.

            <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-[#ff9900] bg-clip-text text-transparent">
              Creating the Future.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg lg:mx-0 lg:text-xl">
            A student-driven technology community where cloud enthusiasts learn,
            build, collaborate and transform ideas into impactful solutions
            using AWS technologies.
          </p>

          {/* CTA buttons */}
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <a
              href="#join"
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#ff9900] px-7 py-4 font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-[#ffad32] hover:shadow-[0_15px_45px_rgba(255,153,0,0.25)] sm:w-auto"
            >
              Join the Club

              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            <a
              href="#events"
              className="group flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-blue-400/10 sm:w-auto"
            >
              <CalendarDays size={20} className="text-blue-400" />
              Explore Events
            </a>
          </div>

          {/* Community members */}
          <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row lg:justify-start">
            <div className="flex items-center">
              {members.map((member) => (
                <div
                  key={member.initials}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#020713] bg-gradient-to-br from-blue-500 to-cyan-400 text-xs font-bold text-white ${member.position}`}
                >
                  {member.initials}
                </div>
              ))}

              <div className="-ml-3 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#020713] bg-slate-800 text-xs font-bold text-white">
                +99
              </div>
            </div>

            <div className="text-center sm:text-left">
              <p className="font-semibold text-white">Join our community</p>

              <p className="mt-1 text-sm text-slate-500">
                Learn, collaborate and grow together
              </p>
            </div>
          </div>
        </div>

        {/* Right orbital cloud design */}
        <div className="relative mx-auto flex min-h-[520px] w-full max-w-[700px] items-center justify-center sm:min-h-[620px] lg:min-h-[700px]">
          {/* Background glow */}
          <div className="pointer-events-none absolute z-0 h-[360px] w-[360px] rounded-full bg-blue-500/10 blur-[80px] sm:h-[470px] sm:w-[470px]" />

          {/* Outer orbit */}
          <div className="pointer-events-none absolute z-[1] h-[390px] w-[390px] rounded-full border border-blue-300/15 sm:h-[520px] sm:w-[520px] lg:h-[600px] lg:w-[600px]" />

          {/* Dashed orbit */}
          <div className="pointer-events-none absolute z-[1] h-[310px] w-[310px] rounded-full border border-dashed border-blue-300/15 sm:h-[420px] sm:w-[420px] lg:h-[500px] lg:w-[500px]" />

          {/* Inner orbit */}
          <div className="pointer-events-none absolute z-[1] h-[230px] w-[230px] rounded-full border border-blue-300/10 sm:h-[320px] sm:w-[320px] lg:h-[385px] lg:w-[385px]" />

          {/* Think node */}
          <div className="absolute left-[1%] top-1/2 z-30 flex -translate-y-1/2 flex-col items-center sm:left-[2%] lg:left-[-1%]">
            <div className="hero-node-float flex h-16 w-16 items-center justify-center rounded-full border-2 border-cyan-300 bg-cyan-500/20 shadow-[0_0_30px_rgba(34,211,238,0.7),inset_0_0_20px_rgba(34,211,238,0.18)] backdrop-blur-md sm:h-20 sm:w-20 lg:h-24 lg:w-24">
              <Lightbulb
                size={34}
                strokeWidth={1.8}
                className="text-cyan-200 sm:h-10 sm:w-10"
              />
            </div>

            <p className="mt-2 text-lg font-bold text-cyan-300 sm:text-xl lg:text-2xl">
              Think
            </p>

            <div className="mt-1 flex items-center gap-1">
              <span className="h-[3px] w-10 rounded-full bg-cyan-300 sm:w-12" />
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/70" />
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/40" />
            </div>
          </div>

          {/* Deploy node */}
          <div className="absolute right-[1%] top-1/2 z-30 flex -translate-y-1/2 flex-col items-center sm:right-[2%] lg:right-[-1%]">
            <div className="hero-node-float-delay flex h-16 w-16 items-center justify-center rounded-full border-2 border-purple-400 bg-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.7),inset_0_0_20px_rgba(168,85,247,0.18)] backdrop-blur-md sm:h-20 sm:w-20 lg:h-24 lg:w-24">
              <Rocket
                size={34}
                strokeWidth={1.8}
                className="text-purple-200 sm:h-10 sm:w-10"
              />
            </div>

            <p className="mt-2 text-lg font-bold text-purple-400 sm:text-xl lg:text-2xl">
              Deploy
            </p>

            <div className="mt-1 flex items-center gap-1">
              <span className="h-[3px] w-10 rounded-full bg-purple-400 sm:w-12" />
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400/70" />
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400/40" />
            </div>
          </div>

          {/* Develop node */}
          <div className="absolute bottom-[0%] left-1/2 z-30 flex -translate-x-1/2 flex-col items-center sm:bottom-[1%] lg:bottom-[-1%]">
            <div className="hero-node-float-slow flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#ffad32] bg-[#ff9900]/25 shadow-[0_0_32px_rgba(255,153,0,0.75),inset_0_0_20px_rgba(255,153,0,0.2)] backdrop-blur-md sm:h-20 sm:w-20 lg:h-24 lg:w-24">
              <Code2
                size={35}
                strokeWidth={1.8}
                className="text-white sm:h-10 sm:w-10"
              />
            </div>

            <p className="mt-2 text-lg font-bold text-[#ff9900] sm:text-xl lg:text-2xl">
              Develop
            </p>

            <div className="mt-1 flex items-center gap-1">
              <span className="h-[3px] w-10 rounded-full bg-[#ff9900] sm:w-12" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff9900]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff9900]/70" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff9900]/40" />
            </div>
          </div>

          {/* Central cloud — higher z-index than orbit */}
          <div className="hero-cloud relative z-20 flex h-[250px] w-[320px] items-center justify-center sm:h-[340px] sm:w-[450px] lg:h-[390px] lg:w-[520px]">
            {/* Cloud base */}
            <div className="absolute bottom-[43px] left-[27px] h-[115px] w-[270px] rounded-[80px] border border-blue-300/45 bg-blue-500/15 shadow-[0_0_65px_rgba(59,130,246,0.35),inset_0_0_45px_rgba(96,165,250,0.12)] backdrop-blur-xl sm:bottom-[58px] sm:left-[42px] sm:h-[145px] sm:w-[380px] lg:bottom-[66px] lg:left-[48px] lg:h-[165px] lg:w-[430px]" />

            {/* Cloud left circle */}
            <div className="absolute left-[50px] top-[73px] h-[125px] w-[125px] rounded-full border border-blue-300/40 bg-blue-500/15 shadow-[0_0_55px_rgba(37,99,235,0.3)] backdrop-blur-xl sm:left-[72px] sm:top-[90px] sm:h-[165px] sm:w-[165px] lg:left-[84px] lg:top-[98px] lg:h-[185px] lg:w-[185px]" />

            {/* Cloud top circle */}
            <div className="absolute left-[105px] top-[27px] h-[155px] w-[155px] rounded-full border border-blue-300/45 bg-blue-500/15 shadow-[0_0_70px_rgba(59,130,246,0.35)] backdrop-blur-xl sm:left-[150px] sm:top-[40px] sm:h-[210px] sm:w-[210px] lg:left-[175px] lg:top-[42px] lg:h-[235px] lg:w-[235px]" />

            {/* Cloud right circle */}
            <div className="absolute right-[38px] top-[82px] h-[115px] w-[115px] rounded-full border border-blue-300/40 bg-blue-500/15 shadow-[0_0_55px_rgba(56,189,248,0.28)] backdrop-blur-xl sm:right-[55px] sm:top-[100px] sm:h-[155px] sm:w-[155px] lg:right-[62px] lg:top-[110px] lg:h-[175px] lg:w-[175px]" />

            {/* Logo and text */}
            <div className="relative z-30 flex -translate-y-1 flex-col items-center sm:-translate-y-2">
              <div className="flex h-28 w-28 items-center justify-center sm:h-36 sm:w-36 lg:h-40 lg:w-40">
                <img
                src={awsCloudClubTransparentLogo}
                alt="AWS Cloud Club Logo"
                className="
                h-full
                w-full
                object-contain
                brightness-0
                invert
                drop-shadow-[0_0_10px_rgba(255,255,255,0.75)]
                "
              />
              </div>

              <p className="mt-3 whitespace-nowrap text-xs font-bold uppercase tracking-[0.28em] text-blue-200 drop-shadow-[0_0_12px_rgba(96,165,250,0.9)] sm:text-base sm:tracking-[0.36em] lg:text-lg">
                Build on Cloud
              </p>
            </div>
          </div>

          {/* Floating members card */}
          <div className="hero-floating-card absolute left-0 top-[5%] z-40 hidden rounded-2xl border border-white/10 bg-black/75 p-4 shadow-2xl backdrop-blur-xl sm:block lg:left-[-3%]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Users size={24} />
              </div>

              <div>
                <p className="text-xl font-bold text-white">25+</p>
                <p className="text-sm text-slate-500">Active members</p>
              </div>
            </div>
          </div>

          {/* Floating events card */}
          <div className="hero-floating-card-delay absolute bottom-[5%] right-0 z-40 hidden rounded-2xl border border-white/10 bg-black/75 p-4 shadow-2xl backdrop-blur-xl sm:block lg:right-[-2%]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff9900]/10 text-[#ff9900]">
                <Play size={22} fill="currentColor" />
              </div>

              <div>
                <p className="text-xl font-bold text-white">25+</p>
                <p className="text-sm text-slate-500">Upcoming events</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-[#020713] to-transparent" />
    </section>
  );
}

export default Hero;