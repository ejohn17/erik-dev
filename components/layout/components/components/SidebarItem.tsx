import { ReactNode } from 'react'

import classes from './styles/SidebarItem.module.scss'
import Link from 'next/link'

interface SidebarItemProps {
	icon: ReactNode
	text: string
	path: string
	closeMenu: () => void
}

const SidebarItem = ({ icon, text, path, closeMenu }: SidebarItemProps): JSX.Element => {
	return (
		<Link href={path}>
			<button className={classes.sidebarItem} onClick={closeMenu}>
				{icon}
				<p>{text}</p>
			</button>
		</Link>
	)
}

export default SidebarItem
