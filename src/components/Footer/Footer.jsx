import {
  FaArrowUp,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaLocationDot,
} from "react-icons/fa6";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Domains", href: "#domains" },
  { label: "Events", href: "#events" },
  { label: "Team", href: "#team" },
];

const exploreLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Resources", href: "#resources" },
  { label: "Gallery", href: "#gallery" },
  { label: "Join the Club", href: "#join" },
  { label: "Contact Us", href: "#contact" },
];

function Footer({ showJoinCTA = true }) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-white/10 bg-[#01050d]"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="footer-grid absolute inset-0 opacity-30" />

        <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-blue-600/[0.07] blur-[140px]" />

        <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#ff9900]/[0.07] blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 pt-20 sm:px-8 lg:px-12">
        {/* Top CTA */}
         {/* Top CTA — only shown when showJoinCTA is true */}
{showJoinCTA && (
  <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.035] px-6 py-10 sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-14 lg:py-12">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.06] via-transparent to-[#ff9900]/[0.07]" />

    <div className="relative z-10 max-w-3xl">
      <p className="text-sm font-black uppercase tracking-[0.24em] text-[#ff9900]">
        Build. Learn. Grow.
      </p>

      <h2 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
        Ready to begin your cloud journey?
      </h2>

      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
        Join AWS Cloud Club AKGEC and become part of a student-led community
        focused on cloud computing, development, innovation and collaborative
        learning.
      </p>
    </div>

    <div className="relative z-10 mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0">
      <a
        href="/register"
        className="inline-flex items-center justify-center rounded-xl bg-[#ff9900] px-7 py-4 font-black text-black transition duration-300 hover:-translate-y-1 hover:bg-[#ffad32] hover:shadow-[0_16px_40px_rgba(255,153,0,0.22)]"
      >
        Join the Community
      </a>

      <a
        href="mailto:awscloudclub@akgec.ac.in"
        className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-7 py-4 font-bold text-white transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-blue-400/10"
      >
        Contact Us
      </a>
    </div>
  </div>
)}

        {/* Main footer content */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.1fr]">
          {/* Brand */}
          <div>
            <a
              href="#home"
              className="inline-flex items-center gap-3"
              aria-label="AWS Cloud Club home"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ff9900]/30 bg-[#ff9900]/10 text-xl font-black text-[#ff9900]">
                AWS
              </div>

              <div>
                <p className="text-lg font-black text-white">
                  AWS Cloud Club
                </p>

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  AKGEC
                </p>
              </div>
            </a>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
              AWS Cloud Club at Ajay Kumar Garg Engineering College is a
              student-led technical community where students explore cloud
              computing, software development, artificial intelligence,
              DevOps and emerging technologies.
            </p>

            {/* Social links */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                aria-label="AWS Cloud Club LinkedIn"
                className="footer-social-icon"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                aria-label="AWS Cloud Club Instagram"
                className="footer-social-icon"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                aria-label="AWS Cloud Club GitHub"
                className="footer-social-icon"
              >
                <FaGithub />
              </a>

              <a
                href="mailto:awscloudclub@akgec.ac.in"
                aria-label="Email AWS Cloud Club"
                className="footer-social-icon"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-base font-black uppercase tracking-[0.16em] text-white">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-base font-black uppercase tracking-[0.16em] text-white">
              Explore
            </h3>

            <ul className="mt-6 space-y-4">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-black uppercase tracking-[0.16em] text-white">
              Contact
            </h3>

            <div className="mt-6 space-y-5">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4"
              >
                <span className="footer-contact-icon">
                  <FaLocationDot />
                </span>

                <span className="text-sm leading-6 text-slate-400 transition group-hover:text-white">
                  Ajay Kumar Garg Engineering College,
                  <br />
                  Ghaziabad, Uttar Pradesh
                </span>
              </a>

              <a
                href="mailto:awscloudclub@akgec.ac.in"
                className="group flex items-start gap-4"
              >
                <span className="footer-contact-icon">
                  <FaEnvelope />
                </span>

                <span className="break-all text-sm leading-6 text-slate-400 transition group-hover:text-white">
                  awscloudclub@akgec.ac.in
                </span>
              </a>
            </div>

            <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff9900]">
                Community Focus
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Learn cloud technologies, collaborate on projects and connect
                with passionate student developers.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-5 border-t border-white/10 py-7 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-sm text-slate-500">
            © {currentYear} AWS Cloud Club AKGEC. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-slate-500 sm:justify-end">
            <a
              href="#"
              className="transition hover:text-white"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="transition hover:text-white"
            >
              Code of Conduct
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition duration-300 hover:-translate-y-1 hover:border-[#ff9900]/60 hover:bg-[#ff9900] hover:text-black"
            >
              <FaArrowUp />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;