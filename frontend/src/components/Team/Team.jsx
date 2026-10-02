import { useMemo, useState } from "react";
import { Sparkles, Users } from "lucide-react";

import TeamCard from "./TeamCard";
import { teamFilters, teamMembers } from "./teamData";

function Team() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredMembers = useMemo(() => {
    if (activeFilter === "All") {
      return teamMembers;
    }

    return teamMembers.filter(
      (member) => member.domain === activeFilter,
    );
  }, [activeFilter]);

  return (
    <section
      id="team"
      className="relative overflow-hidden bg-[#010611] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="team-grid absolute inset-0 opacity-25" />

        <div className="absolute left-1/2 top-0 h-[600px] w-[950px] -translate-x-1/2 rounded-full bg-purple-600/[0.07] blur-[150px]" />

        <div className="absolute -left-44 top-[40%] h-[450px] w-[450px] rounded-full bg-blue-500/[0.07] blur-[135px]" />

        <div className="absolute -right-44 bottom-[4%] h-[450px] w-[450px] rounded-full bg-[#ff9900]/[0.06] blur-[135px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px]">
        {/* Heading */}
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-5 py-2.5 backdrop-blur-xl">
            <Users size={19} className="text-blue-400" />

            <span className="text-sm font-black uppercase tracking-[0.25em] text-slate-200 sm:text-base">
              Our Community
            </span>
          </div>

          <h2 className="mt-7 bg-gradient-to-r from-white via-blue-300 to-[#ff9900] bg-clip-text text-5xl font-black uppercase leading-none tracking-[-0.055em] text-transparent sm:text-7xl lg:text-[92px]">
            Meet the Team
          </h2>

          <p className="mx-auto mt-7 max-w-4xl text-base leading-8 text-slate-400 sm:text-lg">
            Meet the passionate innovators, developers, designers, and cloud
            enthusiasts who are shaping the future of technology by learning,
            building, and leading with AWS Cloud Club at AKGEC.
          </p>

          <div className="mx-auto mt-6 flex max-w-[260px] items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-400" />

            <Sparkles
              size={20}
              className="text-[#ff9900] drop-shadow-[0_0_10px_rgba(255,153,0,0.65)]"
            />

            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-400" />
          </div>
        </div>

        {/* Filters */}
        <div className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-center gap-3">
          {teamFilters.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-5 py-2.5 text-sm font-bold transition duration-300 ${
                  isActive
                    ? "border-[#ff9900] bg-[#ff9900] text-black shadow-[0_0_25px_rgba(255,153,0,0.25)]"
                    : "border-white/10 bg-white/[0.035] text-slate-300 hover:-translate-y-1 hover:border-[#ff9900]/50 hover:text-[#ff9900]"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Member count */}
        <div className="mt-10 flex items-center justify-between border-b border-white/10 pb-4">
          <p className="text-sm font-semibold text-slate-500">
            Showing{" "}
            <span className="font-black text-white">
              {filteredMembers.length}
            </span>{" "}
            team members
          </p>

          <p className="hidden text-xs font-bold uppercase tracking-[0.2em] text-slate-600 sm:block">
            AWS Cloud Club · AKGEC
          </p>
        </div>

        {/* Members grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMembers.map((member, index) => (
            <TeamCard
              key={member.id}
              member={member}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;