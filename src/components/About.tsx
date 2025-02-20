import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faClock, faHandshake } from "@fortawesome/free-solid-svg-icons";

const About: React.FC = () => {
  return (
    <section id="nosotros" className="about">
      <h2>¿Por qué AlamOps?</h2>
      <div className="features-grid">
        <div className="feature">
          <FontAwesomeIcon icon={faCloudUploadAlt} size="3x" />
          <h3>Multi-Cloud Experts</h3>
          <p>Especialistas certificados en AWS, Azure y Google Cloud</p>
        </div>
        <div className="feature">
          <FontAwesomeIcon icon={faClock} size="3x" />
          <h3>24/7 Soporte</h3>
          <p>Asistencia continua para su negocio</p>
        </div>
        <div className="feature">
          <FontAwesomeIcon icon={faHandshake} size="3x" />
          <h3>Compromiso</h3>
          <p>Soluciones personalizadas para cada cliente</p>
        </div>
      </div>
    </section>
  );
};

export default About;
