import React from "react";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL("https://alamops.com"), 
	title: {
		default: "Alamops",
		template: "%s | Alamops",
	},
	description:
		"Alamops — AI-generated Terraform, one-click multi-cloud deploys (AWS & Azure), infra visualizer and DevOps marketplaces.",
	keywords: [
		"Terraform",
		"Infrastructure as Code",
		"AI",
		"DevOps",
		"AWS",
		"Azure",
		"cloud",
		"infrastructure",
	],
	authors: [{ name: "Alamops", url: "https://alamops.com" }],
	creator: "Frank Josue",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#000000" },
	],
	openGraph: {
		title: "Alamops — AI Terraform & Multi-cloud Deploys",
		description:
			"Auto-generate Terraform with AI, deploy to AWS & Azure, visualize VPCs and install marketplace modules in one platform.",
		url: "https://alamops.com/",
		siteName: "Alamops",
		images: [
			{
				url: "/alamops-logo.svg",
				width: 1200,
				height: 630,
				alt: "Alamop",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Alamops — AI Terraform & Multi-cloud Deploys",
		description:
			"Auto-generate Terraform with AI, deploy to AWS & Azure, visualize VPCs and install marketplace modules in one platform.",
		creator: "@alamops", // ajusta si tienes handle
		images: "/alamops-logo.svg",
	},
	icons: {
		icon: "/alamops-logo.svg",
		shortcut: "/alamops-logo.svg",
		apple: "/alamops-logo.svg",
	},
	// robots: instruct search engines
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				{/* Preconnects for third-party assets / analytics (add only what you use) */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				{/* Example: preload a critical font (adjust path/name) */}
				{/* <link rel="preload" href="/fonts/Inter-Variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /> */}
				{/* Site manifest */}
				<link rel="manifest" href="/site.webmanifest" />
			</head>

			<body>
				<main>{children}</main>

				{/* Sonner Toaster (place at root so toasts work anywhere) */}
				<Toaster />
			</body>
		</html>
	);
}
