import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Calendar, Mail, Scale } from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
	const sections = [
		{ id: "scope", title: "1. Scope and Purpose" },
		{ id: "registration", title: "2. Registration and Account" },
		{ id: "data-privacy", title: "3. Data Protection and Privacy" },
		{ id: "intellectual-property", title: "4. Intellectual Property" },
		{ id: "liability", title: "5. Liability" },
		{ id: "billing", title: "6. Billing and Services" },
		{ id: "modifications", title: "7. Modifications" },
		{ id: "jurisdiction", title: "8. Law and Jurisdiction" },
		{ id: "acceptable-use", title: "9. Acceptable Use Policy" },
		{ id: "enforcement", title: "10. Enforcement" },
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
							<Scale className="w-6 h-6" />
						</div>
						<div>
							<h1 className="text-4xl md:text-5xl font-bold text-balance leading-tight mb-4">
								Terms of Service
							</h1>
							<p className="text-xl text-muted-foreground">
								AlamOps Consulting
							</p>
						</div>
					</div>

					<div className="p-6 bg-muted/50 rounded-xl border mb-8">
						<p className="text-foreground/90 leading-relaxed">
							Welcome to AlamOps Consulting. Access and use of our platform,
							services, and applications are subject to these Terms and
							Conditions. By registering, you confirm that you have read and
							accepted them.
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
					<section id="scope" className="scroll-mt-24">
						<h2 className="text-2xl font-bold mb-4">1. Scope and Purpose</h2>
						<div className="space-y-4 text-foreground/90 leading-relaxed">
							<p>
								These terms regulate the relationship between AlamOps Consulting
								and registered users regarding:
							</p>
							<ul className="list-disc list-inside space-y-2 ml-4">
								<li>Access to the platform and its services</li>
								<li>Use of resources, tools, and content offered</li>
								<li>
									Obligations of both parties regarding security,
									confidentiality, and legal compliance
								</li>
							</ul>
						</div>
					</section>

					<section id="registration" className="scroll-mt-24">
						<h2 className="text-2xl font-bold mb-4">
							2. Registration and Account
						</h2>
						<div className="space-y-4 text-foreground/90 leading-relaxed">
							<p>
								To access the platform, registration with truthful data is
								required.
							</p>
							<p>
								Users are responsible for the confidentiality of their
								credentials and any activity performed with them.
							</p>
							<p>
								AlamOps may suspend or delete accounts in case of
								non-compliance.
							</p>
						</div>
					</section>

					<section id="data-privacy" className="scroll-mt-24">
						<h2 className="text-2xl font-bold mb-4">
							3. Data Protection and Privacy
						</h2>
						<div className="space-y-4 text-foreground/90 leading-relaxed">
							<p>
								We comply with GDPR (EU 2016/679) and applicable regulations.
							</p>
							<p>
								Your personal data will be used only for service provision,
								commercial relationship management, and legal compliance.
							</p>
							<div className="p-4 bg-muted/50 rounded-lg border">
								<p className="mb-2">
									You can exercise your rights (access, rectification, deletion,
									opposition, portability, and limitation) by writing to:
								</p>
								<div className="flex items-center gap-2 text-primary">
									<Mail className="w-4 h-4" />
									<a
										href="mailto:legal@alamops.com"
										className="hover:underline"
									>
										legal@alamops.com
									</a>
								</div>
							</div>
						</div>
					</section>

					<section id="intellectual-property" className="scroll-mt-24">
						<h2 className="text-2xl font-bold mb-4">
							4. Intellectual Property
						</h2>
						<div className="space-y-4 text-foreground/90 leading-relaxed">
							<p>
								All content, software, templates, documentation, and trademarks
								are property of AlamOps Consulting or their licensed owners.
							</p>
							<p>
								Copying, distribution, modification, or exploitation without
								express authorization is not permitted.
							</p>
						</div>
					</section>

					<section id="liability" className="scroll-mt-24">
						<h2 className="text-2xl font-bold mb-4">5. Liability</h2>
						<div className="space-y-4 text-foreground/90 leading-relaxed">
							<p>
								AlamOps commits to applying necessary security and availability
								measures but does not guarantee that the service will be free
								from interruptions or errors.
							</p>
							<p>
								AlamOps' maximum liability will be limited to the amount paid by
								the user in the last 12 months.
							</p>
							<p>
								Users are responsible for their use of the platform and any
								damage they may cause through improper use.
							</p>
						</div>
					</section>

					<section id="billing" className="scroll-mt-24">
						<h2 className="text-2xl font-bold mb-4">6. Billing and Services</h2>
						<div className="space-y-4 text-foreground/90 leading-relaxed">
							<p>
								Free services are subject to technical and support limitations.
							</p>
							<p>
								Premium and consulting services will be governed by additional
								contracts and agreements (SLA, dedicated support, etc.).
							</p>
							<p>
								In case of non-payment, AlamOps may suspend or cancel access.
							</p>
						</div>
					</section>

					<section id="modifications" className="scroll-mt-24">
						<h2 className="text-2xl font-bold mb-4">7. Modifications</h2>
						<div className="space-y-4 text-foreground/90 leading-relaxed">
							<p>
								AlamOps may modify these terms at any time, notifying by email
								or on the platform itself.
							</p>
							<p>
								Continued use of services implies acceptance of new conditions.
							</p>
						</div>
					</section>

					<section id="jurisdiction" className="scroll-mt-24">
						<h2 className="text-2xl font-bold mb-4">8. Law and Jurisdiction</h2>
						<div className="space-y-4 text-foreground/90 leading-relaxed">
							<p>
								These terms are governed by Spanish and European legislation.
							</p>
							<p>
								For any conflict, the courts of Madrid, Spain will be competent,
								unless applicable regulations provide otherwise.
							</p>
						</div>
					</section>

					<section id="acceptable-use" className="scroll-mt-24">
						<h2 className="text-2xl font-bold mb-4">
							9. Acceptable Use Policy
						</h2>
						<div className="space-y-6 text-foreground/90 leading-relaxed">
							<div>
								<h3 className="text-lg font-semibold mb-3">Permitted Use</h3>
								<p className="mb-2">The platform may be used for:</p>
								<ul className="list-disc list-inside space-y-1 ml-4">
									<li>
										Accessing cloud services, consulting, and monitoring tools
										we offer
									</li>
									<li>
										Managing projects legitimately and according to service
										purpose
									</li>
									<li>
										Collaborating with other authorized users under a security
										framework
									</li>
								</ul>
							</div>

							<div>
								<h3 className="text-lg font-semibold mb-3">Prohibited Use</h3>
								<p className="mb-2">
									Users commit not to perform the following actions:
								</p>
								<ul className="list-disc list-inside space-y-1 ml-4">
									<li>
										Use the platform for illegal activities or contrary to law
									</li>
									<li>
										Execute cyber attacks (DDoS, malware, intrusion,
										vulnerability exploitation)
									</li>
									<li>
										Distribute illegal, defamatory, racist, violent, or hate
										content
									</li>
									<li>
										Attempt unauthorized access to data, accounts, or systems of
										AlamOps or third parties
									</li>
									<li>
										Reuse, resell, or sublicense the platform without express
										authorization
									</li>
									<li>
										Use infrastructure for cryptocurrency mining, spam,
										phishing, or any abusive activity
									</li>
								</ul>
							</div>

							<div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
								<h3 className="text-lg font-semibold mb-3 text-destructive">
									Security and Confidentiality
								</h3>
								<ul className="list-disc list-inside space-y-1 ml-4 text-sm">
									<li>
										Users must keep their credentials secure and immediately
										notify any suspected unauthorized access
									</li>
									<li>Sharing accounts between multiple users is prohibited</li>
									<li>
										AlamOps will apply monitoring and auditing measures to
										detect anomalous or abusive behavior
									</li>
								</ul>
							</div>
						</div>
					</section>

					<section id="enforcement">
						<h2 className="text-2xl font-bold mb-4">10. Enforcement</h2>
						<div className="space-y-4 text-foreground/90 leading-relaxed">
							<div>
								<h3 className="text-lg font-semibold mb-3">
									Consequences of Non-Compliance
								</h3>
								<p className="mb-2">
									Non-compliance with this Use Policy may result in:
								</p>
								<ul className="list-disc list-inside space-y-1 ml-4">
									<li>Immediate account suspension</li>
									<li>Definitive service cancellation</li>
									<li>
										Report to competent authorities in case of illegal activity
									</li>
									<li>Claim for damages caused to AlamOps or third parties</li>
								</ul>
							</div>

							<div className="p-4 bg-muted/50 rounded-lg border">
								<h3 className="text-lg font-semibold mb-2">
									Cooperation with Authorities
								</h3>
								<p className="text-sm">
									AlamOps may collaborate with police or judicial authorities in
									case of investigations related to platform misuse, providing
									necessary data according to current regulations.
								</p>
							</div>
						</div>
					</section>
				</div>

				{/* Call to action */}
				<div className="mt-16 p-8 bg-muted/50 rounded-xl border">
					<div className="text-center">
						<h3 className="text-2xl font-bold mb-4">
							Questions About Our Terms?
						</h3>
						<p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
							Our legal team is available to clarify any aspect of our terms of
							service and acceptable use policy.
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
