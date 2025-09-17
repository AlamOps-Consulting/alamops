import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import IconRenderer from "@/lib/icon-render";
import { API_URL } from "@/lib/utils";
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

interface PageProps {
	params: {
		slug: string;
	};
}

export default async function NewsDetailPage({ params }: PageProps) {
	const slug = params.slug

	const urlBySlug = `${API_URL}/news/slug/${encodeURIComponent(slug)}`;

  let res = await fetch(urlBySlug, { next: { revalidate: 60 } });
	if (!res.ok) {
		// sin resultado
		notFound();
	}


	const article = await res.json();
	const formatted = new Date(article.date).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
	
	if (!article) {
		notFound();
	}


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
								{formatted}
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
							<IconRenderer icon={article.icon ?? ""} className="w-5 h-5" />
						</div>
						<h1 className="text-4xl md:text-5xl font-bold text-balance leading-tight">
							{article.title}
						</h1>
					</div>
				</div>

				{/* Featured image */}
				<div className="mb-12">
					<img
						src={article.image || "/alamops-logo.svg"}
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

