const testimonials = [
  {
    name: "Client One",
    role: "Homeowner",
    review:
      "The design process was simple, thoughtful and focused on our requirements."
  },
  {
    name: "Client Two",
    role: "Business Owner",
    review:
      "The space was designed with a good balance of functionality and style."
  },
  {
    name: "Client Three",
    role: "Apartment Owner",
    review:
      "We appreciated the attention to detail and the personalized design."
  }
];

function Testimonials() {
  return (
    <section className="testimonials-section">

      <div className="container">

        <div className="section-heading">

          <div>
            <p className="section-label">
              CLIENT STORIES
            </p>

            <h2>What Our Clients Say</h2>
          </div>

          <p>
            Thoughtful design begins with understanding the people
            who will use the space.
          </p>

        </div>

        <div className="testimonials-grid">

          {testimonials.map((testimonial) => (
            <div
              className="testimonial-card"
              key={testimonial.name}
            >

              <div className="stars">
                ★★★★★
              </div>

              <p className="testimonial-review">
                "{testimonial.review}"
              </p>

              <div className="testimonial-person">

                <div className="person-avatar">
                  {testimonial.name.charAt(0)}
                </div>

                <div>
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;