import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import RegistrationHero from "../components/Registration/RegistrationHero";
import RegistrationForm from "../components/Registration/RegistrationForm";
import SelectionProcess from "../components/Registration/SelectionProcess";

function RegistrationPage() {
  return (
    <div className="min-h-screen bg-[#010611] text-white">
      <Navbar />

      <main>
        <RegistrationHero />
        <RegistrationForm />
        <SelectionProcess />
      </main>

      <Footer showJoinCTA={false} />
    </div>
  );
}

export default RegistrationPage;