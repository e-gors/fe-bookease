import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Contact from "../components/Contact";
import Blog from "../components/Blog";

export default function Homepage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Blog />
      <Contact />
    </>
  );
}
