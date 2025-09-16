import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight} from "lucide-react";
import Link from "next/link";
import { news } from "./data/news";


export function NewsSection() {
	return (
		<section id="news" className="py-20 lg:py-32 bg-muted/30">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance mb-6">
						Latest News & Updates
					</h2>
					<p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
						Stay up to date with our latest achievements and developments in the
						cloud world
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{news.map((article, index) => {
						const IconComponent = article.icon;
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
												{article.date}
											</div>
										</div>

										<div className="flex items-start gap-3 mb-3">
											<div className="p-2 rounded-lg bg-primary/10 text-primary">
												<IconComponent className="w-5 h-5" />
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

				<div className="text-center mt-12">
					<Link href="/news">
						<Button
							variant="outline"
							size="lg"
							className="group bg-transparent"
						>
							View All News
							<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}
