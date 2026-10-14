import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="footer">

      <div className="container footer-grid">

        <div>
          <div className="footer-logo">
            <strong>ARCADIA</strong>
            <span>INTERIORS</span>
          </div>

          <p>
            Thoughtful interiors designed for modern living.
          </p>
        </div>

        <div>
          <h4>Explore</h4>

          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div>
          <h4>Contact</h4>

          <p>Hyderabad, India</p>
          <p>hello@example.com</p>
          <p>+91 98765 43210</p>
        </div>

        <div>
          <h4>Follow</h4>

          <div className="social-icons">
            <a href="#" aria-label="Instagram">
              <Instagram size={20} />
            </a>

            <a href="#" aria-label="Facebook">
              <Facebook size={20} />
            </a>

            <a href="#" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

      </div>

      <div className="footer-bottom container">
        <p>© 2026 Arcadia Interiors. All rights reserved.</p>
        <p>Interior Design & Architecture</p>
      </div>

    </footer>
  );
}

export default Footer;