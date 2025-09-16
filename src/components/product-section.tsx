"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	ArrowRight,
	Star,
	Play,
	PlayCircle,
	Volume2,
	VolumeX,
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



interface ProductFeature {
	title: string;
	description: string;
  imageSrc: StaticImageData;
  imageAlt: string;
}

interface PricingPlan {
	name: string;
	price: string;
	period: string;
	description: string;
	features: string[];
	popular?: boolean;
	ctaText: string;
}
const productFeatures: ProductFeature[] = [
	{
		// antes: icon: Zap,
		imageSrc: aiGeneratedImg,
		imageAlt: "AI generated Terraform code on screen",
		title: "AI-generated Terraform",
		description:
			"Turn high-level requirements into production-ready Terraform code—scaffolded, linted and versionable to ship infrastructure reliably.",
	},
	{
		imageSrc: multiCloudImg,
		imageAlt: "Multi-cloud deployment to AWS and Azure",
		title: "Multi-cloud Deploy",
		description:
			"Deploy the same Terraform output to AWS or Azure with one-click pipelines and provider-aware templates.",
	},
	{
		imageSrc: visualizerImg,
		imageAlt: "Network topology visualizing a VPC and subnets",
		title: "Infra Visualizer (VPC & Containers)",
		description:
			"Auto-generated topology maps (VPCs, subnets, security groups, container topology) for fast troubleshooting and reviews.",
	},
	{
		imageSrc: securityImg,
		imageAlt: "Security modules marketplace",
		title: "Security Marketplace",
		description:
			"Install vetted security modules (hardening, WAF, IAM guardrails) from the marketplace to enforce policies pre-deploy.",
	},
	{
		imageSrc: analyticsImg,
		imageAlt: "Dashboard with infrastructure metrics",
		title: "Observability & Analytics",
		description:
			"Add monitoring & cost/usage analytics modules with a click and get actionable insights from CloudWatch or Azure Monitor.",
	},
	{
		imageSrc: internalAuditImg,
		imageAlt: "Team reviewing deploy audit logs",
		title: "Governance & Audit",
		description:
			"Role-based access controls, policy-as-code checks and full deploy audit logs to enforce change governance.",
	},
];


const pricingPlans: PricingPlan[] = [
	{
		name: "Starter",
		price: "$29",
		period: "/month",
		description: "Perfect for small teams and startups",
		features: [
			"Up to 5 team members",
			"10GB storage",
			"Basic analytics",
			"Email support",
			"Mobile apps",
		],
		ctaText: "Start Free Trial",
	},
	{
		name: "Professional",
		price: "$99",
		period: "/month",
		description: "Ideal for growing businesses",
		features: [
			"Up to 25 team members",
			"100GB storage",
			"Advanced analytics",
			"Priority support",
			"Custom integrations",
			"Advanced security",
		],
		popular: true,
		ctaText: "Get Started",
	},
	{
		name: "Enterprise",
		price: "Custom",
		period: "",
		description: "For large organizations",
		features: [
			"Unlimited team members",
			"Unlimited storage",
			"Custom analytics",
			"24/7 phone support",
			"White-label solution",
			"Dedicated manager",
		],
		ctaText: "Contact Sales",
	},
];

const testimonials = [
	{
		name: "Sarah Johnson",
		role: "CTO, TechCorp",
		content:
			"This product transformed our workflow completely. The ROI was evident within the first month.",
		rating: 5,
	},
	{
		name: "Michael Chen",
		role: "Product Manager, InnovateCo",
		content:
			"The best investment we've made for our team's productivity. Highly recommend!",
		rating: 5,
	},
];

