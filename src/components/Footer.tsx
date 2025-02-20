import React from "react";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h4>AlamOps</h4>
          <p>Transformando negocios a través de soluciones Cloud innovadoras.</p>
        </div>
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>Email: info@alamops.com</p>
          <p>Tel: +34 624 248 794</p>
        </div>
        <div className="footer-section social-links">
          <h4>Síguenos</h4>
            <a href="https://www.linkedin.com/company/alamops/" target="_blank"><i class="fab fa-linkedin"></i></a>
            <a href="https://www.facebook.com/profile.php?id=61572416526408" target="_blank"><i class="fab fa-facebook"></i></a>
            <a href="https://www.instagram.com/alamops_consulting/" target="_blank"><i class="fab fa-instagram"></i></a>            
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 AlamOps. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
