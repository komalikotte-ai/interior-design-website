import Contact from "../components/Contact";

function ContactPage() {
  return (
    <main>
      <section className="page-hero">

        <p className="section-label">
          GET IN TOUCH
        </p>

        <h1>
          Let's design something beautiful.
        </h1>

        <p>
          Have a project in mind? Tell us a little about it and
          our team will get back to you.
        </p>

      </section>

      <Contact />
    </main>
  );
}

export default ContactPage;