import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <p className="hero-label">
          INTERIOR DESIGN & ARCHITECTURE
        </p>

        <h1>
          Thoughtful spaces.
          <br />
          Timeless living.
        </h1>

        <p className="hero-description">
          We design elegant and functional interiors that transform
          everyday spaces into places worth living in.
        </p>

        <div className="hero-buttons">

          <Link to="/projects" className="primary-button">
            Explore Our Work
          </Link>

          <Link to="/contact" className="secondary-button">
            Start a Project
          </Link>

        </div>

      </div>

      <div className="hero-scroll">
        SCROLL TO EXPLORE
      </div>

    </section>
  );
}

export default Hero;