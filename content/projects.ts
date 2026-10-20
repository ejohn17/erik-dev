export interface ProjectLink {
	label: string
	href: string
}

export interface ArchitectureFlow {
	label: string
	steps: string[]
}

export interface CaseStudy {
	slug: string
	title: string
	/** One sentence: what it is. */
	summary: string
	/** Short line for the homepage card. */
	cardSummary: string
	status: string
	role: string
	dates: string
	stack: string[]
	screenshot?: { src: string; alt: string; width: number; height: number }
	architecture: ArchitectureFlow[]
	hardestProblem: { title: string; paragraphs: string[] }
	nextSteps: { title: string; body: string }[]
	links: ProjectLink[]
	/** Shown when there is nothing public to link to. */
	linksNote?: string
}

export const caseStudies: CaseStudy[] = [
	{
		slug: 'bubbas-closet',
		title: 'Bubbas Closet',
		summary:
			'A subscription clothing rental for kids: members build a box from a members-only closet, choose the monthly plan that covers it, wear the pieces for a month, then send them back and swap.',
		cardSummary:
			'Subscription clothing rental with Stripe tiered billing, transactional inventory holds, and a custom admin for rentals and returns.',
		status: 'Shipped',
		role: 'Solo build under contract for a Kelowna client. I owned the data model, billing, member portal, admin tools, and deployment.',
		dates: 'Jul 2026 – Oct 2026',
		stack: [
			'Next.js 16 (App Router)',
			'TypeScript',
			'Tailwind CSS v4',
			'Stripe',
			'Firebase Auth',
			'Cloud Firestore',
			'Firebase Storage',
			'Firebase App Hosting',
			'Cloud Scheduler',
			'GitHub Actions',
			'Resend',
		],
		screenshot: {
			src: '/images/projects/bubbas-closet.jpg',
			alt: 'The mybubbascloset.ca homepage: "Rent a rotating children\'s wardrobe, monthly."',
			width: 905,
			height: 928,
		},
		architecture: [
			{
				label: 'Member requests',
				steps: [
					'Browser signs in with Firebase Auth',
					'ID token exchanged for an httpOnly session cookie',
					'Next.js route handlers verify the cookie with firebase-admin',
					'Firestore',
				],
			},
			{
				label: 'Billing',
				steps: ['Stripe Checkout and Billing Portal', 'Stripe webhooks', '/api/stripe/webhook', 'Subscriptions in Firestore'],
			},
			{
				label: 'Scheduled jobs',
				steps: [
					'Cloud Scheduler',
					'Release expired holds (every 5 min) and return reminders (daily)',
					'Firestore and Resend email',
				],
			},
		],
		hardestProblem: {
			title: 'Two members can never rent the same garment',
			paragraphs: [
				'Inventory is serialized. A product is a style; a unit is one physical garment with its own status: available, reserved, out, cleaning, or retired. Members browse styles, but every piece they add has to claim a specific unit.',
				"Adding a piece runs a Firestore transaction that reads the unit and the member's live holds together, checks that the unit is still available and the box is under the plan's item limit, then reserves the unit with a 20-minute hold. If another member wins the race, it moves on to the next available unit in that size. The tier limit is enforced inside that transaction, never in the browser.",
				'Holds expire, so a Cloud Scheduler job sweeps them every five minutes. The first version only looked at hold documents, so a garment whose hold disappeared some other way stayed reserved forever. The sweep now also checks reserved units with a missing or expired hold and returns them to the closet.',
				'Billing follows the same rule of keeping state on the server. Upgrades apply immediately with proration, downgrades are scheduled with a Stripe subscription schedule for the next cycle, and confirming a box creates one monthly order keyed to the Stripe billing period.',
			],
		},
		nextSteps: [
			{
				title: 'Tests',
				body: 'CI runs lint, type-checking, and a production build on every push, but there are no automated tests yet. First would be unit tests for the hold, tier-limit, and shipping rules, then an end-to-end test of browse, build a box, and subscribe against Stripe test mode.',
			},
			{
				title: 'Metrics',
				body: 'Track box-to-subscription conversion and return turnaround so the client can tune hold length and stock levels with data.',
			},
			{
				title: 'Scale',
				body: 'Queries use a single equality filter and refine in memory, which avoids composite indexes at the current catalogue size. A larger catalogue would need composite indexes and paginated queries.',
			},
		],
		links: [
			{ label: 'Live site', href: 'https://mybubbascloset.ca' },
			{ label: 'Code on GitHub', href: 'https://github.com/ejohn17/bubbas-closet' },
		],
	},
	{
		slug: 'okanagan-events',
		title: 'Local Events & Specials App',
		summary:
			'A mobile app for finding restaurant and bar events and daily specials in the Okanagan Valley, filtered by type, such as karaoke, trivia, or live music, and by day.',
		cardSummary:
			'React Native app with a Node backend and Next.js admin, fed by a Google Places, web scraping, and ChatGPT ingestion pipeline.',
		status: 'In development',
		role: 'Independent product. Solo build of the mobile app, backend, admin panel, and data pipeline.',
		dates: 'Mar 2026 – Present',
		stack: ['React Native', 'Expo', 'Node.js', 'Next.js', 'Google Places API', 'OpenAI API (ChatGPT)', 'Web scraping'],
		architecture: [
			{
				label: 'Ingestion',
				steps: [
					'Google Places API discovers venues by city section',
					'Scrape each venue website',
					'ChatGPT extracts specials and events',
					'Structured listings',
				],
			},
			{
				label: 'Freshness',
				steps: ["Save each venue's events page", 'Re-scrape every few days', 'Updated listings'],
			},
			{
				label: 'Apps',
				steps: ['Expo mobile app and Next.js admin', 'Node backend', 'Listings'],
			},
		],
		hardestProblem: {
			title: 'Getting the data in',
			paragraphs: [
				"The app is only useful if it knows about tonight's trivia night and this week's wing special, and no single source lists those. Venues post them on their own websites, in free-form text, with no shared format.",
				'I built an automated pipeline in four steps. The Google Places API seeds geographic sections of a city to discover restaurants and bars. A scraper fetches each venue website. ChatGPT extracts specials and upcoming events into structured records. The pipeline saves the page where each venue lists its events and re-scrapes it every few days, so listings stay current without rediscovering the whole city.',
				'Splitting discovery, scraping, and extraction into separate steps means each can be re-run on its own, and an extraction change can be tested against pages that were already saved.',
			],
		},
		nextSteps: [
			{
				title: 'Tests',
				body: 'Use saved venue pages as fixtures so changes to the extraction prompt can be checked against known-good output before they reach real listings.',
			},
			{
				title: 'Launch',
				body: 'Finish the remaining screens and ship a beta through TestFlight and Google Play internal testing.',
			},
			{
				title: 'Open source the pipeline',
				body: 'Publish the ingestion pipeline as a standalone repository with a diagram, sample output, and the re-scrape schedule.',
			},
		],
		links: [],
		linksNote: 'The app and its code are private while it is in development.',
	},
]

export const kukarella = {
	title: 'Kukarella',
	summary:
		'AI text-to-speech SaaS. I led development at Saturn Animation Studios from May 2020 to Aug 2024, alongside Site Report Builder and Minutes Builder.',
	dates: 'May 2020 – Aug 2024',
	stack: ['React', 'Next.js', 'Node.js', 'Express', 'AWS'],
	links: [
		{ label: 'kukarella.com', href: 'https://www.kukarella.com' },
		{
			label: 'Innovate BC feature',
			href: 'https://www.innovatebc.ca/blog/kelowna-kukarella-changes-the-text-to-speech-game/',
		},
	],
	note: 'The live product may have changed since I left in 2024.',
}

export const getCaseStudy = (slug: string): CaseStudy | undefined => caseStudies.find((study) => study.slug === slug)
