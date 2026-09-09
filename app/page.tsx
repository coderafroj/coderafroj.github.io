import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import StatsStrip from "@/components/StatsStrip";
import ProjectsSection from "@/components/ProjectsSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import JourneySection from "@/components/JourneySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import Starfield from "@/components/Starfield";

export default function Home() {
  return (
    <>
      <Starfield />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <StatsStrip />
        <ProjectsSection />
        <CapabilitiesSection />
        <JourneySection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
