"use client";

import {
  ArrowRight,
  Star,
  Play,
  PlayCircle,
  Volume2,
  VolumeX,
  Linkedin,
} from "lucide-react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { useState, useRef } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);

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

        {/* Video */}
        <figure className="relative group overflow-hidden border border-[#1a1a17]/15 bg-[#1a1a17]/5 mb-28">
          <video
            ref={videoRef}
            className="w-full aspect-video object-cover"
            poster="/image-example.png"
            src="/videos/product-demo.mp4"
            muted={isMuted}
            loop
            playsInline
            onPlay={() => setIsVideoPlaying(true)}
            onPause={() => setIsVideoPlaying(false)}
          />
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <button
              onClick={toggleVideo}
              className="w-16 h-16 rounded-full bg-[#faf8f3] text-[#1a1a17] flex items-center justify-center hover:bg-[#5a6a3a] hover:text-[#faf8f3] transition-colors"
              aria-label="Play / Pause"
            >
              {isVideoPlaying ? (
                <div className="w-3 h-3 bg-current" />
              ) : (
                <Play className="w-6 h-6 ml-0.5" />
              )}
            </button>
            <button
              onClick={toggleMute}
              className="w-12 h-12 rounded-full bg-[#faf8f3] text-[#1a1a17] flex items-center justify-center hover:bg-[#5a6a3a] hover:text-[#faf8f3] transition-colors"
              aria-label="Mute / Unmute"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>
          {!isVideoPlaying && (
            <button
              onClick={toggleVideo}
              className="absolute inset-0 flex items-center justify-center bg-black/15 text-[#faf8f3]"
              aria-label="Play"
            >
              <span className="w-20 h-20 rounded-full bg-[#faf8f3] text-[#1a1a17] flex items-center justify-center hover:scale-105 transition-transform">
                <Play className="w-7 h-7 ml-1" />
              </span>
            </button>
          )}
          <figcaption className="flex items-center justify-between px-6 py-4 mono text-[10px] tracking-[0.3em] uppercase text-[#1a1a17]/60 border-t border-[#1a1a17]/10 bg-[#faf8f3]">
            <span className="flex items-center gap-2">
              <PlayCircle className="w-3.5 h-3.5" /> {t.product.videoCaption}
            </span>
            <span>{t.product.videoFig}</span>
          </figcaption>
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
