import { FALLBACK_RAW, normalizeArticles } from "@/components/data/news-fallback";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import IconRenderer from "@/lib/icon-render";
import { API_URL } from "@/lib/utils";
import { Calendar, ArrowLeft, Clock, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
	params: {
		slug: string;
	};
}

export default async function NewsDetailPage({ params }: PageProps) {
	const slug = params.slug;

	// Si no hay API_URL usamos fallback inmediatamente
	if (!API_URL) {
		const fallbackList = normalizeArticles(FALLBACK_RAW);
		const found = fallbackList.find((a) => a.slug === slug);
		if (!found) return notFound();
		const article = found;
		const formatted = new Date(article.date).toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});

		return renderArticle(article, formatted);
	}

	// Si sí hay API_URL intentamos fetch pero nos protegemos con try/catch
	const urlBySlug = `${API_URL}/news/slug/${encodeURIComponent(slug)}`;
	try {
		const res = await fetch(urlBySlug, { next: { revalidate: 60 } });
		if (!res.ok) {
			// si backend devuelve 4xx/5xx caemos al fallback
			const fallbackList = normalizeArticles(FALLBACK_RAW);
			const found = fallbackList.find((a) => a.slug === slug);
			if (!found) return notFound();
			const article = found;
			const formatted = new Date(article.date).toLocaleDateString("en-US", {
				month: "long",
				day: "numeric",
				year: "numeric",
			});
			return renderArticle(article, formatted);
		}

		// si res.ok parseamos. Puede venir un objeto single o array.
		const payload = await res.json();
		// Normalizamos siempre a través de normalizeArticles
		const rawItems = payload ? payload.items ?? payload : [];
		const rawArray = Array.isArray(rawItems) ? rawItems : [rawItems];
		const normalized = normalizeArticles(rawArray);
		const article = normalized.find((a) => a.slug === slug);

		if (!article) {
			// si backend no devolvió el slug, probar fallback
			const fallbackList = normalizeArticles(FALLBACK_RAW);
			const found = fallbackList.find((a) => a.slug === slug);
			if (!found) return notFound();
			const fArticle = found;
			const formatted = new Date(fArticle.date).toLocaleDateString("en-US", {
				month: "long",
				day: "numeric",
				year: "numeric",
			});
			return renderArticle(fArticle, formatted);
		}

		const formatted = new Date(article.date).toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});

		return renderArticle(article, formatted);
	} catch (err) {
		// red/parse error -> fallback
		const fallbackList = normalizeArticles(FALLBACK_RAW);
		const found = fallbackList.find((a) => a.slug === slug);
		if (!found) return notFound();
		const article = found;
		const formatted = new Date(article.date).toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});
		return renderArticle(article, formatted);
	}
}

/** helper para renderizar el JSX del artículo (evita duplicar markup) */
function renderArticle(article: any, formatted: string) {
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
