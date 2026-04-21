export type Locale = "en" | "es";

export const SPANISH_COUNTRIES = new Set([
  "ES", // Spain
  "MX", // Mexico
  "AR", // Argentina
  "CO", // Colombia
  "CL", // Chile
  "PE", // Peru
  "VE", // Venezuela
  "CU", // Cuba
  "DO", // Dominican Republic
  "EC", // Ecuador
  "GT", // Guatemala
  "HN", // Honduras
  "NI", // Nicaragua
  "PA", // Panama
  "PY", // Paraguay
  "SV", // El Salvador
  "UY", // Uruguay
  "BO", // Bolivia
  "CR", // Costa Rica
  "PR", // Puerto Rico
  "GQ", // Equatorial Guinea
]);

export const dict = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      product: "Product",
      people: "People",
      news: "News",
      contact: "Contact",
      launch: "Launch",
    },
    hero: {
      headline_a: "Infrastructure,",
      headline_b: "agility",
      headline_c: "and efficiency for",
      headline_d: "your business.",
      description:
        "DevOps and multi-cloud consulting across AWS, Azure and GCP. Strategy, security, automation and FinOps — delivered by engineers who still answer the phone.",
      ctaExpert: "Talk to an expert",
      ctaServices: "See our services",
      stats: {
        multiCloud: "Multi-cloud",
        multiCloudValue: "AWS + Azure + GCP",
        deploys: "Deploys / mo",
        deploysValue: "1,200+",
        uptime: "Uptime",
        uptimeValue: "99.98%",
        teams: "Happy teams",
        teamsValue: "40+",
      },
    },
    services: {
      title_a: "Our",
      title_b: "services.",
      subtitle: "Multi-cloud consulting across AWS, Azure and GCP.",
      description:
        "Strategy, security, automation and cost — four disciplines stitched into one delivery practice. We transform your infrastructure into agility and efficiency, so your team ships faster and sleeps better.",
      items: [
        {
          title: "Multi-Cloud Strategy",
          description:
            "Design and implementation of optimized multi-cloud strategies to maximize performance and minimize dependency on a single provider.",
        },
        {
          title: "Cloud Security",
          description:
            "Integrated security and governance in multi-cloud environments with the best security practices and compliance policies.",
        },
        {
          title: "DevOps & Automation",
          description:
            "Complete CI/CD automation in any cloud provider, optimizing development and deployment processes.",
        },
        {
          title: "FinOps",
          description:
            "Smart cost optimization across all cloud platforms through detailed analysis and cost saving strategies.",
        },
      ],
    },
    product: {
      headline_a: "AI-generated Terraform.",
      headline_b: "Production in minutes.",
      description:
        "Generate, validate and deploy cloud infrastructure — with a curated marketplace of modules and CI/CD workflows. Less toil, safer ship.",
      ctaTrial: "Free trial",
      ctaDemo: "Demo",
      videoCaption: "45s demo",
      videoFig: "fig. 01 — product walk-through",
      featuresTitle_a: "From idea to production",
      featuresTitle_b: "without the detour.",
      featuresDescription:
        "A compact toolchain for generating, shipping and governing cloud infrastructure — the parts you actually use, end to end.",
      voicesTitle_a: "Words from teams we're",
      voicesTitle_b: "lucky",
      voicesTitle_c: "to work with.",
      finalKicker: "Ready?",
      finalTitle_a: "Ship infrastructure",
      finalTitle_b: "like you mean it.",
      finalCtaTrial: "Start free trial",
      finalCtaDemo: "Schedule a demo",
    },
    team: {
      title_a: "The humans behind",
      title_b: "the",
      title_c: "pipelines.",
      description:
        "Small team, loud about the work. We believe infrastructure is a people problem first — so we hire engineers who smile before they type.",
      hiringKicker: "We are hiring",
      hiringText_a: "Are you the next face on this wall?",
      hiringText_b: "We'd love to meet you.",
      apply: "Apply",
      photoSlot: "photo slot",
    },
    news: {
      title_a: "Latest",
      title_b: "news",
      title_c: "& updates.",
      description:
        "Shipping logs, customer stories and opinions about the cloud. Written by people who still run it.",
      minRead: "min",
      viewAll: "View all notes",
    },
    newsletter: {
      title_a: "Subscribe to our",
      title_b: "newsletter.",
      description:
        "Stay updated with cloud infrastructure insights, best practices and AlamOps news. One email a month, no noise.",
      placeholder: "your@email.com",
      subscribe: "Subscribe",
      subscribing: "Subscribing…",
      footnote: "unsubscribe any time.",
      toast: {
        success: "Thanks for subscribing.",
        successDesc: "You'll receive our latest updates.",
        already: "You're already subscribed.",
        invalid: "Invalid email.",
        fail: "Something went wrong. Try again later.",
        offline: "Could not connect to the server.",
      },
    },
    contact: {
      title_a: "Let's",
      title_b: "talk.",
      description:
        "Ready to transform your cloud infrastructure? Our experts are here to help.",
      formTitle: "Send us a message",
      formSubtitle: "We'll get back to you within 24 hours.",
      fields: {
        name: "Name",
        namePh: "Your name",
        email: "Email",
        emailPh: "you@mail.com",
        company: "Company",
        companyPh: "Company name",
        phone: "Phone",
        phonePh: "+34 614 020 961",
        message: "Message",
        messagePh: "Tell us about your project…",
      },
      send: "Send message",
      sending: "Sending…",
      info: "Contact information",
      labels: {
        email: "Email",
        phone: "Phone",
        office: "Office",
      },
      values: {
        email: "support@alamops.com",
        phone: "+34 61 40 20 961",
        office: "Madrid, España",
      },
      urgentTitle: "Need help urgently?",
      urgentText: "Our on-call rotation handles critical incidents 24/7.",
      urgentCta: "Page on-call",
      toast: {
        success: "Message sent.",
        successDesc: "We'll reply within 24 hours.",
        fail: "Could not send. Please try again.",
      },
    },
    footer: {
      meta: "/// AlamOps — est. 2024",
      tagline:
        "Transforming teams through humane, honest and secure multi-cloud infrastructure.",
      cols: {
        services: "Services",
        company: "Company",
        legal: "Legal",
      },
      links: {
        multiCloud: "Multi-cloud strategy",
        security: "Cloud security",
        devops: "DevOps & automation",
        finops: "FinOps",
        about: "About",
        people: "People",
        news: "News",
        privacy: "Privacy policy",
        terms: "Terms of service",
        contact: "Contact",
      },
      rights: "All rights reserved.",

    },
    chat: {
      launcherLabel: "Ask",
      launcherHint: "Any question — real humans, real answers.",
      launcherHeadline_a: "Got a",
      launcherHeadline_b: "question?",
      title_a: "Ask",
      title_b: "AlamOps.",
      status: "Online",
      intro:
        "Ask about multi-cloud strategy, security, DevOps or FinOps. An AlamOps assistant will reply in a moment.",
      placeholder: "Write your question…",
      send: "Send",
      sending: "Thinking…",
      close: "Close",
      you: "You",
      bot: "AlamOps",
      errors: {
        empty: "Type something first.",
        tooLong: "Message is too long.",
        rateLimit: "Too many messages. Try again in a minute.",
        offline: "Couldn't reach the server. Try again.",
        failed: "Something went wrong. Please retry.",
      },
    },
  },
  es: {
    nav: {
      home: "Inicio",
      services: "Servicios",
      product: "Producto",
      people: "Equipo",
      news: "Noticias",
      contact: "Contacto",
      launch: "Lanzar",
    },
    hero: {
      headline_a: "Infraestructura,",
      headline_b: "agilidad",
      headline_c: "y eficiencia para",
      headline_d: "tu negocio.",
      description:
        "Consultoría DevOps y multi-cloud en AWS, Azure y GCP. Estrategia, seguridad, automatización y FinOps — entregado por ingenieros que aún contestan el teléfono.",
      ctaExpert: "Habla con un experto",
      ctaServices: "Ver nuestros servicios",
      stats: {
        multiCloud: "Multi-cloud",
        multiCloudValue: "AWS + Azure + GCP",
        deploys: "Despliegues / mes",
        deploysValue: "1.200+",
        uptime: "Disponibilidad",
        uptimeValue: "99,98%",
        teams: "Equipos felices",
        teamsValue: "40+",
      },
    },
    services: {
      title_a: "Nuestros",
      title_b: "servicios.",
      subtitle: "Consultoría multi-cloud en AWS, Azure y GCP.",
      description:
        "Estrategia, seguridad, automatización y coste — cuatro disciplinas unidas en una sola práctica de entrega. Transformamos tu infraestructura en agilidad y eficiencia para que tu equipo despliegue más rápido y duerma mejor.",
      items: [
        {
          title: "Estrategia Multi-Cloud",
          description:
            "Diseño e implementación de estrategias multi-cloud optimizadas para maximizar el rendimiento y minimizar la dependencia de un único proveedor.",
        },
        {
          title: "Seguridad Cloud",
          description:
            "Seguridad y gobernanza integradas en entornos multi-cloud con las mejores prácticas de seguridad y políticas de cumplimiento.",
        },
        {
          title: "DevOps & Automatización",
          description:
            "Automatización CI/CD completa en cualquier proveedor cloud, optimizando los procesos de desarrollo y despliegue.",
        },
        {
          title: "FinOps",
          description:
            "Optimización inteligente de costes en todas las plataformas cloud mediante análisis detallado y estrategias de ahorro.",
        },
      ],
    },
    product: {
      headline_a: "Terraform generado por IA.",
      headline_b: "Producción en minutos.",
      description:
        "Genera, valida y despliega infraestructura cloud — con un marketplace curado de módulos y flujos CI/CD. Menos tedio, despliegues más seguros.",
      ctaTrial: "Prueba gratis",
      ctaDemo: "Demo",
      videoCaption: "Demo de 45s",
      videoFig: "fig. 01 — recorrido del producto",
      featuresTitle_a: "De la idea a producción",
      featuresTitle_b: "sin el desvío.",
      featuresDescription:
        "Una cadena de herramientas compacta para generar, desplegar y gobernar infraestructura cloud — las piezas que realmente usas, de principio a fin.",
      voicesTitle_a: "Palabras de equipos con los que tenemos",
      voicesTitle_b: "la suerte",
      voicesTitle_c: "de trabajar.",
      finalKicker: "¿Listo?",
      finalTitle_a: "Despliega infraestructura",
      finalTitle_b: "con convicción.",
      finalCtaTrial: "Comenzar prueba",
      finalCtaDemo: "Agendar una demo",
    },
    team: {
      title_a: "Las personas detrás",
      title_b: "de los",
      title_c: "pipelines.",
      description:
        "Equipo pequeño, con voz propia sobre el trabajo. Creemos que la infraestructura es primero un problema de personas — así que contratamos ingenieros que sonríen antes de teclear.",
      hiringKicker: "Estamos contratando",
      hiringText_a: "¿Eres el próximo rostro en este muro?",
      hiringText_b: "Nos encantaría conocerte.",
      apply: "Aplicar",
      photoSlot: "espacio para foto",
    },
    news: {
      title_a: "Últimas",
      title_b: "noticias",
      title_c: "y actualizaciones.",
      description:
        "Registros de despliegue, historias de clientes y opiniones sobre la nube. Escrito por personas que aún la operan.",
      minRead: "min",
      viewAll: "Ver todas las notas",
    },
    newsletter: {
      title_a: "Suscríbete a nuestro",
      title_b: "boletín.",
      description:
        "Mantente al día con insights de infraestructura cloud, buenas prácticas y noticias de AlamOps. Un correo al mes, sin ruido.",
      placeholder: "tu@correo.com",
      subscribe: "Suscribirme",
      subscribing: "Suscribiendo…",
      footnote: "cancela cuando quieras.",
      toast: {
        success: "¡Gracias por suscribirte!",
        successDesc: "Recibirás nuestras últimas novedades.",
        already: "Ya estás suscrito.",
        invalid: "Correo inválido.",
        fail: "Algo salió mal. Inténtalo más tarde.",
        offline: "No se pudo conectar al servidor.",
      },
    },
    contact: {
      title_a: "Hablemos",
      title_b: ".",
      description:
        "¿Listo para transformar tu infraestructura cloud? Nuestros expertos están aquí para ayudarte.",
      formTitle: "Envíanos un mensaje",
      formSubtitle: "Te responderemos en menos de 24 horas.",
      fields: {
        name: "Nombre",
        namePh: "Tu nombre",
        email: "Correo",
        emailPh: "tu@correo.com",
        company: "Empresa",
        companyPh: "Nombre de tu empresa",
        phone: "Teléfono",
        phonePh: "+34 614 020 961",
        message: "Mensaje",
        messagePh: "Cuéntanos sobre tu proyecto…",
      },
      send: "Enviar mensaje",
      sending: "Enviando…",
      info: "Información de contacto",
      labels: {
        email: "Correo",
        phone: "Teléfono",
        office: "Oficina",
      },
      values: {
        email: "support@alamops.com",
        phone: "+34 61 40 20 961",
        office: "Madrid, España",
      },
      urgentTitle: "¿Necesitas ayuda urgente?",
      urgentText:
        "Nuestra guardia 24/7 atiende incidentes críticos en cualquier momento.",
      urgentCta: "Llamar a guardia",
      toast: {
        success: "Mensaje enviado.",
        successDesc: "Te responderemos en 24 horas.",
        fail: "No se pudo enviar. Inténtalo de nuevo.",
      },
    },
    footer: {
      meta: "/// AlamOps — est. 2024",
      tagline:
        "Transformamos equipos con infraestructura multi-cloud humana, honesta y segura.",
      cols: {
        services: "Servicios",
        company: "Empresa",
        legal: "Legal",
      },
      links: {
        multiCloud: "Estrategia multi-cloud",
        security: "Seguridad cloud",
        devops: "DevOps & automatización",
        finops: "FinOps",
        about: "Nosotros",
        people: "Equipo",
        news: "Noticias",
        privacy: "Política de privacidad",
        terms: "Términos del servicio",
        contact: "Contacto",
      },
      rights: "Todos los derechos reservados.",

    },
    chat: {
      launcherLabel: "Preguntar",
      launcherHint: "Cualquier duda — personas reales, respuestas reales.",
      launcherHeadline_a: "¿Tienes una",
      launcherHeadline_b: "pregunta?",
      title_a: "Pregunta a",
      title_b: "AlamOps.",
      status: "En línea",
      intro:
        "Pregunta sobre estrategia multi-cloud, seguridad, DevOps o FinOps. Un asistente de AlamOps responderá en un momento.",
      placeholder: "Escribe tu pregunta…",
      send: "Enviar",
      sending: "Pensando…",
      close: "Cerrar",
      you: "Tú",
      bot: "AlamOps",
      errors: {
        empty: "Escribe algo primero.",
        tooLong: "El mensaje es demasiado largo.",
        rateLimit: "Demasiados mensajes. Inténtalo en un minuto.",
        offline: "No se pudo conectar al servidor. Inténtalo de nuevo.",
        failed: "Algo salió mal. Vuelve a intentarlo.",
      },
    },
  },
} as const;

export type Dict = (typeof dict)[Locale];
