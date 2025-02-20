import React from "react";

const News: React.FC = () => {
  return (    
    <section id="news" className="news">
      <h2>Últimas Noticias</h2>
      <div class="news-grid">
        <article class="news-card">
          <div class="news-date">15 Nov 2024</div>
          <h3>AlamOps obtiene certificación en AWS</h3>
          <p>Nuestro equipo amplía sus capacidades multi-cloud con nuevas certificaciones en AWS, fortaleciendo nuestra experiencia en soluciones cloud.</p>
          <a href="#" class="read-more">Leer más <i class="fas fa-arrow-right"></i></a>
        </article>
        <article class="news-card">
          <div class="news-date">1 Nov 2024</div>
          <h3>Nuevo servicio de FinOps Multi-Cloud</h3>
          <p>Lanzamos nuestro servicio integral de optimización de costos para entornos AWS, Azure y GCP, ayudando a nuestros clientes a maximizar su inversión.</p>
          <a href="#" class="read-more">Leer más <i class="fas fa-arrow-right"></i></a>
        </article>
        <article class="news-card">
          <div class="news-date">20 Oct 2024</div>
          <h3>Caso de éxito: Migración Multi-Cloud</h3>
          <p>Completamos exitosamente la migración de infraestructura crítica para un cliente del sector financiero utilizando una estrategia multi-cloud.</p>
          <a href="#" class="read-more">Leer más <i class="fas fa-arrow-right"></i></a>
        </article>
      </div>
    </section>
  );
};

export default News;
