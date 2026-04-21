export interface NewsItem {
	_id: string;
	author: string;
	category: string;
	content: string; // HTML (p. ej. "<p>...</p>")
	date: string; // ISO string ("2025-09-17T10:21:57.113000Z").
	icon: string; // emoji u otro string
	readTime: number;
	slug: string;
	title: string;
	excerpt: string;
	featured: boolean;
	image?: string; // absolute URL ready to use in <img src>
}

export interface NewsList {
	items: NewsItem[];
	page: number;
	per_page: number;
	total: number;
}

