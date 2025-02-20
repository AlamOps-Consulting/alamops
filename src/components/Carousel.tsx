import React, { useState, useEffect } from "react";

const slides = [
  "cloud-providers",
  "cloud-services",
  "devops-tools",
  "monitoring-stack",
  "cicd-pipeline",
];

const Carousel: React.FC = () => {
  const totalSlides = slides.length;
  const [currentSlide, setCurrentSlide] = useState(0);

  // Control automático de los slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      <div
        className="carousel-track"
        style={{
          display: "flex",
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: "transform 0.8s ease-in-out",
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className={`carousel-slide ${slide}`} style={{ flex: "0 0 100%" }}>
            {slide === "cloud-providers" && (
              <div className="provider-grid">
                <div className="provider-card">
                    <svg class="cloud-logo aws" viewBox="0 0 100 100">
                    <path d="M25.3,31.7c0,1.5,0.2,2.7,0.5,3.6c0.3,0.9,0.8,1.8,1.4,2.8c0.2,0.3,0.3,0.6,0.3,0.9c0,0.4-0.2,0.8-0.7,1.2l-2.2,1.5
                        c-0.3,0.2-0.6,0.3-0.9,0.3c-0.3,0-0.7-0.2-1-0.5c-0.5-0.5-0.9-1.1-1.3-1.7c-0.4-0.6-0.8-1.3-1.1-2c-2.8,3.3-6.3,5-10.5,5
                        c-3,0-5.4-0.9-7.1-2.6c-1.7-1.7-2.6-4-2.6-6.9c0-3.1,1.1-5.6,3.3-7.4c2.2-1.9,5.1-2.8,8.8-2.8c1.2,0,2.5,0.1,3.8,0.3
                        c1.3,0.2,2.7,0.4,4.1,0.8v-2.6c0-2.7-0.6-4.6-1.7-5.7c-1.1-1.1-3-1.6-5.7-1.6c-1.2,0-2.5,0.1-3.8,0.4c-1.3,0.3-2.5,0.7-3.7,1.1
                        c-0.5,0.2-0.9,0.3-1.2,0.4c-0.3,0.1-0.5,0.1-0.7,0.1c-0.6,0-0.9-0.4-0.9-1.3v-2c0-0.7,0.1-1.2,0.3-1.5c0.2-0.3,0.6-0.6,1.1-0.9
                        c1.3-0.7,2.9-1.2,4.7-1.7c1.8-0.5,3.7-0.7,5.7-0.7c4.3,0,7.5,1,9.5,2.9c2,1.9,3,4.8,3,8.7V31.7z M13.2,37.1c1.2,0,2.4-0.2,3.7-0.7
                        c1.3-0.5,2.4-1.3,3.3-2.4c0.6-0.7,1-1.5,1.2-2.4c0.2-0.9,0.4-2,0.4-3.3v-1.6c-1-0.2-2.1-0.4-3.2-0.6c-1.1-0.1-2.2-0.2-3.3-0.2
                        c-2.3,0-4,0.5-5.1,1.4c-1.1,0.9-1.6,2.2-1.6,3.9c0,1.6,0.4,2.8,1.2,3.6C10.6,36.7,11.7,37.1,13.2,37.1z"/>
                    </svg>
                    <span>Amazon Web Services</span>
                </div>
                <div className="provider-card">
                    <svg class="cloud-logo azure" viewBox="0 0 100 100">
                    <path d="M45.8,26.7L31.6,50.3l14.2,23.6h28.4L88.4,50.3L74.2,26.7H45.8z M11.6,73.9l19.1-23.6L11.6,26.7H40l19.1,23.6L40,73.9
                        H11.6z"/>
                    </svg>
                    <span>Microsoft Azure</span>
                </div>
                <div className="provider-card">
                    <svg class="cloud-logo gcp" viewBox="0 0 100 100">
                    <path d="M50,20.8L20.8,37.5v25L50,79.2l29.2-16.7v-25L50,20.8z M50,29.2l20.8,12.5v16.7L50,70.8L29.2,58.3V41.7L50,29.2z"/>
                    </svg>
                    <span>Google Cloud Platform</span>
                </div>
              </div>
            )}

            {slide === "cloud-services" && (
              <div className="services-container">
                <h3>Servicios Multi-Cloud</h3>
                <div className="services-list">
                  <div className="service-item">
                    <i className="fas fa-server"></i>
                    <span>Compute</span>
                  </div>
                  <div className="service-item">
                    <i className="fas fa-database"></i>
                    <span>Storage</span>
                  </div>
                  <div className="service-item">
                    <i className="fas fa-network-wired"></i>
                    <span>Networking</span>
                  </div>
                  <div className="service-item">
                    <i className="fas fa-shield-alt"></i>
                    <span>Security</span>
                  </div>
                </div>
              </div>
            )}

            {slide === "devops-tools" && (
                <div class="tools-grid">
                    <div class="tool-item">
                        <svg class="tool-logo kubernetes" viewBox="0 0 100 100">
                        <path d="M50,20c-16.6,0-30,13.4-30,30s13.4,30,30,30s30-13.4,30-30S66.6,20,50,20z M50,70c-11,0-20-9-20-20s9-20,20-20
                            s20,9,20,20S61,70,50,70z"/>
                        </svg>
                        <span>Kubernetes</span>
                    </div>
                    <div class="tool-item">
                        <svg class="tool-logo terraform" viewBox="0 0 100 100">
                        <path d="M35,20v20l15,8.7V28.7L35,20z M65,48.7l-15,8.7v20l15-8.7V48.7z M35,45v20l15,8.7V53.7L35,45z M65,23.7L50,32.4v20
                            l15-8.7V23.7z"/>
                        </svg>
                        <span>Terraform</span>
                    </div>
                    <div class="tool-item">
                        <svg class="tool-logo docker" viewBox="0 0 100 100">
                        <path d="M50,20c-16.6,0-30,13.4-30,30s13.4,30,30,30s30-13.4,30-30S66.6,20,50,20z M65,65H35V35h30V65z"/>
                        </svg>
                        <span>Docker</span>
                    </div>
                </div>
            )}

            {slide === "monitoring-stack" && (
                <div class="monitoring-tools">
                    <div class="tool-row">
                    <svg class="tool-logo prometheus" viewBox="0 0 100 100">
                        <path d="M50,20c-16.6,0-30,13.4-30,30s13.4,30,30,30s30-13.4,30-30S66.6,20,50,20z M50,70c-11,0-20-9-20-20s9-20,20-20
                        s20,9,20,20S61,70,50,70z"/>
                    </svg>
                    <span>Prometheus</span>
                    </div>
                    <div class="tool-row">
                    <svg class="tool-logo grafana" viewBox="0 0 100 100">
                        <path d="M50,20c-16.6,0-30,13.4-30,30s13.4,30,30,30s30-13.4,30-30S66.6,20,50,20z M65,65H35V35h30V65z"/>
                    </svg>
                    <span>Grafana</span>
                    </div>
                    <div class="tool-row">
                    <svg class="tool-logo loki" viewBox="0 0 100 100">
                        <path d="M35,20v20l15,8.7V28.7L35,20z M65,48.7l-15,8.7v20l15-8.7V48.7z"/>
                    </svg>
                    <span>Loki</span>
                    </div>
                </div>
            )}
            {slide === "cicd-pipeline" && (
                <div class="pipeline-stages">
                    <div class="stage">
                        <i class="fas fa-code"></i>
                        <span>Code</span>
                    </div>
                    <i class="fas fa-arrow-right"></i>
                    <div class="stage">
                        <i class="fas fa-vial"></i>
                        <span>Test</span>
                    </div>
                    <i class="fas fa-arrow-right"></i>
                    <div class="stage">
                        <i class="fas fa-box"></i>
                        <span>Build</span>
                    </div>
                    <i class="fas fa-arrow-right"></i>
                    <div class="stage">
                        <i class="fas fa-rocket"></i>
                        <span>Deploy</span>
                    </div>
                </div>
            )}

          </div>
        ))}
      </div>

      <button
        className="carousel-btn prev"
        onClick={() => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)}
      >
        &lt;
      </button>
      <button
        className="carousel-btn next"
        onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)}
      >
        &gt;
      </button>

      <div className="carousel-dots">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
