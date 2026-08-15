import { ReactNode } from 'react'
import cn from 'classnames'

import classes from './styles/PageHeader.module.scss'

interface PageHeaderProps {
	title: ReactNode
	eyebrow?: string
	description?: ReactNode
	icon?: ReactNode
	className?: string
}

const PageHeader = ({ title, eyebrow, description, icon, className }: PageHeaderProps): JSX.Element => {
	return (
		<header className={cn(classes.header, className)}>
			{icon ? (
				<span className={classes.icon} aria-hidden>
					{icon}
				</span>
			) : null}
			<div className={classes.text}>
				{eyebrow ? <p className={classes.eyebrow}>{eyebrow}</p> : null}
				<h1 className={classes.title}>{title}</h1>
				{description ? <p className={classes.description}>{description}</p> : null}
			</div>
		</header>
	)
}

export default PageHeader
