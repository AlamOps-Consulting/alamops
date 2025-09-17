import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import NewsSection from "@/components/news-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { ProductSection } from "@/components/product-section";
import "./globals.css"

export default function HomePage() {
	return (
		<main className="min-h-screen">
			<Navbar />
			<div className="pt-16">
				<HeroSection />
				<ServicesSection />
				<ProductSection />
				<NewsSection />
				<ContactSection />
				<Footer />
			</div>
		</main>
	);
}
