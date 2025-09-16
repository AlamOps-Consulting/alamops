import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { services } from "./data/services";


export function ServicesSection() {
	return (
		<section id="services" className="py-20 lg:py-32 bg-muted/30">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance mb-6">
						Our Services
					</h2>
					<p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
						Complete multi-cloud solutions for your cloud infrastructure,
						from strategy to implementation.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{services.map((service, index) => (
						<Card
							key={index}
							className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm"
						>
							<CardHeader className="text-center pb-4">
								<div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
									<service.icon className="w-8 h-8 text-primary" />
								</div>
								<CardTitle className="text-xl font-bold">
									{service.title}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-center leading-relaxed">
									{service.description}
								</CardDescription>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
