export interface NewsItem {
	_id: string;
	author: string;
	category: string;
	content: string; // HTML (p. ej. "<p>...</p>")
	date: string; // ISO string ("2025-09-17T10:21:57.113000Z"). Puedes usar `Date` si lo conviertes.
	icon: string; // emoji u otro string
	readTime: number; // minutos aproximados
	slug: string;
	title: string;
  excerpt: string;
  featured: boolean;
}

export interface NewsList {
	items: NewsItem[];
	page: number;
	per_page: number;
	total: number;
}

