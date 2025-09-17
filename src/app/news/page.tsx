
import { API_URL } from "@/lib/utils";
import NewsPageClient from "@/components/news-page-client";

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
export default async function NewsPage() {
	if (!API_URL) throw new Error("NEXT_PUBLIC_API_URL is not defined");
	const res = await fetch(`${API_URL}/news?page=1&per_page=12`, {
	next: { revalidate: 60 },
	});
	
	
	let initial = [];
	if (res.ok) {
	const payload = await res.json();
	initial = payload.items ?? payload ?? [];
	}
	return <NewsPageClient initialArticles={initial} />;
	}

	