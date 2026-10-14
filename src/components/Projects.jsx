import { Link } from "react-router-dom";

const projects = [
  {
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    title: "Modern Residence",
    category: "Residential"
  },
  {
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    title: "Minimal Living",
    category: "Residential"
  },
  {
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    title: "Contemporary Villa",
    category: "Luxury Interior"
  }
];

function Projects() {
  return (
    <section className="projects-section">

      <div className="container">

        <div className="section-heading">

          <div>
            <p className="section-label">
              SELECTED WORK
            </p>

            <h2>Featured Projects</h2>
          </div>

          <Link to="/projects" className="text-link">
            View All Projects →
          </Link>

        </div>

        <div className="projects-grid">

          {projects.map((project) => (
            <article className="project-card" key={project.title}>

              <div className="project-image">
                <img
                  src={project.image}
                  alt={project.title}
                />
              </div>

              <div className="project-info">

                <div>
                  <span>{project.category}</span>

                  <h3>{project.title}</h3>
                </div>

                <span className="project-arrow">
                  ↗
                </span>

              </div>

            </article>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Projects;