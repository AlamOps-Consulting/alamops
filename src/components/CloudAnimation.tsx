import React, { useEffect } from "react";

const CloudAnimation: React.FC = () => {
  useEffect(() => {
    const cloudLogos = [
        {
          name: "aws",
          color: "#FF9900",
          svg: `<path d="m86.4 66.4c0 3.7.4 6.7 1.1 8.9.8 2.2 1.8 4.6 3.2 7.2.5.8.7 1.6.7 2.3 0 1-.6 2-1.9 3l-6.3 4.2c-.9.6-1.8.9-2.6.9-1 0-2-.5-3-1.4-1.4-1.5-2.6-3.1-3.6-4.7-1-1.7-2-3.6-3.1-5.9-7.8 9.2-17.6 13.8-29.4 13.8-8.4 0-15.1-2.4-20-7.2s-7.4-11.2-7.4-19.2c0-8.5 3-15.4 9.1-20.6s14.2-7.8 24.5-7.8c3.4 0 6.9.3 10.6.8s7.5 1.3 11.5 2.2v-7.3c0-7.6-1.6-12.9-4.7-16-3.2-3.1-8.6-4.6-16.3-4.6-3.5 0-7.1.4-10.8 1.3s-7.3 2-10.8 3.4c-1.6.7-2.8 1.1-3.5 1.3s-1.2.3-1.6.3c-1.4 0-2.1-1-2.1-3.1v-4.9c0-1.6.2-2.8.7-3.5s1.4-1.4 2.8-2.1c3.5-1.8 7.7-3.3 12.6-4.5 4.9-1.3 10.1-1.9 15.6-1.9 11.9 0 20.6 2.7 26.2 8.1 5.5 5.4 8.3 13.6 8.3 24.6v32.4z" fill="#FF9900" />`,
        },
        {
          name: "azure",
          color: "#00A4EF",
          svg: `<path d="m32.368 0-17.468 15.145-14.9 26.75h13.437zm2.323 3.543-7.454 21.008 14.291 17.956-27.728 4.764h45.442z" fill="#0072c6" />`,
        },
        {
          name: "gcp",
          color: "#4285F4",
          svg: `<path d="M1513.8,528.7h72.8l207.4-207.4l10.2-88c-385.9-340.6-975-303.9-1315.6,82C393.9,422.5,325.2,550,287.8,688   c23.1-9.5,48.7-11,72.8-4.4l414.7-68.4c0,0,21.1-34.9,32-32.7c184.5-202.6,495-226.2,708-53.8H1513.8z" fill="#4285F4" />`,
        },
        {
          name: "terraform",
          color: "#844FBA",
          svg: `<path d="M25.4 14.3l21.4 12.4v24.7L25.4 39z" fill="#844FBA" />
                 <path d="M50.6 26.7L72 14.3V39L50.6 51.4z" fill="#844FBA" />
                 <path d="M0 0l21.4 12.4v24.7L0 24.7z" fill="#844FBA" />
                 <path d="M25.4 43.7L46.8 56v24.8L25.4 68.4z" fill="#844FBA" />`,
        },
        {
          name: "cloud",
          color: "#ffffff",
          svg: `<path d="M25 50 C25 40, 45 40, 45 50 C55 50, 55 60, 45 60 C45 70, 25 70, 25 60 C15 60, 15 50, 25 50" fill="#ffffff" />`,
        },
    ];
      

    const createFallingItem = () => {
      const container = document.querySelector(".cloud-container");
      if (!container) return;

      // Seleccionamos aleatoriamente si cae una nube o un logo
      const randomIndex = Math.floor(Math.random() * cloudLogos.length);
      const selectedItem = cloudLogos[randomIndex];

      const element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      element.setAttribute("viewBox", "0 0 100 100");
      element.style.width = "60px";
      element.style.height = "60px";
      element.style.position = "absolute";
      element.style.opacity = "0.9";
      element.innerHTML = selectedItem.svg;

      const startPosition = Math.random() * window.innerWidth;
      element.style.left = `${startPosition}px`;
      element.style.top = "-60px";

      container.appendChild(element);

      const animation = element.animate(
        [
          { transform: "translateY(0) scale(1)" },
          { transform: `translateY(${window.innerHeight}px) scale(1.5)` },
        ],
        {
          duration: Math.random() * 4000 + 3000, // Duración aleatoria para más realismo
          easing: "linear",
        }
      );

      animation.onfinish = () => {
        element.remove();
      };
    };

    const interval = setInterval(createFallingItem, 2000);

    return () => clearInterval(interval);
  }, []);

  return <div className="cloud-container"></div>;
};

export default CloudAnimation;
