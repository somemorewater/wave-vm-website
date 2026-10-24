import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import { Features, HowItWorks, OpenSource, Closing, Footer } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Features />
        <HowItWorks />
        <OpenSource />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
