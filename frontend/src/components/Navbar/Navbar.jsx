import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  CalendarDays,
  House,
  LogIn,
  LogOut,
  Mail,
  Menu,
  PlusCircle,
  ShieldCheck,
  Ticket,
  User,
  Users,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
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
  const { user, isAuthenticated, isTeamMember, isAdmin, logout } = useAuth();

  const isRegistrationPage = location.pathname === "/register" || location.pathname === "/join";
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

          {/* Desktop authentication / role actions */}
          <div className="hidden items-center gap-3 xl:flex">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-bold text-white transition hover:border-[#ff9900] hover:text-[#ff9900]"
                >
                  <LogIn size={15} />
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff5f1f] to-[#ff9900] px-5 py-2.5 text-xs font-black text-black shadow-[0_8px_20px_rgba(255,153,0,0.25)] transition hover:shadow-[0_12px_28px_rgba(255,153,0,0.35)]"
                >
                  <ArrowRight size={15} />
                  Register
                </Link>
              </>
            ) : (
              <>
                {(isAdmin || isTeamMember) && (
                  <>
                    <Link
                      to="/admin/events"
                      className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-bold text-white transition hover:border-[#ff9900] hover:text-[#ff9900]"
                    >
                      <ShieldCheck size={14} className="text-[#ff9900]" />
                      Organizer Portal
                    </Link>
                    <Link
                      to="/admin/create-event"
                      className="flex items-center gap-1.5 rounded-full border border-[#ff9900]/40 bg-[#ff9900]/10 px-3.5 py-2 text-xs font-bold text-[#ff9900] transition hover:bg-[#ff9900]/20"
                    >
                      <PlusCircle size={14} />
                      + Event
                    </Link>
                  </>
                )}

                {!isAdmin && !isTeamMember && (
                  <Link
                    to="/my-registrations"
                    className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-bold text-white transition hover:border-[#ff9900] hover:text-[#ff9900]"
                  >
                    <Ticket size={14} className="text-[#ff9900]" />
                    My Passes
                  </Link>
                )}

                {/* User Profile Pill */}
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 py-1 pl-1.5 pr-3 text-xs">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ff9900] text-xs font-black text-black">
                    {user?.name ? user.name[0].toUpperCase() : "U"}
                  </div>
                  <span className="max-w-[90px] truncate font-semibold text-slate-200">
                    {user?.name?.split(" ")[0]}
                  </span>
                  <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-slate-400">
                    {user?.role === "admin" ? "Admin" : user?.role === "team_member" ? "Team" : "Student"}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  title="Sign Out"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
                >
                  <LogOut size={15} />
                </button>
              </>
            )}
          </div>

          {/* Tablet and mobile actions */}
          <div className="flex items-center gap-2 xl:hidden">
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="hidden items-center gap-1.5 rounded-xl border border-white/15 px-3.5 py-2 text-xs font-bold text-white transition hover:border-[#ff9900] hover:text-[#ff9900] sm:flex"
              >
                <LogIn size={14} />
                Sign In
              </Link>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <span className="rounded-lg bg-[#ff9900]/15 px-2.5 py-1 text-xs font-bold text-[#ff9900]">
                  {user?.name?.split(" ")[0]}
                </span>
              </div>
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

          {/* Role specific mobile links */}
          {isAuthenticated && (isAdmin || isTeamMember) && (
            <>
              <li className="border-b border-white/10">
                <Link
                  to="/admin/events"
                  onClick={closeMenu}
                  className="flex w-full items-center gap-4 rounded-lg px-3 py-4 text-left text-base font-medium text-[#ff9900] hover:bg-[#ff9900]/10"
                >
                  <ShieldCheck size={22} />
                  <span>Organizer Dashboard</span>
                </Link>
              </li>
              <li className="border-b border-white/10">
                <Link
                  to="/admin/create-event"
                  onClick={closeMenu}
                  className="flex w-full items-center gap-4 rounded-lg px-3 py-4 text-left text-base font-medium text-slate-200 hover:bg-white/5"
                >
                  <PlusCircle size={22} />
                  <span>Create New Event</span>
                </Link>
              </li>
            </>
          )}

          {isAuthenticated && !isAdmin && !isTeamMember && (
            <li className="border-b border-white/10">
              <Link
                to="/my-registrations"
                onClick={closeMenu}
                className="flex w-full items-center gap-4 rounded-lg px-3 py-4 text-left text-base font-medium text-[#ff9900] hover:bg-[#ff9900]/10"
              >
                <Ticket size={22} />
                <span>My Registered Passes</span>
              </Link>
            </li>
          )}
        </ul>

        <div className="space-y-3 px-4 pb-5 sm:px-6">
          {isAuthenticated ? (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">{user?.name}</p>
                  <p className="text-xs text-slate-400">{user?.email}</p>
                </div>
                <span className="rounded bg-[#ff9900]/20 px-2 py-0.5 text-[10px] font-black uppercase text-[#ff9900]">
                  {user?.role}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  logout();
                  closeMenu();
                  navigate("/");
                }}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 py-2.5 text-xs font-bold text-red-400 transition hover:bg-red-500/20"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-3 text-xs font-bold text-white transition hover:border-[#ff9900]"
              >
                <LogIn size={15} />
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#ff9900] py-3 text-xs font-black text-black transition hover:bg-[#ffad32]"
              >
                Register
                <ArrowRight size={15} />
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default Navbar;