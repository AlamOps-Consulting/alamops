import { describe, expect, it } from "vitest";
import { FALLBACK_RAW, normalizeArticles } from "./news-fallback";

describe("normalizeArticles", () => {
  it("normalizes the bundled Mongo export", () => {
    const [article] = normalizeArticles(FALLBACK_RAW);

    expect(article._id).toBe("68cd6f462019e5c9f72ca363");
    expect(article.date).toBe("2025-09-19T14:57:10.758Z");
    expect(article.excerpt).not.toContain("<p>");
    expect(article.featured).toBe(false);
  });

  it("preserves absolute images and normalizes primitive fields", () => {
    const [article] = normalizeArticles([
      {
        _id: "news-1",
        slug: "security-update",
        title: "Security update",
        content: "<p>Patched safely</p>",
        image_url: "https://cdn.example.test/security.png",
        readTime: 0,
        featured: true,
        date: "2026-09-30T00:00:00.000Z",
      },
    ]);

    expect(article).toMatchObject({
      _id: "news-1",
      excerpt: "Patched safely",
      image: "https://cdn.example.test/security.png",
      featured: true,
      readTime: 0,
    });
  });

  it("builds a relative image route for bare filenames", () => {
    const [article] = normalizeArticles([{ slug: "image", image: "image.png" }]);
    const apiBase = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
    const expected = apiBase
      ? `${apiBase}/news/image/image.png`
      : "/news/image/image.png";

    expect(article.image).toBe(expected);
  });
});
