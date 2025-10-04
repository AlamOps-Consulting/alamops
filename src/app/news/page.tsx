import { API_URL } from "@/lib/utils";
import NewsPageClient from "@/components/news-page-client";import { FALLBACK_RAW, normalizeArticles } from "@/components/data/news-fallback";


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
	if (!API_URL) {
		// Sin API_URL usamos fallback
		const initial = normalizeArticles(FALLBACK_RAW);
		return <NewsPageClient initialArticles={initial} />;
	}

	try {
		const res = await fetch(`${API_URL}/news?page=1&per_page=12`, {
			next: { revalidate: 60 },
		});

		if (!res.ok) {
			const initial = normalizeArticles(FALLBACK_RAW);
			return <NewsPageClient initialArticles={initial} />;
		}

		const payload = await res.json();
		const rawItems = payload.items ?? payload ?? [];
		const rawArray = Array.isArray(rawItems) ? rawItems : [rawItems];
		const initial = normalizeArticles(rawArray);

		return <NewsPageClient initialArticles={initial} />;
	} catch (err) {
		const initial = normalizeArticles(FALLBACK_RAW);
		return <NewsPageClient initialArticles={initial} />;
	}
}
