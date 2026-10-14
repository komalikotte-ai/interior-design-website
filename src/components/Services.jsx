import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  Building2,
  CookingPot,
  Palette
} from "lucide-react";

const services = [
  {
    icon: HomeIcon,
    title: "Residential Interiors",
    text: "Beautiful and functional homes designed around your lifestyle."
  },
  {
    icon: Building2,
    title: "Commercial Spaces",
    text: "Professional environments designed for people and business."
  },
  {
    icon: CookingPot,
    title: "Modular Kitchens",
    text: "Smart kitchen solutions combining style, storage and functionality."
  },
  {
    icon: Palette,
    title: "Custom Design",
    text: "Personalized interiors created around your requirements."
  }
];

function Services() {
  return (
    <section className="services-section">

      <div className="container">

        <div className="section-heading">

          <div>
            <p className="section-label">
              WHAT WE DO
            </p>

            <h2>Our Services</h2>
          </div>

          <p>
            From complete interior transformations to individual
            spaces, we focus on thoughtful and functional design.
          </p>

        </div>

        <div className="services-grid">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div className="service-card" key={service.title}>

                <div className="service-icon">
                  <Icon size={28} strokeWidth={1.5} />
                </div>

                <span className="service-number">
                  0{index + 1}
                </span>

                <h3>{service.title}</h3>

                <p>{service.text}</p>

                <Link to="/contact">
                  Learn More →
                </Link>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default Services;