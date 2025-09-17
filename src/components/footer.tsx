import { Button } from "@/components/ui/button";
import { Cloud, Github, Linkedin, Twitter } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
	return (
		<footer className="bg-foreground text-background py-16">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
					{/* Brand */}
					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
								<Cloud className="w-5 h-5 text-primary-foreground" />
								<div className="flex items-center space-x-3">
									<div className="w-8 h-8 relative">
										<Image
											src="/alamops-logo.svg"
											alt="AlamOps"
											fill
											className="object-contain w-4xl bg-white"
										/>
									</div>
								</div>
							</div>
							<span className="text-xl font-bold">Alamops</span>
						</div>
						<p className="text-background/70 leading-relaxed">
							Transforming companies through innovative and secure multi-cloud
							solutions.
						</p>
						<div className="flex gap-3">
							{/* <Link href="https://twitter.com/alamops" passHref>
								<Button
									size="icon"
									variant="ghost"
									className="text-background/70 hover:text-background hover:bg-background/10"
								>
									<Twitter className="w-5 h-5" />
								</Button>
							</Link> */}
							<Link href="https://www.linkedin.com/company/alamops/" passHref>
								<Button
									size="icon"
									variant="ghost"
									className="text-background/70 hover:text-background hover:bg-background/10"
								>
									<Linkedin className="w-5 h-5" />
								</Button>
							</Link>

							<Link href="https://github.com/AlamOps-Consulting" passHref>
								<Button
									size="icon"
									variant="ghost"
									className="text-background/70 hover:text-background hover:bg-background/10"
								>
									<Github className="w-5 h-5" />
								</Button>
							</Link>
						</div>
					</div>

					{/* Services */}
					<div>
						<h3 className="font-semibold mb-4">Services</h3>
						<ul className="space-y-3 text-background/70">
							<li>
								<a href="#" className="hover:text-background transition-colors">
									Multi-Cloud Strategy
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-background transition-colors">
									Cloud Security
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-background transition-colors">
									DevOps & Automation
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-background transition-colors">
									FinOps
								</a>
							</li>
						</ul>
					</div>

					{/* Company */}
					<div>
						<h3 className="font-semibold mb-4">Enterprise</h3>
						<ul className="space-y-3 text-background/70">
							<li>
								<a href="#" className="hover:text-background transition-colors">
									About us
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-background transition-colors">
									Team
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-background transition-colors">
									Carrers
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-background transition-colors">
									News
								</a>
							</li>
						</ul>
					</div>

					{/* Legal */}
					<div>
						<h3 className="font-semibold mb-4">Legal</h3>
						<ul className="space-y-3 text-background/70">
							<li>
								<a
									href="/privacy"
									className="hover:text-background transition-colors"
								>
									Privacy Policy
								</a>
							</li>
							<li>
								<a
									href="/terms"
									className="hover:text-background transition-colors"
								>
									Terms of Service
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-background transition-colors">
									Cookie Policy
								</a>
							</li>
							<li>
								<a
									href="https://calendly.com/ceo-alamops"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-background transition-colors"
								>
									Contact
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-background/70 text-sm">
						© {new Date().getFullYear()} AlamOps. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
