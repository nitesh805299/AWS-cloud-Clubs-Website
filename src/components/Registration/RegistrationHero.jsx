import {
  ArrowDown,
  BriefcaseBusiness,
  Code2,
  Rocket,
  Users,
} from "lucide-react";

import cloudClubsLogo from "../../assets/logos/aws-cloud-clubs-logo-transparent.png";

const heroFeatures = [
  {
    icon: Code2,
    title: "Learn",
    description: "Hands-on workshops and expert-led technical sessions.",
  },
  {
    icon: Users,
    title: "Build",
    description: "Collaborate on practical projects with motivated students.",
  },
  {
    icon: Rocket,
    title: "Grow",
    description: "Develop leadership, networking and career-ready skills.",
  },
];

function RegistrationHero() {
  const scrollToForm = () => {
    document.getElementById("registration-form")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#010611] px-5 pb-20 pt-32 sm:px-8 lg:px-12 lg:pt-40">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="registration-grid absolute inset-0 opacity-30" />

        <div className="absolute left-[10%] top-[20%] h-[420px] w-[420px] rounded-full bg-blue-600/[0.08] blur-[150px]" />

        <div className="absolute right-[5%] top-[15%] h-[520px] w-[520px] rounded-full bg-[#ff9900]/[0.08] blur-[170px]" />

        <div className="registration-particle absolute left-[12%] top-[30%]" />
        <div className="registration-particle absolute left-[42%] top-[20%]" />
        <div className="registration-particle absolute right-[18%] top-[25%]" />
        <div className="registration-particle absolute right-[35%] top-[55%]" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-150px)] max-w-[1500px] items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left content */}
        <div>
          <div className="inline-flex items-center gap-3 rounded-full border border-[#ff9900]/30 bg-[#ff9900]/10 px-5 py-2.5">
            <BriefcaseBusiness size={18} className="text-[#ff9900]" />

            <span className="text-xs font-black uppercase tracking-[0.22em] text-[#ffad32] sm:text-sm">
              Join the Community
            </span>
          </div>

          <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[1.04] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl xl:text-[84px]">
            Your Cloud Journey{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-[#ff9900] bg-clip-text text-transparent">
              Starts Here.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Join AWS Cloud Club AKGEC and become part of a student community
            focused on cloud computing, software development, innovation and
            collaborative learning.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {heroFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group border-l border-white/10 pl-5 first:border-l-0 first:pl-0 sm:first:border-l sm:first:pl-5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ff9900]/25 bg-[#ff9900]/10 text-[#ff9900] transition duration-300 group-hover:-translate-y-1 group-hover:border-[#ff9900]/60">
                    <Icon size={22} />
                  </div>

                  <h2 className="mt-4 text-lg font-black text-white">
                    {feature.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={scrollToForm}
            className="group mt-10 inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-[#ff5f1f] to-[#ff9900] px-7 py-4 font-black text-black shadow-[0_14px_45px_rgba(255,153,0,0.24)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(255,153,0,0.34)]"
          >
            Start Application

            <ArrowDown
              size={20}
              className="transition-transform duration-300 group-hover:translate-y-1"
            />
          </button>
        </div>

        {/* Cloud visual */}
        <div className="relative flex min-h-[520px] items-center justify-center">
          <div className="absolute h-[480px] w-[480px] rounded-full border border-blue-500/15 bg-blue-500/[0.025] shadow-[0_0_100px_rgba(59,130,246,0.12)] sm:h-[560px] sm:w-[560px]" />

          <div className="registration-orbit absolute h-[390px] w-[390px] rounded-full border border-[#ff9900]/20 sm:h-[470px] sm:w-[470px]">
            <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-[#ff9900] shadow-[0_0_18px_rgba(255,153,0,1)]" />
          </div>

          <div className="registration-orbit-reverse absolute h-[300px] w-[300px] rounded-full border border-blue-400/20 sm:h-[370px] sm:w-[370px]">
            <span className="absolute bottom-6 right-4 h-3 w-3 rounded-full bg-blue-400 shadow-[0_0_16px_rgba(96,165,250,1)]" />
          </div>

          <div className="registration-cloud relative z-10 flex h-[250px] w-[390px] items-center justify-center sm:h-[300px] sm:w-[480px]">
            <div className="absolute bottom-[22%] left-[8%] h-[42%] w-[84%] rounded-[100px] border border-blue-400/70 bg-[#07101e]/90 shadow-[0_0_35px_rgba(59,130,246,0.45),0_0_65px_rgba(255,153,0,0.18)]" />

            <div className="absolute left-[21%] top-[24%] h-[43%] w-[32%] rounded-full border-l border-t border-blue-400/80 bg-[#07101e]" />

            <div className="absolute right-[20%] top-[13%] h-[54%] w-[42%] rounded-full border-r border-t border-[#ff9900]/75 bg-[#07101e]" />

            <div className="absolute right-[5%] top-[42%] h-[34%] w-[31%] rounded-full border-r border-t border-[#ff9900]/70 bg-[#07101e]" />

            <div className="relative z-20 flex flex-col items-center">
               <img
                 src={cloudClubsLogo}
                 alt="Cloud Club"
                 className="
                   h-24 w-36 object-contain
               
                   brightness-0
                   invert
               
                   contrast-125
                   brightness-150
               
                   drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]
                   drop-shadow-[0_0_35px_rgba(96,165,250,0.45)]
               
                   opacity-100
                 "
               />

              <p className="mt-1 text-xl font-black text-white sm:text-2xl">
                Cloud Club
              </p>

              <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-[#ff9900]">
                AKGEC
              </p>
            </div>
          </div>

          <div className="absolute bottom-[8%] h-12 w-[75%] rounded-full bg-blue-500/20 blur-2xl" />

          <div className="absolute bottom-[11%] h-20 w-[65%] rounded-[50%] border border-blue-500/30 shadow-[0_0_35px_rgba(59,130,246,0.35),0_0_50px_rgba(255,153,0,0.15)]" />

          <div className="absolute bottom-[17%] h-12 w-[45%] rounded-[50%] border border-[#ff9900]/40" />
        </div>
      </div>
    </section>
  );
}

export default RegistrationHero;