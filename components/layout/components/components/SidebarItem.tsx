import { ReactNode } from 'react'

import classes from './styles/SidebarItem.module.scss'
import Link from 'next/link'

interface SidebarItemProps {
	icon: ReactNode
	text: string
	path: string
}

const SidebarItem = ({ icon, text, path }: SidebarItemProps): JSX.Element => {
	return (
		<Link href={path}>
			<button className={classes.sidebarItem}>
				{icon}
				<p>{text}</p>
			</button>
		</Link>
	)
}

export default SidebarItem
