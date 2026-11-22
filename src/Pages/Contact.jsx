import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const infoCards = [
  { id: 1, icon: "📍", title: "Address", text: "Ranchi, Jharkhand, India" },
  { id: 2, icon: "📞", title: "Phone", text: "+91 6200992980" },
  { id: 3, icon: "✉️", title: "Email", text: "prabhatsingh@gmail.com" },
  { id: 4, icon: "🕒", title: "Timing", text: "10 AM - 11 PM" },
];

const MAX_CHARS = 300;

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General Query",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
const [sendError, setSendError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function validate() {
    const newErrors = {};

    if (form.name.trim().length < 2) {
      newErrors.name = "Please enter your name";
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email";
    }
    if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  }

 
  async function handleSubmit(e) {
  e.preventDefault();

  const newErrors = validate();
  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) return;

  setSending(true);
  setSendError("");

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name: form.name,
        title: form.subject,
        message: form.message,
        from_email: form.email,
        time: new Date().toLocaleString(),
      },
      { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
    );
    setSent(true);
  } catch {
    setSendError("Message could not be sent. Please try again.");
  } finally {
    setSending(false);
  }
}

  function handleReset() {
    setForm({ name: "", email: "", subject: "General Query", message: "" });
    setSent(false);
  }

  return (
    <div className="contact-page">
      <h1>Contact Us 📬</h1>
      <p className="contact-sub">We would love to hear from you</p>

      <div className="info-row">
        {infoCards.map((c) => (
          <div className="contact-info-card" key={c.id}>
            <div className="info-icon">{c.icon}</div>
            <h3>{c.title}</h3>
            <p>{c.text}</p>
          </div>
        ))}
      </div>

      <div className="contact-layout">
        {sent ? (
          <div className="contact-form success-box">
            <h2>✅ Message Sent!</h2>
            <p>Thank you, {form.name}. We will reply to {form.email} soon.</p>
            <button onClick={handleReset}>Send Another Message</button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <h3>Send a Message</h3>

            <div className="field">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="field">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="field">
              <select name="subject" value={form.subject} onChange={handleChange}>
                <option>General Query</option>
                <option>Order Issue</option>
                <option>Feedback</option>
                <option>Partnership</option>
              </select>
            </div>

            <div className="field">
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                maxLength={MAX_CHARS}
                value={form.message}
                onChange={handleChange}
              />
              <div className="field-foot">
                {errors.message ? (
                  <span className="error">{errors.message}</span>
                ) : (
                  <span></span>
                )}
                <span className="counter">
                  {form.message.length}/{MAX_CHARS}
                </span>
              </div>
            </div>

                       {sendError && <span className="error">{sendError}</span>}

            <button type="submit" disabled={sending}>
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}

        <div className="map-box">
          <iframe
            title="Foodies location"
            src="https://www.google.com/maps?q=Ranchi,Jharkhand&output=embed"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;