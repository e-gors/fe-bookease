import Hero from "../components/homepage/Hero";
import About from "../components/homepage/About";
import Services from "../components/homepage/Services";
import Contact from "../components/homepage/Contact";
import Blog from "../components/homepage/Blog";

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
