import { ReactNode } from 'react'
import cn from 'classnames'

import classes from './styles/SectionHeading.module.scss'

interface SectionHeadingProps {
	title: ReactNode
	eyebrow?: string
	description?: ReactNode
	align?: 'start' | 'center'
	className?: string
}

const SectionHeading = ({
	title,
	eyebrow,
	description,
	align = 'start',
	className,
}: SectionHeadingProps): JSX.Element => {
	return (
		<div className={cn(classes.heading, classes[align], className)}>
			{eyebrow ? <p className={classes.eyebrow}>{eyebrow}</p> : null}
			<h2 className={classes.title}>{title}</h2>
			{description ? <p className={classes.description}>{description}</p> : null}
		</div>
	)
}

export default SectionHeading
