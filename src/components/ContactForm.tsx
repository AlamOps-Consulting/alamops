import React, { useState } from "react";
import emailjs from "emailjs-com";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .send(
        "service_c0gabxh",
        "template_xebilip",{
            to_name: "AlamOps",
            from_name: formData.name,
            message: formData.message +" \n Teléfono " + formData.phone,        
        },        
        "iEVrBKwqOvCLICTdh"
      )   
      .then(() => alert("Mensaje enviado correctamente!"))
      .catch(() => alert("Hubo un error al enviar el mensaje."));
  };

  return (
    <section id="contacto" className="contact">
      <h2>Contáctenos</h2>
      <div className="contact-container">
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} />
          <textarea name="message" placeholder="Mensaje" value={formData.message} onChange={handleChange} required></textarea>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
