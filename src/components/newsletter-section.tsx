"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { API_URL } from "@/lib/utils";

export function NewsletterSection() {
	const [email, setEmail] = useState("");
	const [isSubscribing, setIsSubscribing] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubscribing(true);

		try {
			const response = await fetch(`${API_URL}/newsletter/subscribe`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			if (response.status === 201) {
				toast.success("Thanks for subscribing!", {
					description: "You'll receive our latest updates and news.",
					duration: 5000,
				});
				setEmail("");
			} else if (response.status === 409) {
				toast.info("You're already subscribed!", {
					description: "This email is already in our newsletter list.",
					duration: 5000,
				});
			} else if (response.status === 400) {
				toast.error("Invalid email", {
					description: "Please enter a valid email address.",
					duration: 5000,
				});
			} else {
				toast.error("Something went wrong", {
					description: "Please try again later.",
					duration: 5000,
				});
			}
		} catch (error) {
			console.error("Newsletter subscription error:", error);
			toast.error("Connection error", {
				description: "Could not connect to the server. Please try again.",
				duration: 5000,
			});
		} finally {
			setIsSubscribing(false);
		}
	};

	return (
		<section className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/30">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto">
					<Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
						<CardHeader className="text-center">
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<Mail className="w-8 h-8 text-primary" />
							</div>
							<CardTitle className="text-3xl md:text-4xl font-bold">
								Subscribe to Our Newsletter
							</CardTitle>
							<CardDescription className="text-lg mt-2">
								Stay updated with the latest cloud infrastructure insights, best
								practices, and AlamOps news
							</CardDescription>
						</CardHeader>

						<CardContent>
							<form
								onSubmit={handleSubmit}
								className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
							>
								<Input
									type="email"
									placeholder="Enter your email address"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									className="flex-1"
									disabled={isSubscribing}
								/>
								<Button
									type="submit"
									size="lg"
									disabled={isSubscribing}
									className="sm:w-auto"
								>
									{isSubscribing ? "Subscribing..." : "Subscribe"}
								</Button>
							</form>
							<p className="text-sm text-muted-foreground text-center mt-4">
								We respect your privacy. Unsubscribe at any time.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
