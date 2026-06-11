"use client";

import {
  ArrowRight,
  Star,
  Play,
  Volume2,
  VolumeX,
  Linkedin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { useState, useRef, useEffect } from "react";
import aiGeneratedImg from "@/assets/features/ai-generated.png";
import multiCloudImg from "@/assets/features/multi-cloud.png";
import visualizerImg from "@/assets/features/visualizer.png";
import securityImg from "@/assets/features/security.jpg";
import analyticsImg from "@/assets/features/analitycs.png";
import internalAuditImg from "@/assets/features/internal-audit.jpg";
import KrimdaPic from "@/assets/testimonials/krimda.png";
import QaBitPic from "@/assets/testimonials/qa-bit.jpeg";
import SoaintPic from "@/assets/testimonials/soaint.jpeg";
import { useLocale } from "./locale-provider";
import type { Locale } from "@/lib/i18n";

interface ProductFeature {
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  imageSrc: StaticImageData;
  imageAlt: string;
}

const productFeatures: ProductFeature[] = [
  {
    imageSrc: aiGeneratedImg,
    imageAlt: "AI generated Terraform code on screen",
    title: {
      en: "AI-generated Terraform",
      es: "Terraform generado por IA",
    },
    description: {
      en: "Turn high-level requirements into production-ready Terraform — scaffolded, linted and versionable.",
      es: "Convierte requisitos de alto nivel en Terraform listo para producción — generado, linteado y versionable.",
    },
  },
  {
    imageSrc: multiCloudImg,
    imageAlt: "Multi-cloud deployment to AWS and Azure",
    title: { en: "Multi-cloud Deploy", es: "Despliegue Multi-cloud" },
    description: {
      en: "Ship the same Terraform output to AWS or Azure with one-click pipelines and provider-aware templates.",
      es: "Despliega la misma salida de Terraform en AWS o Azure con pipelines de un clic y plantillas conscientes del proveedor.",
    },
  },
  {
    imageSrc: visualizerImg,
    imageAlt: "Network topology visualizing a VPC and subnets",
    title: {
      en: "Infra Visualizer",
      es: "Visualizador de infraestructura",
    },
    description: {
      en: "Auto-generated topology maps for VPCs, subnets, security groups and container topology.",
      es: "Mapas de topología automáticos para VPCs, subredes, grupos de seguridad y topología de contenedores.",
    },
  },
  {
    imageSrc: securityImg,
    imageAlt: "Security modules marketplace",
    title: {
      en: "Security Marketplace",
      es: "Marketplace de seguridad",
    },
    description: {
      en: "Install vetted modules — hardening, WAF, IAM guardrails — to enforce policies pre-deploy.",
      es: "Instala módulos verificados — hardening, WAF, IAM — para aplicar políticas antes del despliegue.",
    },
  },
  {
    imageSrc: analyticsImg,
    imageAlt: "Dashboard with infrastructure metrics",
    title: {
      en: "Observability & Analytics",
      es: "Observabilidad y analítica",
    },
    description: {
      en: "Add monitoring and cost/usage analytics modules; actionable insights from CloudWatch or Azure Monitor.",
      es: "Añade monitorización y analítica de coste/uso; insights accionables desde CloudWatch o Azure Monitor.",
    },
  },
  {
    imageSrc: internalAuditImg,
    imageAlt: "Team reviewing deploy audit logs",
    title: {
      en: "Governance & Audit",
      es: "Gobernanza y auditoría",
    },
    description: {
      en: "Role-based access, policy-as-code checks and full deploy audit logs for change governance.",
      es: "Control de acceso basado en roles, policy-as-code y logs completos de auditoría de despliegue.",
    },
  },
];

const S3_VIDEOS = "https://alamops-news-images.s3.amazonaws.com/videos";

const productVideos: {
  src: string;
  poster?: string;
  tag: Record<Locale, string>;
  title: Record<Locale, string>;
}[] = [
  {
    src: `${S3_VIDEOS}/diagrams.mp4`,
    poster: `${S3_VIDEOS}/diagrams.jpg`,
    tag: { en: "01 — Diagrams", es: "01 — Diagramas" },
    title: {
      en: "Design your cloud architecture visually",
      es: "Diseña tu arquitectura cloud visualmente",
    },
  },
  {
    src: `${S3_VIDEOS}/template.mp4`,
    poster: `${S3_VIDEOS}/template.jpg`,
    tag: { en: "02 — Templates", es: "02 — Plantillas" },
    title: {
      en: "Launch faster with ready-made templates",
      es: "Lanza más rápido con plantillas listas",
    },
  },
  {
    src: `${S3_VIDEOS}/integrations.mp4`,
    poster: `${S3_VIDEOS}/integrations.jpg`,
    tag: { en: "03 — Integrations", es: "03 — Integraciones" },
    title: {
      en: "Connect every tool in your stack",
      es: "Conecta cada herramienta de tu stack",
    },
  },
  {
    src: `${S3_VIDEOS}/Watch.mp4`,
    poster: `${S3_VIDEOS}/Watch.jpg`,
    tag: { en: "04 — Monitoring", es: "04 — Monitoreo" },
    title: {
      en: "Watch your infrastructure in real time",
      es: "Vigila tu infraestructura en tiempo real",
    },
  },
];

const testimonials: {
  name: string;
  role: Record<Locale, string>;
  content: Record<Locale, string>;
  rating: number;
  picture: StaticImageData;
  linkedin_profile: string;
}[] = [
  {
    name: "Víctor Suárez",
    role: { en: "CEO, QA BIT", es: "CEO, QA BIT" },
    content: {
      en: "This product transformed our workflow completely. The ROI was evident within the first month.",
      es: "Este producto transformó por completo nuestro flujo de trabajo. El ROI fue evidente en el primer mes.",
    },
    rating: 5,
    picture: QaBitPic,
    linkedin_profile:
      "https://www.linkedin.com/company/qa-bit/posts/?feedView=all",
  },
  {
    name: "Santiago Carrasco",
    role: { en: "SBM, Krimda", es: "SBM, Krimda" },
    content: {
      en: "The best investment we've made for our team's productivity. Highly recommend.",
      es: "La mejor inversión que hemos hecho para la productividad del equipo. Muy recomendado.",
    },
    rating: 5,
    picture: KrimdaPic,
    linkedin_profile:
      "https://www.linkedin.com/company/krimda3/posts/?feedView=all",
  },
  {
    name: "Lucas Valenzuela Murillo",
    role: { en: "COO, SOAINT", es: "COO, SOAINT" },
    content: {
      en: "The product is incredible, and the time saved taking an idea to cloud deployment is impressive.",
      es: "El producto es increíble, y el tiempo que ahorra al llevar una idea a un despliegue cloud es impresionante.",
    },
    rating: 5,
    picture: SoaintPic,
    linkedin_profile:
      "https://www.linkedin.com/company/soaint/posts/?feedView=all",
  },
];

export function ProductSection() {
  const { t, locale } = useLocale();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeVideo, setActiveVideo] = useState(0);
  const [anim, setAnim] = useState<"in" | "out">("in");
  const [direction, setDirection] = useState<1 | -1>(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const swapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const figureRef = useRef<HTMLElement>(null);
  const [warm, setWarm] = useState(false);

  const n = productVideos.length;
  const current = productVideos[activeVideo];
  const prevVideo = productVideos[(activeVideo - 1 + n) % n];
  const nextVideo = productVideos[(activeVideo + 1) % n];

  // warm all clips into the browser cache once the carousel scrolls into view,
  // so switching between them is instant (lazy — no cost for visitors who never reach it)
  useEffect(() => {
    if (warm || !figureRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setWarm(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(figureRef.current);
    return () => io.disconnect();
  }, [warm]);

  // fade/slide the new clip in once the index changes
  useEffect(() => {
    setAnim("out");
    const id = setTimeout(() => setAnim("in"), 20);
    return () => clearTimeout(id);
  }, [activeVideo]);

  useEffect(
    () => () => {
      if (swapTimer.current) clearTimeout(swapTimer.current);
    },
    [],
  );

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsVideoPlaying(!isVideoPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const goToVideo = (i: number) => {
    const next = (i + productVideos.length) % productVideos.length;
    if (next === activeVideo) return;
    if (swapTimer.current) clearTimeout(swapTimer.current);
    if (videoRef.current) videoRef.current.pause();
    setIsVideoPlaying(false);
    setDirection(next > activeVideo ? 1 : -1);
    setAnim("out"); // fade/slide current clip out, then swap
    swapTimer.current = setTimeout(() => setActiveVideo(next), 220);
  };

  return (
    <section
      id="product"
      className="landing bg-[#faf8f3] text-[#1a1a17] py-24 md:py-32 border-t border-[#1a1a17]/10"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-8 mb-16 items-end">
          <div className="md:col-span-7">
            <h2
              id="product-title"
              className="text-4xl md:text-6xl font-light leading-[0.95] tracking-tight"
            >
              {t.product.headline_a}
              <br />
              <span className="italic text-[#5a6a3a]">
                {t.product.headline_b}
              </span>
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-lg leading-relaxed text-[#1a1a17]/75 mb-8">
              {t.product.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="https://iac.alamops.com/"
                className="mono text-[11px] tracking-[0.3em] uppercase bg-[#1a1a17] text-[#faf8f3] px-6 py-4 hover:bg-[#5a6a3a] transition-colors inline-flex items-center gap-2"
              >
                {t.product.ctaTrial} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="https://calendly.com/ceo-alamops"
                target="_blank"
                rel="noopener noreferrer"
                className="mono text-[11px] tracking-[0.3em] uppercase border border-[#1a1a17]/30 px-6 py-4 hover:border-[#5a6a3a] hover:text-[#5a6a3a] transition-colors inline-flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5" /> {t.product.ctaDemo}
              </Link>
            </div>
          </div>
        </div>

        {/* Video carousel — coverflow */}
        <figure
          ref={figureRef}
          className="relative group mb-28 -mx-6 md:-mx-12 px-6 md:px-12 py-16 md:py-20 overflow-hidden bg-gradient-to-b from-[#1a1a17] via-[#1f1f1a] to-[#14140f]"
        >
          {/* warm the other clips into cache once in view */}
          {warm &&
            productVideos.map((v, i) =>
              i === activeVideo ? null : (
                <video
                  key={`warm-${v.src}`}
                  src={v.src}
                  poster={v.poster}
                  preload="auto"
                  muted
                  playsInline
                  className="hidden"
                  aria-hidden
                />
              ),
            )}

          {/* Heading */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-5xl font-light tracking-tight text-[#faf8f3]">
              {locale === "es" ? "Mira IaC Design " : "See IaC Design "}
              <span className="italic text-[#a3b16a]">
                {locale === "es" ? "en acción" : "in action"}
              </span>
            </h3>
          </div>

          {/* Stage */}
          <div className="relative max-w-[1100px] mx-auto flex items-center justify-center">
            {/* left peek */}
            {productVideos.length > 1 && (
              <button
                onClick={() => goToVideo(activeVideo - 1)}
                aria-label="Previous video"
                tabIndex={-1}
                className="hidden md:block shrink-0 w-[40%] -mr-[22%] z-0 rounded-2xl overflow-hidden ring-1 ring-white/10 opacity-50 blur-[1px] scale-95 transition-all hover:opacity-70"
              >
                <video
                  src={`${prevVideo.src}#t=0.1`}
                  poster={prevVideo.poster}
                  preload="auto"
                  muted
                  playsInline
                  className="w-full aspect-video object-cover bg-[#0d0d0c]"
                />
              </button>
            )}

            {/* center card */}
            <div
              style={{
                transform:
                  anim === "out"
                    ? `translateX(${direction * 24}px) scale(0.98)`
                    : "translateX(0) scale(1)",
              }}
              className={`relative z-20 w-full md:w-[64%] shrink-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/60 ring-1 ring-white/10 transition-[opacity,transform] duration-300 ease-out ${
                anim === "out" ? "opacity-0" : "opacity-100"
              }`}
            >
              <video
                key={current.src}
                ref={videoRef}
                className="w-full aspect-video object-cover bg-[#0d0d0c]"
                src={`${current.src}#t=0.1`}
                poster={current.poster}
                preload="auto"
                muted={isMuted}
                loop
                playsInline
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              />

              {/* bottom gradient + tag/title overlay */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute left-6 bottom-6 right-6 text-left">
                <div className="mono text-[10px] tracking-[0.3em] uppercase text-[#a3b16a] mb-2">
                  {current.tag[locale]}
                </div>
                <div className="text-lg md:text-2xl font-medium text-white tracking-tight">
                  {current.title[locale]}
                </div>
              </div>

              {/* center play / mute */}
              <div className="absolute inset-0 flex items-center justify-center gap-4">
                <button
                  onClick={toggleVideo}
                  className="w-16 h-16 rounded-full bg-black/45 backdrop-blur-sm ring-1 ring-white/50 text-white flex items-center justify-center hover:bg-black/65 transition-colors"
                  aria-label="Play / Pause"
                >
                  {isVideoPlaying ? (
                    <div className="w-3.5 h-3.5 bg-current" />
                  ) : (
                    <Play className="w-6 h-6 ml-0.5" />
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  className="opacity-0 group-hover:opacity-100 w-12 h-12 rounded-full bg-black/45 backdrop-blur-sm ring-1 ring-white/50 text-white flex items-center justify-center hover:bg-black/65 transition-all"
                  aria-label="Mute / Unmute"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* right peek */}
            {productVideos.length > 1 && (
              <button
                onClick={() => goToVideo(activeVideo + 1)}
                aria-label="Next video"
                tabIndex={-1}
                className="hidden md:block shrink-0 w-[40%] -ml-[22%] z-0 rounded-2xl overflow-hidden ring-1 ring-white/10 opacity-50 blur-[1px] scale-95 transition-all hover:opacity-70"
              >
                <video
                  src={`${nextVideo.src}#t=0.1`}
                  poster={nextVideo.poster}
                  preload="auto"
                  muted
                  playsInline
                  className="w-full aspect-video object-cover bg-[#0d0d0c]"
                />
              </button>
            )}
          </div>

          {/* Nav: arrows + progress */}
          {productVideos.length > 1 && (
            <div className="flex items-center justify-center gap-6 mt-10">
              <button
                onClick={() => goToVideo(activeVideo - 1)}
                className="w-11 h-11 rounded-full bg-white/10 ring-1 ring-white/25 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Previous video"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                {productVideos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToVideo(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === activeVideo
                        ? "w-8 bg-[#a3b16a]"
                        : "w-1.5 bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`Go to video ${i + 1}`}
                    aria-current={i === activeVideo}
                  />
                ))}
              </div>
              <button
                onClick={() => goToVideo(activeVideo + 1)}
                className="w-11 h-11 rounded-full bg-white/10 ring-1 ring-white/25 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Next video"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </figure>

        {/* Features */}
        <div className="grid md:grid-cols-12 gap-8 mb-12 items-end">
          <div className="md:col-span-8">
            <h3 className="text-3xl md:text-4xl font-light tracking-tight">
              {t.product.featuresTitle_a}{" "}
              <span className="italic text-[#5a6a3a]">
                {t.product.featuresTitle_b}
              </span>
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#1a1a17]/70 max-w-2xl">
              {t.product.featuresDescription}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#1a1a17]/15 mb-28">
          {productFeatures.map((f, i) => (
            <article
              key={i}
              className="group relative border-r border-b border-[#1a1a17]/15 p-8 hover:bg-[#1a1a17]/[0.02] transition-colors"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="mono text-[10px] tracking-[0.3em] text-[#1a1a17]/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Image
                  src={f.imageSrc}
                  alt={f.imageAlt}
                  width={48}
                  height={48}
                  className="rounded object-cover opacity-90 grayscale group-hover:grayscale-0 transition-all"
                  placeholder="blur"
                />
              </div>
              <h4 className="text-2xl font-light tracking-tight mb-3 group-hover:italic group-hover:text-[#5a6a3a] transition-all">
                {f.title[locale]}
              </h4>
              <p className="text-sm leading-relaxed text-[#1a1a17]/75">
                {f.description[locale]}
              </p>
            </article>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-12 gap-8 mb-12 items-end">
          <div className="md:col-span-8">
            <h3 className="text-3xl md:text-4xl font-light tracking-tight">
              {t.product.voicesTitle_a}{" "}
              <span className="italic text-[#5a6a3a]">
                {t.product.voicesTitle_b}
              </span>{" "}
              {t.product.voicesTitle_c}
            </h3>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-0 border-t border-[#1a1a17]/15">
          {testimonials.map((t2, i) => (
            <figure
              key={i}
              className="relative p-8 md:p-10 border-b border-[#1a1a17]/15 md:border-r md:last:border-r-0"
            >
              <span className="absolute top-6 right-6 text-6xl leading-none font-light text-[#5a6a3a]/25 select-none">
                &ldquo;
              </span>
              <blockquote className="text-xl md:text-2xl font-light leading-snug tracking-tight italic text-[#1a1a17] mb-10">
                {t2.content[locale]}
              </blockquote>
              <figcaption className="flex items-center gap-4 pt-6 border-t border-[#1a1a17]/10">
                <div className="relative w-12 h-12 overflow-hidden rounded-full ring-1 ring-[#1a1a17]/15">
                  <Image
                    src={t2.picture}
                    alt={t2.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-base font-normal tracking-tight">
                    {t2.name}
                  </div>
                  <div className="mono text-[10px] tracking-[0.25em] uppercase text-[#1a1a17]/60">
                    {t2.role[locale]}
                  </div>
                </div>
                <Link
                  href={t2.linkedin_profile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1a1a17]/50 hover:text-[#5a6a3a] transition-colors"
                  aria-label={`${t2.name} LinkedIn`}
                >
                  <Linkedin className="w-4 h-4" />
                </Link>
              </figcaption>
              <div className="flex gap-1 mt-4">
                {Array.from({ length: t2.rating }).map((_, k) => (
                  <Star
                    key={k}
                    className="w-3 h-3 fill-[#5a6a3a] text-[#5a6a3a]"
                  />
                ))}
              </div>
            </figure>
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-28 border border-[#1a1a17]/15 px-8 md:px-16 py-16 md:py-20 text-center">
          <div className="mono text-[10px] tracking-[0.3em] uppercase text-[#5a6a3a] mb-6">
            {t.product.finalKicker}
          </div>
          <h3 className="text-4xl md:text-6xl font-light tracking-tight leading-[1]">
            {t.product.finalTitle_a}
            <br />
            <span className="italic text-[#5a6a3a]">
              {t.product.finalTitle_b}
            </span>
          </h3>
          <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="https://iac.alamops.com/"
              className="mono text-[11px] tracking-[0.3em] uppercase bg-[#1a1a17] text-[#faf8f3] px-6 py-4 hover:bg-[#5a6a3a] transition-colors inline-flex items-center gap-2"
            >
              {t.product.finalCtaTrial} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="https://calendly.com/ceo-alamops"
              target="_blank"
              rel="noopener noreferrer"
              className="mono text-[11px] tracking-[0.3em] uppercase text-[#1a1a17]/70 px-6 py-4 hover:text-[#5a6a3a] transition-colors"
            >
              {t.product.finalCtaDemo}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
