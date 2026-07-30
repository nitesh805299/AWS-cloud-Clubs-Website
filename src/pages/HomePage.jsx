import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Domains from "../components/Domains/Domains";
import Team from "../components/Team/Team";
import Events from "../components/Events/Events";
import Footer from "../components/Footer/Footer";

function HomePage() {
  return (
    <div className="min-h-screen bg-[#010611] text-white">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Domains />
        <Team />
        <Events />
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;