"use client";

import { ArrowLeft, ArrowRight, Calendar,  Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import IconRenderer from "@/lib/icon-render";
import { Badge } from "./ui/badge";
import Link from "next/link";

export default function NewsPageClient({ initialArticles }) {
	const [articles, setArticles] = useState(initialArticles || []);
	const [category, setCategory] = useState("All");
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const categories = [
		"All",
		"Certifications",
		"Products",
		"Expansion",
		"Security",
		"Team",
		"Innovation",
		"Business",
		"Partnerships",
	];

	const filtered = useMemo(() => {
		let list = articles;
		if (category !== "All") list = list.filter((a) => a.category === category);
		if (query.trim()) {
			const q = query.toLowerCase();
			list = list.filter(
				(a) =>
					(a.title || "").toLowerCase().includes(q) ||
					(a.excerpt || "").toLowerCase().includes(q)
			);
		}
		return list;
	}, [articles, category, query]);

	async function loadMore() {
		setLoading(true);
		try {
			const nextPage = page + 1;
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/news?page=${nextPage}&per_page=12`
			);
			if (res.ok) {
				const payload = await res.json();
				const newItems = payload.items ?? payload ?? [];
				setArticles((s) => [...s, ...newItems]);
				setPage(nextPage);
			}
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen bg-background">
			<div className="bg-muted/30 py-20 lg:py-32">
				<div className="container mx-auto px-4">
					<Link href="/#news">
						<Button variant="ghost" size="sm" className="group">
							<ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
							Back to News
						</Button>
					</Link>
					<div className="text-center max-w-4xl mx-auto">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-6">
							Company News & Updates
						</h1>
						<p className="text-xl text-muted-foreground text-balance leading-relaxed mb-8">
							Stay informed about our latest achievements, product launches, and
							industry insights in the multi-cloud ecosystem
						</p>

						{/* Search Bar */}
						<div className="relative max-w-md mx-auto">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
							<Input
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								placeholder="Search news articles..."
								className="pl-10 bg-background/80 backdrop-blur-sm border-0 shadow-sm"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="container mx-auto px-4 py-16">
				{/* Category Filter */}
				<div className="flex flex-wrap gap-2 justify-center mb-12">
					{categories.map((category) => (
						<Button
							key={category}
							variant={category === "All" ? "default" : "outline"}
							size="sm"
							className="rounded-full"
						>
							{category}
						</Button>
					))}
				</div>

				{/* Featured Articles */}
				<div className="mb-16">
					<h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{filtered
							.filter((a) => a.featured)
							.map((article, index) => {
                const formatted = new Date(article.date).toLocaleDateString(
									"en-US",
									{
										month: "long",
										day: "numeric",
										year: "numeric",
									}
								);
                
								return (
									<Link key={index} href={`/news/${article.slug}`}>
										<Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-background/80 backdrop-blur-sm h-full">
											<CardHeader className="pb-4">
												<div className="flex items-center justify-between mb-4">
													<Badge
														variant="secondary"
														className="text-xs font-medium"
													>
														{article.category}
													</Badge>
													<div className="flex items-center gap-1 text-sm text-muted-foreground">
														<Calendar className="w-4 h-4" />
														{formatted}
													</div>
												</div>

												<div className="flex items-start gap-3 mb-3">
													<div className="p-2 rounded-lg bg-primary/10 text-primary">
														<IconRenderer
															icon={article.icon ?? ""}
															className="w-5 h-5"
														/>
													</div>
													<CardTitle className="text-xl group-hover:text-primary transition-colors leading-tight">
														{article.title}
													</CardTitle>
												</div>
											</CardHeader>

											<CardContent className="pt-0">
												<CardDescription className="leading-relaxed mb-4 text-base">
													{article.excerpt}
												</CardDescription>

												<div className="flex items-center justify-between">
													<span className="text-sm text-muted-foreground">
														{article.readTime}
													</span>
													<Button
														variant="ghost"
														size="sm"
														className="group/btn p-0 h-auto text-primary hover:text-primary"
													>
														Read more
														<ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
													</Button>
												</div>
											</CardContent>
										</Card>
									</Link>
								);
							})}
					</div>
				</div>

				{/* All Articles */}
				<div>
					<h2 className="text-2xl font-bold mb-8">All Articles</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{filtered.map((article, index) => {
               const formatted = new Date(article.date).toLocaleDateString(
									"en-US",
									{
										month: "long",
										day: "numeric",
										year: "numeric",
									}
								);
							return (
								<Link key={index} href={`/news/${article.slug}`}>
									<Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-background/60 backdrop-blur-sm">
										<CardHeader className="pb-3">
											<div className="flex items-center justify-between mb-3">
												<Badge
													variant="secondary"
													className={`text-xs font-medium ${
														article.featured ? "bg-primary/10 text-primary" : ""
													}`}
												>
													{article.category}
												</Badge>
												<div className="flex items-center gap-1 text-sm text-muted-foreground">
													<Calendar className="w-4 h-4" />
													{formatted}
												</div>
											</div>

											<div className="flex items-start gap-3">
												<div className="p-1.5 rounded-lg bg-primary/10 text-primary">
													<IconRenderer
														icon={article.icon ?? ""}
														className="w-5 h-5"
													/>
												</div>
												<div className="flex-1">
													<CardTitle className="text-lg group-hover:text-primary transition-colors leading-tight mb-2">
														{article.title}
													</CardTitle>
													<CardDescription className="leading-relaxed text-sm">
														{article.excerpt}
													</CardDescription>
												</div>
											</div>
										</CardHeader>

										<CardContent className="pt-0">
											<div className="flex items-center justify-between">
												<span className="text-sm text-muted-foreground">
													{article.readTime}
												</span>
												<Button
													variant="ghost"
													size="sm"
													className="group/btn p-0 h-auto text-primary hover:text-primary"
												>
													Read more
													<ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
												</Button>
											</div>
										</CardContent>
									</Card>
								</Link>
							);
						})}
					</div>
				</div>

				{/* Load More Button */}
				<div className="text-center mt-12">
					<Button variant="outline" size="lg" className="group bg-transparent">
						Load More Articles
						<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
					</Button>
				</div>
			</div>
		</div>
	);
}
