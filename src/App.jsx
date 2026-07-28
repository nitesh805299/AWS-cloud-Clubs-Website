import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";

function Section({ id, title }) {
  return (
    <section
      id={id}
      className="flex min-h-screen items-center justify-center border-b border-white/5 px-5"
    >
      <h2 className="text-4xl font-bold text-white md:text-6xl">{title}</h2>
    </section>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-[#020713] text-white">
      <Navbar />

      <main>
        <Hero />
        <About />

        <Section id="domains" title="Domains" />
        <Section id="events" title="Events" />
        <Section id="projects" title="Projects" />
        <Section id="resources" title="Resources" />
        <Section id="contact" title="Contact" />
        <Section id="join" title="Join AWS Cloud Club" />
      </main>
    </div>
  );
}

export default App;