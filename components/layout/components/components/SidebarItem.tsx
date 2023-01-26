import { ReactNode } from 'react'

import classes from './styles/SidebarItem.module.scss'

interface SidebarItemProps {
	icon: ReactNode
	text: string
	path: string
}

const SidebarItem = ({ icon, text, path }: SidebarItemProps): JSX.Element => {
	return (
		<a href={path}>
			<button className={classes.sidebarItem}>
				{icon}
				<p>{text}</p>
			</button>
		</a>
	)
}

export default SidebarItem
