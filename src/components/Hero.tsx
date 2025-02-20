import React from "react";
import Carousel from "./Carousel";
import CloudAnimation from "./CloudAnimation";

const Hero: React.FC = () => {
  return (
    <section id="inicio" className="hero">
      <CloudAnimation />
      <div className="hero-content">
        <h1>Expertos en Multi-Cloud</h1>
        <p>Potenciamos su transformación digital con soluciones en AWS, Azure y Google Cloud.</p>        
        <a href="https://calendly.com/ceo-alamops" target="_blank" className="cta-button"> Consulta Gratuita </a>
      </div>
      <Carousel />
    </section>
  );
};

export default Hero;
