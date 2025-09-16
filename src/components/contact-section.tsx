"use client";

import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner"

type FormState = {
	name: string;
	email: string;
	company: string;
	phone: string;
	message: string;
};

export function ContactSection() {
	const [form, setForm] = useState<FormState>({
		name: "",
		email: "",
		company: "",
		phone: "",
		message: "",
	});
	const [sending, setSending] = useState(false);

	const SERVICE_ID =
		process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_c0gabxh";
	const TEMPLATE_ID =
		process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_xebilip";
	const USER_ID =
		process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "iEVrBKwqOvCLICTdh";

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSending(true);

		const templateParams = {
			to_name: "AlamOps",
			from_name: form.name,
			from_email: form.email,
			company: form.company,
			phone: form.phone,
			message: form.message,
		};

		try {
			await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);

			toast("Email sent successfully!", {
				duration: 5000,
				action: {
					label: "Undo",
					onClick: () => console.log("Undo"),
				},
			});
			setForm({ name: "", email: "", company: "", phone: "", message: "" });
		} catch (error) {
			console.error("EmailJS error:", error);
			alert("Hubo un error al enviar el mensaje. Inténtalo de nuevo.");
		} finally {
			setSending(false);
		}
	};

	return (
		<section id="contact" className="py-20 lg:py-32 bg-muted/30">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance mb-6">
						Contact with us
					</h2>
					<p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
						Ready to transform your cloud infrastructure? Our experts are here to help you!
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
					{/* Contact Form */}
					<Card className="border-0 bg-card/50 backdrop-blur-sm">
						<form onSubmit={handleSubmit}>
							<CardHeader>
								<CardTitle className="text-2xl">Send us a message</CardTitle>
								<CardDescription>
									Complete the form and we'll get back to you within 24 hours
								</CardDescription>
							</CardHeader>

							<CardContent className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="name">Name</Label>
										<Input
											id="name"
											name="name"
											placeholder="Your name"
											value={form.name}
											onChange={handleChange}
											required
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="email">Email</Label>
										<Input
											id="email"
											name="email"
											type="email"
											placeholder="your@mail.com"
											value={form.email}
											onChange={handleChange}
											required
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="company">Enterprise</Label>
									<Input
										id="company"
										name="company"
										placeholder="Name of your enterprise"
										value={form.company}
										onChange={handleChange}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="phone">Phone</Label>
									<Input
										id="phone"
										name="phone"
										placeholder="+34 600 000 000"
										value={form.phone}
										onChange={handleChange}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="message">Message</Label>
									<Textarea
										id="message"
										name="message"
										placeholder="Tell us about your project and how we can help you..."
										className="min-h-32"
										value={form.message}
										onChange={handleChange}
										required
									/>
								</div>

								<Button
									className="w-full"
									size="lg"
									type="submit"
									disabled={sending}
								>
									{sending ? "Enviando..." : "Send Message"}
								</Button>
							</CardContent>
						</form>
					</Card>

					{/* Contact Info */}
					<div className="space-y-8">
						<div>
							<h3 className="text-2xl font-bold mb-6">Contact Information</h3>
							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
										<Mail className="w-6 h-6 text-primary" />
									</div>
									<div>
										<h4 className="font-semibold mb-1">Email</h4>
										<p className="text-muted-foreground">info@alamops.com</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
										<Phone className="w-6 h-6 text-primary" />
									</div>
									<div>
										<h4 className="font-semibold mb-1">Phone</h4>
										<p className="text-muted-foreground">+34 624 248 794</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
										<MapPin className="w-6 h-6 text-primary" />
									</div>
									<div>
										<h4 className="font-semibold mb-1">Office</h4>
										<p className="text-muted-foreground">Madrid, España</p>
									</div>
								</div>
							</div>
						</div>

						<Card className="border-primary/20 bg-primary/5">
							<CardContent className="p-6">
								<h4 className="font-semibold mb-2">
									Need help urgently?
								</h4>
								<p className="text-sm text-foreground/80 mb-4">
									Our support team is available 24/7 for critical emergencies
								</p>
								<Button variant="outline" size="sm">
									Emergency Support
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
