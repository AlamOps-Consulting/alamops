import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, FileText, Calendar, Mail } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
	const sections = [
		{ id: "purpose", title: "1. Purpose" },
		{ id: "data-protection", title: "2. Data Protection" },
		{ id: "security", title: "3. Security" },
		{ id: "platform-usage", title: "4. Platform Usage" },
		{ id: "intellectual-property", title: "5. Intellectual Property" },
		{ id: "liability-limitation", title: "6. Liability Limitation" },
		{ id: "billing-services", title: "7. Billing and Services" },
		{ id: "user-rights", title: "8. User Rights" },
		{ id: "contact", title: "9. Contact" },
		{ id: "acceptance", title: "10. Acceptance" },
	];

	const currentDate = new Date().toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

	return (
		<div className="min-h-screen bg-background">
			{/* Header with back button */}
			<div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
				<div className="container mx-auto px-4 py-4">
					<Link href="/">
						<Button variant="ghost" size="sm" className="group">
							<ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
							Back to Home
						</Button>
					</Link>
				</div>
			</div>

			<article className="container mx-auto px-4 py-12 max-w-4xl">
				{/* Article header */}
				<div className="mb-12">
					<div className="flex items-center gap-4 mb-6">
						<Badge variant="secondary" className="text-sm">
							Legal
						</Badge>
						<div className="flex items-center gap-4 text-sm text-muted-foreground">
							<div className="flex items-center gap-1">
								<Calendar className="w-4 h-4" />
								Last updated: {currentDate}
							</div>
						</div>
					</div>

					<div className="flex items-start gap-4 mb-8">
						<div className="p-3 rounded-xl bg-primary/10 text-primary">
							<Shield className="w-6 h-6" />
						</div>
						<div>
							<h1 className="text-4xl md:text-5xl font-bold text-balance leading-tight mb-4">
								Privacy Policy
							</h1>
							<p className="text-xl text-muted-foreground">
								AlamOps Consulting
							</p>
						</div>
					</div>

					<div className="p-6 bg-muted/50 rounded-xl border mb-8">
						<p className="text-foreground/90 leading-relaxed">
							Welcome to AlamOps Consulting. Security, transparency, and data
							protection are our priorities. By registering on our platform, you
							confirm that you have read and accepted these terms and
							conditions.
						</p>
					</div>
				</div>

				{/* Table of Contents */}
				<div className="mb-12 p-6 bg-card rounded-xl border">
					<div className="flex items-center gap-2 mb-4">
						<FileText className="w-5 h-5 text-primary" />
						<h2 className="text-xl font-semibold">Table of Contents</h2>
					</div>
					<nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
						{sections.map((section) => (
							<a
								key={section.id}
								href={`#${section.id}`}
								className="text-sm text-muted-foreground hover:text-primary transition-colors py-1 px-2 rounded hover:bg-muted/50"
							>
								{section.title}
							</a>
						))}
					</nav>
				</div>

				{/* Content sections */}
				<div className="space-y-12">
					<section id="purpose" className="scroll-mt-24">
						<h2 className="text-2xl font-bold mb-4">1. Purpose</h2>
						<p className="text-foreground/90 leading-relaxed">
							These terms regulate the use of services, applications, and
							digital platforms offered by AlamOps Consulting. By registering,
							you agree to comply with this policy in its entirety.
						</p>
					</section>

					<section id="data-protection" className="scroll-mt-24">
						<h2 className="text-2xl font-bold mb-4">2. Data Protection</h2>
						<div className="space-y-4 text-foreground/90 leading-relaxed">
							<p>
								AlamOps Consulting complies with European and local data
								protection regulations (including the General Data Protection
								Regulation – GDPR).
							</p>
							<p>
								Personal data collected during registration will be used
								exclusively for providing contracted services, managing
								commercial relationships, and improving user experience.
							</p>
							<p>
								Data will not be transferred to third parties without express
								consent, except when legally required.
							</p>
						</div>
					</section>

					<section id="security" className="scroll-mt-24">
						<h2 className="text-2xl font-bold mb-4">3. Security</h2>
						<div className="space-y-4 text-foreground/90 leading-relaxed">
							<p>
								We apply advanced cybersecurity and DevSecOps measures,
								including encryption, automated audits, and continuous
								monitoring.
							</p>
							<p>
								Despite our efforts, no system is 100% secure; users accept the
								inherent risks of using online services.
							</p>
						</div>
					</section>

					<section id="platform-usage" className="scroll-mt-24">
						<h2 className="text-2xl font-bold mb-4">4. Platform Usage</h2>
						<div className="space-y-4 text-foreground/90 leading-relaxed">
							<p>
								Users commit to using services legally and in accordance with
								good faith principles.
							</p>
							<p>
								Using the platform for illegal activities, cyber attacks, or
								unauthorized access is prohibited.
							</p>
							<p>
								AlamOps reserves the right to suspend or cancel accounts that
								violate this policy.
							</p>
						</div>
					</section>

					<section id="intellectual-property" className="scroll-mt-24">
						<h2 className="text-2xl font-bold mb-4">
							5. Intellectual Property
						</h2>
						<div className="space-y-4 text-foreground/90 leading-relaxed">
							<p>
								All content, software, documentation, and trademarks are
								property of AlamOps Consulting or their respective licensed
								owners.
							</p>
							<p>
								Copying, distributing, or modifying material without prior
								authorization is not permitted.
							</p>
						</div>
					</section>

					<section id="liability-limitation" className="scroll-mt-24">
						<h2 className="text-2xl font-bold mb-4 ">
							6. Liability Limitation
						</h2>
						<div className="space-y-4 text-foreground/90 leading-relaxed">
							<p>
								AlamOps Consulting will not be responsible for temporary
								interruptions, data loss caused by third parties, or misuse of
								the platform.
							</p>
							<p>
								Users are responsible for maintaining the confidentiality of
								their credentials.
							</p>
						</div>
					</section>

					<section id="billing-services" className="scroll-mt-24">
						<h2 className="text-2xl font-bold mb-4 ">
							7. Billing and Services
						</h2>
						<p className="text-foreground/90 leading-relaxed">
							When contracting premium or consulting services, specific
							conditions (prices, billing, support) will be regulated in a
							separate contract.
						</p>
					</section>

					<section id="user-rights" className="scroll-mt-24">
						<h2 className="text-2xl font-bold mb-4">8. User Rights</h2>
						<div className="space-y-4 text-foreground/90 leading-relaxed">
							<p>Users have the right to:</p>
							<ul className="list-disc list-inside space-y-2 ml-4">
								<li>Access, rectify, and delete their personal data.</li>
								<li>Request data portability.</li>
								<li>Withdraw consent at any time.</li>
							</ul>
						</div>
					</section>

					<section id="contact" className="scroll-mt-24">
						<h2 className="text-2xl font-bold mb-4 ">9. Contact</h2>
						<div className="p-4 bg-muted/50 rounded-lg border">
							<p className="text-foreground/90 leading-relaxed mb-3">
								To exercise your rights or resolve questions about this policy,
								you can contact us at:
							</p>
							<div className="flex items-center gap-2 text-primary">
								<Mail className="w-4 h-4" />
								<a href="mailto:legal@alamops.com" className="hover:underline">
									legal@alamops.com
								</a>
							</div>
						</div>
					</section>

					<section id="acceptance" className="scroll-mt-24">
						<h2 className="text-2xl font-bold mb-4 ¡">10. Acceptance</h2>
						<p className="text-foreground/90 leading-relaxed">
							By clicking "Accept" during registration, users confirm they have
							read, understood, and accepted these terms and conditions.
						</p>
					</section>
				</div>

				{/* Call to action */}
				<div className="mt-16 p-8 bg-muted/50 rounded-xl border">
					<div className="text-center">
						<h3 className="text-2xl font-bold mb-4">
							Questions About Our Policy?
						</h3>
						<p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
							Our legal team is available to resolve any questions about data
							processing and our terms of service.
						</p>
						<a href="mailto:legal@alamops.com">
							<Button size="lg" className="group">
								Contact Legal Team
								<Mail className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</Button>
						</a>
					</div>
				</div>
			</article>
		</div>
	);
}
