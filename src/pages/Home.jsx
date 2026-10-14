import Hero from "../components/Hero";
import Services from "../components/Services";
import Projects from "../components/Projects";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

function Home() {
  return (
    <main>

      <Hero />

      <section className="intro-section">

        <div className="container intro-grid">

          <div>
            <p className="section-label">
              OUR PHILOSOPHY
            </p>

            <h2>
              Spaces designed to
              <span> feel like home.</span>
            </h2>
          </div>

          <div>

            <p>
              We believe great interiors are more than beautiful
              spaces. They should reflect your personality, support
              your lifestyle and make everyday living comfortable.
            </p>

            <p>
              From concept to completion, our approach focuses on
              thoughtful, functional and timeless design.
            </p>

          </div>

        </div>

      </section>

      <Services />

      <Projects />

      <Testimonials />

      <Contact />

    </main>
  );
}

export default Home;