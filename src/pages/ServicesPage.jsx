import { Link } from "react-router-dom";

const services = [
  {
    number: "01",
    title: "Residential Interiors",
    description:
      "Complete interior solutions for apartments, villas and independent homes."
  },
  {
    number: "02",
    title: "Commercial Interiors",
    description:
      "Modern and functional workspaces designed around business requirements."
  },
  {
    number: "03",
    title: "Modular Kitchens",
    description:
      "Efficient kitchens with smart storage and practical layouts."
  },
  {
    number: "04",
    title: "Bedroom Design",
    description:
      "Comfortable bedrooms designed around your lifestyle."
  },
  {
    number: "05",
    title: "Living Spaces",
    description:
      "Inviting living spaces combining comfort, style and functionality."
  },
  {
    number: "06",
    title: "Custom Interiors",
    description:
      "Personalized design solutions created for specific requirements."
  }
];

function ServicesPage() {
  return (
    <main>

      <section className="page-hero">

        <p className="section-label">
          OUR EXPERTISE
        </p>

        <h1>
          Interior solutions for every space.
        </h1>

        <p>
          From a single room to a complete property, we create
          interiors around your requirements.
        </p>

      </section>

      <section className="all-services">

        <div className="container">

          {services.map((service) => (
            <div
              className="large-service-card"
              key={service.number}
            >

              <span>
                {service.number}
              </span>

              <h2>
                {service.title}
              </h2>

              <p>
                {service.description}
              </p>

              <Link to="/contact">
                Discuss Your Project →
              </Link>

            </div>
          ))}

        </div>

      </section>

    </main>
  );
}

export default ServicesPage;