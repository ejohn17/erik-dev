import { ReactNode } from 'react'
import Link from 'next/link'
import cn from 'classnames'

import classes from './styles/NavLink.module.scss'

interface NavLinkProps {
	href: string
	children: ReactNode
	active: boolean
	className?: string
	onClick?: () => void
}

const NavLink = ({ href, children, active, className, onClick }: NavLinkProps): JSX.Element => {
	return (
		<Link
			href={href}
			className={cn(classes.link, active && classes.active, className)}
			aria-current={active ? 'page' : undefined}
			onClick={onClick}
		>
			{children}
		</Link>
	)
}

export default NavLink
