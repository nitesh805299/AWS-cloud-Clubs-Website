import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  CalendarDays,
  House,
  Mail,
  Menu,
  Users,
  X,
} from "lucide-react";

import cloudClubsLogo from "../../assets/logos/cloud-clubs-logo.png";
import awsLogo from "../../assets/logos/aws-logo.png";

const navLinks = [
  {
    name: "Home",
    sectionId: "home",
    icon: House,
  },
  {
    name: "About",
    sectionId: "about",
    icon: Users,
  },
  {
    name: "Domains",
    sectionId: "domains",
    icon: Boxes,
  },
  {
    name: "Members",
    sectionId: "team",
    icon: Users,
  },
  {
    name: "Events",
    sectionId: "events",
    icon: CalendarDays,
  },
  {
    name: "Contact",
    sectionId: "contact",
    icon: Mail,
  },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isRegistrationPage = location.pathname === "/register";
  const isHomePage = location.pathname === "/";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  /*
   * Navbar background and active-section tracking.
   * Active section tracking is only required on the home page.
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (!isHomePage) {
        return;
      }

      const sections = navLinks
        .map((link) => document.getElementById(link.sectionId))
        .filter(Boolean);

      let currentSection = "home";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  /*
   * Prevent page scrolling while the mobile menu is open.
   */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  /*
   * Close mobile menu whenever route changes.
   */
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    const navbarOffset = 105;
    const sectionPosition =
      section.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset;

    window.scrollTo({
      top: sectionPosition,
      behavior: "smooth",
    });

    setActiveSection(sectionId);
  };

  /*
   * When already on Home Page, scroll directly.
   * When on Registration Page, navigate Home first,
   * then locate and scroll to the requested section.
   */
  const handleNavClick = (sectionId) => {
    closeMenu();

    if (isHomePage) {
      scrollToSection(sectionId);
      return;
    }

    navigate(`/#${sectionId}`);

    window.setTimeout(() => {
      scrollToSection(sectionId);
    }, 150);
  };

  const handleBrandClick = () => {
    closeMenu();

    if (isHomePage) {
      scrollToSection("home");
      return;
    }

    navigate("/#home");

    window.setTimeout(() => {
      scrollToSection("home");
    }, 150);
  };

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "px-3 pt-3 sm:px-5"
            : "px-3 pt-3 sm:px-5 lg:pt-5"
        }`}
      >
        <nav
          className={`mx-auto flex max-w-[1500px] items-center justify-between rounded-2xl border px-4 transition-all duration-500 sm:px-6 lg:px-8 ${
            isScrolled
              ? "h-[74px] border-orange-500/30 bg-black/85 shadow-[0_10px_40px_rgba(255,153,0,0.12),0_1px_0_rgba(255,153,0,0.75)] backdrop-blur-2xl"
              : "h-[82px] border-white/10 bg-black/75 backdrop-blur-xl"
          }`}
        >
          {/* Brand */}
          <button
            type="button"
            onClick={handleBrandClick}
            className="flex min-w-0 items-center text-left"
            aria-label="Go to AWS Cloud Club home"
          >
            <img
              src={cloudClubsLogo}
              alt="AWS Cloud Clubs logo"
              className="h-[58px] w-[78px] shrink-0 object-contain sm:h-[64px] sm:w-[90px]"
            />

            <span className="mx-3 h-11 w-px shrink-0 bg-white/20 sm:mx-4" />

            <div className="flex min-w-0 items-center gap-0">
              <img
                src={awsLogo}
                alt="AWS"
                className="
                  h-10 w-auto shrink-0 object-contain
                  -mr-3
                  sm:h-12 sm:-mr-4
                  md:h-14 md:-mr-5
                  lg:mt-1 lg:h-16 lg:-mr-6
                  xl:mt-2 xl:h-[72px] xl:-mr-7
                  2xl:mt-2 2xl:h-[78px] 2xl:-mr-8
                "
              />

              <span className="hidden whitespace-nowrap text-lg font-semibold text-white min-[420px]:block sm:text-xl lg:text-2xl">
                Cloud clubs
              </span>
            </div>
          </button>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-7 xl:flex">
            {navLinks.map((link) => {
              const isActive =
                isHomePage && activeSection === link.sectionId;

              return (
                <li key={link.name}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.sectionId)}
                    className={`relative block py-7 text-sm font-semibold transition-colors duration-300 ${
                      isActive
                        ? "text-[#ff9900]"
                        : "text-slate-200 hover:text-[#ff9900]"
                    }`}
                  >
                    {link.name}

                    <span
                      className={`absolute bottom-4 left-0 h-0.5 bg-[#ff9900] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Desktop primary button */}
          {isRegistrationPage ? (
            <Link
              to="/"
              className="hidden items-center gap-3 rounded-full border border-[#ff9900] px-6 py-3 text-sm font-semibold text-[#ff9900] transition-all duration-300 hover:bg-[#ff9900] hover:text-black hover:shadow-[0_0_24px_rgba(255,153,0,0.28)] xl:flex"
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>
          ) : (
            <Link
              to="/register"
              className="hidden items-center gap-3 rounded-full border border-[#ff9900] px-6 py-3 text-sm font-semibold text-[#ff9900] transition-all duration-300 hover:bg-[#ff9900] hover:text-black hover:shadow-[0_0_24px_rgba(255,153,0,0.28)] xl:flex"
            >
              Join Club
              <ArrowRight size={18} />
            </Link>
          )}

          {/* Tablet and mobile actions */}
          <div className="flex items-center gap-2 xl:hidden">
            {isRegistrationPage ? (
              <Link
                to="/"
                className="hidden items-center gap-2 rounded-xl border border-[#ff9900] px-4 py-2.5 text-sm font-semibold text-[#ff9900] transition hover:bg-[#ff9900] hover:text-black sm:flex"
              >
                <ArrowLeft size={17} />
                Home
              </Link>
            ) : (
              <Link
                to="/register"
                className="hidden items-center gap-2 rounded-xl border border-[#ff9900] px-4 py-2.5 text-sm font-semibold text-[#ff9900] transition hover:bg-[#ff9900] hover:text-black sm:flex"
              >
                Join
                <ArrowRight size={17} />
              </Link>
            )}

            <button
              type="button"
              onClick={() =>
                setIsMenuOpen((currentValue) => !currentValue)
              }
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white transition hover:border-[#ff9900] hover:text-[#ff9900]"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile navigation */}
      <aside
        id="mobile-navigation"
        className={`fixed left-3 right-3 top-[96px] z-50 max-h-[calc(100vh-112px)] overflow-y-auto rounded-2xl border border-white/10 bg-[#060606]/95 shadow-2xl backdrop-blur-2xl transition-all duration-500 sm:left-5 sm:right-5 xl:hidden ${
          isMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-5 opacity-0"
        }`}
      >
        <ul className="px-4 py-4 sm:px-6">
          {navLinks.map((link) => {
            const Icon = link.icon;

            const isActive =
              isHomePage && activeSection === link.sectionId;

            return (
              <li
                key={link.name}
                className="border-b border-white/10 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => handleNavClick(link.sectionId)}
                  className={`flex w-full items-center gap-4 rounded-lg px-3 py-4 text-left text-base font-medium transition ${
                    isActive
                      ? "bg-[#ff9900]/10 text-[#ff9900]"
                      : "text-slate-200 hover:bg-white/5 hover:text-[#ff9900]"
                  }`}
                >
                  <Icon size={22} strokeWidth={1.8} />
                  <span>{link.name}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="px-4 pb-5 sm:px-6">
          {isRegistrationPage ? (
            <Link
              to="/"
              onClick={closeMenu}
              className="flex w-full items-center justify-center gap-4 rounded-xl bg-[#ff9900] px-5 py-4 font-bold text-black transition hover:bg-[#ffad32]"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
          ) : (
            <Link
              to="/register"
              onClick={closeMenu}
              className="flex w-full items-center justify-center gap-4 rounded-xl bg-[#ff9900] px-5 py-4 font-bold text-black transition hover:bg-[#ffad32]"
            >
              Join AWS Cloud Club
              <ArrowRight size={20} />
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}

export default Navbar;