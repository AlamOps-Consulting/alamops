"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createNews } from "@/lib/admin-api";

const CATEGORIES = [
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

export default function NewNewsPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);
		const form = e.currentTarget;
		const fd = new FormData(form);

		try {
			await createNews(fd);
			toast.success("Article created");
			router.push("/admin/news");
		} catch (err: unknown) {
			toast.error(
				err instanceof Error ? err.message : "Failed to create article",
			);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen bg-background px-4 py-12">
			<div className="max-w-3xl mx-auto">
				{/* Header */}
				<div className="mb-12">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => router.back()}
						className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
					>
						← Back
					</Button>
					<h1 className="text-3xl font-semibold tracking-tight text-foreground">
						New Article
					</h1>
					<p className="text-sm text-muted-foreground mt-2">
						Create a new article for the news section
					</p>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="space-y-8">
					{/* Title */}
					<div className="space-y-2">
						<Label
							htmlFor="title"
							className="text-xs uppercase tracking-wider text-muted-foreground font-medium"
						>
							Title *
						</Label>
						<Input
							id="title"
							name="title"
							required
							placeholder="Enter article title"
							className="h-12 bg-card border-border/50 focus:border-foreground/20 transition-colors"
						/>
					</div>

					{/* Category */}
					<div className="space-y-2">
						<Label
							htmlFor="category"
							className="text-xs uppercase tracking-wider text-muted-foreground font-medium"
						>
							Category *
						</Label>
						<select
							id="category"
							name="category"
							required
							className="flex h-12 w-full rounded-md border border-border/50 bg-card px-3 py-1 text-sm outline-none focus:border-foreground/20 transition-colors"
						>
							<option value="">Select a category</option>
							{CATEGORIES.map((c) => (
								<option key={c} value={c}>
									{c}
								</option>
							))}
						</select>
					</div>

					{/* Content */}
					<div className="space-y-2">
						<Label
							htmlFor="content"
							className="text-xs uppercase tracking-wider text-muted-foreground font-medium"
						>
							Content * (HTML allowed)
						</Label>
						<textarea
							id="content"
							name="content"
							required
							rows={12}
							placeholder="Enter article content with HTML formatting..."
							className="flex min-h-[240px] w-full rounded-md border border-border/50 bg-card px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground/20 transition-colors resize-y"
						/>
					</div>

					{/* Author & Read Time */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<Label
								htmlFor="author"
								className="text-xs uppercase tracking-wider text-muted-foreground font-medium"
							>
								Author
							</Label>
							<Input
								id="author"
								name="author"
								placeholder="Author name"
								className="h-12 bg-card border-border/50 focus:border-foreground/20 transition-colors"
							/>
						</div>
						<div className="space-y-2">
							<Label
								htmlFor="readTime"
								className="text-xs uppercase tracking-wider text-muted-foreground font-medium"
							>
								Read time (minutes)
							</Label>
							<Input
								id="readTime"
								name="readTime"
								type="number"
								min={1}
								placeholder="5"
								className="h-12 bg-card border-border/50 focus:border-foreground/20 transition-colors"
							/>
						</div>
					</div>

					{/* Icon & Featured */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<Label
								htmlFor="icon"
								className="text-xs uppercase tracking-wider text-muted-foreground font-medium"
							>
								Icon (emoji)
							</Label>
							<Input
								id="icon"
								name="icon"
								maxLength={8}
								placeholder="☁️"
								className="h-12 bg-card border-border/50 focus:border-foreground/20 transition-colors"
							/>
						</div>
						<div className="flex items-end pb-3">
							<label className="flex items-center gap-3 cursor-pointer">
								<input
									id="featured"
									name="featured"
									type="checkbox"
									value="true"
									className="h-4 w-4 rounded border-border/50 text-foreground focus:ring-foreground/20"
								/>
								<span className="text-sm text-foreground">
									Mark as featured
								</span>
							</label>
						</div>
					</div>

					{/* Cover Image */}
					<div className="space-y-2">
						<Label
							htmlFor="image"
							className="text-xs uppercase tracking-wider text-muted-foreground font-medium"
						>
							Cover image
						</Label>
						<Input
							id="image"
							name="image"
							type="file"
							accept="image/*"
							className="h-12 bg-card border-border/50 focus:border-foreground/20 transition-colors file:mr-4 file:px-4 file:py-2 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-muted file:text-foreground hover:file:bg-muted/80"
						/>
					</div>

					{/* Actions */}
					<div className="flex gap-4 pt-6 border-t border-border/50">
						<Button
							type="submit"
							disabled={loading}
							className="h-12 px-8 font-medium"
						>
							{loading ? "Creating…" : "Create Article"}
						</Button>
						<Button
							type="button"
							variant="outline"
							onClick={() => router.back()}
							className="h-12 px-8"
						>
							Cancel
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
