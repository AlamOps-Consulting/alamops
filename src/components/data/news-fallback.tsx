import type { NewsItem } from "@/types/news.type";

/**
 * Fallback (raw) tal y como lo enviaste — aquí está "precisamente" tu JSON.
 */
export const FALLBACK_RAW = [
	{
		_id: { $oid: "68cd6f462019e5c9f72ca363" },
		title: "Discover IAC-Designs: the new AlamOps platform",
		category: "Products",
		icon: "☁️",
		slug: "discover-iac-designs-the-new-alamops-platform",
		readTime: 4,
		author: "AlamOps Team",
		content:
			"<p>At <strong>AlamOps</strong> we have created <strong>IAC-Designs</strong>, a platform that makes cloud technology simple, secure, and efficient for any business. Our goal is to help you automate processes that used to take days or weeks, so they can now be completed in just minutes. With IAC-Designs you can manage your infrastructure effortlessly while we ensure everything runs reliably. This way, your team can focus on growth and customer success instead of dealing with technical complexities. It’s innovation working for your business.</p>\n\n<p>What makes <strong>IAC-Designs</strong> special is that you don’t need to be an expert to take full advantage of it. The platform provides personalized spaces for each company, clear dashboards, and ready-to-use tools. Everything is designed so you can have complete control of your systems without the stress of managing complex environments. Plus, we integrate security and best practices from the very beginning, so you can work with peace of mind. In short: fewer technical problems, more visible results.</p>\n\n<p>At <strong>AlamOps</strong> we believe technology should be a close ally, not a headache. That’s why with <strong>IAC-Designs</strong> we don’t just deliver a platform—we also provide expert guidance and continuous support. We want your experience to be simple, reliable, and truly growth-driven. We invite you to discover how cloud automation can transform the way you work. <strong>Visit us and take the first step towards your company’s digital future.</strong></p>",
		date: { $date: "2025-09-19T14:57:10.758Z" },
	},
];

/** Helpers */
function stripHtml(html = "") {
	// simple removal de etiquetas HTML
	return html
		.replace(/<[^>]*>/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

function buildExcerpt(content: string, max = 180) {
	const text = stripHtml(content);
	if (text.length <= max) return text;
	return (
		text
			.slice(0, max)
			.trim()
			.replace(/\s+\S*$/, "") + "…"
	);
}

/**
 * Normaliza entradas (acepta el raw mongo-export u objetos ya normales)
 * y devuelve NewsItem[] (lo que espera NewsGrid).
 */
export function normalizeArticles(raw: any[]): NewsItem[] {
	return raw.map((a) => {
		const rawDate = a?.date?.$date ?? a?.date ?? new Date().toISOString();
		const dateIso =
			typeof rawDate === "string" ? rawDate : new Date(rawDate).toISOString();

		const content = a.content ?? "";
		const excerpt = a.excerpt ?? buildExcerpt(content, 200);
		const _id = String(a._id?.$oid ?? a._id ?? a.id ?? a.slug ?? "");

		const featured = Boolean(a.featured ?? false);

		return {
			_id,
			title: a.title ?? "",
			slug: a.slug ?? "",
			category: a.category ?? "",
			icon: a.icon ?? "",
			readTime: Number(a.readTime ?? 1),
			author: a.author ?? "",
			content,
			excerpt,
			date: dateIso,
			featured,
		} as NewsItem;
	});
}