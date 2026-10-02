import { useRef } from "react";
import { ArrowRight, Cloud } from "lucide-react";

const domains = [
  {
    id: "frontend-development",
    number: "01",
    title: "Frontend Development",
    description:
      "Build responsive, interactive and visually engaging interfaces for modern web applications.",
    video: null,
    accent: "#2997ff",
    secondary: "#22d3ee",
    background:
      "linear-gradient(135deg, #04142d 0%, #08396f 50%, #031020 100%)",
  },
  {
    id: "backend-development",
    number: "02",
    title: "Backend Development",
    description:
      "Create secure APIs, scalable servers and powerful database-driven applications.",
    video: null,
    accent: "#39e58c",
    secondary: "#16a66a",
    background:
      "linear-gradient(135deg, #031b16 0%, #07543b 50%, #021510 100%)",
  },
  {
    id: "ai-machine-learning",
    number: "03",
    title: "AI / Machine Learning",
    description:
      "Build intelligent models and explore technologies that solve real-world problems.",
    video: null,
    accent: "#a855f7",
    secondary: "#7c3aed",
    background:
      "linear-gradient(135deg, #17052e 0%, #461582 50%, #100321 100%)",
  },
  {
    id: "app-development",
    number: "04",
    title: "App Development",
    description:
      "Design and develop high-performance mobile applications for Android and iOS.",
    video: null,
    accent: "#ff9900",
    secondary: "#f97316",
    background:
      "linear-gradient(135deg, #281300 0%, #743800 50%, #1b0c00 100%)",
  },
  {
    id: "devops",
    number: "05",
    title: "DevOps",
    description:
      "Automate, deploy and monitor applications using CI/CD and cloud infrastructure.",
    video: null,
    accent: "#22d3ee",
    secondary: "#0284c7",
    background:
      "linear-gradient(135deg, #021b2a 0%, #07516f 50%, #03141f 100%)",
  },
  {
    id: "ui-ux-design",
    number: "06",
    title: "UI / UX Designer",
    description:
      "Create intuitive, accessible and user-centered digital experiences.",
    video: null,
    accent: "#f755b5",
    secondary: "#db2777",
    background:
      "linear-gradient(135deg, #29061c 0%, #72174b 50%, #1d0413 100%)",
  },
];

const particles = [
  { left: "10%", top: "16%", delay: "0s", size: 3 },
  { left: "82%", top: "13%", delay: "-1s", size: 4 },
  { left: "73%", top: "69%", delay: "-2s", size: 3 },
  { left: "18%", top: "82%", delay: "-3s", size: 4 },
  { left: "50%", top: "22%", delay: "-1.5s", size: 2 },
  { left: "91%", top: "48%", delay: "-2.7s", size: 2 },
];

