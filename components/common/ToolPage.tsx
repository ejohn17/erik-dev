import { ReactNode } from 'react'

import Card from './Card'
import Container from './Container'
import PageHeader from './PageHeader'
import SectionHeading from './SectionHeading'
import Steps from './Steps'

import classes from './styles/ToolPage.module.scss'

interface ToolPageProps {
	title: string
	description: string
	icon: ReactNode
	/** The tool itself. */
	children: ReactNode
	steps: ReactNode[]
	about: ReactNode
}

const ToolPage = ({ title, description, icon, children, steps, about }: ToolPageProps): JSX.Element => {
	return (
		<div className={classes.page}>
			<Container className={classes.inner}>
				<PageHeader eyebrow="Practice exercise" icon={icon} title={title} description={description} />

				<div className={classes.tool}>{children}</div>

				<section className={classes.info}>
					<SectionHeading eyebrow="Guide" title="How it works" />
					<Steps steps={steps} />
					<Card className={classes.about}>{about}</Card>
				</section>
			</Container>
		</div>
	)
}

export default ToolPage
