"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Cloud, Shield, Zap } from "lucide-react";

export function HeroSection() {
	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section
			id="hero"
			className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/30 py-20 lg:py-32"
		>
			{/* Background decoration */}
			<div className="absolute inset-0 bg-grid-pattern opacity-5" />
			<div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
			<div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

			<div className="container mx-auto px-4 relative z-10">
				<div className="max-w-4xl mx-auto text-center">
					{/* Badge */}
					<div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
						<Zap className="w-4 h-4" />
						Multi-Cloud Experts
					</div>

					{/* Main headline */}
					<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
						We power your digital transformation
					</h1>

					{/* Subheadline */}
					<p className="text-xl md:text-2xl text-muted-foreground text-balance mb-8 max-w-3xl mx-auto leading-relaxed">
						Expert solutions in AWS, Azure and Google Cloud for companies
						seeking innovation and unlimited scalability
					</p>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
						<Button
							size="lg"
							className="text-lg px-8 py-6 group"
							onClick={() => scrollToSection("contact")}
						>
							Contact an Expert
							<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
						</Button>
						<Button
							variant="outline"
							size="lg"
							className="text-lg px-8 py-6 bg-transparent"
							onClick={() => scrollToSection("contact")}
						>
							Free Consultation
						</Button>
					</div>

					{/* Tech icons */}
					<div className="flex justify-center items-center gap-8 opacity-60">
						<div className="flex items-center gap-2">
							<Cloud className="w-6 h-6" />
							<span className="text-sm font-medium">Multi-Cloud</span>
						</div>
						<div className="flex items-center gap-2">
							<Shield className="w-6 h-6" />
							<span className="text-sm font-medium">Security</span>
						</div>
						<div className="flex items-center gap-2">
							<Zap className="w-6 h-6" />
							<span className="text-sm font-medium">Automation</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
