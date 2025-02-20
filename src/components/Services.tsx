import React from "react";

const Services: React.FC = () => {
  return (
    <section id="servicios" className="services">
      <h2>Nuestros Servicios</h2>
      <div className="services-grid">
        <div className="service-card">
          <i className="fas fa-cloud"></i>
          <h3>Multi-Cloud Strategy</h3>
          <p>Diseño e implementación de estrategias multi-cloud optimizadas para su negocio.</p>
        </div>
        <div className="service-card">
          <i className="fas fa-shield-alt"></i>
          <h3>Cloud Security</h3>
          <p>Protección integral y gobierno en entornos multi-cloud.</p>
        </div>
        <div className="service-card">
          <i className="fas fa-sync"></i>
          <h3>DevOps & Automation</h3>
          <p>Automatización y CI/CD en cualquier proveedor cloud.</p>
        </div>
        <div className="service-card">
          <i className="fas fa-chart-line"></i>
          <h3>FinOps</h3>
          <p>Optimización de costos en todas sus plataformas cloud.</p>
        </div>
      </div>
    </section>
  );
};

export default Services;
