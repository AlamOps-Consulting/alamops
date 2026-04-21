import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import NewsSection from "@/components/news-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { ProductSection } from "@/components/product-section";
import "./globals.css";

export default function HomePage() {
  return (
    <main className="landing min-h-screen bg-[#faf8f3]">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ProductSection />
      <NewsSection />
      <NewsletterSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
