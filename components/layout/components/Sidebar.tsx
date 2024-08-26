import classes from './styles/Sidebar.module.scss'
import cn from 'classnames'

import SidebarItem from './components/SidebarItem'

import { MdHome } from 'react-icons/md'
import { ImYoutube2 } from 'react-icons/im'
import { BsTranslate } from 'react-icons/bs'
import { useEffect, useState } from 'react'

interface SidebarProps {
	open: boolean
	closeMenu: () => void
}

const Sidebar = ({ open, closeMenu }: SidebarProps): JSX.Element => {
	const [hasBeenOpened, setHasBeenOpened] = useState<boolean>(false)

	useEffect(() => {
		if (open && !hasBeenOpened) {
			setHasBeenOpened(true)
		}
	}, [hasBeenOpened, open])

	return (
		<>
			<div
				className={cn(
					classes.sidebarRoot,
					open ? classes.sidebarOpen : hasBeenOpened ? classes.sidebarClosed : classes.sidebarDefault,
				)}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={classes.pageSection}>
					<SidebarItem text="Home" icon={<MdHome />} path="/" closeMenu={closeMenu} />
				</div>
				<div className={cn(classes.divider, classes.sectionDivider)}>
					<p className={classes.subtitle}>Exercises</p>
				</div>
				<div className={classes.pageSection}>
					<SidebarItem text="Youtube to Mp3" icon={<ImYoutube2 />} path="/youtube-to-mp3" closeMenu={closeMenu} />
					<SidebarItem
						text="Caption Generator"
						icon={<BsTranslate />}
						path="/caption-generator"
						closeMenu={closeMenu}
					/>
				</div>
			</div>
		</>
	)
}

export default Sidebar