export function ProductSection() {
	const [isVideoPlaying, setIsVideoPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(true);
	const videoRef = useRef<HTMLVideoElement>(null);

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	const toggleVideo = () => {
		if (videoRef.current) {
			if (isVideoPlaying) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}
			setIsVideoPlaying(!isVideoPlaying);
		}
	};

	const toggleMute = () => {
		if (videoRef.current) {
			videoRef.current.muted = !isMuted;
			setIsMuted(!isMuted);
		}
	};

	return (
		<section
			id="product"
			className="py-20 lg:py-32 bg-background relative overflow-hidden"
		>
			{/* Background decoration */}
			<div className="absolute inset-0 bg-grid-pattern opacity-5" />
			<div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
			<div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

			<div className="container mx-auto px-4 relative z-10">
				{/* Hero Section */}
				<div className="max-w-7xl mx-auto mb-20">
					<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
						{/* Left: Copy + CTAs */}
						<div className="text-left lg:pr-8">
							{/* Pill / trust */}
							<div className="inline-flex items-center gap-2 mb-4">
								<Badge className="bg-primary/10 text-primary border-primary/20">
									AI • Terraform • Deploy
								</Badge>
								<span className="text-sm text-muted-foreground">
									Trusted by cloud teams
								</span>
							</div>

							{/* Headline */}
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
								AI-generated Terraform.{" "}
								<span className="text-primary">
									Deploy to production in minutes.
								</span>
							</h1>

							{/* Subhead */}
							<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-6 leading-relaxed">
								Automatically generate, validate, and deploy cloud
								infrastructure — including a curated DevOps marketplace of
								pre-built modules and CI/CD workflows. Reduce manual toil and
								ship infrastructure safely at scale.
							</p>

							{/* CTAs */}
							<div className="flex flex-col sm:flex-row gap-4 mb-8">
								<Link href="https://iac-dev.alamops.com/" passHref>
									<Button size="lg" className="text-lg px-8 py-6 group">
										Start Free Trial
										<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
									</Button>
								</Link>
								<Link
									href="https://calendly.com/ceo-alamops"
									target="_blank"
									rel="noopener noreferrer"
									passHref
								>
									<Button
										variant="outline"
										size="lg"
										className="text-lg px-8 py-6 bg-transparent group"
									>
										<Play className="mr-2 w-5 h-5" />
										Schedule a Demo
									</Button>
								</Link>
							</div>

							{/* Social proof */}
							<div className="flex flex-col sm:flex-row items-start gap-6 text-sm text-muted-foreground">
								<div className="hidden sm:block w-px h-4 bg-border"></div>
								<span>Trusted by leading companies worldwide</span>
							</div>
						</div>

						{/* Right: Video/Visual */}
						<div className="lg:pl-8 w-300px">
							<div className="relative group rounded-2xl overflow-hidden shadow-2xl bg-black%">
								<video
									ref={videoRef}
									className="w-full aspect-video object-cover"
									poster="image-example.png"
									src={
										isVideoPlaying
											? "/videos/product-demo.mp4"
											: "/videos/product-demo.mp4"
									}
									muted={isMuted}
									loop
									playsInline
									onPlay={() => setIsVideoPlaying(true)}
									onPause={() => setIsVideoPlaying(false)}
								>
									<source src="/videos/mi-producto-demo.mp4" type="video/mp4" />
									<source
										src="/videos/mi-producto-demo.webm"
										type="video/webm"
									/>
									Your browser does not support the video tag.
								</video>

								{/* Custom Video Controls Overlay */}
								<div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
									<div className="flex items-center gap-4">
										<Button
											size="lg"
											onClick={toggleVideo}
											className="rounded-full w-16 h-16 bg-white/90 hover:bg-white text-black hover:text-black shadow-lg"
										>
											{isVideoPlaying ? (
												<div className="w-4 h-4 bg-black rounded-sm" />
											) : (
												<Play className="w-6 h-6 ml-1" />
											)}
										</Button>
										<Button
											size="sm"
											onClick={toggleMute}
											variant="secondary"
											className="rounded-full bg-white/90 hover:bg-white text-black hover:text-black"
										>
											{isMuted ? (
												<VolumeX className="w-4 h-4" />
											) : (
												<Volume2 className="w-4 h-4" />
											)}
										</Button>
									</div>
								</div>

								{/* Play Button Overlay (when paused) */}
								{!isVideoPlaying && (
									<div className="absolute inset-0 flex items-center justify-center bg-black/10">
										<Button
											size="lg"
											onClick={toggleVideo}
											className="rounded-full w-20 h-20 bg-white/90 hover:bg-white text-black hover:text-black shadow-xl hover:scale-110 transition-all duration-300"
										>
											<Play className="w-8 h-8 ml-1" />
										</Button>
									</div>
								)}
							</div>

							{/* Video Stats */}
							<div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
								<div className="flex items-center gap-2">
									<PlayCircle className="w-4 h-4" />
									<span>45 seconds demo</span>
								</div>
								<div className="hidden sm:block w-px h-4 bg-border"></div>
							</div>
						</div>
					</div>
				</div>

				{/* Features Grid */}
				<div className="mb-20">
					<div className="text-center mb-16">
						<h3 className="text-3xl md:text-4xl font-bold text-balance mb-4">
							Everything You Need to Succeed
						</h3>
						<p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
							Powerful features designed to streamline your workflow and
							accelerate growth
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
						{productFeatures.map((feature, index) => {
							return (
								<Card
									key={index}
									className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm"
								>
									<CardHeader className="pb-4">
										<div className="flex items-start gap-4">
											{/* Mini imagen con tamaño fijo */}
											<div className="flex-shrink-0">
												<Image
													src={feature.imageSrc}
													alt={feature.imageAlt}
													width={56}
													height={56}
													className="rounded-lg object-cover"
													placeholder="blur"
												/>
											</div>

											<div className="min-w-0 flex-1">
												<CardTitle
													id={`feature-title-${index}`}
													className="text-lg md:text-xl font-semibold truncate group-hover:text-primary transition-colors"
												>
													{feature.title}
												</CardTitle>
											</div>
										</div>
									</CardHeader>

									<CardContent>
										<CardDescription className="text-base leading-relaxed mt-2">
											{feature.description}
										</CardDescription>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>

				{/* Testimonials */}
				<div className="mb-20">
					<div className="text-center mb-12">
						<h3 className="text-3xl md:text-4xl font-bold text-balance mb-4">
							Loved by Teams Worldwide
						</h3>
						<p className="text-lg text-muted-foreground">
							See what our customers have to say
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
						{testimonials.map((testimonial, index) => (
							<Card
								key={index}
								className="border-0 bg-card/80 backdrop-blur-sm"
							>
								<CardContent className="pt-6">
									<div className="flex mb-4">
										{Array.from({ length: testimonial.rating }).map((_, i) => (
											<Star
												key={i}
												className="w-4 h-4 fill-yellow-400 text-yellow-400"
											/>
										))}
									</div>
									<blockquote className="text-lg mb-4">
										"{testimonial.content}"
									</blockquote>
									<footer>
										<div className="font-semibold">{testimonial.name}</div>
										<div className="text-sm text-muted-foreground">
											{testimonial.role}
										</div>
									</footer>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* Final CTA */}
				<div className="text-center bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-12">
					<h3 className="text-3xl md:text-4xl font-bold mb-4">
						Ready to Transform Your Workflow?
					</h3>
					<p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
						Join thousands of teams already using our platform to achieve their
						goals faster.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<Link href="https://iac-dev.alamops.com/" passHref>
							<Button size="lg" className="text-lg px-8 py-6 group">
								Start Your Free Trial
								<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</Button>
						</Link>
                        <Link
							href="https://calendly.com/ceo-alamops"
							target="_blank"
							rel="noopener noreferrer"
							passHref
						>
							<Button variant="ghost" size="lg" className="text-lg px-8 py-6">
								Schedule a Demo
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
