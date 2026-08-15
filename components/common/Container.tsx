import { HTMLAttributes, ReactNode } from 'react'
import cn from 'classnames'

import classes from './styles/Container.module.scss'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode
	/** `narrow` suits long-form reading, `wide` suits full tool layouts. */
	width?: 'narrow' | 'default' | 'wide'
}

const Container = ({ children, width = 'default', className, ...rest }: ContainerProps): JSX.Element => {
	return (
		<div className={cn(classes.container, classes[width], className)} {...rest}>
			{children}
		</div>
	)
}

export default Container
