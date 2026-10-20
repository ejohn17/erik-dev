import { AnchorHTMLAttributes, ReactNode } from 'react'
import cn from 'classnames'

import { IconButtonSize, IconButtonVariant } from './IconButton'
import classes from './styles/IconButton.module.scss'

interface IconLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	children: ReactNode
	href: string
	/** Required because the link has no visible text. */
	'aria-label': string
	variant?: IconButtonVariant
	size?: IconButtonSize
}

const IconLink = ({ children, variant = 'ghost', size = 'md', className, ...rest }: IconLinkProps): JSX.Element => {
	return (
		<a className={cn(classes.button, classes[variant], classes[size], className)} {...rest}>
			{children}
		</a>
	)
}

export default IconLink