function DomainCard({ domain }) {
  const cardRef = useRef(null);

  const handleMouseMove = (event) => {
    const card = cardRef.current;

    if (!card || window.innerWidth < 768) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 6;
    const rotateX = (y / rect.height - 0.5) * -6;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
    card.style.setProperty("--rotate-x", `${rotateX}deg`);
    card.style.setProperty("--rotate-y", `${rotateY}deg`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;

    if (!card) return;

    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
  };

  return (
    <article
      id={domain.id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="domain-card group relative isolate min-h-[390px] overflow-hidden rounded-[24px]"
      style={{
        "--domain-accent": domain.accent,
        "--domain-secondary": domain.secondary,
        "--mouse-x": "50%",
        "--mouse-y": "50%",
        "--rotate-x": "0deg",
        "--rotate-y": "0deg",
      }}
    >
      {/* Animated border */}
      <div className="domain-border pointer-events-none absolute inset-0 rounded-[24px]" />

      {/* Media background */}
      <div
        className="domain-media absolute inset-[1px] overflow-hidden rounded-[23px]"
        style={{ background: domain.background }}
      >
        {domain.video ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="domain-video absolute inset-0 h-full w-full object-cover"
            aria-hidden="true"
          >
            <source src={domain.video} type="video/mp4" />
          </video>
        ) : (
          <>
            <div className="domain-fallback absolute inset-0" />

            <div
              className="domain-orb absolute -right-20 -top-20 h-72 w-72 rounded-full"
              style={{ backgroundColor: domain.accent }}
            />

            <div
              className="domain-orb domain-orb-two absolute -bottom-28 -left-20 h-72 w-72 rounded-full"
              style={{ backgroundColor: domain.secondary }}
            />

            <div className="domain-code-lines absolute inset-0">
              {Array.from({ length: 10 }).map((_, index) => (
                <span
                  key={index}
                  style={{
                    width: `${32 + ((index * 19) % 58)}%`,
                    animationDelay: `${index * -0.3}s`,
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Particles */}
      <div className="pointer-events-none absolute inset-0 z-[2]">
        {particles.map((particle, index) => (
          <span
            key={index}
            className="domain-particle absolute rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              backgroundColor: domain.accent,
              boxShadow: `0 0 14px ${domain.accent}`,
            }}
          />
        ))}
      </div>

      {/* Dark overlays */}
      <div className="absolute inset-[1px] z-[3] rounded-[23px] bg-black/20" />

      <div className="absolute inset-[1px] z-[3] rounded-[23px] bg-gradient-to-t from-[#010611] via-[#010611]/75 to-transparent" />

      <div className="absolute inset-[1px] z-[3] rounded-[23px] bg-gradient-to-r from-[#010611]/55 via-transparent to-transparent" />

      {/* Mouse reflection */}
      <div className="domain-reflection pointer-events-none absolute inset-[1px] z-[4] rounded-[23px]" />

      {/* Glass streak */}
      <div className="domain-glass-streak pointer-events-none absolute inset-y-0 z-[5] w-40 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[390px] flex-col justify-between p-6 sm:p-7">
        <div className="flex items-start justify-between">
          <span
            className="inline-flex h-12 min-w-12 items-center justify-center rounded-xl border bg-black/30 px-3 text-lg font-black backdrop-blur-xl"
            style={{
              color: domain.accent,
              borderColor: `${domain.accent}80`,
              boxShadow: `0 0 20px ${domain.accent}25`,
            }}
          >
            {domain.number}
          </span>

          <span
            className="translate-y-2 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] opacity-0 backdrop-blur-xl transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
            style={{
              color: domain.accent,
              borderColor: `${domain.accent}55`,
              backgroundColor: `${domain.accent}12`,
            }}
          >
            Domain
          </span>
        </div>

        <div>
          <h3 className="max-w-[400px] text-[28px] font-black uppercase leading-[1.04] tracking-[-0.035em] text-white sm:text-[31px]">
            {domain.title}
          </h3>

          <div
            className="mt-4 h-[3px] w-12 rounded-full transition-all duration-500 group-hover:w-24"
            style={{
              backgroundColor: domain.accent,
              boxShadow: `0 0 12px ${domain.accent}`,
            }}
          />

          <p className="mt-5 max-w-md text-sm leading-7 text-slate-300 sm:text-[15px]">
            {domain.description}
          </p>

          <a
            href={`#${domain.id}`}
            className="mt-6 inline-flex items-center gap-3 rounded-full border bg-black/30 px-5 py-2.5 text-sm font-black uppercase tracking-[0.08em] backdrop-blur-xl transition-all duration-500 hover:gap-5"
            style={{
              color: domain.accent,
              borderColor: `${domain.accent}70`,
            }}
          >
            Explore More
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      {/* Bottom glow */}
      <div
        className="absolute inset-x-[8%] bottom-0 z-20 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${domain.accent}, transparent)`,
          boxShadow: `0 0 14px ${domain.accent}`,
        }}
      />
    </article>
  );
}

function Domains() {
  return (
    <section
      id="domains"
      className="relative overflow-hidden bg-[#010611] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      {/* Section background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="domains-grid absolute inset-0 opacity-30" />

        <div className="absolute left-1/2 top-0 h-[600px] w-[950px] -translate-x-1/2 rounded-full bg-purple-600/[0.07] blur-[150px]" />

        <div className="absolute -left-52 top-[40%] h-[500px] w-[500px] rounded-full bg-blue-500/[0.07] blur-[140px]" />

        <div className="absolute -right-52 bottom-[5%] h-[500px] w-[500px] rounded-full bg-[#ff9900]/[0.06] blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px]">
        {/* Heading */}
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 backdrop-blur-xl">
            <Cloud size={20} className="text-cyan-400" />

            <span className="text-sm font-black uppercase tracking-[0.28em] text-slate-200 sm:text-base">
              AWS Cloud Club
            </span>
          </div>

          <h2 className="mt-7 bg-gradient-to-r from-[#2997ff] via-[#a855f7] to-[#ffad21] bg-clip-text text-5xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-transparent sm:text-7xl lg:text-[105px] xl:text-[120px]">
            Our Domains
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
            Six powerful domains. Endless opportunities. Choose your path,
            develop practical skills and build the future with technology.
          </p>

          <div className="mx-auto mt-6 flex max-w-[260px] items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-400" />

            <Cloud
              size={22}
              className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]"
            />

            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#ff9900]" />
          </div>
        </div>

        {/* Domain cards */}
        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {domains.map((domain) => (
            <DomainCard key={domain.id} domain={domain} />
          ))}
        </div>

        {/* Bottom strip */}
        <div className="mt-8 grid overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.025] backdrop-blur-xl sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Student Driven",
              text: "Created by students, for students.",
            },
            {
              title: "Learn. Build. Grow",
              text: "Hands-on learning and practical projects.",
            },
            {
              title: "Cloud First",
              text: "Learning powered by AWS technologies.",
            },
            {
              title: "Impact the Future",
              text: "Solve real problems and create impact.",
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className={`px-6 py-6 ${
                index < 3 ? "border-b border-white/10 xl:border-b-0" : ""
              } ${index < 3 ? "xl:border-r xl:border-white/10" : ""}`}
            >
              <p className="font-bold text-white">{item.title}</p>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Domains;