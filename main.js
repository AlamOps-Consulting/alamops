document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Contact form handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Here you would typically handle the form submission
      // For now, we'll just show an alert
      alert('¡Gracias por su mensaje! Nos pondremos en contacto pronto.');
      contactForm.reset();
    });
  }

  // Carousel functionality
  const carousel = document.querySelector('.carousel');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const dotsContainer = document.querySelector('.carousel-dots');
  
  let currentSlide = 0;
  const totalSlides = slides.length;

  // Create dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  // Update dots
  function updateDots() {
    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  // Go to specific slide
  function goToSlide(n) {
    currentSlide = n;
    carousel.style.transform = `translateX(-${currentSlide * 20}%)`;
    updateDots();
  }

  // Next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
  }

  // Previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
  }

  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Auto advance slides
  setInterval(nextSlide, 5000);

  // Cloud animation in hero section
  function createCloud() {
    const cloudContainer = document.querySelector('.cloud-container');
    if (!cloudContainer) return;

    const cloud = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    cloud.setAttribute("viewBox", "0 0 100 100");
    cloud.style.width = "60px";
    cloud.style.height = "60px";
    cloud.style.position = "absolute";
    cloud.style.opacity = "0.8";
    cloud.innerHTML = `
      <path d="M25 50 C25 40, 45 40, 45 50 C55 50, 55 60, 45 60 C45 70, 25 70, 25 60 C15 60, 15 50, 25 50" 
            fill="#ffffff" />
    `;

    const startPosition = Math.random() * window.innerWidth;
    cloud.style.left = `${startPosition}px`;
    cloud.style.top = "-60px";

    cloudContainer.appendChild(cloud);

    const animation = cloud.animate([
      { transform: 'translateY(0) scale(1)' },
      { transform: `translateY(${window.innerHeight}px) scale(1.5)` }
    ], {
      duration: Math.random() * 3000 + 3000,
      easing: 'linear'
    });

    animation.onfinish = () => {
      cloud.remove();
    };
  }

  // Create clouds periodically
  setInterval(createCloud, 2000);

  // Initialize syntax highlighting
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });

  // Intersection Observer for fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.1 });

  // Observe all service cards and features
  document.querySelectorAll('.service-card, .feature').forEach(element => {
    observer.observe(element);
  });

  // Add smooth transitions for provider cards
  document.querySelectorAll('.provider-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'scale(1.05)';
      card.style.transition = 'transform 0.3s ease';
    });
  
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(1)';
    });
  });

  // Add hover effects for service items
  document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
      item.style.transition = 'background-color 0.3s ease';
    });
  
    item.addEventListener('mouseleave', () => {
      item.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });
  });

  // Add animation for pipeline stages
  document.querySelectorAll('.stage').forEach((stage, index) => {
    stage.style.animation = `fadeIn 0.5s ease forwards ${index * 0.2}s`;
  });

  // Add keyframes for fade-in animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
});