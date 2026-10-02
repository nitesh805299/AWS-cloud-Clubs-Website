import {
  ArrowUpRight,
  Award,
  BookOpenCheck,
  Cloud,
  Code2,
  ExternalLink,
  Mail,
  Network,
  Rocket,
  Users,
} from "lucide-react";

import aboutClubImage from "../../assets/about/about-club.jpg";
import missionImage from "../../assets/about/mission.jpg";
import visionImage from "../../assets/about/vision.jpg";
import whyJoinImage from "../../assets/about/why-join.jpg";
import facultyCoordinatorImage from "../../assets/about/faculty-coordinator.jpg";

const benefits = [
  {
    title: "AWS Workshops",
    description: "Practical sessions covering essential AWS services.",
    icon: Cloud,
  },
  {
    title: "Real Projects",
    description: "Build and deploy industry-focused cloud applications.",
    icon: Code2,
  },
  {
    title: "Certification Support",
    description: "Structured guidance for AWS learning and certifications.",
    icon: BookOpenCheck,
  },
  {
    title: "Community Learning",
    description: "Learn collaboratively with students, mentors and peers.",
    icon: Users,
  },
  {
    title: "Innovation",
    description: "Transform technical ideas into meaningful solutions.",
    icon: Rocket,
  },
  {
    title: "Professional Network",
    description: "Connect with cloud learners and technology professionals.",
    icon: Network,
  },
];

const statistics = [
  {
    value: "25+",
    label: "Active Members",
  },
  {
    value: "15+",
    label: "Technical Events",
  },
  {
    value: "10+",
    label: "Cloud Projects",
  },
  {
    value: "5+",
    label: "Learning Domains",
  },
];

function SectionBadge({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#ff9900]/25 bg-[#ff9900]/5 px-4 py-2">
      <span className="h-2 w-2 rounded-full bg-[#ff9900] shadow-[0_0_12px_rgba(255,153,0,0.9)]" />

      <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#ffad32] sm:text-sm">
        {children}
      </span>
    </div>
  );
}

function StoryImage({ src, alt, position = "center" }) {
  return (
    <div className="about-image-card group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]">
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#020713]/80 via-transparent to-transparent" />

      <img
        src={src}
        alt={alt}
        className={`h-full min-h-[360px] w-full object-cover transition duration-700 group-hover:scale-105 ${position}`}
      />

      <div className="pointer-events-none absolute inset-0 z-20 rounded-[28px] ring-1 ring-inset ring-white/5" />
    </div>
  );
}

