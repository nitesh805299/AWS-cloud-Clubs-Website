import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="team-social-link flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#ff9900]/70 hover:bg-[#ff9900] hover:text-black hover:shadow-[0_0_22px_rgba(255,153,0,0.4)]"
    >
      {children}
    </a>
  );
}

function TeamCard({ member, index }) {
  return (
    <article
      className="team-card group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.035] shadow-[0_24px_70px_rgba(0,0,0,0.3)] backdrop-blur-xl"
      style={{
        animationDelay: `${index * 70}ms`,
      }}
    >
      {/* Top glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[75px]" />

      {/* Image section */}
      <div className="relative aspect-[4/4.7] overflow-hidden">
        <img
          src={member.image}
          alt={`${member.name} - ${member.role}`}
          className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-110"
        />

        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020713] via-transparent to-transparent" />

        {/* Hover blur overlay */}
        <div className="team-overlay absolute inset-0 flex flex-col items-center justify-center bg-[#020713]/55 px-5 text-center opacity-0 backdrop-blur-md transition duration-500 group-hover:opacity-100">
          <p className="translate-y-4 text-xs font-bold uppercase tracking-[0.22em] text-[#ff9900] opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            {member.domain}
          </p>

          <h4 className="mt-3 translate-y-4 text-2xl font-black text-white opacity-0 transition duration-500 delay-75 group-hover:translate-y-0 group-hover:opacity-100">
            {member.role}
          </h4>

          {/* Social icons */}
          <div className="mt-6 flex translate-y-5 items-center gap-3 opacity-0 transition duration-500 delay-150 group-hover:translate-y-0 group-hover:opacity-100">
            <SocialLink
              href={member.linkedin}
              label={`${member.name} LinkedIn`}
            >
              <FaLinkedinIn size={20} />
            </SocialLink>

            <SocialLink
              href={member.github}
              label={`${member.name} GitHub`}
            >
              <FaGithub size={20} />
            </SocialLink>

            <SocialLink
              href={member.instagram}
              label={`${member.name} Instagram`}
            >
              <FaInstagram size={20} />
            </SocialLink>
          </div>
        </div>

        {/* Member number */}
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-xs font-bold text-white backdrop-blur-xl">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Member information */}
      <div className="relative z-10 px-5 pb-6 pt-5 text-center">
        <h3 className="text-xl font-black text-white sm:text-2xl">
          {member.name}
        </h3>

        <p className="mt-2 text-sm font-semibold text-blue-300">
          {member.role}
        </p>

        <p className="mt-2 text-xs font-bold uppercase tracking-[0.17em] text-slate-500">
          AWS Cloud Club · AKGEC
        </p>
      </div>

      {/* Bottom animated line */}
      <div className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-blue-500 via-[#ff9900] to-purple-500 transition-all duration-500 group-hover:w-full" />
    </article>
  );
}

export default TeamCard;