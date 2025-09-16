"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link"

export function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
			setIsMenuOpen(false);
		}
	};

	const navItems = [
		{ label: "Home", id: "hero" },
		{ label: "Services", id: "services" },
		{ label: "Newest Product", id: "product"},
		{ label: "News", id: "news" },
		{ label: "Contact", id: "contact" },
	];

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<Link href="/">
						{/* Logo */}
						<div className="flex items-center space-x-3">
							<div className="w-8 h-8 relative">
								<Image
									src="/alamops-logo.svg"
									alt="AlamOps"
									fill
									className="object-contain"
								/>
							</div>
							<span className="text-xl font-bold text-foreground">AlamOps</span>
						</div>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						{navItems.map((item) => (
							<button
								key={item.id}
								onClick={() => scrollToSection(item.id)}
								className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
							>
								{item.label}
							</button>
						))}
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="text-foreground"
						>
							{isMenuOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</Button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<div className="md:hidden border-t border-border bg-background">
						<div className="px-2 pt-2 pb-3 space-y-1">
							{navItems.map((item) => (
								<button
									key={item.id}
									onClick={() => scrollToSection(item.id)}
									className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors duration-200"
								>
									{item.label}
								</button>
							))}
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
