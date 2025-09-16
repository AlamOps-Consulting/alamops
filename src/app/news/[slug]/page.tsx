import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Calendar,
	ArrowLeft,
	Award,
	Rocket,
	Globe,
	Clock,
	User,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Sample news data - in a real app this would come from a CMS or database
const newsData = {
	"aws-advanced-consulting-partner": {
		title: "AWS Advanced Consulting Partner Certification Achieved",
		date: "March 15, 2025",
		category: "Certifications",
		icon: Award,
		readTime: "3 min read",
		author: "AlamOps Team",
		content: `
      <p>We are thrilled to announce that AlamOps has achieved AWS Advanced Consulting Partner status, marking a significant milestone in our journey as a leading multi-cloud solutions provider.</p>
      
      <h3>What This Means for Our Clients</h3>
      <p>This certification demonstrates our deep technical expertise and proven success in helping customers design, architect, build, migrate, and manage their workloads and applications on AWS. Our team has met rigorous requirements including:</p>
      
      <ul>
        <li>Demonstrated technical proficiency through AWS certifications</li>
        <li>Proven customer success with complex AWS implementations</li>
        <li>Investment in AWS training and development programs</li>
        <li>Commitment to AWS best practices and methodologies</li>
      </ul>
      
      <h3>Enhanced Capabilities</h3>
      <p>As an AWS Advanced Consulting Partner, we now have access to enhanced support, training, and resources that enable us to deliver even more value to our enterprise clients. This includes priority access to AWS technical resources, advanced training programs, and early access to new AWS services and features.</p>
      
      <p>Our expanded capabilities mean we can now offer more comprehensive solutions for complex enterprise migrations, advanced security implementations, and large-scale infrastructure optimization projects.</p>
    `,
		image: "/aws-cloud-infrastructure-with-servers-and-data-cen.jpg",
	},
	"finops-platform-launch": {
		title: "Launch of Our Revolutionary FinOps Platform",
		date: "March 8, 2025",
		category: "Products",
		icon: Rocket,
		readTime: "5 min read",
		author: "Product Team",
		content: `
      <p>Today marks the official launch of our groundbreaking FinOps platform, designed to revolutionize how enterprises manage and optimize their cloud costs across AWS, Azure, and Google Cloud.</p>
      
      <h3>Key Features</h3>
      <p>Our platform introduces several innovative features that set it apart from traditional cloud cost management tools:</p>
      
      <ul>
        <li><strong>Real-time Cost Analytics:</strong> Monitor spending across all cloud providers in real-time</li>
        <li><strong>Predictive Budgeting:</strong> AI-powered forecasting to prevent budget overruns</li>
        <li><strong>Automated Optimization:</strong> Smart recommendations and automated actions to reduce costs</li>
        <li><strong>Multi-Cloud Visibility:</strong> Unified dashboard for all your cloud environments</li>
      </ul>
      
      <h3>Proven Results</h3>
      <p>During our beta testing phase, clients achieved remarkable results:</p>
      <ul>
        <li>Average cost reduction of 40% within the first quarter</li>
        <li>95% improvement in budget accuracy</li>
        <li>60% reduction in time spent on cost management tasks</li>
      </ul>
      
      <p>The platform leverages machine learning algorithms to identify cost optimization opportunities that traditional tools often miss, making it an essential tool for any organization serious about cloud cost management.</p>
    `,
		image: "/finops-dashboard-with-charts-and-cost-analytics.jpg",
	},
	"international-expansion": {
		title: "International Market Expansion",
		date: "March 1, 2025",
		category: "Expansion",
		icon: Globe,
		readTime: "4 min read",
		author: "Executive Team",
		content: `
      <p>We're excited to announce our expansion into new international markets, specifically Colombia and Chile, as part of our strategic growth initiative to serve more Latin American enterprises.</p>
      
      <h3>Market Opportunity</h3>
      <p>Latin America represents one of the fastest-growing cloud adoption markets globally, with enterprises increasingly recognizing the need for digital transformation to remain competitive. Our research indicates:</p>
      
      <ul>
        <li>Cloud adoption in Latin America is growing at 25% annually</li>
        <li>85% of enterprises plan to increase cloud investments in 2024</li>
        <li>Multi-cloud strategies are becoming the norm for large organizations</li>
      </ul>
      
      <h3>Local Presence, Global Expertise</h3>
      <p>Our expansion strategy focuses on combining local market knowledge with our proven global expertise in multi-cloud solutions. We're establishing local teams in Bogotá and Santiago to provide:</p>
      
      <ul>
        <li>Native language support and cultural understanding</li>
        <li>Compliance with local regulations and data sovereignty requirements</li>
        <li>Faster response times and on-site support when needed</li>
        <li>Partnerships with local technology providers and system integrators</li>
      </ul>
      
      <p>This expansion reinforces our commitment to helping enterprises across Latin America accelerate their digital transformation journeys with confidence and success.</p>
    `,
		image: "/latin-america-map-with-technology-connections-and-.jpg",
	},
};

