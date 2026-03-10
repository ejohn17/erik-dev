import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'

import classes from './styles/SidebarItem.module.scss'
import Link from 'next/link'

interface SidebarItemProps {
	icon: ReactNode
	text: string
	path: string
	closeMenu: () => void
}

const SidebarItem = ({ icon, text, path, closeMenu }: SidebarItemProps): JSX.Element => {
	const { pathname } = useRouter()
	const isActive = pathname === path

	return (
		<Link
			href={path}
			className={cn(classes.sidebarItem, isActive && classes.sidebarItemActive)}
			onClick={closeMenu}
			aria-current={isActive ? 'page' : undefined}
		>
			{icon}
			<p>{text}</p>
		</Link>
	)
}

export default SidebarItem
