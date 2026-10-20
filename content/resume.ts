// Keep every fact and number in this file identical to resume-master.tex.

export interface Highlight {
	title: string
	body: string
}

export interface Role {
	company: string
	role: string
	location: string
	dates: string
	summary: string
	link?: { label: string; href: string }
}

export interface SkillGroup {
	title: string
	skills: string[]
}

export const highlights: Highlight[] = [
	{
		title: 'Led three SaaS products',
		body: 'at Saturn, including Kukarella (AI text-to-speech), serving 5,000 monthly active users.',
	},
	{
		title: 'Shipped 15+ client products',
		body: 'at Plutaro Studio, including SiteCurve, and built the AI workflow that tripled team throughput.',
	},
	{
		title: 'Recently shipped',
		body: 'mybubbascloset.ca, a Next.js and Stripe subscription rental platform built from the ground up.',
	},
]

export const experience: Role[] = [
	{
		company: 'Bubbas Closet',
		role: 'Full-Stack Developer (Contract)',
		location: 'Kelowna, BC',
		dates: 'Jul 2026 – Oct 2026',
		summary:
			'Built and shipped mybubbascloset.ca: Next.js 16 and TypeScript, Stripe tiered subscriptions, Firebase Auth and Firestore, and a custom admin for rentals and returns.',
		link: { label: 'Read the case study', href: '/projects/bubbas-closet' },
	},
	{
		company: 'Xambi Tech / Plutaro Studio',
		role: 'Software Developer',
		location: 'Remote',
		dates: 'Feb 2025 – Feb 2026',
		summary:
			'Built full-stack TypeScript, React, Node.js, and PostgreSQL applications across 15+ client websites and software projects, including SiteCurve. Designed Plutaro, an internal AI build platform and workflow framework that automated project setup and increased team productivity 3x, and helped build its successor, the public Plutaro AI app builder.',
	},
	{
		company: 'Saturn Animation Studios',
		role: 'Lead Developer',
		location: 'Kelowna, BC',
		dates: 'May 2020 – Aug 2024',
		summary:
			"Architected three SaaS products, Kukarella (AI text-to-speech), Site Report Builder, and Minutes Builder, with React/Next.js and Node.js/Express, serving 5,000 monthly active users. Built AI features with Anthropic Claude: Site Report Builder's automated inspection reports cut report time by 80% versus writing by hand, and Minutes Builder turned meeting transcripts into minutes. Evolved CI/CD on Docker and AWS (roughly 40% better deployment efficiency) and led a two-person team.",
	},
]

export const education = {
	degree: 'B.S. Computer Science',
	school: 'University of British Columbia Okanagan',
	year: '2022',
}

export const skillGroups: SkillGroup[] = [
	{
		title: 'Languages',
		skills: ['TypeScript', 'JavaScript', 'Java', 'HTML', 'CSS'],
	},
	{
		title: 'Frontend & Backend',
		skills: [
			'React',
			'Next.js',
			'Redux',
			'Tailwind CSS',
			'React Native',
			'Expo',
			'Node.js',
			'Express',
			'REST APIs',
		],
	},
	{
		title: 'Data & Cloud',
		skills: ['PostgreSQL', 'MySQL', 'SQL', 'NoSQL', 'Firestore', 'AWS', 'Firebase', 'Docker', 'CI/CD', 'Stripe'],
	},
	{
		title: 'Tools & Practices',
		skills: ['Git', 'GitHub Actions', 'Automated testing', 'Code reviews', 'LLM integration (Claude, OpenAI)'],
	},
]
