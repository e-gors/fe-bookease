import Hero from "../sections/Hero";
import About from "../sections/About";
import Services from "../sections/Services";
import Contact from "../sections/Contact";
import Blog from "../sections/Blog";

export default function HomepageView() {
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
