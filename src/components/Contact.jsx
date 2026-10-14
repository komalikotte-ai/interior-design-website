import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="contact-section">

      <div className="container contact-grid">

        <div className="contact-info">

          <p className="section-label">
            GET IN TOUCH
          </p>

          <h2>
            Let's create something beautiful.
          </h2>

          <p>
            Have a project in mind? Tell us about it and our team
            will get back to you.
          </p>

          <div className="contact-item">
            <Mail size={20} />

            <div>
              <span>Email</span>
              <p>hello@example.com</p>
            </div>
          </div>

          <div className="contact-item">
            <Phone size={20} />

            <div>
              <span>Phone</span>
              <p>+91 98765 43210</p>
            </div>
          </div>

          <div className="contact-item">
            <MapPin size={20} />

            <div>
              <span>Studio</span>
              <p>Hyderabad, India</p>
            </div>
          </div>

        </div>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          <label>
            Your Name

            <input
              type="text"
              placeholder="Enter your name"
              required
            />
          </label>

          <label>
            Email Address

            <input
              type="email"
              placeholder="Enter your email"
              required
            />
          </label>

          <label>
            Phone Number

            <input
              type="tel"
              placeholder="Enter your phone number"
            />
          </label>

          <label>
            Project Type

            <select defaultValue="" required>

              <option value="" disabled>
                Select project type
              </option>

              <option value="residential">
                Residential
              </option>

              <option value="commercial">
                Commercial
              </option>

              <option value="kitchen">
                Kitchen
              </option>

              <option value="renovation">
                Renovation
              </option>

              <option value="other">
                Other
              </option>

            </select>
          </label>

          <label>
            Tell us about your project

            <textarea
              rows="5"
              placeholder="Tell us about your requirements..."
              required
            />
          </label>

          <button
            type="submit"
            className="primary-button"
          >
            Send Enquiry
          </button>

          {submitted && (
            <p className="form-success">
              Thank you! Your enquiry has been received.
            </p>
          )}

        </form>

      </div>

    </section>
  );
}

export default Contact;