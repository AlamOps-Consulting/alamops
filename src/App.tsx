import React from "react";
import ContactForm from "./components/ContactForm"; // Importamos el formulario de contacto
import "./styles.css"; // Asegúrate de que tus estilos sigan funcionando

function App() {
  return (
    <div>
      <header>
        <nav>
          <div className="logo">
            <img src="/public/Alamops.png" alt="AlamOps Logo" width="50" />
            <h1>AlamOps - Expertos en Cloud Computing</h1>
          </div>
          <ul className="nav-links">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#nosotros">Nosotros</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="inicio">
          <h1>Expertos en Multi-Cloud</h1>
          <p>Potenciamos su transformación digital con soluciones en AWS, Azure y Google Cloud.</p>
          <a href="https://calendly.com/ceo-alamops" target="_blank" rel="noopener noreferrer">
            Consulta Gratuita
          </a>
        </section>

        {/* Sección de Contacto */}
        <ContactForm />
      </main>

      <footer>
        <p>&copy; 2024 AlamOps. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