interface PageProps {
	params: {
		slug: string;
	};
}

export default function NewsDetailPage({ params }: PageProps) {
	const article = newsData[params.slug as keyof typeof newsData];

	if (!article) {
		notFound();
	}

	const IconComponent = article.icon;

	return (
		<div className="min-h-screen bg-background">
			{/* Header with back button */}
			<div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
				<div className="container mx-auto px-4 py-4">
					<Link href="/#news">
						<Button variant="ghost" size="sm" className="group">
							<ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
							Back to News
						</Button>
					</Link>
				</div>
			</div>

			<article className="container mx-auto px-4 py-12 max-w-4xl">
				{/* Article header */}
				<div className="mb-8">
					<div className="flex items-center gap-4 mb-6">
						<Badge variant="secondary" className="text-sm">
							{article.category}
						</Badge>
						<div className="flex items-center gap-4 text-sm text-muted-foreground">
							<div className="flex items-center gap-1">
								<Calendar className="w-4 h-4" />
								{article.date}
							</div>
							<div className="flex items-center gap-1">
								<Clock className="w-4 h-4" />
								{article.readTime}
							</div>
							<div className="flex items-center gap-1">
								<User className="w-4 h-4" />
								{article.author}
							</div>
						</div>
					</div>

					<div className="flex items-start gap-4 mb-6">
						<div className="p-3 rounded-xl bg-primary/10 text-primary">
							<IconComponent className="w-8 h-8" />
						</div>
						<h1 className="text-4xl md:text-5xl font-bold text-balance leading-tight">
							{article.title}
						</h1>
					</div>
				</div>

				{/* Featured image */}
				<div className="mb-12">
					<img
						src={article.image || "/placeholder.svg"}
						alt={article.title}
						className="w-full h-64 md:h-96 object-cover rounded-xl border"
					/>
				</div>

				{/* Article content */}
				<div className="prose prose-lg max-w-none">
					<div
						dangerouslySetInnerHTML={{ __html: article.content }}
						className="space-y-6 text-foreground/90 leading-relaxed"
					/>
				</div>

				{/* Call to action */}
				<div className="mt-16 p-8 bg-muted/50 rounded-xl border">
					<div className="text-center">
						<h3 className="text-2xl font-bold mb-4">
							Ready to Transform Your Cloud Strategy?
						</h3>
						<p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
							Let our experts help you optimize your multi-cloud infrastructure
							and achieve better results.
						</p>
						<Link href="/#contact">
							<Button size="lg" className="group">
								Get Started Today
								<ArrowLeft className="ml-2 w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
							</Button>
						</Link>
					</div>
				</div>
			</article>
		</div>
	);
}

export function generateStaticParams() {
	return Object.keys(newsData).map((slug) => ({
		slug,
	}));
}
