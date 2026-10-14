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
    category: "Luxury"
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80",
    title: "Warm Minimalism",
    category: "Residential"
  },
  {
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    title: "Elegant Apartment",
    category: "Apartment"
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    title: "Contemporary Space",
    category: "Luxury"
  }
];

function ProjectsPage() {
  return (
    <main>

      <section className="page-hero">

        <p className="section-label">
          OUR PORTFOLIO
        </p>

        <h1>
          Spaces we've brought to life.
        </h1>

        <p>
          Explore a selection of interior design concepts.
        </p>

      </section>

      <section className="all-projects">

        <div className="container projects-page-grid">

          {projects.map((project) => (
            <article
              className="project-card"
              key={project.title}
            >

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

      </section>

    </main>
  );
}

export default ProjectsPage;