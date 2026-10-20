import Link from 'next/link'
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io'
import { MdOpenInNew } from 'react-icons/md'

import Button from 'components/common/Button'
import Container from 'components/common/Container'
import Tag, { TagList } from 'components/common/Tag'
import { CaseStudy as CaseStudyContent, caseStudies } from 'content/projects'
import ArchitectureDiagram from './ArchitectureDiagram'

import classes from './styles/CaseStudy.module.scss'

interface CaseStudyProps {
	study: CaseStudyContent
}

const CaseStudy = ({ study }: CaseStudyProps): JSX.Element => {
	const { title, summary, status, role, dates, stack, screenshot, architecture, hardestProblem, nextSteps } = study
	const other = caseStudies.find(({ slug }) => slug !== study.slug)

	return (
		<article className={classes.root}>
			<Container width="narrow" className={classes.inner}>
				<Link href="/#projects" className={classes.back}>
					<IoIosArrowRoundBack aria-hidden />
					All projects
				</Link>

				<header className={classes.header}>
					<div className={classes.meta}>
						<Tag tone="accent">{status}</Tag>
						<span>{dates}</span>
					</div>
					<h1 className={classes.title}>{title}</h1>
					<p className={classes.summary}>{summary}</p>
					<Links study={study} />
				</header>

				{screenshot ? (
					<figure className={classes.screenshot}>
						<img src={screenshot.src} alt={screenshot.alt} width={screenshot.width} height={screenshot.height} />
					</figure>
				) : null}

				<section className={classes.section}>
					<h2 className={classes.heading}>My role</h2>
					<p className={classes.body}>{role}</p>
				</section>

				<section className={classes.section}>
					<h2 className={classes.heading}>Stack</h2>
					<TagList items={stack} />
				</section>

				<section className={classes.section}>
					<h2 className={classes.heading}>Architecture</h2>
					<ArchitectureDiagram flows={architecture} />
				</section>

				<section className={classes.section}>
					<h2 className={classes.heading}>Hardest problem: {hardestProblem.title}</h2>
					{hardestProblem.paragraphs.map((paragraph) => (
						<p key={paragraph} className={classes.body}>
							{paragraph}
						</p>
					))}
				</section>

				<section className={classes.section}>
					<h2 className={classes.heading}>What I&apos;d do next</h2>
					<dl className={classes.nextSteps}>
						{nextSteps.map(({ title: stepTitle, body }) => (
							<div key={stepTitle} className={classes.nextStep}>
								<dt>{stepTitle}</dt>
								<dd>{body}</dd>
							</div>
						))}
					</dl>
				</section>

				<section className={classes.section}>
					<h2 className={classes.heading}>Links</h2>
					<Links study={study} />
				</section>

				{other ? (
					<Link href={`/projects/${other.slug}`} className={classes.next}>
						<span className={classes.nextLabel}>Next case study</span>
						<span className={classes.nextTitle}>
							{other.title}
							<IoIosArrowRoundForward aria-hidden />
						</span>
					</Link>
				) : null}
			</Container>
		</article>
	)
}

const Links = ({ study }: CaseStudyProps): JSX.Element => {
	if (!study.links.length) {
		return <p className={classes.linksNote}>{study.linksNote}</p>
	}

	return (
		<div className={classes.links}>
			{study.links.map(({ label, href }, index) => (
				<Button
					key={href}
					href={href}
					variant={index === 0 ? 'primary' : 'secondary'}
					icon={<MdOpenInNew />}
					target="_blank"
					rel="noopener noreferrer"
				>
					{label}
				</Button>
			))}
		</div>
	)
}

export default CaseStudy
