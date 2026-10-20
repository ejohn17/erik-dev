import { ReactNode } from 'react'
import cn from 'classnames'

import classes from './styles/Tag.module.scss'

interface TagProps {
	children: ReactNode
	tone?: 'neutral' | 'accent'
	className?: string
}

const Tag = ({ children, tone = 'neutral', className }: TagProps): JSX.Element => {
	return <span className={cn(classes.tag, classes[tone], className)}>{children}</span>
}

export const TagList = ({ items, className }: { items: string[]; className?: string }): JSX.Element => {
	return (
		<ul className={cn(classes.list, className)}>
			{items.map((item) => (
				<li key={item}>
					<Tag>{item}</Tag>
				</li>
			))}
		</ul>
	)
}

export default Tag
