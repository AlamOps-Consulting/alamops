import React, { useState } from "react";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_c0gabxh",  // Reemplaza con tu Service ID de EmailJS
        "template_xebilip", // Reemplaza con tu Template ID de EmailJS
        formData,
        "iEVrBKwqOvCLICTdh"  // Reemplaza con tu Public Key de EmailJS
      )
      .then(
        (response) => {
          console.log("Correo enviado exitosamente", response);
          alert("Mensaje enviado correctamente!");
          setFormData({ name: "", email: "", phone: "", message: "" });
        },
        (error) => {
          console.error("Error al enviar el correo", error);
          alert("Hubo un error al enviar el mensaje.");
        }
      );
  };

  return (
    <section id="contacto" className="contact">
      <h2>Contáctenos</h2>
      <div className="contact-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Mensaje"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
