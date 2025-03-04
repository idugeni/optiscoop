// src/components/sections/FeatureShowcase.tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect, useRef } from 'react';

interface Feature {
	title: string;
	description: string;
	align: 'left' | 'right';
	link: string;
}

function FeatureItem({ feature, delayBase }: { feature: Feature; delayBase: number; }) {
	const [isVisible, setIsVisible] = useState(false);
	const [hasBeenVisible, setHasBeenVisible] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					setIsVisible(entry.isIntersecting);
					if (entry.isIntersecting && !hasBeenVisible) {
						setHasBeenVisible(true);
					}
				});
			},
			{ threshold: 0.1 }
		);
		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, [hasBeenVisible]);

	return (
		<div ref={ref} className="group">
			<div
				className={`flex flex-col md:flex-row ${
					feature.align === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'
				} gap-6 sm:gap-8 items-center p-4 sm:p-6 md:p-8 rounded-2xl bg-muted/10 shadow-sm hover:shadow-lg transition-shadow duration-300`}
			>
				{/* Visual Section */}
				<div
					className={`flex-1 w-full transition-all duration-700 ease-in-out ${
						isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
					}`}
					style={{ transitionDelay: `${delayBase}ms` }}
				>
					{!hasBeenVisible ? (
						<Skeleton className="h-48 sm:h-56 md:h-64 rounded-2xl animate-pulse" />
					) : (
						<div className="h-48 sm:h-56 md:h-64 w-full bg-primary/10 rounded-2xl flex items-center justify-center overflow-hidden">
							<div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-primary/20 flex items-center justify-center group-hover:ring-2 group-hover:ring-primary transition-all duration-300">
								<div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary" />
							</div>
						</div>
					)}
				</div>
				{/* Text Section */}
				<div className="flex-1">
					<h3
						className={`text-xl sm:text-2xl md:text-3xl font-bold mb-3 transition-all duration-700 ease-in-out ${
							isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
						}`}
						style={{ transitionDelay: `${delayBase + 100}ms` }}
					>
						{!hasBeenVisible ? (
							<Skeleton className="h-8 w-3/4 animate-pulse" />
						) : (
							feature.title
						)}
					</h3>
					{!hasBeenVisible ? (
						<span
							className="text-muted-foreground mb-3 transition-all duration-700 ease-in-out inline-block"
							style={{ transitionDelay: `${delayBase + 150}ms` }}
						>
							<Skeleton className="h-4 w-5/6 animate-pulse" />
						</span>
					) : (
						<p
							className={`text-sm sm:text-base md:text-lg text-muted-foreground mb-3 transition-all duration-700 ease-in-out ${
								isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
							}`}
							style={{ transitionDelay: `${delayBase + 150}ms` }}
						>
							{feature.description}
						</p>
					)}
					<div
						className={`transition-all duration-700 ease-in-out ${
							isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
						}`}
						style={{ transitionDelay: `${delayBase + 200}ms` }}
					>
						{!hasBeenVisible ? (
							<Skeleton className="h-10 w-1/2 animate-pulse" />
						) : (
							<Button variant="outline" className="rounded-full text-sm sm:text-base" asChild>
								<Link href={feature.link}>Learn More</Link>
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export function FeatureShowcase() {
	const features: Feature[] = [
		{
			title: 'Comprehensive UI Components',
			description:
				'Dive into a rich library of over 30 meticulously crafted, ready-to-use UI components. These components are designed to streamline your development process, allowing you to build sophisticated and responsive user interfaces rapidly, without the need to reinvent the wheel.',
			align: 'right',
			link: '/components',
		},
		{
			title: 'Optimal Performance',
			description:
				"Experience lightning-fast performance and superior SEO capabilities, thanks to our implementation of the latest Next.js 15 features. We've optimized every aspect to ensure your applications load quickly, rank higher in search results, and provide an exceptional user experience, setting you apart from the competition.",
			align: 'left',
			link: '/performance',
		},
		{
			title: 'Easy Customization',
			description:
				"Tailor your application's look and feel effortlessly with our intuitive customization options. Leverage the power of Tailwind CSS for rapid styling adjustments, and take advantage of Shadcn UI's component variables for deeper, more granular design control. Achieve a unique, brand-aligned aesthetic with minimal effort.",
			align: 'right',
			link: '/customization',
		},
	];

	return (
		<div className="my-12 py-12 bg-background text-foreground rounded-lg shadow-md">
			<h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">Key Features</h2>
			<div className="space-y-12 px-4">
				{features.map((feature: Feature, i) => (
					<FeatureItem key={i} feature={feature} delayBase={i * 150} />
				))}
			</div>
		</div>
	);
}
