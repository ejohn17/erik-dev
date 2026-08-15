import { HTMLAttributes, ReactNode } from 'react'
import cn from 'classnames'

import classes from './styles/Card.module.scss'

export type CardPadding = 'none' | 'sm' | 'md' | 'lg'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode
	padding?: CardPadding
	/** Adds hover elevation. Only use on cards that contain a link or button. */
	interactive?: boolean
	muted?: boolean
}

const Card = ({
	children,
	padding = 'md',
	interactive = false,
	muted = false,
	className,
	...rest
}: CardProps): JSX.Element => {
	return (
		<div
			className={cn(
				classes.card,
				classes[`padding-${padding}`],
				interactive && classes.interactive,
				muted && classes.muted,
				className,
			)}
			{...rest}
		>
			{children}
		</div>
	)
}

export default Card
