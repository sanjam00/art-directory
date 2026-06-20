import { useState } from "react";
import '../index.css'

export default function ContactPage(){
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipient = "your-email@example.com";
    const subject = encodeURIComponent(formData.subject || "Contact from ArtIndex");
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="page-content contact-page">
      <h1>Contact</h1>
      <p>Send a message directly from the contact page. Your browser email client will open so you can send it straight to me.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address*</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="you@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            className="form-input"
            placeholder="Reason for reaching out"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="form-textarea"
            placeholder="Write your message here"
          />
        </div>

        <button type="submit" className="form-submit">Send Message</button>
      </form>
    </div>
  )
}
