import Link from 'next/link'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdMailOutline, MdOpenInNew } from 'react-icons/md'

import Button from 'components/common/Button'
import Card from 'components/common/Card'
import Container from 'components/common/Container'
import SectionHeading from 'components/common/SectionHeading'
import Tag, { TagList } from 'components/common/Tag'
import {
	CONTACT_EMAIL,
	GITHUB_URL,
	LINKEDIN_URL,
	RESUME_PATH,
	RESUME_UPDATED,
} from 'components/layout/navigation'
import { caseStudies, kukarella } from 'content/projects'
import { education, experience, highlights, skillGroups } from 'content/resume'

import classes from './styles/Home.module.scss'

const external = { target: '_blank', rel: 'noopener noreferrer' }

const ContactActions = (): JSX.Element => (
	<>
		<Button href={RESUME_PATH} size="lg" {...external}>
			Resume
		</Button>
		<Button href={GITHUB_URL} variant="secondary" size="lg" icon={<FaGithub />} iconPosition="start" {...external}>
			GitHub
		</Button>
		<Button href={LINKEDIN_URL} variant="secondary" size="lg" icon={<FaLinkedin />} iconPosition="start" {...external}>
			LinkedIn
		</Button>
		<Button href={`mailto:${CONTACT_EMAIL}`} variant="secondary" size="lg" icon={<MdMailOutline />} iconPosition="start">
			Email
		</Button>
	</>
)

const Home = (): JSX.Element => {
	return (
		<div className={classes.root}>
			<section className={classes.hero}>
				<Container className={classes.heroGrid}>
					<div className={classes.intro}>
						<p className={classes.eyebrow}>Kelowna, BC &middot; Open to remote work across Canada</p>
						<h1 className={classes.headline}>
							<span className={classes.name}>Erik Johnston</span>
							<span className={classes.title}>Full-Stack Software Developer</span>
						</h1>
						<p className={classes.lead}>
							I build and ship TypeScript products end to end: React and Next.js on the front, Node.js and PostgreSQL or
							Firebase on the back, deployed on AWS and Google Cloud.
						</p>
						<div className={classes.heroActions}>
							<ContactActions />
						</div>
						<p className={classes.resumeMeta}>Resume PDF updated {RESUME_UPDATED}</p>
					</div>

					<div className={classes.portrait}>
						<img src="/images/headshot.jpeg" alt="Erik Johnston headshot" width={640} height={800} />
					</div>
				</Container>

				<Container>
					<ol className={classes.highlights} aria-label="Highlights">
						{highlights.map(({ title, body }, index) => (
							<li key={title}>
								<Card className={classes.highlight}>
									<span className={classes.highlightIndex}>{String(index + 1).padStart(2, '0')}</span>
									<p>
										<strong className={classes.highlightTitle}>{title}</strong> {body}
									</p>
								</Card>
							</li>
						))}
					</ol>
				</Container>
			</section>

			<section id="experience" className={classes.section}>
				<Container className={classes.sectionInner}>
					<SectionHeading eyebrow="Experience" title="Where I've worked" />
					<ol className={classes.timeline}>
						{experience.map(({ company, role, location, dates, summary, link }) => (
							<li key={company} className={classes.role}>
								<div className={classes.roleMeta}>
									<p className={classes.roleDates}>{dates}</p>
									<p className={classes.roleLocation}>{location}</p>
								</div>
								<div className={classes.roleBody}>
									<div>
										<h3 className={classes.cardTitle}>{company}</h3>
										<p className={classes.roleTitle}>{role}</p>
									</div>
									<p className={classes.body}>{summary}</p>
									{link ? (
										<Link href={link.href} className={classes.textLink}>
											{link.label}
											<IoIosArrowRoundForward aria-hidden />
										</Link>
									) : null}
								</div>
							</li>
						))}
						<li className={classes.role}>
							<div className={classes.roleMeta}>
								<p className={classes.roleDates}>{education.year}</p>
							</div>
							<div className={classes.roleBody}>
								<div>
									<h3 className={classes.cardTitle}>{education.degree}</h3>
									<p className={classes.roleTitle}>{education.school}</p>
								</div>
							</div>
						</li>
					</ol>
				</Container>
			</section>

			<section id="projects" className={classes.section}>
				<Container className={classes.sectionInner}>
					<SectionHeading
						eyebrow="Projects"
						title="Recent work"
						description="What I built, how it's put together, and the hardest problem in each."
					/>
					<div className={classes.projectGrid}>
						{caseStudies.map(({ slug, title, cardSummary, status, dates, stack, screenshot }) => (
							<Card key={slug} padding="none" interactive className={classes.projectCard}>
								<div className={classes.projectMedia}>
									{screenshot ? (
										<img src={screenshot.src} alt="" width={screenshot.width} height={screenshot.height} />
									) : (
										<span className={classes.projectMediaFallback} aria-hidden>
											{title}
										</span>
									)}
								</div>
								<div className={classes.projectBody}>
									<div className={classes.projectMeta}>
										<Tag tone="accent">{status}</Tag>
										<span>{dates}</span>
									</div>
									<h3 className={classes.cardTitle}>{title}</h3>
									<p className={classes.projectDescription}>{cardSummary}</p>
									<TagList items={stack.slice(0, 5)} />
									<Button
										href={`/projects/${slug}`}
										variant="secondary"
										icon={<IoIosArrowRoundForward />}
										className={classes.projectAction}
										aria-label={`Read the ${title} case study`}
									>
										Read the case study
									</Button>
								</div>
							</Card>
						))}
					</div>

					<Card className={classes.kukarella}>
						<div className={classes.kukarellaText}>
							<div className={classes.projectMeta}>
								<Tag>Saturn Animation Studios</Tag>
								<span>Led development {kukarella.dates}</span>
							</div>
							<h3 className={classes.cardTitle}>{kukarella.title}</h3>
							<p className={classes.projectDescription}>{kukarella.summary}</p>
							<p className={classes.note}>{kukarella.note}</p>
						</div>
						<div className={classes.kukarellaLinks}>
							{kukarella.links.map(({ label, href }) => (
								<Button
									key={href}
									href={href}
									variant="secondary"
									size="sm"
									icon={<MdOpenInNew />}
									{...external}
								>
									{label}
								</Button>
							))}
						</div>
					</Card>
				</Container>
			</section>

			<section id="skills" className={classes.section}>
				<Container className={classes.sectionInner}>
					<SectionHeading eyebrow="Skills" title="What I work with" />
					<div className={classes.skillGrid} data-testid="skills-categories">
						{skillGroups.map(({ title, skills }) => (
							<Card key={title} className={classes.skillCard}>
								<h3 className={classes.skillTitle}>{title}</h3>
								<TagList items={skills} />
							</Card>
						))}
					</div>
				</Container>
			</section>

			<section id="contact" className={classes.section}>
				<Container>
					<Card padding="lg" className={classes.cta}>
						<SectionHeading
							align="center"
							eyebrow="Contact"
							title="Let's talk"
							description="I'm looking for full-stack developer roles, remote across Canada. Email is the fastest way to reach me."
						/>
						<div className={classes.ctaActions}>
							<ContactActions />
						</div>
						<p className={classes.resumeMeta}>
							{CONTACT_EMAIL} &middot; Resume PDF updated {RESUME_UPDATED}
						</p>
					</Card>
				</Container>
			</section>
		</div>
	)
}

export default Home
