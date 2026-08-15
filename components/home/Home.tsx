import { IoIosArrowRoundForward } from 'react-icons/io'

import Button from 'components/common/Button'
import Card from 'components/common/Card'
import Container from 'components/common/Container'
import SectionHeading from 'components/common/SectionHeading'
import { CONTACT_EMAIL, RESUME_PATH } from 'components/layout/navigation'

import classes from './styles/Home.module.scss'

const skillCategories = [
	{
		title: 'Frontend Development',
		skills: ['React.js / Next.js', 'TypeScript / JavaScript', 'SCSS / CSS3', 'Modern UI/UX Design'],
	},
	{
		title: 'Backend Development',
		skills: ['Node.js / Express', 'RESTful APIs', 'Database Design', 'System Architecture'],
	},
	{
		title: 'DevOps & Tools',
		skills: ['AWS Cloud Services', 'CI/CD Pipelines', 'Git / Version Control', 'Agile Methodologies'],
	},
]

const achievements = [
	'Architected and delivered 2 new SaaS platforms from concept to production, reducing deployment time by 40% through implementation of modern CI/CD practices',
	'Led a complete technical overhaul of a legacy system, resulting in 60% improved performance and 35% reduction in maintenance costs',
	'Established development best practices and mentoring programs, leading to a 50% reduction in production bugs and improved team velocity',
]

const projects = [
	{
		title: 'Youtube to mp3',
		description: 'Full-stack application demonstrating API integration and file processing capabilities.',
		href: '/youtube-to-mp3',
	},
	{
		title: 'Caption Generator',
		description: 'Multilingual processing tool showcasing natural language processing and translation API integration.',
		href: '/caption-generator',
	},
	{
		title: 'Technical Blog',
		description: 'Sharing insights and best practices from real-world software development experiences.',
		href: null,
	},
]

const Home = (): JSX.Element => {
	return (
		<div className={classes.root}>
			<section className={classes.hero}>
				<Container className={classes.heroGrid}>
					<div className={classes.intro}>
						<p className={classes.eyebrow}>Kelowna, BC &middot; Open to new opportunities</p>
						<h1 className={classes.headline}>
							<span className={classes.name}>Erik Johnston</span>
							<br />
							Software
							<br />
							Developer.
						</h1>
						<p className={classes.lead}>
							Full-stack Developer crafting scalable SaaS solutions, leading teams to deliver high-impact software
							products.
						</p>
						<div className={classes.heroActions}>
							<Button href={`mailto:${CONTACT_EMAIL}`} size="lg">
								Get in Touch
							</Button>
							<Button href={RESUME_PATH} variant="secondary" size="lg" target="_blank" rel="noopener noreferrer">
								View Resume
							</Button>
						</div>
					</div>

					<div className={classes.portrait}>
						<img src="/images/headshot.jpeg" alt="Erik Johnston headshot" width={640} height={800} />
					</div>
				</Container>

				<Container className={classes.highlights}>
					<Card className={classes.highlight}>
						<span className={classes.highlightIndex}>01</span>
						<p>
							Proven track record of leading development teams and architecting complex SaaS solutions using React,
							Next.js, Node.js, and AWS cloud technologies.
						</p>
					</Card>
					<Card className={classes.highlight}>
						<span className={classes.highlightIndex}>02</span>
						<p>
							Expertise in building scalable frontend applications and robust backend systems, with a focus on
							performance optimization and clean architecture.
						</p>
					</Card>
				</Container>
			</section>

			<section className={classes.section}>
				<Container className={classes.sectionInner}>
					<SectionHeading
						eyebrow="Skills"
						title="Technical Expertise"
						description="The stack I reach for when building and shipping production software."
					/>
					<div className={classes.skillGrid} data-testid="skills-categories">
						{skillCategories.map(({ title, skills }) => (
							<Card key={title} className={classes.skillCard}>
								<h3 className={classes.cardTitle}>{title}</h3>
								<ul className={classes.skillList}>
									{skills.map((skill) => (
										<li key={skill}>{skill}</li>
									))}
								</ul>
							</Card>
						))}
					</div>
				</Container>
			</section>

			<section className={classes.section}>
				<Container className={classes.journey}>
					<div className={classes.journeyText}>
						<SectionHeading eyebrow="Experience" title="Professional Journey" />
						<p className={classes.body}>
							As Lead Developer at Saturn Animation Studios, I spearheaded the development of multiple enterprise-scale
							SaaS platforms, managing a team of 5 developers and delivering solutions that served over 10,000 active
							users.
						</p>
						<div className={classes.achievements}>
							<h3 className={classes.cardTitle}>Key Achievements</h3>
							<ul className={classes.achievementList}>
								{achievements.map((achievement) => (
									<li key={achievement}>{achievement}</li>
								))}
							</ul>
						</div>
						<p className={classes.body}>
							My journey began at the University of British Columbia Okanagan, where I earned my Bachelor of Science in
							Computer Science. Through hands-on experience and continuous learning, I&apos;ve developed expertise in
							building scalable, maintainable software solutions that drive business value.
						</p>
					</div>
					<div className={classes.journeyImage}>
						<img src="/images/kelowna.jpg" alt="Kelowna, British Columbia" width={1200} height={800} />
					</div>
				</Container>
			</section>

			<section className={classes.section}>
				<Container className={classes.sectionInner}>
					<SectionHeading
						eyebrow="Projects"
						title="Practice Exercises & Tools"
						description="Personal projects showcasing practical applications and continuous learning."
					/>
					<div className={classes.projectGrid}>
						{projects.map(({ title, description, href }) => (
							<Card key={title} className={classes.projectCard} interactive={!!href}>
								<h3 className={classes.cardTitle}>{title}</h3>
								<p className={classes.projectDescription}>{description}</p>
								{href ? (
									<Button
										href={href}
										variant="secondary"
										icon={<IoIosArrowRoundForward />}
										className={classes.projectAction}
									>
										View Project
									</Button>
								) : (
									<Button
										variant="secondary"
										disabled
										icon={<IoIosArrowRoundForward />}
										className={classes.projectAction}
									>
										Coming soon
									</Button>
								)}
							</Card>
						))}
					</div>
				</Container>
			</section>

			<section className={classes.section}>
				<Container>
					<Card padding="lg" className={classes.cta}>
						<SectionHeading
							align="center"
							eyebrow="Contact"
							title="Let's Build Something Amazing Together"
							description="Currently open to new opportunities."
						/>
						<div className={classes.ctaActions}>
							<Button href={`mailto:${CONTACT_EMAIL}`} size="lg">
								Get in Touch
							</Button>
							<Button href={RESUME_PATH} variant="secondary" size="lg" target="_blank" rel="noopener noreferrer">
								View Resume
							</Button>
						</div>
					</Card>
				</Container>
			</section>
		</div>
	)
}

export default Home