function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#020713] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[8%] h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[130px]" />

        <div className="absolute right-[-10%] top-[42%] h-[520px] w-[520px] rounded-full bg-[#ff9900]/5 blur-[140px]" />

        <div className="about-grid absolute inset-0 opacity-20" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1450px]">
        {/* Section heading */}
        <div className="mx-auto max-w-4xl text-center">
          <SectionBadge>About AWS Cloud Club</SectionBadge>

          <h2 className="mt-6 text-4xl font-bold leading-tight tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
            Empowering Future Cloud Engineers at{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-[#ff9900] bg-clip-text text-transparent">
              AKGEC
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
            AWS Cloud Club is a student-led technical society at Ajay Kumar Garg
            Engineering College, Ghaziabad, focused on cloud technologies,
            innovation, practical learning and collaborative development.
          </p>
        </div>

        {/* Main club introduction */}
        <div className="mt-20 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <StoryImage
            src={aboutClubImage}
            alt="AWS Cloud Club students participating in a technical session"
          />

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
              Who We Are
            </p>

            <h3 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              A student community built around cloud learning and innovation
            </h3>

            <div className="mt-7 space-y-5 text-base leading-8 text-slate-400 sm:text-lg">
              <p>
                AWS Cloud Club at Ajay Kumar Garg Engineering College,
                Ghaziabad, provides students with an environment where they can
                explore cloud computing, software development, artificial
                intelligence, DevOps and modern technology practices.
              </p>

              <p>
                Through hands-on workshops, technical sessions, hackathons,
                collaborative projects and peer learning, the club helps
                students move beyond theoretical concepts and gain practical
                experience with AWS technologies.
              </p>

              <p>
                Our community encourages students to learn continuously, build
                real-world solutions, exchange knowledge and develop the
                technical and leadership skills required for successful careers
                in technology.
              </p>
            </div>

            <a
              href="#domains"
              className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-[#ff9900] px-6 py-3.5 font-bold text-black transition duration-300 hover:-translate-y-1 hover:bg-[#ffad32] hover:shadow-[0_14px_35px_rgba(255,153,0,0.22)]"
            >
              Explore Our Domains

              <ArrowUpRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>

        {/* Mission */}
        <div className="mt-28 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-5">
              <span className="text-5xl font-bold text-white/10 sm:text-7xl">
                01
              </span>

              <div className="h-px flex-1 bg-gradient-to-r from-[#ff9900]/50 to-transparent" />
            </div>

            <p className="mt-7 text-sm font-bold uppercase tracking-[0.25em] text-[#ff9900]">
              Our Mission
            </p>

            <h3 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Making students industry-ready through practical cloud education
            </h3>

            <p className="mt-6 text-base leading-8 text-slate-400 sm:text-lg">
              Our mission is to make cloud technologies accessible and
              understandable to students through workshops, technical
              mentorship, project-based learning and collaborative activities.
              We aim to help members develop practical skills, confidence and
              an innovation-focused mindset.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Hands-on learning",
                "AWS skill development",
                "Project-based education",
                "Student mentorship",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ff9900]/10 text-[#ff9900]">
                    ✓
                  </span>

                  <span className="text-sm font-medium text-slate-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <StoryImage
              src={missionImage}
              alt="Students learning cloud technologies during a workshop"
            />
          </div>
        </div>

        {/* Vision */}
        <div className="mt-28 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <StoryImage
            src={visionImage}
            alt="Students collaborating on an innovative technology project"
          />

          <div>
            <div className="flex items-center gap-5">
              <span className="text-5xl font-bold text-white/10 sm:text-7xl">
                02
              </span>

              <div className="h-px flex-1 bg-gradient-to-r from-blue-400/50 to-transparent" />
            </div>

            <p className="mt-7 text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
              Our Vision
            </p>

            <h3 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Building a strong community of learners, builders and technology
              leaders
            </h3>

            <p className="mt-6 text-base leading-8 text-slate-400 sm:text-lg">
              Our vision is to establish a vibrant cloud community where
              students actively learn, experiment and contribute. We want every
              member to receive the exposure, support and opportunities needed
              to become a capable cloud professional, innovator and community
              leader.
            </p>

            <blockquote className="mt-8 rounded-2xl border-l-4 border-blue-400 bg-blue-400/[0.06] px-6 py-5 text-lg font-medium italic leading-8 text-blue-100">
              “Learn together, build with purpose and use technology to create
              meaningful impact.”
            </blockquote>
          </div>
        </div>

        {/* Why join us */}
        <div className="mt-28 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-5">
              <span className="text-5xl font-bold text-white/10 sm:text-7xl">
                03
              </span>

              <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/50 to-transparent" />
            </div>

            <p className="mt-7 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
              Why Join Us?
            </p>

            <h3 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Everything you need to learn, build and grow in technology
            </h3>

            <p className="mt-6 text-base leading-8 text-slate-400 sm:text-lg">
              Members get access to practical learning opportunities,
              collaborative projects, certification guidance, leadership
              experience and a community of students who are passionate about
              modern technologies.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <article
                    key={benefit.title}
                    className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-blue-400/[0.05]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-300 transition group-hover:border-[#ff9900]/30 group-hover:bg-[#ff9900]/10 group-hover:text-[#ff9900]">
                      <Icon size={22} strokeWidth={1.8} />
                    </div>

                    <h4 className="mt-4 text-base font-bold text-white">
                      {benefit.title}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {benefit.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <StoryImage
              src={whyJoinImage}
              alt="AWS Cloud Club members collaborating during an event"
            />
          </div>
        </div>

        {/* Faculty Coordinator */}
        <div className="mt-32">
          <div className="mx-auto max-w-4xl text-center">
            <SectionBadge>Faculty Guidance</SectionBadge>

            <h3 className="mt-6 text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl">
              Meet Our Faculty Coordinator
            </h3>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              Providing academic guidance, mentorship and continuous support to
              help the club and its members grow.
            </p>
          </div>

          <div className="relative mx-auto mt-14 max-w-6xl overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.025] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.3)] sm:p-8 lg:p-10">
            {/* Card glow */}
            <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]" />

            <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#ff9900]/10 blur-[100px]" />

            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
              {/* Faculty image */}
              <div className="group relative mx-auto w-full max-w-[370px]">
                <div className="absolute -inset-3 rounded-[30px] bg-gradient-to-br from-blue-500/25 via-transparent to-[#ff9900]/25 blur-xl opacity-70" />

                <div className="relative overflow-hidden rounded-[26px] border border-white/15 bg-[#071020] p-2">
                  <img
                    src={facultyCoordinatorImage}
                    alt="Faculty Coordinator of AWS Cloud Club AKGEC"
                    className="aspect-[4/5] w-full rounded-[20px] object-cover object-top transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-black/70 px-4 py-2 text-xs font-semibold text-blue-300 backdrop-blur-xl">
                  <Award size={16} />
                  Faculty Coordinator
                </div>
              </div>

              {/* Faculty details */}
              <div className="text-center lg:text-left">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#ff9900]">
                  Faculty Coordinator
                </p>

                <h4 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                  Dr. Faculty Name
                </h4>

                <p className="mt-3 text-lg font-medium text-blue-300">
                  Department of Computer Science and Engineering
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Ajay Kumar Garg Engineering College, Ghaziabad
                </p>

                <p className="mt-7 text-base leading-8 text-slate-400 sm:text-lg">
                  Our Faculty Coordinator provides valuable guidance and
                  mentorship to the AWS Cloud Club. Their academic leadership
                  helps students explore emerging technologies, organize
                  meaningful technical activities, build real-world projects
                  and develop skills aligned with current industry requirements.
                </p>

                <blockquote className="mt-7 rounded-2xl border border-blue-400/15 bg-blue-400/[0.05] p-5 text-base italic leading-7 text-slate-300">
                  “Our aim is to create an environment where students can
                  experiment, collaborate and develop practical technology
                  skills with confidence.”
                </blockquote>

                <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                  <a
                    href="mailto:faculty.email@akgec.ac.in"
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 font-semibold text-white transition hover:border-blue-400/30 hover:bg-blue-400/10 sm:w-auto"
                  >
                    <Mail size={19} className="text-blue-400" />
                    Email
                  </a>

                 <a
                  href="#faculty-profile"
                  className="flex w-full items-center                 justify-center gap-3 rounded-xl border border-                [#ff9900]/40 bg-[#ff9900]/5 px-5 py-3                 font-semibold text-[#ff9900] transition                 hover:bg-[#ff9900] hover:text-black sm:w-auto"
                >
                 <ExternalLink size={19} />
                   LinkedIn
                 </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-24 grid grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] md:grid-cols-4">
          {statistics.map((stat, index) => (
            <div
              key={stat.label}
              className={`relative px-5 py-8 text-center sm:py-10 ${
                index % 2 === 0 ? "border-r border-white/10" : ""
              } ${
                index < 2 ? "border-b border-white/10 md:border-b-0" : ""
              } ${index === 1 ? "md:border-r" : ""} ${
                index === 2 ? "md:border-r" : ""
              }`}
            >
              <p className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                {stat.value}
              </p>

              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;